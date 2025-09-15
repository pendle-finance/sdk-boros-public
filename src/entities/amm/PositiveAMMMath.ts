import assert from 'assert';
import { FixedX18 } from '@pendle/boros-offchain-math';

export const AMM_CUT_OFF_REACHED_ERROR = 'AMMCutOffReached()';

export type AMMSeedParams = {
  minAbsRate: bigint; // FixedX18
  maxAbsRate: bigint; // FixedX18
  cutOffTimestamp: bigint;
  initialAbsRate: bigint; // FixedX18
  initialSize: bigint; // FixedX18
  flipLiquidity: bigint; // FixedX18
  initialCash: bigint; // FixedX18
};

export type AMMContractState = {
  // abstract world
  totalFloatAmount: bigint; // FixedX18
  normFixedAmount: bigint; // FixedX18
  // real world
  totalLp: bigint; // FixedX18
  // market data
  latestFTime: bigint;
  // immutable variables
  maturity: bigint;
  seedTime: bigint;
  // config
  minAbsRate: bigint; // FixedX18
  maxAbsRate: bigint; // FixedX18
  cutOffTimestamp: bigint;
};

namespace PMath {
  export const ONE = 10n ** 18n;

  export function sign(x: bigint) {
    if (x > 0) return 1n;
    if (x < 0) return -1n;
    return 0n;
  }

  export function Uint(x: bigint) {
    assert(x > 0);
    return x;
  }

  export function mulDown(x: bigint, y: bigint) {
    return (x * y) / ONE;
  }

  export function divDown(x: bigint, y: bigint) {
    return (x * ONE) / y;
  }

  export function rawDivUp(x: bigint, y: bigint) {
    return (x + y - 1n) / y;
  }

  export function tweakUp(a: bigint, factor: bigint) {
    return mulDown(a, ONE + factor);
  }

  export function tweakDown(a: bigint, factor: bigint) {
    return mulDown(a, ONE - factor);
  }

  export function abs(x: bigint) {
    return x > 0n ? x : -x;
  }

  export function max(x: bigint, y: bigint) {
    return x > y ? x : y;
  }

  export function min(x: bigint, y: bigint) {
    return x < y ? x : y;
  }
}

function _require(condition: boolean, error: string) {
  if (!condition) {
    throw new Error(error);
  }
}

function pow(x: bigint, y: bigint): bigint {
  return new FixedX18(x).pow(new FixedX18(y)).value;
}

export class PositiveAMMMath {
  static calcSeedOutput(params: AMMSeedParams, maturity: bigint, latestFTime: bigint): AMMContractState {
    const totalFloatAmount = PMath.Uint(params.initialSize + params.flipLiquidity);
    const normFixedAmount = PMath.mulDown(totalFloatAmount, params.initialAbsRate);
    const liquidity = new FixedX18(totalFloatAmount).mulBigInt(normFixedAmount).sqrt().value;

    const fixedValue = (normFixedAmount * (maturity - latestFTime)) / (365n * 24n * 3600n);
    _require(params.initialCash > fixedValue, 'AMMInsufficientCashIn()');

    return {
      totalFloatAmount,
      normFixedAmount,
      totalLp: liquidity,
      latestFTime,
      maturity,
      seedTime: latestFTime,
      minAbsRate: params.minAbsRate,
      maxAbsRate: params.maxAbsRate,
      cutOffTimestamp: params.cutOffTimestamp,
    };
  }

  static calcMintOutput(
    state: AMMContractState,
    markRate: bigint,
    totalCash: bigint,
    totalSize: bigint,
    desiredCashIn: bigint,
    exactSizeIn: bigint
  ): { netCashIn: bigint; netLpOut: bigint } {
    const isMatured = state.maturity <= state.latestFTime;
    _require(!isMatured, 'MarketMatured()');

    assert(totalCash > 0);

    _require(PMath.sign(totalSize) === PMath.sign(exactSizeIn), 'AMMSignMismatch()');

    let netLpOut: bigint;
    let netCashIn: bigint;

    if (totalSize == 0n) {
      netLpOut = (state.totalLp * PMath.Uint(desiredCashIn)) / totalCash;
      netCashIn = desiredCashIn;
    } else {
      const absTotalSize = PMath.abs(totalSize);
      const absExactSizeIn = PMath.abs(exactSizeIn);

      const isPositionValuePositive = PMath.sign(totalSize) === PMath.sign(markRate);
      if (isPositionValuePositive) {
        netLpOut = (state.totalLp * absExactSizeIn) / absTotalSize;
      } else {
        netLpOut = PMath.rawDivUp(state.totalLp * absExactSizeIn, absTotalSize);
      }

      netCashIn = PMath.rawDivUp(totalCash * netLpOut, state.totalLp);

      _require(netCashIn <= desiredCashIn, 'AMMInsufficientCashIn()');
    }

    state.totalFloatAmount += (state.totalFloatAmount * netLpOut) / state.totalLp;
    state.normFixedAmount += (state.normFixedAmount * netLpOut) / state.totalLp;
    state.totalLp += netLpOut;

    return { netCashIn, netLpOut };
  }

