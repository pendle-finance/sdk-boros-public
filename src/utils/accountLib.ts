import { Address, bytesToHex, fromHex, numberToBytes } from 'viem';
import { CROSS_MARKET_ID } from '../constants';
import { Account, MarketAcc, MarketId, TokenId } from '../types';

/**
 * Represents a packed MarketAcc identifier
 * Packs: address(160) | accountId(MarketAcc, 8) | tokenId(16) | marketId(24)
 */
export class MarketAccLib {
  static pack(root: Address, accountId: number, tokenId: TokenId, marketId: MarketId): MarketAcc {
    const rootBigInt = fromHex(root, 'bigint');
    const accountIdBigInt = BigInt(accountId);
    const tokenIdBigInt = BigInt(tokenId);
    const marketIdBigInt = BigInt(marketId);

    const accountPositionBigInt =
      (rootBigInt << 48n) | (accountIdBigInt << 40n) | (tokenIdBigInt << 24n) | marketIdBigInt;

    return bytesToHex(numberToBytes(accountPositionBigInt, { size: 26 }));
  }

  static unpack(value: MarketAcc) {
    const accountPositionBigInt = fromHex(value, 'bigint');
    const root = bytesToHex(numberToBytes(accountPositionBigInt >> 48n, { size: 20 }));
    const accountId = Number((accountPositionBigInt >> 40n) & ((1n << 8n) - 1n));
    const tokenId = Number((accountPositionBigInt >> 24n) & ((1n << 16n) - 1n));
    const marketId = Number(accountPositionBigInt & ((1n << 24n) - 1n));
    return { root, accountId, tokenId, marketId };
  }

  static isCrossMarket(accountPosition: MarketAcc) {
    const { marketId } = MarketAccLib.unpack(accountPosition);
    return marketId === CROSS_MARKET_ID;
  }
}

/**
 * Represents a packed account identifier
 * Packs: address(160) | accountId(8)
 */
export class AccountLib {
  static pack(root: Address, accountId: number): Account {
    const rootBigInt = fromHex(root, 'bigint');
    const accountBigInt = (rootBigInt << 8n) | BigInt(accountId);
    return bytesToHex(numberToBytes(accountBigInt, { size: 21 }));
  }

  static unpack(account: Account) {
    const accountBigInt = fromHex(account, 'bigint');
    const accountId = Number(accountBigInt & ((1n << 8n) - 1n));
    const root = bytesToHex(numberToBytes(accountBigInt >> 8n, { size: 20 }));
    return { root, accountId };
  }
}
