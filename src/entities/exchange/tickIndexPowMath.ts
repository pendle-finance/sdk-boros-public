import { FixedX18 } from '@pendle/boros-offchain-math'
import { Side } from '../../types'

/**
 * Calculate $1.0001 ^ {tickIndex} - 1$
 */
export function getInterestAtTick(tickIndex: bigint): FixedX18 {
  if (tickIndex < 0) {
    return getInterestAtTick(-tickIndex).neg()
  }
  const PRECISION = 10n ** 100n
  let base = (10001n * PRECISION) / 10000n
  let rawAns = PRECISION

  for (; tickIndex > 0n; tickIndex >>= 1n, base = (base * base) / PRECISION) {
    if (tickIndex & 1n) {
      rawAns = (rawAns * base) / PRECISION
    }
  }

  rawAns -= PRECISION

  const PRECISION_SHIFT = PRECISION / FixedX18.RAW_ONE

  // round to nearest
  return FixedX18.fromRawValue((rawAns + PRECISION_SHIFT / 2n) / PRECISION_SHIFT)
}

export function getTickAtInterest(rate: number, side: Side): bigint {
  const unroundedTick = Math.log(rate + 1) / Math.log(1.0001)
  const tick = side === Side.SHORT ? Math.ceil(unroundedTick) : Math.floor(unroundedTick)
  return BigInt(tick)
}
