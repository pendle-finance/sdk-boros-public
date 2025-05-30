/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface MarketIMDataResponse {
  /** Name of the market */
  name: string;
  /** Symbol of the market */
  symbol: string;
  /** Isolated only market */
  isIsolatedOnly: boolean;
  /** Maturity date of the market */
  maturity: number;
  /** Tick step of the market */
  tickStep: number;
  /** Tick threshold of the market */
  iTickThresh: number;
}

export interface LiqSettingsResponse {
  base: string;
  slope: string;
  feeRate: string;
}

export interface MarketConfigResponse {
  maxOpenOrders: number;
  markRateOracle: string;
  fIndexOracle: string;
  hardOICap: string;
  takerFee: string;
  otcFee: string;
  liqSettings: LiqSettingsResponse;
  kIM: string;
  kMM: string;
  tThresh: number;
  maxRateDeviationFactorBase1e4: number;
  closingOrderBoundBase1e4: number;
  loUpperConstBase1e4: number;
  loUpperSlopeBase1e4: number;
  loLowerConstBase1e4: number;
  loLowerSlopeBase1e4: number;
  status: number;
  useImpliedAsMarkRate: boolean;
}

export interface MarketExtendedConfigResponse {
  /** Amm address */
  ammAddress?: string;
  /** Amm id */
  ammId?: number;
  /** Is positive amm */
  isPositiveAMM?: boolean;
  /** Settle fee rate */
  settleFeeRate: string;
  /** Payment period */
  paymentPeriod: number;
  /** Max update delay */
  maxUpdateDelay: number;
}

export interface MarketMetadataResponse {
  /** Market name */
  name: string;
  /** Platform icon */
  platformIcon: string;
  /** Platform name. For example: "Binance", "Hyperliquid" */
  platformName: string;
  /** Maximum leverage of the market. For example: 20 */
  maxLeverage: number;
  /** Default leverage of the market. For example: 10 */
  defaultLeverage: number;
  /** Icon of the market */
  icon: string;
  isWhitelisted: boolean;
  /** Symbol to listen to funding rate info */
  fundingRateSymbol: string;
}

export interface MarketDataResponse {
  volume24h: number;
  notionalOI: number;
  /** TWAP apr of the market */
  markApr: number;
  /** last traded apr of the market */
  lastTradedApr: number;
  midApr: number;
  floatingApr: number;
  longYieldApr?: number;
  nextSettlementTime?: number;
}

export interface MarketResponse {
  /** marketId used for MarketAcc packing */
  marketId: number;
  /** Market address */
  address: string;
  /** Token id of the market */
  tokenId: number;
  /** Immutable data of the market */
  imData: MarketIMDataResponse;
  config: MarketConfigResponse;
  extConfig: MarketExtendedConfigResponse;
  metadata?: MarketMetadataResponse;
  data?: MarketDataResponse;
}

export interface MarketsResponse {
  results: MarketResponse[];
  total: number;
  skip: number;
}

export interface MarketTradeResponse {
  /** Size */
  size: number;
  /** Rate */
  rate: number;
  /** Transaction hash */
  txHash: string;
  /** Block created timestamp */
  blockTimestamp: number;
}

export interface MarketTradesResponse {
  results: MarketTradeResponse[];
  total: number;
  skip: number;
}

export interface CandleResponse {
  /** Period start timestamp */
  ts: number;
  /**
   * Period start timestamp
   * @deprecated
   */
  t: number;
  /** Open price */
  o: number;
  /** High price */
  h: number;
  /** Low price */
  l: number;
  /** Close price */
  c: number;
  /** Volume */
  v: number;
  /** Underlying APR */
  u: number;
  /** Implied APR */
  i: number;
}

export interface ChartResponse {
  results: CandleResponse[];
}

export interface SideTickResponse {
  /** implied apy in term of tick size */
  ia: number[];
  /** bigint string of notional size */
  sz: string[];
}

export interface OrderBooksResponse {
  long: SideTickResponse;
  short: SideTickResponse;
}

export interface UserVaultInfo {
  /** user deposit */
  depositValue: string;
  /** user unclaimed rewards */
  unclaimedRewards: string;
  /** bigint string of total lp */
  totalLp: string;
}

export interface GetSingleVaultResponse {
  /** market id */
  marketId: number;
  /** token id */
  tokenId: number;
  /** amm id */
  ammId: number;
  /** bigint string of total lp */
  totalLp: string;
  /** bigint string of total tvl */
  totalValue: string;
  /** lp apy */
  lpApy: number;
  /** user vault info */
  user: UserVaultInfo;
}

export interface CollateralVaultResponse {
  tokenId: number;
  collateralAddress: string;
  vaults: GetSingleVaultResponse[];
}

export interface GetAllVaultResponse {
  collaterals: CollateralVaultResponse[];
  /** total tvl in usd */
  totalTvl: number;
  /** bigint string of total pendle rewards */
  totalPendleRewards: string;
}

export interface VaultApyEntryResponse {
  /** Period start timestamp */
  ts: number;
  /** APY */
  a: number;
  /** 30-day average APY */
  a30: number;
  /** TVL */
  tv: string;
}

export interface GetVaultApyChartResponse {
  results: VaultApyEntryResponse[];
}

export interface AMMStateResponse {
  totalFloatAmount: string;
  normFixedAmount: string;
  totalLp: string;
  latestFTime: string;
  maturity: string;
  seedTime: string;
  minAbsRate: string;
  maxAbsRate: string;
  cutOffTimestamp: string;
}

export interface GetAMMStateByMarketIdResponse {
  ammState: AMMStateResponse;
}

export interface GetAMMInfoByAmmIdResponse {
  state: AMMStateResponse;
  isPositive: boolean;
  feeRate: string;
}

export interface DepositStateResponse {
  /** bigint string of collateral balance */
  collateralBalance: string;
  /** margin ratio */
  marginRatio: number;
}

export interface DepositSimulationResponse {
  /** bigint string of minimum received */
  minReceived: string;
  preUserState: DepositStateResponse;
  postUserState: DepositStateResponse;
}

export interface WithdrawStateResponse {
  /** bigint string of collateral balance */
  collateralBalance: string;
  /** margin ratio */
  marginRatio: number;
}

export interface WithdrawSimulationResponse {
  preUserState: WithdrawStateResponse;
  postUserState: WithdrawStateResponse;
}

export interface CashTransferStateResponse {
  /** bigint string of collateral balance */
  collateralBalance: string;
  /** margin ratio */
  marginRatio: number;
}

export interface CashTransferPrePostSimulationResponse {
  preUserState: CashTransferStateResponse;
  postUserState: CashTransferStateResponse;
}

