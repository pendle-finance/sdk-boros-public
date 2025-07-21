
import {
  http,
  Address,
  GetContractReturnType,
  PublicClient,
  WalletClient,
  createPublicClient,
  getContract,
  webSocket,
} from 'viem';
import { arbitrum } from 'viem/chains';
import { Explorer } from './explorer';
import { Multicall } from '../multicall/multicall';
import { iMulticall3Abi } from './abis/viemAbis';
import { RPC_URL } from '../common';
import { MULTICALL_ADDRESS } from '../multicall/constants';
import { MarketContract } from './market';
import { AMM } from './amm';

export class ContractsFactory {

  private rpcClient: PublicClient; //map should be faster to read
  private multicallContract: Multicall | undefined;
  private RPC_URL: string;
  constructor(rpcUrl?: string) {
    this.RPC_URL = rpcUrl ?? RPC_URL;
    this.rpcClient = this.createRpcClient();
  }

  getCachedMulticall(address: Address, client: PublicClient): Multicall {
    if (!this.multicallContract) {
      this.multicallContract = new Multicall({
        address,
        client,
      });
    }
    return this.multicallContract;
  }

  clearMulticallCache() {
    this.multicallContract = undefined;
  }

  getProviderUrl(): string {
    return this.RPC_URL;
  }

  createRpcClient(): PublicClient {
    return createPublicClient({
      transport: http(this.getProviderUrl()),
      chain: arbitrum,
    }) as unknown as PublicClient;
  }

  getRpcClient(): PublicClient {
    return this.rpcClient;
  }

  getRpcClientAndMulticall(): { client: PublicClient; multicall: Multicall | undefined } {
    const client = this.getRpcClient();
    const multicall: Address = MULTICALL_ADDRESS;

    return {
      client,
      multicall: this.getCachedMulticall(multicall, client),
    };
  }


  getExplorerContract(address: Address, walletClient?: WalletClient) {
    return new Explorer(address, this.getRpcClientAndMulticall(), walletClient);
  }

  getMarketContract(address: Address, walletClient?: WalletClient) {
    return new MarketContract(address, this.getRpcClientAndMulticall(), walletClient);
  }

  getAmmContract(address: Address, walletClient?: WalletClient) {
    return new AMM(address, this.getRpcClientAndMulticall(), walletClient);
  }

  getMulticall3Contract(address: Address): GetContractReturnType<typeof iMulticall3Abi, PublicClient, Address> {
    const client = this.getRpcClient();
    const contract = getContract({
      address: address,
      abi: iMulticall3Abi,
      client,
    });
    return contract;
  }
}
