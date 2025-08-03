import { http, GetContractReturnType, PublicClient, createPublicClient, getContract } from 'viem';
import { base } from 'viem/chains';
import { getMarketHubAddress } from '../addresses';
import { RPC_URL } from '../common';
import { iMarketHubAbi } from '../contracts/abis/viemAbis';

export const getMarketHubContract = (): GetContractReturnType<typeof iMarketHubAbi, PublicClient> =>
  getContract({
    address: getMarketHubAddress(),
    abi: iMarketHubAbi,
    client: createPublicClient({
      chain: base,
      transport: http(RPC_URL),
    }),
  });
