/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export enum TransactionAction {
  LONG_YIELD = 'LONG_YIELD',
  SHORT_YIELD = 'SHORT_YIELD',
  ADD_LIQUIDITY = 'ADD_LIQUIDITY',
  REMOVE_LIQUIDITY = 'REMOVE_LIQUIDITY',
}

export enum TransactionType {
  TRADES = 'TRADES',
  LIQUIDITY = 'LIQUIDITY',
}

export enum PendleAssetType {
  PENDLE_LP = 'PENDLE_LP',
  SY = 'SY',
  PT = 'PT',
  YT = 'YT',
}

export interface OrderFilledStatusResponse {
  /** BigInt string of netInputFromMaker, the unit is the same as making amount */
  netInputFromMaker: string;
  /** BigInt string of netOutputToMaker, the unit is SY if the order is PT_FOR_TOKEN or YT_FOR_TOKEN, otherwise, the unit it PT or YT depends on type of order */
  netOutputToMaker: string;
  /** BigInt string of feeAmount, in SY */
  feeAmount: string;
  /** BigInt string of notionalVolume, in SY */
  notionalVolume: string;
}

export interface OrderStateResponse {
  orderType: string;
  exchangeRate: string;
  psAmountToTaker: string;
  psAmountFromTaker: string;
  ysAmountToTaker: string;
  ysAmountFromTaker: string;
  fee: string;
  psRate: number;
  ysRate: number;
  /** In SY if the order is PY for token */
  netToMakerIfFullyFilled: string;
  /** The difference with currentMakingAmount is that this is in SY if currentMakingAmount in tokenIn */
  netFromMakerIfFullyFilled: string;
  notionalVolume: string;
  matchableAmount: string;
  notionalVolumeUSD: number;
}

export interface LimitOrderResponse {
  /** Hash of the order */
  id: string;
  /** Signature of order, signed by maker */
  signature: string;
  /** Chain id */
  chainId: number;
  /** BigInt string of salt. Salt is a random generated number to distinguish between orders.Because of some technical reason, this number must be dividable by 12421 */
  salt: string;
  /** BigInt string of expiry, in second */
  expiry: string;
  /** BigInt string of nonce */
  nonce: string;
  /** LimitOrderType { 0 : TOKEN_FOR_PT, 1 : PT_FOR_TOKEN, 2 : TOKEN_FOR_YT, 3 : YT_FOR_TOKEN } */
  type: 0 | 1 | 2 | 3;
  /** Token used by user to make order */
  token: string;
  /** YT address */
  yt: string;
  /** Maker address */
  maker: string;
  /** Receiver address */
  receiver: string;
  /** BigInt string of making amount, the amount of token if the order is TOKEN_FOR_PT or TOKEN_FOR_YT, otherwise the amount of PT or YT */
  makingAmount: string;
  /** BigInt string of remaining making amount, the unit is the same as makingAmount */
  currentMakingAmount: string;
  /** BigInt string of lnImpliedRate. Natural logarithm of the implied rate */
  lnImpliedRate: string;
  /** BigInt string of failSafeRate */
  failSafeRate: string;
  /** Bytes string for permit */
  permit: string;
  /** Order filled status */
  orderFilledStatus: OrderFilledStatusResponse;
  isActive: boolean;
  isCanceled: boolean;
  /** @format date-time */
  createdAt: string;
  /** Order state */
  orderState?: OrderStateResponse;
  /**
   * Fully filled timestamp
   * @format date-time
   */
  fullyExecutedTimestamp?: string;
  /**
   * Canceled timestamp
   * @format date-time
   */
  canceledTimestamp?: string;
  /**
   * Timestamp of latest event
   * @format date-time
   */
  latestEventTimestamp?: string;
  /** SY address */
  sy: string;
  /** PT address */
  pt: string;
  /** Min(maker balance, maker allowance). How much token the maker has available to use for this order */
  makerBalance: string;
  /** Simulate result of the order to mint sy */
  failedMintSy: boolean;
  /** Error reason of the order to mint sy */
  failedMintSyReason: string;
  /** Bigint string of amount shown on order book */
  orderBookBalance: string;
  /** Making token address */
  makingToken: string;
  /** Taking token address */
  takingToken: string;
  /** LimitOrderStatus */
  status:
    | 'FILLABLE'
    | 'PARTIAL_FILLABLE'
    | 'FAILED_TRANSFER_TOKEN'
    | 'EMPTY_MAKER_BALANCE'
    | 'CANCELLED'
    | 'FULLY_FILLED'
    | 'EXPIRED';
}

export interface LimitOrdersResponse {
  total: number;
  limit: number;
  skip: number;
  results: LimitOrderResponse[];
}

export interface LimitOrdersV2Response {
  total: number;
  limit: number;
  results: LimitOrderResponse[];
  resumeToken: string;
}

export interface MakerResponse {
  maker: string;
  sumOrderSizeUsd: number;
  numOrders: number;
}

export interface MakersResponse {
  result: MakerResponse[];
}

export interface GenerateLimitOrderDataDto {
  /** Chain Id */
  chainId: number;
  /** YT address */
  YT: string;
  /** LimitOrderType { 0 : TOKEN_FOR_PT, 1 : PT_FOR_TOKEN, 2 : TOKEN_FOR_YT, 3 : YT_FOR_TOKEN } */
  orderType: 0 | 1 | 2 | 3;
  /** Input token if type is TOKEN_FOR_PT or TOKEN_FOR_YT, output token otherwise */
  token: string;
  /** Maker address */
  maker: string;
  /** BigInt string of making amount, the amount of token if the order is TOKEN_FOR_PT or TOKEN_FOR_YT, otherwise the amount of PT or YT */
  makingAmount: string;
  /** Implied APY of this limit order */
  impliedApy: number;
  /** Timestamp of order's expiry, in seconds */
  expiry: string;
}

export interface GenerateLimitOrderDataResponse {
  /** Chain id */
  chainId: number;
  /** YT address */
  YT: string;
  /** BigInt string of salt. Salt is a random generated number to distinguish between orders.Because of some technical reason, this number must be dividable by 12421 */
  salt: string;
  /** Limit order expiry, in string */
  expiry: string;
  /** Nonce of the limit order, this will help the maker to cancel all the limit order they created */
  nonce: string;
  /** Input token if type is TOKEN_FOR_PT or TOKEN_FOR_YT, output token otherwise */
  token: string;
  /** LimitOrderType { 0 : TOKEN_FOR_PT, 1 : PT_FOR_TOKEN, 2 : TOKEN_FOR_YT, 3 : YT_FOR_TOKEN } */
  orderType: 0 | 1 | 2 | 3;
  /** BigInt string of failSafeRate */
  failSafeRate: string;
  /** Maker's address */
  maker: string;
  /** Maker's address */
  receiver: string;
  /** BigInt string of making amount, the amount of token if the order is TOKEN_FOR_PT or TOKEN_FOR_YT, otherwise the amount of PT or YT */
  makingAmount: string;
  permit: string;
  /**
   * ln(impliedRate) * 10**18, returned as bigint string
   * @format int64
   */
  lnImpliedRate: number;
}

export interface HttpErrorResponse {
  message: string;
  statusCode: number;
  error: string;
}

export interface GenerateScaledOrderDataDto {
  /** Chain Id */
  chainId: number;
  /** YT address */
  YT: string;
  /** LimitOrderType { 0 : TOKEN_FOR_PT, 1 : PT_FOR_TOKEN, 2 : TOKEN_FOR_YT, 3 : YT_FOR_TOKEN } */
  orderType: 0 | 1 | 2 | 3;
  /** Input token if type is TOKEN_FOR_PT or TOKEN_FOR_YT, output token otherwise */
  token: string;
  /** Maker address */
  maker: string;
  /** BigInt string of making amount, the amount of token if the order is TOKEN_FOR_PT or TOKEN_FOR_YT, otherwise the amount of PT or YT */
  makingAmount: string;
  /** Lower implied APY of this scaled order */
  lowerImpliedApy: number;
  /** Upper implied APY of this scaled order */
  upperImpliedApy: number;
  /** Upper implied APY of this scaled order */
  orderCount: number;
  /** Scaled Order Distribution Type {  } */
  sizeDistribution: 'flat' | 'ascending' | 'descending';
  /** Timestamp of order's expiry, in seconds */
  expiry: string;
}

export interface GenerateScaledOrderResponse {
  /** List of generated limit orders */
  orders: GenerateLimitOrderDataResponse[];
}

export interface CreateLimitOrderDto {
  /** Chain Id */
  chainId: number;
  /** Signature of order, signed by maker */
  signature: string;
  /** BigInt string of salt */
  salt: string;
  /** BigInt string of expiry */
  expiry: string;
  /** BigInt string of nonce */
  nonce: string;
  /** LimitOrderType { 0 : TOKEN_FOR_PT, 1 : PT_FOR_TOKEN, 2 : TOKEN_FOR_YT, 3 : YT_FOR_TOKEN } */
  type: 0 | 1 | 2 | 3;
  /** Token used by user to make order */
  token: string;
  /** YT address */
  yt: string;
  /** Maker address */
  maker: string;
  /** Receiver address */
  receiver: string;
  /** BigInt string of making amount */
  makingAmount: string;
  /** BigInt string of lnImpliedRate */
  lnImpliedRate: string;
  /** BigInt string of failSafeRate */
  failSafeRate: string;
  /** Bytes string for permit */
  permit: string;
}

export interface LimitOrderTakerResponse {
  order: LimitOrderResponse;
  /** Amount to be used to fill the order, the unit is the same as the unit of limit order' making amount */
  makingAmount: string;
  /** Amount from taker need to fully fill this order, the unit is SY if the market order is TOKEN_FOR_PT or TOKEN_FOR_YT, otherwise, the unit it PT or YT depends on type of order */
  netFromTaker: string;
  /** Actual making amount to taker, the unit is SY if the market order is PT_FOR_TOKEN or YT_FOR_TOKEN, otherwise, the unit it PT or YT depends on type of order */
  netToTaker: string;
}

export interface LimitOrdersTakerResponse {
  total: number;
  limit: number;
  skip: number;
  results: LimitOrderTakerResponse[];
}

export interface OrderBookV2EntryResponse {
  /** Order's implied apy, rounded to precision */
  impliedApy: number;
  /**
   * Bigint string of entry size, in PT/YT amounts to fill this entry
   * @format int64
   */
  limitOrderSize: number;
  /**
   * Bigint string of entry size, in AMM LP tokens (if applicable)
   * @format int64
   */
  ammSize?: number;
}

export interface OrderBookV2Response {
  longYieldEntries: OrderBookV2EntryResponse[];
  shortYieldEntries: OrderBookV2EntryResponse[];
}

export interface GetAssetPricesCrossChainResponse {
  /**
   * Assets prices mapped by chainId-address
   * @example {"1-0x5fe30ac5cb1abb0e44cdffb2916c254aeb368650":0.9989673642973003,"1-0xd393d1ddd6b8811a86d925f5e14014282581bc04":1.001712}
   */
  prices: Record<string, number>;
  /** Total number of assets */
  total: number;
  /** Number of assets got skipped */
  skip: number;
  /** Number of assets limited by the query */
  limit?: number | null;
}

export interface PriceOHLCVCSVResponse {
  /** Total number of data points available */
  total: number;
  /**
   * Always return USD
   * @deprecated
   */
  currency: string;
  /** Time frame of each OHLCV data point (e.g., "1h", "1d", "1w") */
  timeFrame: string;
  /** Start timestamp of the data range in seconds */
  timestamp_start: number;
  /** End timestamp of the data range in seconds */
  timestamp_end: number;
  /**
   * Resulting CSV string following the format: time,open,high,low,close,volume
   * @example "time,open,high,low,close,volume
   * 1756245600,42.4563,42.4563,42.4563,42.4563,0.0000"
   */
  results: string;
}

export interface AssetPricesResponse {
  /** The number of assets returned */
  total: number;
  /** Addresses of returned assets, can be mapped by index with priceUsd array */
  addresses: string[];
  /**
   * Price in usd of mapped asset, can be mapped by index with addresses array, return null if the asset doesnt have price
   * @example [1,2,null,4]
   */
  pricesUsd: (number | null)[];
}

export interface NotionalVolumeResponse {
  /** List of timestamps, each will be mapped to a notional volume */
  timestamps: string[];
  /** List of notional volumes corresponding to each timestamp. It has the same length with timestamps array */
  volumes: number[];
  /** List of AMM volumes corresponding to each timestamp. It has the same length with timestamps array. Defaults to 0 if not available. */
  ammVolumes: number[];
  /** List of Limit Order volumes corresponding to each timestamp. It has the same length with timestamps array. Defaults to 0 if not available. */
  limitOrderVolumes: number[];
}

export interface OHLCVDataPoint {
  /**
   * Timestamp of the OHLCV data point
   * @format date-time
   */
  time: string;
  /** Opening price at the start of the time period */
  open: number;
  /** Highest price during the time period */
  high: number;
  /** Lowest price during the time period */
  low: number;
  /** Closing price at the end of the time period */
  close: number;
  /** Trading volume during the time period */
  volume: number;
}

export interface PriceOHLCVResponse {
  /** Maximum number of results returned */
  limit: number;
  /** Total number of data points available */
  total: number;
  /** Currency of the price data (e.g., USD) */
  currency: string;
  /** Time frame of each OHLCV data point (e.g., "hour", "day", "week") */
  timeFrame: string;
  /**
   * Start timestamp of the data range
   * @format date-time
   */
  timestamp_start?: string;
  /**
   * End timestamp of the data range
   * @format date-time
   */
  timestamp_end?: string;
  results: OHLCVDataPoint[];
}

export interface AssetDataCrossChain {
  /**
   * asset name
   * @example "PT FRAX-USDC"
   */
  name: string;
  /**
   * asset decimals
   * @example 18
   */
  decimals: number;
  /**
   * asset address
   * @example "0x5fe30ac5cb1abb0e44cdffb2916c254aeb368650"
   */
  address: string;
  /**
   * asset symbol
   * @example "PT-FRAXUSDC_CurveLP Convex-30MAR2023"
   */
  symbol: string;
  /**
   * asset tags
   * @example ["PT"]
   */
  tags: string[];
  /**
   * asset expiry
   * @example "2023-03-30T00:00:00.000Z"
   */
  expiry: string;
  /**
   * asset pro icon
   * @example "https://storage.googleapis.com/prod-pendle-bucket-a/images/uploads/0d3199a2-0565-4355-ad52-6bfdc67e3467.svg"
   */
  proIcon: string;
  /**
   * chain id
   * @example 1
   */
  chainId: number;
}

export interface GetAllAssetsCrossChainResponse {
  assets: AssetDataCrossChain[];
}

export interface AssetData {
  /**
   * asset name
   * @example "PT FRAX-USDC"
   */
  name: string;
  /**
   * asset decimals
   * @example 18
   */
  decimals: number;
  /**
   * asset address
   * @example "0x5fe30ac5cb1abb0e44cdffb2916c254aeb368650"
   */
  address: string;
  /**
   * asset symbol
   * @example "PT-FRAXUSDC_CurveLP Convex-30MAR2023"
   */
  symbol: string;
  /**
   * asset tags
   * @example ["PT"]
   */
  tags: string[];
  /**
   * asset expiry
   * @example "2023-03-30T00:00:00.000Z"
   */
  expiry: string;
  /**
   * asset pro icon
   * @example "https://storage.googleapis.com/prod-pendle-bucket-a/images/uploads/0d3199a2-0565-4355-ad52-6bfdc67e3467.svg"
   */
  proIcon: string;
}

export interface GetAssetsResponse {
  /**
   * list of assets
   * @example [{"name":"PT FRAX-USDC","decimals":18,"address":"0x5fe30ac5cb1abb0e44cdffb2916c254aeb368650","symbol":"PT-FRAXUSDC_CurveLP Convex-30MAR2023","tags":["PT"],"expiry":"2023-03-30T00:00:00.000Z","proIcon":"https://storage.googleapis.com/prod-pendle-bucket-a/images/assets/pro/acad6337-8ce4-47c2-87a7-c270aab01b3d.svg"},{"name":"YT FRAX-USDC","decimals":18,"address":"0xc5cd692e9b4622ab8cdb57c83a0f99f874a169cd","symbol":"YT-FRAXUSDC_CurveLP Convex-30MAR2023","tags":["YT"],"expiry":"2023-03-30T00:00:00.000Z","proIcon":"https://storage.googleapis.com/prod-pendle-bucket-a/images/assets/pro/2239e536-439d-4c58-a417-805fb63c7ced.svg"}]
   */
  assets: AssetData[];
}

export interface GetAssetPricesResponse {
  /** @example {"0x5fe30ac5cb1abb0e44cdffb2916c254aeb368650":0.9989673642973003,"0xd393d1ddd6b8811a86d925f5e14014282581bc04":1.001712} */
  prices: Record<string, number>;
  /** Total number of assets */
  total: number;
  /** Number of assets got skipped */
  skip: number;
  /** Number of assets limited by the query */
  limit?: number | null;
}

export interface ValuationResponse {
  usd?: number | null;
  acc?: number | null;
}

export interface AssetResponse {
  id: string;
  chainId: number;
  address: string;
  symbol: string;
  decimals: number;
  /** @format date-time */
  expiry?: string | null;
  accentColor?: string | null;
  price?: ValuationResponse | null;
  /** @format date-time */
  priceUpdatedAt?: string | null;
  name: string;
  baseType: string;
  types: string[];
  protocol?: string | null;
  underlyingPool?: string | null;
  proSymbol?: string | null;
  proIcon?: string | null;
  zappable?: boolean | null;
  simpleName: string;
  simpleSymbol: string;
  simpleIcon: string;
  proName: string;
}

export interface AssetsResponse {
  total: number;
  limit: number;
  skip: number;
  results: AssetResponse[];
}

export interface AssetCSVResponse {
  results: string;
}

export interface VersionResponse {
  major: number;
  minor: number;
  patch: number;
}

export interface TokenInfoResponse {
  chainId: number;
  address: string;
  decimals: number;
  name: string;
  symbol: string;
  logoURI: string;
  tags: string[];
  extensions: object;
}

export interface UniswapTokenListResponse {
  name: string;
  timestamp: string;
  version: VersionResponse;
  tokens: TokenInfoResponse[];
  tokenMap: Record<string, TokenInfoResponse>;
  keywords: string[];
  logoURI: string;
  tags: Record<string, TagDefinitionResponse>;
}

export interface SolanaTokenFileResponse {
  uri: string;
  type: string;
}

export interface SolanaTokenPropertiesResponse {
  files: SolanaTokenFileResponse[];
}

export interface SolanaTokenResponse {
  name: string;
  symbol: string;
  description: string;
  image: string;
  attributes: string[];
  properties: SolanaTokenPropertiesResponse;
}

export interface SyBasicResponse {
  id: string;
  chainId: number;
  address: string;
  symbol: string;
  decimals: number;
  /** @format date-time */
  expiry?: string | null;
  accentColor?: string | null;
  price?: ValuationResponse | null;
  /** @format date-time */
  priceUpdatedAt?: string | null;
  name: string;
  baseType: string;
  types: string[];
  protocol?: string | null;
  underlyingPool?: string | null;
  proSymbol?: string | null;
  proIcon?: string | null;
  zappable?: boolean | null;
  simpleName: string;
  simpleSymbol: string;
  simpleIcon: string;
  proName: string;
  accountingAssetType: number;
  /** Accounting asset id */
  accountingAsset: string;
  /** Underlying asset id */
  underlyingAsset: string;
  /** Reward token ids */
  rewardTokens: string[];
  /** Input token ids */
  inputTokens: string[];
  /** Output token ids */
  outputTokens: string[];
}

export interface WhitelistedSysResponse {
  results: SyBasicResponse[];
}

export interface SyResponse {
  id: string;
  chainId: number;
  address: string;
  symbol: string;
  decimals: number;
  /** @format date-time */
  expiry?: string | null;
  accentColor?: string | null;
  price?: ValuationResponse | null;
  /** @format date-time */
  priceUpdatedAt?: string | null;
  name: string;
  baseType: string;
  types: string[];
  protocol?: string | null;
  underlyingPool?: string | null;
  proSymbol?: string | null;
  proIcon?: string | null;
  zappable?: boolean | null;
  simpleName: string;
  simpleSymbol: string;
  simpleIcon: string;
  proName: string;
  accountingAssetType: number;
  accountingAsset: AssetResponse;
  underlyingAsset: AssetResponse;
  rewardTokens: AssetResponse[];
  inputTokens: AssetResponse[];
  outputTokens: AssetResponse[];
}

export interface YieldRangeResponse {
  min: number;
  max: number;
}

export interface MarketDetailsV2Entity {
  /**
   * market liquidity in USD, this is the liquidity of PT and SY in the AMM
   * @example 1234567.89
   */
  liquidity: number;
  /**
   * market total TVL (including floating PT that are not in the AMM) in USD
   * @example 1234567.89
   */
  totalTvl: number;
  /**
   * market 24h trading volume in USD
   * @example 1234567.89
   */
  tradingVolume: number;
  /**
   * APY of the underlying asset
   * @example 0.01
   */
  underlyingApy: number;
  /**
   * swap fee APY for LP holders, without boosting
   * @example 0.01
   */
  swapFeeApy: number;
  /**
   * APY from Pendle rewards
   * @example 0.456
   */
  pendleApy: number;
  /**
   * implied APY of market
   * @example 0.123
   */
  impliedApy: number;
  /**
   * market fee rate
   * @example 0.003
   */
  feeRate: number;
  yieldRange: YieldRangeResponse;
  /**
   * APY including yield, swap fee and Pendle rewards without boosting
   * @example 0.123
   */
  aggregatedApy: number;
  /**
   * APY when maximum boost is applies
   * @example 0.123
   */
  maxBoostedApy: number;
  /**
   * total PT in the market
   * @example 1234567.89
   */
  totalPt: number;
  /**
   * total SY in the market
   * @example 1234567.89
   */
  totalSy: number;
  /**
   * total supply of the LP token
   * @example 1234567.89
   */
  totalSupply: number;
  /**
   * total active supply of the LP token, used for calculate boosting
   * @example 1234567.89
   */
  totalActiveSupply: number;
}

