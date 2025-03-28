import { FixedX18 } from '@pendle/boros-offchain-math';
import { Market } from '../src/entities/market/market';

describe('convertSizeAndIM', () => {
  const availableBalance = 10n ** 18n;
  const imFactor = 500000000000000000n;
  const minMarginIndexDuration = 604800;
  const minMarginIndexRate = FixedX18.fromRawValue(100000000000000000n);
  const markRate = FixedX18.fromNumber(0.046026683167261016);
  const orderRate = FixedX18.fromNumber(0.046026683167261016);
  const marketExpiry_s = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 60;
  const leverage = 1;

  it('should correctly convert im to size', () => {
    const orderSize = Market.getOrderSizeByExactInitialMargin({
      initialMargin: availableBalance,
      marginFactor: FixedX18.fromRawValue(imFactor),
      minMarginIndexDuration_s: minMarginIndexDuration,
      minMarginIndexRate,
      markRate,
      orderRate,
      leverage,
      isMarketOrder: false,
      marketExpiry_s: 1747872000,
    });

    console.log({ orderSize });
  });

  it('should correctly convert im to size', () => {
    const orderSize = Market.getOrderSizeByExactInitialMargin({
      initialMargin: availableBalance,
      marginFactor: FixedX18.fromRawValue(imFactor),
      minMarginIndexDuration_s: minMarginIndexDuration,
      minMarginIndexRate,
      markRate,
      orderRate,
      leverage,
      isMarketOrder: false,
      marketExpiry_s,
    });

    const im = Market.getInitialMarginByOrderSize({
      orderSize,
      marginFactor: FixedX18.fromRawValue(imFactor),
      minMarginIndexDuration_s: minMarginIndexDuration,
      minMarginIndexRate,
      markRate,
      marketExpiry_s,
      leverage,
      isMarketOrder: false,
      orderRate,
    });
    console.log({ im, availableBalance });
  });
});
