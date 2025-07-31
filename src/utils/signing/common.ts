import { CHAIN_ID, Environment, getRouterAddress } from '../../addresses';

export const PENDLE_BOROS_ROUTER_DOMAIN = (env?: Environment) => ({
  name: 'Pendle Boros Router',
  version: '1.0',
  chainId: BigInt(CHAIN_ID),
  verifyingContract: getRouterAddress(env),
} as const);

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

export const AGENT_MESSAGE_TYPES = [{ name: 'timestamp', type: 'uint256' }] as const;
