import { AMMContractState, AMMSeedParams, PositiveAMMMath } from './PositiveAMMMath';

export class NegativeAMMMath {
  static calcSeedOutput(params: AMMSeedParams, maturity: bigint, latestFTime: bigint): AMMContractState {
    params.initialSize = -params.initialSize;
    return PositiveAMMMath.calcSeedOutput(params, maturity, latestFTime);
  }

  static calcMintOutput(
    state: AMMContractState,
    markRate: bigint,
    totalCash: bigint,
    totalSize: bigint,
    desiredCashIn: bigint,
    exactSizeIn: bigint
  ): { netCashIn: bigint; netLpOut: bigint } {
    return PositiveAMMMath.calcMintOutput(state, -markRate, totalCash, -totalSize, desiredCashIn, -exactSizeIn);
  }

  static calcBurnOutput(
    state: AMMContractState,
    markRate: bigint,
    totalCash: bigint,
    totalSize: bigint,
    lpToBurn: bigint
  ): { netCashOut: bigint; netSizeOut: bigint } {
    const result = PositiveAMMMath.calcBurnOutput(state, -markRate, totalCash, -totalSize, lpToBurn);
    result.netSizeOut = -result.netSizeOut;
    return result;
  }

  static calcSwapOutput(state: AMMContractState, floatOut: bigint): { fixedIn: bigint } {
    return PositiveAMMMath.calcSwapOutput(state, -floatOut);
  }

  static calcSwapSize(state: AMMContractState, targetRate: bigint): { swapSize: bigint } {
    return { swapSize: -PositiveAMMMath.calcSwapSize(state, -targetRate).swapSize };
  }

  static calcImpliedRate(totalFloatAmount: bigint, normFixedAmount: bigint): bigint {
    return -PositiveAMMMath.calcImpliedRate(totalFloatAmount, normFixedAmount);
  }
}
