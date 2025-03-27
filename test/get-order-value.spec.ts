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
});
