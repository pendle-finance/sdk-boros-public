import { http, GetContractReturnType, PublicClient, createPublicClient, getContract } from 'viem';
import { base } from 'viem/chains';
import { Environment, getMarketHubAddress } from '../addresses';
import { RPC_URL } from '../common';
import { iMarketHubAbi } from '../contracts/abis/viemAbis';

export const getMarketHubContract = (env: Environment): GetContractReturnType<typeof iMarketHubAbi, PublicClient> => getContract({
  address: getMarketHubAddress(env),
  abi: iMarketHubAbi,
  client: createPublicClient({
    chain: base,
    transport: http(RPC_URL),
  }),
});
