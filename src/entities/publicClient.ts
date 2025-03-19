import { base } from 'viem/chains';
import { RPC_URL } from '../common';
import { createPublicClient, http, PublicClient } from 'viem';

export const publicClient = createPublicClient({
  chain: base,
  transport: http(RPC_URL),
}) as PublicClient;
