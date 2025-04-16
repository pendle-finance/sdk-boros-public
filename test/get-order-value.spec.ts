import { FixedX18 } from '@pendle/boros-offchain-math';
import { Market } from '../src/entities/market/market';

describe('getOrderValue', () => {
  const orderSize = 10n ** 18n;
  const orderRate = FixedX18.fromNumber(0.05);
  const marketExpiry_s = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 60;

  it('should return the correct order value', () => {
    const orderValue = Market.getOrderValue({ orderSize, orderRate, marketExpiry_s });
    console.log(orderValue);
  });

  it('order value should be the same with initial margin when order rate > minMarginIndexRate (10%)', () => {
    const size = 44890000000000000000n;
    const isMarketOrder = true;
    const leverage = 1;
    const markRate = 0.07004243605986377;
    const orderRate = FixedX18.fromNumber(0.12); // 12%
    const marketExpiry_s = 1750291200;
    const initialMargin = Market.getInitialMarginByOrderSize(
      {
        orderSize: size,
        orderRate,
        isMarketOrder,
        leverage,
        marginFactor: FixedX18.fromRawValue(500000000000000000n),
        minMarginIndexRate: FixedX18.fromRawValue(100000000000000000n),
        minMarginIndexDuration_s: 604800,
        marketExpiry_s,
        markRate: FixedX18.fromNumber(markRate),
      },
      false
    );

    const orderValue = Market.getOrderValue({ orderSize: size, orderRate, marketExpiry_s });

    console.log(initialMargin);
    console.log(orderValue);
  });

  it('order rate = 5%, min margin index rate = 10%', () => {
    const size = 44890000000000000000n;
    const isMarketOrder = true;
    const leverage = 1;
    const markRate = 0.07004243605986377;
    const orderRate = FixedX18.fromNumber(0.05); // 5%
    const marketExpiry_s = 1750291200;
    const initialMargin = Market.getInitialMarginByOrderSize(
      {
        orderSize: size,
        orderRate,
        isMarketOrder,
        leverage,
        marginFactor: FixedX18.fromRawValue(500000000000000000n),
        minMarginIndexRate: FixedX18.fromRawValue(100000000000000000n),
        minMarginIndexDuration_s: 604800,
        marketExpiry_s,
        markRate: FixedX18.fromNumber(markRate),
      },
      false
    );

    const orderValue = Market.getOrderValue({ orderSize: size, orderRate, marketExpiry_s });

    console.log(initialMargin);
    console.log(orderValue);
  });
});