export interface MarketCrossChainData {
  /**
   * market name
   * @example "crvUSD"
   */
  name: string;
  /**
   * market address
   * @example "0x386f90eb964a477498b528a39d9405e73ed4032b"
   */
  address: string;
  /**
   * market expiry date
   * @example "2024-03-28T00:00:00.000Z"
   */
  expiry: string;
  /**
   * market pt id
   * @example "1-0xb87511364014c088e30f872efc4a00d7efb843ac"
   */
  pt: string;
  /**
   * market yt id
   * @example "1-0xed97f94dd94255637a054098604e0201c442a3fd"
   */
  yt: string;
  /**
   * market sy id
   * @example "1-0xe05082b184a34668cd8a904d85fa815802bbb04c"
   */
  sy: string;
  /**
   * market underlying asset id
   * @example "1-0xa663b02cf0a4b149d2ad41910cb81e23e1c41c32"
   */
  underlyingAsset: string;
  /** Market details including liquidity, APY, fee rate, and yield range */
  details: MarketDetailsV2Entity;
  /** Whether the market is new */
  isNew: boolean;
  /** Whether the market is prime */
  isPrime: boolean;
  /**
   * Market deployed timestamp
   * @format date-time
   */
  timestamp: string;
  /** LP wrapper address */
  lpWrapper?: string;
  /**
   * Market category IDs
   * @example ["btc","stables"]
   */
  categoryIds?: string[];
  /**
   * chain id
   * @example 1
   */
  chainId: number;
}

export interface GetMarketsCrossChainResponse {
  markets: MarketCrossChainData[];
}

export interface PointMetadataEntity {
  key: string;
  /** Either "multiplier" or "points-per-asset" */
  type: 'multiplier' | 'points-per-asset';
  /** Either "basic" or "lp" */
  pendleAsset: 'basic' | 'lp';
  externalDashboardURL: string;
  value: number;
  perDollarLp: boolean;
}

export interface MarketPointsEntity {
  /** Market id */
  id: string;
  /** Points configs */
  points: PointMetadataEntity[];
}

export interface GetPointsMarketsResponse {
  markets: MarketPointsEntity[];
}

export interface MarketDetails {
  /**
   * market liquidity in USD
   * @example 1234567.89
   */
  liquidity: number;
  /**
   * APY from Pendle rewards
   * @example 0.456
   */
  pendleApy: number;
  /**
   * implied APY of market
   * @example 0.123
   */
  impliedApy: number;
  /**
   * market fee rate
   * @example 0.003
   */
  feeRate: number;
  yieldRange: YieldRangeResponse;
  /**
   * APY including yield, swap fee and Pendle rewards without boosting
   * @example 0.123
   */
  aggregatedApy: number;
  /**
   * APY when maximum boost is applies
   * @example 0.123
   */
  maxBoostedApy: number;
}

export interface MarketData {
  /**
   * market name
   * @example "crvUSD"
   */
  name: string;
  /**
   * market address
   * @example "0x386f90eb964a477498b528a39d9405e73ed4032b"
   */
  address: string;
  /**
   * market expiry date
   * @example "2024-03-28T00:00:00.000Z"
   */
  expiry: string;
  /**
   * market pt id
   * @example "1-0xb87511364014c088e30f872efc4a00d7efb843ac"
   */
  pt: string;
  /**
   * market yt id
   * @example "1-0xed97f94dd94255637a054098604e0201c442a3fd"
   */
  yt: string;
  /**
   * market sy id
   * @example "1-0xe05082b184a34668cd8a904d85fa815802bbb04c"
   */
  sy: string;
  /**
   * market underlying asset id
   * @example "1-0xa663b02cf0a4b149d2ad41910cb81e23e1c41c32"
   */
  underlyingAsset: string;
  /** Market details including liquidity, APY, fee rate, and yield range */
  details: MarketDetails;
  /** Whether the market is new */
  isNew: boolean;
  /** Whether the market is prime */
  isPrime: boolean;
  /**
   * Market deployed timestamp
   * @format date-time
   */
  timestamp: string;
  /** LP wrapper address */
  lpWrapper?: string;
  /**
   * Market category IDs
   * @example ["btc","stables"]
   */
  categoryIds?: string[];
}

export interface GetActiveMarketsResponse {
  /**
   * active market list
   * @example [{"name":"crvUSD","address":"0x386f90eb964a477498b528a39d9405e73ed4032b","expiry":"2024-03-28T00:00:00.000Z","pt":"1-0xb87511364014c088e30f872efc4a00d7efb843ac","yt":"1-0xed97f94dd94255637a054098604e0201c442a3fd","sy":"1-0xe05082b184a34668cd8a904d85fa815802bbb04c","underlyingAsset":"1-0xb27d1729489d04473631f0afaca3c3a7389ac9f8","details":{"liquidity":1000000,"pendleApy":0.05,"impliedApy":0.05,"feeRate":0.001,"yieldRange":{"min":0.01,"max":0.02},"aggregatedApy":0.1,"maxBoostedApy":0.1},"isNew":true,"isPrime":true,"timestamp":"2025-03-18T00:00:00.000Z","categoryIds":["stables"]},{"name":"USD0++","address":"0x64506968e80c9ed07bff60c8d9d57474effff2c9","expiry":"2025-01-30T00:00:00.000Z","pt":"1-0x61439b9575278054d69c9176d88fafaf8319e4b7","yt":"1-0x9697e1ef258b847275e1b32f8a57b3a7e2f8ec50","sy":"1-0x52453825c287ddef62d647ce51c0979d27c461f7","underlyingAsset":"1-0x35d8949372d46b7a3d5a56006ae77b215fc69bc0","details":{"liquidity":1000000,"pendleApy":0.05,"impliedApy":0.05,"feeRate":0.001,"yieldRange":{"min":0.01,"max":0.02},"aggregatedApy":0.1,"maxBoostedApy":0.1},"isNew":false,"isPrime":false,"timestamp":"2025-02-18T00:00:00.000Z","categoryIds":["rwa"]}]
   */
  markets: MarketData[];
}

export interface GetInactiveMarketsResponse {
  /**
   * inactive market list
   * @example [{"name":"crvUSD","address":"0x386f90eb964a477498b528a39d9405e73ed4032b","expiry":"2024-03-28T00:00:00.000Z","pt":"1-0xb87511364014c088e30f872efc4a00d7efb843ac","yt":"1-0xed97f94dd94255637a054098604e0201c442a3fd","sy":"1-0xe05082b184a34668cd8a904d85fa815802bbb04c","underlyingAsset":"1-0xb27d1729489d04473631f0afaca3c3a7389ac9f8","details":{"liquidity":1000000,"pendleApy":0.05,"impliedApy":0.05,"feeRate":0.001,"yieldRange":{"min":0.01,"max":0.02},"aggregatedApy":0.1,"maxBoostedApy":0.1},"isNew":true,"isPrime":true,"timestamp":"2025-03-18T00:00:00.000Z","categoryIds":["stables"]},{"name":"USD0++","address":"0x64506968e80c9ed07bff60c8d9d57474effff2c9","expiry":"2025-01-30T00:00:00.000Z","pt":"1-0x61439b9575278054d69c9176d88fafaf8319e4b7","yt":"1-0x9697e1ef258b847275e1b32f8a57b3a7e2f8ec50","sy":"1-0x52453825c287ddef62d647ce51c0979d27c461f7","underlyingAsset":"1-0x35d8949372d46b7a3d5a56006ae77b215fc69bc0","details":{"liquidity":1000000,"pendleApy":0.05,"impliedApy":0.05,"feeRate":0.001,"yieldRange":{"min":0.01,"max":0.02},"aggregatedApy":0.1,"maxBoostedApy":0.1},"isNew":false,"isPrime":false,"timestamp":"2025-02-18T00:00:00.000Z","categoryIds":["rwa"]}]
   */
  markets: MarketData[];
}

export interface MarketApyHistoriesCSVResponse {
  total: number;
  timestamp_start: number;
  timestamp_end: number;
  results: string;
}

export interface MarketExtendedInfoResponse {
  floatingPt: number;
  floatingSy: number;
  /** Sy supply cap. Only available for sy with cap, otherwise null. Number is in decimal format */
  sySupplyCap?: number | null;
  /** Sy current supply. Only available for sy with cap, otherwise null. Number is in decimal format */
  syCurrentSupply?: number | null;
  pyUnit: string;
  ptEqualsPyUnit: boolean;
  underlyingAssetWorthMore?: string;
  nativeWithdrawalURL?: string;
  nativeDepositURL?: string;
  defaultMigratePool?: string;
  feeRate?: number;
  yieldRange?: YieldRangeResponse;
}

export interface MarketBasicMetadataResponse {
  id: string;
  chainId: number;
  address: string;
  symbol: string;
  /** @format date-time */
  expiry: string;
  pt: AssetResponse;
  yt: AssetResponse;
  sy: AssetResponse;
  lp: AssetResponse;
  accountingAsset: AssetResponse;
  underlyingAsset: AssetResponse;
  /**
   * Same as accountingAsset
   * @deprecated
   */
  basePricingAsset?: AssetResponse | null;
  protocol?: string | null;
  underlyingPool?: string | null;
  proSymbol?: string | null;
  proIcon?: string | null;
  assetRepresentation: string;
  isWhitelistedPro: boolean;
  /** @deprecated */
  isWhitelistedSimple: boolean;
  votable: boolean;
  /** @deprecated */
  isActive: boolean;
  isWhitelistedLimitOrder: boolean;
  accentColor?: string | null;
  totalPt?: number | null;
  totalSy?: number | null;
  totalLp?: number | null;
  liquidity?: ValuationResponse | null;
  tradingVolume?: ValuationResponse | null;
  underlyingInterestApy?: number | null;
  underlyingRewardApy?: number | null;
  underlyingApy?: number | null;
  impliedApy?: number | null;
  ytFloatingApy?: number | null;
  ptDiscount?: number | null;
  swapFeeApy?: number | null;
  pendleApy?: number | null;
  arbApy?: number | null;
  aggregatedApy?: number | null;
  maxBoostedApy?: number | null;
  lpRewardApy?: number | null;
  voterApy?: number | null;
  ytRoi?: number | null;
  ptRoi?: number | null;
  /** @format date-time */
  dataUpdatedAt?: string | null;
  categoryIds: string[];
  /** @format date-time */
  timestamp: string;
  /** @format date-time */
  whitelistedProAt?: string | null;
  scalarRoot: number;
  initialAnchor: number;
  /** Additional market data, only available when market is whitelisted. */
  extendedInfo: MarketExtendedInfoResponse;
  isFeatured?: boolean | null;
  isPopular?: boolean | null;
  /** @format date-time */
  tvlThresholdTimestamp?: string | null;
  /** Market which whitelisted in the last 2 weeks will have isNew==true */
  isNew: boolean;
  name: string;
  simpleName: string;
  simpleSymbol: string;
  simpleIcon: string;
  proName: string;
  farmName: string;
  farmSymbol: string;
  farmSimpleName: string;
  farmSimpleSymbol: string;
  farmSimpleIcon: string;
  farmProName: string;
  farmProSymbol: string;
  farmProIcon: string;
}

export interface MarketsResponse {
  total: number;
  limit: number;
  skip: number;
  results: MarketBasicMetadataResponse[];
}

export interface CurrenyAmountEntity {
  currency: string;
  amount?: number | null;
}

export interface FeaturedMarketEntity {
  marketAddress: string;
  icon: string;
  tokenSymbol: string;
  symbol: string;
  accentColor: string;
  discountedPrice: CurrenyAmountEntity;
  fixedApy: number;
  currentPrice: CurrenyAmountEntity;
}

export interface FeaturedMarketsResponseEntity {
  total: number;
  limit: number;
  skip: number;
  results: FeaturedMarketEntity[];
}

export interface AssetBasicResponse {
  id: string;
  chainId: number;
  address: string;
  symbol: string;
  decimals: number;
  /** @format date-time */
  expiry?: string | null;
  accentColor?: string | null;
  price?: ValuationResponse | null;
  /** @format date-time */
  priceUpdatedAt?: string | null;
  name: string;
}

export interface ApyBreakdownResponse {
  asset: AssetBasicResponse;
  absoluteApy: number;
  relativeApy: number;
  isExternalReward?: boolean | null;
  isProtocolExternalReward?: boolean | null;
  ytExclusive?: boolean | null;
  lpExclusive?: boolean | null;
}

export interface EstimatedDailyPoolRewardResponse {
  asset: AssetBasicResponse;
  amount: number;
}

export interface MarketResponse {
  /** Unique identifier of the market in format "{chainId}-{address}" */
  id: string;
  /** Chain ID where the market is deployed */
  chainId: number;
  /** Contract address of the market */
  address: string;
  /** Symbol of the market */
  symbol: string;
  /**
   * Expiry date of the PT/YT tokens
   * @format date-time
   */
  expiry: string;
  /** Principal Token (PT) asset information */
  pt: AssetResponse;
  /** Yield Token (YT) asset information */
  yt: AssetResponse;
  /** Standardized Yield (SY) token asset information */
  sy: AssetResponse;
  /** Liquidity Pool (LP) token asset information */
  lp: AssetResponse;
  /** Asset used for accounting and pricing in this market */
  accountingAsset: AssetResponse;
  /** The underlying asset that generates yield */
  underlyingAsset: AssetResponse;
  /**
   * Same as accountingAsset
   * @deprecated
   */
  basePricingAsset?: AssetResponse | null;
  rewardTokens: AssetResponse[];
  inputTokens: AssetResponse[];
  outputTokens: AssetResponse[];
  protocol?: string | null;
  underlyingPool?: string | null;
  proSymbol?: string | null;
  proIcon?: string | null;
  /** String representation of the asset type for this market */
  assetRepresentation: string;
  /** Whether this market is whitelisted for pro interface */
  isWhitelistedPro: boolean;
  /**
   * Whether this market is whitelisted for simple interface
   * @deprecated
   */
  isWhitelistedSimple: boolean;
  /** Whether this market can receive vePENDLE votes */
  votable: boolean;
  /**
   * Whether the market is currently active (not expired and not manually deactivated)
   * @deprecated
   */
  isActive: boolean;
  /** Whether limit orders are enabled for this market */
  isWhitelistedLimitOrder: boolean;
  accentColor?: string | null;
  /** Total PT in the market */
  totalPt?: number | null;
  /** Total SY in the market */
  totalSy?: number | null;
  /** Total supply of the LP token */
  totalLp?: number | null;
  /** Total active supply of the LP token, used for calculate boosting */
  totalActiveSupply?: number | null;
  /** Market liquidity, this is the liquidity of PT and SY in the AMM */
  liquidity?: ValuationResponse | null;
  /** Market 24h trading volume */
  tradingVolume?: ValuationResponse | null;
  /** Annual percentage yield from the underlying asset interest */
  underlyingInterestApy?: number | null;
  /** Annual percentage yield from the underlying asset rewards */
  underlyingRewardApy?: number | null;
  underlyingRewardApyBreakdown?: ApyBreakdownResponse[] | null;
  /** APY of the underlying asset */
  underlyingApy?: number | null;
  /** Implied APY of market */
  impliedApy?: number | null;
  /** Floating APY for YT holders (underlyingApy - impliedApy) */
  ytFloatingApy?: number | null;
  /** PT discount relative to underlying asset */
  ptDiscount?: number | null;
  /** Swap fee APY for LP holders, without boosting */
  swapFeeApy?: number | null;
  /** APY from Pendle rewards */
  pendleApy?: number | null;
  /** APY from arbitrage opportunities */
  arbApy?: number | null;
  /** APY including yield, swap fee and Pendle rewards without boosting */
  aggregatedApy?: number | null;
  /** APY when maximum boost is applied */
  maxBoostedApy?: number | null;
  /** APY from LP reward tokens */
  lpRewardApy?: number | null;
  /** APY for voters (vePENDLE holders) from voting on this pool */
  voterApy?: number | null;
  /** Return on investment for YT holders */
  ytRoi?: number | null;
  /** Return on investment for PT holders */
  ptRoi?: number | null;
  estimatedDailyPoolRewards?: EstimatedDailyPoolRewardResponse[] | null;
  /** @format date-time */
  dataUpdatedAt?: string | null;
  /** 24-hour percentage change in liquidity */
  liquidityChange24h?: number | null;
  /** 24-hour percentage change in trading volume */
  tradingVolumeChange24h?: number | null;
  /** 24-hour change in underlying interest APY (in percentage points) */
  underlyingInterestApyChange24h?: number | null;
  /** 24-hour change in underlying reward APY (in percentage points) */
  underlyingRewardApyChange24h?: number | null;
  /** 24-hour change in underlying APY (in percentage points) */
  underlyingApyChange24h?: number | null;
  /** 24-hour change in implied APY (in percentage points) */
  impliedApyChange24h?: number | null;
  /** 24-hour change in YT floating APY (in percentage points) */
  ytFloatingApyChange24h?: number | null;
  /** 24-hour change in PT discount (in percentage points) */
  ptDiscountChange24h?: number | null;
  /** 24-hour change in swap fee APY (in percentage points) */
  swapFeeApyChange24h?: number | null;
  /** 24-hour change in PENDLE APY (in percentage points) */
  pendleApyChange24h?: number | null;
  /** 24-hour change in aggregated APY (in percentage points) */
  aggregatedApyChange24h?: number | null;
  /** 24-hour change in LP reward APY (in percentage points) */
  lpRewardApyChange24h?: number | null;
  /** 24-hour change in voter APY (in percentage points) */
  voterApyChange24h?: number | null;
  /** Array of category IDs this market belongs to */
  categoryIds: string[];
  /**
   * Timestamp when the market data was last updated
   * @format date-time
   */
  timestamp: string;
  scalarRoot: number;
  initialAnchor: number;
  /** Additional market data, only available when market is whitelisted. */
  extendedInfo: MarketExtendedInfoResponse;
  isFeatured?: boolean | null;
  isPopular?: boolean | null;
  /** @format date-time */
  tvlThresholdTimestamp?: string | null;
  /** @format date-time */
  whitelistedProAt?: string | null;
  /** Market which whitelisted in the last 2 weeks will have isNew==true */
  isNew: boolean;
  name: string;
  simpleName: string;
  simpleSymbol: string;
  simpleIcon: string;
  proName: string;
  farmName: string;
  farmSymbol: string;
  farmSimpleName: string;
  farmSimpleSymbol: string;
  farmSimpleIcon: string;
  farmProName: string;
  farmProSymbol: string;
  farmProIcon: string;
}

export interface MarketDataResponse {
  /**
   * Timestamp of the market data snapshot
   * @format date-time
   */
  timestamp: string;
  /** Market liquidity, this is the liquidity of PT and SY in the AMM */
  liquidity: ValuationResponse;
  /** Market 24h trading volume */
  tradingVolume: ValuationResponse;
  /** Market total TVL (including floating PT that are not in the AMM) */
  totalTvl?: ValuationResponse | null;
  /** Annual percentage yield from the underlying asset interest */
  underlyingInterestApy: number;
  /** Annual percentage yield from the underlying asset rewards */
  underlyingRewardApy: number;
  /** APY of the underlying asset */
  underlyingApy: number;
  /** Implied APY of market */
  impliedApy: number;
  /** Floating APY for YT holders (underlyingApy - impliedApy) */
  ytFloatingApy: number;
  /** Swap fee APY for LP holders, without boosting */
  swapFeeApy: number;
  /** APY for voters (vePENDLE holders) from voting on this pool */
  voterApy: number;
  /** PT discount relative to underlying asset */
  ptDiscount: number;
  /** APY from Pendle rewards */
  pendleApy: number;
  /** APY from arbitrage opportunities */
  arbApy?: number;
  /** APY from LP reward tokens */
  lpRewardApy: number;
  /** APY including yield, swap fee and Pendle rewards without boosting */
  aggregatedApy: number;
  /** APY when maximum boost is applied */
  maxBoostedApy: number;
  /** Estimated daily pool rewards broken down by asset */
  estimatedDailyPoolRewards: EstimatedDailyPoolRewardResponse[];
  /** Total PT in the market */
  totalPt: number;
  /** Total SY in the market */
  totalSy: number;
  /** Total supply of the LP token */
  totalLp: number;
  /** Total active supply of the LP token, used for calculate boosting */
  totalActiveSupply: number;
  /** Price of the accounting asset in USD */
  assetPriceUsd: number;
}

export interface MarketHistoryResponse {
  /** @format date-time */
  timestamp: string;
  liquidity: ValuationResponse;
  tradingVolume: ValuationResponse;
  totalTvl?: ValuationResponse | null;
  underlyingInterestApy: number;
  underlyingRewardApy: number;
  underlyingApy: number;
  impliedApy: number;
  ytFloatingApy: number;
  ptDiscount: number;
  swapFeeApy: number;
  pendleApy: number;
  aggregatedApy: number;
  lpRewardApy: number;
  voterApy: number;
  totalPt: number;
  totalSy: number;
  totalLp: number;
  totalActiveSupply: number;
}

export interface MarketHistoriesResponse {
  total: number;
  limit?: number;
  /** @format date-time */
  timestamp_start: string;
  /** @format date-time */
  timestamp_end?: string;
  results: MarketHistoryResponse[];
}

export interface MarketApyHistoryResponse {
  /**
   * Timestamp of the APY data point
   * @format date-time
   */
  timestamp: string;
  /** APY of the underlying asset */
  underlyingApy: number;
  /** Implied APY of market */
  impliedApy: number;
}

export interface MarketApyHistoriesResponse {
  total: number;
  limit: number;
  /** @format date-time */
  timestamp_start: string;
  /** @format date-time */
  timestamp_end: string;
  results: MarketApyHistoryResponse[];
}

export interface GetMarketStatHistoryCSVResponse {
  /** total data point of the result */
  total: number;
  /** timestamp start of the result */
  timestamp_start: number;
  /** timestamp end of the result */
  timestamp_end: number;
  /** csv result with 4 column: timestamp,maxApy,baseApy,tvl. Timestamp is in second, tvl is in usd */
  results: string;
}

export interface MarketHistoricalDataPoint {
  /**
   * Timestamp in ISO format
   * @format date-time
   */
  timestamp: string;
  /** APY when maximum boost is applied */
  maxApy?: number;
  /** APY including yield, swap fee and Pendle rewards without boosting */
  baseApy?: number;
  /** APY of the underlying asset */
  underlyingApy?: number;
  /** Implied APY of market */
  impliedApy?: number;
  /** Market liquidity (TVL in the pool) in USD */
  tvl?: number;
  /** Market total TVL (including floating PT that are not in the AMM) in USD */
  totalTvl?: number;
  /** Annual percentage yield from the underlying asset interest */
  underlyingInterestApy?: number;
  /** Annual percentage yield from the underlying asset rewards */
  underlyingRewardApy?: number;
  /** Floating APY for YT holders (underlyingApy - impliedApy) */
  ytFloatingApy?: number;
  /** Swap fee APY for LP holders, without boosting */
  swapFeeApy?: number;
  /** APY for voters (vePENDLE holders) from voting on this pool */
  voterApr?: number;
  /** APY from Pendle rewards */
  pendleApy?: number;
  /** APY from LP reward tokens */
  lpRewardApy?: number;
  /** Total PT in the market */
  totalPt?: number;
  /** Total SY in the market */
  totalSy?: number;
  /** Total supply of the LP token */
  totalSupply?: number;
  /** PT price in USD */
  ptPrice?: number;
  /** YT price in USD */
  ytPrice?: number;
  /** SY price in USD */
  syPrice?: number;
  /** LP price in USD */
  lpPrice?: number;
  /** Last epoch votes */
  lastEpochVotes?: number;
  /** 24h trading volume in USD */
  tradingVolume?: number;
  /** Explicit swap fee in USD (only available for daily and weekly timeframes) */
  explicitSwapFee?: number;
  /** Implicit swap fee in USD (only available for daily and weekly timeframes) */
  implicitSwapFee?: number;
  /** Limit order fee in USD (only available for daily and weekly timeframes) */
  limitOrderFee?: number;
}

