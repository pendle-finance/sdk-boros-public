// Everything in this file will be aggregately-exported as one object
// in ./index.ts
export * from './LogStoreBackend';
import { env, Environment } from '../../addresses';

import { Sdk } from './LogStoreBackend';
// import { sdkEnv } from '../../env';
// import { version as SDK_UI_VERSION } from '../../version';
// import { attachResponseCustomHttpCode } from '../interceptors/responseCustomHttpCode';
// import { currentConfig } from '../../config';

const BOROS_SDK_VERSION = '9.9.9-boros';
const PROD_LOG_STORE_BACKEND_URL = 'https://api-v2.pendle.finance/log-store';
const STAGING_LOG_STORE_BACKEND_URL = 'https://staging-api.pendle.finance/log-store';

function getLogStoreBackendUrl(customEnv?: Environment) {
  const currentEnv = customEnv ?? env;
  return currentEnv === 'production' ? PROD_LOG_STORE_BACKEND_URL : STAGING_LOG_STORE_BACKEND_URL;
}

/* eslint-disable @typescript-eslint/no-empty-interface */
export interface DefaultSdk extends Sdk<unknown> {}
/* eslint-enable @typescript-eslint/no-empty-interface */

/**
 * @internal
 */
export const cachedSdk: Partial<Record<Environment, DefaultSdk>> = {};

export function createSdk(baseURL: string, params: { apiKey?: string; disableAxiosInterceptors?: boolean }) {
  const sdk = new Sdk<unknown>({
    baseURL,
    headers: { 'x-sdk-ui-version': BOROS_SDK_VERSION, ...(params.apiKey != null ? { 'api-key': params.apiKey } : {}) },
  });
  // if (!params.disableAxiosInterceptors) {
  //     attachResponseCustomHttpCode(sdk.instance);
  // }
  return sdk;
}

export function getSdk(params?: {
  env?: Environment;
  apiKey?: string;
  disableAxiosInterceptors?: boolean;
}): DefaultSdk {
  const { apiKey, disableAxiosInterceptors } = params ?? {};
  const baseURL = getLogStoreBackendUrl(params?.env);
  const key = `${env}` as const;
  const x = cachedSdk[key];
  return x !== undefined ? x : (cachedSdk[key] = createSdk(baseURL, { apiKey, disableAxiosInterceptors }));
}
