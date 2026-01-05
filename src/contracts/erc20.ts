import { Address, PublicClient, erc20Abi, maxUint256 } from 'viem';
import { MULTICALL_ADDRESS } from '../multicall/constants';
import { Multicall, MulticallOptions } from '../multicall/multicall';
import { BaseContractHelper } from './base-contract-helper';

const NATIVE_TOKEN_ADDRESS = '0x0000000000000000000000000000000000000000';

const multicallRegistry = new WeakMap<PublicClient, Multicall>();

function getOrCreateMulticall(client: PublicClient): Multicall {
  let mc = multicallRegistry.get(client);
  if (!mc) {
    mc = new Multicall({ address: MULTICALL_ADDRESS, client });
    multicallRegistry.set(client, mc);
  }
  return mc;
}

export class ERC20 extends BaseContractHelper<typeof erc20Abi> {
  abi() {
    return erc20Abi;
  }

  static create(address: Address, { client, multicall }: { client: PublicClient; multicall?: Multicall }) {
    const mc = multicall ?? getOrCreateMulticall(client);
    if (address === NATIVE_TOKEN_ADDRESS) {
      return new NativeToken(address, { client, multicall: mc });
    }
    return new ERC20(address, { client, multicall: mc });
  }

  protected constructor(
    address: Address,
    { client, multicall }: { client: PublicClient; multicall: Multicall | undefined }
  ) {
    super(address, { client, multicall });
  }

  async balanceOf(address: Address, multicallOptions?: MulticallOptions): Promise<bigint> {
    return await this.contract.read.balanceOf(address, multicallOptions);
  }

  async allowance(address: Address, spender: Address, multicallOptions?: MulticallOptions): Promise<bigint> {
    return await this.contract.read.allowance(address, spender, multicallOptions);
  }
}

export class NativeToken extends ERC20 {
  constructor(address: Address, { client, multicall }: { client: PublicClient; multicall: Multicall | undefined }) {
    super(address, { client, multicall });
  }

  override async balanceOf(address: Address, multicallOptions?: MulticallOptions): Promise<bigint> {
    return await this.client.getBalance({ address, blockTag: multicallOptions?.blockTag });
  }

  override async allowance(): Promise<bigint> {
    return maxUint256;
  }
}
