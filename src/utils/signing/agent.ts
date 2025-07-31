import { Address, Hex, getAbiItem, keccak256 } from 'viem';
import { iRouterAbi } from '../../contracts/abis/viemAbis';
import { Agent, getInternalAgent } from '../../entities';
import { Environment } from '../../addresses';
import { MarketAcc, PendleSignTxStruct, functionEncoder } from '../../types';
import { AccountLib } from '../accountLib';
import { AGENT_MESSAGE_TYPES, EIP712_DOMAIN_TYPES, PENDLE_BOROS_ROUTER_DOMAIN, UPDATE_SETTINGS_TYPES } from './common';

export type AgentExecution = keyof typeof functionEncoder;

export type SignedAgentExecution = {
  agent: Address;
  message: PendleSignTxStruct;
  signature: Hex;
  calldata: Hex;
};

async function messagesToSigns(params: {
  calldatas: Hex[];
  messages: PendleSignTxStruct[];
  env: Environment;
}) {
  const { calldatas, messages, env } = params;
  const agent = getInternalAgent();
  const signer = agent.walletClient;
  const pendleSignTxType = getAbiItem({
    abi: iRouterAbi,
    name: 'agentExecute',
  }).inputs.find((item) => item.name === 'message')!.components;


  const signatures = await Promise.all(
    messages.map((message) =>
      signer.signTypedData({
        account: agent.walletClient.account!,
        domain: PENDLE_BOROS_ROUTER_DOMAIN(env),
        types: {
          EIP712Domain: EIP712_DOMAIN_TYPES,
          PendleSignTx: pendleSignTxType,
        },
        primaryType: 'PendleSignTx',
        message,
      })
    )
  );

  const signs = await Promise.all(
    signatures.map(async (signature, index) => ({
      agent: await agent.getAddress(),
      message: messages[index],
      signature,
      calldata: calldatas[index],
    }))
  );

  return signs;
}

export async function bulkSignWithAgentV2(params: {
  root: Address;
  executeParams: {
    accountId: number;
    calldata: Hex;
  }[];
  env: Environment;
}) {
  const { root, executeParams, env } = params;
  const messages: PendleSignTxStruct[] = [];
  for (let i = 0; i < executeParams.length; i++) {
    const nonce = BigInt(Date.now());
    const message: PendleSignTxStruct = {
      account: AccountLib.pack(root, executeParams[i].accountId),
      connectionId: keccak256(executeParams[i].calldata),
      nonce,
    };
    await new Promise((resolve) => setTimeout(resolve, 5));
    messages.push(message);
  }
  const calldatas = executeParams.map((param) => param.calldata);

  const signs = await messagesToSigns({ calldatas, messages, env });
  return signs;
}

export async function bulkSignWithAgent(params: {
  root: Address;
  accountId: number;
  calldatas: Hex[];
  env: Environment;
}) {
  const { root, accountId, calldatas, env } = params;
  const messages: PendleSignTxStruct[] = [];
  for (let i = 0; i < calldatas.length; i++) {
    const nonce = BigInt(Date.now());
    const message: PendleSignTxStruct = {
      account: AccountLib.pack(root, accountId),
      connectionId: keccak256(calldatas[i]),
      nonce,
    };
    await new Promise((resolve) => setTimeout(resolve, 5));
    messages.push(message);
  }

  const signs = await messagesToSigns({ calldatas, messages, env });
  return signs;
}

export async function signWithAgent(params: {
  root: Address;
  accountId: number;
  calldata: Hex;
  env: Environment;
  agent?: Agent;
}): Promise<SignedAgentExecution> {
  const { root, accountId, calldata, env } = params;

  const message: PendleSignTxStruct = {
    account: AccountLib.pack(root, accountId),
    connectionId: keccak256(calldata),
    nonce: BigInt(Date.now()),
  };

  const agent = params.agent ?? getInternalAgent();
  const signer = agent.walletClient;
  const pendleSignTxType = getAbiItem({
    abi: iRouterAbi,
    name: 'agentExecute',
  }).inputs.find((item) => item.name === 'message')!.components;

  const signature = await signer.signTypedData({
    account: agent.walletClient.account!,
    domain: PENDLE_BOROS_ROUTER_DOMAIN(env),
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
    calldata,
  };
}

export async function signUpdateSettings(params: {
  marketAcc: MarketAcc;
  marketId: number;
  leverage: number;
  env: Environment;
}) {
  const { marketAcc, marketId, leverage, env } = params;

  const agent = getInternalAgent();
  const agentAddress = await agent.getAddress();
  const signer = agent.walletClient;
  const timestamp = Date.now();

  const signature = await signer.signTypedData({
    account: agent.walletClient.account!,
    domain: PENDLE_BOROS_ROUTER_DOMAIN(env),
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
    marketId,
    leverage,
    signature,
    agent: agentAddress,
    timestamp,
  };
}

export async function getAgentSignature(params: {
  env: Environment;
}) {
  const { env } = params;
  const agent = getInternalAgent();
  const agentAddress = await agent.getAddress();
  const signer = agent.walletClient;
  const timestamp = Date.now();

  const signature = await signer.signTypedData({
    account: agent.walletClient.account!,
    domain: PENDLE_BOROS_ROUTER_DOMAIN(env),
    types: {
      EIP712Domain: EIP712_DOMAIN_TYPES,
      AgentMessage: AGENT_MESSAGE_TYPES,
    },
    primaryType: 'AgentMessage',
    message: {
      timestamp: BigInt(timestamp),
    },
  });

  return { agent: agentAddress, signature, timestamp };
}
