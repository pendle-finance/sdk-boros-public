import { Address, Hex, getAbiItem, keccak256 } from 'viem';
import { iRouterAbi } from '../../contracts/viemAbis';
import { getInternalAgent } from '../../entities';
import { MarketAcc, PendleSignTxStruct, functionEncoder } from '../../types';
import { AccountLib } from '../accountLib';
import { EIP712_DOMAIN_TYPES, PENDLE_BOROS_ROUTER_DOMAIN, UPDATE_SETTINGS_TYPES } from './common';

export type AgentExecution = keyof typeof functionEncoder;

// export type AgentExecuteParams<T extends AgentExecution> = {
//   tag: T;
//   data: Parameters<(typeof functionEncoder)[T]>[0];
// };

export type AgentExecuteParams = {
  tag: string;
  data: Hex;
}

export type SignedAgentExecution = {
  agent: Address;
  message: PendleSignTxStruct;
  signature: Hex;
  calldata: Hex;
};

export async function signWithAgent(params: {
  root: Address;
  accountId: number;
  call: AgentExecuteParams;
}): Promise<SignedAgentExecution> {
  const {
    root,
    accountId,
    call: { tag, data },
  } = params;

  const calldata = data;
  const message: PendleSignTxStruct = {
    account: AccountLib.pack(root, accountId),
    connectionId: keccak256(calldata),
    nonce: BigInt(Date.now()),
  };

  const agent = getInternalAgent();
  const signer = agent.walletClient;
  const pendleSignTxType = getAbiItem({
    abi: iRouterAbi,
    name: 'agentExecute',
  }).inputs.find((item) => item.name === 'message')!.components;

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

  return {
    agent: await agent.getAddress(),
    message,
    signature,
    calldata: data,
  };
}

export async function signUpdateSettings(params: {
  marketAcc: MarketAcc;
  marketAddress: Address;
  leverage: number;
}) {
  const { marketAcc, marketAddress, leverage } = params;

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
      marketAcc,
      timestamp: BigInt(timestamp),
    },
  });

  return {
    marketAcc,
    marketAddress,
    leverage,
    signature,
    agent: agentAddress,
    timestamp,
  };
}
