import { CHAIN_ID, Environment, getRouterAddress } from '../../addresses';

export const PENDLE_BOROS_ROUTER_DOMAIN = (env: Environment) => ({
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
  const now = new Date();
  const readableTime = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

  // Generate a random 16-character string
  const randomString = Math.random().toString(36).substring(2, 18);

  return `Welcome to Boros Trading Platform!

This signature will be used to create your trading agent.
DateTime: ${readableTime}
Nonce: ${randomString}

By signing this message, you authorize the creation of a trading agent for your account.`;
}

export const UPDATE_SETTINGS_TYPES = [
  { name: 'marketAcc', type: 'bytes26' },
  { name: 'timestamp', type: 'uint256' },
] as const;

export const AGENT_MESSAGE_TYPES = [{ name: 'timestamp', type: 'uint256' }] as const;
