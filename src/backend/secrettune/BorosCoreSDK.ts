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

export interface IndicatorsMetadata {
  /** Requested indicators */
  requested: string[];
  /** Available indicators (may be less than requested if no data) */
  available: string[];
  /**
   * First timestamp with data for each indicator (helps frontend show "No data before X")
   * @example {"u":1700000000,"fp":1700003600,"udma":1700604800}
   */
  firstDataTimestamp?: object;
}

export interface FGIData {
  /** Fear & Greed Index value (0-100) */
  v: number;
  /** Value classification */
  vc: string;
}

export interface IndicatorDataPoint {
  /** Timestamp (Unix seconds) */
  ts: number;
  /** Underlying APR */
  u?: number;
  /** Future premium */
  fp?: number;
  /** Fear & Greed Index */
  fgi?: FGIData;
  /**
   * Underlying Day Moving Averages (periods as keys)
   * @example {"7":0.14,"30":0.13}
   */
  udma?: object;
}

export interface IndicatorsResponse {
  /** Response metadata */
  metadata: IndicatorsMetadata;
  /** Indicator data points */
  results: IndicatorDataPoint[];
}

export interface FundingRateHistoryResponse {
  /**
   * Start timestamp (Unix seconds). 168 hourly points, ts[i] = startTimestamp + i * 3600
   * @example 1702800000
   */
  startTimestamp: number;
  /**
   * Funding rate values by symbol (annualized %, 168 hourly points)
   * @example {"hyperliquid-btc":[0.12,0.13,0.14],"BTCUSDT":[0.08,0.09,0.1]}
   */
  data: Record<string, (number | null)[]>;
}

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
  /** Soft OI cap of the market */
  softOICap?: number;
  /** CLO lower threshold of the market */
  cloLowerThresh?: number;
  /** CLO upper threshold of the market */
  cloUpperThresh?: number;
}

export interface MarketExtendedConfigResponse {
  /**
   * Amm address
   * @deprecated
   */
  ammAddress?: string;
  /**
   * Amm id
   * @deprecated
   */
  ammId?: number;
  /**
   * Is positive amm
   * @deprecated
   */
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
  /** Asset symbol of the market */
  assetSymbol: string;
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
  /** Link to realtime funding rate */
  realtimeFundingRateLink: string;
  /** Is dev test */
  isDevTest: boolean;
  /** Amm address */
  ammAddress?: string;
  /** Amm id */
  ammId?: number;
  /** Is positive amm */
  isPositiveAMM?: boolean;
  /**
   * Disabled chart indicators
   * @example ["quaterlyFuturePremium","underlyingApr7dma"]
   */
  disabledChartIndicators?: (
    | 'realtimeUnderlyingApr'
    | 'oracleUnderlyingApr'
    | 'underlyingApr7dma'
    | 'quaterlyFuturePremium'
    | 'notionalVolume'
    | 'underlyingApr30dma'
  )[];
  /** Accent color of the market */
  accentColor: string;
  /** Internal market name (e.g., BTCUSDT-BN-T-250926) */
  marketName?: string;
}

export interface MarketDataResponse {
  volume24h: number;
  notionalOI: number;
  /** TWAP apr of the market */
  markApr: number;
  /** last traded apr of the market */
  lastTradedApr: number;
  midApr: number;
  /** Best bid APR from order book */
  bestBid?: number;
  /** Best ask APR from order book */
  bestAsk?: number;
  /** AMM implied APR */
  ammImpliedApr?: number;
  floatingApr: number;
  longYieldApr?: number;
  nextSettlementTime?: number;
  timeToMaturity?: number;
  assetMarkPrice: number;
  /** Real-time 7-day moving average funding rate */
  b7dmafr?: number;
  /** Real-time 30-day moving average funding rate */
  b30dmafr?: number;
}

export interface MarketPlatformResponse {
  /** Platform name */
  name: string;
  /** Platform ID */
  platformId: string;
  /** Platform accent color */
  accentColor: string;
  /** Platform icon */
  icon: string;
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
  platform?: MarketPlatformResponse;
  /** State of the market */
  state: 'Paused' | 'Capped' | 'Normal' | 'Halted';
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
  /** Mark Rate */
  mr: number;
  /** Oracle Funding Rate */
  ofr: number;
  /** 7DMA Realtime Funding Rate */
  b7dmafr: number;
  /** 30DMA Realtime Funding Rate */
  b30dmafr: number;
  /** Future Premium */
  fp: number;
}

export interface ChartResponse {
  results: CandleResponse[];
}

export interface CandleResponseV2 {
  /** Period start timestamp */
  ts: number;
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
  /** Mark Rate */
  mr: number;
  /** Oracle Funding Rate */
  ofr: number;
}

export interface ChartResponseV2 {
  results: CandleResponseV2[];
}

export interface HistoricalDataResponse {
  /** Period start timestamp */
  ts: number;
  /** Underlying APR */
  u: number;
  /** Future premium */
  fp: number;
  /** 7-day moving average funding rate */
  b7dmafr?: number;
  /** 30-day moving average funding rate */
  b30dmafr?: number;
}

export interface HistoricalDataChartResponse {
  results: HistoricalDataResponse[];
}

export interface HistoricalUnderlyingAPRResponse {
  /** Period start timestamp */
  ts: number;
  /** Underlying APR */
  u: number;
  /** 7-day moving average funding rate */
  b7dmafr?: number;
  /** 30-day moving average funding rate */
  b30dmafr?: number;
}

