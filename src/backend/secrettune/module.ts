// Everything in this file will be aggregately-exported as one object

export * as Core from './BorosCoreSDK';
export * as SendTxsBot from './BorosSendTxsBotSDK';

import { env } from '../../addresses';
import { httpConfig } from '../../config/http';
import { Sdk as CoreSdk } from './BorosCoreSDK';
import { Sdk as SendTxsBotSdk } from './BorosSendTxsBotSDK';
import { Agent } from 'http';
import { Sdk as V2Sdk } from './PendleV2SDK';
// in ./index.ts

const PROD_CORE_BACKEND_URL = 'https://api.boros.finance/core';
const PROD_SEND_TXS_BOT_BACKEND_URL = 'https://api.boros.finance/send-txs-bot';
const PROD_PENDLE_V2_BACKEND_URL = 'https://api-v2.pendle.finance/core';

const STAGING_CORE_BACKEND_URL = 'https://staging-api.boros.finance/core';
const STAGING_SEND_TXS_BOT_BACKEND_URL = 'https://staging-api.boros.finance/send-txs-bot';
const STAGING_PENDLE_V2_BACKEND_URL = 'https://api-v2.pendle.finance/core';

let coreBackendUrl: string | undefined;
let sendTxsBotBackendUrl: string | undefined;
let pendleV2BackendUrl: string | undefined;
/* eslint-disable @typescript-eslint/no-empty-interface */
export interface BorosCoreSdk extends CoreSdk<unknown> {}
export interface BorosSendTxsBotSdk extends SendTxsBotSdk<unknown> {}
export interface PendleV2Sdk extends V2Sdk<unknown> {}
/* eslint-enable @typescript-eslint/no-empty-interface */

/**
 * @internal
 */
let cachedCoreSdk: BorosCoreSdk;
let cachedSendTxsBotSdk: BorosSendTxsBotSdk;
let cachedPendleV2Sdk: PendleV2Sdk;
export function setCoreBackendUrl(url: string) {
  coreBackendUrl = url;
}

export function setSendTxsBotBackendUrl(url: string) {
  sendTxsBotBackendUrl = url;
}

export function setPendleV2BackendUrl(url: string) {
  pendleV2BackendUrl = url;
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

export function createPendleV2Sdk(baseURL: string) {
  const sdk = new V2Sdk<unknown>({
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

export function getPendleV2Sdk(): PendleV2Sdk {
  const currentPendleV2BackendUrl =
    pendleV2BackendUrl ?? (env === 'production' ? PROD_PENDLE_V2_BACKEND_URL : STAGING_PENDLE_V2_BACKEND_URL);
  return cachedPendleV2Sdk !== undefined
    ? cachedPendleV2Sdk
    : (cachedPendleV2Sdk = createPendleV2Sdk(currentPendleV2BackendUrl));
}
