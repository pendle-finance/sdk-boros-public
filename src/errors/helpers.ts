import { Hex, RawContractError, BaseError } from 'viem';

export const extractErrorData = (err: Error): Hex | undefined => {
  const error = (
    err instanceof RawContractError
      ? err
      : err instanceof BaseError
        ? err.walk((err) => 'data' in (err as Error)) || err.walk()
        : {}
  ) as RawContractError;
  return typeof error.data === 'object' ? error.data.data : error.data;
};