export interface CashTransferSimulationResponse {
  crossAccState: CashTransferPrePostSimulationResponse;
  isolatedAccState: CashTransferPrePostSimulationResponse;
}

export interface PlaceOrderStateResponse {
  /** bigint string of total cash */
  totalCash: string;
  /** bigint string of available initial margin */
  availableInitialMargin: string;
  /** bigint string of available maintenance margin */
  availableMaintMargin: string;
  /** margin ratio */
  marginRatio: number;
  /** bigint string of active position size */
  activePositionSize: string;
}

export interface ContractSwapPositionResponse {
  /** bigint string of size */
  size: string;
  /** bigint string of cost */
  cost: string;
  /** rate */
  rate: number;
}

export interface PlaceOrderSimulationResponse {
  preUserInfo: PlaceOrderStateResponse;
  postUserInfo: PlaceOrderStateResponse;
  matched: ContractSwapPositionResponse;
  /** bigint string of margin required */
  marginRequired: string;
  /** liquidation apr */
  liquidationApr?: number;
  /** profit 25% apr */
  profit25PercentApr: number;
  /** price impact */
  priceImpact: number;
  /** bigint string of fee */
  fee: string;
  /** actual leverage */
  actualLeverage: number;
}

export interface UserInfoResponse {
  /** bigint string of total cash */
  totalCash: string;
  /** bigint string of available initial margin */
  availableInitialMargin: string;
  /** bigint string of available maintenance margin */
  availableMaintMargin: string;
  /** margin ratio */
  marginRatio: number;
}

export interface CancelOrderSimulationResponse {
  preUserInfo: UserInfoResponse;
  postUserInfo: UserInfoResponse;
}

export interface ModifyOrderSimulationResponse {
  /** user info before modify order */
  preUserInfo: PlaceOrderStateResponse;
  /** user info after modify order */
  postUserInfo: PlaceOrderStateResponse;
  /** bigint string of margin required */
  marginRequired: string;
  /** liquidation apr after modify order */
  liquidationApr: number;
  /** profit 25% apr after modify order */
  profit25PercentApr: number;
  /** price impact after modify order */
  priceImpact: number;
  /** bigint string of fee */
  fee: string;
}

export interface CloseActivePositionSimulationResponse {
  preUserInfo: PlaceOrderStateResponse;
  postUserInfo: PlaceOrderStateResponse;
  matched: ContractSwapPositionResponse;
  /** bigint string of margin required */
  marginRequired: string;
  /** liquidation apr */
  liquidationApr?: number;
  /** profit 25% apr */
  profit25PercentApr: number;
  /** price impact */
  priceImpact: number;
  /** bigint string of fee */
  fee: string;
  /** actual leverage */
  actualLeverage: number;
}

export interface AddLiquiditySingleCashStateResponse {
  /** bigint string of net lp out */
  collateralBalance: string;
  /** margin ratio */
  marginRatio: number;
}

export interface AddLiquiditySingleCashMatchedResponse {
  /** bigint string of net lp out */
  netLpOut: string;
  /** bigint string of net cash used */
  netCashUsed: string;
  /** bigint string of fees */
  fees: string;
}

export interface AddLiquiditySingleCashSimulationResponse {
  preUserInfo: AddLiquiditySingleCashStateResponse;
  postUserInfo: AddLiquiditySingleCashStateResponse;
  matched: AddLiquiditySingleCashMatchedResponse;
}

export interface RemoveLiquiditySingleCashStateResponse {
  /** bigint string of collateral balance */
  collateralBalance: string;
  /** margin ratio */
  marginRatio: number;
}

export interface RemoveLiquiditySingleCashMatchedResponse {
  /** bigint string of net cash out */
  netCashOut: string;
  /** bigint string of fees */
  fees: string;
}

export interface RemoveLiquiditySingleCashSimulationResponse {
  preUserInfo: RemoveLiquiditySingleCashStateResponse;
  postUserInfo: RemoveLiquiditySingleCashStateResponse;
  matched: RemoveLiquiditySingleCashMatchedResponse;
}

export interface AssetMetadataResponse {
  /** Asset name */
  proSymbol: string;
  /** Asset icon */
  icon: string;
  /** Asset mono icon */
  monoIcon: string;
  /** Asset avatar */
  avatar: string;
  /**
   * Asset accent color
   * @example "#B9BABE"
   */
  accentColor: string;
  /**
   * indicate whether the asset is whitelisted
   * @example false
   */
  isWhitelisted: boolean;
}

export interface AssetResponse {
  /** Asset address */
  address: string;
  /** Asset tokenId used for MarketAcc packing */
  tokenId: number;
  /** Asset name */
  name: string;
  /** Asset symbol */
  symbol: string;
  /** Asset symbol */
  decimals: number;
  /** Price in USD */
  usdPrice: string;
  metadata: AssetMetadataResponse;
}

export interface AssetsResponse {
  assets: AssetResponse[];
}

export interface GetCalldataResponse {
  data: string;
  from: string;
  to: string;
  gas: string;
}

export interface AgentExecuteParamsResponse {
  tag: string;
  data: string;
}

export interface BulkPlaceOrderQueryDto {
  marketAcc: string;
  marketId: number;
  /** Side { LONG : 0, SHORT : 1 } */
  side: 0 | 1;
  /** sizes */
  sizes: string[];
  /** limit ticks */
  limitTicks: number[];
  /** ids to strict cancel */
  idsToStrictCancel?: string[];
  desiredMatchRate: number;
  /** TimeInForce { GOOD_TIL_CANCELLED : 0, IMMEDIATE_OR_CANCEL : 1, FILL_OR_KILL : 2, POST_ONLY : 3 } */
  tif: 0 | 1 | 2 | 3;
}

export interface PendleSignTxDto {
  account: string;
  connectionId: string;
  nonce: string;
}

export interface AgentExecuteDto {
  agent: string;
  message: PendleSignTxDto;
  signature: string;
  calldata: string;
}

export interface TxResponse {
  /** Transaction status */
  status: string;
  /** Transaction hash */
  txHash: string;
  /** Logs index */
  index: number;
}

export interface BulkAgentExecuteDto {
  datas: AgentExecuteDto[];
}

export interface ApproveAgentQueryDto {
  setAccountManagerCalldata?: string;
  approveAgentCalldata: string;
}

export interface ApproveAgentResponse {
  setAccountManagerResult?: TxResponse;
  approveAgentResult: TxResponse;
}

export interface SettingsByMarketResponse {
  /** Market id */
  marketId: number;
  /** Leverage for cross market */
  crossLeverage?: number;
  /** Leverage for isolated market */
  isolatedLeverage?: number;
}

export interface AccountSettingsResponse {
  /** Account settings */
  settingsByMarket: SettingsByMarketResponse[];
}

