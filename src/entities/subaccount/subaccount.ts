import { Address, createPublicClient, encodeFunctionData, getContract, http } from 'viem';
import { getExplorerContractAddress, getRouterAddress } from '../../addresses';
import { iExplorerAbi, iRouterAbi } from '../../contracts';
import { arbitrum } from 'viem/chains';
import { RPC_URL } from '../../common';
import { MarketAccLib } from '../../utils';

export class Subaccount {
  private explorerContract;
  private routerContract;
  constructor() {
    this.explorerContract = getContract({
      address: getExplorerContractAddress(),
      abi: iExplorerAbi,
      client: createPublicClient({
        chain: arbitrum,
        transport: http(RPC_URL),
      }),
    });
    this.routerContract = getContract({
      address: getRouterAddress(),
      abi: iRouterAbi,
      client: createPublicClient({
        chain: arbitrum,
        transport: http(RPC_URL),
      }),
    });
  }

  async getMarketAccCash(userAddress: Address, accountId: number, tokenId: number, marketId: number) {
    const marketAcc = MarketAccLib.pack(userAddress, accountId, tokenId, marketId);
    const userInfo = await this.explorerContract.simulate.getUserInfo([marketAcc]);
    return userInfo.result.totalCash;
  }

  async withdrawCash(userAddress: Address, accountId: number, tokenId: number, marketId: number, amount: bigint) {
    const data = encodeFunctionData({
      abi: iRouterAbi,
      functionName: 'subaccountTransfer',
      args: [accountId, tokenId, marketId, amount, false],
    });
    const gas = await this.routerContract.estimateGas.subaccountTransfer(
      [accountId, tokenId, marketId, amount, false],
      {
        account: userAddress,
      }
    );
    return {
      from: userAddress,
      to: getRouterAddress(),
      data,
      gas: gas * 2n,
    };
  }

  async depositCash(userAddress: Address, accountId: number, tokenId: number, marketId: number, amount: bigint) {
    const data = encodeFunctionData({
      abi: iRouterAbi,
      functionName: 'subaccountTransfer',
      args: [accountId, tokenId, marketId, amount, true],
    });
    const gas = await this.routerContract.estimateGas.subaccountTransfer([accountId, tokenId, marketId, amount, true], {
      account: userAddress,
    });
    return {
      from: userAddress,
      to: getRouterAddress(),
      data,
      gas: gas * 2n,
    };
  }
}
