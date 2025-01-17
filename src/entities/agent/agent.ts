import { Address, createWalletClient, encodeFunctionData, Hex, http, toHex, WalletClient } from 'viem';
import { base } from 'viem/chains';
import { AccountLib, getRouterDirectCallData, sendTx, signApproveAgentMessage } from '../../utils';
import { ApproveAgentStruct } from '../../types';
import { iAuthModuleAbi } from '../../contracts/viemAbis';
import { privateKeyToAccount } from 'viem/accounts';
import { getWelcomeMessage } from '../../utils/signing/common';
import { RPC_URL } from '../../common';

let internalAgent: Agent | undefined;
export function setInternalAgent(agent: Agent) {
  internalAgent = agent;
}

export function getInternalAgent(): Agent {
  if (!internalAgent) {
    throw new Error('Internal agent is not set');
  }
  return internalAgent;
}
export class Agent {
  walletClient: WalletClient;

  private constructor(private readonly privateKey: Hex) {
    const account = privateKeyToAccount(this.privateKey);
    this.walletClient = createWalletClient({ account, transport: http(RPC_URL), chain: base });
  }

  private async createApproveAgentStruct(userAddress: Address, expiry_s: number): Promise<ApproveAgentStruct> {
    const agentAddress = await this.getAddress();
    const nonce = BigInt(Date.now());
    return {
      account: AccountLib.pack(userAddress, 0),
      agent: agentAddress,
      expiry: BigInt(expiry_s),
      nonce,
    };
  }

  private getApproveAgentData(approveAgentStruct: ApproveAgentStruct, signature: Hex): Hex {
    const data = encodeFunctionData({
      abi: iAuthModuleAbi,
      functionName: 'approveAgent',
      args: [approveAgentStruct, signature, { version: 0, data: '0x' }],
    });

    return data;
  }

  static createFromPrivateKey(privateKey: Hex): Agent {
    return new Agent(privateKey);
  }

  static async create(userWalletClient: WalletClient): Promise<{ agent: Agent; privateKey: Hex }> {
    const message = getWelcomeMessage();
    const [userAddress] = await userWalletClient.getAddresses();
    const signature = await userWalletClient.signMessage({ account: userWalletClient.account ?? userAddress, message });
    const privateKey = toHex(
      BigInt(signature) & BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
    );

    const agent = new Agent(privateKey);
    return { agent, privateKey };
  }

  async approveAgent(userWalletClient: WalletClient, expiry_s: number): Promise<void> {
    const [userAddress] = await userWalletClient.getAddresses();
    const approveAgentStruct = await this.createApproveAgentStruct(userAddress, expiry_s);
    const approveSignature = await signApproveAgentMessage(userWalletClient, approveAgentStruct);
    const data = this.getApproveAgentData(approveAgentStruct, approveSignature);
    await sendTx(userWalletClient, getRouterDirectCallData([data]));
  }

  async getAddress(): Promise<Address> {
    const [agentAddress] = await this.walletClient.getAddresses();
    return agentAddress;
  }
}