export interface UpdateAccountSettingBodyDto {
  marketAcc: string;
  marketId: number;
  leverage: number;
  /** EIP-712 signature */
  signature: string;
  /** Agent address */
  agent: string;
  /** Timestamp */
  timestamp: number;
}

export interface PositionValueResponse {
  /** bigint string of settled position value */
  settledPosition: string;
  /** bigint string of remaining position value */
  remainingPosition: string;
}

export interface PositionPnlResponse {
  /** bigint string of rate settlement PnL */
  rateSettlementPnl: string;
  /** bigint string of unrealised PnL */
  unrealisedPnl: string;
}

export interface ActivePnlPositionResponse {
  /** Position id */
  id: string;
  /** The market id */
  marketId: number;
  /** Side { LONG : 0, SHORT : 1 } */
  side: 0 | 1;
  /** bigint string of notional size */
  notionalSize: string;
  positionValue: PositionValueResponse;
  /** Underlying APY */
  underlyingApy: number;
  /** Fixed APR */
  fixedApr: number;
  /** Implied APR */
  impliedApr: number;
  /** Liquidation APR */
  liquidationApr: number;
  pnl: PositionPnlResponse;
  /** bigint string of initial margin */
  initialMargin: string;
  /** The account position */
  marketAcc: string;
  /** The account id */
  accountId: number;
  /** profit 25% apr */
  profit25PercentApr: number;
}

export interface ClosedPnlPositionResponse {
  /** Position id */
  id: string;
  /** The market id */
  marketId: number;
  /** Side { LONG : 0, SHORT : 1 } */
  side: 0 | 1;
  /** The position closure time */
  timeClosed: number;
  /** bigint string of position size */
  positionSize: string;
  /** Average fixed APR */
  avgFixedApr: number;
  /** Average underlying APR */
  avgUnderlyingApr: number;
  /** bigint string of PnL */
  pnl: string;
  /** The account position */
  marketAcc: string;
  /** The account id */
  accountId: number;
}

export interface ClosedPnlPositionsResponse {
  results: ClosedPnlPositionResponse[];
  /** Total number of positions */
  total: number;
}

export interface PnlTransactionResponse {
  /** Transaction id */
  id: string;
  /** The market id */
  marketId: number;
  /** The transaction time */
  time: number;
  /** Side { LONG : 0, SHORT : 1 } */
  side: 0 | 1;
  /** TxType { NORMAL : normal, LIQUIDATE : liquidate, FORCE_DELEVERAGE : force_deleverage } */
  txType: "normal" | "liquidate" | "force_deleverage";
  /** TradeDirection { INCREASE : 0, DECREASE : 1, CHANGE_DIRECTION : 2 } */
  tradeDirection: 0 | 1 | 2;
  /** bigint string of notional size */
  notionalSize: string;
  /** bigint string of trade value */
  tradeValue: string;
  /** Fixed APR */
  fixedApr: number;
  /** bigint string of fee */
  fee: string;
  /** bigint string of PnL */
  pnl: string;
  /** The account position */
  marketAcc: string;
  /** The account id */
  accountId: number;
}

export interface PnlTransactionsResponse {
  results: PnlTransactionResponse[];
  /** Total number of transactions */
  total: number;
}

export interface HistoricalPnlChartResponse {
  /** The time */
  time: number;
  /** Underlying APR */
  underlyingApr: number;
  /** Average fixed APR */
  avgFixedApr: number;
  /** bigint string of settled volume */
  settledVolume: string;
  /** bigint string of realised PnL */
  realisedPnl: string;
}

export interface LimitOrderMetadataResponse {
  /** Is rate improved */
  isRateImproved: boolean;
}

export interface LimitOrderResponse {
  /** Side { LONG : 0, SHORT : 1 } */
  side: 0 | 1;
  /** Original Notional Size of the order */
  placedSize: string;
  /** Remaining Notional Size of the order */
  unfilledSize: string;
  /**
   * the fixed APR of the order
   * @deprecated
   */
  impliedApr: number;
  /** the tick of the order */
  tick: number;
  /** Order value */
  orderValue: string;
  /** Margin required */
  marginRequired: string;
  /** Order ID */
  orderId: string;
  /** Maker address */
  root: string;
  /** Market id */
  marketId: number;
  /** Maker sub account id */
  accountId: number;
  /** Is cross market */
  isCross: boolean;
  /** LimitOrderStatus { Filling : 0, Cancelled : 1, FullyFilled : 2, Expired : 3, Purged : 4 } */
  status: 0 | 1 | 2 | 3 | 4;
  /** OrderType { LIMIT : 0, MARKET : 1 } */
  orderType: 0 | 1;
  /** The block timestamp of the order placement, in seconds */
  blockTimestamp: number;
  /** Account position */
  marketAcc: string;
  metadata?: LimitOrderMetadataResponse;
}

export interface LimitOrdersResponse {
  results: LimitOrderResponse[];
  total: number;
}

export interface SettlementResponse {
  /** The id of the settlement */
  id: string;
  /** The timestamp of the settlement */
  timestamp: number;
  /** The account position */
  marketAcc: string;
  /** The market id */
  marketId: number;
  /** The side of the settlement { LONG : 0, SHORT : 1 } */
  side: 0 | 1;
  /** bigint string of position size */
  positionSize: string;
  /** bigint string of position value */
  positionValue: string;
  /** bigint string of yield paid */
  yieldPaid: string;
  /** bigint string of yield received */
  yieldReceived: string;
  /** bigint string of settlement */
  settlement: string;
  /** settlement rate */
  settlementRate: number;
}

export interface SettlementsResponse {
  results: SettlementResponse[];
  /** Total number of settlements */
  total: number;
}

export interface PnlResponse {
  /** bigint string of rate settlement PnL */
  rateSettlementPnl: string;
  /** bigint string of unrealised PnL */
  unrealisedPnl: string;
}

export interface MarketPositionResponse {
  marketId: number;
  /** TWAP apr of the market */
  markApr: number;
  /** last traded apr of the market */
  lastTradedApr: number;
  /** the average of best bid apr and best ask apr of the market */
  impliedApr: number;
  liquidationApr: number;
  /** fixed apr */
  fixedApr: number;
  positionValue: PositionValueResponse;
  pnl: PnlResponse;
  /** bigint string of maintMargin */
  maintMargin: string;
  /** Side { LONG : 0, SHORT : 1 } */
  side: 0 | 1;
  /** bigint string of notional size */
  notionalSize: string;
  /** bigint string of initial margin */
  initialMargin: string;
  /** profit 25% apr */
  profit25PercentApr: number;
}

