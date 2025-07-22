import { arbitrum } from 'viem/chains';
import { RPC_URL } from '../common';
import { createPublicClient, http, PublicClient } from 'viem';

export const publicClient = createPublicClient({
  chain: arbitrum,
  transport: http(RPC_URL),
}) as PublicClient;
