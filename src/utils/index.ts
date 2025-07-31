export * from './signing';
export * from './accountLib';
export * from './orderLib';

import { Address, Hex, WalletClient } from 'viem';
import { Environment, getRouterAddress } from '../addresses';
import { getMarketHubContract } from '../entities/marketHub';
import { MarketAcc } from '../types';

export async function sendTx(walletClient: WalletClient, calldata: Hex, env: Environment) {
  const [account] = await walletClient.getAddresses();
  const txHash = await walletClient.sendTransaction({
    account,
    to: getRouterAddress(env),
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

export async function getEnteredMarkets(marketAcc: MarketAcc, env: Environment) {
  return getMarketHubContract(env).read.getEnteredMarkets([marketAcc]);
}
