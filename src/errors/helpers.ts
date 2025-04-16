import {
  Hex,
  RawContractError,
  BaseError,
  isHex,
  AbiFunctionSignatureNotFoundError,
  AbiEventSignatureNotFoundError,
} from 'viem';

const excludeErrorWithSignature = (err: Error): boolean => {
  return err instanceof AbiEventSignatureNotFoundError || err instanceof AbiFunctionSignatureNotFoundError;
};

const extractErrorSignature = (err: Error | undefined): Hex | undefined => {
  if (!err || excludeErrorWithSignature(err)) {
    return undefined;
  }
  if ('signature' in err && isHex(err.signature)) {
    return err.signature as Hex;
  }
  if (err.cause instanceof Error) {
    return extractErrorSignature(err.cause);
  }
  return undefined;
};

export const extractErrorData = (err: Error): Hex | undefined => {
  const signature = extractErrorSignature(err);

  if (signature) {
    return signature;
  }

  const error = (
    err instanceof RawContractError
      ? err
      : err instanceof BaseError
        ? err.walk((err) => 'data' in (err as Error)) || err.walk()
        : {}
  ) as RawContractError;
  return typeof error.data === 'object' ? error.data.data : error.data;
};
