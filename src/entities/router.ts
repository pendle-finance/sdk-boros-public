import { createPublicClient, getContract, http } from 'viem';
import { ROUTER_ADDRESS } from '../constants';
import { iRouterAbi } from '../contracts/viemAbis';
import { base } from 'viem/chains';
import { RPC_URL } from '../common';

export const router = getContract({
  address: ROUTER_ADDRESS,
  abi: iRouterAbi,
  client: createPublicClient({
    chain: base,
    transport: http(RPC_URL),
  }),
});
