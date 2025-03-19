import { http, GetContractReturnType, PublicClient, createPublicClient, getContract } from 'viem';
import { base } from 'viem/chains';
import { MARKET_HUB_ADDRESS } from '../addresses';
import { RPC_URL } from '../common';
import { iMarketHubAbi } from '../contracts/viemAbis';

export const marketHub: GetContractReturnType<typeof iMarketHubAbi, PublicClient> = getContract({
  address: MARKET_HUB_ADDRESS,
  abi: iMarketHubAbi,
  client: createPublicClient({
    chain: base,
    transport: http(RPC_URL),
  }),
});
