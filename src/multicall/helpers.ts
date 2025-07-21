import { Contract } from '../common/types';
import { Abi, AbiFunction, ContractFunctionName } from 'viem';

export type Iterableify<T> = { [K in keyof T]: Iterable<T[K]> };

export function* zip<T extends unknown[]>(...toZip: Iterableify<T>): Generator<T> {
  const iterators = toZip.map((i) => i[Symbol.iterator]());
  while (true) {
    const results = iterators.map((i) => i.next());
    if (results.some(({ done }) => done)) {
      break;
    }
    yield results.map(({ value }) => value) as T;
  }
}

export function getAbiFunction(abi: Abi, functionName: string): AbiFunction {
  return abi.find((f) => {
    if (f.type == 'function' && f.name == functionName) {
      return f as AbiFunction;
    }
  }) as AbiFunction;
}

export function getFunctionNamesFromAbi(abi: Abi, functionType: 'read' | 'simulate') {
  const stateMutabilities = {
    read: ['view', 'pure'],
    simulate: ['nonpayable', 'payable'],
  };
  return abi.flatMap((f) => {
    if (f.type === 'function' && stateMutabilities[functionType].includes(f.stateMutability)) {
      return [f.name];
    }
    return [];
  });
}

export function getFunctionFromContract<C extends Contract<Abi>>(
  contract: C,
  functionType: 'read' | 'simulate',
  functionName: ContractFunctionName<Abi>,
) {
  const func = contract[functionType][functionName];
  return func;
}
