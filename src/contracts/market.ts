import { getRateAtTick } from '@pendle/boros-offchain-math';
import { iMarketOffAbi } from '../contracts/abis/viemAbis';
import { BaseContractHelper } from './base-contract-helper';
import { ContractOrder } from '../common/types';
import { MulticallOptions } from '../multicall/multicall';
import { MarketAcc, Side } from '../types';
import { TICK_MAX_VALUE, TICK_MIN_VALUE } from '../constants';

export class MarketContract extends BaseContractHelper<typeof iMarketOffAbi> {
  abi() {
    return iMarketOffAbi;
  }

  async getOrder(orderId: bigint, multicallOptions?: MulticallOptions): Promise<ContractOrder> {
    const order = await this.contract.read.getOrder(orderId, multicallOptions);
    return {
      status: order.status,
      id: order.id,
      maker: order.maker,
      size: order.size,
      rate: order.rate,
    };
  }

  async getDelevLiqNonce(user: MarketAcc, multicallOptions?: MulticallOptions) {
    const delevLiqNonce = await this.contract.read.getDelevLiqNonce(user, multicallOptions);
    return delevLiqNonce;
  }

  async getNotionalOI(multicallOptions?: MulticallOptions) {
    const notionalOI = await this.contract.read.getOI(multicallOptions);
    return notionalOI;
  }

  async getMarketConfig(multicallOptions?: MulticallOptions) {
    const config = await this.contract.read.getMarketConfig(multicallOptions);
    return config;
  }

  async getDescriptor(multicallOptions?: MulticallOptions) {
    const descriptor = await this.contract.read.descriptor(multicallOptions);
    return {
      isIsolatedOnly: descriptor[0],
      tokenId: descriptor[1],
      marketId: descriptor[2],
      maturity: descriptor[3],
      tickStep: descriptor[4],
    };
  }

  async getImpliedRateData(multicallOptions?: MulticallOptions) {
    const data = await this.contract.read.getImpliedRate(multicallOptions);
    return {
      lastTradedRate: data[0],
      oracleRate: data[1],
      lastTradedTime: data[2],
      observationWindow: data[3],
    };
  }

  async getMarkRateView(multicallOptions?: MulticallOptions) {
    const markApr = await this.contract.read.getMarkRateView(multicallOptions);
    return markApr;
  }

  async getLatestFTime(multicallOptions?: MulticallOptions) {
    const latestFTime = await this.contract.read.getLatestFTime(multicallOptions);
    return latestFTime;
  }

  async getBestBidTickAndApr(tickStep: bigint, multicallOptions?: MulticallOptions) {
    const bestBidTicks = await this.getNextNTicks(Side.LONG, TICK_MIN_VALUE, 1n, multicallOptions);
    if (bestBidTicks.ticks.length === 0) {
      return undefined;
    }
    return { tick: bestBidTicks.ticks[0], apr: getRateAtTick(BigInt(bestBidTicks.ticks[0]), tickStep) };
  }

  async getBestBidApr(tickStep: bigint, multicallOptions?: MulticallOptions) {
    const bestBidTicks = await this.getNextNTicks(Side.LONG, TICK_MIN_VALUE, 1n, multicallOptions);

    if (bestBidTicks.ticks.length === 0) {
      return undefined;
    }

    return getRateAtTick(BigInt(bestBidTicks.ticks[0]), tickStep);
  }

  async getBestAskTickAndApr(tickStep: bigint, multicallOptions?: MulticallOptions) {
    const bestAskTicks = await this.getNextNTicks(Side.SHORT, TICK_MAX_VALUE, 1n, multicallOptions);
    if (bestAskTicks.ticks.length === 0) {
      return undefined;
    }
    return { tick: bestAskTicks.ticks[0], apr: getRateAtTick(BigInt(bestAskTicks.ticks[0]), tickStep) };
  }

  async getBestAskApr(tickStep: bigint, multicallOptions?: MulticallOptions) {
    const bestAskTicks = await this.getNextNTicks(Side.SHORT, TICK_MAX_VALUE, 1n, multicallOptions);

    if (bestAskTicks.ticks.length === 0) {
      return undefined;
    }

    return getRateAtTick(BigInt(bestAskTicks.ticks[0]), tickStep);
  }

  async getNextNTicks(side: Side, limitTick: number, maxNTicks: bigint, multicallOptions?: MulticallOptions) {
    const nTicks = await this.contract.read.getNextNTicks(side, limitTick, maxNTicks, multicallOptions);
    return {
      ticks: nTicks[0],
      sizes: nTicks[1],
    };
  }
}
