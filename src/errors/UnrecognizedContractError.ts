import { BaseError, Hex } from 'viem';
import { ContractErrorFactory } from './ContractErrorFactory';
import { extractErrorData } from './helpers';
export class UnrecognizedContractError extends BaseError {
  static factory = new ContractErrorFactory(UnrecognizedContractError.decodeError.bind(UnrecognizedContractError));

  static decodeError(originalError: Error) {
    const errorData = extractErrorData(originalError);
    if (!errorData) {
      return undefined;
    }
    const errorSig = errorData.slice(0, 10);
    return new UnrecognizedContractError(errorSig, errorData, originalError);
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
