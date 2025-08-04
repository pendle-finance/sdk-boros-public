import { Address, createPublicClient, encodeFunctionData, getContract, http } from 'viem';
import { WETH_ADDRESS } from './constants';
import { RPC_URL } from '../../common';
import { arbitrum } from 'viem/chains';
import { wethAbi } from './abi';

export class WrappedEth {
  private wrappedEthContract;
  constructor() {
    this.wrappedEthContract = getContract({
      address: WETH_ADDRESS,
      abi: wethAbi,
      client: createPublicClient({
        chain: arbitrum,
        transport: http(RPC_URL),
      }),
    });
  }

  async deposit(userAddress: Address, amount: bigint) {
    const data = encodeFunctionData({
      abi: wethAbi,
      functionName: 'deposit',
    });
    const gas = await this.wrappedEthContract.estimateGas.deposit({
      value: amount,
      account: userAddress,
    });
    return {
      from: userAddress,
      to: WETH_ADDRESS,
      data,
      gas,
      value: amount,
    };
  }

  async withdraw(userAddress: Address, amount: bigint) {
    const data = encodeFunctionData({
      abi: wethAbi,
      functionName: 'withdraw',
      args: [amount],
    });
    const gas = await this.wrappedEthContract.estimateGas.withdraw([amount], {
      account: userAddress,
    });
    return {
      from: userAddress,
      to: WETH_ADDRESS,
      data,
      gas,
    };
  }
}
