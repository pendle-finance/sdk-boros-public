import { CHAIN_ID, getRouterAddress } from '../../addresses';

export const PENDLE_BOROS_ROUTER_DOMAIN = () =>
  ({
    name: 'Pendle Boros Router',
    version: '1.0',
    chainId: BigInt(CHAIN_ID),
    verifyingContract: getRouterAddress(),
  }) as const;

export const EIP712_DOMAIN_TYPES = [
  { name: 'name', type: 'string' },
  { name: 'version', type: 'string' },
  { name: 'chainId', type: 'uint256' },
  { name: 'verifyingContract', type: 'address' },
] as const;

function getSecureRandomValues(length: number): Uint8Array {
  const randomBytes = new Uint8Array(length);

  // Use browser's crypto API if available
  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    window.crypto.getRandomValues(randomBytes);
  }
  // Use Node.js crypto API if available
  else if (typeof global !== 'undefined' && global.crypto && global.crypto.getRandomValues) {
    global.crypto.getRandomValues(randomBytes);
  }
  // Fallback to Node.js crypto module
  else if (typeof require !== 'undefined') {
    const crypto = require('crypto');
    const randomBuffer = crypto.randomBytes(length);
    randomBytes.set(randomBuffer);
  }
  // Last resort fallback (not cryptographically secure)
  else {
    for (let i = 0; i < length; i++) {
      randomBytes[i] = Math.floor(Math.random() * 256);
    }
  }

  return randomBytes;
}

export function getWelcomeMessage(): string {
  const now = new Date();
  const readableTime = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

  const randomBytes = getSecureRandomValues(14); // 14 bytes for 18 chars
  const randomString = Array.from(randomBytes)
    .map((byte) => byte.toString(36).padStart(2, '0'))
    .join('')
    .substring(0, 18);

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

export const PLACE_CONDITIONAL_MESSAGE_TYPES = [
  { name: 'reqHash', type: 'bytes32' },
  { name: 'timestamp', type: 'uint32' },
  { name: 'offchainCondition', type: 'bytes' },
] as const;

export const STOP_ORDER_CANCEL_REQUEST_TYPES = [{ name: 'orderId', type: 'bytes32' }] as const;

export const AGENT_MESSAGE_TYPES = [{ name: 'timestamp', type: 'uint256' }] as const;
