// import { rpcResponseTime } from '@libs/monitor/prometheus-metrics/metrics.constant';
import {
  CreateTransportErrorType,
  Transport,
  FallbackTransportConfig,
  FallbackTransport,
  createTransport,
  ExecutionRevertedError,
  TransactionRejectedRpcError,
  UserRejectedRequestError,
} from 'viem';

export type ErrorType<name extends string = 'Error'> = Error & {
  name: name;
};

export type FallbackTransportErrorType = CreateTransportErrorType | ErrorType;

/**
 * Implementation of fallback transport from viem, i edited it to add more tracking & remove unused params
 *
 * https://github.com/wevm/viem/blob/3f8859f52132158fcb721c416ba17424c5c1bc9d/src/clients/transports/fallback.ts#L104
 */
export function fallbackRpcTransport<const transports extends readonly Transport[]>(
  transports_: transports,
  config: Omit<FallbackTransportConfig, 'rank'> = {}
): FallbackTransport<transports> {
  const { key = 'fallback', name = 'Fallback', retryCount, retryDelay } = config;
  return (({ chain, pollingInterval = 4_000, timeout, ...rest }) => {
    const transports = transports_;
    const transport = createTransport({
      key,
      name,
      async request({ method, params }) {
        const fetch = async (i = 0): Promise<any> => {
          const transport = transports[i]({
            ...rest,
            chain,
            retryCount: 0,
            timeout,
          });

          try {
            const response = await transport.request({
              method,
              params,
            } as any);

            return response;
          } catch (err) {
            if (shouldThrow(err as Error)) throw err;

            // If we've reached the end of the fallbacks, throw the error.
            if (i === transports.length - 1) throw err;

            // Otherwise, try the next fallback.
            return fetch(i + 1);
          }
        };
        return fetch();
      },
      retryCount,
      retryDelay,
      type: 'fallback',
    });
    return transport;
  }) as FallbackTransport<transports>;
}

function shouldThrow(error: Error) {
  if ('code' in error && typeof error.code === 'number') {
    if (
      error.code === TransactionRejectedRpcError.code ||
      error.code === UserRejectedRequestError.code ||
      ExecutionRevertedError.nodeMessage.test(error.message) ||
      error.code === 5000 // CAIP UserRejectedRequestError
    )
      return true;
  }
  return false;
}

function resolveUrlHost(providerUrl: string | undefined): string {
  if (!providerUrl) return 'unknown';
  const url = new URL(providerUrl);
  return url.hostname;
}
