export * from './signing';
export * from './accountLib';
export * from './orderLib';

import {
  Abi,
  Address,
  Chain,
  ContractEventName,
  ContractFunctionExecutionError,
  decodeEventLog,
  formatTransactionReceipt,
  GetContractEventsReturnType,
  GetTransactionReceiptReturnType,
  Hex,
  Log,
  PublicClient,
  RawContractError,
  TransactionReceipt,
  TransactionReceiptNotFoundError,
  WalletClient,
} from 'viem';
import { getRouterAddress } from '../addresses';
import { getMarketHubContract } from '../entities/marketHub';
import { MarketAcc } from '../types';
import { TxResponse } from '../backend/secrettune/BorosSendTxsBotSDK';
import { iRouterAbi } from '../contracts/abis/viemAbis';
import { ViemErrorDecoder } from '../errors';
import { waitForTransactionReceipt } from 'viem/actions';

export async function sendTx(walletClient: WalletClient, calldata: Hex) {
  const [account] = await walletClient.getAddresses();
  const txHash = await walletClient.sendTransaction({
    account,
    to: getRouterAddress(),
    data: calldata,
    // FIXME: @negativez2 handle native token
    value: 0n,
    chain: walletClient.chain,
  });

  return txHash;
}

export async function getUserAddressFromWalletClient(userWalletClient: WalletClient): Promise<Address> {
  let userAddress = userWalletClient.account?.address;
  if (!userAddress) {
    [userAddress] = await userWalletClient.getAddresses();
  }
  return userAddress;
}

export async function getEnteredMarkets(marketAcc: MarketAcc) {
  return getMarketHubContract().read.getEnteredMarkets([marketAcc]);
}

type LogArgs<TAbi extends Abi, TEventName extends ContractEventName<TAbi>> = {
  eventName: TEventName;
  args: GetContractEventsReturnType<TAbi, TEventName>[number]['args'];
};

export function extractEventLogs<TAbi extends Abi, TEventName extends ContractEventName<TAbi>>(
  logs: Log<bigint, number, false>[],
  abi: TAbi,
  eventName: TEventName
): LogArgs<TAbi, TEventName>[] {
  const parsedLogs: Array<LogArgs<TAbi, TEventName>> = [];

  for (const log of logs) {
    try {
      const decodedLog = decodeEventLog({
        abi,
        data: log.data,
        topics: log.topics,
      });

      const { eventName: decodedEventName, args: decodedArgs } = decodedLog;

      if (eventName === decodedEventName) {
        parsedLogs.push({
          eventName: decodedEventName as TEventName,
          args: decodedArgs as LogArgs<TAbi, TEventName>['args'],
        });
      }
    } catch (_error: unknown) {}
  }

  return parsedLogs;
}

export function decodeErrorMessageFromErrorSelector(errorSelector: Hex) {
  const error = new RawContractError({ data: errorSelector.toLowerCase() as Hex });
  const decodedError = ViemErrorDecoder.decodeViemError(error);
  return decodedError.message;
}

function getCorrespondingResultAndLogs(txHash: Hex, receipt: TransactionReceipt, index: number) {
  const callSucceededLogs = extractEventLogs(receipt.logs, iRouterAbi, 'TryAggregateCallSucceeded');
  const callFailedLogs = extractEventLogs(receipt.logs, iRouterAbi, 'TryAggregateCallFailed');
  const callSucceededLogsWithSuccess = callSucceededLogs.map((log) => ({ ...log, status: 'success' }) as const);
  const callFailedLogsWithSuccess = callFailedLogs.map((log) => ({ ...log, status: 'reverted' }) as const);
  const mergedLogs = [...callSucceededLogsWithSuccess, ...callFailedLogsWithSuccess].sort(
    (a, b) => Number(a.args.index) - Number(b.args.index)
  );
  const correspondingLog = mergedLogs[index];
  let errorMessage: string | undefined = undefined;
  if ('errorSelector' in correspondingLog.args && correspondingLog.args.errorSelector) {
    errorMessage = decodeErrorMessageFromErrorSelector(correspondingLog.args.errorSelector);
  }
  return {
    status: correspondingLog.status,
    error: errorMessage,
    index: Number(correspondingLog.args.index),
    receipt,
    txHash,
  };
}

export async function parseResponse(
  executeResponses: TxResponse[],
  publicClient: PublicClient,
  waitForTransactionReceiptParams?: {
    maxAttempts?: number;
    pollInterval?: number;
  }
) {
  const uniqueTxHashes = [...new Set(executeResponses.map((executeResponse) => executeResponse.txHash))].flatMap(
    (txHash) => (txHash ? [txHash] : [])
  );
  const uniqueTxReceipts = await Promise.all(
    uniqueTxHashes.map(
      async (txHash) =>
        [txHash as Hex, await waitForTransaction(publicClient, txHash as Hex, waitForTransactionReceiptParams)] as const
    )
  );
  const txReceiptsMap = new Map(uniqueTxReceipts);
  const results = executeResponses.map((executeResponse) => {
    const txHash = executeResponse.txHash as Hex;
    const txReceipt = txReceiptsMap.get(txHash)!;
    return getCorrespondingResultAndLogs(txHash, txReceipt, executeResponse.index!);
  });
  return results;
}

async function getTransactionReceipt(
  hash: `0x${string}`,
  publicClient: PublicClient,
  params?: {
    maxAttempts?: number;
    pollInterval?: number;
  }
) {
  let rawReceipt = null;
  let attempts = 0;
  const maxAttempts = params?.maxAttempts ?? 20;
  const pollInterval = params?.pollInterval ?? 500; // 0.5 second

  while (!rawReceipt && attempts < maxAttempts) {
    rawReceipt = await publicClient.request(
      {
        method: 'eth_getTransactionReceipt',
        params: [hash],
      },
      { dedupe: true }
    );
    if (!rawReceipt) {
      attempts++;
      await new Promise((resolve) => setTimeout(resolve, pollInterval));
    }
  }

  if (!rawReceipt) throw new TransactionReceiptNotFoundError({ hash });

  const format = publicClient.chain?.formatters?.transactionReceipt?.format || formatTransactionReceipt;
  const receipt = format(rawReceipt) as GetTransactionReceiptReturnType<Chain>;
  return receipt;
}

export async function waitForTransaction(
  publicClient: PublicClient,
  hashPromise: Hex | Promise<Hex>,
  params?: {
    maxAttempts?: number;
    pollInterval?: number;
  }
) {
  let hash: Hex;
  try {
    hash = await hashPromise;
  } catch (error) {
    if (error instanceof ContractFunctionExecutionError) {
      throw new Error(error.shortMessage);
    }
    throw error;
  }
  const receipt = await getTransactionReceipt(hash, publicClient, params);

  return receipt;
}
