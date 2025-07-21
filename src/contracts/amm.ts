
import { MulticallOptions } from '../multicall/multicall';
import { MarketAcc } from '../types';
import { iAMMAbi } from './abis/viemAbis';
import { BaseContractHelper } from './base-contract-helper';

export class AMM extends BaseContractHelper<typeof iAMMAbi> {
  abi() {
    return iAMMAbi;
  }

  async readState() {
    return await this.contract.read.readState();
  }

  async impliedRate() {
    return await this.contract.read.impliedRate();
  }

  async feeRate() {
    return await this.contract.read.feeRate();
  }

  async marketAcc() {
    return await this.contract.read.SELF_ACC();
  }

  async balanceOf(marketAcc: MarketAcc, multicallOptions?: MulticallOptions) {
    return await this.contract.read.balanceOf(marketAcc, multicallOptions);
  }

  async calcSwapSize(targetRate: bigint, multicallOptions?: MulticallOptions) {
    return await this.contract.read.calcSwapSize(targetRate, multicallOptions);
  }

  async totalSupply(multicallOptions?: MulticallOptions) {
    return await this.contract.read.totalSupply(multicallOptions);
  }

  async totalSupplyCap(multicallOptions?: MulticallOptions) {
    return await this.contract.read.totalSupplyCap(multicallOptions);
  }
}
