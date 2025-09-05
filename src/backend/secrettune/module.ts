// Everything in this file will be aggregately-exported as one object

export * as Core from './BorosCoreSDK';
export * as SendTxsBot from './BorosSendTxsBotSDK';

import { env } from '../../addresses';
import { httpConfig } from '../../config/http';
import { Sdk as CoreSdk } from './BorosCoreSDK';
import { Sdk as SendTxsBotSdk } from './BorosSendTxsBotSDK';
import { Agent } from 'http';

// in ./index.ts

const PROD_CORE_BACKEND_URL = 'https://api.boros.finance/core';
const PROD_SEND_TXS_BOT_BACKEND_URL = 'https://api.boros.finance/send-txs-bot';

const STAGING_CORE_BACKEND_URL = 'https://staging-api.boros.finance/core';
const STAGING_SEND_TXS_BOT_BACKEND_URL = 'https://staging-api.boros.finance/send-txs-bot';

let coreBackendUrl: string | undefined;
let sendTxsBotBackendUrl: string | undefined;
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
  const sdk = new CoreSdk<unknown>({
    baseURL,
    httpAgent: httpConfig.isKeepAliveDisabled() ? new Agent({ keepAlive: false }) : undefined,
    httpsAgent: httpConfig.isKeepAliveDisabled() ? new Agent({ keepAlive: false }) : undefined,
  });
  return sdk;
}

export function createSendTxsBotSdk(baseURL: string) {
  const sdk = new SendTxsBotSdk<unknown>({
    baseURL,
    httpAgent: httpConfig.isKeepAliveDisabled() ? new Agent({ keepAlive: false }) : undefined,
    httpsAgent: httpConfig.isKeepAliveDisabled() ? new Agent({ keepAlive: false }) : undefined,
  });
  return sdk;
}

export function getCoreSdk(): BorosCoreSdk {
  const currentCoreBackendUrl =
    coreBackendUrl ?? (env === 'production' ? PROD_CORE_BACKEND_URL : STAGING_CORE_BACKEND_URL);
  return cachedCoreSdk !== undefined ? cachedCoreSdk : (cachedCoreSdk = createCoreSdk(currentCoreBackendUrl));
}

export function getSendTxsBotSdk(): BorosSendTxsBotSdk {
  const currentSendTxsBotBackendUrl =
    sendTxsBotBackendUrl ?? (env === 'production' ? PROD_SEND_TXS_BOT_BACKEND_URL : STAGING_SEND_TXS_BOT_BACKEND_URL);
  return cachedSendTxsBotSdk !== undefined
    ? cachedSendTxsBotSdk
    : (cachedSendTxsBotSdk = createSendTxsBotSdk(currentSendTxsBotBackendUrl));
}
