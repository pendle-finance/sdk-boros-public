export let RPC_URL = 'https://base.llamarpc.com';

export function registerRpc(url: string): void {
  RPC_URL = url;
}
