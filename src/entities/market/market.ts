import { FixedX18 } from '@pendle/boros-offchain-math';

const BUFFERED_ORDER_SIZE_BY_EXACT_INITIAL_MARGIN_RATIO = FixedX18.fromNumber(0.001); // 0.1%
const SECONDS_PER_YEARS = 3600 * 24 * 365;

export type MarketConfig = {
  // market info
  marginFactor: FixedX18;
  markRate: FixedX18;
  minMarginIndexRate: FixedX18;
  minMarginIndexDuration_s: number;
  timeToMaturity: number; // in seconds
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
  timeToMaturity: number; // in seconds
};

export class Market {
  static getOrderSizeByExactInitialMargin(
    params: GetOrderSizeByExactInitialMarginParams,
    useBuffer: boolean = false
  ): bigint {
    const imSuf = Market.getIMSuf(params);

    // calculate the order size
    const orderSize = FixedX18.fromRawValue(params.initialMargin).divDown(imSuf);

    if (useBuffer) {
      return orderSize.mulDown(FixedX18.ONE.sub(BUFFERED_ORDER_SIZE_BY_EXACT_INITIAL_MARGIN_RATIO)).value;
    }

    return orderSize.value;
  }

  static getInitialMarginByOrderSize(params: GetInitialMarginByOrderSizeParams, useBuffer: boolean = true): bigint {
    const imSuf = Market.getIMSuf(params);
    const initialMargin = FixedX18.fromRawValue(params.orderSize).mulDown(imSuf);
    return initialMargin.value;
  }

  private static getIMSuf(data: MarketConfig & LeverageConfig & TradeInfo): FixedX18 {
    const {
      orderRate,
      leverage,
      marginFactor,
      markRate,
      minMarginIndexRate,
      timeToMaturity,
      minMarginIndexDuration_s,
      isMarketOrder,
    } = data;

    if (timeToMaturity <= 0) {
      // expired market will have IM = 0
      return FixedX18.ZERO;
    }

    const absOrderRate = orderRate.abs();
    const absMarkRate = markRate.abs();

    const timeToMaturity_y = timeToMaturity / SECONDS_PER_YEARS;

    const minTime_y = minMarginIndexDuration_s / SECONDS_PER_YEARS;

    const time = FixedX18.fromNumber(Math.max(timeToMaturity_y, minTime_y));
    const offchainRate = absOrderRate.gt(minMarginIndexRate) ? absOrderRate : minMarginIndexRate;

    const contractRate = isMarketOrder
      ? absMarkRate.gt(minMarginIndexRate)
        ? absMarkRate
        : minMarginIndexRate
      : offchainRate; // in case of limit order, the contract rate is the same as the offchain rate

    const contractSuf = contractRate.mulDown(time).mulDown(marginFactor);
    const offchainSuf = offchainRate.mulDown(time).divDown(FixedX18.fromNumber(leverage));

    return contractSuf.gt(offchainSuf) ? contractSuf : offchainSuf;
  }

  static getOrderValue(params: GetOrderValueParams): bigint {
    const { orderSize, orderRate, timeToMaturity } = params;

    if (timeToMaturity <= 0) {
      // expired market will have IM = 0
      return BigInt(0);
    }

    const timeToMaturity_y = FixedX18.divDown(BigInt(timeToMaturity), BigInt(SECONDS_PER_YEARS));

    const orderValue = FixedX18.fromRawValue(orderSize).mulDown(orderRate).mulDown(timeToMaturity_y).value;

    return orderValue;
  }
}

export function getLongYieldAprFixedX18({
  underlyingApr,
  fixedApr,
  timeToMaturity,
  marginFloor,
  maturityFloor,
  leverage,
}: {
  underlyingApr: FixedX18;
  fixedApr: FixedX18;
  timeToMaturity: FixedX18;
  marginFloor: FixedX18;
  maturityFloor: FixedX18;
  leverage?: number;
}): FixedX18 {
  const profitOf1YU = underlyingApr.sub(fixedApr).mulDown(timeToMaturity);

  const marginOf1YU = fixedApr
    .abs()
    .max(marginFloor)
    .mulDown(timeToMaturity.max(maturityFloor))
    .divDown(FixedX18.fromNumber(leverage ?? 1));

  return profitOf1YU.divDown(marginOf1YU);
}
