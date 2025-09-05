import {
  http,
  Address,
  GetContractReturnType,
  PublicClient,
  WalletClient,
  createPublicClient,
  getContract,
  Transport,
} from 'viem';
import { arbitrum } from 'viem/chains';
import { Explorer } from './explorer';
import { Multicall } from '../multicall/multicall';
import { iMulticall3Abi } from './abis/viemAbis';
import { MULTICALL_ADDRESS } from '../multicall/constants';
import { MarketContract } from './market';
import { AMM } from './amm';
import { fallbackRpcTransport } from './viem-transport';
import { httpConfig } from '../config/http';

export class ContractsFactory {
  private rpcClient: PublicClient; //map should be faster to read
  private multicallContract: Multicall | undefined;
  private RPC_URLs: string[];
  constructor(rpcUrls: string[]) {
    this.RPC_URLs = rpcUrls;
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

  getProviderUrls(): string[] {
    return this.RPC_URLs;
  }

  private createRpcClientWithTransport(transport: Transport) {
    return createPublicClient({
      transport,
      chain: arbitrum,
    }) as unknown as PublicClient;
  }

  getRpcHttpTransport() {
    const rpcProviders = this.getProviderUrls();
    const retryCount = rpcProviders.length > 1 ? 0 : undefined;
    return fallbackRpcTransport(
      rpcProviders.map((rpc) =>
        http(rpc, {
          fetchOptions: {
            keepalive: httpConfig.getKeepAliveValue(),
          },
        })
      ),
      {
        retryCount,
      }
    );
  }

  private createRpcClient(): PublicClient {
    return this.createRpcClientWithTransport(this.getRpcHttpTransport());
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
