import { http, Address, Hex, WalletClient, createWalletClient, encodeFunctionData, toHex } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { base } from 'viem/chains';
import { RPC_URL } from '../../common';
import { iAuthModuleAbi } from '../../contracts/viemAbis';
import { Account, ApproveAgentStruct } from '../../types';
import { AccountLib, getUserAddressFromWalletClient, signApproveAgentMessage } from '../../utils';
import { getWelcomeMessage } from '../../utils/signing/common';
import { router } from '../router';

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
      BigInt(signature) & BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'),
      { size: 32 }
    );

    const agent = new Agent(privateKey);
    return { agent, privateKey };
  }

  async approveAgent(userWalletClient: WalletClient, expiry_s: number): Promise<Hex> {
    const userAddress = await getUserAddressFromWalletClient(userWalletClient);
    const approveAgentStruct = await this.createApproveAgentStruct(userAddress, expiry_s);
    const approveSignature = await signApproveAgentMessage(userWalletClient, approveAgentStruct);
    return this.getApproveAgentData(approveAgentStruct, approveSignature);
  }

  async getExpiry(account: Account): Promise<number> {
    const agentAddress = await this.getAddress();
    const expiry = await router.read.viewCall([
      encodeFunctionData({
        abi: iAuthModuleAbi,
        functionName: 'agentExpiry',
        args: [account, agentAddress],
      }),
    ]);
    return Number(expiry);
  }

  async getAddress(): Promise<Address> {
    const [agentAddress] = await this.walletClient.getAddresses();
    return agentAddress;
  }
}
