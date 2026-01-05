import { FixedX18 } from '@pendle/boros-offchain-math';
import { Address, PublicClient } from 'viem';
import { arbitrum } from 'viem/chains';
import { toAddress } from '../../addresses';
import { AssetResponse } from '../../backend/secrettune/BorosCoreSDK';
import { ERC20 } from '../../contracts/erc20';
import { LifiTokenResponse } from '../crossChainDeposit/aggregators/Lifi/types';

export class Token {
  constructor(
    public readonly chainId: number,
    public readonly address: Address,
    public readonly decimals: number,
    public readonly symbol: string,
    public readonly name: string,
    public readonly logoURI?: string,
    public readonly priceUSD?: number,
    public readonly tokenId?: number,
    public readonly dstTokenId?: number
  ) {}

  static createFromLifi(token: LifiTokenResponse): Token {
    return new Token(
      token.chainId,
      token.address,
      token.decimals,
      token.symbol,
      token.name,
      token.logoURI,
      token.priceUSD != null ? Number(token.priceUSD) : undefined
    );
  }

  static createFromBorosCore(token: AssetResponse & { chainId?: number; dstTokenId?: number }): Token {
    return new Token(
      token?.chainId ?? arbitrum.id,
      toAddress(token.address),
      token.decimals,
      token.symbol,
      token.name,
      token.metadata.icon,
      Number(token.usdPrice),
      token.tokenId,
      token.dstTokenId
    );
  }

  async balanceOf(address: Address, params: { client: PublicClient }): Promise<TokenAmount> {
    const erc20 = ERC20.create(this.address, { client: params.client, multicall: undefined });
    const balance = await erc20.balanceOf(address);
    return new TokenAmount(this, balance);
  }

  async allowance(address: Address, spender: Address, params: { client: PublicClient }): Promise<TokenAmount> {
    const erc20 = ERC20.create(this.address, { client: params.client, multicall: undefined });
    const allowance = await erc20.allowance(address, spender);
    return new TokenAmount(this, allowance);
  }
}

export class TokenAmount {
  constructor(
    public readonly token: Token,
    public readonly amount: bigint
  ) {}

  static createFromLifi(token: LifiTokenResponse, amount: string): TokenAmount {
    return new TokenAmount(Token.createFromLifi(token), BigInt(amount));
  }

  static createFromBorosCore(token: AssetResponse, amount: string): TokenAmount {
    return new TokenAmount(Token.createFromBorosCore(token), BigInt(amount));
  }

  slipDown(slippage: number): TokenAmount {
    return new TokenAmount(
      this.token,
      FixedX18.fromRawValue(this.amount).mulDown(FixedX18.fromNumber(1 - slippage)).value
    );
  }
}
