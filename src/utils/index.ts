export * from './signing';
export * from './accountLib';

import { encodeFunctionData, Hex, WalletClient } from 'viem';
import { ROUTER_ADDRESS } from '../constants';
import { iRouterAbi } from '../contracts/viemAbis';

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

export function getRouterDirectCallData(callDataList: Hex[], requireMarginCheckCall = false): Hex {
  const data = encodeFunctionData({
    abi: iRouterAbi,
    functionName: 'directCall',
    args: [callDataList.map((calldata) => ({ accountId: 0, data: calldata })), requireMarginCheckCall],
  });

  return data;
}
