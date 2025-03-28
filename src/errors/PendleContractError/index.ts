import { PendleContractErrorsAbi } from '../../contracts';
import { PendleContractErrorMessageHandler } from './type';
import { defaultPendleContractErrorMessageHandler } from './defaultHandler';
import { BaseError, decodeErrorResult } from 'viem';
import { PendleContractErrorParams, PendleContractErrorType } from './helperTypes';
import { ContractErrorFactory } from '../ContractErrorFactory';
import { extractErrorData } from '../helpers';

export * from './defaultHandler';
export * from './helperTypes';
export * from './type';

export class PendleContractError<
  ErrorType extends PendleContractErrorType = PendleContractErrorType,
> extends BaseError {
  static errorMessageHandler: PendleContractErrorMessageHandler = defaultPendleContractErrorMessageHandler;

  static factory = new ContractErrorFactory(PendleContractError.decodeError.bind(PendleContractError));

  static decodeError(originalError: Error) {
    try {
      const errorData = extractErrorData(originalError);
      console.log('errorData', errorData);
      if (!errorData) {
        return undefined;
      }

      const decodedError = decodeErrorResult({
        abi: PendleContractErrorsAbi,
        data: errorData,
      });
      console.log({ decodedError });
      const name = decodedError.errorName as PendleContractErrorType;
      const args = decodedError.args as PendleContractErrorParams;
      return new PendleContractError(name, args, originalError);
    } catch (_e) {
      return undefined;
    }
  }

  constructor(
    readonly errorName: ErrorType,
    readonly args: PendleContractErrorParams<ErrorType>,
    cause: Error
  ) {
    const message: string = (PendleContractError.errorMessageHandler[errorName] as any)(...args);
    super(message, { cause });
  }

  isType<OtherErrorType extends PendleContractErrorType>(
    otherType: OtherErrorType
  ): this is PendleContractError<OtherErrorType> {
    // cast to string because tsc considered ErrorType and OtherErrorType 2 different type,
    // so the result _should_ be always false according to tsc.
    const currentErrorName: string = this.errorName;
    return currentErrorName === otherType;
  }
}
