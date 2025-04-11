import { FixedX18 } from '@pendle/boros-offchain-math';
import { TICK_MAX_VALUE, TICK_MIN_VALUE } from '../constants';
import { Side } from '../types';

const PRECISION = 10n ** 100n;

const BASE = (100005n * PRECISION) / 100000n;

/**
 * Calculate $1.00005 ^ {tickIndex * step} - 1$
 */
export function getRateAtTick(tickIndex: bigint, step: bigint): FixedX18 {
  if (tickIndex < 0) {
    return getRateAtTick(-tickIndex, step).neg();
  }

  tickIndex *= step;

  let base = BASE;
  let rawAns = PRECISION;
  for (; tickIndex > 0n; tickIndex >>= 1n, base = (base * base) / PRECISION) {
    if (tickIndex & 1n) {
      rawAns = (rawAns * base) / PRECISION;
    }
  }

  rawAns -= PRECISION;

  const PRECISION_SHIFT = PRECISION / FixedX18.RAW_ONE;

  // round to nearest
  return FixedX18.fromRawValue((rawAns + PRECISION_SHIFT / 2n) / PRECISION_SHIFT);
}

export function getTickAtRate(rate: FixedX18, step: number, side: Side): number {
  // binary search
  let low = TICK_MIN_VALUE;
  let high = TICK_MAX_VALUE;
  while (low < high) {
    const mid = Math.floor((low + high + 0.5) / 2);
    const midRate = getRateAtTick(BigInt(mid), BigInt(step));
    if (midRate.exactEq(rate)) {
      return mid;
    }
    if (midRate.lt(rate)) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }
  const currentRate = getRateAtTick(BigInt(low), BigInt(step));
  if (side === Side.LONG && currentRate.gt(rate)) {
    return low - 1;
  }
  if (side === Side.SHORT && currentRate.lt(rate)) {
    return low + 1;
  }
  return low;
}
