import { FixedX18 } from '@pendle/boros-offchain-math';

const MARKET_ORDER_BUFFER_RATE = FixedX18.fromNumber(0.1); // 10%
const SIZE_ORDER_RATE_RATIO = FixedX18.fromNumber(0.01); // 1%
const SECONDS_PER_YEARS = 3600 * 24 * 365;

export type MarketConfig = {
  // market info
  marginFactor: FixedX18;
  markRate: FixedX18;
  minMarginIndexRate: FixedX18;
  marketExpiry_s: number;
};

export type GetOrderSizeByExactInitialMarginParams = {
  initialMargin: bigint;
  orderRate: FixedX18;
  isMarketOrder: boolean;
  leverage: number;
} & MarketConfig;

export type GetInitialMarginByOrderSizeParams = {
  orderSize: bigint;
  orderRate: FixedX18;
  isMarketOrder: boolean;
  leverage: number;
} & MarketConfig;

export class Market {
  static getOrderSizeByExactInitialMargin(params: GetOrderSizeByExactInitialMarginParams) {
    const {
      initialMargin,
      orderRate,
      isMarketOrder,
      leverage,
      marginFactor,
      markRate,
      minMarginIndexRate,
      marketExpiry_s,
    } = params;

    const timeToMaturity_y = (marketExpiry_s - Math.floor(Date.now() / 1000)) / SECONDS_PER_YEARS;

    // If this order is a market order, we need to buffer the order rate by MARKET_ORDER_BUFFER_RATE
    // because we cannot simulate the order book state accurately
    const orderRateWithBuffer = isMarketOrder
      ? orderRate.mulDown(FixedX18.ONE.add(MARKET_ORDER_BUFFER_RATE))
      : orderRate;

    const sizeOrderRateRatio = [
        marginFactor.mulDown(markRate),
        marginFactor.mulDown(minMarginIndexRate),
      orderRateWithBuffer.divDown(FixedX18.fromNumber(leverage)),
    ].reduce((a, b) => (a.gt(b) ? a : b), FixedX18.ZERO); // get the max value

    // buffer the size order rate ratio by SIZE_ORDER_RATE_RATIO
    const sizeOrderRateRatioWithBuffer = sizeOrderRateRatio.mulDown(FixedX18.ONE.add(SIZE_ORDER_RATE_RATIO));

    // calculate the order size
    const orderSize = FixedX18.mulFraction(initialMargin, [
      FixedX18.ONE,
      sizeOrderRateRatioWithBuffer.mulUp(FixedX18.fromNumber(timeToMaturity_y)),
    ]);

    return orderSize;
  }

  static getInitialMarginByOrderSize(params: GetInitialMarginByOrderSizeParams) {
    const { orderSize, orderRate, isMarketOrder, leverage, marginFactor, markRate, minMarginIndexRate, marketExpiry_s } = params;

    const timeToMaturity_y = (marketExpiry_s - Math.floor(Date.now() / 1000)) / SECONDS_PER_YEARS;

    // If this order is a market order, we need to buffer the order rate by MARKET_ORDER_BUFFER_RATE
    // because we cannot simulate the order book state accurately
    const orderRateWithBuffer = isMarketOrder ? orderRate.mulDown(FixedX18.ONE.add(MARKET_ORDER_BUFFER_RATE)) : orderRate;

    const sizeOrderRateRatio = [
        marginFactor.mulDown(markRate),
        marginFactor.mulDown(minMarginIndexRate),
        orderRateWithBuffer.divDown(FixedX18.fromNumber(leverage)),
      ].reduce((a, b) => (a.gt(b) ? a : b), FixedX18.ZERO); // get the max value
  
      // buffer the size order rate ratio by SIZE_ORDER_RATE_RATIO
      const initialMarginRateRatioWithBuffer = sizeOrderRateRatio.mulDown(FixedX18.ONE.add(SIZE_ORDER_RATE_RATIO));
  
    // calculate the order size
    const initialMargin = FixedX18.fromRawValue(orderSize)
      .mulDown(initialMarginRateRatioWithBuffer)
      .mulDown(FixedX18.fromNumber(timeToMaturity_y)).value;

    return initialMargin;
  }
}
