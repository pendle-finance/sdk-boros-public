import { FixedX18 } from '@pendle/boros-offchain-math';
import { MarketAcc, Side, TimeInForce } from '../types';
import { iExplorerAbi } from './abis/viemAbis';
import { BaseContractHelper } from './base-contract-helper';
import { MulticallOptions } from '../multicall/multicall';
import { ContractUserInfo } from '../common/types';

export class Explorer extends BaseContractHelper<typeof iExplorerAbi> {
  abi() {
    return iExplorerAbi;
  }

  async getUserInfo(marketAcc: MarketAcc, multicallOptions?: MulticallOptions): Promise<ContractUserInfo> {
    const userInfo = await this.contract.simulate.getUserInfo(marketAcc, multicallOptions);
    return userInfo as ContractUserInfo;
  }

  async getMarketInfo(marketId: number, multicallOptions?: MulticallOptions) {
    const marketInfo = await this.contract.read.getMarketInfo(marketId, multicallOptions);
    return {
      impliedApr: marketInfo.impliedApr,
      underlyingApr: marketInfo.underlyingApr,
      nextSettlementTime: marketInfo.nextSettleTime,
      name: marketInfo.name,
      symbol: marketInfo.symbol,
      isIsolatedOnly: marketInfo.isIsolatedOnly,
      tokenId: marketInfo.tokenId,
      marketId: marketInfo.marketId,
      maturity: marketInfo.maturity,
      tickStep: marketInfo.tickStep,
      iTickThresh: marketInfo.iTickThresh,
      isMatured: marketInfo.isMatured,
      markApr: marketInfo.markApr,
    };
  }

  async getMarketOrderBook(
    marketId: number,
    Side: Side,
    fromTick: number,
    toTick: number,
    multicallOptions?: MulticallOptions,
  ) {
    return await this.contract.read.getMarketOrderBook(marketId, Side, fromTick, toTick, multicallOptions);
  }

  async getUserInfoAfterPlaceOrder(
    marketAcc: MarketAcc,
    marketId: number,
    ammId: number,
    side: number,
    timeInForce: TimeInForce,
    size: bigint,
    limitTick: number,
    desiredMatchRate: FixedX18,
    multicallOptions?: MulticallOptions,
  ) {
    const [preUserInfo, postUserInfo, matched, marginRequired] =
      await this.contract.simulate.getUserInfoAfterPlaceOrder(
        marketAcc,
        marketId,
        ammId,
        side,
        timeInForce,
        size,
        limitTick,
        desiredMatchRate.value,
        multicallOptions,
      );
    return {
      preUserInfo: preUserInfo as ContractUserInfo,
      postUserInfo: postUserInfo as ContractUserInfo,
      matched,
      marginRequired,
    };
  }

  async getUserInfoAfterBulkCancels(
    marketAcc: MarketAcc,
    marketId: number,
    cancelAll: boolean,
    orderIds: bigint[],
    multicallOptions?: MulticallOptions,
  ) {
    const [preUserInfo, postUserInfo] = await this.contract.simulate.getUserInfoAfterBulkCancels(
      marketAcc,
      marketId,
      cancelAll,
      orderIds,
      multicallOptions,
    );
    return {
      preUserInfo: preUserInfo as ContractUserInfo,
      postUserInfo: postUserInfo as ContractUserInfo,
    };
  }
}