export interface MarketHistoricalDataResponse {
  /** Total number of data points available */
  total: number;
  /**
   * Start timestamp of the data range
   * @format date-time
   */
  timestamp_start: string;
  /**
   * End timestamp of the data range
   * @format date-time
   */
  timestamp_end: string;
  /** Array of historical data points */
  results: MarketHistoricalDataPoint[];
}

export interface MarketHistoricalDataTableResponse {
  total: number;
  timestamp_start: number;
  timestamp_end: number;
  /** Array of timestamp in second */
  timestamp: number[];
  /** Array of maxApy. 0.5 means 50% */
  maxApy?: number[];
  /** Array of baseApy. 0.5 means 50% */
  baseApy?: number[];
  /** Array of underlyingApy. 0.5 means 50% */
  underlyingApy?: number[];
  /** Array of impliedApy. 0.5 means 50% */
  impliedApy?: number[];
  /** Array of tvl (market liquidity in USD) */
  tvl?: number[];
  /** Array of total TVL (in USD) */
  totalTvl?: number[];
  /** Array of underlying interest APY. 0.5 means 50% */
  underlyingInterestApy?: number[];
  /** Array of underlying reward APY. 0.5 means 50% */
  underlyingRewardApy?: number[];
  /** Array of YT floating APY. 0.5 means 50% */
  ytFloatingApy?: number[];
  /** Array of swap fee APY. 0.5 means 50% */
  swapFeeApy?: number[];
  /** Array of voter APR. 0.5 means 50% */
  voterApr?: number[];
  /** Array of PENDLE APY. 0.5 means 50% */
  pendleApy?: number[];
  /** Array of LP reward APY. 0.5 means 50% */
  lpRewardApy?: number[];
  /** Array of total PT amount */
  totalPt?: number[];
  /** Array of total SY amount */
  totalSy?: number[];
  /** Array of total LP supply */
  totalSupply?: number[];
  /** Array of PT price (in USD) */
  ptPrice?: number[];
  /** Array of YT price (in USD) */
  ytPrice?: number[];
  /** Array of SY price (in USD) */
  syPrice?: number[];
  /** Array of LP price (in USD) */
  lpPrice?: number[];
  /** Array of last epoch votes */
  lastEpochVotes?: number[];
  /** Array of explicit swap fee (in USD). Only available for daily and weekly timeframes */
  explicitSwapFee?: number[];
  /** Array of implicit swap fee (in USD). Only available for daily and weekly timeframes */
  implicitSwapFee?: number[];
  /** Array of limit order fee (in USD). Only available for daily and weekly timeframes */
  limitOrderFee?: number[];
}

export interface MarketImpliedApyDataPoint {
  timestamp: number;
  impliedApy: number;
}

export interface MarketImpliedApyResponseEntity {
  total: number;
  timestamp_start?: number;
  timestamp_end?: number;
  results: MarketImpliedApyDataPoint[];
}

export interface MarketAssetsResponse {
  pt: AssetResponse;
  yt: AssetResponse;
  sy: AssetResponse;
  lp: AssetResponse;
  accountingAsset: AssetResponse;
  underlyingAsset: AssetResponse;
  /**
   * Same as accountingAsset
   * @deprecated
   */
  basePricingAsset: AssetResponse;
  rewardTokens: AssetResponse[];
  inputTokens: AssetResponse[];
  outputTokens: AssetResponse[];
}

export interface MarketCategoryResponse {
  id: string;
  name: string;
}

export interface GetAllMarketCategoriesResponse {
  results: MarketCategoryResponse[];
}

export interface UtilizedProtocolResponse {
  id: string;
  url: string;
  name: string;
  imageUrl: string;
}

export interface GetAllUtilizedProtocolsResponse {
  results: UtilizedProtocolResponse[];
}

export interface VoteV2Response {
  /** Absolute number of votes */
  votes: number;
  /** Percentage of total votes */
  percentage: number;
}

export interface PoolV2Response {
  /** Unique identifier of the pool (market) */
  id: string;
  /** Symbol of the pool (market) */
  symbol: string;
  /** Expiry date of the pool (market) */
  expiry: string;
  /** Voter APR for current epoch */
  currentVoterApr?: number;
  /** Voter APR from last epoch */
  lastEpochVoterApr?: number;
  /** Swap fees collected in current epoch (in USD) */
  currentSwapFee?: number;
  /** Swap fees collected in last epoch (in USD) */
  lastEpochSwapFee?: number;
  /** Projected voter APR for next epoch */
  projectedVoterApr?: number;
  /** Projected votes for next epoch */
  projectedVotes?: VoteV2Response | null;
  /** Votes in current epoch */
  currentVotes?: VoteV2Response | null;
  /** Expected incentive cap for next epoch (BigInt string) */
  expectedCap?: string;
  /** Current incentive cap for this epoch (BigInt string) */
  currentCap?: string;
}

export interface VePendleDataResponse {
  /** Average lock duration in days */
  avgLockDuration: number;
  /** Total amount of PENDLE tokens locked in vePENDLE */
  totalPendleLocked: number;
  /** Total supply of vePENDLE tokens */
  vePendleSupply: number;
  /** Total projected votes for next epoch */
  totalProjectedVotes: number;
  /** Total votes in current epoch */
  totalCurrentVotes: number;
  /** List of voting pools with their APY, fees, and voting data */
  pools: PoolV2Response[];
}

export interface PendleTokenSupplyResponse {
  /**
   * Timestamp of the token supply data
   * @format date-time
   */
  timestamp: string;
  /** Total circulating supply of PENDLE tokens (not locked) */
  totalPendleCirculating: number;
  /** Total amount of PENDLE tokens locked in vePENDLE */
  totalPendleLocked: number;
  /** Total supply of PENDLE tokens */
  totalPendleSupply: number;
}

export interface GetMonthlyRevenueResponse {
  /** The revenues of the month in USD within the time range */
  revenues: number[];
  /** The start dates of the month in Date within the time range */
  epochStartDates: string[];
  /** all time revenues in USD */
  accumulatedRevenue: number;
}

export interface VePendleExtendedDataResponse {
  /** Average lock duration in days */
  avgLockDuration: number;
  /** Total amount of PENDLE tokens locked in vePENDLE */
  totalPendleLocked: number;
  /** Total supply of vePENDLE tokens */
  vePendleSupply: number;
  /** Total projected votes for next epoch */
  totalProjectedVotes: number;
  /** Total votes in current epoch */
  totalCurrentVotes: number;
  /** List of voting pools with their APY, fees, and voting data */
  pools: PoolV2Response[];
  /** Current circulating and total supply of PENDLE tokens */
  tokenSupply?: PendleTokenSupplyResponse;
  /** Monthly protocol revenue breakdown and trends */
  monthlyRevenue?: GetMonthlyRevenueResponse;
}

export interface PoolResponse {
  id: string;
  chainId: number;
  address: string;
  symbol: string;
  expiry: string;
  protocol?: string | null;
  underlyingPool?: string | null;
  voterApy: number;
  accentColor?: string | null;
  name: string;
  farmSimpleName: string;
  farmSimpleIcon: string;
  farmProName: string;
  farmProIcon: string;
}

export interface VoteResponse {
  pool: PoolResponse;
  votes: number;
  percentage: number;
}

export interface VoteSnapshotResponse {
  votes: VoteResponse[];
  totalPools: number;
  totalVotes: number;
  /** @format date-time */
  epoch: string;
}

export interface PoolVoterApyResponse {
  pool: PoolResponse;
  voterApy: number;
}

export interface PoolVoterApysResponse {
  results: PoolVoterApyResponse[];
  totalPools: number;
  /** @format date-time */
  timestamp: string;
}

export interface PoolVoterAprSwapFeeResponse {
  pool: PoolResponse;
  currentVoterApr: number;
  lastEpochVoterApr: number;
  currentSwapFee: number;
  lastEpochSwapFee: number;
  projectedVoterApr: number;
}

export interface PoolVoterAprsSwapFeesResponse {
  results: PoolVoterAprSwapFeeResponse[];
  totalPools: number;
  totalFee: number;
  /** @format date-time */
  timestamp: string;
}

export interface VoterApyChartDataPoint {
  /** @format date-time */
  time: string;
  voterApy: number;
}

export interface PoolVoterApyChart {
  values: VoterApyChartDataPoint[];
  pool: PoolResponse;
}

export interface VoterApyChartResponse {
  results: PoolVoterApyChart[];
}

export interface VePendleApyChartDataPoint {
  /** @format date-time */
  time: string;
  vePendleBaseApy: number;
  vePendleMaxApy: number;
}

export interface VePendleApyChartResponse {
  results: VePendleApyChartDataPoint[];
  timeFrame: string;
  /** @format date-time */
  timestamp_gte: string;
  /** @format date-time */
  timestamp_lte: string;
}

export interface VoteData {
  txHash: string;
  /** @format date-time */
  timestamp: string;
  poolChainId: number;
  poolAddress: string;
  user: string;
  weight: number;
  vePendleVote: number;
}

export interface GetHistoricalVotesResponse {
  data: VoteData[];
}

export interface MarketMetaData {
  /** market id */
  id: string;
}

export interface TotalFeesWithTimestamp {
  /**
   * timestamp where total fee is being calculated
   * @format date-time
   */
  time: string;
  /** total fees at given timestamp */
  totalFees: number;
}

export interface MarketTotalFeesData {
  /** market metadata */
  market: MarketMetaData;
  /** total fee at each timestamp */
  values: TotalFeesWithTimestamp[];
}

export interface AllMarketTotalFeesResponse {
  /** all market total fees response */
  results: MarketTotalFeesData[];
}

export interface GetOngoingVotesResponse {
  votes: VoteResponse[];
  totalPools: number;
  totalVotes: number;
}

export interface GetVePendleCapResponse {
  fee: object;
  currentCap: object;
  expectedCap: object;
}

export interface MetadataQueryDto {
  keys: string[];
}

export interface MetadataResponse {
  results: object;
  total: number;
}

export interface MetadataValuesResponse {
  /** Values of given metadata keys in the same order with keys */
  values: (object | null)[];
}

export interface GetMetadataByTemplateResponse {
  keys: string[];
  /** Values of given metadata keys in the same order with keys */
  values: object[];
}

export interface MarketTokensResponse {
  /** tokens can be use for tokenMintSy */
  tokensMintSy: string[];
  /** tokens can be use for tokenRedeemSy */
  tokensRedeemSy: string[];
  /** input tokens of swap or zap function */
  tokensIn: string[];
  /** output tokens of swap or zap function */
  tokensOut: string[];
}

export interface SupportedAggregator {
  /**
   * Name of the aggregator, e.g., kyberswap, okx, odos, paraswap
   * @example "kyberswap"
   */
  name: string;
  /**
   * Computing unit required for the aggregator
   * @example 5
   */
  computingUnit: number;
}

export interface SupportedAggregatorsResponse {
  /** List of supported aggregators with their computing units */
  aggregators: SupportedAggregator[];
}

export interface GetSpotSwappingPriceResponse {
  /** underlying token address that will be used for swapping */
  underlyingToken: string;
  /** number of PT by swapping 1 underlying token. If the swap can not be done, this value will be null */
  underlyingTokenToPtRate: object | null;
  /** number of underlying token by swapping 1 PT. If the swap can not be done, this value will be null */
  ptToUnderlyingTokenRate: object | null;
  /** number of YT by swapping 1 underlying token. If the swap can not be done, this value will be null */
  underlyingTokenToYtRate: object | null;
  /** number of underlying token by swapping 1 YT. If the swap can not be done, this value will be null */
  ytToUnderlyingTokenRate: object | null;
  /** implied apy of the given market */
  impliedApy: number;
}

export interface TransactionDto {
  /** Transaction data */
  data: string;
  /** Transaction receiver */
  to: string;
  /** Transaction sender */
  from: string;
  /** Transaction value */
  value: string;
}

export interface TokenAmountResponse {
  token: string;
  amount: string;
}

export interface ImpliedApy {
  before: number;
  after: number;
}

export interface SwapData {
  amountOut: string;
  priceImpact: number;
  impliedApy?: ImpliedApy;
  effectiveApy?: number;
}

export interface SwapResponse {
  /** Method name */
  method: string;
  /** Contract call parameters name */
  contractCallParamsName: string[];
  /** Contract call parameters */
  contractCallParams: any[][];
  /** Transaction data */
  tx: TransactionDto;
  tokenApprovals?: TokenAmountResponse[];
  data: SwapData;
}

export interface AddLiquidityData {
  amountLpOut: string;
  amountYtOut: string;
  priceImpact: number;
  impliedApy?: ImpliedApy;
}

export interface AddLiquidityResponse {
  /** Method name */
  method: string;
  /** Contract call parameters name */
  contractCallParamsName: string[];
  /** Contract call parameters */
  contractCallParams: any[][];
  /** Transaction data */
  tx: TransactionDto;
  tokenApprovals?: TokenAmountResponse[];
  data: AddLiquidityData;
}

export interface RemoveLiquidityData {
  amountOut: string;
  priceImpact: number;
  impliedApy?: ImpliedApy;
}

export interface RemoveLiquidityResponse {
  /** Method name */
  method: string;
  /** Contract call parameters name */
  contractCallParamsName: string[];
  /** Contract call parameters */
  contractCallParams: any[][];
  /** Transaction data */
  tx: TransactionDto;
  tokenApprovals?: TokenAmountResponse[];
  data: RemoveLiquidityData;
}

export interface MintData {
  amountOut: string;
  priceImpact: number;
}

export interface MintResponse {
  /** Method name */
  method: string;
  /** Contract call parameters name */
  contractCallParamsName: string[];
  /** Contract call parameters */
  contractCallParams: any[][];
  /** Transaction data */
  tx: TransactionDto;
  tokenApprovals?: TokenAmountResponse[];
  data: MintData;
}

export interface RedeemData {
  amountOut: string;
  priceImpact: number;
}

export interface RedeemResponse {
  /** Method name */
  method: string;
  /** Contract call parameters name */
  contractCallParamsName: string[];
  /** Contract call parameters */
  contractCallParams: any[][];
  /** Transaction data */
  tx: TransactionDto;
  tokenApprovals?: TokenAmountResponse[];
  data: RedeemData;
}

export interface MintSyData {
  amountOut: string;
  priceImpact: number;
}

export interface MintSyResponse {
  /** Method name */
  method: string;
  /** Contract call parameters name */
  contractCallParamsName: string[];
  /** Contract call parameters */
  contractCallParams: any[][];
  /** Transaction data */
  tx: TransactionDto;
  tokenApprovals?: TokenAmountResponse[];
  data: MintSyData;
}

export interface RedeemSyData {
  amountOut: string;
  priceImpact: number;
}

export interface RedeemSyResponse {
  /** Method name */
  method: string;
  /** Contract call parameters name */
  contractCallParamsName: string[];
  /** Contract call parameters */
  contractCallParams: any[][];
  /** Transaction data */
  tx: TransactionDto;
  tokenApprovals?: TokenAmountResponse[];
  data: RedeemSyData;
}

export interface TransferLiquidityData {
  amountLpOut: string;
  amountYtOut: string;
  priceImpact: number;
}

export interface ContractParamInfo {
  /** Method name */
  method: string;
  /** Contract call parameters name */
  contractCallParamsName: string[];
  /** Contract call parameters */
  contractCallParams: any[][];
}

export interface ParamsBreakdown {
  selfCall1: ContractParamInfo;
  selfCall2?: ContractParamInfo;
  reflectCall: ContractParamInfo;
}

export interface TransferLiquidityResponse {
  /** Method name */
  method: string;
  /** Contract call parameters name */
  contractCallParamsName: string[];
  /** Contract call parameters */
  contractCallParams: any[][];
  /** Transaction data */
  tx: TransactionDto;
  tokenApprovals?: TokenAmountResponse[];
  data: TransferLiquidityData;
  paramsBreakdown: ParamsBreakdown;
}

export interface RollOverPtData {
  amountPtOut: string;
  priceImpact: number;
  effectiveApy?: number;
}

export interface RollOverPtResponse {
  /** Method name */
  method: string;
  /** Contract call parameters name */
  contractCallParamsName: string[];
  /** Contract call parameters */
  contractCallParams: any[][];
  /** Transaction data */
  tx: TransactionDto;
  tokenApprovals?: TokenAmountResponse[];
  data: RollOverPtData;
  paramsBreakdown: ParamsBreakdown;
}

export interface AddLiquidityDualData {
  amountOut: string;
  amountTokenUsed: string;
  amountPtUsed: string;
  priceImpact: number;
}

export interface AddLiquidityDualResponse {
  /** Method name */
  method: string;
  /** Contract call parameters name */
  contractCallParamsName: string[];
  /** Contract call parameters */
  contractCallParams: any[][];
  /** Transaction data */
  tx: TransactionDto;
  tokenApprovals?: TokenAmountResponse[];
  data: AddLiquidityDualData;
}

export interface RemoveLiquidityDualData {
  amountTokenOut: string;
  amountPtOut: string;
  priceImpact: number;
}

export interface RemoveLiquidityDualResponse {
  /** Method name */
  method: string;
  /** Contract call parameters name */
  contractCallParamsName: string[];
  /** Contract call parameters */
  contractCallParams: any[][];
  /** Transaction data */
  tx: TransactionDto;
  tokenApprovals?: TokenAmountResponse[];
  data: RemoveLiquidityDualData;
}

export interface SdkResponse {
  /** Method name */
  method: string;
  /** Contract call parameters name */
  contractCallParamsName: string[];
  /** Contract call parameters */
  contractCallParams: any[][];
  /** Transaction data */
  tx: TransactionDto;
  tokenApprovals?: TokenAmountResponse[];
}

export interface PendleSwapInput {
  /** Input token address */
  token: string;
  /** Amount of input tokens used for swapping */
  amount: string;
}

export interface PendleSwapDtoV2 {
  /** The address to receive the output of the action */
  receiver?: string;
  inputs: PendleSwapInput[];
  /** Output token address */
  tokenOut: string;
  /** Max slippage accepted. A value from 0 to 1 (0.01 is 1%) */
  slippage: number;
  /**
   * List of aggregator names to use for the swap. If not provided, all aggregators will be used.List of supported aggregator can be found at: [getSupportedAggregators](#/SDK/SdkController_getSupportedAggregators)
   * @example "kyberswap,okx"
   */
  aggregators?: string;
}

export interface PendleSwapData {
  amountOut: string;
  priceImpact: number;
}

export interface PendleSwapResponse {
  /** Method name */
  method: string;
  /** Contract call parameters name */
  contractCallParamsName: string[];
  /** Contract call parameters */
  contractCallParams: any[][];
  /** Transaction data */
  tx: TransactionDto;
  tokenApprovals?: TokenAmountResponse[];
  data: PendleSwapData;
}

export interface RedeemInterestsAndRewardsResponse {
  /** Method name */
  method: string;
  /** Contract call parameters name */
  contractCallParamsName: string[];
  /** Contract call parameters */
  contractCallParams: any[][];
  /** Transaction data */
  tx: TransactionDto;
  tokenApprovals?: TokenAmountResponse[];
}

export interface ConvertData {
  aggregatorType: string;
  priceImpact: number;
  impliedApy?: ImpliedApy;
  effectiveApy?: number;
  /** Parameter breakdown for transfer liquidity */
  paramsBreakdown?: ParamsBreakdown;
}

export interface ConvertResponse {
  /** Contract params info */
  contractParamInfo: ContractParamInfo;
  /** Transaction data */
  tx: TransactionDto;
  /** Output token amounts from the action */
  outputs: TokenAmountResponse[];
  data: ConvertData;
}

export interface MultiRouteConvertResponse {
  /** The action that was performed */
  action:
    | 'swap'
    | 'add-liquidity'
    | 'remove-liquidity'
    | 'exit-market'
    | 'transfer-liquidity'
    | 'roll-over-pt'
    | 'add-liquidity-dual'
    | 'remove-liquidity-dual'
    | 'mint-py'
    | 'redeem-py'
    | 'mint-sy'
    | 'redeem-sy'
    | 'pendle-swap'
    | 'convert-lp-to-pt';
  /** Input token amounts for the action */
  inputs: TokenAmountResponse[];
  requiredApprovals?: TokenAmountResponse[];
  routes: ConvertResponse[];
}

export interface SwapPtCrossChainData {
  /** Net token output amount */
  netTokenOut: string;
  /** Net PT input amount */
  netPtIn: string;
}

export interface SwapPtCrossChainResponse {
  /** Method name */
  method: string;
  /** Contract call parameters name */
  contractCallParamsName: string[];
  /** Contract call parameters */
  contractCallParams: any[][];
  /** Transaction data */
  tx: TransactionDto;
  tokenApprovals?: TokenAmountResponse[];
  data: SwapPtCrossChainData;
}

export interface SwapWithFixedPricePtAmmData {
  /** Net token output amount */
  netTokenOut: string;
}

export interface SwapWithFixedPricePtAmmResponse {
  /** Method name */
  method: string;
  /** Contract call parameters name */
  contractCallParamsName: string[];
  /** Contract call parameters */
  contractCallParams: any[][];
  /** Transaction data */
  tx: TransactionDto;
  tokenApprovals?: TokenAmountResponse[];
  data: SwapWithFixedPricePtAmmData;
}

export interface PtCrossChainMetadataResponse {
  /** Array of token addresses that the PT can be swapped to */
  pairedTokensOut: string[];
  /** The address of the AMM */
  ammAddress?: string;
}

export interface MarketBasicResponse {
  id: string;
  chainId: number;
  address: string;
  symbol: string;
  /** @format date-time */
  expiry: string;
  name: string;
}

export interface AssetAmountResponse {
  asset: AssetResponse;
  amount: number;
  price: ValuationResponse;
}

export interface TransactionResponse {
  id: string;
  chainId: number;
  txHash: string;
  blockNumber: number;
  /** @format date-time */
  timestamp: string;
  action: string;
  origin: string;
  market: MarketBasicResponse;
  inputs: AssetAmountResponse[];
  outputs: AssetAmountResponse[];
  user: string;
  valuation: ValuationResponse;
  implicitSwapFeeSy: number;
  explicitSwapFeeSy: number;
  impliedApy: number;
  assetPrices: object;
  gasUsed: number;
}

export interface TransactionsResponse {
  total: number;
  limit: number;
  skip: number;
  results: TransactionResponse[];
}

export interface NotionalV5 {
  /** Notional amount of PT traded */
  pt: number;
}

