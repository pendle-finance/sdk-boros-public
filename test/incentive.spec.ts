import { calculateIncentiveRange } from '../src/ui-support/incentive';

describe('getIncentiveRange', () => {
  it('check the range', () => {
    const midApr = 0.0525;
    const incentiveRange = 0.002;
    const tickStep = 2;
    const range = calculateIncentiveRange({ midApr, incentiveRange, tickStep });
    console.log(range);
  });
});