  static calcBurnOutput(
    state: AMMContractState,
    markRate: bigint,
    totalCash: bigint,
    totalSize: bigint,
    lpToBurn: bigint
  ): { netCashOut: bigint; netSizeOut: bigint } {
    const netCashOut = (totalCash * lpToBurn) / state.totalLp;

    const isMatured = state.maturity <= state.latestFTime;
    if (isMatured) {
      return { netCashOut, netSizeOut: 0n };
    }

    let absSizeOut: bigint;
    const isPositionValuePositive = PMath.sign(totalSize) === PMath.sign(markRate);
    if (isPositionValuePositive) {
      absSizeOut = (PMath.abs(totalSize) * lpToBurn) / state.totalLp;
    } else {
      absSizeOut = PMath.rawDivUp(PMath.abs(totalSize) * lpToBurn, state.totalLp);
    }
    const netSizeOut = absSizeOut * PMath.sign(totalSize);

    state.totalFloatAmount -= (state.totalFloatAmount * lpToBurn) / state.totalLp;
    state.normFixedAmount -= (state.normFixedAmount * lpToBurn) / state.totalLp;
    state.totalLp -= lpToBurn;

    return { netCashOut, netSizeOut };
  }

  static calcSwapOutput(state: AMMContractState, floatOut: bigint): { fixedIn: bigint } {
    const normalizedTime = this.calcNormalizedTime(state);

    let newTotalFloatAmount: bigint;
    const floatOutAbs = PMath.abs(floatOut);
    if (floatOut > 0) {
      _require(state.totalFloatAmount > floatOutAbs + 1n, 'AMMInsufficientLiquidity()');
      newTotalFloatAmount = state.totalFloatAmount - floatOutAbs;
    } else {
      newTotalFloatAmount = state.totalFloatAmount + floatOutAbs;
    }

    const liquidity = PMath.mulDown(pow(state.totalFloatAmount, normalizedTime), state.normFixedAmount);
    const newNormFixedAmount = PMath.divDown(liquidity, pow(newTotalFloatAmount, normalizedTime));
    _require(newNormFixedAmount * PMath.ONE >= state.minAbsRate * newTotalFloatAmount, 'AMMInsufficientLiquidity()');
    _require(newNormFixedAmount * PMath.ONE <= state.maxAbsRate * newTotalFloatAmount, 'AMMInsufficientLiquidity()');
    const normFixedIn = newNormFixedAmount - state.normFixedAmount;

    state.totalFloatAmount = newTotalFloatAmount;
    state.normFixedAmount = newNormFixedAmount;

    return { fixedIn: PMath.divDown(normFixedIn, normalizedTime) };
  }

  static calcSwapSize(state: AMMContractState, targetRate: bigint): { swapSize: bigint } {
    const adjustedMinAbsRate = PMath.tweakUp(state.minAbsRate, 10n ** 8n);
    const adjustedMaxAbsRate = PMath.tweakDown(state.maxAbsRate, 10n ** 8n);
    const boundedTargetRate = PMath.Uint(PMath.min(PMath.max(targetRate, adjustedMinAbsRate), adjustedMaxAbsRate));
    const normalizedTime = this.calcNormalizedTime(state);
    const normalizedTimePlusOne = normalizedTime + PMath.ONE;
    const liquidityMul1E18 = pow(state.totalFloatAmount, normalizedTime) * state.normFixedAmount;
    const newTotalFloatAmount = PMath.max(
      pow(liquidityMul1E18 / boundedTargetRate, PMath.divDown(PMath.ONE, normalizedTimePlusOne)),
      2n
    );

    return { swapSize: state.totalFloatAmount - newTotalFloatAmount };
  }

  static calcImpliedRate(totalFloatAmount: bigint, normFixedAmount: bigint): bigint {
    return PMath.divDown(normFixedAmount, totalFloatAmount);
  }

  static calcNormalizedTime(state: AMMContractState): bigint {
    _require(state.latestFTime < state.cutOffTimestamp, 'AMM_CUT_OFF_REACHED_ERROR()');
    return PMath.divDown(state.maturity - state.latestFTime, state.maturity - state.seedTime);
  }
}
