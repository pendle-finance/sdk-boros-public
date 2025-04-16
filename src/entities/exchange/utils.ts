import { Hex, Log, PublicClient, decodeEventLog, encodeFunctionData, parseEventLogs } from 'viem';
import * as Abis from '../../contracts/viemAbis';
import { publicClient } from '../publicClient';
import { SimulateReturnType } from 'viem/actions';
import { iRouterAbi } from '../../contracts/viemAbis';
import { SignedAgentExecution } from '../../utils';
import { ROUTER_ADDRESS } from '../../addresses';

export async function parseEvents(txHash: Hex) {
  const receipt = await publicClient.waitForTransactionReceipt({ hash: txHash });
  return {
    hub: parseEventLogs({ abi: Abis.iMarketHubAbi, logs: receipt.logs }),
    market: parseEventLogs({ abi: Abis.iMarketOffAbi, logs: receipt.logs }),
  };
}

export function decodeLog(log: Log<bigint, number, false>) {
  const abis = Array.from(Object.values(Abis));
  for (const abi of abis) {
    try {
      return decodeEventLog({ abi, data: log.data, topics: log.topics });
    } catch (error) {
      continue;
    }
  }
  return null;
}

export async function getTransactionData(txHash: Hex) {
  const receipt = await publicClient.getTransactionReceipt({ hash: txHash });
  const decodedLogs = receipt.logs.map((log) => decodeLog(log));
  return { decodedLogs };
}

export async function getAgentExecuteCalldata(query: SignedAgentExecution) {
  const calldata = encodeFunctionData({
    abi: iRouterAbi,
    functionName: 'agentExecute',
    args: [
      query.agent,
      {
        account: query.message.account,
        connectionId: query.message.connectionId,
        nonce: BigInt(query.message.nonce),
      },
      query.signature,
      query.calldata,
    ],
  });
  return calldata;
}

export async function simulateDirectCall(
  publicClient: PublicClient,
  signedAgentExecution: SignedAgentExecution
): Promise<SimulateReturnType> {
  const calldata = await getAgentExecuteCalldata(signedAgentExecution);
  const result = await publicClient.simulate({
    blocks: [
      {
        calls: [
          {
            to: ROUTER_ADDRESS,
            data: calldata,
          },
        ],
      },
    ],
  });
  return result;
}
