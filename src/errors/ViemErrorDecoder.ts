import { PendleContractError } from './PendleContractError';
import { UnregocnizedCustomError } from './UnrecognizedContractError';

export class ViemErrorDecoder {
  static readonly MAKE_ERROR_CALLBACKS: Array<
    ((err: Error) => Error | undefined) | { makeError(err: Error): Error | undefined }
  > = [];

  static decodeViemError(err: Error): Error {
    for (const callback of ViemErrorDecoder.MAKE_ERROR_CALLBACKS) {
      const result = 'makeError' in callback ? callback.makeError(err) : callback(err);
      if (result !== undefined) {
        return result;
      }
    }

    return err;
  }
}

ViemErrorDecoder.MAKE_ERROR_CALLBACKS.push(PendleContractError.factory, UnregocnizedCustomError.factory);
