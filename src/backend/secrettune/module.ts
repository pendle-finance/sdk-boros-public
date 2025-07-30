// Everything in this file will be aggregately-exported as one object

export * as Core from './BorosCoreSDK';
export * as SendTxsBot from './BorosSendTxsBotSDK';

import { Environment } from '../../addresses';
import { Sdk as CoreSdk } from './BorosCoreSDK';
import { Sdk as SendTxsBotSdk } from './BorosSendTxsBotSDK';

// in ./index.ts

const PROD_CORE_BACKEND_URL = 'https://api.boros.finance/core';
const PROD_SEND_TXS_BOT_BACKEND_URL = 'https://api.boros.finance/send-txs-bot';

const STAGING_CORE_BACKEND_URL = 'https://staging-api.boros.finance/core';
const STAGING_SEND_TXS_BOT_BACKEND_URL = 'https://staging-api.boros.finance/send-txs-bot';

let coreBackendUrl = STAGING_CORE_BACKEND_URL;
let sendTxsBotBackendUrl = STAGING_SEND_TXS_BOT_BACKEND_URL;
/* eslint-disable @typescript-eslint/no-empty-interface */
export interface BorosCoreSdk extends CoreSdk<unknown> {}
export interface BorosSendTxsBotSdk extends SendTxsBotSdk<unknown> {}
/* eslint-enable @typescript-eslint/no-empty-interface */

/**
 * @internal
 */
let cachedCoreSdk: BorosCoreSdk;
let cachedSendTxsBotSdk: BorosSendTxsBotSdk;

export function setCoreBackendUrl(url: string) {
  coreBackendUrl = url;
}

export function setSendTxsBotBackendUrl(url: string) {
  sendTxsBotBackendUrl = url;
}

export function createCoreSdk(baseURL: string) {
  // const { SDK_API_KEY } = sdkEnv();
  const sdk = new CoreSdk<unknown>({
    baseURL,
    // headers: { ...(SDK_API_KEY != null ? { 'api-key': SDK_API_KEY } : {}) },
  });
  return sdk;
}

export function createSendTxsBotSdk(baseURL: string) {
  const sdk = new SendTxsBotSdk<unknown>({
    baseURL,
  });
  return sdk;
}

export function getCoreSdk(env: Environment = 'production'): BorosCoreSdk {
  if(env === 'production') {
    setCoreBackendUrl(PROD_CORE_BACKEND_URL);
  } else {
    setCoreBackendUrl(STAGING_CORE_BACKEND_URL);
  }
  return cachedCoreSdk !== undefined ? cachedCoreSdk : (cachedCoreSdk = createCoreSdk(coreBackendUrl));
}

export function getSendTxsBotSdk(env: Environment = 'production'): BorosSendTxsBotSdk {
  if(env === 'production') {
    setSendTxsBotBackendUrl(PROD_SEND_TXS_BOT_BACKEND_URL);
  } else {
    setSendTxsBotBackendUrl(STAGING_SEND_TXS_BOT_BACKEND_URL);
  }
  return cachedSendTxsBotSdk !== undefined
    ? cachedSendTxsBotSdk
    : (cachedSendTxsBotSdk = createSendTxsBotSdk(sendTxsBotBackendUrl));
}
