import { estimateTickForRate, FixedX18, getRateAtTick } from '@pendle/boros-offchain-math';

export function calculateIncentiveRange(params: { midApr: number; tickStep: number; incentiveRange: number }) {
  const { midApr, tickStep, incentiveRange } = params;
  const lower = midApr - incentiveRange;
  const upper = midApr + incentiveRange;
  const biTickStep = BigInt(tickStep);

  const lowerTick = estimateTickForRate(FixedX18.fromNumber(lower), biTickStep, false); // roundDown= = false
  const upperTick = estimateTickForRate(FixedX18.fromNumber(upper), biTickStep, true); // roundDown = true

  const lowerRange = getRateAtTick(lowerTick, BigInt(tickStep)).round(-4);
  const upperRange = getRateAtTick(upperTick, BigInt(tickStep)).round(-4);

  return { lower: lowerRange.toNumber(), upper: upperRange.toNumber() };
}
