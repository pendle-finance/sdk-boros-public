import { iMulticall3Abi } from '../contracts/abis/viemAbis';
import { LRUCache } from 'lru-cache';
import {
  Abi,
  AbiFunction,
  AbiStateMutability,
  Address,
  BlockNumber,
  BlockTag,
  ContractFunctionArgs,
  ContractFunctionName,
  ContractFunctionReturnType,
  GetContractReturnType,
  Hex,
  PublicClient,
  RawContractError,
  decodeErrorResult,
  decodeFunctionResult,
  encodeFunctionData,
  getContract,
} from 'viem';
import { Contract, ExtractAbiFunction } from '../common/types';
import { getAbiFunction, getFunctionFromContract, getFunctionNamesFromAbi } from './helpers';
import { MILLISECONDS_IN_A_SECOND, MILLISECONDS_IN_AN_HOUR } from './constants';
import { ViemErrorDecoder } from '../errors';

export const DEFAULT_CALL_LIMIT = 256;

const ERROR_MESSAGE_LENGTH_LIMIT = 100_000;

const COMMON_ERROR_MESSAGE = 'Contract error';


export type BlockTagMulticall = BlockTag | BlockNumber;

export type MulticallOptions = {
  blockTag?: BlockTag;
  blockNumber?: BlockNumber;
  disableMulticall?: boolean;
  account?: Address;
};

type ConcatTuple<A extends any[], B extends any[]> = [...A, ...B];

type RemoveOptions<Params extends any[], Options> = Params extends [...infer Rest, Options] ? Rest : Params;

type AddParams<Fn extends (...params: any[]) => any, P extends any[]> = Fn extends (...params: infer Params) => infer R
  ? (...params: ConcatTuple<Params, P>) => R
  : Fn;

export type OverrideMulticallFunction<
  abi extends Abi,
  functionName extends ContractFunctionName<abi, AbiStateMutability> = ContractFunctionName<abi, AbiStateMutability>,
  abiFunction extends AbiFunction = ExtractAbiFunction<abi, functionName>,
  mutability extends AbiStateMutability = abiFunction['stateMutability'],
  args = ContractFunctionArgs<abi, AbiStateMutability, functionName>,
> = args extends readonly []
  ? (multicallOptions?: MulticallOptions) => Promise<ContractFunctionReturnType<abi, mutability, functionName>>
  : args extends readonly any[]
    ? (
        ...args: [...args, MulticallOptions | undefined]
      ) => Promise<ContractFunctionReturnType<abi, mutability, functionName>>
    : (
        ...args: [args, MulticallOptions | undefined]
      ) => Promise<ContractFunctionReturnType<abi, mutability, functionName>>;

export type MulticallSimulate<abi extends Abi, T extends Contract<abi> = Contract<abi>> = T extends {
  simulate: object;
}
  ? {
      [K in keyof T['simulate']]: K extends ContractFunctionName<abi, 'nonpayable' | 'payable'>
        ? OverrideMulticallFunction<abi, K>
        : T['simulate'][K];
    }
  // biome-ignore lint/complexity/noBannedTypes: <explanation>
  : {};

export type MulticallRead<abi extends Abi, T extends Contract<abi> = Contract<abi>> = T extends {
  read: object;
}
  ? {
      [K in keyof T['read']]: K extends ContractFunctionName<abi, 'view' | 'pure'>
        ? OverrideMulticallFunction<abi, K>
        : T['read'][K];
    }
  // biome-ignore lint/complexity/noBannedTypes: <explanation>
  : {};

export type MulticallFuncs<abi extends Abi> = {
  read: MulticallRead<abi>;
  simulate: MulticallSimulate<abi>;
};

export class MulticallRPCError extends Error {
  constructor(error: any, opts: { nCall?: number; block?: string } = {}) {
    const callString = opts.nCall ? `, ${opts.nCall} calls` : '';
    const blockString = opts.block ? ` at block ${opts.block}` : '';
    const codeString = error?.code;
    const errorMsg = MulticallRPCError.getViemErrorMessage(error);

    super(`RPC Error - ${codeString}${callString}${blockString}: ${errorMsg}`, {
      cause: error,
    });
  }

  static getViemErrorMessage(error: any): string {
    return error?.message ?? '';
  }
}

export class ContractCall {
  abi: Abi;
  functionName: string;
  address: Address;
  params: unknown[];

  constructor({
    abi,
    address,
    functionName,
    params,
  }: {
    abi: Abi;
    address: Address;
    functionName: string;
    params: unknown[];
  }) {
    this.abi = abi;
    this.address = address;
    this.functionName = functionName;
    this.params = params;
  }
}

