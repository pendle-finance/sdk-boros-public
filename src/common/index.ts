export let RPC_URL = 'https://arb1.arbitrum.io/rpc';

export function registerRpc(url: string): void {
  RPC_URL = url;
}
