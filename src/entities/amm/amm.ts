import { FixedX18 } from '@pendle/boros-offchain-math';
import { AMMStateResponse, OrderBooksV3Response, SideTickResponse } from '../../backend/secrettune/BorosBackendSDK';
import { Side } from '../../types';
import { getRateAtTick, getTickAtRate } from '../../utils/tickLib';
import { NegativeAMMMath } from './NegativeAMMMath';
import { AMMContractState, PositiveAMMMath } from './PositiveAMMMath';
import { ORDER_BOOK_SIZE_PER_SIDE } from './constants';

export function combineMarketOrderBookAndAMM(
  tickStep: number,
  tickSize: number,
  marketOrderBook: OrderBooksV3Response,
  ammStateResponse: AMMStateResponse,
  isPositiveAMM: boolean
): OrderBooksV3Response {
  const ammState = convertAMMStateResponseToAMMContractState(ammStateResponse);
  const { normFixedAmount, totalFloatAmount } = ammState;
  const AMMImpliedRate = isPositiveAMM
    ? FixedX18.fromRawValue(PositiveAMMMath.calcImpliedRate(totalFloatAmount, normFixedAmount)).toNumber()
    : FixedX18.fromRawValue(NegativeAMMMath.calcImpliedRate(totalFloatAmount, normFixedAmount)).toNumber();

  const bestBidRate = marketOrderBook.long.ia.length > 0 ? marketOrderBook.long.ia[0] * tickSize : AMMImpliedRate;
  const bestAskRate = marketOrderBook.short.ia.length > 0 ? marketOrderBook.short.ia[0] * tickSize : AMMImpliedRate;

  let longOrderBookIndex = 0,
    shortOrderBookIndex = 0;
  let ammShortTick = getTickAtRate(FixedX18.fromNumber(AMMImpliedRate), tickStep, Side.LONG);
  let ammLongTick = getTickAtRate(FixedX18.fromNumber(AMMImpliedRate), tickStep, Side.SHORT);

  let impliedRate = AMMImpliedRate;
  let longIa = Math.floor(AMMImpliedRate / tickSize);
  let shortIa = Math.ceil(AMMImpliedRate / tickSize);
  if (AMMImpliedRate < bestBidRate) {
    impliedRate = bestBidRate;
    longIa = marketOrderBook.long.ia[0] ?? longIa;
    shortIa = marketOrderBook.short.ia[0] ?? shortIa;
  } else if (AMMImpliedRate > bestAskRate) {
    impliedRate = bestAskRate;
    longIa = marketOrderBook.long.ia[0] ?? longIa;
    shortIa = marketOrderBook.short.ia[0] ?? shortIa;
  }

  const short: SideTickResponse = {
    ia: [],
    sz: [],
  };

  while (short.ia.length < ORDER_BOOK_SIZE_PER_SIDE) {
    let sz = 0n;
    while (
      shortOrderBookIndex < marketOrderBook.short.ia.length &&
      marketOrderBook.short.ia[shortOrderBookIndex] <= shortIa
    ) {
      sz += BigInt(marketOrderBook.short.sz[shortOrderBookIndex]);
      shortOrderBookIndex++;
    }

    const newAMMShortTick = getTickAtRate(FixedX18.fromNumber(shortIa * tickSize), tickStep, Side.LONG);

    sz += calSwapAMMFromToTick({
      fromTick: BigInt(ammShortTick),
      toTick: BigInt(newAMMShortTick),
      tickStep,
      isPositiveAMM,
      state: ammState,
    });

    ammShortTick = Math.max(ammShortTick, newAMMShortTick);

    if (sz > 0n) {
      short.ia.push(shortIa);
      short.sz.push(sz.toString());
    } else if (shortOrderBookIndex >= marketOrderBook.short.ia.length) {
      break;
    }

    shortIa++;
  }

  const long: SideTickResponse = {
    ia: [],
    sz: [],
  };

  while (long.ia.length < ORDER_BOOK_SIZE_PER_SIDE) {
    let sz = 0n;
    while (
      longOrderBookIndex < marketOrderBook.long.ia.length &&
      marketOrderBook.long.ia[longOrderBookIndex] >= longIa
    ) {
      sz += BigInt(marketOrderBook.long.sz[longOrderBookIndex]);
      longOrderBookIndex++;
    }

    const newAMMLongTick = getTickAtRate(FixedX18.fromNumber(longIa * tickSize), tickStep, Side.SHORT);

    sz += calSwapAMMFromToTick({
      fromTick: BigInt(newAMMLongTick),
      toTick: BigInt(ammLongTick),
      tickStep,
      isPositiveAMM,
      state: ammState,
    });

    ammLongTick = Math.min(ammLongTick, newAMMLongTick);

    if (sz > 0n) {
      long.ia.push(longIa);
      long.sz.push(sz.toString());
    } else if (longOrderBookIndex >= marketOrderBook.long.ia.length) {
      break;
    }

    longIa--;
  }

  return {
    long,
    short,
  };
}

function calSwapAMMFromToTick({
  fromTick,
  toTick,
  tickStep,
  isPositiveAMM,
  state,
}: {
  fromTick: bigint;
  toTick: bigint;
  tickStep: number;
  isPositiveAMM: boolean;
  state: AMMContractState;
}) {
  if (fromTick > toTick) {
    return 0n;
  }

  const toTickSize = calcSwapAMMToTick({
    tick: toTick,
    tickStep,
    isPositiveAMM,
    state,
  });

  const fromTickSize = calcSwapAMMToTick({
    tick: fromTick,
    tickStep,
    isPositiveAMM,
    state,
  });

  // both fromTick and toTick are less than impliedTick
  if (toTickSize < 0) {
    return _abs(fromTickSize) - _abs(toTickSize);
  }

  // fromTick is less than impliedTick, toTick is greater than impliedTick
  if (fromTickSize < 0) {
    return toTickSize + _abs(fromTickSize);
  }

  // both fromTick and toTick are greater than impliedTick
  return toTickSize - fromTickSize;
}

function calcSwapAMMToTick({
  tick,
  tickStep,
  isPositiveAMM,
  state,
}: {
  tick: bigint;
  tickStep: number;
  isPositiveAMM: boolean;
  state: AMMContractState;
}): bigint {
  const rate = getRateAtTick(tick, BigInt(tickStep)).value;

  return isPositiveAMM
    ? PositiveAMMMath.calcSwapSize(state, rate).swapSize
    : NegativeAMMMath.calcSwapSize(state, rate).swapSize;
}

function _abs(value: bigint): bigint {
  return value < 0n ? -value : value;
}

function convertAMMStateResponseToAMMContractState(ammState: AMMStateResponse): AMMContractState {
  return {
    totalFloatAmount: BigInt(ammState.totalFloatAmount),
    normFixedAmount: BigInt(ammState.normFixedAmount),
    totalLp: BigInt(ammState.totalLp),
    latestFTime: BigInt(ammState.latestFTime),
    maturity: BigInt(ammState.maturity),
    seedTime: BigInt(ammState.seedTime),
    minAbsRate: BigInt(ammState.minAbsRate),
    maxAbsRate: BigInt(ammState.maxAbsRate),
    cutOffTimestamp: BigInt(ammState.cutOffTimestamp),
  };
}
