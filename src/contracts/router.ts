import { iRouterAbi } from '../contracts/abis/viemAbiRouter';
import { MulticallOptions } from '../multicall/multicall';
import { BaseContractHelper } from './base-contract-helper';

export class RouterContract extends BaseContractHelper<typeof iRouterAbi> {
  abi() {
    return iRouterAbi;
  }
}