export interface MarketAccCollateralResponse {
  /** market acc */
  marketAcc: string;
  /** List market positions info */
  marketPositions: MarketPositionResponse[];
  isCross: boolean;
  /** bigint string of net balance for this account position */
  netBalance: string;
  /** bigint string of available balance for this account position, if this is isolated position, this is the available to withdraw in the UI */
  availableBalance: string;
  /** bigint string of initial margin for this account position */
  initialMargin: string;
  /** bigint string of maint margin for this account position */
  maintMargin: string;
  /** margin ratio for this account position */
  marginRatio: number;
}

export interface CollateralSummaryResponse {
  tokenId: number;
  /** List collateral info for isolated positions */
  isolatedPositions: MarketAccCollateralResponse[];
  /** Collateral info for crossed position */
  crossPosition: MarketAccCollateralResponse;
  /** bigint string of total net balance */
  totalNetBalance: string;
  /** bigint string of start day net balance */
  startDayNetBalance: string;
  /** bigint string of one month ago net balance */
  oneMonthAgoNetBalance: string;
  /** bigint string of one month ago aggregated vault transfer */
  oneMonthAgoAggregatedVaultTransfer: string;
  /** bigint string of one month ago aggregated amm transfer (total deposit - total withdraw) */
  oneMonthAgoAggregatedAmmTransfer: string;
}

export interface AllCollateralSummaryResponse {
  /** List all collateral summary */
  collaterals: CollateralSummaryResponse[];
}

export interface BalanceResponse {
  /** Net balance */
  b: string;
  /** Balance in USD */
  u: number;
  /** Timestamp */
  t: number;
}

export interface BalanceChartResponse {
  /** Token ID */
  tokenId: number;
  historicalBalances: BalanceResponse[];
  currentBalance: BalanceResponse;
}

export interface BalanceChartAllTokensResponse {
  balanceCharts: BalanceChartResponse[];
}

export interface MarketOrderLog {
  root: string;
  isCross: boolean;
  size: number;
  rate: number;
  fees: number;
}

export interface OtcSwapLog {
  root: string;
  isCross: boolean;
  size: number;
  rate: number;
  fees: number;
}

export interface MarketOrderLogResponse {
  marketOrderLog: MarketOrderLog[];
  otcSwapLogs: OtcSwapLog[];
}

export interface GetUserReferralInfoResponse {
  /** The referral code of the user */
  code?: string;
  /** The address of the user who referred the user */
  referrer?: string;
  /** The referral code of the user who referred the user */
  referrerCode?: string;
  /**
   * The referral join date for user
   * @format date-time
   */
  referralJoinDate?: string;
  /** The total trading volume for user */
  totalTradingVolume: number;
  /** The total settled volume for user */
  totalSettledVolume: number;
  /** The total fee need to be paid by user */
  totalPayableFee: number;
  /** The total shared fee earned by user */
  totalSharedFee: number;
}

export interface CheckReferralExistBodyDto {
  /** referral code to check existence */
  code: string;
}

export interface CheckReferralExistResponse {
  /** Indicate if the referral code exists */
  exist: boolean;
}

export interface CreateReferralBodyDto {
  /** EIP-712 signature */
  signature: string;
  /** Agent address */
  agent: string;
  /** Timestamp */
  timestamp: number;
  /** referral code by user address */
  code: string;
}

export interface JoinReferralBodyDto {
  /** EIP-712 signature */
  signature: string;
  /** Agent address */
  agent: string;
  /** Timestamp */
  timestamp: number;
  /** the address of the user who join by referral code */
  referee: string;
  /** the referral code */
  code: string;
}

export interface JoinReferralResponse {
  /** Indicate if the referral is successfully joined */
  success: boolean;
}

export interface ReferralActivityResponse {
  /** The address of the user */
  user: string;
  /**
   * The date of the user join the referral
   * @format date-time
   */
  referralJoinDate: string;
  /**
   * The asset pro symbols of the user
   * @example ["ETH","USDC"]
   */
  assetProSymbols: string[];
  /**
   * The total trading volumes of the user
   * @example [1000,2000]
   */
  totalTradingVolumes: number[];
  /**
   * The total settlement volumes of the user
   * @example [800,1500]
   */
  totalSettledVolumes: number[];
  /**
   * The total paid fees of the user
   * @example [5,10]
   */
  totalFeesPaids: number[];
  /**
   * The total share fee earnings of the user
   * @example [10,20]
   */
  totalFeesEarneds: number[];
}

export interface ReferralActivitiesResponse {
  /** The activity of all users used referral code */
  referralActivities: ReferralActivityResponse[];
}

export interface Reward {
  /**
   * The asset symbol
   * @example "ETH"
   */
  symbol: string;
  /** The total referral rewards in asset */
  amountInAsset: number;
  /** The total referral rewards in usd */
  amountInUsd: number;
}

export interface ReferralRewardResponse {
  /** The referral rewards in assets (10% fee rebate if eligible + 20% fee from referees) */
  totalReferralRewards: Reward[];
  /** The unclaimed referral rewards in assets */
  unclaimedReferralRewards: Reward[];
}

