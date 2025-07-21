import { Abi, Address, GetContractReturnType, PublicClient, WalletClient, getContract } from 'viem';
import { Contract } from '../common/types';
import { Multicall, MulticallFuncs } from '../multicall/multicall';

export abstract class BaseContractHelper<abi extends Abi, T extends Contract<abi> = Contract<abi>> {
  abstract abi(): abi;

  protected contract: MulticallFuncs<abi>;
  protected client: PublicClient;
  public rawContract: T;
  public address: Address;
  public walletContract?: GetContractReturnType<abi, WalletClient>;
  constructor(
    address: Address,
    { client, multicall }: { client: PublicClient; multicall: Multicall | undefined },
    walletClient?: WalletClient,
  ) {
    this.address = address;
    this.client = client;

    const rawContract = getContract({
      address,
      client,
      abi: this.abi(),
    }) as unknown as T;
    this.rawContract = rawContract;
    if (multicall) {
      this.contract = multicall.wrap(rawContract);
    } else {
      this.contract = rawContract as unknown as MulticallFuncs<abi>;
    }
    if (walletClient) {
      this.walletContract = getContract({
        address,
        client: walletClient,
        abi: this.abi(),
      }) as unknown as GetContractReturnType<abi, WalletClient>;
    }
  }
}
