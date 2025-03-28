import { AbiErrorSignatureNotFoundError, BaseError, Hex } from 'viem';
import { ContractErrorFactory } from './ContractErrorFactory';
import { extractErrorData } from './helpers';
export class UnregocnizedCustomError extends BaseError {
  static factory = new ContractErrorFactory(UnregocnizedCustomError.decodeError.bind(UnregocnizedCustomError));

  static decodeError(originalError: Error) {
    const errorData = extractErrorData(originalError);
    if (!errorData) {
      return undefined;
    }
    const errorSig = errorData.slice(0, 10);
    return new UnregocnizedCustomError(errorSig, errorData, originalError);
  }

  constructor(
    readonly errorSig: string,
    readonly errorData: Hex,
    readonly originalError: Error
  ) {
    const msg = `Unrecognized custom error: ${errorSig}`;
    super(msg, { cause: originalError });
  }
}
