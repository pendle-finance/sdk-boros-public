import { Address } from 'viem';
import { iDepositBoxFactoryAbi } from './abis/viemAbiDepositBoxFactory';
import { BaseContractHelper } from './base-contract-helper';
import { MulticallOptions } from '../multicall/multicall';

export class DepositBoxFactoryContract extends BaseContractHelper<typeof iDepositBoxFactoryAbi> {
  abi() {
    return iDepositBoxFactoryAbi;
  }

  async computeDepositBox(root: Address, boxId: number, multicallOptions?: MulticallOptions) {
    const [box, salt, deployed] = await this.contract.read.computeDepositBox(root, boxId, multicallOptions);
    return { box, salt, deployed };
  }
}
