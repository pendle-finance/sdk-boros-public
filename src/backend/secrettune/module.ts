// Everything in this file will be aggregately-exported as one object

export * from './BorosBackendSDK';
import { Sdk } from './BorosBackendSDK';

// in ./index.ts

const BACKEND_URL = 'https://secrettune.io/core-v2';
/* eslint-disable @typescript-eslint/no-empty-interface */
export interface DefaultSdk extends Sdk<unknown> {}
/* eslint-enable @typescript-eslint/no-empty-interface */

/**
 * @internal
 */
let cachedSdk: DefaultSdk

export function createSdk(baseURL: string) {
    // const { SDK_API_KEY } = sdkEnv();
    const sdk = new Sdk<unknown>({
        baseURL,
        // headers: { ...(SDK_API_KEY != null ? { 'api-key': SDK_API_KEY } : {}) },
    });
    return sdk;
}

export function getSdk(): DefaultSdk {
    const x = cachedSdk;
    return x !== undefined ? x : (cachedSdk = createSdk(BACKEND_URL));
}