import { CHAIN_ID, ROUTER_ADDRESS } from '../../addresses';

export const PENDLE_BOROS_ROUTER_DOMAIN = {
  name: 'Pendle Boros Router',
  version: '1.0',
  chainId: BigInt(CHAIN_ID),
  verifyingContract: ROUTER_ADDRESS,
} as const;

export const EIP712_DOMAIN_TYPES = [
  { name: 'name', type: 'string' },
  { name: 'version', type: 'string' },
  { name: 'chainId', type: 'uint256' },
  { name: 'verifyingContract', type: 'address' },
] as const;

export function getWelcomeMessage(): string {
  return `Welcome to Boros! ${Date.now()}`;
}

export const UPDATE_SETTINGS_TYPES = [
  { name: 'marketAcc', type: 'bytes26' },
  { name: 'timestamp', type: 'uint256' },
] as const;
