import axios, { AxiosError } from 'axios';
import { Hex } from 'viem';
import { QuoteBscBridgeDto, QuoteWithdrawBscDto } from '../../backend/secrettune/BorosCoreSDK';
import { PendleSwapDtoV2 } from '../../backend/secrettune/PendleV2SDK';
import { PendleSdkError, PendleSdkErrorParams } from '../../errors/PendleSdkError';
import { AggregatorName, QuoteDepositParams, QuoteWithdrawParams } from './AggregatorHelper';
import {
  GetTokensRequest,
  LifiGetRouteStatusRequest,
  LifiGetRoutesRequest,
  LifiGetRoutesStep,
} from './aggregators/Lifi/types';

export type AggregatorRequestType =
  | 'getTokens'
  | 'quote'
  | 'quoteWithdraw'
  | 'assemble'
  | 'getRouteStatus'
  | 'getIntentStatus'
  | 'prepareTransferCall';

export type AggregatorErrorCodeType = {
  [AggregatorName.LIFI]: number;
  [AggregatorName.PENDLE]: number;
  [AggregatorName.BOROS]: number;
};

export type AggregatorRequestData = {
  [AggregatorName.LIFI]: {
    getTokens: GetTokensRequest;
    quote: LifiGetRoutesRequest;
    quoteWithdraw: QuoteWithdrawParams;
    assemble: LifiGetRoutesStep;
    getRouteStatus: LifiGetRouteStatusRequest;
    getIntentStatus: undefined;
    prepareTransferCall: undefined;
  };
  [AggregatorName.PENDLE]: {
    getTokens: undefined;
    quote: PendleSwapDtoV2;
    quoteWithdraw: QuoteWithdrawParams;
    assemble: undefined;
    getRouteStatus: Hex;
    getIntentStatus: undefined;
    prepareTransferCall: undefined;
  };
  [AggregatorName.BOROS]: {
    getTokens: undefined;
    quote: QuoteBscBridgeDto;
    quoteWithdraw: QuoteWithdrawBscDto;
    assemble: undefined;
    getRouteStatus: Hex;
    getIntentStatus: string;
    prepareTransferCall: QuoteDepositParams;
  };
};

export type ErrorDataCheckingFnReturnType<T extends AggregatorName> =
  | { errorCode?: AggregatorErrorCodeType[T]; message: string; extraData?: any }
  | undefined;

export class AggregatorHelperError extends PendleSdkError {
  constructor(
    override readonly name: AggregatorName,
    override readonly message: string,
    params?: PendleSdkErrorParams
  ) {
    super(`${name}: ${message}`, params);
  }
}

export class AggregatorHelperRequestError<
  T extends AggregatorName,
  RT extends AggregatorRequestType,
> extends AggregatorHelperError {
  constructor(
    override readonly name: T,
    readonly requestType: RT,
    readonly requestErrorMessage: string,
    readonly requestData: AggregatorRequestData[T][RT],
    readonly errorCode?: AggregatorErrorCodeType[T],
    params?: PendleSdkErrorParams
  ) {
    super(
      name,
      `${name} ${requestType} request error, error code ${errorCode ?? 'unknown'}: ${requestErrorMessage}`,
      params
    );
  }

  static isErrorOfType<T extends AggregatorName>(
    error: unknown,
    name: T
  ): error is AggregatorHelperRequestError<T, AggregatorRequestType>;
  static isErrorOfType<T extends AggregatorName, RT extends AggregatorRequestType>(
    error: unknown,
    name: T,
    requestType: RT
  ): error is AggregatorHelperRequestError<T, RT>;
  static isErrorOfType<T extends AggregatorName, RT extends AggregatorRequestType>(
    error: unknown,
    name: T,
    requestType?: RT
  ): error is AggregatorHelperRequestError<T, RT> {
    return (
      error instanceof AggregatorHelperRequestError &&
      error.name === name &&
      (requestType === undefined || error.requestType === requestType)
    );
  }
}

export class AggregatorHelperServerError<T extends AggregatorName> extends AggregatorHelperError {
  constructor(
    override readonly name: T,
    readonly status: number,
    readonly errorCode?: AggregatorErrorCodeType[T],
    params?: PendleSdkErrorParams
  ) {
    super(name, `${name} server error, error code ${errorCode ?? 'unknown'}`, params);
  }

  static create<T extends AggregatorName>(
    name: T,
    err: AxiosError,
    errorDataCheckingFn: (errorData: unknown) => ErrorDataCheckingFnReturnType<T>
  ) {
    const status = err.status || err.response?.status;
    const isServerError = status && status >= 500 && status < 600;
    if (isServerError) {
      const data: unknown = err.response?.data;
      const dataCheckResult = errorDataCheckingFn(data);
      const errorCode = dataCheckResult?.errorCode;
      return new AggregatorHelperServerError(name, status, errorCode, { cause: err });
    }
  }

  static isErrorOfType<T extends AggregatorName>(error: unknown, name: T): error is AggregatorHelperServerError<T> {
    return error instanceof AggregatorHelperServerError && error.name === name;
  }
}

export class UnknownAggregatorHelperError extends AggregatorHelperError {
  constructor(name: AggregatorName, params?: PendleSdkErrorParams) {
    const cause = params?.cause;
    super(name, `${name}: ${cause instanceof Error ? cause.message : 'unknown error'}`, params);
  }
}

export class WrappedAxiosError extends PendleSdkError {
  constructor(
    message: string,
    override readonly cause: AxiosError
  ) {
    const prefix = `Wrapped axios error: ${message}: ${cause.message}.`;
    const errorMessage = cause.response ? `${prefix}\nResponse: ${JSON.stringify(cause.response.data)}.` : prefix;
    super(errorMessage, { cause });
  }
}

export class AggregatorHelperAxiosError extends WrappedAxiosError {
  constructor(
    override readonly name: AggregatorName,
    override readonly cause: AxiosError
  ) {
    super(`${name} helper axios error`, cause);
  }
}

export function classifyAggregatorError<T extends AggregatorName, RT extends AggregatorRequestType>(
  name: T,
  error: any,
  errorStatuses: number[],
  requestType: RT,
  requestData: AggregatorRequestData[T][RT],
  errorDataCheckingFn: (errorData: unknown) => ErrorDataCheckingFnReturnType<T>
):
  | AggregatorHelperRequestError<T, RT>
  | AggregatorHelperServerError<T>
  | UnknownAggregatorHelperError
  | AggregatorHelperAxiosError {
  if (axios.isAxiosError(error)) {
    const serverErr = AggregatorHelperServerError.create(name, error, errorDataCheckingFn);
    if (serverErr) {
      return serverErr;
    }
  }

  if (!axios.isAxiosError(error) || error.response === undefined || !errorStatuses.includes(error.response.status)) {
    if (axios.isAxiosError(error)) {
      return new AggregatorHelperAxiosError(name, error);
    }
    return new UnknownAggregatorHelperError(name, { cause: error });
  }

  const data: unknown = error.response.data;
  const dataCheckResult = errorDataCheckingFn(data);
  if (!dataCheckResult) {
    return new UnknownAggregatorHelperError(name, { cause: error });
  }

  return new AggregatorHelperRequestError(
    name,
    requestType,
    dataCheckResult.message,
    requestData,
    dataCheckResult.errorCode,
    {
      cause: error,
    }
  );
}