export interface HistoricalUnderlyingAPRChartResponse {
  results: HistoricalUnderlyingAPRResponse[];
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

export interface AllTimeRewardsDto {
  /** pendle token rewards amount */
  pendleRewards: number;
  /** swap fee in collateral asset rewards amount */
  swapFeeRewards: number;
}

export interface UserVaultInfo {
  /** user deposit */
  depositValue: string;
  /** user unclaimed rewards */
  unclaimedRewards: string;
  /** user all time rewards */
  allTimeRewards: AllTimeRewardsDto;
  /** bigint string of total lp */
  totalLp: string;
  /** avg lp price */
  avgLpPrice: number;
  /** bigint string of available balance to deposit */
  availableBalanceToDeposit: string;
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
  /** bigint string of total supply cap */
  totalSupplyCap: string;
  /** lp apy */
  lpApy: number;
  /** lp price */
  lpPrice: number;
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
  /** Fees APR */
  feesApr: number;
  /** Rewards APR */
  rewardsApr: number;
  /** LP Price */
  lpPrice: number;
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

export type Function = object;

export interface GetAMMInfoByAmmIdResponse {
  state: AMMStateResponse;
  isPositive: boolean;
  feeRate: string;
  impliedRate: Function;
}

export interface GetUserRewardResponse {
  /** accrued amm rewards amount in usd */
  accruedAmountInUsd: number;
  /** unclaimable amm rewards amount in usd */
  unclaimedAmountInUsd: number;
}

export interface UserMerkleResponse {
  /**
   * The array of token addresses that user is eligible for
   * @example ["0x1234567890123456789012345678901234567890","0x1234567890123456789012345678901234567891"]
   */
  tokens: string[];
  /**
   * The amount of tokens that user is eligible for
   * @example 100
   */
  accruedAmounts: string[];
  /**
   * The proof of the user's eligibility
   * @example [["0x1234567890123456789012345678901234567890"],["0x1234567890123456789012345678901234567891"]]
   */
  proofs: string[][];
}

export interface DepositStateResponse {
  /** bigint string of collateral balance */
  collateralBalance: string;
  /** bigint string of maintenance margin */
  maintenanceMargin: string;
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
  /** bigint string of maintenance margin */
  maintenanceMargin: string;
  /** margin ratio */
  marginRatio: number;
}

export interface CashTransferPrePostSimulationResponse {
  preUserState: CashTransferStateResponse;
  postUserState: CashTransferStateResponse;
}

export interface FeeBreakdownResponse {
  /** bigint string of market entrance fee */
  marketEntranceFee?: string;
  /** bigint string of taker otc fee */
  takerOtcFee?: string;
  /** bigint string of vault deposit fee */
  vaultDepositFee?: string;
  /** bigint string of vault withdrawal fee */
  vaultWithdrawalFee?: string;
  /** bigint string of ops fee */
  opsFee?: string;
  /** market entrance fee in USD */
  marketEntranceFeeInUSD?: number;
  /** taker otc fee in USD */
  takerOtcFeeInUSD?: number;
  /** vault deposit fee in USD */
  vaultDepositFeeInUSD?: number;
  /** vault withdrawal fee in USD */
  vaultWithdrawalFeeInUSD?: number;
  /** ops fee in USD */
  opsFeeInUSD?: number;
}

export interface CashTransferSimulationResponse {
  crossAccState: CashTransferPrePostSimulationResponse;
  isolatedAccState: CashTransferPrePostSimulationResponse;
  feeBreakdown: FeeBreakdownResponse;
}

export interface ContractSwapPositionResponse {
  /** bigint string of size */
  size: string;
  /** bigint string of cost */
  cost: string;
  /** rate */
  rate: number;
}

export interface PlaceOrderSimulationResponseV2 {
  /** bigint string of active position size */
  preUserInfoActivePositionSize: string;
  matched: ContractSwapPositionResponse;
  /** bigint string of margin required */
  marginRequired: string;
  /** liquidation apr, can be undefined */
  liquidationApr?: number;
  /** price impact */
  priceImpact: number;
  /**
   * bigint string of fee
   * @deprecated
   */
  fee: string;
  feeBreakdown: FeeBreakdownResponse;
  /** actual leverage */
  actualLeverage: number;
  /** status */
  status: string;
  /** maker order rewards in Pendle */
  makerOrderReward: number;
  /** long yield apr */
  longYieldApr: number;
}

export interface CancelOrderSimulationResponse {
  feeBreakdown: FeeBreakdownResponse;
}

export interface AddLiquiditySingleCashStateResponse {
  /** bigint string of net lp out */
  collateralBalance: string;
  /** margin ratio */
  marginRatio: number;
  /** bigint string of total lp */
  totalLp: string;
  /** Corresponding collateral amount of LP tokens */
  lpAmountInCollateral: number;
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
  feeBreakdown: FeeBreakdownResponse;
}

export interface RemoveLiquiditySingleCashStateResponse {
  /** bigint string of collateral balance */
  collateralBalance: string;
  /** margin ratio */
  marginRatio: number;
  /** bigint string of total lp */
  totalLp: string;
  /** Corresponding collateral amount of LP tokens */
  lpAmountInCollateral: number;
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
  feeBreakdown: FeeBreakdownResponse;
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
  /** Asset origin pro symbol */
  originProSymbol: string;
  /** Asset token icon */
  tokenIcon: string;
  /** Asset zone icon */
  zoneIcon: string;
  /**
   * Asset is denomination unit
   * @example true
   */
  isDenominationUnit: boolean;
  /**
   * Asset is dev test
   * @example true
   */
  isDevTest: boolean;
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
  /**
   * Is collateral asset
   * @example true
   */
  isCollateral: boolean;
}

export interface AssetsResponse {
  assets: AssetResponse[];
}

export interface PriceDataV1 {
  /**
   * Asset symbol
   * @example "BTC"
   */
  symbol: string;
  /**
   * Asset price in USD
   * @example "43500.50"
   */
  price: string;
  /**
   * Timestamp in seconds
   * @example 1499040000
   */
  timestamp: number;
}

export interface HistoricalPriceV1Response {
  /**
   * Asset symbol
   * @example "BTC"
   */
  symbol: string;
  /** Array of historical price data */
  data: PriceDataV1[];
}

export interface PriceData {
  /**
   * Asset price in USD
   * @example "43500.50"
   */
  price: string;
  /**
   * Timestamp in seconds
   * @example 1499040000
   */
  timestamp: number;
}

export interface HistoricalPriceResponse {
  /**
   * Asset symbol
   * @example "BTC"
   */
  symbol: string;
  /** Array of historical price data */
  data: PriceData[];
}

export interface GetCalldataResponse {
  data: string;
  from: string;
  to: string;
  gas: string;
}

export interface BulkAgentExecuteParamsResponseV2 {
  /** calldatas */
  calldatas: string[];
}

export interface SingleOrder {
  marketAcc: string;
  marketId: number;
  /** Side { LONG : 0, SHORT : 1 } */
  side: 0 | 1;
  /** sizes */
  size: string;
  /** limit ticks */
  limitTick: number;
  /** TimeInForce { GOOD_TIL_CANCELLED : 0, IMMEDIATE_OR_CANCEL : 1, FILL_OR_KILL : 2, ADD_LIQUIDITY_ONLY : 3, SOFT_ADD_LIQUIDITY_ONLY : 4 } */
  tif: 0 | 1 | 2 | 3 | 4;
  /** ammId */
  ammId?: number;
  /** slippage */
  slippage?: number;
}

export interface CancelData {
  /** ids to cancel */
  ids: string[];
  /** is all */
  isAll: boolean;
  /** is strict */
  isStrict: boolean;
}

export interface LongShortData {
  /** sizes */
  sizes: string[];
  /** limit ticks */
  limitTicks: number[];
  /** TimeInForce { GOOD_TIL_CANCELLED : 0, IMMEDIATE_OR_CANCEL : 1, FILL_OR_KILL : 2, ADD_LIQUIDITY_ONLY : 3, SOFT_ADD_LIQUIDITY_ONLY : 4 } */
  tif: 0 | 1 | 2 | 3 | 4;
  /** Side { LONG : 0, SHORT : 1 } */
  side: 0 | 1;
}

export interface BulkOrder {
  marketId: number;
  cancelData: CancelData;
  orders: LongShortData;
}

export interface BulkOrders {
  cross: boolean;
  bulks: BulkOrder[];
  /** slippage */
  slippage?: number;
}

export interface OrderRequest {
  singleOrder?: SingleOrder;
  bulkOrder?: BulkOrders;
}

export interface BulkPlaceOrderQueryDtoV5 {
  orderRequests?: OrderRequest[];
}

export interface BulkPlaceOrderQueryDtoV4 {
  singleOrders?: SingleOrder[];
  bulkOrders?: BulkOrders[];
}

export interface BulkPlaceOrderQueryDtoV2 {
  /** bigint string of amount to pay treasury */
  payTreasuryAmount?: string;
  marketAcc: string;
  marketId: number;
  /** Side[] { LONG : 0, SHORT : 1 } */
  sides: (0 | 1)[];
  /** sizes */
  sizes: string[];
  /** limit ticks */
  limitTicks: number[];
  /** TimeInForce { GOOD_TIL_CANCELLED : 0, IMMEDIATE_OR_CANCEL : 1, FILL_OR_KILL : 2, ADD_LIQUIDITY_ONLY : 3, SOFT_ADD_LIQUIDITY_ONLY : 4 } */
  tif: 0 | 1 | 2 | 3 | 4;
  /** ammId */
  ammId?: number;
  /** slippage */
  slippage?: number;
}

export interface AgentExecuteParams {
  calldata: string;
  accountId: string;
}

export interface BulkAgentExecuteParamsResponseV3 {
  executeParams: AgentExecuteParams[];
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

export interface AccountGasBalanceResponse {
  /** Account gas balance in USD */
  balanceInUSD: number;
}

export interface GasConsumptionResponse {
  /** Action type */
  actionType: string;
  /** User address */
  userAddress: string;
  /** Gas fee */
  gasFee: number;
  /** Gas fee v2 */
  gasFeeV2: number;
  /** Transaction hash */
  txHash: string;
  /** The block timestamp of the gas consumption, in seconds */
  blockTimestamp: number;
}

export interface AccountGasConsumptionHistoryResponse {
  results: GasConsumptionResponse[];
  total: number;
}

export interface SetAgentSessionDto {
  userAddress: string;
  signature: string;
  agent: string;
  timestamp: number;
  publicKey: string;
}

export interface AgentSessionResponse {
  /** The timestamp when the session expires, in seconds */
  expiresTimestamp: number;
}

export interface AgentSessionQueryDto {
  /** Root address */
  root: string;
  /** Agent address */
  agent: string;
  /** Timestamp in seconds */
  timestamp: number;
  /** Signature */
  signature: string;
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
  txType: 'normal' | 'liquidate' | 'force_deleverage';
  /** TradeDirection { INCREASE : 0, DECREASE : 1, CHANGE_DIRECTION : 2 } */
  tradeDirection: 0 | 1 | 2;
  /** bigint string of notional size */
  notionalSize: string;
  /** bigint string of trade value */
  tradeValue: string;
  /** Close APR */
  fixedApr: number;
  /** Entry APR, only for decrease position size */
  entryApr?: number;
  /** PnL percentage */
  pnlPercentage?: number;
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
  /** OrderType { LIMIT : 0, MARKET : 1, TAKE_PROFIT_MARKET : 2, STOP_LOSS_MARKET : 3 } */
  orderType: 0 | 1 | 2 | 3;
  /** The block timestamp of the order placement, in seconds */
  blockTimestamp: number;
  /** The event index when the order was placed */
  placedEventIndex: number;
  /** The timestamp when the order was placed, in seconds */
  placedTimestamp: number;
  /** Account position */
  marketAcc: string;
  metadata?: LimitOrderMetadataResponse;
}

export interface LimitOrdersResponse {
  results: LimitOrderResponse[];
  total: number;
}

export interface LimitOrderMetadataResponseV2 {
  /** Is rate improved */
  isRateImproved: boolean;
  /** Is close position */
  isClosePosition: boolean;
}

export interface LimitOrderResponseV2 {
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
  /** LimitOrderStatus { Cancelled : 1, FullyFilled : 2, Expired : 3, Purged : 4, Filling : 0, Pending : 5, Executing : 6, Retrying : 7, Failed : 8 } */
  status: 1 | 2 | 3 | 4 | 0 | 5 | 6 | 7 | 8;
  /** OrderType { LIMIT : 0, MARKET : 1, TAKE_PROFIT_MARKET : 2, STOP_LOSS_MARKET : 3 } */
  orderType: 0 | 1 | 2 | 3;
  /** The block timestamp of the order placement, in seconds */
  blockTimestamp: number;
  /** The last updated event index */
  eventIndex: number;
  /** The event index when the order was placed */
  placedEventIndex: number;
  /** The timestamp when the order was placed, in seconds */
  placedTimestamp: number;
  /** Account position */
  marketAcc: string;
  metadata?: LimitOrderMetadataResponseV2;
}

export interface LimitOrdersResponseV2 {
  results: LimitOrderResponseV2[];
  total: number;
}

export interface FundLocationResponse {
  /** FundType { Wallet : wallet, CrossAccount : cross_account, IsolatedAccount : isolated_account, AMM : amm } */
  fundType: 'wallet' | 'cross_account' | 'isolated_account' | 'amm';
  /** The market id */
  marketId?: number;
}

export interface TransferLogResponse {
  /** The transfer log id */
  transferLogId: string;
  /** The block timestamp */
  blockTimestamp: number;
  /** The root address */
  root: string;
  /** The account id */
  accountId: number;
  /** The token id */
  tokenId: number;
  /** The amount */
  amount: string;
  /** The from fund location */
  fromFundLocation: FundLocationResponse;
  /** The to fund location */
  toFundLocation: FundLocationResponse;
  /** TransferLogStatus { Pending : pending, Success : success, Failed : failed } */
  status: 'pending' | 'success' | 'failed';
}

export interface TransferLogsResponse {
  /** Total number of transfer logs */
  total: number;
  results: TransferLogResponse[];
}

export interface SharePositionPnlResponse {
  /** Share position PnL percentage */
  pnlPercentage: number;
  /** Settled percentage */
  settledProgressPercentage: number;
  /** Settled PnL percentage */
  settledPnlPercentage: number;
  /** Average paid APR */
  avgPaidApr: number;
  /** Average received APR */
  avgReceivedApr: number;
  /** Unrealized PnL percentage */
  unrealizedPnlPercentage: number;
  /** Entry implied APR */
  entryImpliedApr: number;
  /** Current implied APR */
  currentImpliedApr: number;
  /** Since open settled progress percentage */
  sinceOpenSettledProgressPercentage: number;
  /** Since open average paid APR */
  sinceOpenAvgPaidApr: number;
  /** Since open average received APR */
  sinceOpenAvgReceivedApr: number;
  /** Since open settled PnL percentage */
  sinceOpenSettledPnlPercentage: number;
  /** Since open PnL percentage */
  sinceOpenPnlPercentage: number;
}

export interface MarketAccCumulativePnlResponse {
  /** Cumulative Realized Trade PnL as bigint string */
  cumulativeTradePnl: string;
}

export interface MaturedPositionResponse {
  /** Market ID */
  marketId: number;
  /** Root address */
  root: string;
  /** Account ID */
  accountId: number;
  /** Market account */
  marketAcc: string;
  /** PnL as string */
  pnl: string;
  /** Max capital as string */
  maxCapital: string;
  /** PnL percentage */
  pnlPercentage: number;
  /** Average settlement paid */
  avgSettlementPaid?: number;
  /** Average settlement received */
  avgSettlementReceived?: number;
}

export interface MaturedPositionsResponse {
  results: MaturedPositionResponse[];
  /** Total number of matured positions */
  total: number;
}

export interface PositionInSyncResponse {
  /** Position ID */
  id: string;
  /** Event index */
  eventIndex: number;
  /** Market ID */
  marketId: number;
  /** Block timestamp */
  blockTimestamp: number;
  /** Root address */
  root: string;
  /** Account ID */
  accountId: number;
  /** Market account */
  marketAcc: string;
  /** Fixed rate (f) */
  f: string;
  /** Position size (s) */
  s: string;
  /** Position size as number */
  sNumber: number;
  /** Notional size */
  notionalSize: string;
  /** PnL from last time the position was opened */
  pnl: string;
  /** All time cumulative PnL */
  cumulativePnl: string;
  /** Event index when position was opened */
  openFromEventIndex: number;
  /** Sync status */
  syncStatus: number;
}

export interface PositionsInSyncResponse {
  results: PositionInSyncResponse[];
  /** Total number of positions */
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

export interface PositionValueResponse {
  /** bigint string of settled position value */
  settledPosition: string;
  /** bigint string of remaining position value */
  remainingPosition: string;
}

export interface PnlResponse {
  /** bigint string of rate settlement PnL */
  rateSettlementPnl: string;
  /** bigint string of since open rate settlement PnL */
  sinceOpenRateSettlementPnl: string;
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
  /** bigint string of long available balance */
  longAvailableBalance: string;
  /** bigint string of short available balance */
  shortAvailableBalance: string;
  /** bigint string of long initial margin */
  longInitialMargin: string;
  /** bigint string of short initial margin */
  shortInitialMargin: string;
  /** bigint string of position initial margin */
  positionInitialMargin: string;
  /** all time settled progress percentage */
  settledProgressPercentage: number;
  /** since open settled progress percentage */
  sinceOpenSettledProgressPercentage: number;
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

export interface WithdrawalResponse {
  /** last timestamp when the token is requesting to withdraw from cross margin account */
  lastWithdrawalRequestTime: number;
  /** bigint string of last withdrawal amount */
  lastWithdrawalAmount: string;
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
  /** withdrawal info from cross margin account */
  withdrawal: WithdrawalResponse;
}

export interface AllCollateralSummaryResponse {
  /** List all collateral summary */
  collaterals: CollateralSummaryResponse[];
}

export interface DepositBoxAssetResponse {
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
  /**
   * Is collateral asset
   * @example true
   */
  isCollateral: boolean;
  /** Chain ID */
  chainId: number;
  /** Destination token ID for filtering by account collateral type. Null means can deposit to any collateral. */
  dstTokenId?: number;
}

export interface DepositBoxAssetsResponse {
  assets: DepositBoxAssetResponse[];
}

export interface AssetBalanceResponse {
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
  /**
   * Is collateral asset
   * @example true
   */
  isCollateral: boolean;
  /** Asset balance */
  balance: string;
}

export interface GetDepositBoxBalancesResponse {
  assets: AssetBalanceResponse[];
}

export interface PrepareDepositFromBoxDto {
  /** User address */
  root: string;
  /** Account ID */
  accountId: number;
  /** Token ID */
  tokenId: number;
  /** Market ID */
  marketId: number;
  /** Token spent */
  tokenSpent: string;
  /** Amount spent */
  amountSpent: string;
  /** Deposit amount */
  depositAmount: string;
  /** Min deposit amount */
  minDepositAmount: string;
  extRouter?: string;
  extCalldata?: string;
}

export interface PrepareDepositFromBoxMessage {
  root: string;
  boxId: number;
  tokenSpent: string;
  maxAmountSpent: string;
  accountId: number;
  tokenId: number;
  marketId: number;
  minDepositAmount: string;
  payTreasuryAmount: string;
  swapExtRouter: string;
  swapApprove: string;
  swapCalldata: string;
  expiry: string;
  salt: string;
}

export interface PrepareDepositFromBoxMessageResponse {
  message: PrepareDepositFromBoxMessage;
  feeBreakdown: FeeBreakdownResponse;
  preUserState: DepositStateResponse;
  postUserState: DepositStateResponse;
  minReceived: string;
}

export interface QuoteBscBridgeDto {
  /** From token */
  fromToken: string;
  /** To token */
  toToken: string;
  /** Amount */
  amount: string;
  /** From address */
  fromAddress: string;
}

export interface QuoteBscTransactionDto {
  /** From address */
  from: string;
  /** Target contract address on BSC */
  to: string;
  /** Value to send with transaction */
  value: string;
  /** Calldata for BSC bridge transaction */
  calldata: string;
}

export interface QuoteBscBridgeTokenAmountResponse {
  /** Token */
  token: string;
  /** Amount */
  amount: string;
}

export interface QuoteBscBridgeFeeResponse {
  /** Fee name */
  name: string;
  /** Chain ID */
  chainId: number;
  /** Token address */
  token: string;
  /** Fee amount */
  amount: string;
  /** Fee amount in USD */
  amountUsd: number;
}

export interface QuoteBscBridgeResponse {
  tx: QuoteBscTransactionDto;
  tokenApproval: QuoteBscBridgeTokenAmountResponse;
  /** From token */
  fromToken: string;
  /** From amount */
  fromAmount: string;
  /** To token */
  toToken: string;
  /** To amount */
  toAmount: string;
  /** Min to amount */
  minToAmount: string;
  /** Fee costs */
  feeCosts: QuoteBscBridgeFeeResponse[];
  /** Gas fee */
  gasCosts: QuoteBscBridgeFeeResponse[];
}

export interface GetDepositBoxIdResponse {
  /** Deposit box id */
  boxId: number;
}

export interface DepositFromBoxMessageDto {
  root: string;
  boxId: number;
  tokenSpent: string;
  maxAmountSpent: string;
  accountId: number;
  tokenId: number;
  marketId: number;
  minDepositAmount: string;
  payTreasuryAmount: string;
  swapApprove: string;
  swapExtRouter: string;
  swapCalldata: string;
  expiry: string;
  salt: string;
}

export interface DepositBoxIntentRouteDataDto {
  tool: string;
  aggregatorName: 'LIFI' | 'BOROS' | 'PENDLE';
  tags: ('cheapest' | 'fastest')[];
  estimatedDuration: number;
  gasFeeUsd: number;
  logoUrl: string;
}

export interface CreateDepositBoxIntentDto {
  account: string;
  /** EIP-712 signature */
  signature: string;
  /** Agent address */
  agent: string;
  /** Timestamp */
  timestamp: number;
  /** From chain ID */
  fromChainId: number;
  fromToken: string;
  fromAmount: string;
  depositAmount: string;
  minAmountSpent: string;
  message: DepositFromBoxMessageDto;
  depositFromBoxSignature: string;
  extraData?: DepositBoxIntentRouteDataDto;
  agentSession: AgentSessionQueryDto;
}

export interface CreateDepositBoxIntentResponse {
  /** Deposit box intent id */
  id: string;
}

export interface PatchDepositBoxIntentBridgingDto {
  account: string;
  /** EIP-712 signature */
  signature: string;
  /** Agent address */
  agent: string;
  /** Timestamp */
  timestamp: number;
  bridgeTxHash: string;
}

export interface PatchWithdrawIntentResponse {
  /** Message */
  message: string;
}

export interface PatchDepositBoxIntentCanceledDto {
  account: string;
  /** EIP-712 signature */
  signature: string;
  /** Agent address */
  agent: string;
  /** Timestamp */
  timestamp: number;
}

export interface DepositBoxIntentExtraDataResponse {
  /** Tool */
  tool: string;
  /** Aggregator name */
  aggregatorName: 'LIFI' | 'BOROS' | 'PENDLE';
  /** Tags */
  tags: ('cheapest' | 'fastest')[];
  /** Estimated duration */
  estimatedDuration: number;
  /** Gas fee in USD */
  gasFeeUsd: number;
  /** Logo URL */
  logoUrl: string;
}

export interface GetDepositBoxIntentResponse {
  /** Deposit box intent id */
  id: string;
  /** Root */
  root: string;
  /** Account id */
  accountId: number;
  /** Market id */
  marketId: number;
  /** Deposit box id */
  boxId: number;
  /** From chain id */
  fromChainId: number;
  /** From token */
  fromToken: string;
  /** From amount */
  fromAmount: string;
  /** Token id */
  tokenId: number;
  /** To amount */
  depositAmount: string;
  /** Min to amount */
  minDepositAmount: string;
  /** Min amount spent */
  minAmountSpent: string;
  /** Pay treasury amount */
  payTreasuryAmount: string;
  /** Expiry */
  expiry: string;
  /** Deposit box intent status */
  status: 'pending' | 'bridging' | 'arrived' | 'done' | 'failed' | 'expired' | 'canceled';
  extraData?: DepositBoxIntentExtraDataResponse;
  /** Whether the failed intent is recoverable */
  isRecoverable?: boolean;
}

export interface GetDepositBoxIntentsResponse {
  intents: GetDepositBoxIntentResponse[];
}

export interface CreateWithdrawIntentDto {
  account: string;
  /** EIP-712 signature */
  signature: string;
  /** Agent address */
  agent: string;
  /** Timestamp */
  timestamp: number;
  root: string;
  tokenId: number;
  unscaledAmount: string;
  dstToken: string;
  dstChainId: number;
}

export interface PatchWithdrawIntentBridgedDto {
  account: string;
  /** EIP-712 signature */
  signature: string;
  /** Agent address */
  agent: string;
  /** Timestamp */
  timestamp: number;
  bridgeTxHash: string;
  aggregatorName: ('LIFI' | 'BOROS' | 'PENDLE')[];
  root: string;
}

export interface PatchWithdrawIntentDoneDto {
  account: string;
  /** EIP-712 signature */
  signature: string;
  /** Agent address */
  agent: string;
  /** Timestamp */
  timestamp: number;
  root: string;
}

export interface PatchWithdrawIntentCanceledDto {
  account: string;
  /** EIP-712 signature */
  signature: string;
  /** Agent address */
  agent: string;
  /** Timestamp */
  timestamp: number;
  root: string;
}

export interface GetWithdrawIntentResponse {
  /** Withdraw intent id */
  id: string;
  /** Root */
  root: string;
  /** Token id */
  tokenId: number;
  /** Unscaled amount */
  unscaledAmount: string;
  /** Destination token */
  dstToken: string;
  /** Destination chain id */
  dstChainId: number;
  /** Status */
  status: 'pending' | 'requested' | 'finalized' | 'bridging' | 'done' | 'canceled';
  /** Timestamp */
  timestamp: number;
  /** Bridged transaction hash */
  bridgeTxHash?: string;
  /** Aggregator name */
  aggregatorName?: string;
}

export interface GetWithdrawIntentsResponse {
  intents: GetWithdrawIntentResponse[];
}

export interface PrepareTransferToBoxDto {
  /** Chain ID */
  chainId: number;
  /** Token to transfer */
  token: string;
  /** Amount to transfer */
  amount: string;
  /** User address */
  root: string;
  /** Box ID */
  boxId: number;
}

export interface PrepareTransferToBoxResponse {
  /** From address */
  from: string;
  /** To address */
  to: string;
  /** Value */
  value: string;
  /** Calldata */
  calldata: string;
}

export interface PrepareDepositFromBoxV2Dto {
  /** User address */
  root: string;
  /** Box ID */
  boxId: number;
  /** Account ID */
  accountId: number;
  /** Token ID */
  tokenId: number;
  /** Market ID */
  marketId: number;
  /** Token spent */
  tokenSpent: string;
  /** Amount spent */
  amountSpent: string;
  /** Deposit amount */
  depositAmount: string;
  /** Min deposit amount */
  minDepositAmount: string;
  /** Estimated duration in seconds */
  estimatedDuration: number;
  extRouter?: string;
  extCalldata?: string;
}

export interface QuoteBscBridgeV2Dto {
  /** From token */
  fromToken: string;
  /** To token */
  toToken: string;
  /** Amount */
  amount: string;
  /** From address */
  fromAddress: string;
  /** Box ID */
  boxId: number;
}

export interface QuoteWithdrawBscDto {
  /** User address */
  fromAddress: string;
  /** Token ID to withdraw */
  tokenId: number;
  /** Amount to withdraw (unscaled) */
  amount: string;
  /** Destination address on BSC */
  toAddress: string;
}

export interface QuoteWithdrawBscResponse {
  tx: QuoteBscTransactionDto;
  /** From token (BNB OFT on Arbitrum) */
  fromToken: string;
  /** From amount */
  fromAmount: string;
  /** To token (native BNB on BSC) */
  toToken: string;
  /** To amount */
  toAmount: string;
  /** Min to amount */
  minToAmount: string;
  /** Fee costs */
  feeCosts: QuoteBscBridgeFeeResponse[];
  /** Gas costs */
  gasCosts: QuoteBscBridgeFeeResponse[];
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

export interface PersonalConfigResponse {
  /** The personal cool down in seconds */
  coolDown: number;
}

export interface ExemptCLOMarketsConfigResponse {
  /**
   * The exempt cross market ids
   * @example [2,3]
   */
  crossMarkets: number[];
  /**
   * The exempt isolated market ids
   * @example [2,3]
   */
  isolatedMarkets: number[];
}

export interface GlobalConfigsResponse {
  /** The global cool down in seconds */
  coolDown: number;
  /** The personal cool down in seconds */
  personalCoolDown?: PersonalConfigResponse;
  /** The exempt CLO markets config */
  exemptCLOMarkets?: ExemptCLOMarketsConfigResponse;
}

export interface GetVePendleBalanceResponse {
  /**
   * vependle balance
   * @example 100000000
   */
  balance: number;
}

export interface MarketWeeklyIncentiveResponse {
  /**
   * market id
   * @example 1
   */
  marketId: number;
  /**
   * total maker volume for market with id = marketId in the epoch
   * @example 1
   */
  totalMakerVolume: number;
  /**
   * your maker volume for market with id = marketId in the epoch
   * @example 0.01
   */
  makerVolume: number;
  /**
   * your reward amount in Pendle distribute by the market with id = marketId in the epoch
   * @example 0.01
   */
  rewardAmount: number;
  /** penalty message */
  penaltyMessage?: string;
}

export interface WeeklyIncentiveResponse {
  /**
   * timestamp of the epoch. It should be a Thursday date
   * @example "2025-11-20T00:00:00.000Z"
   */
  timestamp: string;
  /** Weekly incentives for all markets within epoch start with timestamp */
  marketWeeklyIncentives: MarketWeeklyIncentiveResponse[];
}

export interface MakerIncentiveActivitiesResponse {
  /** Weekly incentives for all markets in all epoches */
  weeklyIncentives: WeeklyIncentiveResponse[];
  /**
   * your Pendle reward token address
   * @example "0x0000000000000000000000000000000000000000"
   */
  rewardTokenAddress: string;
}

export interface MakerIncentiveRewardsResponse {
  /**
   * your Pendle accrued reward amount
   * @example 0.02
   */
  accruedAmount: number;
  /**
   * your Pendle unclaimed reward amount
   * @example 0.01
   */
  unclaimedAmount: number;
}

export interface MarketMakerIncentiveStatisticsResponse {
  /**
   * user maker volume for market with id = marketId in current epoch
   * @example 100
   */
  userMakerVolume: number;
  /**
   * total maker volume for market with id = marketId in current epoch
   * @example 10000
   */
  totalMakerVolume: number;
  /**
   * total reward will distribute in current epoch
   * @example 5000
   */
  totalEpochReward: number;
  /**
   * average reward per yu for market with id = marketId in current epoch
   * @example 0.5
   */
  avgRewardPerYu: number;
}

export interface GetVolumeResponse {
  /**
   * The total volume in USD
   * @example 1000
   */
  volume: number;
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
  /** The total trade in USD for user */
  totalTradeInUsd: number;
  /** The fee share of the user */
  feeShare: number;
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
  account: string;
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
  account: string;
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

export interface RebateRewardResponse {
  tokenId: number;
  /** @format int64 */
  totalNotionalVolume: number;
  /** @format int64 */
  totalFeePaid: number;
  /** @format int64 */
  rebateDistributed: number;
  /** @format int64 */
  rebateOngoing: number;
}

export interface ReferralRewardV2Response {
  tokenId: number;
  /** @format int64 */
  distributed: number;
  /** @format int64 */
  ongoing: number;
}

export interface CombinedRewardResponse {
  tokenId: number;
  /** @format int64 */
  distributed: number;
  distributedUsd: number;
  /** @format int64 */
  claimed: number;
  claimedUsd: number;
  /** @format int64 */
  ongoing: number;
  ongoingUsd: number;
}

export interface RewardsStateResponse {
  distributedUsd: number;
  claimedUsd: number;
  ongoingUsd: number;
}

export interface UserReferralRewardsResponse {
  rebateRewards: RebateRewardResponse[];
  referralRewards: ReferralRewardV2Response[];
  combinedRewards: CombinedRewardResponse[];
  rewardsState: RewardsStateResponse;
}

export interface TokenStatsResponse {
  /** The token ID */
  tokenId: number;
  /**
   * Total trading volume in FixedX18 format
   * @example "1000000000000000000"
   */
  totalTradingVolume: string;
  /**
   * Total settled volume in FixedX18 format
   * @example "800000000000000000"
   */
  totalSettledVolume: string;
  /**
   * Total fees paid in FixedX18 format
   * @example "5000000000000000"
   */
  totalFeesPaid: string;
  /**
   * Total fees earned in FixedX18 format
   * @example "10000000000000000"
   */
  totalFeesEarned: string;
  /**
   * Total distributed fees in FixedX18 format
   * @example "10000000000000000"
   */
  totalDistributedFees: string;
  /**
   * Ongoing fees in FixedX18 format
   * @example "1000000000000000"
   */
  ongoingFees: string;
}

export interface ReferralActivityV2Response {
  /** The address of the user */
  userAddress: string;
  /** The date when the user joined the referral program */
  referralJoinDate: string;
  /** Token statistics for the user */
  tokenStats: TokenStatsResponse[];
}

export interface ReferralActivitiesV2Response {
  /** The activity of all users who used referral code */
  referralActivities: ReferralActivityV2Response[];
}

export interface LeaderboardEntryResponse {
  /** User rank in leaderboard */
  rank: number;
  /** User wallet address */
  root: string;
  /** User account ID */
  accountId: number;
  /** Profit and Loss (PnL) */
  pnl: string;
  /** Net balance */
  netBalance: string;
  /** Trading volume */
  tradingVolume: string;
  /** Max capital during period */
  maxCapital: string;
  /** Return on Investment (ROI) */
  roi: number;
}

export interface LeaderboardResponse {
  /** Snapshot timestamp */
  snapshotTimestamp: number;
  /** Leaderboard entries ranked by ROI */
  entries: LeaderboardEntryResponse[];
  /** Total number of entries in leaderboard */
  totalEntries: number;
}

export interface UserSearchResponse {
  /** User rank in leaderboard (only if user is in leaderboard) */
  rank?: number;
  /** Profit and Loss (PnL) */
  pnl: string;
  /** Net balance */
  netBalance: string;
  /** Trading volume */
  tradingVolume: string;
  /** Return on Investment (ROI) (only if user is in leaderboard) */
  roi?: number;
}

export interface MarketMakingScoreResponse {
  /**
   * User address
   * @example "0x1234567890123456789012345678901234567890"
   */
  user: string;
  /**
   * Account ID
   * @example 0
   */
  accountId: number;
  /**
   * Token ID used for net balance calculation
   * @example 0
   */
  tokenId: number;
  /**
   * Start timestamp of the period (unix seconds)
   * @example 1733000000
   */
  startTimestamp: number;
  /**
   * End timestamp of the period (unix seconds)
   * @example 1733086400
   */
  endTimestamp: number;
  /**
   * Duration of the period in days
   * @example 7
   */
  periodDays: number;
  /**
   * Maker value - sum of absolute notional sizes from maker trades during the period (formatted with token decimals)
   * @example 1000
   */
  makerValue: number;
  /**
   * Net balance at the start of the period (formatted with token decimals)
   * @example 10000
   */
  netBalanceBefore: number;
  /**
   * Net balance at the end of the period (formatted with token decimals)
   * @example 10500
   */
  netBalanceAfter: number;
  /**
   * Adjusted net balance after removing external capital flows: netBalanceAfter - vaultDeposit + vaultWithdraw + ammDeposit - ammWithdraw
   * @example 10000
   */
  adjustedNetBalanceAfter: number;
  /**
   * Market making score: (MonthlyMakerValue / NetBalanceBefore) * f(MonthlyReturnFactor), where MonthlyMakerValue = MakerValue * 30 / d, MonthlyReturnFactor = (AdjustedNetBalanceAfter / NetBalanceBefore) ^ (30 / d), f(x) = e^(10*(x-1)), d = period in days
   * @example 0.105
   */
  score: number;
}

export interface OnChainEventItem {
  /** Event name */
  eventName: string;
  /** Event ID (blockHash-logIndex) */
  id: string;
  /** Source contract address */
  sourceAddress: string;
  /** Block number */
  blockNumber: number;
  /** Log index */
  logIndex: number;
  /** Transaction hash */
  txHash: string;
  /** Block hash */
  blockHash: string;
  /** Block timestamp */
  blockTimestamp: number;
  /** Event index (blockNumber * 1000000 + logIndex) */
  eventIndex: number;
  /** Whether the event is finalized */
  isFinalized?: boolean;
  /** Additional event-specific data fields from extended schemas */
  data?: object;
}

export interface OnChainEventsResponse {
  /** List of on-chain events */
  events: OnChainEventItem[];
  /** Total count of events matching the query */
  total: number;
}

export interface FearGreedIndexDataPoint {
  /** Unix timestamp in seconds */
  ts: number;
  /** Index value (0-100) */
  v: number;
  /** Classification (e.g., "Extreme Fear", "Fear", "Neutral", "Greed", "Extreme Greed") */
  vc: string;
}

export interface FearGreedIndexResponse {
  /** Array of fear and greed index data points */
  results: FearGreedIndexDataPoint[];
}

export interface CheckEligibilityDto {
  account: string;
  /** EIP-712 signature */
  signature: string;
  /** Agent address */
  agent: string;
  /** Timestamp */
  timestamp: number;
}

export interface CheckEligibilityResponseDto {
  /** Whether the wallet address is VIP eligible */
  eligible: boolean;
  /** VIP qualification date (ISO string) */
  vipSince?: string;
  /** True if newly qualified by this check */
  newlyQualified: boolean;
  /** True if wallet address has prior OTC submissions */
  hasSubmissions: boolean;
}

export interface OtcTermDto {
  /**
   * Exchange name
   * @example "Binance"
   */
  exchangeName: string;
  /**
   * Market name
   * @example "ETHUSDT"
   */
  marketName: string;
  /**
   * Maturity date (ISO string)
   * @example "2025-12-26T00:00:00.000Z"
   */
  maturity: string;
  /**
   * Collateral token
   * @example "USDT"
   */
  collateral: string;
  /**
   * Position side (0 = LONG, 1 = SHORT)
   * @example 0
   */
  side: 0 | 1;
  /**
   * Notional size (YU)
   * @example 1000.5
   */
  notionalSize: number;
  /**
   * Implied rate (decimal)
   * @example 0.05
   */
  impliedRate: number;
  /**
   * Good until date (ISO string)
   * @example "2025-12-31T23:59:59.999Z"
   */
  goodUntilDate: string;
}

export interface SubmitOtcRequestDto {
  account: string;
  /** EIP-712 signature */
  signature: string;
  /** Agent address */
  agent: string;
  /** Timestamp */
  timestamp: number;
  /**
   * Entity name
   * @example "Acme Corp"
   */
  entityName: string;
  /**
   * Telegram ID
   * @example "@johndoe"
   */
  telegramId: string;
  /** Array of OTC terms */
  otcTerms: OtcTermDto[];
}

export interface SubmitOtcRequestResponseDto {
  /** Success status */
  success: boolean;
  /** Message */
  message: string;
}

export interface OtcTermResponseDto {
  exchangeName: string;
  marketName: string;
  maturity: string;
  collateral: string;
  /** 0 = LONG, 1 = SHORT */
  side: 0 | 1;
  notionalSize: number;
  impliedRate: number;
  goodUntilDate: string;
  submittedAt: string;
}

export interface GetOtcRequestsResponseDto {
  userAddress: string;
  entityName?: string;
  telegramId?: string;
  vipSince: string;
  otcTerms: OtcTermResponseDto[];
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
      baseURL: axiosConfig.baseURL || 'https://staging-api.boros.finance/core',
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
 * @title Pendle V3 API Docs
 * @version 1.0
 * @baseUrl https://staging-api.boros.finance/core
 * @contact Pendle Finance <hello@pendle.finance> (https://pendle.finance)
 *
 * Pendle V3 API documentation
 */
export class Sdk<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  markets = {
    /**
     * @description Unified endpoint for fetching market indicators (OHLCV, underlying APR, future premium, mark rate, oracle funding rate, fear & greed index) with optional X-day moving averages.
     *
     * @tags Markets
     * @name IndicatorsControllerGetIndicators
     * @summary Get market indicators with dynamic selection
     * @request GET:/v1/markets/indicators
     */
    indicatorsControllerGetIndicators: (
      query: {
        /**
         * Market ID
         * @example 1
         */
        marketId: number;
        /** Time frame { FIVE_MINUTES : 5m, ONE_HOUR : 1h, ONE_DAY : 1d, ONE_WEEK : 1w } */
        timeFrame: '5m' | '1h' | '1d' | '1w';
        /**
         * Start timestamp (Unix seconds), rounded to timeFrame
         * @default 0
         */
        startTimestamp?: number;
        /**
         * End timestamp (Unix seconds), rounded to timeFrame, default to current timestamp
         * @default 1767438527
         */
        endTimestamp?: number;
        /** List of indicators to select. Supported: u, fp, fgi, udma:<periods> (e.g., udma:7;30) */
        select: string[];
      },
      params: RequestParams = {}
    ) =>
      this.request<IndicatorsResponse, any>({
        path: `/v1/markets/indicators`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description Returns 168 hourly data points (7 days) of annualized funding rates for all available symbols. For symbols with 4/8-hour payment periods, values are linearly interpolated to hourly.
     *
     * @tags Markets
     * @name IndicatorsControllerGetFundingRateHistory
     * @summary Get 7-day hourly funding rate history for all symbols
     * @request GET:/v1/markets/funding-rate-history
     */
    indicatorsControllerGetFundingRateHistory: (params: RequestParams = {}) =>
      this.request<FundingRateHistoryResponse, any>({
        path: `/v1/markets/funding-rate-history`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

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
         * @default 100
         */
        limit?: number;
        /**
         * indicate whether to return whitelisted or unwhitelisted markets. By default we return whitelisted markets
         * @default true
         */
        isWhitelisted?: boolean;
      },
      params: RequestParams = {}
    ) =>
      this.request<MarketsResponse, any>({
        path: `/v1/markets`,
        method: 'GET',
        query: query,
        format: 'json',
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
      params: RequestParams = {}
    ) =>
      this.request<MarketTradesResponse, any>({
        path: `/v1/markets/market-trades`,
        method: 'GET',
        query: query,
        format: 'json',
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
        /** TimeFrameType { FIVE_MINUTES : 5m, ONE_HOUR : 1h, ONE_DAY : 1d, ONE_WEEK : 1w } */
        timeFrame: '5m' | '1h' | '1d' | '1w';
        /**
         * Start timestamp
         * @default 0
         */
        startTimestamp?: number;
        /**
         * End timestamp, default to current timestamp
         * @default 1767438527
         */
        endTimestamp?: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<ChartResponse, any>({
        path: `/v1/markets/chart`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description Simplified chart API returning only essential fields: ts, o, h, l, c, v, u, mr, ofr. Legacy fields (b7dmafr, b30dmafr, fp) are now served by /markets/indicators API.
     *
     * @tags Markets
     * @name MarketsControllerGetChartDataV2
     * @summary Get chart data V2 (simplified)
     * @request GET:/v2/markets/chart
     */
    marketsControllerGetChartDataV2: (
      query: {
        /** Market id */
        marketId: number;
        /** TimeFrameType { FIVE_MINUTES : 5m, ONE_HOUR : 1h, ONE_DAY : 1d, ONE_WEEK : 1w } */
        timeFrame: '5m' | '1h' | '1d' | '1w';
        /**
         * Start timestamp
         * @default 0
         */
        startTimestamp?: number;
        /**
         * End timestamp, default to current timestamp
         * @default 1767438527
         */
        endTimestamp?: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<ChartResponseV2, any>({
        path: `/v2/markets/chart`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Markets
     * @name MarketsControllerGetHistoricalData
     * @summary Get historical data
     * @request GET:/v1/markets/historical-data
     */
    marketsControllerGetHistoricalData: (
      query: {
        /** Market id */
        marketId: number;
        /** TimeFrameType { FIVE_MINUTES : 5m, ONE_HOUR : 1h, ONE_DAY : 1d, ONE_WEEK : 1w } */
        timeFrame: '5m' | '1h' | '1d' | '1w';
        /**
         * Start timestamp
         * @default 0
         */
        startTimestamp?: number;
        /**
         * End timestamp, default to current timestamp
         * @default 1767438527
         */
        endTimestamp?: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<HistoricalDataChartResponse, any>({
        path: `/v1/markets/historical-data`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Markets
     * @name MarketsControllerGetHistoricalUnderlyingApr
     * @summary Get historical underlying APR data
     * @request GET:/v1/markets/historical-underlying-apr
     */
    marketsControllerGetHistoricalUnderlyingApr: (
      query: {
        /** Market id */
        marketId: number;
        /** TimeFrameType { FIVE_MINUTES : 5m, ONE_HOUR : 1h, ONE_DAY : 1d, ONE_WEEK : 1w } */
        timeFrame: '5m' | '1h' | '1d' | '1w';
        /**
         * Start timestamp
         * @default 0
         */
        startTimestamp?: number;
        /**
         * End timestamp, default to current timestamp
         * @default 1767438527
         */
        endTimestamp?: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<HistoricalUnderlyingAPRChartResponse, any>({
        path: `/v1/markets/historical-underlying-apr`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Markets
     * @name MarketsControllerGetHistoricalUnderlyingAprv2
     * @summary Get historical underlying APR data by asset symbol and exchange
     * @request GET:/v2/markets/historical-underlying-apr
     */
    marketsControllerGetHistoricalUnderlyingAprv2: (
      query: {
        /** Asset symbol */
        assetSymbol: string;
        /** Exchange */
        exchange: string;
        /** TimeFrame in seconds, default to be 3600 */
        timeFrame: number;
        /**
         * Start timestamp
         * @default 0
         */
        startTimestamp?: number;
        /**
         * End timestamp, default to current timestamp
         * @default 1767438527
         */
        endTimestamp?: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<HistoricalUnderlyingAPRChartResponse, any>({
        path: `/v2/markets/historical-underlying-apr`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Markets
     * @name MarketsControllerGetHistoricalUnderlyingAprv3
     * @summary Get historical underlying APR data by asset symbol and exchange
     * @request GET:/v3/markets/historical-underlying-apr
     */
    marketsControllerGetHistoricalUnderlyingAprv3: (
      query: {
        /** Asset symbol */
        assetSymbol: string;
        /** Exchange */
        exchange: string;
        /** TimeFrame in seconds. Must be one of: 3600, 14400, 28800, 86400 */
        timeFrame: 3600 | 14400 | 28800 | 86400;
        /** Start timestamp */
        startTimestamp: number;
        /** End timestamp, default to current timestamp */
        endTimestamp: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<HistoricalUnderlyingAPRChartResponse, any>({
        path: `/v3/markets/historical-underlying-apr`,
        method: 'GET',
        query: query,
        format: 'json',
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
        method: 'GET',
        format: 'json',
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
      params: RequestParams = {}
    ) =>
      this.request<OrderBooksResponse, any>({
        path: `/v1/order-books/${marketId}`,
        method: 'GET',
        query: query,
        format: 'json',
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
      params: RequestParams = {}
    ) =>
      this.request<GetAllVaultResponse, any>({
        path: `/v1/amm/summary`,
        method: 'GET',
        query: query,
        format: 'json',
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
      params: RequestParams = {}
    ) =>
      this.request<GetSingleVaultResponse, any>({
        path: `/v1/amm/summary/single`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags AMM
     * @name AmmControllerGetVaultApyChart
     * @summary Get vault apy chart
     * @request GET:/v1/amm/chart
     * @deprecated
     */
    ammControllerGetVaultApyChart: (
      query: {
        /** TimeFrame { ONE_MINUTE : 1m, FIVE_MINUTES : 5m, ONE_HOUR : 1h, ONE_DAY : 1d, ONE_WEEK : 1w } */
        timeFrame: '1m' | '5m' | '1h' | '1d' | '1w';
        /**
         * Start timestamp
         * @default 0
         */
        startTimestamp?: number;
        /**
         * End timestamp, default to current timestamp
         * @default 1767438527
         */
        endTimestamp?: number;
        marketId: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<GetVaultApyChartResponse, any>({
        path: `/v1/amm/chart`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags AMM
     * @name AmmControllerGetVaultApyChartV2
     * @summary Get vault apy chart
     * @request GET:/v2/amm/chart
     */
    ammControllerGetVaultApyChartV2: (
      query: {
        /** TimeFrame { ONE_MINUTE : 1m, FIVE_MINUTES : 5m, ONE_HOUR : 1h, ONE_DAY : 1d, ONE_WEEK : 1w } */
        timeFrame: '1m' | '5m' | '1h' | '1d' | '1w';
        /**
         * Start timestamp
         * @default 0
         */
        startTimestamp?: number;
        /**
         * End timestamp, default to current timestamp
         * @default 1767438527
         */
        endTimestamp?: number;
        ammId: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<GetVaultApyChartResponse, any>({
        path: `/v2/amm/chart`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags AMM
     * @name AmmControllerGetAmmInfoByAmmId
     * @summary Get amm info by amm id
     * @request GET:/v2/amm/{ammId}
     */
    ammControllerGetAmmInfoByAmmId: (ammId: number, params: RequestParams = {}) =>
      this.request<GetAMMInfoByAmmIdResponse, any>({
        path: `/v2/amm/${ammId}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags AMM
     * @name AmmControllerGetAmmRewards
     * @summary Get user rewards (amm swap fee rewards + Pendle incentives rewards)
     * @request GET:/v1/amm/rewards
     */
    ammControllerGetAmmRewards: (
      query: {
        /** user address */
        user: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<GetUserRewardResponse, any>({
        path: `/v1/amm/rewards`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),
  };
  merkels = {
    /**
     * No description
     *
     * @tags Merkels
     * @name MerklesControllerGetMerkleByUserAndCampaign
     * @summary Get merkle by user and campaign
     * @request GET:/v1/merkels/{campaignId}/user/{user}
     */
    merklesControllerGetMerkleByUserAndCampaign: (campaignId: string, user: string, params: RequestParams = {}) =>
      this.request<UserMerkleResponse, any>({
        path: `/v1/merkels/${campaignId}/user/${user}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  };
  simulations = {
    /**
     * No description
     *
     * @tags Simulations
     * @name SimulationsControllerGetDepositV2
     * @summary Deposit collateral to isolated/cross margin account
     * @request GET:/v2/simulations/deposit
     */
    simulationsControllerGetDepositV2: (
      query: {
        userAddress: string;
        tokenId: number;
        amount: string;
        accountId: number;
        marketId: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<DepositSimulationResponse, any>({
        path: `/v2/simulations/deposit`,
        method: 'GET',
        query: query,
        format: 'json',
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
      params: RequestParams = {}
    ) =>
      this.request<WithdrawSimulationResponse, any>({
        path: `/v1/simulations/withdraw`,
        method: 'GET',
        query: query,
        format: 'json',
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
      params: RequestParams = {}
    ) =>
      this.request<CashTransferSimulationResponse, any>({
        path: `/v1/simulations/cash-transfer`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Simulations
     * @name SimulationsControllerGetPlaceOrderV2
     * @summary Place limit order
     * @request GET:/v2/simulations/place-order
     */
    simulationsControllerGetPlaceOrderV2: (
      query: {
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
        /** TimeInForce { GOOD_TIL_CANCELLED : 0, IMMEDIATE_OR_CANCEL : 1, FILL_OR_KILL : 2, ADD_LIQUIDITY_ONLY : 3, SOFT_ADD_LIQUIDITY_ONLY : 4 } */
        tif: 0 | 1 | 2 | 3 | 4;
        /** @default 0.05 */
        slippage?: number;
        /** if not provided, it will be simulated as anonymous order */
        marketAcc?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<PlaceOrderSimulationResponseV2, any>({
        path: `/v2/simulations/place-order`,
        method: 'GET',
        query: query,
        format: 'json',
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
        orderIds?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<CancelOrderSimulationResponse, any>({
        path: `/v1/simulations/cancel-order`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Simulations
     * @name SimulationsControllerCloseActiveMarketPositionV2
     * @summary Close an active market position
     * @request GET:/v2/simulations/close-active-position
     */
    simulationsControllerCloseActiveMarketPositionV2: (
      query: {
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
        /** TimeInForce { GOOD_TIL_CANCELLED : 0, IMMEDIATE_OR_CANCEL : 1, FILL_OR_KILL : 2, ADD_LIQUIDITY_ONLY : 3, SOFT_ADD_LIQUIDITY_ONLY : 4 } */
        tif: 0 | 1 | 2 | 3 | 4;
        /** @default 0.05 */
        slippage?: number;
        marketAcc: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<PlaceOrderSimulationResponseV2, any>({
        path: `/v2/simulations/close-active-position`,
        method: 'GET',
        query: query,
        format: 'json',
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
      params: RequestParams = {}
    ) =>
      this.request<AddLiquiditySingleCashSimulationResponse, any>({
        path: `/v1/simulations/add-liquidity-single-cash`,
        method: 'GET',
        query: query,
        format: 'json',
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
      params: RequestParams = {}
    ) =>
      this.request<RemoveLiquiditySingleCashSimulationResponse, any>({
        path: `/v1/simulations/remove-liquidity-single-cash`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),
  };
  assets = {
    /**
     * No description
     *
     * @tags Assets
     * @name AssetsControllerGetAllCollateralAssets
     * @summary Get all collateral assets
     * @request GET:/v1/assets/all
     */
    assetsControllerGetAllCollateralAssets: (params: RequestParams = {}) =>
      this.request<AssetsResponse, any>({
        path: `/v1/assets/all`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Assets
     * @name AssetsControllerGetAllAssets
     * @summary Get all assets
     * @request GET:/v2/assets/all
     */
    assetsControllerGetAllAssets: (params: RequestParams = {}) =>
      this.request<AssetsResponse, any>({
        path: `/v2/assets/all`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Assets
     * @name AssetsControllerGetHistoricalPriceV1
     * @summary Get historical price data from Binance (V1)
     * @request GET:/v1/assets/historical-price
     */
    assetsControllerGetHistoricalPriceV1: (
      query: {
        /** Asset symbol (e.g., BTC, ETH) */
        symbol: string;
        /**
         * Start timestamp
         * @default 0
         */
        startTimestamp?: number;
        /**
         * End timestamp, default to current timestamp
         * @default 1767438527
         */
        endTimestamp?: number;
        /**
         * Time frame in seconds
         * @default 3600
         */
        timeFrame?: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<HistoricalPriceV1Response, any>({
        path: `/v1/assets/historical-price`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Assets
     * @name AssetsControllerGetHistoricalPriceV2
     * @summary Get historical price data with interpolation (V2)
     * @request GET:/v2/assets/historical-price
     */
    assetsControllerGetHistoricalPriceV2: (
      query: {
        /** Asset symbol (e.g., BTC, ETH) */
        symbol: string;
        /**
         * Start timestamp (will be rounded up to nearest timeFrame)
         * @default 0
         */
        startTimestamp?: number;
        /**
         * End timestamp, default to current timestamp (will be rounded down to nearest timeFrame)
         * @default 1767438527
         */
        endTimestamp?: number;
        /**
         * Time frame in seconds (300=5m, 3600=1h, 28800=8h, 86400=1d, 604800=1w)
         * @default 3600
         */
        timeFrame?: 300 | 3600 | 14400 | 28800 | 86400 | 604800;
      },
      params: RequestParams = {}
    ) =>
      this.request<HistoricalPriceResponse, any>({
        path: `/v2/assets/historical-price`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),
  };
  calldata = {
    /**
     * No description
     *
     * @tags Calldata
     * @name CalldataControllerGetDepositCalldataV2
     * @summary Get deposit from wallet to margin account calldata
     * @request GET:/v2/calldata/deposit
     */
    calldataControllerGetDepositCalldataV2: (
      query: {
        userAddress: string;
        tokenId: number;
        amount: string;
        accountId: number;
        marketId: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<GetCalldataResponse, any>({
        path: `/v2/calldata/deposit`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Calldata
     * @name CalldataControllerGetVaultPayTreasuryCalldata
     * @summary Get vault pay treasury calldata
     * @request GET:/v1/calldata/vault-pay-treasury
     */
    calldataControllerGetVaultPayTreasuryCalldata: (
      query: {
        userAddress: string;
        tokenId: number;
        amount: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<GetCalldataResponse, any>({
        path: `/v1/calldata/vault-pay-treasury`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Calldata
     * @name CalldataControllerGetWithdrawRequestCalldata
     * @summary Get withdraw request calldata
     * @request GET:/v1/calldata/withdraw/request
     */
    calldataControllerGetWithdrawRequestCalldata: (
      query: {
        userAddress: string;
        tokenId: number;
        amount: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<GetCalldataResponse, any>({
        path: `/v1/calldata/withdraw/request`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Calldata
     * @name CalldataControllerGetWithdrawCancelCalldata
     * @summary Get cancelled withdraw from margin account to wallet calldata
     * @request GET:/v1/calldata/withdraw/cancel
     */
    calldataControllerGetWithdrawCancelCalldata: (
      query: {
        userAddress: string;
        tokenId: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<GetCalldataResponse, any>({
        path: `/v1/calldata/withdraw/cancel`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Calldata
     * @name CalldataControllerGetPositionTransferCalldataV3
     * @summary Get cash transfer contract params
     * @request GET:/v3/calldata/cash-transfer
     */
    calldataControllerGetPositionTransferCalldataV3: (
      query: {
        /** bigint string of amount to pay treasury */
        payTreasuryAmount?: string;
        marketId: number;
        /** true if you want to transfer cash from cross to isolated account, false vice versa */
        isDeposit: boolean;
        amount: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<BulkAgentExecuteParamsResponseV2, any>({
        path: `/v3/calldata/cash-transfer`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Calldata
     * @name CalldataControllerGetPlaceOrderCalldataV4
     * @summary Get place limit order contract params
     * @request GET:/v4/calldata/place-order
     */
    calldataControllerGetPlaceOrderCalldataV4: (
      query: {
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
        /** TimeInForce { GOOD_TIL_CANCELLED : 0, IMMEDIATE_OR_CANCEL : 1, FILL_OR_KILL : 2, ADD_LIQUIDITY_ONLY : 3, SOFT_ADD_LIQUIDITY_ONLY : 4 } */
        tif: 0 | 1 | 2 | 3 | 4;
        /** @default 0.05 */
        slippage?: number;
        marketAcc: string;
        /** bigint string of amount to pay treasury */
        payTreasuryAmount?: string;
        /**
         * auto exit market
         * @default true
         */
        autoExitMarket?: boolean;
      },
      params: RequestParams = {}
    ) =>
      this.request<BulkAgentExecuteParamsResponseV2, any>({
        path: `/v4/calldata/place-order`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Calldata
     * @name CalldataControllerGetBulkPlaceOrderCalldataV7
     * @summary Get place multiple limit orders contract params
     * @request POST:/v7/calldata/place-orders
     */
    calldataControllerGetBulkPlaceOrderCalldataV7: (data: BulkPlaceOrderQueryDtoV5, params: RequestParams = {}) =>
      this.request<BulkAgentExecuteParamsResponseV2, any>({
        path: `/v7/calldata/place-orders`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Calldata
     * @name CalldataControllerGetBulkPlaceOrderCalldataV6
     * @summary Get place multiple limit orders contract params
     * @request POST:/v6/calldata/place-orders
     */
    calldataControllerGetBulkPlaceOrderCalldataV6: (data: BulkPlaceOrderQueryDtoV4, params: RequestParams = {}) =>
      this.request<BulkAgentExecuteParamsResponseV2, any>({
        path: `/v6/calldata/place-orders`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Calldata
     * @name CalldataControllerGetBulkPlaceOrderCalldataV3
     * @summary Get place multiple limit orders contract params
     * @request POST:/v3/calldata/place-orders
     */
    calldataControllerGetBulkPlaceOrderCalldataV3: (data: BulkPlaceOrderQueryDtoV2, params: RequestParams = {}) =>
      this.request<BulkAgentExecuteParamsResponseV2, any>({
        path: `/v3/calldata/place-orders`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Calldata
     * @name CalldataControllerGetCancelOrderCalldataV3
     * @summary Get cancel order contract params
     * @request GET:/v3/calldata/cancel-order
     */
    calldataControllerGetCancelOrderCalldataV3: (
      query: {
        /** bigint string of amount to pay treasury */
        payTreasuryAmount?: string;
        marketAcc: string;
        marketId: number;
        cancelAll: boolean;
        /** comma separated orderIds */
        orderIds?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<BulkAgentExecuteParamsResponseV2, any>({
        path: `/v3/calldata/cancel-order`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Calldata
     * @name CalldataControllerGetCloseActiveMarketPositionV4
     * @summary Get close active position contract params
     * @request GET:/v4/calldata/close-active-position
     */
    calldataControllerGetCloseActiveMarketPositionV4: (
      query: {
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
        /** TimeInForce { GOOD_TIL_CANCELLED : 0, IMMEDIATE_OR_CANCEL : 1, FILL_OR_KILL : 2, ADD_LIQUIDITY_ONLY : 3, SOFT_ADD_LIQUIDITY_ONLY : 4 } */
        tif: 0 | 1 | 2 | 3 | 4;
        /** @default 0.05 */
        slippage?: number;
        marketAcc: string;
        /** bigint string of amount to pay treasury */
        payTreasuryAmount?: string;
        /**
         * auto exit market
         * @default true
         */
        autoExitMarket?: boolean;
      },
      params: RequestParams = {}
    ) =>
      this.request<BulkAgentExecuteParamsResponseV2, any>({
        path: `/v4/calldata/close-active-position`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Calldata
     * @name CalldataControllerGetAddLiquiditySingleCashToAmmCalldataV3
     * @summary Get add liquidity single cash to amm contract params
     * @request GET:/v3/calldata/add-liquidity-single-cash-to-amm
     */
    calldataControllerGetAddLiquiditySingleCashToAmmCalldataV3: (
      query: {
        /** bigint string of amount to pay treasury */
        payTreasuryAmount?: string;
        userAddress: string;
        accountId: number;
        marketId: number;
        netCashIn: string;
        minLpOut: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<BulkAgentExecuteParamsResponseV2, any>({
        path: `/v3/calldata/add-liquidity-single-cash-to-amm`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Calldata
     * @name CalldataControllerGetAddLiquiditySingleCashToAmmCalldataV4
     * @summary Get add liquidity single cash to amm contract params
     * @request GET:/v4/calldata/add-liquidity-single-cash-to-amm
     */
    calldataControllerGetAddLiquiditySingleCashToAmmCalldataV4: (
      query: {
        /** bigint string of amount to pay treasury */
        payTreasuryAmount?: string;
        userAddress: string;
        accountId: number;
        marketId: number;
        netCashIn: string;
        minLpOut: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<BulkAgentExecuteParamsResponseV3, any>({
        path: `/v4/calldata/add-liquidity-single-cash-to-amm`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Calldata
     * @name CalldataControllerGetRemoveLiquiditySingleCashFromAmmCalldataV3
     * @summary Get remove liquidity single cash from amm contract params
     * @request GET:/v3/calldata/remove-liquidity-single-cash-from-amm
     */
    calldataControllerGetRemoveLiquiditySingleCashFromAmmCalldataV3: (
      query: {
        /** bigint string of amount to pay treasury */
        payTreasuryAmount?: string;
        marketId: number;
        lpToRemove: string;
        minCashOut: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<BulkAgentExecuteParamsResponseV2, any>({
        path: `/v3/calldata/remove-liquidity-single-cash-from-amm`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Calldata
     * @name CalldataControllerGetRemoveLiquiditySingleCashFromAmmCalldataV4
     * @summary Get remove liquidity single cash from amm contract params
     * @request GET:/v4/calldata/remove-liquidity-single-cash-from-amm
     */
    calldataControllerGetRemoveLiquiditySingleCashFromAmmCalldataV4: (
      query: {
        /** bigint string of amount to pay treasury */
        payTreasuryAmount?: string;
        marketId: number;
        lpToRemove: string;
        minCashOut: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<BulkAgentExecuteParamsResponseV3, any>({
        path: `/v4/calldata/remove-liquidity-single-cash-from-amm`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Calldata
     * @name CalldataControllerGetEnterExitMarketsCalldata
     * @summary Get enter exit markets contract params
     * @request GET:/v1/calldata/enter-exit-markets
     */
    calldataControllerGetEnterExitMarketsCalldata: (
      query: {
        isCross: boolean;
        /** comma separated marketIds */
        marketIds?: string;
        isEnter: boolean;
      },
      params: RequestParams = {}
    ) =>
      this.request<BulkAgentExecuteParamsResponseV2, any>({
        path: `/v1/calldata/enter-exit-markets`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Calldata
     * @name CalldataControllerGetPayTreasuryCalldataV2
     * @summary Pay treasury
     * @request GET:/v2/calldata/pay-treasury
     */
    calldataControllerGetPayTreasuryCalldataV2: (
      query: {
        isCross: boolean;
        marketId: number;
        usdAmount: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<BulkAgentExecuteParamsResponseV2, any>({
        path: `/v2/calldata/pay-treasury`,
        method: 'GET',
        query: query,
        format: 'json',
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
      params: RequestParams = {}
    ) =>
      this.request<AccountSettingsResponse, any>({
        path: `/v1/accounts/settings`,
        method: 'GET',
        query: query,
        format: 'json',
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
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Accounts
     * @name AccountsControllerGetAccountGasBalance
     * @summary Get account gas balance
     * @request GET:/v1/accounts/gas-balance
     */
    accountsControllerGetAccountGasBalance: (
      query: {
        userAddress: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<AccountGasBalanceResponse, any>({
        path: `/v1/accounts/gas-balance`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Accounts
     * @name AccountsControllerGetGasConsumptionHistory
     * @summary Get gas consumption history
     * @request GET:/v1/accounts/gas-consumption-history
     */
    accountsControllerGetGasConsumptionHistory: (
      query: {
        userAddress: string;
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
      params: RequestParams = {}
    ) =>
      this.request<AccountGasConsumptionHistoryResponse, any>({
        path: `/v1/accounts/gas-consumption-history`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Accounts
     * @name AccountsControllerSetAgentSession
     * @summary Set agent session and cookie
     * @request POST:/v1/accounts/set-agent-session
     */
    accountsControllerSetAgentSession: (data: SetAgentSessionDto, params: RequestParams = {}) =>
      this.request<AgentSessionResponse, any>({
        path: `/v1/accounts/set-agent-session`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Accounts
     * @name AccountsControllerVerifyAgentSession
     * @summary Verify agent session
     * @request POST:/v1/accounts/verify-agent-session
     */
    accountsControllerVerifyAgentSession: (data: AgentSessionQueryDto, params: RequestParams = {}) =>
      this.request<AgentSessionResponse, any>({
        path: `/v1/accounts/verify-agent-session`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  };
  pnL = {
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
         * Maximum number of results to return. The parameter is capped at 2000.
         * @default 10
         */
        limit?: number;
        /**
         * Maximum number of results to skip.
         * @default 0
         */
        skip?: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<PnlTransactionsResponse, any>({
        path: `/v1/pnl/transactions`,
        method: 'GET',
        query: query,
        format: 'json',
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
         * Maximum number of results to return. The parameter is capped at 2000.
         * @default 10
         */
        limit?: number;
        /** Is active */
        isActive?: boolean;
        /** OrderType { LIMIT : 0, MARKET : 1, TAKE_PROFIT_MARKET : 2, STOP_LOSS_MARKET : 3 } */
        orderType?: 0 | 1 | 2 | 3;
        /**
         * Sort by field: 1 for ascending, -1 for descending. Allowed fields: blockTimestamp, side, placedSize, unfilledSize, impliedApr, status, orderType. Default to blockTimestamp:-1
         * @default "blockTimestamp:-1"
         * @example "blockTimestamp:-1"
         */
        orderBy?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<LimitOrdersResponse, any>({
        path: `/v1/pnl/limit-orders`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags PnL
     * @name PnlControllerGetLimitOrdersV2
     * @summary Get limit orders
     * @request GET:/v2/pnl/limit-orders
     */
    pnlControllerGetLimitOrdersV2: (
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
         * Maximum number of results to return. The parameter is capped at 200.
         * @default 10
         */
        limit?: number;
        /** Is active */
        isActive?: boolean;
        /** OrderType { LIMIT : 0, MARKET : 1, TAKE_PROFIT_MARKET : 2, STOP_LOSS_MARKET : 3 }. Comma-separated for multiple values (e.g., "0,1,2") */
        orderType?: string;
        /**
         * Sort by field: 1 for ascending, -1 for descending. Allowed fields: blockTimestamp, side, placedSize, unfilledSize, impliedApr, status, orderType. Default to blockTimestamp:-1
         * @default "blockTimestamp:-1"
         * @example "blockTimestamp:-1"
         */
        orderBy?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<LimitOrdersResponseV2, any>({
        path: `/v2/pnl/limit-orders`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags PnL
     * @name PnlControllerGetFilledLimitOrders
     * @summary Get limit orders
     * @request GET:/v1/pnl/limit-orders/filled
     * @deprecated
     */
    pnlControllerGetFilledLimitOrders: (
      query?: {
        userAddress?: string;
        accountId?: number;
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
        /** OrderType { LIMIT : 0, MARKET : 1, TAKE_PROFIT_MARKET : 2, STOP_LOSS_MARKET : 3 } */
        orderType?: 0 | 1 | 2 | 3;
        /** LimitOrderStatus { Filling : 0, Cancelled : 1, FullyFilled : 2, Expired : 3, Purged : 4 } */
        status?: 0 | 1 | 2 | 3 | 4;
        /**
         * Sort by field: 1 for ascending, -1 for descending. Allowed fields: blockTimestamp, side, placedSize, unfilledSize, impliedApr, status, orderType. Default to blockTimestamp:-1
         * @default "blockTimestamp:-1"
         * @example "blockTimestamp:-1"
         */
        orderBy?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<LimitOrdersResponse, any>({
        path: `/v1/pnl/limit-orders/filled`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags PnL
     * @name PnlControllerGetTransferLogs
     * @summary Get transfer logs
     * @request GET:/v1/pnl/transfer-logs
     */
    pnlControllerGetTransferLogs: (
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
        root: string;
        accountId: number;
        tokenId?: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<TransferLogsResponse, any>({
        path: `/v1/pnl/transfer-logs`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags PnL
     * @name PnlControllerSharePositionPnl
     * @summary Share position PnL
     * @request GET:/v1/pnl/share-position-pnl
     */
    pnlControllerSharePositionPnl: (
      query: {
        marketAcc: string;
        marketId: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<SharePositionPnlResponse, any>({
        path: `/v1/pnl/share-position-pnl`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags PnL
     * @name PnlControllerGetMarketAccCumulativePnl
     * @summary Get market account cumulative PnL
     * @request GET:/v1/pnl/market-acc-cumulative-pnl
     */
    pnlControllerGetMarketAccCumulativePnl: (
      query: {
        marketAcc: string;
        marketId: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<MarketAccCumulativePnlResponse, any>({
        path: `/v1/pnl/market-acc-cumulative-pnl`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags PnL
     * @name PnlControllerGetMaturedPositions
     * @summary Get matured positions by root address
     * @request GET:/v1/pnl/matured-positions
     */
    pnlControllerGetMaturedPositions: (
      query: {
        root: string;
        tokenId?: number;
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
      },
      params: RequestParams = {}
    ) =>
      this.request<MaturedPositionsResponse, any>({
        path: `/v1/pnl/matured-positions`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags PnL
     * @name PnlControllerGetPositionsInSync
     * @summary Get positions in sync with pagination
     * @request GET:/v1/pnl/positions
     */
    pnlControllerGetPositionsInSync: (
      query?: {
        /** Filter by market ID */
        marketId?: number;
        /** Filter by root address */
        root?: string;
        /** Filter by account ID */
        accountId?: number;
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
      },
      params: RequestParams = {}
    ) =>
      this.request<PositionsInSyncResponse, any>({
        path: `/v1/pnl/positions`,
        method: 'GET',
        query: query,
        format: 'json',
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
      params: RequestParams = {}
    ) =>
      this.request<SettlementsResponse, any>({
        path: `/v1/settlement/settlements`,
        method: 'GET',
        query: query,
        format: 'json',
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
      params: RequestParams = {}
    ) =>
      this.request<AllCollateralSummaryResponse, any>({
        path: `/v1/collaterals/summary`,
        method: 'GET',
        query: query,
        format: 'json',
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
      params: RequestParams = {}
    ) =>
      this.request<CollateralSummaryResponse, any>({
        path: `/v1/collaterals/summary/single`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),
  };
  depositBox = {
    /**
     * No description
     *
     * @tags Deposit Box
     * @name DepositBoxControllerGetAssets
     * @summary Get all assets
     * @request GET:/v1/deposit-box/assets
     */
    depositBoxControllerGetAssets: (params: RequestParams = {}) =>
      this.request<DepositBoxAssetsResponse, any>({
        path: `/v1/deposit-box/assets`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Deposit Box
     * @name DepositBoxControllerGetDepositBoxBalances
     * @summary Get deposit box balances
     * @request GET:/v1/deposit-box/balances
     */
    depositBoxControllerGetDepositBoxBalances: (
      query: {
        /** User address */
        root: string;
        /**
         * Box ID
         * @default 0
         */
        boxId?: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<GetDepositBoxBalancesResponse, any>({
        path: `/v1/deposit-box/balances`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Deposit Box
     * @name DepositBoxControllerPrepareDepositFromBox
     * @summary Build deposit from box message
     * @request POST:/v1/deposit-box/prepare/deposit
     */
    depositBoxControllerPrepareDepositFromBox: (data: PrepareDepositFromBoxDto, params: RequestParams = {}) =>
      this.request<PrepareDepositFromBoxMessageResponse, any>({
        path: `/v1/deposit-box/prepare/deposit`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Deposit Box
     * @name DepositBoxControllerQuoteBscBridge
     * @summary Prepare BSC to Arbitrum bridge transaction
     * @request POST:/v1/deposit-box/bridge/bsc/quote
     */
    depositBoxControllerQuoteBscBridge: (data: QuoteBscBridgeDto, params: RequestParams = {}) =>
      this.request<QuoteBscBridgeResponse, any>({
        path: `/v1/deposit-box/bridge/bsc/quote`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Deposit Box
     * @name DepositBoxControllerGetAvailableDepositBoxId
     * @summary Get available deposit box id
     * @request GET:/v1/deposit-box/box-id
     */
    depositBoxControllerGetAvailableDepositBoxId: (
      query: {
        /** User address */
        root: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<GetDepositBoxIdResponse, any>({
        path: `/v1/deposit-box/box-id`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Deposit Box
     * @name DepositBoxControllerCreateDepositBoxIntent
     * @summary Create deposit box intent
     * @request POST:/v1/deposit-box/intent
     */
    depositBoxControllerCreateDepositBoxIntent: (data: CreateDepositBoxIntentDto, params: RequestParams = {}) =>
      this.request<CreateDepositBoxIntentResponse, any>({
        path: `/v1/deposit-box/intent`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Deposit Box
     * @name DepositBoxControllerPatchDepositBoxIntentBridging
     * @summary Patch deposit box intent as bridging
     * @request PATCH:/v1/deposit-box/intent/{id}/bridging
     */
    depositBoxControllerPatchDepositBoxIntentBridging: (
      id: string,
      data: PatchDepositBoxIntentBridgingDto,
      params: RequestParams = {}
    ) =>
      this.request<PatchWithdrawIntentResponse, any>({
        path: `/v1/deposit-box/intent/${id}/bridging`,
        method: 'PATCH',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Deposit Box
     * @name DepositBoxControllerPatchDepositBoxIntentCanceled
     * @summary Patch deposit box intent as canceled
     * @request PATCH:/v1/deposit-box/intent/{id}/canceled
     */
    depositBoxControllerPatchDepositBoxIntentCanceled: (
      id: string,
      data: PatchDepositBoxIntentCanceledDto,
      params: RequestParams = {}
    ) =>
      this.request<PatchWithdrawIntentResponse, any>({
        path: `/v1/deposit-box/intent/${id}/canceled`,
        method: 'PATCH',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Deposit Box
     * @name DepositBoxControllerGetDepositBoxIntents
     * @summary Get deposit box intents
     * @request GET:/v1/deposit-box/intents
     */
    depositBoxControllerGetDepositBoxIntents: (
      query: {
        /** User address */
        root: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<GetDepositBoxIntentsResponse, any>({
        path: `/v1/deposit-box/intents`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Deposit Box
     * @name DepositBoxControllerCreateWithdrawIntent
     * @summary Create withdraw intent
     * @request POST:/v1/deposit-box/withdraw/intent
     */
    depositBoxControllerCreateWithdrawIntent: (data: CreateWithdrawIntentDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/v1/deposit-box/withdraw/intent`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Deposit Box
     * @name DepositBoxControllerPatchWithdrawIntentBridged
     * @summary Patch withdraw intent as bridged
     * @request PATCH:/v1/deposit-box/withdraw/intent/{id}/bridged
     */
    depositBoxControllerPatchWithdrawIntentBridged: (
      id: string,
      data: PatchWithdrawIntentBridgedDto,
      params: RequestParams = {}
    ) =>
      this.request<PatchWithdrawIntentResponse, any>({
        path: `/v1/deposit-box/withdraw/intent/${id}/bridged`,
        method: 'PATCH',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Deposit Box
     * @name DepositBoxControllerPatchWithdrawIntentDone
     * @summary Patch withdraw intent as done
     * @request PATCH:/v1/deposit-box/withdraw/intent/{id}/done
     */
    depositBoxControllerPatchWithdrawIntentDone: (
      id: string,
      data: PatchWithdrawIntentDoneDto,
      params: RequestParams = {}
    ) =>
      this.request<PatchWithdrawIntentResponse, any>({
        path: `/v1/deposit-box/withdraw/intent/${id}/done`,
        method: 'PATCH',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Deposit Box
     * @name DepositBoxControllerPatchWithdrawIntentCanceled
     * @summary Patch withdraw intent as canceled
     * @request PATCH:/v1/deposit-box/withdraw/intent/{id}/canceled
     */
    depositBoxControllerPatchWithdrawIntentCanceled: (
      id: string,
      data: PatchWithdrawIntentCanceledDto,
      params: RequestParams = {}
    ) =>
      this.request<PatchWithdrawIntentResponse, any>({
        path: `/v1/deposit-box/withdraw/intent/${id}/canceled`,
        method: 'PATCH',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Deposit Box
     * @name DepositBoxControllerGetWithdrawIntents
     * @summary Get withdraw intents
     * @request GET:/v1/deposit-box/withdraw/intents
     */
    depositBoxControllerGetWithdrawIntents: (
      query: {
        root: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<GetWithdrawIntentsResponse, any>({
        path: `/v1/deposit-box/withdraw/intents`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Deposit Box
     * @name DepositBoxControllerGetWithdrawIntent
     * @summary Get withdraw intent
     * @request GET:/v1/deposit-box/withdraw/intent/{id}
     */
    depositBoxControllerGetWithdrawIntent: (id: string, params: RequestParams = {}) =>
      this.request<GetWithdrawIntentResponse, any>({
        path: `/v1/deposit-box/withdraw/intent/${id}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Deposit Box
     * @name DepositBoxControllerGetDepositBoxIntent
     * @summary Get deposit box intent
     * @request GET:/v1/deposit-box/intent/{id}
     */
    depositBoxControllerGetDepositBoxIntent: (id: string, params: RequestParams = {}) =>
      this.request<GetDepositBoxIntentResponse, any>({
        path: `/v1/deposit-box/intent/${id}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Deposit Box
     * @name DepositBoxControllerPrepareTransferToBox
     * @summary Prepare transfer to box
     * @request POST:/v1/deposit-box/prepare/transfer-to-box
     */
    depositBoxControllerPrepareTransferToBox: (data: PrepareTransferToBoxDto, params: RequestParams = {}) =>
      this.request<PrepareTransferToBoxResponse, any>({
        path: `/v1/deposit-box/prepare/transfer-to-box`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Deposit Box
     * @name DepositBoxControllerPrepareDepositFromBoxV2
     * @summary Build deposit from box message
     * @request POST:/v2/deposit-box/prepare/deposit
     */
    depositBoxControllerPrepareDepositFromBoxV2: (data: PrepareDepositFromBoxV2Dto, params: RequestParams = {}) =>
      this.request<PrepareDepositFromBoxMessageResponse, any>({
        path: `/v2/deposit-box/prepare/deposit`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Deposit Box
     * @name DepositBoxControllerQuoteBscBridgeV2
     * @summary Prepare BSC to Arbitrum bridge transaction
     * @request POST:/v2/deposit-box/bridge/bsc/quote
     */
    depositBoxControllerQuoteBscBridgeV2: (data: QuoteBscBridgeV2Dto, params: RequestParams = {}) =>
      this.request<QuoteBscBridgeResponse, any>({
        path: `/v2/deposit-box/bridge/bsc/quote`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Deposit Box
     * @name DepositBoxControllerQuoteWithdrawBsc
     * @summary Quote Arbitrum to BSC withdrawal bridge transaction
     * @request POST:/v1/deposit-box/withdraw/bsc/quote
     */
    depositBoxControllerQuoteWithdrawBsc: (data: QuoteWithdrawBscDto, params: RequestParams = {}) =>
      this.request<QuoteWithdrawBscResponse, any>({
        path: `/v1/deposit-box/withdraw/bsc/quote`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
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
        time: '7d' | '30d' | '60d' | '90d' | 'all';
        /** if not provided, will return balance of all collateral */
        tokenId: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<BalanceChartResponse, any>({
        path: `/v1/portfolios/balance-chart`,
        method: 'GET',
        query: query,
        format: 'json',
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
        time: '7d' | '30d' | '60d' | '90d' | 'all';
      },
      params: RequestParams = {}
    ) =>
      this.request<BalanceChartAllTokensResponse, any>({
        path: `/v1/portfolios/balance-chart/all`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),
  };
  configs = {
    /**
     * No description
     *
     * @tags Configs
     * @name ConfigsControllerGetGlobalConfigs
     * @request GET:/v1/configs
     */
    configsControllerGetGlobalConfigs: (
      query?: {
        /** The address of the user */
        root?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<GlobalConfigsResponse, any>({
        path: `/v1/configs`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),
  };
  vePendle = {
    /**
     * @description Get vependle balance
     *
     * @tags vePendle
     * @name VePendleControllerGetBalance
     * @summary Get vependle balance
     * @request GET:/v1/vependle/balance/{user}
     */
    vePendleControllerGetBalance: (user: string, params: RequestParams = {}) =>
      this.request<GetVePendleBalanceResponse, any>({
        path: `/v1/vependle/balance/${user}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  };
  incentives = {
    /**
     * @description Get maker incentives for a given maker
     *
     * @tags Incentives
     * @name IncentivesControllerGetMakerIncentiveActivities
     * @summary Get maker incentives activities
     * @request GET:/v1/incentives/maker-incentives/{maker}/activities
     */
    incentivesControllerGetMakerIncentiveActivities: (maker: string, params: RequestParams = {}) =>
      this.request<MakerIncentiveActivitiesResponse, any>({
        path: `/v1/incentives/maker-incentives/${maker}/activities`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description Get maker incentives rewards (accrued/unclaimed) amount for a given maker by marketId
     *
     * @tags Incentives
     * @name IncentivesControllerGetMakerIncentiveRewards
     * @summary Get maker incentives rewards
     * @request GET:/v1/incentives/maker-incentives/{maker}/rewards
     */
    incentivesControllerGetMakerIncentiveRewards: (maker: string, params: RequestParams = {}) =>
      this.request<MakerIncentiveRewardsResponse, any>({
        path: `/v1/incentives/maker-incentives/${maker}/rewards`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description Get maker market reward statistics for given market and user at current epoch
     *
     * @tags Incentives
     * @name IncentivesControllerGetMakerIncentiveStatistics
     * @summary Get maker market reward statistics at current epoch
     * @request GET:/v1/incentives/maker-incentives/statistics
     */
    incentivesControllerGetMakerIncentiveStatistics: (
      query: {
        /**
         * Maker address
         * @example "0x1234567890123456789012345678901234567890"
         */
        maker: string;
        /**
         * Market id
         * @example 1
         */
        marketId: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<MarketMakerIncentiveStatisticsResponse, any>({
        path: `/v1/incentives/maker-incentives/statistics`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),
  };
  volume = {
    /**
     * No description
     *
     * @tags Volume
     * @name VolumeControllerGetVolume
     * @request GET:/v1/volume
     */
    volumeControllerGetVolume: (
      query: {
        /**
         * The user address
         * @example "0x1234567890123456789012345678901234567890"
         */
        user: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<GetVolumeResponse, any>({
        path: `/v1/volume`,
        method: 'GET',
        query: query,
        format: 'json',
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
        method: 'GET',
        format: 'json',
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
      params: RequestParams = {}
    ) =>
      this.request<void, any>({
        path: `/v1/referrals/${userAddress}`,
        method: 'POST',
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
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
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
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
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
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Referral
     * @name ReferralControllerGetReferralRewardsInfo
     * @summary get referral rewards info by user address
     * @request GET:/v1/referrals/{userAddress}/referral-rewards-info
     */
    referralControllerGetReferralRewardsInfo: (userAddress: string, params: RequestParams = {}) =>
      this.request<UserReferralRewardsResponse, any>({
        path: `/v1/referrals/${userAddress}/referral-rewards-info`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Referral
     * @name ReferralControllerGetReferralActivitiesV2
     * @summary get all referral activities by user address (v2 with FixedX18)
     * @request GET:/v2/referrals/{userAddress}/referral-activities
     */
    referralControllerGetReferralActivitiesV2: (userAddress: string, params: RequestParams = {}) =>
      this.request<ReferralActivitiesV2Response, any>({
        path: `/v2/referrals/${userAddress}/referral-activities`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  };
  gasPrice = {
    /**
     * No description
     *
     * @tags gas-price
     * @name GasPriceControllerGetCurrentGasPrice
     * @summary Get current gas price for Arbitrum One
     * @request GET:/v1/gas-price
     */
    gasPriceControllerGetCurrentGasPrice: (params: RequestParams = {}) =>
      this.request<
        {
          /** Gas price in wei as string (multiplied by 1.5) */
          gasPrice?: string;
          /** Actual gas price in Wei */
          actualGasPriceWei?: string;
          /** Actual gas price in USD */
          actualGasPriceUsd?: number;
          /** Timestamp when price was recorded */
          timestamp?: number;
          /** Chain ID (42161 for Arbitrum One) */
          chainId?: number;
        },
        any
      >({
        path: `/v1/gas-price`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags gas-price
     * @name GasPriceControllerEstimateOrderGasCost
     * @summary Estimate gas cost for placing an order
     * @request GET:/v1/gas-price/order-estimate
     */
    gasPriceControllerEstimateOrderGasCost: (params: RequestParams = {}) =>
      this.request<
        {
          /** Estimated gas cost in USD */
          usdValue?: number;
        },
        any
      >({
        path: `/v1/gas-price/order-estimate`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  };
  leaderboard = {
    /**
     * No description
     *
     * @tags Leaderboard
     * @name LeaderboardControllerGetLeaderboard
     * @summary Get leaderboard data
     * @request GET:/v1/leaderboard
     */
    leaderboardControllerGetLeaderboard: (
      query: {
        /**
         * Leaderboard period
         * @example "7d"
         */
        period: 'all_time' | '30d' | '7d';
        /**
         * Token ID for the leaderboard
         * @example 1
         */
        tokenId: number;
        /**
         * Number of entries to return (max 1000)
         * @example 100
         */
        limit?: number;
        /**
         * Offset for pagination
         * @example 0
         */
        offset?: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<LeaderboardResponse, any>({
        path: `/v1/leaderboard`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Leaderboard
     * @name LeaderboardControllerSearchUser
     * @summary Search for specific user in leaderboard
     * @request GET:/v1/leaderboard/search
     */
    leaderboardControllerSearchUser: (
      query: {
        /**
         * User wallet address
         * @example "0x1234567890123456789012345678901234567890"
         */
        userAddress: string;
        /**
         * User account ID
         * @example 0
         */
        accountId: number;
        /**
         * Leaderboard period
         * @example "7d"
         */
        period: 'all_time' | '30d' | '7d';
        /**
         * Token ID for the leaderboard
         * @example 1
         */
        tokenId: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<UserSearchResponse, any>({
        path: `/v1/leaderboard/search`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),
  };
  marketMaker = {
    /**
     * @description Calculate market making score for a given user and time period. MMScore = (MonthlyMakerValue / NetBalanceBefore) * f(MonthlyReturnFactor), where MonthlyMakerValue = MakerValue * 30 / d, MonthlyReturnFactor = (NetBalanceAfter / NetBalanceBefore) ^ (30 / d), f(x) = e^(10*(x-1)), d = period in days
     *
     * @tags Market Maker
     * @name MarketMakerControllerGetScore
     * @summary Get market making score for a time period
     * @request GET:/v1/market-maker/market-making-score
     */
    marketMakerControllerGetScore: (
      query: {
        /**
         * User address
         * @example "0x1234567890123456789012345678901234567890"
         */
        user: string;
        /**
         * Account ID (default: 0)
         * @example 0
         */
        accountId?: number;
        /**
         * Token ID for net balance calculation (default: 1 for BTC)
         * @example 1
         */
        tokenId?: number;
        /**
         * Start timestamp (unix seconds)
         * @example 1733000000
         */
        startTimestamp: number;
        /**
         * End timestamp (unix seconds)
         * @example 1733086400
         */
        endTimestamp: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<MarketMakingScoreResponse, any>({
        path: `/v1/market-maker/market-making-score`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),
  };
  onChainEvents = {
    /**
     * No description
     *
     * @tags On-Chain Events
     * @name OnChainEventsControllerGetEvents
     * @summary Get on-chain events with filters
     * @request GET:/v1/on-chain-events
     */
    onChainEventsControllerGetEvents: (
      query?: {
        /**
         * Maximum number of results to skip.
         * @default 0
         */
        skip?: number;
        /**
         * Maximum number of results to return. The parameter is capped at 5000.
         * @default 10
         */
        limit?: number;
        /**
         * Filter by event name
         * @example "BulkOrdersExecuted"
         */
        eventName?: string;
        /**
         * Filter by source contract address
         * @example "0x8080808080dab95efed788a9214e400ba552def6"
         */
        sourceAddress?: string;
        /**
         * Filter events from this block number (inclusive)
         * @example 375206027
         */
        fromBlockNumber?: number;
        /**
         * Filter events up to this block number (inclusive)
         * @example 375206028
         */
        toBlockNumber?: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<OnChainEventsResponse, any>({
        path: `/v1/on-chain-events`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),
  };
  charts = {
    /**
     * No description
     *
     * @tags Charts
     * @name ChartsControllerGetChartData
     * @summary Get fear and greed index chart data with timeframe support
     * @request GET:/v1/charts/fear-greed-index
     */
    chartsControllerGetChartData: (
      query: {
        /** TimeFrameType { FIVE_MINUTES : 5m, ONE_HOUR : 1h, ONE_DAY : 1d, ONE_WEEK : 1w } */
        timeFrame: '5m' | '1h' | '1d' | '1w';
        /**
         * Start timestamp
         * @default 0
         */
        startTimestamp?: number;
        /**
         * End timestamp, default to current timestamp
         * @default 1767438527
         */
        endTimestamp?: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<FearGreedIndexResponse, any>({
        path: `/v1/charts/fear-greed-index`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),
  };
  moonPhases = {
    /**
     * No description
     *
     * @tags Moon Phases
     * @name MoonPhaseControllerGetMoonPhasesByYear
     * @summary Get moon phases for a specific year
     * @request GET:/v1/moon-phases/year
     */
    moonPhaseControllerGetMoonPhasesByYear: (
      query: {
        /** Year (2010-2050) */
        year: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<
        {
          /** API version from USNO */
          apiversion?: string;
          /** Total number of moon phases in the year */
          numphases?: number;
          phasedata?: {
            /** Day of the month (1-31) */
            day?: number;
            /** Month (1-12) */
            month?: number;
            /** Year */
            year?: number;
            /** Moon phase name (e.g., "New Moon", "Full Moon", "First Quarter") */
            phase?: string;
            /** Time in 24-hour format "HH:MM" */
            time?: string;
          }[];
        },
        void
      >({
        path: `/v1/moon-phases/year`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),
  };
  proxyExternal = {
    /**
     * No description
     *
     * @tags Proxy External
     * @name ProxyExternalControllerProxyChatBot
     * @summary Proxy LLM service Chat Bot request
     * @request POST:/v1/proxy-external/chat-bot/{product_id}
     */
    proxyExternalControllerProxyChatBot: (productId: string, data: Function, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/v1/proxy-external/chat-bot/${productId}`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Proxy External
     * @name ProxyExternalControllerProxyUpvoteBot
     * @summary Proxy Upvote Bot request
     * @request POST:/v1/proxy-external/upvote-bot
     */
    proxyExternalControllerProxyUpvoteBot: (data: Function, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/v1/proxy-external/upvote-bot`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),
  };
  otc = {
    /**
     * No description
     *
     * @tags OTC
     * @name OtcControllerCheckEligibility
     * @summary Check VIP eligibility for OTC trading
     * @request POST:/v1/otc/eligibility
     */
    otcControllerCheckEligibility: (data: CheckEligibilityDto, params: RequestParams = {}) =>
      this.request<CheckEligibilityResponseDto, any>({
        path: `/v1/otc/eligibility`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags OTC
     * @name OtcControllerSubmitOtcRequest
     * @summary Submit OTC trade request
     * @request POST:/v1/otc/requests
     */
    otcControllerSubmitOtcRequest: (data: SubmitOtcRequestDto, params: RequestParams = {}) =>
      this.request<SubmitOtcRequestResponseDto, any>({
        path: `/v1/otc/requests`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags OTC
     * @name OtcControllerGetOtcRequests
     * @summary Get OTC requests for authenticated user
     * @request GET:/v1/otc/requests
     */
    otcControllerGetOtcRequests: (
      query: {
        account: string;
        /** EIP-712 signature */
        signature: string;
        /** Agent address */
        agent: string;
        /** Timestamp */
        timestamp: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<GetOtcRequestsResponseDto, any>({
        path: `/v1/otc/requests`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),
  };
}
