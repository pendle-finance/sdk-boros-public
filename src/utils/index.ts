export * from './signing';
export * from './accountLib';
export * from './orderLib';
export * from './tickLib';

import { Address, Hex, WalletClient } from 'viem';
import { ROUTER_ADDRESS } from '../addresses';
import { marketHub } from '../entities/marketHub';
import { MarketAcc } from '../types';

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

export async function getUserAddressFromWalletClient(userWalletClient: WalletClient): Promise<Address> {
  let userAddress = userWalletClient.account?.address;
  if (!userAddress) {
    [userAddress] = await userWalletClient.getAddresses();
  }
  return userAddress;
}

export async function getEnteredMarkets(marketAcc: MarketAcc) {
  return marketHub.read.getEnteredMarkets([marketAcc]);
}
