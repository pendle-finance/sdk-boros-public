import { Address, Hex, encodeAbiParameters, getAbiItem, keccak256 } from 'viem';
import { iAuthModuleAbi } from '../../contracts/viemAbis';
import { getInternalAgent } from '../../entities';
import {
  AccountPosition,
  CancelStruct,
  EnterExitMarketStruct,
  OrderStruct,
  PendleSignTxStruct,
  PositionTransferStruct,
} from '../../types';
import { AccountLib } from '../accountLib';
import { EIP712_DOMAIN_TYPES, PENDLE_BOROS_ROUTER_DOMAIN, UPDATE_SETTINGS_TYPES } from './common';

export const ACTION_INPUT_NAME_MAP = {
  placeOrders: 'orders',
  cancelOrders: 'cancels',
  positionTransfer: 'transfers',
  enterExitMarkets: 'enterExits',
} as const;

export type AgentAction =
  | { tag: 'placeOrders'; data: OrderStruct[] }
  | { tag: 'cancelOrders'; data: CancelStruct[] }
  | { tag: 'positionTransfer'; data: PositionTransferStruct[] }
  | { tag: 'enterExitMarkets'; data: EnterExitMarketStruct[] };

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

    const agent = getInternalAgent();
    const signer = agent.walletClient;
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
      account: agent.walletClient.account!,
      domain: PENDLE_BOROS_ROUTER_DOMAIN,
      types: {
        EIP712Domain: EIP712_DOMAIN_TYPES,
        PendleSignTx: pendleSignTxType,
      },
      primaryType: 'PendleSignTx',
      message,
    });

    results.push({
      agent: await agent.getAddress(),
      message,
      signature,
      params: contractParams,
    });
  }

  return results;
}

export async function signUpdateSettings(params: {
  accountPosition: AccountPosition;
  marketAddress: Address;
  leverage: number;
}) {
  const { accountPosition, marketAddress, leverage } = params;

  const agent = getInternalAgent();
  const agentAddress = await agent.getAddress();
  const signer = agent.walletClient;
  const timestamp = Date.now();

  const signature = await signer.signTypedData({
    account: agent.walletClient.account!,
    domain: PENDLE_BOROS_ROUTER_DOMAIN,
    types: {
      EIP712Domain: EIP712_DOMAIN_TYPES,
      UpdateSettings: UPDATE_SETTINGS_TYPES,
    },
    primaryType: 'UpdateSettings',
    message: {
      accountPosition,
      timestamp: BigInt(timestamp),
    },
  });

  return {
    accountPosition,
    marketAddress,
    leverage,
    signature,
    agent: agentAddress,
    timestamp,
  };
}