export interface TransactionV5Response {
  /** Unique identifier of the transaction */
  id: string;
  /** Market address where the transaction occurred */
  market: string;
  /**
   * Timestamp when the transaction occurred
   * @format date-time
   */
  timestamp: string;
  /** Chain ID where the transaction occurred */
  chainId: number;
  /** Transaction hash on the blockchain */
  txHash: string;
  /** Transaction value in USD */
  value: number;
  /** Transaction type (e.g., TRADES, ADD_LIQUIDITY, REMOVE_LIQUIDITY) */
  type: string;
  /** Transaction action (e.g., BUY_PT, SELL_PT, ADD_LIQUIDITY_DUAL) */
  action: string;
  /** Original transaction sender address */
  txOrigin?: string;
  /** Weighted average implied APY for this transaction */
  impliedApy: number;
  /** Notional amounts traded (only for TRADES type) */
  notional?: NotionalV5;
}

export interface TransactionsV5Response {
  /** Total number of transactions available */
  total: number;
  /** Resume token for pagination. Use this to continue a previous query. Use this token in the next request. Can be undefined if the query is at the end of the results. */
  resumeToken?: string;
  /** Maximum number of results returned */
  limit: number;
  /** Number of results skipped for pagination */
  skip: number;
  /** List of transactions */
  results: TransactionV5Response[];
}

export interface TransactionsV4Response {
  total: number;
  limit: number;
  skip: number;
  results: string[];
  /** Resume token for pagination. Use this to continue a previous query. Use this token in the next request. Can be undefined if the query is at the end of the results. */
  resumeToken?: string;
}

export interface TvlAndTradingVolumeResponseEntity {
  tvl: number;
  tradingVolume: number;
}

export interface GetDistinctUsersFromTokenEntity {
  /**
   * Array of unique wallet addresses (lowercase) that have interacted with the specified token. Addresses are deduplicated across both Sentio and internal data sources.
   * @example ["0x1234567890123456789012345678901234567890","0x0987654321098765432109876543210987654321","0xabcdefabcdefabcdefabcdefabcdefabcdefabcd"]
   */
  users: string[];
}

export interface EulerUserResponse {
  /** Euler user address */
  user: string;
  /** Euler sub account address */
  subAccount: string;
  /** Euler vault address */
  asset: string;
}

export interface MorphoUserResponse {
  /** Morpho user address */
  user: string;
  /** Morpho user address */
  marketId: string;
}

export interface SiloUserResponse {
  /** Silo user address */
  user: string;
  /** Silo user address */
  asset: string;
}

export interface MorphoConfigResponse {
  /** Morpho config id */
  id: string;
  /** Morpho config address */
  morphoAddress: string;
}

export interface WlpDistinctUsersResponse {
  /** WLP token address */
  wlpUsersTotal: number;
  /** WLP token address */
  eulerUsersTotal: number;
  /** WLP token address */
  morphoUsersTotal: number;
  /** WLP token address */
  siloUsersTotal: number;
  /** Array of distinct user addresses that have interacted with WLP */
  wlpUsers: string[];
  /** Array of Euler users */
  eulerUsers: EulerUserResponse[];
  /** Array of Morpho users */
  morphoUsers: MorphoUserResponse[];
  /** Array of Silo users */
  siloUsers: SiloUserResponse[];
  /** WLP token address */
  wlpAddress: string;
  /** Morpho config address */
  morphoConfigs: MorphoConfigResponse[];
}

export interface LiquidLockerPoolResponse {
  name: string;
  lpHolder: string;
  receiptToken: string;
  users: string[];
  errorMessage: string;
}

export interface LiquidLockerPoolsResponse {
  total: number;
  results: LiquidLockerPoolResponse[];
}

export interface WlpHolderMappingResponse {
  /** The address of the holder */
  holder: string;
  /** The address of the asset */
  asset: string;
  /** The address of the money market */
  moneyMarket: string;
}

export interface GetAllRelatedInfoFromLpAndWlpResponse {
  /** Distinct users for the LP token */
  distinctUsers: string[];
  /** Liquid locker pools info for LP token */
  liquidLockerPools: LiquidLockerPoolResponse[];
  /** WLP users and related info for WLP token, only available for wrapped market */
  wlpDistinctUsersResponse: WlpDistinctUsersResponse;
  /** WLP holder mappings for WLP token */
  wlpHolderMappings: WlpHolderMappingResponse[];
}

export interface MerkleRewardsResponse {
  accruedAmount: string;
  /** Only available for arbitrum-grant campaign */
  rewardBreakdowns: string[] | null;
  /** @format date-time */
  updatedAt: string;
}

export interface MerkleProofResponse {
  proof: string[];
  accruedAmount: string;
  /** @format date-time */
  updatedAt: string;
  /** Calldata to verify the proof */
  verifyCallData?: string;
  /** Merkle root hash of the merkle tree */
  merkleRoot: string;
}

export interface NotFoundResponse {
  message: string;
  statusCode: number;
}

export interface TokenProof {
  token: string;
  proof: string[];
  accruedAmount: string;
  /** Calldata to verify the proof */
  verifyCallData?: string;
}

export interface MultiTokenMerkleProofResponse {
  proof: TokenProof[];
  merkleRoot: string;
  /** @format date-time */
  updatedAt: string;
  chainId: number;
  distributorAddress: string;
  campaignId: string;
}

export interface MerkleProofV2Response {
  total: number;
  results: MultiTokenMerkleProofResponse[];
}

export interface SyTokenOutRouteResponse {
  toSyAddress: string;
  defaultTokenOut: string;
}

export interface SyTokenOutRouteListResponse {
  tokenOutRoutes: SyTokenOutRouteResponse[];
}

export interface GetLiquidityTransferableMarketsResponse {
  /** list of liquidity transferable markets */
  marketAddresses: string[];
}

export interface CrossChainPtData {
  /** spoke pt address */
  spokePt: string;
  /** hub pt address */
  hubPt: string;
  /** hub chain id */
  hubChainId: number;
}

export interface ChainIdSimplifiedData {
  chainId: number;
  /** list of SY addresses */
  sys: string[];
  /** list of market addresses */
  markets: string[];
  /** list of PT addresses */
  pts: string[];
  /** list of YT addresses */
  yts: string[];
  /** list of cross chain pt data */
  crossPts: CrossChainPtData[];
}

export interface GetSimplifiedDataResponse {
  data: ChainIdSimplifiedData[];
}

export interface GetSafePendleAddressesResponse {
  /** list of safe SY addresses */
  sys: string[];
  /** list of safe PT addresses */
  pts: string[];
  /** list of safe YT addresses */
  yts: string[];
}

export interface ChainIdsResponse {
  chainIds: number[];
}

export interface ClaimTokenAmount {
  /**
   * Token id
   * @example "1-0x123..."
   */
  token: string;
  /**
   * Amount of tokens
   * @example "1000000000000000000"
   */
  amount: string;
}

export interface Position {
  /**
   * Balance of the position
   * @example "1000000000000000000"
   */
  balance: string;
  /**
   * Active balance of the position (for LP only)
   * @example "1000000000000000000"
   */
  activeBalance?: string;
  /**
   * Valuation of the position in USD
   * @example 10
   */
  valuation: number;
  /** Array of claimable rewards */
  claimTokenAmounts?: ClaimTokenAmount[];
}

export interface CrossPtPosition {
  /**
   * Spoke PT
   * @example "0x123..."
   */
  spokePt: string;
  /**
   * Balance of the position
   * @example "1000000000000000000"
   */
  balance: string;
}

export interface MarketPosition {
  /**
   * Unique identifier of the market
   * @example "1-0xabc..."
   */
  marketId: string;
  /** Principal token (PT) position */
  pt: Position;
  /** Yield token (YT) position */
  yt: Position;
  /** Liquidity provider (LP) token position */
  lp: Position;
  /** Array of cross PT positions */
  crossPtPositions: CrossPtPosition[];
}

export interface SyPosition {
  /**
   * Unique identifier of the market
   * @example "1-0xabc"
   */
  syId: string;
  /**
   * Sy token (SY) balance in wei
   * @example "1000000000000000000"
   */
  balance: string;
  /** Array of claimable rewards */
  claimTokenAmounts?: ClaimTokenAmount[];
}

export interface UserPositionsResponse {
  /**
   * Chain ID
   * @example 1
   */
  chainId: number;
  /**
   * Total number of open positions
   * @example 100
   */
  totalOpen: number;
  /**
   * Total number of closed positions
   * @example 100
   */
  totalClosed: number;
  /**
   * Total number of SY positions
   * @example 100
   */
  totalSy: number;
  /** Array of user token positions */
  openPositions: MarketPosition[];
  /** Array of closed user token positions */
  closedPositions: MarketPosition[];
  /** Array of user SY positions */
  syPositions: SyPosition[];
  /**
   * Date time of the last update
   * @format date-time
   * @example "2021-01-01T00:00:00.000Z"
   */
  updatedAt: string;
  /**
   * Error message when there is something wrong
   * @example "Error message"
   */
  errorMessage?: string;
}

export interface UserPositionsCrossChainResponse {
  /** Array of user positions */
  positions: UserPositionsResponse[];
}

export interface MerkleUserCampaignResponse {
  user: string;
  token: string;
  merkleRoot: string;
  chainId: number;
  assetId: string;
  amount: string;
  /** @format date-time */
  toTimestamp: string;
  /** @format date-time */
  fromTimestamp: string;
}

export interface MerkleClaimableRewardsResponse {
  /** Array of unclaimed merkle campaigns */
  claimableRewards: MerkleUserCampaignResponse[];
}

export interface MerkleClaimedRewardsResponse {
  /** Array of claimed merkle campaigns */
  claimedRewards: MerkleUserCampaignResponse[];
}

export interface SpokePtData {
  /**
   * Spoke PT chain ID
   * @example 1
   */
  spokeChainId: number;
  /**
   * Spoke PT address
   * @example "0x1234567890123456789012345678901234567890"
   */
  spokeAddress: string;
}

export interface PtCrossChainData {
  /** Hub PT chain ID */
  hubPtChainId: number;
  /** Hub PT address */
  hubPtAddress: string;
  /** Spoke PTs */
  spokePts: SpokePtData[];
}

export interface GetAllCrossPtsResponse {
  /** Data */
  result: PtCrossChainData[];
}

export interface ValuationEntity {
  usd: number;
  asset: number;
  eth: number;
}

export interface SpendUnitData {
  /** Balance of user in wei */
  unit: number;
  /** Total spent to purchase this asset */
  spent_v2: ValuationEntity;
}

export interface PriceAssetData {
  pt: number;
  yt: number;
  lp: number;
}

export interface PnLTransactionEntity {
  chainId: number;
  market: string;
  user: string;
  /** @format date-time */
  timestamp: string;
  action:
    | 'addLiquidityDualTokenAndPt'
    | 'addLiquiditySinglePt'
    | 'addLiquiditySingleToken'
    | 'addLiquiditySingleTokenKeepYt'
    | 'removeLiquidityDualTokenAndPt'
    | 'removeLiquidityToPt'
    | 'removeLiquiditySingleToken'
    | 'mintPy'
    | 'redeemPy'
    | 'swapYtToPt'
    | 'swapPtToYt'
    | 'redeemYtRewards'
    | 'redeemYtYield'
    | 'redeemMarketRewards'
    | 'buyPt'
    | 'sellPt'
    | 'transferPtIn'
    | 'transferPtOut'
    | 'buyYt'
    | 'sellYt'
    | 'transferYtIn'
    | 'transferYtOut'
    | 'transferLpIn'
    | 'transferLpOut'
    | 'sellYtLimitOrder'
    | 'buyYtLimitOrder'
    | 'sellPtLimitOrder'
    | 'buyPtLimitOrder';
  ptData: SpendUnitData;
  ytData: SpendUnitData;
  lpData: SpendUnitData;
  priceInAsset: PriceAssetData;
  /** Profit or loss of the transaction */
  profit: ValuationEntity;
  /** Total value of the transaction in asset */
  txValueAsset: number;
  /** Market asset price in USD */
  assetUsd: number;
  /** Market asset price in ETH */
  assetEth: number;
  /** PT exchange rate at the time of the transaction */
  ptExchangeRate: number;
  /** Effective PT exchange rate of this transaction */
  effectivePtExchangeRate?: number;
  /** PT exchange rate of market after the transaction */
  ptExchangeRateAfter?: number;
  /** Transaction hash */
  txHash?: string;
}

export interface TransactionsResponseEntity {
  total: number;
  results: PnLTransactionEntity[];
}

export interface BlockEntity {
  /** Block number */
  blockNumber: number;
  /** Block timestamp in seconds */
  blockTimestamp: number;
}

export interface IntegrationAssetEntity {
  /** Asset address */
  id: string;
  /** Asset symbol */
  symbol: string;
  /** Asset name */
  name: string;
  /** Asset decimals */
  decimals: number;
}

export interface IntegrationAssetResponse {
  /** Asset data */
  asset: IntegrationAssetEntity;
}

export interface PairEntity {
  /** Pendle LPT address */
  id: string;
  /**
   * Dex key. Result is always pendle.
   * @example "pendle"
   */
  dexKey: string;
  /** PT address */
  asset0Id: string;
  /** SY address */
  asset1Id: string;
}

export interface IntegrationPairResponse {
  /** Pair data */
  pair: PairEntity;
}

export interface Reserves {
  /** Reserve of asset0 */
  asset0: string;
  /** Reserve of asset1 */
  asset1: string;
}

export interface SwapEvent {
  /** Block data */
  block: BlockEntity;
  /** Transaction hash */
  txnId: string;
  /** Transaction index */
  txnIndex: number;
  /** Event index */
  eventIndex: number;
  /** Transaction maker */
  maker: string;
  /** Pair ID */
  pairId: string;
  /** Reserves after the swap */
  reserves: Reserves;
  /**
   * Type of event
   * @example "swap"
   */
  eventType: 'swap' | 'join' | 'exit';
  /** Amount of token0 in */
  asset0In: string;
  /** Amount of token1 in */
  asset1In: string;
  /** Amount of token0 out */
  asset0Out: string;
  /** Amount of token1 out */
  asset1Out: string;
  /** Price of asset0 quoted in asset1 */
  priceNative: string;
}

export interface JoinExitEvent {
  /** Block data */
  block: BlockEntity;
  /** Transaction hash */
  txnId: string;
  /** Transaction index */
  txnIndex: number;
  /** Event index */
  eventIndex: number;
  /** Transaction maker */
  maker: string;
  /** Pair ID */
  pairId: string;
  /** Reserves after the swap */
  reserves: Reserves;
  /**
   * Type of event
   * @example "join"
   */
  eventType: 'swap' | 'join' | 'exit';
  /** Amount of token0 */
  amount0: string;
  /** Amount of token1 */
  amount1: string;
}

export interface IntegrationEventResponse {
  /** List of events */
  events: (SwapEvent | JoinExitEvent)[];
}

export interface MerklRewardResponse {
  /**
   * Chain ID
   * @example 1
   */
  sumAmount: string;
  /**
   * From epoch
   * @example 1732294694
   */
  fromEpoch: number;
  /**
   * To epoch
   * @example 1732294694
   */
  toEpoch: number;
  /**
   * Hash of the distribution file
   * @example "0x1234567890abcdef"
   */
  hash: string;
  /**
   * Reward token address being distributed
   * @example "0xE0688A2FE90d0f93F17f273235031062a210d691"
   */
  rewardToken: string;
  /**
   * User rewards mapping
   * @example {"0x9f76a95AA7535bb0893cf88A146396e00ed21A12":{"epoch-1":{"amount":"40000000000000000000","timestamp":"1732294694"}},"0xfdA462548Ce04282f4B6D6619823a7C64Fdc0185":{"epoch-2":{"amount":"100000000000000000000","timestamp":"1741370722"}}}
   */
  rewards: object;
}

export interface MerklDataResponse {
  /**
   * Total Value Locked as a string
   * @example "1000000000000000000000"
   */
  tvl: string;
  /**
   * Annual Percentage Rate in decimal format
   * @example "0.15"
   */
  apr: string;
  /**
   * Optional opportunity name
   * @example "Pendle Market Maker Incentive"
   */
  opportunityName?: string;
}