type Multicall3 = GetContractReturnType<typeof iMulticall3Abi, PublicClient, Address>;

class MulticallCacheSingleton {
  private static instance: MulticallCacheSingleton;
  private cache: LRUCache<string, Date>;

  // Private constructor to prevent direct instantiation
  private constructor() {
    // Define the cache options
    const options: LRUCache.Options<string, any, any> = {
      max: 1000, // Maximum number of items in the cache
      ttl: MILLISECONDS_IN_A_SECOND * 5, // Time-to-live for cache entries in milliseconds (60 seconds)
    };

    this.cache = new LRUCache<string, Date>(options);
  }

  // Static method to get the single instance of the class
  public static getInstance(): MulticallCacheSingleton {
    if (!MulticallCacheSingleton.instance) {
      MulticallCacheSingleton.instance = new MulticallCacheSingleton();
    }
    return MulticallCacheSingleton.instance;
  }

  public set(key: string, value: Date) {
    return this.cache.set(key, value);
  }

  public get(key: string): Date {
    const value = this.cache.get(key);
    const oneHourAgo = new Date(Date.now() - MILLISECONDS_IN_AN_HOUR);
    return value ?? oneHourAgo; // if not found, return 1 hour ago
  }
}

export class Multicall {
  static isMulticallOptions(options?: any): options is MulticallOptions | undefined {
    if (options === undefined) {
      return true;
    }
    for (const key of Object.keys(options)) {
      if (key !== 'blockTag' && key !== 'blockNumber' && key !== 'disableMulticall' && options[key] !== undefined) {
        return false;
      }
    }
    return true;
  }

  public multicallContract: Multicall3;
  public readonly batchMap = new Map<BlockTagMulticall, MulticallBatch>();
  readonly callLimit: number;

  private multicallCache: MulticallCacheSingleton;
  private disableMulticall: string;

  constructor({
    address,
    client,
    callLimit,
  }: {
    address: Address;
    client: PublicClient;
    callLimit?: number;
  }) {
    this.multicallContract = getContract({
      address,
      abi: iMulticall3Abi,
      client,
    });
    this.callLimit = callLimit ?? DEFAULT_CALL_LIMIT;
    this.multicallCache = MulticallCacheSingleton.getInstance();
    this.disableMulticall = process.env.DISABLE_MULTICALL_MONITOR ?? '';
  }

  // monitoring multicall works correctly or not
  // note: the average time taken for this function is 1ms
  private monitor(blockTag: BlockTagMulticall, calls: readonly ContractCall[]) {
    if (this.disableMulticall == 'true') {
      return;
    }
    if (calls.length >= this.callLimit) {
      // ingore when the multicall is full
      return;
    }
    const now = new Date();
    const lastCall = this.multicallCache.get(blockTag.toString());
    const duration = now.getTime() - lastCall.getTime();

    const infoCalls = calls.map((call) => {
      return {
        name: call.functionName,
        address: call.address,
      };
    });

    let isClose = false;

    if (duration < MILLISECONDS_IN_A_SECOND * 0.5) {
      // logger.warn(
      //   `2 close multicall requests, blockTag: ${blockTag},
      //   currentCall: ${JSON.stringify(now)},
      //   lastCall: ${JSON.stringify(lastCall)},
      //   duration: ${duration}(ms),
      //   calls: ${JSON.stringify(infoCalls)}`,
      // );

      isClose = true;
    }

    // set metrics
    // infoCalls.forEach((infoCall) => {
    //   multicallRequestSum.labels(infoCall.name, infoCall.type, isClose.toString()).inc();
    // });
    // multicallRequestCount.labels(infoCalls.length.toString(), isClose.toString()).inc();

    // update the last call time
    this.multicallCache.set(blockTag.toString(), now);
  }

