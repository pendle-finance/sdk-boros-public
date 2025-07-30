// Everything in this file will be aggregately-exported as one object

export * as Core from './BorosCoreSDK';
export * as SendTxsBot from './BorosSendTxsBotSDK';

import { Sdk as CoreSdk } from './BorosCoreSDK';
import { Sdk as SendTxsBotSdk } from './BorosSendTxsBotSDK';

// in ./index.ts

let coreBackendUrl = 'https://staging-api.boros.finance/core';
let sendTxsBotBackendUrl = 'https://staging-api.boros.finance/send-txs-bot';
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

export function getCoreSdk(): BorosCoreSdk {
  return cachedCoreSdk !== undefined ? cachedCoreSdk : (cachedCoreSdk = createCoreSdk(coreBackendUrl));
}

export function getSendTxsBotSdk(): BorosSendTxsBotSdk {
  return cachedSendTxsBotSdk !== undefined
    ? cachedSendTxsBotSdk
    : (cachedSendTxsBotSdk = createSendTxsBotSdk(sendTxsBotBackendUrl));
}