export interface TagDefinitionResponse {
  name: string;
  description: string;
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from 'axios';
import axios from 'axios';

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, 'data' | 'params' | 'url' | 'responseType'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, 'data' | 'cancelToken'> {
  securityWorker?: (
    securityData: SecurityDataType | null
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = 'application/json',
  JsonApi = 'application/vnd.api+json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || 'https://api-v2.pendle.finance/core',
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === 'object' && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === 'object') {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== 'string') {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { 'Content-Type': type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Pendle V2 API Docs
 * @version 1.0
 * @baseUrl https://api-v2.pendle.finance/core
 * @contact
 *
 *
 * ## Terms used in the documentation/API
 *
 * Below are some terms used in the documentation/API:
 *
 * - Pendle Assets/Tokens: PT, YT, LP, SY
 * - Non-Pendle Assets: other tokens that are not Pendle assets, such as USDC, USDT, DAI, etc.
 * - Asset ID/Token Id: Is the combination of chain id and token address, e.g. 1-0x5fe30ac5cb1abb0e44cdffb2916c254aeb368650
 * - Computing unit: Cost of an API call, this is use to rate limit the API calls. More on it at [our document](https://docs.pendle.finance/pendle-v2/Developers/Backend/ApiOverview#rate-limiting)
 * - APY/APR/ROI Format: All APY, APR, and ROI values are returned as decimals. For example, 0.5 means 50%, 0.05 means 5%, 1.2 means 120%
 * - Percentage Change Format: All percentage change values (e.g., 24h changes) are returned as decimals. For example, 0.05 means 5% change
 * - Logarithmic Values: Some fields like `lnImpliedRate` are natural logarithms. To get the actual rate, use e^(value)
 *
 * ## Recommended way to fetch data
 *
 * We have a lot of markets, if you call an API for each market, it will be very slow and you will likely get rate limited. Therefore, in some APIs we support fetch all data at once (example the get all markets data, get all assets data/prices), you could use that to fetch all data at once. They also support filter by asset id, type, so if you don't want to fetch, you can filter it down to the specific ones you want.
 *
 * For detailed documentation, visit:
 *
 * [https://docs.pendle.finance/pendle-v2/Developers/Backend/ApiOverview](https://docs.pendle.finance/pendle-v2/Developers/Backend/ApiOverview)
 *
 * ## Support
 *
 * - We have a telegram for developers to ask about the API at [https://t.me/peepo_the_engineer_bot](https://t.me/peepo_the_engineer_bot)
 * - We have an announcement channel for API updates at [https://t.me/pendledevelopers](https://t.me/pendledevelopers), follow it to get the latest updates on the API.
 *
 * ## FAQ
 *
 * - How to fetch prices for assets?
 *   * Use [Get asset prices by IDs](#tag/assets/get/v1/prices/assets)
 *
 * - What if i want real time prices?
 *   * Price in our systems are calculate every 15 seconds. However, if you want real time prices, use [Swapping price](#tag/sdk/get/v1/sdk/{chainId}/markets/{market}/swapping-prices), it return price for PT/YT when swapping with underlying token and vice versa, we don't have real time prices for other assets.
 *
 * - Can i use the SDK to get price, instead of using the `swapping-price` endpoint?
 *   * **Don't use the SDK to get price**, we don't recommend it. SDK endpoints are designed for you to get the calldata for **sending transaction**, not for getting the price. Also, SDK endpoints are very costly and will get rate limited easily if you use it to get price of many tokens.
 *
 * - How to get token names, expiries, etc?
 *   * Use [Get asset metadata by IDs](#tag/assets/get/v1/assets/all)
 *
 * - Do you have historical data, breakdown to minutes?
 *   * No we don't, all historical data is aggregated to hourly/daily/weekly data.
 */
export class Sdk<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  limitOrders = {
    /**
     * @description Deprecated, this is for pendle internal use only. Please use [this API](https://api-v2.pendle.finance/core/docs#/Limit%20Orders/LimitOrdersController_getAllLimitOrders) to fetch limit orders
     *
     * @tags Limit Orders
     * @name LimitOrdersControllerGetLimitOrders
     * @summary Get limit orders
     * @request GET:/v1/limit-orders
     * @deprecated
     */
    limitOrdersControllerGetLimitOrders: (
      query?: {
        /**
         * Sort by field: 1 for ascending, -1 for descending. Only allowed field is latestEventTimestamp
         * @example "latestEventTimestamp:-1"
         */
        order_by?: string;
        /**
         * Number of results to skip. The parameter is capped at 1000.
         * @default 0
         */
        skip?: number;
        /**
         * Maximum number of results to return. The parameter is capped at 200.
         * @default 100
         */
        limit?: number;
        /** ChainId */
        chainId?: number;
        /** Order's YT address */
        yt?: string;
        /** Order's maker address */
        maker?: string;
        isActive?: boolean;
      },
      params: RequestParams = {}
    ) =>
      this.request<LimitOrdersResponse, any>({
        path: `/v1/limit-orders`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description This endpoint is for analytics purpose, if you want to analyze the limit orders data, this endpoint return all the orders that have been made, including the ones that have been cancelled or fully filled. The results could be very large, so each time we returns at most 1000 orders, you can use the resumeToken to fetch the next page. To get limit order for filling, use the [Get limit orders to match by YT address​](#tag/limit-orders/get/v1/limit-orders/takers/limit-orders) endpoint!
     *
     * @tags Limit Orders
     * @name LimitOrdersControllerGetAllLimitOrders
     * @summary Get all limit orders for analytics
     * @request GET:/v2/limit-orders
     */
    limitOrdersControllerGetAllLimitOrders: (
      query?: {
        /** Chain id to filter by, leave blank to fetch all chains. */
        chainId?: number;
        /**
         * Maximum number of results to return. The parameter is capped at 1000.
         * @default 100
         */
        limit?: number;
        /** Maker address to filter orders by */
        maker?: string;
        /** Market address to filter orders by */
        yt?: string;
        /** @format date-time */
        timestamp_start?: string;
        /** @format date-time */
        timestamp_end?: string;
        /** Resume token for pagination */
        resumeToken?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<LimitOrdersV2Response, any>({
        path: `/v2/limit-orders`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description This have the same interface and usecase as the endpoint above, but it returns the archived orders When an order is not fillable anymore, we **might** archive it to save storage space, to fetch it, use this endpoint. So to fetch full limit orders in history, using this and the endpoint above. Not all orders are archived, it depends on some conditions.
     *
     * @tags Limit Orders
     * @name LimitOrdersControllerGetAllArchivedLimitOrders
     * @summary Get all archived limit orders for analytics
     * @request GET:/v2/limit-orders/archived
     */
    limitOrdersControllerGetAllArchivedLimitOrders: (
      query?: {
        /** Chain id to filter by, leave blank to fetch all chains. */
        chainId?: number;
        /**
         * Maximum number of results to return. The parameter is capped at 1000.
         * @default 100
         */
        limit?: number;
        /** Maker address to filter orders by */
        maker?: string;
        /** Market address to filter orders by */
        yt?: string;
        /** @format date-time */
        timestamp_start?: string;
        /** @format date-time */
        timestamp_end?: string;
        /** Resume token for pagination */
        resumeToken?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<LimitOrdersV2Response, any>({
        path: `/v2/limit-orders/archived`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Limit Orders
     * @name LimitOrdersControllerFetchMakers
     * @summary Fetch list makers
     * @request GET:/v1/limit-orders/makers-list
     * @deprecated
     */
    limitOrdersControllerFetchMakers: (
      query?: {
        chainId?: number;
        yt?: string;
        /** @default "sum_order_size" */
        sortBy?: 'sum_order_size' | 'num_orders';
        /** @default "desc" */
        sortOrder?: 'asc' | 'desc';
      },
      params: RequestParams = {}
    ) =>
      this.request<MakersResponse, any>({
        path: `/v1/limit-orders/makers-list`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description This endpoint let you fetch limit orders of a user in a market, it have more filter options than the analytics endpoint but have less item per page than the analytics endpoint. This limitation is more than enough for most use cases, given that a user can only have 50 orders per markets.
     *
     * @tags Limit Orders
     * @name LimitOrdersControllerGetMakerLimitOrder
     * @summary Get user limit orders in market
     * @request GET:/v1/limit-orders/makers/limit-orders
     */
    limitOrdersControllerGetMakerLimitOrder: (
      query: {
        /**
         * Number of results to skip. The parameter is capped at 1000.
         * @default 0
         */
        skip?: number;
        /**
         * Maximum number of results to return. The parameter is capped at 100.
         * @default 10
         */
        limit?: number;
        /** ChainId */
        chainId: number;
        /** Maker's address */
        maker: string;
        /** Order's YT address */
        yt?: string;
        /** LimitOrderType { 0 : TOKEN_FOR_PT, 1 : PT_FOR_TOKEN, 2 : TOKEN_FOR_YT, 3 : YT_FOR_TOKEN } */
        type?: 0 | 1 | 2 | 3;
        /** isActive=true to get all maker's active orders, isActive=false otherwise and do not set isActive if you want to fetch all maker's orders */
        isActive?: boolean;
      },
      params: RequestParams = {}
    ) =>
      this.request<LimitOrdersResponse, any>({
        path: `/v1/limit-orders/makers/limit-orders`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Limit Orders
     * @name LimitOrdersControllerCreateOrder
     * @summary Create limit order
     * @request POST:/v1/limit-orders/makers/limit-orders
     */
    limitOrdersControllerCreateOrder: (data: CreateLimitOrderDto, params: RequestParams = {}) =>
      this.request<LimitOrderResponse, HttpErrorResponse>({
        path: `/v1/limit-orders/makers/limit-orders`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Generate the limit order payload for signing with your private key/wallet
     *
     * @tags Limit Orders
     * @name LimitOrdersControllerGenerateLimitOrderData
     * @summary Generate limit order data for signing
     * @request POST:/v1/limit-orders/makers/generate-limit-order-data
     */
    limitOrdersControllerGenerateLimitOrderData: (data: GenerateLimitOrderDataDto, params: RequestParams = {}) =>
      this.request<GenerateLimitOrderDataResponse, HttpErrorResponse>({
        path: `/v1/limit-orders/makers/generate-limit-order-data`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Generate multiple limit order (scaled) payloads for signing with your private key/wallet
     *
     * @tags Limit Orders
     * @name LimitOrdersControllerGenerateScaledLimitOrderData
     * @summary Generate list of limit orders (scaled) for signing
     * @request POST:/v1/limit-orders/makers/generate-scaled-order-data
     */
    limitOrdersControllerGenerateScaledLimitOrderData: (data: GenerateScaledOrderDataDto, params: RequestParams = {}) =>
      this.request<GenerateScaledOrderResponse, any>({
        path: `/v1/limit-orders/makers/generate-scaled-order-data`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description This endpoint returns best matching limit orders for a given YT address.
     *
     * @tags Limit Orders
     * @name LimitOrdersControllerGetTakerLimitOrders
     * @summary Get limit orders to match by YT address
     * @request GET:/v1/limit-orders/takers/limit-orders
     */
    limitOrdersControllerGetTakerLimitOrders: (
      query: {
        /**
         * Number of results to skip. The parameter is capped at 1000.
         * @default 0
         */
        skip?: number;
        /**
         * Maximum number of results to return. The parameter is capped at 100.
         * @default 10
         */
        limit?: number;
        /** ChainId */
        chainId: number;
        /** Order's YT address */
        yt: string;
        /** LimitOrderType { 0 : TOKEN_FOR_PT, 1 : PT_FOR_TOKEN, 2 : TOKEN_FOR_YT, 3 : YT_FOR_TOKEN } */
        type: 0 | 1 | 2 | 3;
        sortBy?: 'Implied Rate';
        sortOrder?: 'asc' | 'desc';
      },
      params: RequestParams = {}
    ) =>
      this.request<LimitOrdersTakerResponse, HttpErrorResponse>({
        path: `/v1/limit-orders/takers/limit-orders`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Limit Orders
     * @name LimitOrdersControllerGetLimitOrderBookV2
     * @summary Get order book v2
     * @request GET:/v2/limit-orders/book/{chainId}
     */
    limitOrdersControllerGetLimitOrderBookV2: (
      chainId: number,
      query: {
        /**
         * Maximum number of results to return. The parameter is capped at 200.
         * @default 10
         */
        limit?: number;
        /** Min: 0, Max: 3, returned impliedApy will have precision upto 10^{-precisionDecimal}% */
        precisionDecimal: number;
        /** Market address */
        market: string;
        /** Include AMM orders in the order book */
        includeAmm?: boolean;
      },
      params: RequestParams = {}
    ) =>
      this.request<OrderBookV2Response, any>({
        path: `/v2/limit-orders/book/${chainId}`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),
  };
  assets = {
    /**
     * @description USD prices for assets, this endpoint support all tokens that are available in Pendle App, including non-Pendle tokens (like USDC, USDT, etc.). Price are updated every minute. To get real-time price of YT and PT, use the [swapping-price](#tag/sdk/get/v1/sdk/{chainId}/markets/{market}/swapping-prices) endpoint.
     *
     * @tags Assets
     * @name PricesCrossChainControllerGetAllAssetPricesByAddressesCrossChains
     * @summary Get asset prices by IDs
     * @request GET:/v1/prices/assets
     */
    pricesCrossChainControllerGetAllAssetPricesByAddressesCrossChains: (
      query?: {
        /**
         * Token ids to data for (comma-separated), leave blank to fetch all tokens. Up to 20 ids allowed.
         * @example "1-0x5fe30ac5cb1abb0e44cdffb2916c254aeb368650,1-0xc5cd692e9b4622ab8cdb57c83a0f99f874a169cd"
         */
        ids?: string;
        /**
         * Chain id to filter by, leave blank to fetch all chains.
         * @example 1
         */
        chainId?: number;
        /**
         * Number of results to skip.
         * @default 0
         */
        skip?: number;
        /** Maximum number of results to return. Leave blank to fetch all results. */
        limit?: number;
        /** Asset types to filter by (comma-separated). Valid values: `PENDLE_LP`, `SY`, `PT`, `YT`. Leave blank to fetch all assets types. */
        type?: PendleAssetType;
      },
      params: RequestParams = {}
    ) =>
      this.request<GetAssetPricesCrossChainResponse, any>({
        path: `/v1/prices/assets`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description Historical price data for PT / YT tokens / LP tokens. We do not support historical prices for **SY and non-Pendle tokens**. The data is OHLCV data, returned in CSV format with open, high, low, close prices, and volume. In the case of LP, volume data will be 0. To get the correct volume, use our [Get market time-series data by address](#tag/markets/get/v2/{chainId}/markets/{address}/historical-data) endpoint. Returns at most 1440 data points. The cost for the endpoint is based on how many data points are returned. The calculation is: `ceil(number of data points / 300)`. At 1440 data points (which is 2 months of data with an hourly interval, or 4 years with a daily interval), the cost will be 5 computing units.
     *
     * @tags Assets
     * @name PricesControllerOhlcvV4
     * @summary Get PT / YT / LP historical price by address
     * @request GET:/v4/{chainId}/prices/{address}/ohlcv
     */
    pricesControllerOhlcvV4: (
      chainId: number,
      address: string,
      query?: {
        /**
         * Time interval for OHLCV data aggregation. Valid values: `hour`, `day`, `week`.
         * @default "hour"
         */
        time_frame?: 'hour' | 'day' | 'week';
        /**
         * ISO Date string of the start time you want to query
         * @format date-time
         */
        timestamp_start?: string;
        /**
         * ISO Date string of the end time you want to query
         * @format date-time
         */
        timestamp_end?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<PriceOHLCVCSVResponse, any>({
        path: `/v4/${chainId}/prices/${address}/ohlcv`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description Returns trading volume time-series data for a specific market. Returns at most 1440 data points. The cost for the endpoint is based on how many data points are returned. The calculation is: `ceil(number of data points / 300)`. At 1440 data points (which is 2 months of data with an hourly interval, or 4 years with a daily interval), the cost will be 5 computing units.
     *
     * @tags Assets, Markets
     * @name PricesControllerNotionalVolumeByMarket
     * @summary Get market volume by address (time-series)
     * @request GET:/v1/{chainId}/prices/{address}/notional-volume-by-market
     */
    pricesControllerNotionalVolumeByMarket: (
      chainId: number,
      address: string,
      query?: {
        /**
         * Time interval for OHLCV data aggregation. Valid values: `hour`, `day`, `week`.
         * @default "hour"
         */
        time_frame?: 'hour' | 'day' | 'week';
        /**
         * ISO Date string of the start time you want to query
         * @format date-time
         */
        timestamp_start?: string;
        /**
         * ISO Date string of the end time you want to query
         * @format date-time
         */
        timestamp_end?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<NotionalVolumeResponse, any>({
        path: `/v1/${chainId}/prices/${address}/notional-volume-by-market`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description Returns list of PT, YT, LP, SY assets supported in Pendle App, including: name, symbol, address, decimals, expiry (if applicable), icon. Can filter by chain id, asset id, asset type. Price are not included in the response.
     *
     * @tags Assets
     * @name AssetsCrossChainControllerGetPendleAssetsMetadata
     * @summary Get supported PT, YT, LP, SY assets
     * @request GET:/v1/assets/all
     */
    assetsCrossChainControllerGetPendleAssetsMetadata: (
      query?: {
        /**
         * Token ids to data for (comma-separated), leave blank to fetch all tokens. Up to 20 ids allowed.
         * @example "1-0x5fe30ac5cb1abb0e44cdffb2916c254aeb368650,1-0xc5cd692e9b4622ab8cdb57c83a0f99f874a169cd"
         */
        ids?: string;
        /**
         * Chain id to filter by, leave blank to fetch all chains.
         * @example 1
         */
        chainId?: number;
        /**
         * Number of results to skip.
         * @default 0
         */
        skip?: number;
        /** Maximum number of results to return. Leave blank to fetch all results. */
        limit?: number;
        /** Asset types to filter by (comma-separated). Valid values: `PENDLE_LP`, `SY`, `PT`, `YT`. Leave blank to fetch all assets types. */
        type?: PendleAssetType;
      },
      params: RequestParams = {}
    ) =>
      this.request<GetAllAssetsCrossChainResponse, any>({
        path: `/v1/assets/all`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Assets
     * @name AssetsControllerGetAllAssets
     * @summary Get PT, YT, LP, SY assets metadata
     * @request GET:/v3/{chainId}/assets/all
     * @deprecated
     */
    assetsControllerGetAllAssets: (chainId: number, params: RequestParams = {}) =>
      this.request<GetAssetsResponse, any>({
        path: `/v3/${chainId}/assets/all`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description USD prices for specific assets. Updated every minute. For real-time prices, use the swapping-price endpoint.
     *
     * @tags Assets
     * @name AssetsControllerGetAllAssetPricesByAddresses
     * @summary Get asset prices
     * @request GET:/v1/{chainId}/assets/prices
     * @deprecated
     */
    assetsControllerGetAllAssetPricesByAddresses: (
      chainId: number,
      query?: {
        /**
         * Token addresses to fetch prices for (comma-separated), leave blank to fetch all prices. Up to 20 addresses allowed.
         * @example "0x5fe30ac5cb1abb0e44cdffb2916c254aeb368650,0xc5cd692e9b4622ab8cdb57c83a0f99f874a169cd"
         */
        addresses?: string;
        /**
         * Number of results to skip.
         * @default 0
         */
        skip?: number;
        /** Maximum number of results to return. Leave blank to fetch all results. */
        limit?: number;
        /** Asset types to filter by (comma-separated). Valid values: `PENDLE_LP`, `SY`, `PT`, `YT`. */
        type?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<GetAssetPricesResponse, any>({
        path: `/v1/${chainId}/assets/prices`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description Token list compatible with Uniswap interface, following the standard token list schema.
     *
     * @tags Assets
     * @name AssetsControllerGetAllPendleTokensInUniswapFormat
     * @summary Get Pendle tokens in Uniswap format
     * @request GET:/v1/{chainId}/assets/pendle-token/list
     */
    assetsControllerGetAllPendleTokensInUniswapFormat: (chainId: number, params: RequestParams = {}) =>
      this.request<UniswapTokenListResponse, any>({
        path: `/v1/${chainId}/assets/pendle-token/list`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description Token list compatible with Solana interface, following the standard token list schema. https://raw.githubusercontent.com/smartcontractkit/chainlink-ccip/27c1181bd9557c8f4898e2117e0618423edc24af/chains/solana/sol_link_metadata.json
     *
     * @tags Assets
     * @name AssetsControllerGetPendleTokenForSolana
     * @summary Get Pendle tokens in Solana format
     * @request GET:/v1/{chainId}/assets/pendle-token/solana/{address}
     */
    assetsControllerGetPendleTokenForSolana: (chainId: number, address: string, params: RequestParams = {}) =>
      this.request<SolanaTokenResponse, any>({
        path: `/v1/${chainId}/assets/pendle-token/solana/${address}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  };
  assetsLegacy = {
    /**
     * @description Current USD prices for all supported assets on this chain.
     *
     * @tags Assets (Legacy)
     * @name PricesControllerGetAllAssetPrices
     * @summary Get all asset prices
     * @request GET:/v1/{chainId}/prices/assets/all
     */
    pricesControllerGetAllAssetPrices: (chainId: number, params: RequestParams = {}) =>
      this.request<AssetPricesResponse, any>({
        path: `/v1/${chainId}/prices/assets/all`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description USD prices for a list of token addresses.
     *
     * @tags Assets (Legacy)
     * @name PricesControllerGetAllAssetPricesByAddresses
     * @summary Get prices for specific assets
     * @request GET:/v1/{chainId}/prices/assets/addresses
     */
    pricesControllerGetAllAssetPricesByAddresses: (
      chainId: number,
      query?: {
        /** Use comma separated values to search by multiple addresses. Upto 50 addresses allowed */
        addresses?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<AssetPricesResponse, any>({
        path: `/v1/${chainId}/prices/assets/addresses`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Assets (Legacy)
     * @name PricesControllerVolumeByMarket
     * @summary Get trading volume by market
     * @request GET:/v1/{chainId}/prices/{address}/volume-by-market
     */
    pricesControllerVolumeByMarket: (
      chainId: number,
      address: string,
      query: {
        /**
         * Time interval for OHLCV data aggregation. Valid values: `hour`, `day`, `week`.
         * @default "hour"
         */
        time_frame?: 'hour' | 'day' | 'week';
        /**
         * ISO Date string of the start time you want to query
         * @format date-time
         */
        timestamp_start?: string;
        /**
         * ISO Date string of the end time you want to query
         * @format date-time
         */
        timestamp_end?: string;
        /**
         * pt or yt
         * @default "pt"
         */
        type: 'pt' | 'yt';
      },
      params: RequestParams = {}
    ) =>
      this.request<PriceOHLCVCSVResponse, any>({
        path: `/v1/${chainId}/prices/${address}/volume-by-market`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description Deprecated on 05/03/2024. Use version 4 instead. Computing unit cost is max(3, result length / 100)
     *
     * @tags Assets (Legacy)
     * @name PricesControllerOhlcvV2
     * @summary Get OHLCV data (deprecated)
     * @request GET:/v2/{chainId}/prices/{address}/ohlcv
     * @deprecated
     */
    pricesControllerOhlcvV2: (
      chainId: number,
      address: string,
      query?: {
        /**
         * Time interval for OHLCV data aggregation. Valid values: `hour`, `day`, `week`.
         * @default "hour"
         */
        time_frame?: 'hour' | 'day' | 'week';
        /**
         * ISO Date string of the start time you want to query
         * @format date-time
         */
        timestamp_start?: string;
        /**
         * ISO Date string of the end time you want to query
         * @format date-time
         */
        timestamp_end?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<PriceOHLCVResponse, any>({
        path: `/v2/${chainId}/prices/${address}/ohlcv`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description Deprecated on 05/03/2024. Use version 4 instead. Computing unit cost is max(3, result length / 100)
     *
     * @tags Assets (Legacy)
     * @name PricesControllerOhlcvV3
     * @summary Get OHLCV data (deprecated)
     * @request GET:/v3/{chainId}/prices/{address}/ohlcv
     * @deprecated
     */
    pricesControllerOhlcvV3: (
      chainId: number,
      address: string,
      query?: {
        /**
         * Time interval for OHLCV data aggregation. Valid values: `hour`, `day`, `week`.
         * @default "hour"
         */
        time_frame?: 'hour' | 'day' | 'week';
        /**
         * ISO Date string of the start time you want to query
         * @format date-time
         */
        timestamp_start?: string;
        /**
         * ISO Date string of the end time you want to query
         * @format date-time
         */
        timestamp_end?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<PriceOHLCVResponse, any>({
        path: `/v3/${chainId}/prices/${address}/ohlcv`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Assets (Legacy)
     * @name AssetsControllerAssets
     * @summary Get assets with filters
     * @request GET:/v1/{chainId}/assets
     */
    assetsControllerAssets: (
      chainId: number,
      query?: {
        /**
         * Sort by field: 1 for ascending, -1 for descending
         * @example "name:1"
         */
        order_by?: string;
        /**
         * Number of results to skip. The parameter is capped at 1000.
         * @default 0
         */
        skip?: number;
        /**
         * Maximum number of results to return. The parameter is capped at 50.
         * @default 10
         */
        limit?: number;
        is_expired?: boolean;
        zappable?: boolean;
        /** Use comma separated values to search by multiple values. Possible values are NATIVE, GENERIC, LP, IB, PENDLE_LP, SY, PT and YT */
        type?: string;
        /** Use comma separated values to search by multiple addresses */
        address?: string;
        /** Search by address, name, symbol or protocol */
        q?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<AssetsResponse, any>({
        path: `/v1/${chainId}/assets`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Assets (Legacy)
     * @name AssetsControllerAllAssets
     * @summary Get all assets
     * @request GET:/v1/{chainId}/assets/all
     */
    assetsControllerAllAssets: (chainId: number, params: RequestParams = {}) =>
      this.request<AssetResponse[], any>({
        path: `/v1/${chainId}/assets/all`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Assets (Legacy)
     * @name AssetsControllerAllAssetsV2
     * @summary Get all assets in CSV
     * @request GET:/v2/{chainId}/assets/all
     */
    assetsControllerAllAssetsV2: (chainId: number, params: RequestParams = {}) =>
      this.request<AssetCSVResponse, any>({
        path: `/v2/${chainId}/assets/all`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Assets (Legacy)
     * @name AssetsControllerAsset
     * @summary Get asset by address
     * @request GET:/v1/{chainId}/assets/{address}
     */
    assetsControllerAsset: (chainId: number, address: string, params: RequestParams = {}) =>
      this.request<AssetResponse, any>({
        path: `/v1/${chainId}/assets/${address}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Assets (Legacy)
     * @name SysControllerWhitelistedSys
     * @summary Get all whitelisted SY tokens on this chain
     * @request GET:/v1/{chainId}/sys/whitelisted
     */
    sysControllerWhitelistedSys: (chainId: number, params: RequestParams = {}) =>
      this.request<WhitelistedSysResponse, any>({
        path: `/v1/${chainId}/sys/whitelisted`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Assets (Legacy)
     * @name SysControllerAssetSy
     * @summary Get sy by address
     * @request GET:/v1/{chainId}/sys/{address}
     */
    sysControllerAssetSy: (chainId: number, address: string, params: RequestParams = {}) =>
      this.request<SyResponse, any>({
        path: `/v1/${chainId}/sys/${address}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  };
  markets = {
    /**
     * @description Get whitelisted markets list with its metadata across all chains. The data returns contains: market name, expiry, yt/pt/sy addresses, liquidity, trading volume, underlying apy, swap fee APY, pendle APY, fee rate, yield range, total pt, total sy in market, total supply of LP token, lp wrapper address (if applicable), etc. You can use chainId, isActive or ids params to filter markets.
     *
     * @tags Markets
     * @name MarketsCrossChainControllerGetAllMarkets
     * @summary Get whitelisted markets list
     * @request GET:/v1/markets/all
     */
    marketsCrossChainControllerGetAllMarkets: (
      query?: {
        /** Filter to active or inactive markets */
        isActive?: boolean;
        /** Filter to markets on a specific blockchain network */
        chainId?: number;
        /**
         * Market ids to fetch metadata for (comma-separated), leave blank to fetch all markets. Up to 20 ids allowed.
         * @example "1-0x7b246b8dbc2a640bf2d8221890cee8327fc23917,1-0x44474d98d1484c26e8d296a43a721998731cf775"
         */
        ids?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<GetMarketsCrossChainResponse, any>({
        path: `/v1/markets/all`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description Get all markets that have points. This endpoint returns the points configs and market id, to fetch market metadata, use the endpoint above.
     *
     * @tags Markets
     * @name MarketsCrossChainControllerGetPointsMarkets
     * @summary Get points market
     * @request GET:/v1/markets/points-market
     */
    marketsCrossChainControllerGetPointsMarkets: (
      query?: {
        /**
         * Filter to active or inactive markets
         * @deprecated
         */
        isActive?: boolean;
        /** Filter to markets on a specific blockchain network */
        chainId?: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<GetPointsMarketsResponse, any>({
        path: `/v1/markets/points-market`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Markets
     * @name MarketsControllerGetActiveMarkets
     * @summary Get active markets
     * @request GET:/v1/{chainId}/markets/active
     * @deprecated
     */
    marketsControllerGetActiveMarkets: (chainId: number, params: RequestParams = {}) =>
      this.request<GetActiveMarketsResponse, any>({
        path: `/v1/${chainId}/markets/active`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Markets
     * @name MarketsControllerGetInactiveMarkets
     * @summary Get inactive markets
     * @request GET:/v1/{chainId}/markets/inactive
     * @deprecated
     */
    marketsControllerGetInactiveMarkets: (chainId: number, params: RequestParams = {}) =>
      this.request<GetInactiveMarketsResponse, any>({
        path: `/v1/${chainId}/markets/inactive`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description Returns the latest/historical market data for a given market address. If timestamp is given, it will return the historical market data at the given timestamp. Otherwise, it will return the latest market data. This endpoint have have: market liquidity, trading volume, underlying APY, implied apy, apy breakdown, voter apys, ...
     *
     * @tags Markets
     * @name MarketsControllerMarketDataV2
     * @summary Get latest/historical market data by address
     * @request GET:/v2/{chainId}/markets/{address}/data
     */
    marketsControllerMarketDataV2: (
      chainId: number,
      address: string,
      query?: {
        /** @format date-time */
        timestamp?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<MarketDataResponse, any>({
        path: `/v2/${chainId}/markets/${address}/data`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description Returns the time-series data for a given market. Useful to draw charts or do data analysis. This endpoint supports field selection via the `fields` query parameter. Table below shows the available fields and their descriptions. | Field | Description | |-------|-------------| | timestamp | Timestamp in ISO format| | baseApy | APY including yield, swap fee and Pendle rewards without boosting| | impliedApy | Implied APY of market| | lastEpochVotes | Last epoch votes| | lpPrice | LP price in USD| | lpRewardApy | APY from LP reward tokens| | maxApy | APY when maximum boost is applied| | pendleApy | APY from Pendle rewards| | ptPrice | PT price in USD| | swapFeeApy | Swap fee APY for LP holders, without boosting| | syPrice | SY price in USD| | totalPt | Total PT in the market| | totalSupply | Total supply of the LP token| | totalSy | Total SY in the market| | totalTvl | Market total TVL (including floating PT that are not in the AMM) in USD| | tradingVolume | 24h trading volume in USD| | tvl | Market liquidity (TVL in the pool) in USD| | underlyingApy | APY of the underlying asset| | underlyingInterestApy | Annual percentage yield from the underlying asset interest| | underlyingRewardApy | Annual percentage yield from the underlying asset rewards| | voterApr | APY for voters (vePENDLE holders) from voting on this pool| | ytFloatingApy | Floating APY for YT holders (underlyingApy - impliedApy)| | ytPrice | YT price in USD| Returns at most 1440 data points. The cost for the endpoint is based on how many data points are returned. The calculation is: `ceil(number of data points / 300)`. At 1440 data points (which is 2 months of data with an hourly interval, or 4 years with a daily interval), the cost will be 5 computing units.
     *
     * @tags Markets
     * @name MarketsControllerMarketHistoricalDataV2
     * @summary Get market time-series data by address
     * @request GET:/v2/{chainId}/markets/{address}/historical-data
     */
    marketsControllerMarketHistoricalDataV2: (
      chainId: number,
      address: string,
      query?: {
        /** @default "hour" */
        time_frame?: 'hour' | 'day' | 'week';
        /** @format date-time */
        timestamp_start?: string;
        /** @format date-time */
        timestamp_end?: string;
        /**
         * Comma-separated list of fields to include in the response. Use `all` to include all fields. Available fields could be found in the table above.
         *
         * Although you could use `all` to include all fields, it is not recommended because the bigger the payload is, the slower the response will be.
         * @default "underlyingApy,impliedApy,maxApy,baseApy,tvl"
         * @example "timestamp,maxApy,baseApy,underlyingApy,impliedApy,tvl,totalTvl,underlyingInterestApy,underlyingRewardApy,ytFloatingApy,swapFeeApy,voterApr,pendleApy,lpRewardApy,totalPt,totalSy,totalSupply,ptPrice,ytPrice,syPrice,lpPrice,lastEpochVotes,tradingVolume"
         */
        fields?: string;
        /**
         * Whether you want to fetch fee breakdown data. Default is false. If enable, the response will include 3 fields: explicitSwapFee, implicitSwapFee, limitOrderFee and computing unit cost will be doubled.
         *
         * Fee breakdown is only available for daily and weekly timeframes.
         */
        includeFeeBreakdown?: boolean;
      },
      params: RequestParams = {}
    ) =>
      this.request<MarketHistoricalDataResponse, any>({
        path: `/v2/${chainId}/markets/${address}/historical-data`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description Returns the time-series data for a given market address. Useful to draw charts.
     *
     * @tags Markets
     * @name MarketsControllerMarketApyHistoryV3
     * @summary Get market time-series data by address
     * @request GET:/v1/{chainId}/markets/{address}/historical-data
     * @deprecated
     */
    marketsControllerMarketApyHistoryV3: (
      chainId: number,
      address: string,
      query?: {
        /** @default "hour" */
        time_frame?: 'hour' | 'day' | 'week';
        /** @format date-time */
        timestamp_start?: string;
        /** @format date-time */
        timestamp_end?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<MarketHistoricalDataTableResponse, any>({
        path: `/v1/${chainId}/markets/${address}/historical-data`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),
  };
  marketsLegacy = {
    /**
     * No description
     *
     * @tags Markets (Legacy)
     * @name MarketsControllerMarketApyHistoryV2
     * @summary Get market historical apy data by address in CSV format
     * @request GET:/v2/{chainId}/markets/{address}/apy-history
     */
    marketsControllerMarketApyHistoryV2: (
      chainId: number,
      address: string,
      query?: {
        /** @default "hour" */
        time_frame?: 'hour' | 'day' | 'week';
        /** @format date-time */
        timestamp_start?: string;
        /** @format date-time */
        timestamp_end?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<MarketApyHistoriesCSVResponse, any>({
        path: `/v2/${chainId}/markets/${address}/apy-history`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Markets (Legacy)
     * @name MarketsControllerMarkets
     * @summary Get markets
     * @request GET:/v1/{chainId}/markets
     */
    marketsControllerMarkets: (
      chainId: number,
      query?: {
        /**
         * Sort by field: 1 for ascending, -1 for descending
         * @example "name:1"
         */
        order_by?: string;
        /**
         * Number of results to skip. The parameter is capped at 300.
         * @default 0
         */
        skip?: number;
        /**
         * Maximum number of results to return. The parameter is capped at 100.
         * @default 10
         */
        limit?: number;
        is_expired?: boolean;
        /** Filter markets by whitelist simple, pro or show all markets. Default select is set to pro. Possible values: all, pro and simple */
        select?: string;
        pt?: string;
        yt?: string;
        sy?: string;
        /** Search by address, name or symbol */
        q?: string;
        is_active?: boolean;
        /** category id */
        categoryId?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<MarketsResponse, any>({
        path: `/v1/${chainId}/markets`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Markets (Legacy)
     * @name MarketsControllerGetFeaturedMarkets
     * @summary Get featured markets
     * @request GET:/v1/{chainId}/markets/featured
     */
    marketsControllerGetFeaturedMarkets: (
      chainId: number,
      query?: {
        /**
         * Sort by field: 1 for ascending, -1 for descending
         * @example "name:1"
         */
        order_by?: string;
        /**
         * Number of results to skip. The parameter is capped at 300.
         * @default 0
         */
        skip?: number;
        /**
         * Maximum number of results to return. The parameter is capped at 100.
         * @default 10
         */
        limit?: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<FeaturedMarketsResponseEntity, any>({
        path: `/v1/${chainId}/markets/featured`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Markets (Legacy)
     * @name MarketsControllerMarket
     * @summary Get market by address
     * @request GET:/v1/{chainId}/markets/{address}
     */
    marketsControllerMarket: (chainId: number, address: string, params: RequestParams = {}) =>
      this.request<MarketResponse, any>({
        path: `/v1/${chainId}/markets/${address}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Markets (Legacy)
     * @name MarketsControllerMarketHistoryV2
     * @summary Get market historical data by address
     * @request GET:/v2/{chainId}/markets/{address}/history
     */
    marketsControllerMarketHistoryV2: (
      chainId: number,
      address: string,
      query?: {
        /** @default "hour" */
        time_frame?: 'hour' | 'day' | 'week';
        /** @format date-time */
        timestamp_start?: string;
        /** @format date-time */
        timestamp_end?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<MarketHistoriesResponse, any>({
        path: `/v2/${chainId}/markets/${address}/history`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Markets (Legacy)
     * @name MarketsControllerMarketApyHistory
     * @summary Get market historical apy data by address
     * @request GET:/v1/{chainId}/markets/{address}/apy-history
     */
    marketsControllerMarketApyHistory: (
      chainId: number,
      address: string,
      query?: {
        /** @default "hour" */
        time_frame?: 'hour' | 'day' | 'week';
        /** @format date-time */
        timestamp_start?: string;
        /** @format date-time */
        timestamp_end?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<MarketApyHistoriesResponse, any>({
        path: `/v1/${chainId}/markets/${address}/apy-history`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Markets (Legacy)
     * @name MarketsControllerMarketStateHistory
     * @summary Get market stat history data by address in CSV format
     * @request GET:/v1/{chainId}/markets/{address}/stat-history
     */
    marketsControllerMarketStateHistory: (
      chainId: number,
      address: string,
      query?: {
        /** @default "hour" */
        time_frame?: 'hour' | 'day' | 'week';
        /** @format date-time */
        timestamp_start?: string;
        /** @format date-time */
        timestamp_end?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<GetMarketStatHistoryCSVResponse, any>({
        path: `/v1/${chainId}/markets/${address}/stat-history`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Markets (Legacy)
     * @name MarketsControllerMarketApyHistory1D
     * @summary Get market 1D MA historical apy data by address in CSV format
     * @request GET:/v1/{chainId}/markets/{address}/apy-history-1ma
     */
    marketsControllerMarketApyHistory1D: (
      chainId: number,
      address: string,
      query?: {
        /** @default "hour" */
        time_frame?: 'hour' | 'day' | 'week';
        /** @format date-time */
        timestamp_start?: string;
        /** @format date-time */
        timestamp_end?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<MarketApyHistoriesCSVResponse, any>({
        path: `/v1/${chainId}/markets/${address}/apy-history-1ma`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description Return implied APY chart of a market. Data is sampled every one minutes. The endpoint only support last 2 days of data
     *
     * @tags Markets (Legacy)
     * @name MarketsControllerMarketImpliedApyChart
     * @summary Get market implied apy chart
     * @request GET:/v1/{chainId}/markets/{address}/implied-apy-chart
     */
    marketsControllerMarketImpliedApyChart: (
      chainId: number,
      address: string,
      query?: {
        /**
         * Time start should be within the last 2 days of current time. Default to 2 days ago
         * @format date-time
         */
        timestamp_start?: string;
        /**
         * Time end should be within the last 2 days of current time. Default to now
         * @format date-time
         */
        timestamp_end?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<MarketImpliedApyResponseEntity, any>({
        path: `/v1/${chainId}/markets/${address}/implied-apy-chart`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Markets (Legacy)
     * @name MarketsControllerMarketAssets
     * @summary Get market tokens by address
     * @request GET:/v1/{chainId}/markets/{address}/assets
     */
    marketsControllerMarketAssets: (chainId: number, address: string, params: RequestParams = {}) =>
      this.request<MarketAssetsResponse, any>({
        path: `/v1/${chainId}/markets/${address}/assets`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  };
  marketCategories = {
    /**
     * No description
     *
     * @tags Market Categories
     * @name MarketCategoriesControllerFindAllMarketCategories
     * @summary Get all market categories
     * @request GET:/v1/market-categories/all
     * @deprecated
     */
    marketCategoriesControllerFindAllMarketCategories: (params: RequestParams = {}) =>
      this.request<GetAllMarketCategoriesResponse, any>({
        path: `/v1/market-categories/all`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  };
  metadataLegacy = {
    /**
     * No description
     *
     * @tags Metadata (Legacy)
     * @name UtilizedProtocolsControllerFindAllUtilizedProtocols
     * @summary Get all utilized protocols
     * @request GET:/v1/utilized-protocols/all
     */
    utilizedProtocolsControllerFindAllUtilizedProtocols: (params: RequestParams = {}) =>
      this.request<GetAllUtilizedProtocolsResponse, any>({
        path: `/v1/utilized-protocols/all`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Metadata (Legacy)
     * @name UtilizedProtocolsControllerGetUtilizedProtocolsOfMarket
     * @summary Get market protocols
     * @request GET:/v1/{chainId}/markets/{address}/utilized-protocols
     */
    utilizedProtocolsControllerGetUtilizedProtocolsOfMarket: (
      chainId: number,
      address: string,
      params: RequestParams = {}
    ) =>
      this.request<UtilizedProtocolResponse[], any>({
        path: `/v1/${chainId}/markets/${address}/utilized-protocols`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Metadata (Legacy)
     * @name MetadataControllerGetValuesByKeys
     * @summary Get metadata by keys
     * @request POST:/v1/metadata
     */
    metadataControllerGetValuesByKeys: (data: MetadataQueryDto, params: RequestParams = {}) =>
      this.request<MetadataResponse, any>({
        path: `/v1/metadata`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Metadata (Legacy)
     * @name MetadataControllerGetValuesByKeysV2ByPost
     * @summary Get metadata by keys (v2)
     * @request POST:/v2/metadata
     */
    metadataControllerGetValuesByKeysV2ByPost: (data: MetadataQueryDto, params: RequestParams = {}) =>
      this.request<MetadataResponse, any>({
        path: `/v2/metadata`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Metadata (Legacy)
     * @name MetadataControllerGetValuesByKeysV2ByGet
     * @summary Get metadata via GET
     * @request GET:/v2/metadata
     */
    metadataControllerGetValuesByKeysV2ByGet: (
      query: {
        keys: string[];
      },
      params: RequestParams = {}
    ) =>
      this.request<MetadataValuesResponse, any>({
        path: `/v2/metadata`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Metadata (Legacy)
     * @name MetadataControllerGetMetadataValuesByTemplate
     * @summary Get metadata by template
     * @request GET:/v1/metadata/template/{template}
     */
    metadataControllerGetMetadataValuesByTemplate: (template: string, params: RequestParams = {}) =>
      this.request<GetMetadataByTemplateResponse, any>({
        path: `/v1/metadata/template/${template}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  };
  vePendle = {
    /**
     * No description
     *
     * @tags Ve Pendle
     * @name VePendleControllerVePendleData
     * @summary Get vePendle statistics
     * @request GET:/v1/ve-pendle/data
     * @deprecated
     */
    vePendleControllerVePendleData: (params: RequestParams = {}) =>
      this.request<VePendleDataResponse, any>({
        path: `/v1/ve-pendle/data`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description The data returned contains: - monthly revenue - pendle token supply - pool vote, swap fee, apr of this epoch and last epoch - pool cap for this epoch and expected cap for next epoch
     *
     * @tags Ve Pendle
     * @name VePendleControllerVePendleExtendedData
     * @summary Get vePendle statistics
     * @request GET:/v2/ve-pendle/data
     */
    vePendleControllerVePendleExtendedData: (params: RequestParams = {}) =>
      this.request<VePendleExtendedDataResponse, any>({
        path: `/v2/ve-pendle/data`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Ve Pendle
     * @name VePendleControllerVoteSnapshot
     * @summary Get vote snapshot
     * @request GET:/v1/ve-pendle/vote-snapshot
     * @deprecated
     */
    vePendleControllerVoteSnapshot: (
      query?: {
        /** @format date-time */
        epoch?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<VoteSnapshotResponse, any>({
        path: `/v1/ve-pendle/vote-snapshot`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Ve Pendle
     * @name VePendleControllerGetPoolVoterAprAndSwapFee
     * @summary Get pool voter APR and fees
     * @request GET:/v1/ve-pendle/pool-voter-apr-swap-fee
     * @deprecated
     */
    vePendleControllerGetPoolVoterAprAndSwapFee: (
      query?: {
        /** @example "voterApr:-1" */
        order_by?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<PoolVoterAprsSwapFeesResponse, any>({
        path: `/v1/ve-pendle/pool-voter-apr-swap-fee`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Ve Pendle
     * @name VePendleControllerVePendleApyChart
     * @summary Get vePendle APY chart
     * @request GET:/v1/ve-pendle/ve-pendle-apy-chart
     */
    vePendleControllerVePendleApyChart: (
      query?: {
        /** @default "hour" */
        time_frame?: 'hour' | 'day' | 'week';
        /** @format date-time */
        timestamp_gte?: string;
        /** @format date-time */
        timestamp_lte?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<VePendleApyChartResponse, any>({
        path: `/v1/ve-pendle/ve-pendle-apy-chart`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description Weekly market fees across all markets, grouped by epoch (starting Thursdays).
     *
     * @tags Ve Pendle
     * @name VePendleControllerAllMarketTotalFees
     * @summary Get market fees chart
     * @request GET:/v1/ve-pendle/market-fees-chart
     */
    vePendleControllerAllMarketTotalFees: (
      query?: {
        /**
         * Should be rounded up to time frame (in UTC)
         * @format date-time
         */
        timestamp_start?: string;
        /**
         * Should be rounded up to time frame (in UTC)
         * @format date-time
         */
        timestamp_end?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<AllMarketTotalFeesResponse, any>({
        path: `/v1/ve-pendle/market-fees-chart`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Ve Pendle
     * @name VePendleControllerOngoingVotes
     * @summary Get ongoing votes
     * @request GET:/v1/ve-pendle/ongoing-votes
     * @deprecated
     */
    vePendleControllerOngoingVotes: (params: RequestParams = {}) =>
      this.request<GetOngoingVotesResponse, any>({
        path: `/v1/ve-pendle/ongoing-votes`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Ve Pendle
     * @name VePendleControllerGetVePendleCap
     * @summary Get vePendle cap
     * @request GET:/v1/ve-pendle/ve-pendle-cap
     * @deprecated
     */
    vePendleControllerGetVePendleCap: (params: RequestParams = {}) =>
      this.request<GetVePendleCapResponse, any>({
        path: `/v1/ve-pendle/ve-pendle-cap`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Ve Pendle
     * @name VePendleControllerGetMonthlyRevenue
     * @summary Get monthly revenue
     * @request GET:/v1/ve-pendle/monthly-revenue
     * @deprecated
     */
    vePendleControllerGetMonthlyRevenue: (params: RequestParams = {}) =>
      this.request<GetMonthlyRevenueResponse, any>({
        path: `/v1/ve-pendle/monthly-revenue`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  };
  vePendleLegacy = {
    /**
     * No description
     *
     * @tags Ve Pendle (Legacy)
     * @name VePendleControllerPoolVoterApy
     * @summary Get pool voter APY
     * @request GET:/v1/ve-pendle/pool-voter-apy
     */
    vePendleControllerPoolVoterApy: (
      query?: {
        /** @example "voterApy:-1" */
        order_by?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<PoolVoterApysResponse, any>({
        path: `/v1/ve-pendle/pool-voter-apy`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Ve Pendle (Legacy)
     * @name VePendleControllerPoolMetadata
     * @summary Get pool metadata
     * @request GET:/v1/ve-pendle/pool-metadata
     * @deprecated
     */
    vePendleControllerPoolMetadata: (params: RequestParams = {}) =>
      this.request<PoolResponse[], any>({
        path: `/v1/ve-pendle/pool-metadata`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Ve Pendle (Legacy)
     * @name VePendleControllerVoterApyChart
     * @summary Get voter APY chart data
     * @request GET:/v1/ve-pendle/voter-apy-chart
     */
    vePendleControllerVoterApyChart: (
      query?: {
        /** @default "hour" */
        time_frame?: 'hour' | 'day' | 'week';
        /** @format date-time */
        timestamp_gte?: string;
        /** @format date-time */
        timestamp_lte?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<VoterApyChartResponse, any>({
        path: `/v1/ve-pendle/voter-apy-chart`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Ve Pendle (Legacy)
     * @name VePendleControllerPendleTokenSupply
     * @summary Get PENDLE token supply
     * @request GET:/v1/ve-pendle/pendle-token-supply
     * @deprecated
     */
    vePendleControllerPendleTokenSupply: (params: RequestParams = {}) =>
      this.request<PendleTokenSupplyResponse, any>({
        path: `/v1/ve-pendle/pendle-token-supply`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Ve Pendle (Legacy)
     * @name VePendleControllerGetHistoricalVotes
     * @summary Get user historical votes
     * @request GET:/v1/ve-pendle/{address}/historical-votes
     */
    vePendleControllerGetHistoricalVotes: (
      address: string,
      query?: {
        /** @format date-time */
        timestamp?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<GetHistoricalVotesResponse, any>({
        path: `/v1/ve-pendle/${address}/historical-votes`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),
  };
  pendleLegacy = {
    /**
     * No description
     *
     * @tags Pendle (Legacy)
     * @name PendleControllerPendleSupply
     * @summary Get PENDLE total supply
     * @request GET:/v1/pendle/supply
     */
    pendleControllerPendleSupply: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/v1/pendle/supply`,
        method: 'GET',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Pendle (Legacy)
     * @name PendleControllerPendleCirculatingSupply
     * @summary Get PENDLE circulating supply
     * @request GET:/v1/pendle/circulating-supply
     */
    pendleControllerPendleCirculatingSupply: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/v1/pendle/circulating-supply`,
        method: 'GET',
        ...params,
      }),
  };
  sdk = {
    /**
     * @description Return tokens to mint or redeem SY and tokens to swap/zap in a market
     *
     * @tags SDK
     * @name SdkControllerGetMarketTokens
     * @summary Get supported tokens for market
     * @request GET:/v1/sdk/{chainId}/markets/{market}/tokens
     */
    sdkControllerGetMarketTokens: (chainId: number, market: string, params: RequestParams = {}) =>
      this.request<MarketTokensResponse, any>({
        path: `/v1/sdk/${chainId}/markets/${market}/tokens`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description Return supported aggregators for a chain, and the computing unit cost for each aggregator
     *
     * @tags SDK
     * @name SdkControllerGetSupportedAggregators
     * @summary Get supported aggregators for a chain
     * @request GET:/v1/sdk/{chainId}/supported-aggregators
     */
    sdkControllerGetSupportedAggregators: (chainId: number, params: RequestParams = {}) =>
      this.request<SupportedAggregatorsResponse, any>({
        path: `/v1/sdk/${chainId}/supported-aggregators`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description Return price by swapping  1 unit underlying token to PT/ YT, and 1 unit of PT/YT to the underlying token. One unit is defined as 10**decimal. The result is updated every block. Implied APY of the market is also included.
     *
     * @tags SDK
     * @name SdkControllerGetMarketSpotSwappingPrice
     * @summary Get real-time PT/YT swap price of a market
     * @request GET:/v1/sdk/{chainId}/markets/{market}/swapping-prices
     */
    sdkControllerGetMarketSpotSwappingPrice: (chainId: number, market: string, params: RequestParams = {}) =>
      this.request<GetSpotSwappingPriceResponse, any>({
        path: `/v1/sdk/${chainId}/markets/${market}/swapping-prices`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description Swap between tokens and PT/YT. Only callable until the market's expiry.Swapping between PT and YT is not supported.
     *
     * @tags SDK
     * @name SdkControllerSwapV2
     * @summary Swap between tokens and PT/YT
     * @request GET:/v2/sdk/{chainId}/markets/{market}/swap
     */
    sdkControllerSwapV2: (
      chainId: number,
      market: string,
      query: {
        /** Recipient address for transaction output */
        receiver?: string;
        /** Maximum slippage tolerance (0-1, where 0.01 equals 1%) */
        slippage: number;
        /**
         * Enable swap aggregator to swap between tokens that cannot be natively converted from/to the underlying asset
         * @default false
         */
        enableAggregator?: boolean;
        /**
         * List of aggregator names to use for the swap. If not provided, all aggregators will be used.List of supported aggregator can be found at: [getSupportedAggregators](#tag/sdk/get/v1/sdk/{chainId}/supported-aggregators)
         * @example "kyberswap,okx"
         */
        aggregators?: string;
        /** Output token address (can be token, SY, PT, or YT) */
        tokenIn: string;
        /** Output token address (can be token, SY, PT, or YT) */
        tokenOut: string;
        /** Amount of input tokens to swap */
        amountIn: string;
        /** Available fields: `impliedApy`, `effectiveApy`. Comma separated list of fields to return. For example: `field1,field2`. More fields will consume more computing units. */
        additionalData?: string;
        /** Aggregators needScale value, only set to true when amounts are updated onchain. When enabled, please make sure to buffer the amountIn by about 2% */
        needScale?: boolean;
      },
      params: RequestParams = {}
    ) =>
      this.request<SwapResponse, any>({
        path: `/v2/sdk/${chainId}/markets/${market}/swap`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description Single-sided liquidity provision, using tokens or PT, and receive LP. Zero-price impact provision is supported where no price impact will incur, and users will receive LP and YT (less LP compared to normal mode). Only callable until the market's expiry.
     *
     * @tags SDK
     * @name SdkControllerAddLiquidityV2
     * @summary Single-sided liquidity provision, using tokens or PT
     * @request GET:/v2/sdk/{chainId}/markets/{market}/add-liquidity
     */
    sdkControllerAddLiquidityV2: (
      chainId: number,
      market: string,
      query: {
        /** Recipient address for transaction output */
        receiver?: string;
        /** Maximum slippage tolerance (0-1, where 0.01 equals 1%) */
        slippage: number;
        /**
         * Enable swap aggregator to swap between tokens that cannot be natively converted from/to the underlying asset
         * @default false
         */
        enableAggregator?: boolean;
        /**
         * List of aggregator names to use for the swap. If not provided, all aggregators will be used.List of supported aggregator can be found at: [getSupportedAggregators](#tag/sdk/get/v1/sdk/{chainId}/supported-aggregators)
         * @example "kyberswap,okx"
         */
        aggregators?: string;
        /** Input token address (can be token, SY, or PT) */
        tokenIn: string;
        /** Amount of input tokens to add liquidity */
        amountIn: string;
        /**
         * Enable zero price impact mode. When enabled, users receive LP and YT tokens with no price impact (less LP compared to normal mode).
         * @default false
         */
        zpi?: boolean;
        /** Available fields: `impliedApy`. Comma separated list of fields to return. For example: `field1,field2`. More fields will consume more computing units. */
        additionalData?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<AddLiquidityResponse, any>({
        path: `/v2/sdk/${chainId}/markets/${market}/add-liquidity`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description Single-sided liquidity removal, get back either tokens or PT, callable regardless of the market's expiry.
     *
     * @tags SDK
     * @name SdkControllerRemoveLiquidityV2
     * @summary Single-sided liquidity removal, get back either tokens or PT
     * @request GET:/v2/sdk/{chainId}/markets/{market}/remove-liquidity
     */
    sdkControllerRemoveLiquidityV2: (
      chainId: number,
      market: string,
      query: {
        /** Recipient address for transaction output */
        receiver?: string;
        /** Maximum slippage tolerance (0-1, where 0.01 equals 1%) */
        slippage: number;
        /**
         * Enable swap aggregator to swap between tokens that cannot be natively converted from/to the underlying asset
         * @default false
         */
        enableAggregator?: boolean;
        /**
         * List of aggregator names to use for the swap. If not provided, all aggregators will be used.List of supported aggregator can be found at: [getSupportedAggregators](#tag/sdk/get/v1/sdk/{chainId}/supported-aggregators)
         * @example "kyberswap,okx"
         */
        aggregators?: string;
        /** Amount of LP tokens to remove liquidity */
        amountIn: string;
        /** Output token address (can be token or SY) */
        tokenOut: string;
        /** Available fields: `impliedApy`. Comma separated list of fields to return. For example: `field1,field2`. More fields will consume more computing units. */
        additionalData?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<RemoveLiquidityResponse, any>({
        path: `/v2/sdk/${chainId}/markets/${market}/remove-liquidity`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description Mint PT & YT, using tokens. Only callable until YT's expiry.
     *
     * @tags SDK
     * @name SdkControllerMintV2
     * @summary Mint PT & YT, using tokens
     * @request GET:/v2/sdk/{chainId}/mint
     */
    sdkControllerMintV2: (
      chainId: number,
      query: {
        /** Recipient address for transaction output */
        receiver?: string;
        /** Maximum slippage tolerance (0-1, where 0.01 equals 1%) */
        slippage: number;
        /**
         * Enable swap aggregator to swap between tokens that cannot be natively converted from/to the underlying asset
         * @default false
         */
        enableAggregator?: boolean;
        /**
         * List of aggregator names to use for the swap. If not provided, all aggregators will be used.List of supported aggregator can be found at: [getSupportedAggregators](#tag/sdk/get/v1/sdk/{chainId}/supported-aggregators)
         * @example "kyberswap,okx"
         */
        aggregators?: string;
        /** YT address of the market to mint PT and YT for */
        yt: string;
        /** Input token address (can be token or SY) */
        tokenIn: string;
        /** Amount of input tokens used for minting */
        amountIn: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<MintResponse, any>({
        path: `/v2/sdk/${chainId}/mint`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description Redeem PT & YT to tokens. If called before YT's expiry, both PT & YT of equal amounts are needed and will be burned.Else, only PT is needed and will be burned.
     *
     * @tags SDK
     * @name SdkControllerRedeemV2
     * @summary Redeem PT & YT to tokens
     * @request GET:/v2/sdk/{chainId}/redeem
     */
    sdkControllerRedeemV2: (
      chainId: number,
      query: {
        /** Recipient address for transaction output */
        receiver?: string;
        /** Maximum slippage tolerance (0-1, where 0.01 equals 1%) */
        slippage: number;
        /**
         * Enable swap aggregator to swap between tokens that cannot be natively converted from/to the underlying asset
         * @default false
         */
        enableAggregator?: boolean;
        /**
         * List of aggregator names to use for the swap. If not provided, all aggregators will be used.List of supported aggregator can be found at: [getSupportedAggregators](#tag/sdk/get/v1/sdk/{chainId}/supported-aggregators)
         * @example "kyberswap,okx"
         */
        aggregators?: string;
        /** YT address of the market to redeem PT and YT from */
        yt: string;
        /** Amount of PT and YT tokens to redeem */
        amountIn: string;
        /** Output token address (can be token or SY) */
        tokenOut: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<RedeemResponse, any>({
        path: `/v2/sdk/${chainId}/redeem`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description Mint SY, using tokens
     *
     * @tags SDK
     * @name SdkControllerMintSyV2
     * @summary Mint SY, using tokens
     * @request GET:/v2/sdk/{chainId}/mint-sy
     */
    sdkControllerMintSyV2: (
      chainId: number,
      query: {
        /** Recipient address for transaction output */
        receiver?: string;
        /** Maximum slippage tolerance (0-1, where 0.01 equals 1%) */
        slippage: number;
        /**
         * Enable swap aggregator to swap between tokens that cannot be natively converted from/to the underlying asset
         * @default false
         */
        enableAggregator?: boolean;
        /**
         * List of aggregator names to use for the swap. If not provided, all aggregators will be used.List of supported aggregator can be found at: [getSupportedAggregators](#tag/sdk/get/v1/sdk/{chainId}/supported-aggregators)
         * @example "kyberswap,okx"
         */
        aggregators?: string;
        /** SY token address to mint */
        sy: string;
        /** Input token address */
        tokenIn: string;
        /** Amount of input tokens used for minting SY */
        amountIn: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<MintSyResponse, any>({
        path: `/v2/sdk/${chainId}/mint-sy`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description Redeem SY to tokens
     *
     * @tags SDK
     * @name SdkControllerRedeemSyV2
     * @summary Redeem SY to tokens
     * @request GET:/v2/sdk/{chainId}/redeem-sy
     */
    sdkControllerRedeemSyV2: (
      chainId: number,
      query: {
        /** Recipient address for transaction output */
        receiver?: string;
        /** Maximum slippage tolerance (0-1, where 0.01 equals 1%) */
        slippage: number;
        /**
         * Enable swap aggregator to swap between tokens that cannot be natively converted from/to the underlying asset
         * @default false
         */
        enableAggregator?: boolean;
        /**
         * List of aggregator names to use for the swap. If not provided, all aggregators will be used.List of supported aggregator can be found at: [getSupportedAggregators](#tag/sdk/get/v1/sdk/{chainId}/supported-aggregators)
         * @example "kyberswap,okx"
         */
        aggregators?: string;
        /** SY token address to redeem */
        sy: string;
        /** Amount of SY tokens to redeem */
        amountIn: string;
        /** Output token address */
        tokenOut: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<RedeemSyResponse, any>({
        path: `/v2/sdk/${chainId}/redeem-sy`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description Transfer liquidity from one market to another. All provided inputs (LP, PT & YT) will be sold/redeemed to the underlying asset before being zapped into the destination market. May not be possible for certain pairs of markets. Callable regardless of the market's expiry.
     *
     * @tags SDK
     * @name SdkControllerTransferLiquidityV2
     * @summary Transfer liquidity from one market to another
     * @request GET:/v2/sdk/{chainId}/markets/{market}/transfer-liquidity
     */
    sdkControllerTransferLiquidityV2: (
      chainId: number,
      market: string,
      query: {
        /** Recipient address for transaction output */
        receiver?: string;
        /** Maximum slippage tolerance (0-1, where 0.01 equals 1%) */
        slippage: number;
        /**
         * List of aggregator names to use for the swap. If not provided, all aggregators will be used.List of supported aggregator can be found at: [getSupportedAggregators](#/SDK/SdkController_getSupportedAggregators)
         * @example "kyberswap,okx"
         */
        aggregators?: string;
        /** The destination market */
        dstMarket: string;
        /** Amount of LP tokens to transfer */
        lpAmount: string;
        /** Amount of PT tokens to transfer */
        ptAmount: string;
        /** Amount of YT tokens to transfer */
        ytAmount: string;
        /**
         * Redeem rewards
         * @default false
         */
        redeemRewards?: boolean;
        /**
         * Enable zero price impact mode. When enabled, users receive LP and YT tokens with no price impact (less LP compared to normal mode).
         * @default false
         */
        zpi?: boolean;
      },
      params: RequestParams = {}
    ) =>
      this.request<TransferLiquidityResponse, any>({
        path: `/v2/sdk/${chainId}/markets/${market}/transfer-liquidity`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description Roll over PTs to new PTs. PT is redeemed for the underlying asset and used to buy the new PT.
     *
     * @tags SDK
     * @name SdkControllerRollOverPtV2
     * @summary Roll over PTs to new PTs
     * @request GET:/v2/sdk/{chainId}/markets/{market}/roll-over-pt
     */
    sdkControllerRollOverPtV2: (
      chainId: number,
      market: string,
      query: {
        /** Recipient address for transaction output */
        receiver?: string;
        /** Maximum slippage tolerance (0-1, where 0.01 equals 1%) */
        slippage: number;
        /**
         * List of aggregator names to use for the swap. If not provided, all aggregators will be used.List of supported aggregator can be found at: [getSupportedAggregators](#/SDK/SdkController_getSupportedAggregators)
         * @example "kyberswap,okx"
         */
        aggregators?: string;
        /** The market address of the new PT */
        dstMarket: string;
        /** Amount of PT tokens to roll over */
        ptAmount: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<RollOverPtResponse, any>({
        path: `/v2/sdk/${chainId}/markets/${market}/roll-over-pt`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description Dual liquidity provision, using both tokens and PT. Only callable until market's expiry.
     *
     * @tags SDK
     * @name SdkControllerAddLiquidityDual
     * @summary Dual liquidity provision, using both tokens and PT
     * @request GET:/v1/sdk/{chainId}/markets/{market}/add-liquidity-dual
     */
    sdkControllerAddLiquidityDual: (
      chainId: number,
      market: string,
      query: {
        /** Recipient address for transaction output */
        receiver?: string;
        /** Maximum slippage tolerance (0-1, where 0.01 equals 1%) */
        slippage: number;
        /** Input token address (can be token or SY) */
        tokenIn: string;
        /** Amount of input tokens to add liquidity */
        amountTokenIn: string;
        /** Amount of PT tokens to add liquidity */
        amountPtIn: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<AddLiquidityDualResponse, any>({
        path: `/v1/sdk/${chainId}/markets/${market}/add-liquidity-dual`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description Two sided liquidity removal, get back both tokens and PT. Callable regardless of the market's expiry.
     *
     * @tags SDK
     * @name SdkControllerRemoveLiquidityDual
     * @summary Two-sided liquidity removal, get back both tokens and PT
     * @request GET:/v1/sdk/{chainId}/markets/{market}/remove-liquidity-dual
     */
    sdkControllerRemoveLiquidityDual: (
      chainId: number,
      market: string,
      query: {
        /** Recipient address for transaction output */
        receiver?: string;
        /** Maximum slippage tolerance (0-1, where 0.01 equals 1%) */
        slippage: number;
        /** Amount of LP tokens to remove liquidity */
        amountIn: string;
        /** Output token address (can be token or SY) */
        tokenOut: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<RemoveLiquidityDualResponse, any>({
        path: `/v1/sdk/${chainId}/markets/${market}/remove-liquidity-dual`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags SDK
     * @name SdkControllerCancelSingleLimitOrder
     * @summary Cancel one single limit order by order hash
     * @request GET:/v1/sdk/{chainId}/limit-order/cancel-single
     */
    sdkControllerCancelSingleLimitOrder: (
      chainId: number,
      query: {
        /** User Address */
        userAddress: string;
        /** BigInt string of salt */
        salt: string;
        /** BigInt string of expiry */
        expiry: string;
        /** BigInt string of nonce */
        nonce: string;
        /** LimitOrderType { 0 : TOKEN_FOR_PT, 1 : PT_FOR_TOKEN, 2 : TOKEN_FOR_YT, 3 : YT_FOR_TOKEN } */
        orderType: 0 | 1 | 2 | 3;
        /** Token used by user to make order */
        token: string;
        /** YT address */
        YT: string;
        /** Maker address */
        maker: string;
        /** Receiver address */
        receiver: string;
        /** BigInt string of making amount */
        makingAmount: string;
        /** BigInt string of lnImpliedRate (natural logarithm of the implied rate) */
        lnImpliedRate: string;
        /** BigInt string of failSafeRate */
        failSafeRate: string;
        /** Bytes string for permit */
        permit: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<SdkResponse, any>({
        path: `/v1/sdk/${chainId}/limit-order/cancel-single`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags SDK
     * @name SdkControllerCancelAllLimitOrders
     * @summary Cancel all limit orders
     * @request GET:/v1/sdk/{chainId}/limit-order/cancel-all
     */
    sdkControllerCancelAllLimitOrders: (
      chainId: number,
      query: {
        /** User Address */
        userAddress: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<SdkResponse, any>({
        path: `/v1/sdk/${chainId}/limit-order/cancel-all`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags SDK
     * @name SdkControllerPendleSwapV2
     * @summary Swap tokens using PendleSwap, not supporting LP, PT and YT.
     * @request POST:/v2/sdk/{chainId}/pendle-swap/swap
     */
    sdkControllerPendleSwapV2: (chainId: number, data: PendleSwapDtoV2, params: RequestParams = {}) =>
      this.request<PendleSwapResponse, any>({
        path: `/v2/sdk/${chainId}/pendle-swap/swap`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Exit LP, PT and YT positions in a market to token/SY
     *
     * @tags SDK
     * @name SdkControllerExitMarketV2
     * @summary Exit LP, PT and YT positions in a market to token/SY
     * @request GET:/v2/sdk/{chainId}/markets/{market}/exit-positions
     */
    sdkControllerExitMarketV2: (
      chainId: number,
      market: string,
      query: {
        /** Recipient address for transaction output */
        receiver?: string;
        /** Maximum slippage tolerance (0-1, where 0.01 equals 1%) */
        slippage: number;
        /**
         * Enable swap aggregator to swap between tokens that cannot be natively converted from/to the underlying asset
         * @default false
         */
        enableAggregator?: boolean;
        /**
         * List of aggregator names to use for the swap. If not provided, all aggregators will be used.List of supported aggregator can be found at: [getSupportedAggregators](#tag/sdk/get/v1/sdk/{chainId}/supported-aggregators)
         * @example "kyberswap,okx"
         */
        aggregators?: string;
        /** Amount of PT tokens to exit */
        ptAmount: string;
        /** Amount of YT tokens to exit */
        ytAmount: string;
        /** Amount of LP tokens to exit */
        lpAmount: string;
        /** Output token address (can be token or SY) */
        tokenOut: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<void, any>({
        path: `/v2/sdk/${chainId}/markets/${market}/exit-positions`,
        method: 'GET',
        query: query,
        ...params,
      }),

    /**
     * @description Redeem rewards and interests from positions
     *
     * @tags SDK
     * @name SdkControllerRedeemInterestsAndRewards
     * @summary Redeem rewards and interests from positions
     * @request GET:/v1/sdk/{chainId}/redeem-interests-and-rewards
     */
    sdkControllerRedeemInterestsAndRewards: (
      chainId: number,
      query: {
        /** The address to receive the output of the action */
        receiver: string;
        /** Use comma separated values to search by multiple addresses */
        sys?: string;
        /** Use comma separated values to search by multiple addresses */
        yts?: string;
        /** Use comma separated values to search by multiple addresses */
        markets?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<RedeemInterestsAndRewardsResponse, any>({
        path: `/v1/sdk/${chainId}/redeem-interests-and-rewards`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description Automatically identifies the action based on your input/output tokens. The table below shows the supported actions and the corresponding tokensIn and tokensOut settings. | Action                                                | tokensIn              | tokensOut       | Note                                                                                                                                                                                                                                 | |-------------------------------------------------------|-----------------------|-----------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------| | Swap from PT to token (sell PT)                       | [PT]                  | [token]         | Callable regardless of the market's expiry                                                                                                                                                                                           | | Swap from token to PT (buy PT)                        | [token]               | [PT]            | Only callable until the market's expiry                                                                                                                                                                                              | | Swap from YT to token (sell YT)                       | [YT]                  | [token]         | Only callable until the market's expiry                                                                                                                                                                                              | | Swap from token to YT (buy YT)                        | [token]               | [YT]            | Only callable until the market's expiry                                                                                                                                                                                              | | Swap between PT and YT                                | [PT] or [YT]          | [YT] or [PT]    | Only callable until the market's expiry                                                                                                                                                                                              | | Add liquidity dual (using both token and PT)          | [token, PT]           | [LP]            | Only callable until the market's expiry.                                                                                                                                                                                             | | Add liquidity single (using token or PT)              | [token] or [PT]       | [LP]            | Only callable until the market's expiry.                                                                                                                                                                                             | | Add liquidity single ZPI (using token or PT, keep YT) | [token] or [PT]       | [LP, YT]        | Zero-price impact provision is supported where no price impact will incur, and users will receive LP and YT (less LP compared to normal mode). Only callable until the market's expiry.                                              | | Remove liquidity dual (get back both token and PT)    | [LP]                  | [token, PT]     | Callable regardless of the market's expiry                                                                                                                                                                                           | | Remove liquidity single (get back either token or PT) | [LP]                  | [token] or [PT] | Callable regardless of the market's expiry                                                                                                                                                                                           | | Mint PT & YT                                          | [token]               | [PT, YT]        | Only callable until YT's expiry                                                                                                                                                                                                      | | Redeem PT & YT                                        | [PT, YT]              | [token]         | If called before YT's expiry, both PT & YT of equal amounts are needed and will be burned. Else, only PT is needed and will be burned.                                                                                               | | Transfer liquidity between markets                    | [LP, PT, YT]          | [LP]            | tokensIn doesn't need to include all 3 tokens; any number of tokens will work. All provided inputs (LP, PT & YT) will be sold/redeemed to the underlying asset before being zapped into the destination market.                      | | Transfer liquidity ZPI                                | [LP, PT, YT]          | [LP, YT]        | tokensIn doesn't need to include all 3 tokens; any number of tokens will work. All provided inputs (LP, PT & YT) will be sold/redeemed to the underlying asset before being zapped into the destination market with no price impact. | | Mint SY                                               | [token]               | [SY]            |                                                                                                                                                                                                                                      | | Redeem SY                                             | [SY]                  | [token]         |                                                                                                                                                                                                                                      | | Swap PT between markets (Roll over pts)               | [PT]                  | [PT]            | PT is redeemed for the underlying asset and used to buy the new PT.                                                                                                                                                                  | | Exit market                                           | [LP, PT, YT]          | [token]         | tokensIn doesn't need to include all 3 tokens; any number of tokens will work.                                                                                                                                                       | | Swap LP to PT between markets                         | [LP]                  | [PT]            | Only callable until the market's expiry                                                                                                                                                                                              | | Pendle swap (swap multiple ERC20 tokens to 1 token)   | [token1, token2, ...] | [token]         | Support at most 3 tokens in                                                                                                                                                                                                          | `tokensIn` and `tokensOut` are the input and output tokens for the action, should be seperate by comma with no spaces. Example if your action requires 2 tokensIn, you can pass `tokensIn=0x123,0x456` Refer to our document for code examples and more details: [Convert API Examples](https://docs.pendle.finance/pendle-v2/Developers/Backend/HostedSdk#examples) ## Computing cost This API will consume 5 computing units if no aggregator is used, with no additional data. Enabling aggregator will consume additional computing units, each aggregator cost differently, and could be check at: [Get supported aggregators](#tag/sdk/get/v1/sdk/{chainId}/supported-aggregators) Refer to our document for guide to reduce CU usage with aggregators: [Reduce CU Usage](https://docs.pendle.finance/pendle-v2/Developers/Backend/HostedSdk#reduce-aggregator-computing-units-v2-endpoints-only)
     *
     * @tags SDK
     * @name SdkControllerConvert
     * @summary Universal convert function
     * @request GET:/v2/sdk/{chainId}/convert
     */
    sdkControllerConvert: (
      chainId: number,
      query: {
        /** Recipient address for transaction output */
        receiver?: string;
        /** Maximum slippage tolerance (0-1, where 0.01 equals 1%) */
        slippage: number;
        /**
         * Enable swap aggregator to swap between tokens that cannot be natively converted from/to the underlying asset
         * @default false
         */
        enableAggregator?: boolean;
        /**
         * List of aggregator names to use for the swap. If not provided, all aggregators will be used.List of supported aggregator can be found at: [getSupportedAggregators](#tag/sdk/get/v1/sdk/{chainId}/supported-aggregators)
         * @example "kyberswap,okx"
         */
        aggregators?: string;
        /**
         * Input token addresses, seperate by comma with no spaces
         * @example "0x123,0x456"
         */
        tokensIn: string;
        /**
         * Input token amounts in wei, seperate by comma with no spaces
         * @example "1000000000000000000,2000000000000000000"
         */
        amountsIn: string;
        /**
         * Output token addresses, seperate by comma with no spaces
         * @example "0x123,0x456"
         */
        tokensOut: string;
        /**
         * Redeem rewards
         * @default false
         */
        redeemRewards?: boolean;
        /**
         * Aggregators needScale value, only set to true when amounts are updated onchain. When enabled, please make sure to buffer the amountIn by about 2%
         * @default false
         */
        needScale?: boolean;
        /** Available fields: `impliedApy`, `effectiveApy`. Comma separated list of fields to return. For example: `field1,field2`. More fields will consume more computing units. */
        additionalData?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<MultiRouteConvertResponse, any>({
        path: `/v2/sdk/${chainId}/convert`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description Swap PT tokens using the fixed price AMM. Supports both exact PT input and exact token output modes.
     *
     * @tags SDK
     * @name SdkControllerSwapPtCrossChain
     * @summary Swap PT using fixed price AMM for cross-chain operations
     * @request GET:/v1/sdk/{chainId}/swap-pt-cross-chain
     */
    sdkControllerSwapPtCrossChain: (
      chainId: number,
      query: {
        /** Receiver address */
        receiver?: string;
        /** PT token address */
        pt: string;
        /** Output token address */
        token: string;
        /** Type of exact amount - "pt" for exact PT input, "token" for exact token output */
        exactAmountType: 'pt' | 'token';
        /** Exact amount value (either PT or token amount depending on exactAmountType) */
        exactAmount: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<SwapPtCrossChainResponse, any>({
        path: `/v1/sdk/${chainId}/swap-pt-cross-chain`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description Swap PT tokens using the fixed price AMM
     *
     * @tags SDK
     * @name SdkControllerSwapPtCrossChainV2
     * @summary Swap PT using fixed price AMM for cross-chain operations
     * @request GET:/v2/sdk/{chainId}/swap-pt-cross-chain
     */
    sdkControllerSwapPtCrossChainV2: (
      chainId: number,
      query: {
        /** Recipient address for transaction output */
        receiver?: string;
        /** Maximum slippage tolerance (0-1, where 0.01 equals 1%) */
        slippage: number;
        /**
         * Enable swap aggregator to swap between tokens that cannot be natively converted from/to the underlying asset
         * @default false
         */
        enableAggregator?: boolean;
        /**
         * List of aggregator names to use for the swap. If not provided, all aggregators will be used.List of supported aggregator can be found at: [getSupportedAggregators](#tag/sdk/get/v1/sdk/{chainId}/supported-aggregators)
         * @example "kyberswap,okx"
         */
        aggregators?: string;
        /** PT token address */
        pt: string;
        /** Exact amount value PT in */
        exactPtIn: string;
        /** Output token address */
        tokenOut: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<SwapWithFixedPricePtAmmResponse, any>({
        path: `/v2/sdk/${chainId}/swap-pt-cross-chain`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description Metadata of a bridged PT on selected spoke chain
     *
     * @tags SDK
     * @name SdkControllerGetPtCrossChainMetadata
     * @summary PT cross-chain metadata
     * @request GET:/v1/sdk/{chainId}/cross-chain-pt-metadata/{pt}
     */
    sdkControllerGetPtCrossChainMetadata: (chainId: number, pt: string, params: RequestParams = {}) =>
      this.request<PtCrossChainMetadataResponse, any>({
        path: `/v1/sdk/${chainId}/cross-chain-pt-metadata/${pt}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  };
  transactionsLegacy = {
    /**
     * No description
     *
     * @tags Transactions (Legacy)
     * @name TransactionsControllerTransactionsV3
     * @summary Get user transactions
     * @request GET:/v3/{chainId}/transactions
     */
    transactionsControllerTransactionsV3: (
      chainId: number,
      query: {
        market: string;
        /**
         * Number of results to skip for pagination. Limited to max 2000. For larger result sets, use version 4.
         * @default 0
         */
        skip?: number;
        /**
         * Maximum number of results to return. The parameter is capped at 1000.
         * @default 10
         */
        limit?: number;
        /** Use comma separated values to search by multiple values. Possible values are MINT_PY, REDEEM_PY, ADD_LIQUIDITY, REMOVE_LIQUIDITY, SWAP_PT, SWAP_YT and SWAP_PY */
        action?: string;
        /** Use comma separated values to search by multiple values. Possible values are ROUTER, PENDLE_MARKET and YT */
        origin?: string;
        /** @format date-time */
        timestamp_start?: string;
        /** @format date-time */
        timestamp_end?: string;
        user?: string;
        minValue?: number;
        maxValue?: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<TransactionsResponse, any>({
        path: `/v3/${chainId}/transactions`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Transactions (Legacy)
     * @name TransactionsControllerTransaction
     * @summary Get transaction details
     * @request GET:/v1/{chainId}/transactions/{id}
     */
    transactionsControllerTransaction: (chainId: number, id: string, params: RequestParams = {}) =>
      this.request<TransactionResponse, any>({
        path: `/v1/${chainId}/transactions/${id}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  };
  transactions = {
    /**
     * @description Return transactions with: user action (long or short yield, add or remove liquidity), valuation, implied apy. **Pagination**: This endpoint supports cursor-based pagination using `resumeToken`. The response includes a `resumeToken` field that can be used in the next request to fetch the next page of results. This is more efficient than using `skip` for large datasets.
     *
     * @tags Transactions
     * @name TransactionsControllerTransactionsV5
     * @summary Get market transactions by address
     * @request GET:/v5/{chainId}/transactions/{address}
     */
    transactionsControllerTransactionsV5: (
      chainId: number,
      address: string,
      query?: {
        /** Transaction type to filter by. Valid values: `TRADES`, `LIQUIDITY`. */
        type?: TransactionType;
        /** Minimum transaction value filter in USD */
        minValue?: number;
        /** Address of the transaction executor */
        txOrigin?: string;
        /** Specific transaction action to filter by. Valid values: `LONG_YIELD`, `SHORT_YIELD`, `ADD_LIQUIDITY`, `REMOVE_LIQUIDITY`. */
        action?: TransactionAction;
        /** Resume token for pagination. Use this to continue a previous query. */
        resumeToken?: string;
        /**
         * Maximum number of results to return. The parameter is capped at 1000.
         * @default 10
         */
        limit?: number;
        /**
         * Use `resumeToken` instead.
         * @deprecated
         */
        skip?: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<TransactionsV5Response, any>({
        path: `/v5/${chainId}/transactions/${address}`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description Return events emitted from router, market, or YT. This endpoint does not include events from limit order. When a user interact with our apps, multiple events will be emitted within the same transaction, this endpoint will return all of them seperately. Therefore, this endpoint is only suitable if you want to see all the events that happened in a transaction. Example, when a user swap a token to PT, two events with action "SWAP_PT" will be emitted, with different origin "ROUTER" and "PENDLE_MARKET". Please check our [HighLevelArchitecture](https://docs.pendle.finance/pendle-v2/Developers/HighLevelArchitecture) for more information. **Unless you really need the breakdown of each event, we recommend you use the [Get market transactions by address](#tag/transactions/get/v5/{chainId}/transactions/{address}) above**, where we smartly group the events based on their type and action, it also includes the valuation of the transaction.
     *
     * @tags Transactions
     * @name TransactionsControllerTransactionsV4
     * @summary Get events from router, market, or YT
     * @request GET:/v4/{chainId}/transactions
     */
    transactionsControllerTransactionsV4: (
      chainId: number,
      query?: {
        market?: string;
        /**
         * Number of results to skip for pagination. Limited to max 5000. For larger result sets, use resume token instead.
         * @default 0
         */
        skip?: number;
        /**
         * Maximum number of results to return. The parameter is capped at 1000.
         * @default 10
         */
        limit?: number;
        /** Use comma separated values to search by multiple values. Possible values are MINT_PY, REDEEM_PY, ADD_LIQUIDITY, REMOVE_LIQUIDITY, SWAP_PT, SWAP_YT and SWAP_PY */
        action?: string;
        /** Use comma separated values to search by multiple values. Possible values are ROUTER, PENDLE_MARKET and YT */
        origin?: string;
        /** @format date-time */
        timestamp_start?: string;
        /** @format date-time */
        timestamp_end?: string;
        user?: string;
        minValue?: number;
        maxValue?: number;
        /** Resume token for pagination. Use this to continue a previous query. */
        resumeToken?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<TransactionsV4Response, any>({
        path: `/v4/${chainId}/transactions`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description Return all transactions related to a user, including limit order fill transactions
     *
     * @tags Transactions
     * @name TransactionsControllerGetTransactions
     * @summary Get user transaction by address
     * @request GET:/v1/pnl/transactions
     */
    transactionsControllerGetTransactions: (
      query: {
        /**
         * Number of results to skip. The parameter is capped at 1000.
         * @default 0
         */
        skip?: number;
        /**
         * Maximum number of results to return. The parameter is capped at 1000.
         * @default 10
         */
        limit?: number;
        /** Chain ID */
        chainId?: number;
        user: string;
        /** Market address */
        market?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<TransactionsResponseEntity, any>({
        path: `/v1/pnl/transactions`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),
  };
  statisticsLegacy = {
    /**
     * No description
     *
     * @tags Statistics (Legacy)
     * @name StatisticsControllerGetTvlAndTradingVolume
     * @summary Get TVL and trading volume
     * @request GET:/v1/statistics/tvl_trading_volume
     */
    statisticsControllerGetTvlAndTradingVolume: (params: RequestParams = {}) =>
      this.request<TvlAndTradingVolumeResponseEntity, any>({
        path: `/v1/statistics/tvl_trading_volume`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  };
  statistics = {
    /**
     * @description Returns a list of unique wallet addresses that have interacted with a specific token across Pendle markets. Use the optional `chainId` parameter to filter results to a specific chain, or omit it to get users across all chains. Common use cases include: - Token holder analysis - User adoption metrics - Market participation statistics
     *
     * @tags Statistics
     * @name StatisticsControllerGetDistinctUserFromToken
     * @summary Get distinct users for a specific token
     * @request GET:/v1/statistics/get-distinct-user-from-token
     */
    statisticsControllerGetDistinctUserFromToken: (
      query: {
        /**
         * Token address to query. Can be any Pendle token (PT, YT, SY, LP). Address will be normalized to lowercase.
         * @example "0x0000000000000000000000000000000000000000"
         */
        token: string;
        /** Optional chain ID to filter results. If provided, returns only users who interacted with the token on the specified chain. If omitted, returns users across all chains where the token exists. */
        chainId?: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<GetDistinctUsersFromTokenEntity, any>({
        path: `/v1/statistics/get-distinct-user-from-token`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Statistics
     * @name StatisticsControllerGetWlpDistinctUsers
     * @summary Get unique users for WLP
     * @request GET:/v1/statistics/get-wlp-distinct-users
     * @deprecated
     */
    statisticsControllerGetWlpDistinctUsers: (
      query: {
        /** Chain id */
        chainId: number;
        /** WLP token address */
        wlpAddress: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<WlpDistinctUsersResponse, any>({
        path: `/v1/statistics/get-wlp-distinct-users`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Statistics
     * @name StatisticsControllerGetLiquidLockerPools
     * @summary Get liquid locker pools
     * @request GET:/v1/statistics/liquid-locker-pools
     * @deprecated
     */
    statisticsControllerGetLiquidLockerPools: (
      query: {
        /**
         * Chain ID
         * @example 1
         */
        chainId: number;
        /**
         * LP token address
         * @example "0x1234..."
         */
        lpAddress: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<LiquidLockerPoolsResponse, any>({
        path: `/v1/statistics/liquid-locker-pools`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Statistics
     * @name StatisticsControllerGetAllRelatedInfoFromLpAndWlp
     * @summary Get LP and WLP token info
     * @request GET:/v1/statistics/get-all-related-info-from-lp-and-wlp
     * @deprecated
     */
    statisticsControllerGetAllRelatedInfoFromLpAndWlp: (
      query: {
        /**
         * Chain ID
         * @example 1
         */
        chainId: number;
        /**
         * Market address
         * @example "0x0000000000000000000000000000000000000000"
         */
        marketAddress?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<GetAllRelatedInfoFromLpAndWlpResponse, any>({
        path: `/v1/statistics/get-all-related-info-from-lp-and-wlp`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),
  };
  merkleLegacy = {
    /**
     * No description
     *
     * @tags Merkle (Legacy)
     * @name MerkleControllerGetRewardsByAddress
     * @summary Get user rewards detail
     * @request GET:/v1/merkle/{campaign}/{address}/rewards
     */
    merkleControllerGetRewardsByAddress: (
      address: string,
      campaign: 'vependle' | 'arbitrum-grant' | 'multi-token' | 'external-rewards' | 'vependle-usd',
      query?: {
        /**
         * The chainId of the chain to get rewards from
         * @default 1
         */
        chainId?: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<MerkleRewardsResponse, any>({
        path: `/v1/merkle/${campaign}/${address}/rewards`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Merkle (Legacy)
     * @name MerkleControllerGetProofByAddress
     * @summary Get user merkle proof
     * @request GET:/v1/merkle/{campaign}/{address}/proof
     */
    merkleControllerGetProofByAddress: (
      address: string,
      campaign: 'vependle' | 'arbitrum-grant' | 'multi-token' | 'external-rewards' | 'vependle-usd',
      query?: {
        /**
         * Set to true to generate calldata to verify merkle root in the PendleMerkleDistributor contract
         * @default false
         */
        generateVerifyData?: boolean;
        /**
         * The chainId of the chain to verify the merkle root on
         * @default 1
         */
        chainId?: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<MerkleProofResponse, NotFoundResponse>({
        path: `/v1/merkle/${campaign}/${address}/proof`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),
  };
  merkle = {
    /**
     * @description Return merkle proof of the given user for all supported chains, support all campaigns. The complete merkle file can be found in our [Merkle distribution repository](https://github.com/pendle-finance/merkle-distributions)
     *
     * @tags Merkle
     * @name MerkleControllerGetProofByAddressV2
     * @summary Get merkle proof of a user by address
     * @request GET:/v2/merkle/{address}/proof
     */
    merkleControllerGetProofByAddressV2: (
      address: string,
      query?: {
        /**
         * Generate calldata for merkle root verification in the PendleMerkleDistributor contract
         * @default false
         */
        generateVerifyData?: boolean;
      },
      params: RequestParams = {}
    ) =>
      this.request<MerkleProofV2Response, NotFoundResponse>({
        path: `/v2/merkle/${address}/proof`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),
  };
  transferLiquidityLegacy = {
    /**
     * No description
     *
     * @tags Transfer Liquidity (Legacy)
     * @name TransferLiquidityControllerGetDefaultTokenOutList
     * @summary Get default transfer tokens
     * @request GET:/v1/{chainId}/transfer-liquidity/{fromSyAddress}/token-out
     */
    transferLiquidityControllerGetDefaultTokenOutList: (
      chainId: number,
      fromSyAddress: string,
      params: RequestParams = {}
    ) =>
      this.request<SyTokenOutRouteListResponse, any>({
        path: `/v1/${chainId}/transfer-liquidity/${fromSyAddress}/token-out`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Transfer Liquidity (Legacy)
     * @name TransferLiquidityControllerGetLiquidityTransferableMarkets
     * @summary Get transferable markets
     * @request GET:/v1/{chainId}/transfer-liquidity/{marketAddress}/list
     */
    transferLiquidityControllerGetLiquidityTransferableMarkets: (
      chainId: number,
      marketAddress: string,
      params: RequestParams = {}
    ) =>
      this.request<GetLiquidityTransferableMarketsResponse, any>({
        path: `/v1/${chainId}/transfer-liquidity/${marketAddress}/list`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  };
  querierLegacy = {
    /**
     * @description Essential market and SY token information for quick overview.
     *
     * @tags Querier (Legacy)
     * @name QuerierControllerGetSimplifiedData
     * @summary Get simplified market data
     * @request GET:/v1/querier/simplified-data
     */
    querierControllerGetSimplifiedData: (
      query?: {
        isExpired?: boolean;
      },
      params: RequestParams = {}
    ) =>
      this.request<GetSimplifiedDataResponse, any>({
        path: `/v1/querier/simplified-data`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),
  };
  querier = {
    /**
     * @description Addresses of verified SY, PT, and YT tokens.
     *
     * @tags Querier
     * @name QuerierControllerGetSafePendleTokenAddresses
     * @summary Get whitelisted token addresses
     * @request GET:/v1/querier/{chainId}/safe-pendle-token-addresses
     * @deprecated
     */
    querierControllerGetSafePendleTokenAddresses: (chainId: number, params: RequestParams = {}) =>
      this.request<GetSafePendleAddressesResponse, any>({
        path: `/v1/querier/${chainId}/safe-pendle-token-addresses`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  };
  chains = {
    /**
     * No description
     *
     * @tags Chains
     * @name ChainsControllerGetSupportedChainIds
     * @summary Get supported chain IDs
     * @request GET:/v1/chains
     */
    chainsControllerGetSupportedChainIds: (params: RequestParams = {}) =>
      this.request<ChainIdsResponse, any>({
        path: `/v1/chains`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  };
  dashboard = {
    /**
     * @description Return all user PT/YT/LP/SY positions across all supported chains. All the claimable rewards are cached by 24 hours. If you need the real time claimable data, read it from RPC!
     *
     * @tags Dashboard
     * @name DashboardControllerGetUserPositions
     * @summary Get user positions by address
     * @request GET:/v1/dashboard/positions/database/{user}
     */
    dashboardControllerGetUserPositions: (
      user: string,
      query?: {
        /**
         * Minimum USD value threshold to filter positions
         * @example 0.1
         */
        filterUsd?: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<UserPositionsCrossChainResponse, any>({
        path: `/v1/dashboard/positions/database/${user}`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Dashboard
     * @name DashboardControllerGetMerkleClaimableRewards
     * @summary Get all merkle claimable rewards for a user
     * @request GET:/v1/dashboard/merkle-claimable-rewards/{user}
     */
    dashboardControllerGetMerkleClaimableRewards: (user: string, params: RequestParams = {}) =>
      this.request<MerkleClaimableRewardsResponse, any>({
        path: `/v1/dashboard/merkle-claimable-rewards/${user}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Dashboard
     * @name DashboardControllerGetMerkleClaimedRewards
     * @summary Get all merkle claimed rewards for a user
     * @request GET:/v1/dashboard/merkle-claimed-rewards/{user}
     */
    dashboardControllerGetMerkleClaimedRewards: (user: string, params: RequestParams = {}) =>
      this.request<MerkleClaimedRewardsResponse, any>({
        path: `/v1/dashboard/merkle-claimed-rewards/${user}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  };
  crossPt = {
    /**
     * No description
     *
     * @tags Cross PT
     * @name CrossPtControllerGetAllCrossPt
     * @summary get all cross pt
     * @request GET:/v1/cross-pt/all
     * @deprecated
     */
    crossPtControllerGetAllCrossPt: (params: RequestParams = {}) =>
      this.request<GetAllCrossPtsResponse, any>({
        path: `/v1/cross-pt/all`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  };
  integrations = {
    /**
     * No description
     *
     * @tags Integrations
     * @name IntegrationsControllerGetLatestBlock
     * @summary Get the latest synced block and its timestamp
     * @request GET:/v1/{chainId}/integrations/latest-block
     */
    integrationsControllerGetLatestBlock: (chainId: number, params: RequestParams = {}) =>
      this.request<BlockEntity, any>({
        path: `/v1/${chainId}/integrations/latest-block`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Integrations
     * @name IntegrationsControllerGetAsset
     * @summary Get Pendle assets. Only PT and SY are supported
     * @request GET:/v1/{chainId}/integrations/asset
     */
    integrationsControllerGetAsset: (
      chainId: number,
      query: {
        /** Asset address */
        id: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<IntegrationAssetResponse, any>({
        path: `/v1/${chainId}/integrations/asset`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Integrations
     * @name IntegrationsControllerGetPair
     * @summary Get PT - SY pair by Pendle LP address
     * @request GET:/v1/{chainId}/integrations/pair
     */
    integrationsControllerGetPair: (
      chainId: number,
      query: {
        /** Pendle LP address */
        id: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<IntegrationPairResponse, any>({
        path: `/v1/${chainId}/integrations/pair`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Integrations
     * @name IntegrationsControllerGetEvents
     * @summary Get Pendle events within a block range
     * @request GET:/v1/{chainId}/integrations/events
     */
    integrationsControllerGetEvents: (
      chainId: number,
      query: {
        /** Starting block number */
        fromBlock: number;
        /** Ending block number */
        toBlock: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<IntegrationEventResponse, any>({
        path: `/v1/${chainId}/integrations/events`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),
  };
  incentiveRewards = {
    /**
     * No description
     *
     * @tags Incentive Rewards
     * @name IncentiveRewardsControllerGetMakerIncentiveDistribution
     * @summary Get maker incentive distribution file
     * @request GET:/v1/incentive-rewards/{chainId}/maker-incentive
     */
    incentiveRewardsControllerGetMakerIncentiveDistribution: (
      chainId: number,
      query: {
        /**
         * Epoch timestamp (Thursday 12:00:00 UTC)
         * @format date-time
         * @example "2025-10-09T12:00:00.000Z"
         */
        epochTimestamp: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<MerklRewardResponse, any>({
        path: `/v1/incentive-rewards/${chainId}/maker-incentive`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Incentive Rewards
     * @name IncentiveRewardsControllerGetMakerIncentiveData
     * @summary Get maker incentive data
     * @request GET:/v1/incentive-rewards/{chainId}/maker-incentive-data
     */
    incentiveRewardsControllerGetMakerIncentiveData: (chainId: number, params: RequestParams = {}) =>
      this.request<MerklDataResponse, any>({
        path: `/v1/incentive-rewards/${chainId}/maker-incentive-data`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  };
}
