import { Address } from 'viem';
import { Token } from '../..';
import { DepositBoxAssetResponse } from '../../../backend/secrettune/BorosCoreSDK';
import { BorosCoreSdk } from '../../../backend/secrettune/module';
import { GlobalCache } from '../../../common/cacheDecorators';
import { ChainId } from '../../../common/chainId';
import { MILLISECONDS_IN_A_MINUTE } from '../../../multicall/constants';
import { TokenId } from '../../../types';

export class TokenHelper {
  constructor(private readonly borosCoreSdk: BorosCoreSdk) {}

  @GlobalCache<TokenHelper, 'getTokens'>({
    generateLookupKey: (_, [params]) => `TokenHelper.getTokens.${params?.dstTokenId}.${params?.srcChainId}`,
    ttl_ms: MILLISECONDS_IN_A_MINUTE * 10,
  })
  async getTokens(params?: { dstTokenId?: TokenId; srcChainId?: ChainId }): Promise<Token[]> {
    const { dstTokenId, srcChainId } = params ?? {};
    const { data } = await this.borosCoreSdk.depositBox.depositBoxControllerGetAssets();

    const { assets, restrictedTokenIds } = data;

    const filterSrcChainId =
      srcChainId == null ? () => true : (asset: { chainId: number }) => asset.chainId === srcChainId;
    const filterDstTokenId =
      dstTokenId == null
        ? () => true
        : (() => {
            const isRestrictedTokenId = restrictedTokenIds.includes(dstTokenId);
            return isRestrictedTokenId
              ? (asset: DepositBoxAssetResponse) => asset.metadata.dstTokenId === dstTokenId
              : (asset: DepositBoxAssetResponse) => asset.metadata.isGeneral === true;
          })();

    return assets
      .filter(filterSrcChainId)
      .filter(filterDstTokenId)
      .map((asset) => Token.createFromBorosCore(asset));
  }

  @GlobalCache<TokenHelper, 'getWithdrawerTokens'>({
    generateLookupKey: (_, [params]) => `TokenHelper.getWithdrawerTokens.${params?.srcTokenId}.${params?.dstChainId}`,
    ttl_ms: MILLISECONDS_IN_A_MINUTE * 10,
  })
  async getWithdrawerTokens(params?: { srcTokenId?: TokenId; dstChainId?: ChainId }): Promise<Token[]> {
    const { srcTokenId, dstChainId } = params ?? {};
    const { data } = await this.borosCoreSdk.depositBox.depositBoxControllerGetAssets();
    const { assets, restrictedTokenIds } = data;

    const srcTokenIdFilter =
      srcTokenId == null
        ? () => true
        : (() => {
            const isRestrictedTokenId = restrictedTokenIds.includes(srcTokenId);
            return isRestrictedTokenId
              ? (asset: DepositBoxAssetResponse) => asset.metadata.dstTokenId === srcTokenId
              : (asset: DepositBoxAssetResponse) => asset.metadata.isGeneral === true;
          })();
    const dstChainIdFilter =
      dstChainId == null ? () => true : (asset: { chainId: number }) => asset.chainId === dstChainId;

    return assets
      .filter(srcTokenIdFilter)
      .filter(dstChainIdFilter)
      .map((asset) => Token.createFromBorosCore(asset));
  }

  async getTokenLookupTable(params?: { dstTokenId?: TokenId }): Promise<TokenLookupTable> {
    const tokens = await this.getTokens(params);
    return new TokenLookupTable(tokens);
  }

  /**
   * Given a token (chainId + address), returns all tokenIds it can deposit to.
   * - If the token has an explicit dstTokenId, it can only deposit to that account type
   * - If generic (no dstTokenId), it can deposit to all non-exclusive tokenIds
   *   (tokenIds that don't have any token with dstTokenId pointing to them)
   */
  @GlobalCache<TokenHelper, 'getDepositableTokenIds'>({
    generateLookupKey: (_, [chainId, tokenAddress]) => `TokenHelper.getDepositableTokenIds.${chainId}.${tokenAddress}`,
    ttl_ms: MILLISECONDS_IN_A_MINUTE * 10,
  })
  async getDepositableTokenIds(chainId: ChainId, tokenAddress: Address): Promise<TokenId[]> {
    const { data } = await this.borosCoreSdk.depositBox.depositBoxControllerGetAssets();
    const { assets, restrictedTokenIds } = data;

    const token = assets.find((t) => t.chainId === chainId && t.address.toLowerCase() === tokenAddress.toLowerCase());
    if (!token) {
      throw new Error(`Token ${tokenAddress} on chain ${chainId} is not supported for deposit`);
    }

    if (token.metadata.dstTokenId != null) {
      return [token.metadata.dstTokenId];
    }

    const allCollateralTokenIds = data.assets.filter((a) => a.isCollateral).map((a) => a.tokenId);
    const restrictedTokenIdSet = new Set(restrictedTokenIds);

    return allCollateralTokenIds.filter((id) => !restrictedTokenIdSet.has(id));
  }
}

export class TokenLookupTable {
  private readonly tokenMap: Map<`${ChainId}-${Address}`, Token>;

  constructor(private readonly tokens: Token[]) {
    this.tokenMap = new Map<`${ChainId}-${Address}`, Token>();
    for (const token of tokens) {
      this.tokenMap.set(`${token.chainId as ChainId}-${token.address}`, token);
    }
  }

  lookup(chainId: ChainId, tokenAddress: Address, checked?: false): Token | undefined;
  lookup(chainId: ChainId, tokenAddress: Address, checked: true): Token;
  lookup(chainId: ChainId, tokenAddress: Address, checked?: boolean): Token | undefined {
    const key: `${ChainId}-${Address}` = `${chainId}-${tokenAddress}`;
    const res = this.tokenMap.get(key);
    if (checked && res == null) {
      throw new Error(`Cannot find token ${tokenAddress} in the lookup table`);
    }
    return res;
  }

  lookupTokenId(chainId: ChainId, tokenAddress: Address): number {
    const token = this.lookup(chainId, tokenAddress, true);
    if (token.tokenId == null) {
      throw new Error(`Token ${tokenAddress} on chain ${chainId} does not have a tokenId`);
    }
    return token.tokenId;
  }
}