export interface FaucetDto {
  /**
   * The addresses to send the tokens to
   * @example ["0x1234567890123456789012345678901234567890"]
   */
  addresses: string[];
  /**
   * The amount of ETH to send to each address
   * @example 1
   */
  ethAmount: number;
  /**
   * The amount of BTC to send to each address
   * @example 0.1
   */
  btcAmount: number;
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
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

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "https://secrettune.io/core-v2" });
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
    if (typeof formItem === "object" && formItem !== null) {
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
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Pendle V3 API Docs
 * @version 1.0
 * @baseUrl https://secrettune.io/core-v2
 * @contact Pendle Finance <hello@pendle.finance> (https://pendle.finance)
 *
 * Pendle V3 API documentation
 */
export class Sdk<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  markets = {
    /**
     * No description
     *
     * @tags Markets
     * @name MarketsControllerGetMarkets
     * @summary Get all markets
     * @request GET:/v1/markets
     */
    marketsControllerGetMarkets: (
      query?: {
        /**
         * Maximum number of results to skip.
         * @default 0
         */
        skip?: number;
        /**
         * Maximum number of results to return. The parameter is capped at 100.
         * @default 10
         */
        limit?: number;
        /**
         * indicate whether to return whitelisted or unwhitelisted markets. By default we return whitelisted markets
         * @default true
         */
        isWhitelisted?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<MarketsResponse, any>({
        path: `/v1/markets`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Markets
     * @name MarketsControllerGetMarketTrades
     * @summary Get market trades
     * @request GET:/v1/markets/market-trades
     */
    marketsControllerGetMarketTrades: (
      query: {
        /**
         * Maximum number of results to skip.
         * @default 0
         */
        skip?: number;
        /**
         * Maximum number of results to return. The parameter is capped at 100.
         * @default 10
         */
        limit?: number;
        /** Market id */
        marketId: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<MarketTradesResponse, any>({
        path: `/v1/markets/market-trades`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Markets
     * @name MarketsControllerGetChartData
     * @summary Get chart data
     * @request GET:/v1/markets/chart
     */
    marketsControllerGetChartData: (
      query: {
        /** Market id */
        marketId: number;
        /** ClosePositionType { FIVE_MINUTES : 5m, ONE_HOUR : 1h, ONE_DAY : 1d, ONE_WEEK : 1w } */
        timeFrame: "5m" | "1h" | "1d" | "1w";
        /**
         * Start timestamp
         * @default 0
         */
        startTimestamp?: number;
        /**
         * End timestamp, default to current timestamp
         * @default 1748592740
         */
        endTimestamp?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ChartResponse, any>({
        path: `/v1/markets/chart`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Markets
     * @name MarketsControllerGetMarketInfo
     * @summary Get market data by marketId
     * @request GET:/v1/markets/{marketId}
     */
    marketsControllerGetMarketInfo: (marketId: number, params: RequestParams = {}) =>
      this.request<MarketResponse, any>({
        path: `/v1/markets/${marketId}`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  orderBooks = {
    /**
     * No description
     *
     * @tags OrderBooks
     * @name OrderBooksControllerGetOrderBooksByMarketId
     * @summary Get market order books by tick
     * @request GET:/v1/order-books/{marketId}
     */
    orderBooksControllerGetOrderBooksByMarketId: (
      marketId: number,
      query: {
        tickSize: 0.00001 | 0.0001 | 0.001 | 0.01 | 0.1;
      },
      params: RequestParams = {},
    ) =>
      this.request<OrderBooksResponse, any>({
        path: `/v1/order-books/${marketId}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  amm = {
    /**
     * No description
     *
     * @tags AMM
     * @name AmmControllerGetAllVaultStates
     * @summary Get all vaults states
     * @request GET:/v1/amm/summary
     */
    ammControllerGetAllVaultStates: (
      query?: {
        account?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetAllVaultResponse, any>({
        path: `/v1/amm/summary`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags AMM
     * @name AmmControllerGetSingleVaultState
     * @summary Get single vault state
     * @request GET:/v1/amm/summary/single
     */
    ammControllerGetSingleVaultState: (
      query: {
        marketId: number;
        account?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetSingleVaultResponse, any>({
        path: `/v1/amm/summary/single`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags AMM
     * @name AmmControllerGetVaultApyChart
     * @summary Get vault apy chart
     * @request GET:/v1/amm/chart
     */
    ammControllerGetVaultApyChart: (
      query: {
        marketId: number;
        /** TimeFrame { FIVE_MINUTES : 5m, ONE_HOUR : 1h, ONE_DAY : 1d, ONE_WEEK : 1w } */
        timeFrame: "5m" | "1h" | "1d" | "1w";
        /**
         * Start timestamp
         * @default 0
         */
        startTimestamp?: number;
        /**
         * End timestamp, default to current timestamp
         * @default 1748592740
         */
        endTimestamp?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetVaultApyChartResponse, any>({
        path: `/v1/amm/chart`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags AMM
     * @name AmmControllerGetAmmStateByMarketId
     * @summary Get amm amm state by market id
     * @request GET:/v1/amm/{marketId}
     */
    ammControllerGetAmmStateByMarketId: (marketId: number, params: RequestParams = {}) =>
      this.request<GetAMMStateByMarketIdResponse, any>({
        path: `/v1/amm/${marketId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags AMM
     * @name AmmControllerGetAmmInfoByAmmId
     * @summary Get amm info by amm address
     * @request GET:/v2/amm/{ammId}
     */
    ammControllerGetAmmInfoByAmmId: (ammId: number, params: RequestParams = {}) =>
      this.request<GetAMMInfoByAmmIdResponse, any>({
        path: `/v2/amm/${ammId}`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  simulations = {
    /**
     * No description
     *
     * @tags Simulations
     * @name SimulationsControllerGetDeposit
     * @summary Deposit collateral
     * @request GET:/v1/simulations/deposit
     */
    simulationsControllerGetDeposit: (
      query: {
        userAddress: string;
        tokenId: number;
        amount: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<DepositSimulationResponse, any>({
        path: `/v1/simulations/deposit`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Simulations
     * @name SimulationsControllerGetWithdraw
     * @summary Withdraw collateral
     * @request GET:/v1/simulations/withdraw
     */
    simulationsControllerGetWithdraw: (
      query: {
        userAddress: string;
        tokenId: number;
        amount: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<WithdrawSimulationResponse, any>({
        path: `/v1/simulations/withdraw`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Simulations
     * @name SimulationsControllerGetCashTransfer
     * @summary Cash transfer
     * @request GET:/v1/simulations/cash-transfer
     */
    simulationsControllerGetCashTransfer: (
      query: {
        userAddress: string;
        marketId: number;
        /** true if you want to transfer cash from cross to isolated account, false vice versa */
        isDeposit: boolean;
        amount: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<CashTransferSimulationResponse, any>({
        path: `/v1/simulations/cash-transfer`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Simulations
     * @name SimulationsControllerGetPlaceOrder
     * @summary Place limit order
     * @request GET:/v1/simulations/place-order
     */
    simulationsControllerGetPlaceOrder: (
      query: {
        marketAcc: string;
        marketId: number;
        /** Side { LONG : 0, SHORT : 1 } */
        side: 0 | 1;
        /** bigint string of size */
        size: string;
        /**
         * @min -32768
         * @max 32767
         */
        limitTick?: number;
        /** TimeInForce { GOOD_TIL_CANCELLED : 0, IMMEDIATE_OR_CANCEL : 1, FILL_OR_KILL : 2, POST_ONLY : 3 } */
        tif: 0 | 1 | 2 | 3;
        /** @default 0.05 */
        slippage?: number;
        /** @default true */
        isConnected?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<PlaceOrderSimulationResponse, any>({
        path: `/v1/simulations/place-order`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Simulations
     * @name SimulationsControllerGetCancelOrder
     * @summary Cancel order
     * @request GET:/v1/simulations/cancel-order
     */
    simulationsControllerGetCancelOrder: (
      query: {
        marketAcc: string;
        marketId: number;
        cancelAll: boolean;
        /** comma separated orderIds */
        orderIds?: string[];
      },
      params: RequestParams = {},
    ) =>
      this.request<CancelOrderSimulationResponse, any>({
        path: `/v1/simulations/cancel-order`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Simulations
     * @name SimulationsControllerGetModifyOrder
     * @summary Modify order
     * @request GET:/v1/simulations/modify-order
     */
    simulationsControllerGetModifyOrder: (
      query: {
        /** account position that the order is modified on */
        marketAcc: string;
        /** market id that the order is modified on */
        marketId: number;
        /** order id that is modified */
        orderId: string;
        /** Side { LONG : 0, SHORT : 1 } */
        side: 0 | 1;
        /** bigint string of size of modified order */
        size: string;
        /**
         * limit tick of modified order
         * @min -32768
         * @max 32767
         */
        limitTick: number;
        /** define how long the modified order remains active before expiring */
        tif: 0 | 1 | 2 | 3;
      },
      params: RequestParams = {},
    ) =>
      this.request<ModifyOrderSimulationResponse, any>({
        path: `/v1/simulations/modify-order`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Simulations
     * @name SimulationsControllerCloseActiveMarketPosition
     * @summary Close an active market position
     * @request GET:/v1/simulations/close-active-position
     */
    simulationsControllerCloseActiveMarketPosition: (
      query: {
        marketAcc: string;
        marketId: number;
        /** ClosePositionType { LIMIT : limit, MARKET : market } */
        type: "limit" | "market";
        size: string;
        /** Required if type is limit */
        rate?: number;
        /**
         * Slippage
         * @default 0.05
         */
        slippage?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<CloseActivePositionSimulationResponse, any>({
        path: `/v1/simulations/close-active-position`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Simulations
     * @name SimulationsControllerGetAddLiquiditySingleCashToAmm
     * @summary Add liquidity single cash to amm
     * @request GET:/v1/simulations/add-liquidity-single-cash
     */
    simulationsControllerGetAddLiquiditySingleCashToAmm: (
      query: {
        userAddress: string;
        accountId: number;
        marketId: number;
        netCashIn: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<AddLiquiditySingleCashSimulationResponse, any>({
        path: `/v1/simulations/add-liquidity-single-cash`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Simulations
     * @name SimulationsControllerGetRemoveLiquiditySingleCashFromAmm
     * @summary Remove liquidity single cash from amm
     * @request GET:/v1/simulations/remove-liquidity-single-cash
     */
    simulationsControllerGetRemoveLiquiditySingleCashFromAmm: (
      query: {
        userAddress: string;
        accountId: number;
        marketId: number;
        lpToRemove: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<RemoveLiquiditySingleCashSimulationResponse, any>({
        path: `/v1/simulations/remove-liquidity-single-cash`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  assets = {
    /**
     * No description
     *
     * @tags Assets
     * @name AssetsControllerGetAllAssets
     * @summary Get all assets
     * @request GET:/v1/assets/all
     */
    assetsControllerGetAllAssets: (params: RequestParams = {}) =>
      this.request<AssetsResponse, any>({
        path: `/v1/assets/all`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  calldata = {
    /**
     * No description
     *
     * @tags Calldata
     * @name CalldataControllerGetDepositCalldata
     * @summary Get deposit calldata
     * @request GET:/v1/calldata/deposit
     */
    calldataControllerGetDepositCalldata: (
      query: {
        userAddress: string;
        tokenId: number;
        amount: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetCalldataResponse, any>({
        path: `/v1/calldata/deposit`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Calldata
     * @name CalldataControllerGetWithdrawCalldata
     * @summary Get withdraw calldata
     * @request GET:/v1/calldata/withdraw
     */
    calldataControllerGetWithdrawCalldata: (
      query: {
        userAddress: string;
        tokenId: number;
        amount: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetCalldataResponse, any>({
        path: `/v1/calldata/withdraw`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Calldata
     * @name CalldataControllerGetPositionTransferCalldata
     * @summary Get cash transfer contract params
     * @request GET:/v1/calldata/cash-transfer
     */
    calldataControllerGetPositionTransferCalldata: (
      query: {
        marketId: number;
        /** true if you want to transfer cash from cross to isolated account, false vice versa */
        isDeposit: boolean;
        amount: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<AgentExecuteParamsResponse, any>({
        path: `/v1/calldata/cash-transfer`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Calldata
     * @name CalldataControllerGetPlaceOrderCalldata
     * @summary Get place limit order contract params
     * @request GET:/v1/calldata/place-order
     */
    calldataControllerGetPlaceOrderCalldata: (
      query: {
        marketAcc: string;
        marketId: number;
        /** Side { LONG : 0, SHORT : 1 } */
        side: 0 | 1;
        /** bigint string of size */
        size: string;
        /**
         * @min -32768
         * @max 32767
         */
        limitTick?: number;
        /** @default 0.05 */
        slippage?: number;
        /** TimeInForce { GOOD_TIL_CANCELLED : 0, IMMEDIATE_OR_CANCEL : 1, FILL_OR_KILL : 2, POST_ONLY : 3 } */
        tif: 0 | 1 | 2 | 3;
      },
      params: RequestParams = {},
    ) =>
      this.request<AgentExecuteParamsResponse, any>({
        path: `/v1/calldata/place-order`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Calldata
     * @name CalldataControllerGetBulkPlaceOrderCalldata
     * @summary Get place multiple limit orders contract params
     * @request POST:/v1/calldata/place-orders
     */
    calldataControllerGetBulkPlaceOrderCalldata: (data: BulkPlaceOrderQueryDto, params: RequestParams = {}) =>
      this.request<AgentExecuteParamsResponse, any>({
        path: `/v1/calldata/place-orders`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Calldata
     * @name CalldataControllerGetCancelOrderCalldata
     * @summary Get cancel order contract params
     * @request GET:/v1/calldata/cancel-order
     */
    calldataControllerGetCancelOrderCalldata: (
      query: {
        marketAcc: string;
        marketId: number;
        cancelAll: boolean;
        /** comma separated orderIds */
        orderIds?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<AgentExecuteParamsResponse, any>({
        path: `/v1/calldata/cancel-order`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Calldata
     * @name CalldataControllerGetCloseActiveMarketPosition
     * @summary Get close active position contract params
     * @request GET:/v1/calldata/close-active-position
     */
    calldataControllerGetCloseActiveMarketPosition: (
      query: {
        marketAcc: string;
        marketId: number;
        /** ClosePositionType { LIMIT : limit, MARKET : market } */
        type: "limit" | "market";
        size: string;
        /** Required if type is limit */
        rate?: number;
        /**
         * Slippage
         * @default 0.05
         */
        slippage?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<AgentExecuteParamsResponse, any>({
        path: `/v1/calldata/close-active-position`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Calldata
     * @name CalldataControllerGetModifyOrderCalldata
     * @summary Get modify order contract params
     * @request GET:/v1/calldata/modify-order
     */
    calldataControllerGetModifyOrderCalldata: (
      query: {
        marketAcc: string;
        marketId: number;
        orderId: string;
        /** bigint string of size */
        size: string;
        /**
         * @min -32768
         * @max 32767
         */
        limitTick: number;
        /** TimeInForce { GOOD_TIL_CANCELLED : 0, IMMEDIATE_OR_CANCEL : 1, FILL_OR_KILL : 2, POST_ONLY : 3 } */
        tif: 0 | 1 | 2 | 3;
      },
      params: RequestParams = {},
    ) =>
      this.request<AgentExecuteParamsResponse, any>({
        path: `/v1/calldata/modify-order`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Calldata
     * @name CalldataControllerGetAddLiquiditySingleCashToAmmCalldata
     * @summary Get add liquidity single cash to amm contract params
     * @request GET:/v1/calldata/add-liquidity-single-cash-to-amm
     */
    calldataControllerGetAddLiquiditySingleCashToAmmCalldata: (
      query: {
        marketId: number;
        netCashIn: string;
        minLpOut: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<AgentExecuteParamsResponse, any>({
        path: `/v1/calldata/add-liquidity-single-cash-to-amm`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Calldata
     * @name CalldataControllerGetRemoveLiquiditySingleCashFromAmmCalldata
     * @summary Get remove liquidity single cash from amm contract params
     * @request GET:/v1/calldata/remove-liquidity-single-cash-from-amm
     */
    calldataControllerGetRemoveLiquiditySingleCashFromAmmCalldata: (
      query: {
        marketId: number;
        lpToRemove: string;
        minCashOut: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<AgentExecuteParamsResponse, any>({
        path: `/v1/calldata/remove-liquidity-single-cash-from-amm`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Calldata
     * @name CalldataControllerEnterAllMarkets
     * @summary Enter all markets - for testing
     * @request GET:/v1/calldata/enter-all-markets
     */
    calldataControllerEnterAllMarkets: (
      query: {
        userAddress: string;
        isCross?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<AgentExecuteParamsResponse, any>({
        path: `/v1/calldata/enter-all-markets`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Calldata
     * @name CalldataControllerDirectCall
     * @summary Agent direct call
     * @request POST:/v1/calldata/agent-direct-call
     */
    calldataControllerDirectCall: (data: AgentExecuteDto, params: RequestParams = {}) =>
      this.request<TxResponse, any>({
        path: `/v1/calldata/agent-direct-call`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Calldata
     * @name CalldataControllerBulkAgentDirectCall
     * @summary Send multiple direct call to agent
     * @request POST:/v1/calldata/bulk-agent-direct-call
     */
    calldataControllerBulkAgentDirectCall: (data: BulkAgentExecuteDto, params: RequestParams = {}) =>
      this.request<TxResponse[], any>({
        path: `/v1/calldata/bulk-agent-direct-call`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Calldata
     * @name CalldataControllerApproveAgent
     * @summary Approve agent
     * @request POST:/v1/calldata/approve-agent
     */
    calldataControllerApproveAgent: (data: ApproveAgentQueryDto, params: RequestParams = {}) =>
      this.request<ApproveAgentResponse, any>({
        path: `/v1/calldata/approve-agent`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  accounts = {
    /**
     * No description
     *
     * @tags Accounts
     * @name AccountsControllerGetUserSettings
     * @summary Get user settings
     * @request GET:/v1/accounts/settings
     */
    accountsControllerGetUserSettings: (
      query: {
        userAddress: string;
        accountId: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<AccountSettingsResponse, any>({
        path: `/v1/accounts/settings`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Accounts
     * @name AccountsControllerUpdateAccountSettings
     * @summary Update user settings
     * @request POST:/v1/accounts/settings
     */
    accountsControllerUpdateAccountSettings: (data: UpdateAccountSettingBodyDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/v1/accounts/settings`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),
  };
  pnL = {
    /**
     * No description
     *
     * @tags PnL
     * @name PnlControllerGetActivePnlPositions
     * @summary Get the active PnL position of a user for a market
     * @request GET:/v1/pnl/positions/active
     */
    pnlControllerGetActivePnlPositions: (
      query: {
        userAddress: string;
        accountId: number;
        marketId?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ActivePnlPositionResponse[], any>({
        path: `/v1/pnl/positions/active`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags PnL
     * @name PnlControllerGetClosedPnlPositions
     * @summary Get the closed PnL positions of a user for a market
     * @request GET:/v1/pnl/positions/closed
     */
    pnlControllerGetClosedPnlPositions: (
      query: {
        userAddress: string;
        accountId: number;
        marketId?: number;
        /**
         * Maximum number of results to return. The parameter is capped at 100.
         * @default 10
         */
        limit?: number;
        /**
         * Maximum number of results to skip.
         * @default 0
         */
        skip?: number;
        /**
         * Sort by field: 1 for ascending, -1 for descending. Allowed fields: timeClosed, positionSize, avgFixedApr, avgUnderlyingApr, pnl. Default to timeClosed:-1
         * @default "timeClosed:-1"
         * @example "timeClosed:-1"
         */
        orderBy?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ClosedPnlPositionsResponse, any>({
        path: `/v1/pnl/positions/closed`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags PnL
     * @name PnlControllerGetPnlTransactions
     * @summary Get the PnL transactions of a user for a market
     * @request GET:/v1/pnl/transactions
     */
    pnlControllerGetPnlTransactions: (
      query: {
        userAddress: string;
        accountId: number;
        marketId?: number;
        /**
         * Maximum number of results to return. The parameter is capped at 100.
         * @default 10
         */
        limit?: number;
        /**
         * Maximum number of results to skip.
         * @default 0
         */
        skip?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<PnlTransactionsResponse, any>({
        path: `/v1/pnl/transactions`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags PnL
     * @name PnlControllerGetHistoricalPnlChart
     * @summary Get historical PnL of a user for a market
     * @request GET:/v1/pnl/historical-chart
     */
    pnlControllerGetHistoricalPnlChart: (
      query: {
        userAddress: string;
        marketId: number;
        accountId: number;
        /**
         * Time frame { FIVE_MINUTES : 5m, ONE_HOUR : 1h, ONE_DAY : 1d, ONE_WEEK : 1w }
         * @default "1h"
         */
        timeFrame?: "5m" | "1h" | "1d" | "1w";
        /**
         * Start timestamp, default to 0
         * @default 0
         */
        startTimestamp?: number;
        /**
         * End timestamp, default to MAX_SAFE_INTEGER
         * @default 1748592740
         */
        endTimestamp?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<HistoricalPnlChartResponse[], any>({
        path: `/v1/pnl/historical-chart`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags PnL
     * @name PnlControllerGetLimitOrders
     * @summary Get limit orders
     * @request GET:/v1/pnl/limit-orders
     */
    pnlControllerGetLimitOrders: (
      query: {
        userAddress: string;
        accountId: number;
        marketId?: number;
        /**
         * Maximum number of results to skip.
         * @default 0
         */
        skip?: number;
        /**
         * Maximum number of results to return. The parameter is capped at 100.
         * @default 10
         */
        limit?: number;
        /** Is active */
        isActive?: boolean;
        /** OrderType { LIMIT : 0, MARKET : 1 } */
        orderType?: 0 | 1;
        /**
         * Sort by field: 1 for ascending, -1 for descending. Allowed fields: blockTimestamp, side, placedSize, unfilledSize, impliedApr, status, orderType. Default to blockTimestamp:-1
         * @default "blockTimestamp:-1"
         * @example "blockTimestamp:-1"
         */
        orderBy?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<LimitOrdersResponse, any>({
        path: `/v1/pnl/limit-orders`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  settlement = {
    /**
     * No description
     *
     * @tags Settlement
     * @name SettlementControllerGetSettlements
     * @summary Get the settlements of a user for a market
     * @request GET:/v1/settlement/settlements
     */
    settlementControllerGetSettlements: (
      query: {
        /**
         * Maximum number of results to return. The parameter is capped at 100.
         * @default 10
         */
        limit?: number;
        /**
         * Maximum number of results to skip.
         * @default 0
         */
        skip?: number;
        userAddress: string;
        accountId: number;
        marketId?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<SettlementsResponse, any>({
        path: `/v1/settlement/settlements`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  collaterals = {
    /**
     * No description
     *
     * @tags Collaterals
     * @name CollateralControllerGetAllCollateralSummary
     * @summary get all collateral summary
     * @request GET:/v1/collaterals/summary
     */
    collateralControllerGetAllCollateralSummary: (
      query: {
        userAddress: string;
        accountId: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<AllCollateralSummaryResponse, any>({
        path: `/v1/collaterals/summary`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Collaterals
     * @name CollateralControllerGetSingleCollateral
     * @summary get single collateral
     * @request GET:/v1/collaterals/summary/single
     */
    collateralControllerGetSingleCollateral: (
      query: {
        userAddress: string;
        accountId: number;
        tokenId: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<CollateralSummaryResponse, any>({
        path: `/v1/collaterals/summary/single`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  portfolio = {
    /**
     * No description
     *
     * @tags Portfolio
     * @name PortfolioControllerGetBalanceChart
     * @summary Get balance chart
     * @request GET:/v1/portfolios/balance-chart
     */
    portfolioControllerGetBalanceChart: (
      query: {
        userAddress: string;
        accountId: number;
        /** Balance chart time { SEVEN_DAYS : 7d, THIRTY_DAYS : 30d, SIXTY_DAYS : 60d, NINETY_DAYS : 90d, ALL_TIME : all } */
        time: "7d" | "30d" | "60d" | "90d" | "all";
        /** if not provided, will return balance of all collateral */
        tokenId: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<BalanceChartResponse, any>({
        path: `/v1/portfolios/balance-chart`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Portfolio
     * @name PortfolioControllerGetBalanceChartAllTokens
     * @summary Get balance chart for all tokens
     * @request GET:/v1/portfolios/balance-chart/all
     */
    portfolioControllerGetBalanceChartAllTokens: (
      query: {
        userAddress: string;
        accountId: number;
        /** Balance chart time { SEVEN_DAYS : 7d, THIRTY_DAYS : 30d, SIXTY_DAYS : 60d, NINETY_DAYS : 90d, ALL_TIME : all } */
        time: "7d" | "30d" | "60d" | "90d" | "all";
      },
      params: RequestParams = {},
    ) =>
      this.request<BalanceChartAllTokensResponse, any>({
        path: `/v1/portfolios/balance-chart/all`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  playground = {
    /**
     * No description
     *
     * @tags Playground
     * @name PlaygroundControllerGetMarketOrderLogs
     * @summary Get market order logs
     * @request GET:/v1/playground/market-order-logs
     */
    playgroundControllerGetMarketOrderLogs: (
      query: {
        txHash: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<MarketOrderLogResponse, any>({
        path: `/v1/playground/market-order-logs`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  referral = {
    /**
     * No description
     *
     * @tags Referral
     * @name ReferralControllerGetUserReferralInfo
     * @summary Get user referral details by user address
     * @request GET:/v1/referrals/{userAddress}
     */
    referralControllerGetUserReferralInfo: (userAddress: string, params: RequestParams = {}) =>
      this.request<GetUserReferralInfoResponse, any>({
        path: `/v1/referrals/${userAddress}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Referral
     * @name ReferralControllerCreateReferralCode
     * @summary create referral code for user address
     * @request POST:/v1/referrals/{userAddress}
     */
    referralControllerCreateReferralCode: (
      userAddress: string,
      data: CreateReferralBodyDto,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/v1/referrals/${userAddress}`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Referral
     * @name ReferralControllerCheckReferralExist
     * @summary check if referral code exists
     * @request POST:/v1/referrals/check-exist
     */
    referralControllerCheckReferralExist: (data: CheckReferralExistBodyDto, params: RequestParams = {}) =>
      this.request<CheckReferralExistResponse, any>({
        path: `/v1/referrals/check-exist`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Referral
     * @name ReferralControllerJoinReferralCode
     * @summary join by referral code
     * @request POST:/v1/referrals/{userAddress}/join
     */
    referralControllerJoinReferralCode: (userAddress: string, data: JoinReferralBodyDto, params: RequestParams = {}) =>
      this.request<JoinReferralResponse, any>({
        path: `/v1/referrals/${userAddress}/join`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Referral
     * @name ReferralControllerGetReferralActivities
     * @summary get all referree activities by user address
     * @request GET:/v1/referrals/{userAddress}/referral-activities
     */
    referralControllerGetReferralActivities: (userAddress: string, params: RequestParams = {}) =>
      this.request<ReferralActivitiesResponse, any>({
        path: `/v1/referrals/${userAddress}/referral-activities`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Referral
     * @name ReferralControllerGetReferralRewards
     * @summary get referral rewards by user address
     * @request GET:/v1/referrals/{userAddress}/referral-rewards
     */
    referralControllerGetReferralRewards: (userAddress: string, params: RequestParams = {}) =>
      this.request<ReferralRewardResponse, any>({
        path: `/v1/referrals/${userAddress}/referral-rewards`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  admin = {
    /**
     * No description
     *
     * @tags Admin
     * @name AdminControllerTransferMockToken
     * @request POST:/v1/admin/faucet
     * @secure
     */
    adminControllerTransferMockToken: (data: FaucetDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/v1/admin/faucet`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
}