  async doAggregateCalls(calls: readonly ContractCall[], blockTagMulticall: BlockTagMulticall) {
    this.monitor(blockTagMulticall, calls);
    const blockTag = typeof blockTagMulticall === 'string' ? blockTagMulticall : undefined;
    const blockNumber = typeof blockTagMulticall === 'bigint' ? blockTagMulticall : undefined;

    const callRequests = calls.map((call) => ({
      target: call.address,
      callData: encodeFunctionData({
        abi: call.abi,
        functionName: call.functionName,
        args: call.params,
      }),
    }));

    let responses: readonly {
      success: boolean;
      returnData: Hex;
    }[];

    try {
      responses = (
        await this.multicallContract.simulate.tryAggregate([false, callRequests], {
          blockTag,
          blockNumber,
        })
      ).result;
    } catch (e) {
      throw new MulticallRPCError(e, {
        nCall: calls.length,
        block: blockTagMulticall.toString(),
      });
    }

    const result = calls.map((call, i) => {
      const { success, returnData } = responses[i];

      try {
        const abiFunction = getAbiFunction(call.abi, call.functionName);

        if (!abiFunction) throw new Error(`Abi function not found for ${call.address}:${call.functionName}`);

        if (!success) {
          try {
            const error = decodeErrorResult({ abi: call.abi, data: returnData });
            throw new Error(`${error.args?.[0] ?? COMMON_ERROR_MESSAGE}`);
          } catch (e) {
            const error = ViemErrorDecoder.decodeViemError(new RawContractError({ data: returnData }));
            throw new Error(`${error.message ?? COMMON_ERROR_MESSAGE}`);
          }
        }

        const params = decodeFunctionResult({
          abi: call.abi,
          functionName: call.functionName,
          data: returnData,
        });

        return params;
      } catch (e: any) {
        if (e.reason == null) {
          e.reason = 'Call failed for unknown reason';
        }
        return e;
      }
    });
    return result;
  }

  wrapFunctions<abi extends Abi, T extends Contract<abi> = Contract<abi>>(
    contract: T,
    functionType: 'read' | 'simulate',
  ) {
    const multicallFuncs: Record<string, any> = {};
    const abi = contract.abi;
    if (functionType in contract === false) return undefined;
    const functionNames = getFunctionNamesFromAbi(abi, functionType);
    functionNames.forEach((functionName) => {
      const call = async (...params: any[]) => {
        let blockTagMulticall: BlockTagMulticall = 'latest';
        let disableMulticall = false;
        let options: MulticallOptions = {};
        const abiFunction = getAbiFunction(contract.abi, functionName);
        if (params.length === abiFunction.inputs.length + 1) {
          options = params.pop() ?? {};
          if (!Multicall.isMulticallOptions(options)) {
            throw new Error('Options for multicall should contain only blockTag property');
          }
          disableMulticall = options.disableMulticall ?? false;
          blockTagMulticall = options.blockTag ?? options.blockNumber ?? 'latest';
        }

        const contractCall = new ContractCall({
          abi: contract.abi,
          address: contract.address,
          functionName,
          params,
        });

        if (disableMulticall) {
          const func = getFunctionFromContract(contract as unknown as Contract<Abi>, functionType, functionName);
          return func(params, options);
        }

        const res = new Promise((resolve, reject) => {
          let currentBatch = this.batchMap.get(blockTagMulticall);
          if (currentBatch === undefined) {
            currentBatch = new MulticallBatch(this, blockTagMulticall);
            this.batchMap.set(blockTagMulticall, currentBatch);
          }
          const dataPos = currentBatch.pendingContractCalls.length;
          currentBatch.pendingContractCalls.push(contractCall);
          currentBatch.promise
            .then((currentResult) =>
              currentResult[dataPos] instanceof Error
                ? reject(currentResult[dataPos])
                : resolve(currentResult[dataPos]),
            )
            .catch(reject);
          if (currentBatch.pendingContractCalls.length >= this.callLimit) {
            this.batchMap.delete(blockTagMulticall);
          }
        });

        return res;
      };
      multicallFuncs[functionName] = call;
    });
    return multicallFuncs;
  }

  wrap<abi extends Abi, T extends Contract<abi> = Contract<abi>>(contract: T) {
    const res = {
      read: this.wrapFunctions<abi>(contract, 'read'),
      simulate: this.wrapFunctions<abi>(contract, 'simulate'),
    } as MulticallFuncs<abi>;
    return res;
  }
}

class MulticallBatch {
  readonly pendingContractCalls: ContractCall[] = [];
  readonly promise: Promise<any[]>;

  constructor(
    private readonly multicallInstance: Multicall,
    readonly blockTagMulticall: BlockTagMulticall = 'latest',
  ) {
    this.promise = Promise.resolve().then(async () => {
      // effects

      // instance comparison
      if (this.multicallInstance.batchMap.get(this.blockTagMulticall) === this) {
        this.multicallInstance.batchMap.delete(this.blockTagMulticall);
      }

      // interactions
      return this.multicallInstance.doAggregateCalls(this.pendingContractCalls, this.blockTagMulticall);
    });
  }
}
