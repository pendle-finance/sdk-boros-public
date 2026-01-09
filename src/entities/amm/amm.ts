import { FixedX18 } from '@pendle/boros-offchain-math';
import { AMMStateResponse, OrderBooksResponse, SideTickResponse } from '../../backend/secrettune/BorosCoreSDK';
import { NegativeAMMMath } from './NegativeAMMMath';
import { AMMContractState, AMM_CUT_OFF_REACHED_ERROR, PositiveAMMMath } from './PositiveAMMMath';
import { ORDER_BOOK_SIZE_PER_SIDE } from './constants';

export function calcAMMImpliedRate(ammStateResponse: AMMStateResponse, isPositiveAMM: boolean): number {
  const ammState = convertAMMStateResponseToAMMContractState(ammStateResponse);
  const { normFixedAmount, totalFloatAmount } = ammState;
  return isPositiveAMM
    ? FixedX18.fromRawValue(PositiveAMMMath.calcImpliedRate(totalFloatAmount, normFixedAmount)).toNumber()
    : FixedX18.fromRawValue(NegativeAMMMath.calcImpliedRate(totalFloatAmount, normFixedAmount)).toNumber();
}

export function combineMarketOrderBookAndAMM(
  tickSize: number,
  marketOrderBook: OrderBooksResponse,
  ammStateResponse: AMMStateResponse,
  isPositiveAMM: boolean,
  ammShiftedRate: string,
  orderBookSizePerSide: number = ORDER_BOOK_SIZE_PER_SIDE
): OrderBooksResponse {
  try {
    return _combineMarketOrderBookAndAMM(
      tickSize,
      marketOrderBook,
      ammStateResponse,
      isPositiveAMM,
      ammShiftedRate,
      orderBookSizePerSide
    );
  } catch (error: any) {
    if (error.message !== AMM_CUT_OFF_REACHED_ERROR) {
      console.error(error);
    }
    return marketOrderBook;
  }
}

function _combineMarketOrderBookAndAMM(
  tickSize: number,
  marketOrderBook: OrderBooksResponse,
  ammStateResponse: AMMStateResponse,
  isPositiveAMM: boolean,
  ammShiftedRate: string,
  orderBookSizePerSide: number = ORDER_BOOK_SIZE_PER_SIDE
): OrderBooksResponse {
  const ammFeeRate = FixedX18.fromRawValue(BigInt(ammShiftedRate)).toNumber();
  const ammState = convertAMMStateResponseToAMMContractState(ammStateResponse);
  const AMMImpliedRate = calcAMMImpliedRate(ammStateResponse, isPositiveAMM);

  let longOrderBookIndex = 0,
    shortOrderBookIndex = 0;
  let ammShortRate = AMMImpliedRate + ammFeeRate;
  let ammLongRate = AMMImpliedRate - ammFeeRate;

  const short: SideTickResponse = {
    ia: [],
    sz: [],
  };

  const long: SideTickResponse = {
    ia: [],
    sz: [],
  };

  let longIa = Math.floor(ammLongRate / tickSize);
  let shortIa = Math.ceil(ammShortRate / tickSize);

  if (longIa * tickSize === ammLongRate) {
    longIa--;
  }

  if (shortIa * tickSize === ammShortRate) {
    shortIa++;
  }

  while (longOrderBookIndex < marketOrderBook.long.ia.length && marketOrderBook.long.ia[longOrderBookIndex] > longIa) {
    long.ia.push(marketOrderBook.long.ia[longOrderBookIndex]);
    long.sz.push(marketOrderBook.long.sz[longOrderBookIndex]);
    longOrderBookIndex++;
  }

  while (
    shortOrderBookIndex < marketOrderBook.short.ia.length &&
    marketOrderBook.short.ia[shortOrderBookIndex] < shortIa
  ) {
    short.ia.push(marketOrderBook.short.ia[shortOrderBookIndex]);
    short.sz.push(marketOrderBook.short.sz[shortOrderBookIndex]);
    shortOrderBookIndex++;
  }

  if (marketOrderBook.short.ia.length > 0) {
    longIa = Math.min(longIa, marketOrderBook.short.ia[0] - 1);
  }

  if (marketOrderBook.long.ia.length > 0) {
    shortIa = Math.max(shortIa, marketOrderBook.long.ia[0] + 1);
  }

  while (short.ia.length < orderBookSizePerSide) {
    let sz = 0n;
    while (
      shortOrderBookIndex < marketOrderBook.short.ia.length &&
      marketOrderBook.short.ia[shortOrderBookIndex] <= shortIa
    ) {
      sz += BigInt(marketOrderBook.short.sz[shortOrderBookIndex]);
      shortOrderBookIndex++;
    }

    const nextAMMShortRate = shortIa * tickSize;

    sz += calSwapAMMFromToRate({
      fromRate: Math.max(AMMImpliedRate, ammShortRate - ammFeeRate),
      toRate: Math.max(AMMImpliedRate, nextAMMShortRate - ammFeeRate),
      isPositiveAMM,
      state: ammState,
    });

    ammShortRate = Math.max(ammShortRate, nextAMMShortRate);

    if (sz > 0n) {
      short.ia.push(shortIa);
      short.sz.push(sz.toString());
    } else if (shortOrderBookIndex >= marketOrderBook.short.ia.length) {
      break;
    }

    shortIa++;
  }

  while (long.ia.length < orderBookSizePerSide) {
    let sz = 0n;
    while (
      longOrderBookIndex < marketOrderBook.long.ia.length &&
      marketOrderBook.long.ia[longOrderBookIndex] >= longIa
    ) {
      sz += BigInt(marketOrderBook.long.sz[longOrderBookIndex]);
      longOrderBookIndex++;
    }

    const nextAMMLongRate = longIa * tickSize;

    sz += calSwapAMMFromToRate({
      fromRate: Math.min(AMMImpliedRate, nextAMMLongRate + ammFeeRate),
      toRate: Math.min(AMMImpliedRate, ammLongRate + ammFeeRate),
      isPositiveAMM,
      state: ammState,
    });

    ammLongRate = Math.min(ammLongRate, nextAMMLongRate);

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

export function calSwapAMMFromToRate({
  fromRate,
  toRate,
  isPositiveAMM,
  state,
}: {
  fromRate: number;
  toRate: number;
  isPositiveAMM: boolean;
  state: AMMContractState;
}) {
  if (fromRate > toRate) {
    return 0n;
  }

  const toRateSize = calcSwapAMMToRate({
    rate: toRate,
    isPositiveAMM,
    state,
  });

  const fromRateSize = calcSwapAMMToRate({
    rate: fromRate,
    isPositiveAMM,
    state,
  });

  if (toRateSize < 0) {
    return _abs(fromRateSize) - _abs(toRateSize);
  }

  if (fromRateSize < 0) {
    return toRateSize + _abs(fromRateSize);
  }

  return toRateSize - fromRateSize;
}

export function calcSwapAMMToRate({
  rate,
  isPositiveAMM,
  state,
}: {
  rate: number;
  isPositiveAMM: boolean;
  state: AMMContractState;
}): bigint {
  return isPositiveAMM
    ? PositiveAMMMath.calcSwapSize(state, FixedX18.fromNumber(rate).value).swapSize
    : NegativeAMMMath.calcSwapSize(state, FixedX18.fromNumber(rate).value).swapSize;
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
