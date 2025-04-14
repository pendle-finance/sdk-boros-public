import { FixedX18 } from '@pendle/boros-offchain-math';
import { AMMStateResponse, OrderBooksV3Response, SideTickResponse } from '../../backend/secrettune/BorosBackendSDK';
import { NegativeAMMMath } from './NegativeAMMMath';
import { AMMContractState, PositiveAMMMath } from './PositiveAMMMath';
import { ORDER_BOOK_SIZE_PER_SIDE } from './constants';

export function combineMarketOrderBookAndAMM(
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
  let ammShortRate = AMMImpliedRate;
  let ammLongRate = AMMImpliedRate;

  let impliedRate = AMMImpliedRate;
  let longIa = Math.floor(AMMImpliedRate / tickSize);
  let shortIa = Math.ceil(AMMImpliedRate / tickSize);
  if (AMMImpliedRate < bestBidRate) {
    impliedRate = bestBidRate;
    longIa = marketOrderBook.long.ia[0] ?? longIa;
    shortIa = longIa + 1;
  } else if (AMMImpliedRate > bestAskRate) {
    impliedRate = bestAskRate;
    shortIa = marketOrderBook.short.ia[0] ?? shortIa;
    longIa = shortIa - 1;
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

    const newAMMShortRate = shortIa * tickSize;

    sz += calSwapAMMFromToRate({
      fromRate: ammShortRate,
      toRate: newAMMShortRate,
      isPositiveAMM,
      state: ammState,
    });

    ammShortRate = Math.max(ammShortRate, newAMMShortRate);

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

    const newAMMLongRate = longIa * tickSize;

    sz += calSwapAMMFromToRate({
      fromRate: newAMMLongRate,
      toRate: ammLongRate,
      isPositiveAMM,
      state: ammState,
    });

    ammLongRate = Math.min(ammLongRate, newAMMLongRate);

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

function calSwapAMMFromToRate({
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

function calcSwapAMMToRate({
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
