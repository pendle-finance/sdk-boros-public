import { Address, bytesToHex, hexToBytes, numberToBytes } from 'viem';
import { Account, AccountPosition, MarketId, TokenId } from '../types';
/**
 * Represents a packed account position identifier
 * Packs: address(160) | accountId(8) | tokenId(16) | marketId(40)
 */
export class AccountPositionLib {
  static crossMarketId = 2 ** 40 - 1;

  static pack(root: Address, accountId: number, tokenId: TokenId, marketId: MarketId): AccountPosition {
    const rawUserBytes = hexToBytes(root);

    const rawBytes = new Uint8Array(28);
    let offset = 0;
    rawBytes.set(numberToBytes(marketId, { size: 5 }), offset);
    offset += 5;
    rawBytes.set(numberToBytes(tokenId, { size: 2 }), offset);
    offset += 2;
    rawBytes.set(numberToBytes(accountId, { size: 1 }), offset);
    offset += 1;
    rawBytes.set(rawUserBytes, offset);
    offset += 20;
    return bytesToHex(rawBytes);
  }

  static unpack(value: AccountPosition) {
    const bytes = hexToBytes(value);

    const marketId = Number(`0x${Buffer.from(bytes.slice(0, 5)).toString('hex')}`);
    const tokenId = Number(`0x${Buffer.from(bytes.slice(5, 7)).toString('hex')}`);
    const accountId = Number(`0x${Buffer.from(bytes.slice(7, 8)).toString('hex')}`);
    const root = `0x${Buffer.from(bytes.slice(8)).toString('hex')}`;

    return { root, accountId, tokenId, marketId };
  }
}

/**
 * Represents a packed account identifier
 * Packs: address(160) | accountId(8)
 */
export class AccountLib {
  static pack(root: Address, accountId: number): Account {
    const rawUserBytes = hexToBytes(root);

    const rawBytes = new Uint8Array(21);
    let offset = 0;
    rawBytes.set(numberToBytes(accountId, { size: 1 }), offset);
    offset += 1;
    rawBytes.set(rawUserBytes, offset);
    offset += 20;
    return bytesToHex(rawBytes);
  }

  static unpack(account: Account) {
    const accountBytes = hexToBytes(account);
    if (accountBytes.length !== 21) {
      throw new Error('Invalid account');
    }

    const accountId = BigInt(`${bytesToHex(accountBytes.slice(0, 1))}`);
    const root = bytesToHex(accountBytes.slice(1));
    return { root, accountId };
  }
}
