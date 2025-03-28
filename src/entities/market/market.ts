import { FixedX18 } from '@pendle/boros-offchain-math';

const MARKET_ORDER_BUFFER_RATE = FixedX18.fromNumber(0.1); // 10%
const BUFFERED_INITIAL_MARGIN_RATE_RATIO = FixedX18.fromNumber(0.01); // 1%
const SECONDS_PER_YEARS = 3600 * 24 * 365;

export type MarketConfig = {
  // market info
  marginFactor: FixedX18;
  markRate: FixedX18;
  minMarginIndexRate: FixedX18;
  minMarginIndexDuration_s: number;
  marketExpiry_s: number;
};

export type LeverageConfig = {
  leverage: number;
};

export type TradeInfo = {
  orderRate: FixedX18;
  isMarketOrder: boolean;
};

export type GetOrderSizeByExactInitialMarginParams = MarketConfig &
  LeverageConfig &
  TradeInfo & {
    initialMargin: bigint;
  };

export type GetInitialMarginByOrderSizeParams = MarketConfig &
  LeverageConfig &
  TradeInfo & {
    orderSize: bigint;
  };

export type GetOrderValueParams = {
  orderSize: bigint;
  orderRate: FixedX18;
  marketExpiry_s: number;
};

export class Market {
  static getOrderSizeByExactInitialMargin(params: GetOrderSizeByExactInitialMarginParams): bigint {
    const imSuf = Market.getIMSuf(params);

    // calculate the order size
    const orderSize = FixedX18.fromRawValue(params.initialMargin)
      .divDown(imSuf)
      .divDown(FixedX18.ONE.add(BUFFERED_INITIAL_MARGIN_RATE_RATIO)).value;

    return orderSize;
  }

  static getInitialMarginByOrderSize(params: GetInitialMarginByOrderSizeParams): bigint {
    const imSuf = Market.getIMSuf(params);

    return FixedX18.fromRawValue(params.orderSize)
      .mulDown(imSuf)
      .mulDown(FixedX18.ONE.add(BUFFERED_INITIAL_MARGIN_RATE_RATIO)).value;
  }

  private static getIMSuf(data: MarketConfig & LeverageConfig & TradeInfo): FixedX18 {
    const {
      orderRate,
      leverage,
      marginFactor,
      markRate,
      minMarginIndexRate,
      marketExpiry_s,
      minMarginIndexDuration_s,
      isMarketOrder,
    } = data;

    const timeToMaturity_y = (marketExpiry_s - Math.floor(Date.now() / 1000)) / SECONDS_PER_YEARS;
    const minTime_y = minMarginIndexDuration_s / SECONDS_PER_YEARS;

    const time = FixedX18.fromNumber(Math.max(timeToMaturity_y, minTime_y));
    const contractRate = markRate.gt(minMarginIndexRate) ? markRate : minMarginIndexRate;
    const offchainRate = orderRate.gt(minMarginIndexRate) ? orderRate : minMarginIndexRate;

    const contractSuf = contractRate.mulDown(time).mulDown(marginFactor);
    const offchainSuf = offchainRate.mulDown(time).divDown(FixedX18.fromNumber(leverage));

    return contractSuf.gt(offchainSuf) ? contractSuf : offchainSuf;
  }

  static getOrderValue(params: GetOrderValueParams): bigint {
    const { orderSize, orderRate, marketExpiry_s } = params;

    const timeToMaturity_y = FixedX18.divDown(
      BigInt(marketExpiry_s - Math.floor(Date.now() / 1000)),
      BigInt(SECONDS_PER_YEARS)
    );

    const orderValue = FixedX18.fromRawValue(orderSize).mulDown(orderRate).mulDown(timeToMaturity_y).value;

    return orderValue;
  }
}
