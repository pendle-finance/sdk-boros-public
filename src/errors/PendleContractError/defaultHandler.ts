import { PendleContractErrorParams, PendleContractErrorType } from './helperTypes';
import { PendleContractErrorMessageHandler } from './type';

// https://stackoverflow.com/a/2901298, but I replaced "," with "_"
// "_" works in both Solidity and Javascript
function formatNumberString(num: string) {
  return num.replace(/\B(?=(\d{3})+(?!\d))/g, '_');
}

/**
 * Create a message handler for Pendle contract errors.
 * @param defaultHandler - the handle mapping with some partially defined handlers
 * @param fallback - the fallback handler if there is no handler in `defaultHandler
 * @returns the proxy handler
 */
export function createPendlecontractErrorMessageHandler(
  defaultHandler: Partial<PendleContractErrorMessageHandler>,
  fallback: <Key extends PendleContractErrorType>(errorName: Key, ...args: PendleContractErrorParams<Key>) => string
) {
  return new Proxy(defaultHandler, {
    get(target, key: PendleContractErrorType) {
      if (key in target) {
        return target[key];
      }
      return (...args: PendleContractErrorParams) => fallback(key, ...args);
    },
  }) as PendleContractErrorMessageHandler;
}

export function joinArgs<Args extends unknown[]>(args: Args) {
  return args
    .map((arg) => {
      if (typeof arg === 'bigint') {
        return formatNumberString(String(arg));
      }
      return String(arg);
    })
    .join(', ');
}

/**
 * The default handler used in Pendle SDK
 * @remarks
 * Every message will have the following form:
 * ```text
 * Pendle contract error: ErrorName(arg1, arg2, ...)
 * ```
 */
export const defaultPendleContractErrorMessageHandler: PendleContractErrorMessageHandler =
  createPendlecontractErrorMessageHandler({}, (errorName, ...args) => `${errorName}(${joinArgs(args)})`);
