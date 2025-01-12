import { http, Address, Hex, createWalletClient, encodeAbiParameters, getAbiItem, keccak256 } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { AGENT_PRIVATE_KEY, AGENT_PUBLIC_ADDRESS, RPC_URL } from '../../constants';
import { iAuthModuleAbi } from '../../contracts/viemAbis';
import { CancelStruct, OrderStruct, PendleSignTxStruct, PositionTransferStruct } from '../../types';
import { AccountLib } from '../accountLib';
import { EIP712_DOMAIN_TYPES, PENDLE_BOROS_ROUTER_DOMAIN } from './common';

export const ACTION_INPUT_NAME_MAP = {
  placeOrders: 'orders',
  cancelOrders: 'cancels',
  positionTransfer: 'transfers',
} as const;

export type AgentAction =
  | { tag: 'placeOrders'; data: OrderStruct[] }
  | { tag: 'cancelOrders'; data: CancelStruct[] }
  | { tag: 'positionTransfer'; data: PositionTransferStruct[] };

export type SignedAgentCall<T extends AgentAction> = {
  agent: Address;
  message: PendleSignTxStruct;
  signature: Hex;
  params: T;
};

// FIXME: @negativez2 strengthen the types
export async function signWithAgent(params: {
  root: Address;
  accountId: number;
  calls: AgentAction[];
}): Promise<SignedAgentCall<AgentAction>[]> {
  const { root, accountId, calls } = params;

  const results = [];

  for (const contractParams of calls) {
    const primaryInput = (
      getAbiItem({
        abi: iAuthModuleAbi,
        name: contractParams.tag,
      }) as any
    ).inputs;

    const primaryType = primaryInput.find((item: any) => item.name === ACTION_INPUT_NAME_MAP[contractParams.tag])!;

    const signer = createWalletClient({
      account: privateKeyToAccount(AGENT_PRIVATE_KEY as Hex),
      transport: http(RPC_URL),
    });

    const pendleSignTxType = getAbiItem({
      abi: iAuthModuleAbi,
      name: 'hashPendleSignTx',
    }).inputs.find((item) => item.name === 'message')!.components;

    const message: PendleSignTxStruct = {
      account: AccountLib.pack(root, accountId),
      connectionId: keccak256(encodeAbiParameters([primaryType], [contractParams.data])),
      nonce: BigInt(Date.now()),
    };

    const signature = await signer.signTypedData({
      account: privateKeyToAccount(AGENT_PRIVATE_KEY as Hex),
      domain: PENDLE_BOROS_ROUTER_DOMAIN,
      types: {
        EIP712Domain: EIP712_DOMAIN_TYPES,
        PendleSignTx: pendleSignTxType,
      },
      primaryType: 'PendleSignTx',
      message,
    });

    results.push({
      agent: AGENT_PUBLIC_ADDRESS,
      message,
      signature,
      params: contractParams,
    });
  }

  return results;
}
