export * from './signing';
export * from './accountLib';

import { Hex, WalletClient } from 'viem';
import { ROUTER_ADDRESS } from '../constants';

export async function sendTx(walletClient: WalletClient, calldata: Hex) {
  const [account] = await walletClient.getAddresses();
  const txHash = await walletClient.sendTransaction({
    account,
    to: ROUTER_ADDRESS,
    data: calldata,
    // FIXME: @negativez2 handle native token
    value: 0n,
    chain: walletClient.chain,
  });

  return txHash;
}
