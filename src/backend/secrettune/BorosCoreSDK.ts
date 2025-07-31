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
  timeToMaturity?: number;
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
  /** Is Oracle Funding Rate */
  iofr: boolean;
  /** Oracle Funding Rate */
  ofr: number;
  /** 7DMA Realtime Funding Rate */
  b7dmafr: number;
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
  /** Vault APR */
  vaultApr: number;
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
}

export interface CancelOrderSimulationResponse {
  feeBreakdown: FeeBreakdownResponse;
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
  feeBreakdown: FeeBreakdownResponse;
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

export interface BulkAgentExecuteParamsResponse {
  tag: string;
  /** calldatas */
  datas: string[];
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

export interface BulkPlaceOrderQueryDtoV4 {
  singleOrders?: SingleOrder[];
  bulkOrders?: BulkOrders;
}

export interface BulkPlaceOrderQueryDtoV3 {
  cross: boolean;
  bulks: BulkOrder[];
  /** slippage */
  slippage?: number;
}

export interface BulkPlaceOrderQueryDto {
  marketAcc: string;
  marketId: number;
  cancels: CancelData;
  longOrders: LongShortData;
  shortOrders: LongShortData;
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

export interface FundLocationResponse {
  /** FundType { Wallet : wallet, CrossAccount : cross_account, IsolatedAccount : isolated_account } */
  fundType: 'wallet' | 'cross_account' | 'isolated_account';
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

export interface RiskAllMarketsStatusesResponse {
  /** The market status */
  markets: string[];
}

export interface CalculateLNResponse {
  /** Total Open Interest as a string */
  totalOI: string;
}

export interface RiskGetAmmImpliedRateResponse {
  /** The AMM address */
  address: string;
  /** The AMM implied rate */
  impliedRate: number;
}

export interface PriceDeviationItem {
  /**
   * Timestamp of the price deviation
   * @format date-time
   */
  time: string;
  /** Price deviation value */
  value: number;
}

export interface PriceDeviationResponse {
  /**
   * Start time
   * @format date-time
   */
  startTime: string;
  /**
   * End time
   * @format date-time
   */
  endTime: string;
  /** Price deviation */
  data: PriceDeviationItem[];
}

export interface LnAtRateItem {
  /** LN long at rate */
  long: number;
  /** LN short at rate */
  short: number;
  /** Rate */
  rate: number;
}

export interface LnSnapshotResponse {
  /** The LN at rates */
  data: LnAtRateItem[];
  /**
   * End time of the snapshot
   * @format date-time
   */
  timestamp: string;
}

export interface LnSnapshotSeriesResponse {
  /** The LN snapshot series */
  series: LnSnapshotResponse[];
}

export interface LiquidationSnapshotItem {
  /** Percentage of OI */
  percentage: number;
  /** Long liquidation cost at percentage */
  long: number;
  /** Short liquidation cost at percentage */
  short: number;
}

export interface LiquidationSnapshotResponse {
  /** Liquidation snapshot */
  data: LiquidationSnapshotItem[];
}

export interface UnhealthyVolumeItem {
  /**
   * Timestamp of the unhealthy volume
   * @format date-time
   */
  time: string;
  /** Unhealthy volume value */
  value: number;
}

export interface UnhealthyVolumeResponse {
  /**
   * Start time
   * @format date-time
   */
  startTime: string;
  /**
   * End time
   * @format date-time
   */
  endTime: string;
  /** Unhealthy volume */
  data: UnhealthyVolumeItem[];
}

export interface LongShortCostItem {
  /** Long liquidation cost */
  long: number;
  /** Short liquidation cost */
  short: number;
}

export interface LiquidationCostItem {
  /**
   * Timestamp of the liquidity depth
   * @format date-time
   */
  time: string;
  value: LongShortCostItem;
}

export interface LiquidationCostResponse {
  /**
   * Start time
   * @format date-time
   */
  startTime: string;
  /**
   * End time
   * @format date-time
   */
  endTime: string;
  /** Liquidation cost */
  data: LiquidationCostItem[];
}

export interface TradedVolumeItem {
  /**
   * Timestamp of the traded volume
   * @format date-time
   */
  time: string;
  /** Traded volume value */
  value: number;
}

export interface TradedVolumeResponse {
  /**
   * Start time
   * @format date-time
   */
  startTime: string;
  /**
   * End time
   * @format date-time
   */
  endTime: string;
  /** Traded volume */
  data: TradedVolumeItem[];
}

export interface LongShortLiquidityDepthItem {
  /** Long liquidity depth value */
  long: number;
  /** Short liquidity depth value */
  short: number;
}

export interface LiquidityDepthItemV2 {
  /**
   * Timestamp of the liquidity depth
   * @format date-time
   */
  time: string;
  /** Liquidity depth value */
  value: LongShortLiquidityDepthItem;
}

export interface LiquidityDepthResponseV2 {
  /**
   * Start time
   * @format date-time
   */
  startTime: string;
  /**
   * End time
   * @format date-time
   */
  endTime: string;
  /** Liquidity depth */
  data: LiquidityDepthItemV2[];
}

export interface MarketSnapshotItem {
  /**
   * Timestamp of the market snapshot
   * @format date-time
   */
  time: string;
  /** Mark rate */
  markApr: number;
}

export interface MarketSnapshotResponse {
  /**
   * Start time
   * @format date-time
   */
  startTime: string;
  /**
   * End time
   * @format date-time
   */
  endTime: string;
  /** Market snapshots */
  data: MarketSnapshotItem[];
}

export interface GetAllMarketAccsResponse {
  /** List of all market accounts */
  allMarketAccs: string[];
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

export interface GlobalConfigsResponse {
  /** The global cool down in seconds */
  coolDown: number;
  /** The personal cool down in seconds */
  personalCoolDown?: PersonalConfigResponse;
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
      baseURL: axiosConfig.baseURL || 'http://localhost:8000',
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
 * @baseUrl http://localhost:8000
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
        /** ClosePositionType { FIVE_MINUTES : 5m, ONE_HOUR : 1h, ONE_DAY : 1d, ONE_WEEK : 1w } */
        timeFrame: '5m' | '1h' | '1d' | '1w';
        /**
         * Start timestamp
         * @default 0
         */
        startTimestamp?: number;
        /**
         * End timestamp, default to current timestamp
         * @default 1753936476
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
     */
    ammControllerGetVaultApyChart: (
      query: {
        marketId: number;
        /** TimeFrame { ONE_MINUTE : 1m, FIVE_MINUTES : 5m, ONE_HOUR : 1h, ONE_DAY : 1d, ONE_WEEK : 1w } */
        timeFrame: '1m' | '5m' | '1h' | '1d' | '1w';
        /**
         * Start timestamp
         * @default 0
         */
        startTimestamp?: number;
        /**
         * End timestamp, default to current timestamp
         * @default 1753936476
         */
        endTimestamp?: number;
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
     * @name AssetsControllerGetAllAssets
     * @summary Get all assets
     * @request GET:/v1/assets/all
     */
    assetsControllerGetAllAssets: (params: RequestParams = {}) =>
      this.request<AssetsResponse, any>({
        path: `/v1/assets/all`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  };
  calldata = {
    /**
     * No description
     *
     * @tags Calldata
     * @name CalldataControllerGetDepositCalldata
     * @summary Get deposit from wallet to root margin account calldata
     * @request GET:/v1/calldata/deposit
     * @deprecated
     */
    calldataControllerGetDepositCalldata: (
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
        path: `/v1/calldata/deposit`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

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
     * @name CalldataControllerGetPositionTransferCalldata
     * @summary Get cash transfer contract params
     * @request GET:/v1/calldata/cash-transfer
     * @deprecated
     */
    calldataControllerGetPositionTransferCalldata: (
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
      this.request<AgentExecuteParamsResponse, any>({
        path: `/v1/calldata/cash-transfer`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Calldata
     * @name CalldataControllerGetPositionTransferCalldataV2
     * @summary Get cash transfer contract params
     * @request GET:/v2/calldata/cash-transfer
     * @deprecated
     */
    calldataControllerGetPositionTransferCalldataV2: (
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
      this.request<BulkAgentExecuteParamsResponse, any>({
        path: `/v2/calldata/cash-transfer`,
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
     * @name CalldataControllerGetPlaceOrderCalldataV2
     * @summary Get place limit order contract params
     * @request GET:/v2/calldata/place-order
     * @deprecated
     */
    calldataControllerGetPlaceOrderCalldataV2: (
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
      },
      params: RequestParams = {}
    ) =>
      this.request<AgentExecuteParamsResponse, any>({
        path: `/v2/calldata/place-order`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Calldata
     * @name CalldataControllerGetPlaceOrderCalldataV3
     * @summary Get place limit order contract params
     * @request GET:/v3/calldata/place-order
     * @deprecated
     */
    calldataControllerGetPlaceOrderCalldataV3: (
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
      },
      params: RequestParams = {}
    ) =>
      this.request<BulkAgentExecuteParamsResponse, any>({
        path: `/v3/calldata/place-order`,
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
     * @name CalldataControllerGetBulkPlaceOrderCalldataV5
     * @summary Get place multiple limit orders contract params
     * @request POST:/v5/calldata/place-orders
     */
    calldataControllerGetBulkPlaceOrderCalldataV5: (data: BulkPlaceOrderQueryDtoV3, params: RequestParams = {}) =>
      this.request<BulkAgentExecuteParamsResponseV2, any>({
        path: `/v5/calldata/place-orders`,
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
     * @name CalldataControllerGetBulkPlaceOrderCalldataV4
     * @summary Get place multiple limit orders contract params
     * @request POST:/v4/calldata/place-orders
     */
    calldataControllerGetBulkPlaceOrderCalldataV4: (data: BulkPlaceOrderQueryDto, params: RequestParams = {}) =>
      this.request<BulkAgentExecuteParamsResponseV2, any>({
        path: `/v4/calldata/place-orders`,
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
     * @name CalldataControllerGetBulkPlaceOrderCalldataV2
     * @summary Get place multiple limit orders contract params
     * @request POST:/v2/calldata/place-orders
     */
    calldataControllerGetBulkPlaceOrderCalldataV2: (data: BulkPlaceOrderQueryDtoV2, params: RequestParams = {}) =>
      this.request<BulkAgentExecuteParamsResponse, any>({
        path: `/v2/calldata/place-orders`,
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
     * @name CalldataControllerGetCancelOrderCalldata
     * @summary Get cancel order contract params
     * @request GET:/v1/calldata/cancel-order
     * @deprecated
     */
    calldataControllerGetCancelOrderCalldata: (
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
      this.request<AgentExecuteParamsResponse, any>({
        path: `/v1/calldata/cancel-order`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Calldata
     * @name CalldataControllerGetCancelOrderCalldataV2
     * @summary Get cancel order contract params
     * @request GET:/v2/calldata/cancel-order
     * @deprecated
     */
    calldataControllerGetCancelOrderCalldataV2: (
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
      this.request<BulkAgentExecuteParamsResponse, any>({
        path: `/v2/calldata/cancel-order`,
        method: 'GET',
        query: query,
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
     * @name CalldataControllerGetCloseActiveMarketPositionV2
     * @summary Get close active position contract params
     * @request GET:/v2/calldata/close-active-position
     * @deprecated
     */
    calldataControllerGetCloseActiveMarketPositionV2: (
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
      },
      params: RequestParams = {}
    ) =>
      this.request<AgentExecuteParamsResponse, any>({
        path: `/v2/calldata/close-active-position`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Calldata
     * @name CalldataControllerGetCloseActiveMarketPositionV3
     * @summary Get close active position contract params
     * @request GET:/v3/calldata/close-active-position
     * @deprecated
     */
    calldataControllerGetCloseActiveMarketPositionV3: (
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
      },
      params: RequestParams = {}
    ) =>
      this.request<BulkAgentExecuteParamsResponse, any>({
        path: `/v3/calldata/close-active-position`,
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
     * @name CalldataControllerGetAddLiquiditySingleCashToAmmCalldata
     * @summary Get add liquidity single cash to amm contract params
     * @request GET:/v1/calldata/add-liquidity-single-cash-to-amm
     * @deprecated
     */
    calldataControllerGetAddLiquiditySingleCashToAmmCalldata: (
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
      this.request<AgentExecuteParamsResponse, any>({
        path: `/v1/calldata/add-liquidity-single-cash-to-amm`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Calldata
     * @name CalldataControllerGetAddLiquiditySingleCashToAmmCalldataV2
     * @summary Get add liquidity single cash to amm contract params
     * @request GET:/v2/calldata/add-liquidity-single-cash-to-amm
     * @deprecated
     */
    calldataControllerGetAddLiquiditySingleCashToAmmCalldataV2: (
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
      this.request<BulkAgentExecuteParamsResponse, any>({
        path: `/v2/calldata/add-liquidity-single-cash-to-amm`,
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
     * @name CalldataControllerGetRemoveLiquiditySingleCashFromAmmCalldata
     * @summary Get remove liquidity single cash from amm contract params
     * @request GET:/v1/calldata/remove-liquidity-single-cash-from-amm
     * @deprecated
     */
    calldataControllerGetRemoveLiquiditySingleCashFromAmmCalldata: (
      query: {
        /** bigint string of amount to pay treasury */
        payTreasuryAmount?: string;
        marketId: number;
        lpToRemove: string;
        minCashOut: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<AgentExecuteParamsResponse, any>({
        path: `/v1/calldata/remove-liquidity-single-cash-from-amm`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Calldata
     * @name CalldataControllerGetRemoveLiquiditySingleCashFromAmmCalldataV2
     * @summary Get remove liquidity single cash from amm contract params
     * @request GET:/v2/calldata/remove-liquidity-single-cash-from-amm
     * @deprecated
     */
    calldataControllerGetRemoveLiquiditySingleCashFromAmmCalldataV2: (
      query: {
        /** bigint string of amount to pay treasury */
        payTreasuryAmount?: string;
        marketId: number;
        lpToRemove: string;
        minCashOut: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<BulkAgentExecuteParamsResponse, any>({
        path: `/v2/calldata/remove-liquidity-single-cash-from-amm`,
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
     * @name CalldataControllerGetEnterExitMarketsCalldataV1
     * @summary Get enter exit markets contract params
     * @request GET:/v1/calldata/enter-exit-markets
     */
    calldataControllerGetEnterExitMarketsCalldataV1: (
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
     * @name CalldataControllerGetPayTreasuryCalldata
     * @summary Pay treasury
     * @request GET:/v1/calldata/pay-treasury
     * @deprecated
     */
    calldataControllerGetPayTreasuryCalldata: (
      query: {
        isCross: boolean;
        marketId: number;
        usdAmount: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<BulkAgentExecuteParamsResponse, any>({
        path: `/v1/calldata/pay-treasury`,
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
     * @name PnlControllerGetFilledLimitOrders
     * @summary Get limit orders
     * @request GET:/v1/pnl/limit-orders/filled
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
        /** OrderType { LIMIT : 0, MARKET : 1 } */
        orderType?: 0 | 1;
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
  };
  risk = {
    /**
     * No description
     *
     * @tags Risk
     * @name RiskControllerGetRiskAllMarketsStatuses
     * @summary Get all user statuses
     * @request GET:/v1/risk/all-markets-statuses
     */
    riskControllerGetRiskAllMarketsStatuses: (
      query?: {
        marketId?: number;
        /**
         * Array of user addresses
         * @example ["0x1234...","0x5678..."]
         */
        userAddresses?: string[];
        /** Side { LONG : 0, SHORT : 1 } */
        side?: 0 | 1;
        accountId?: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<RiskAllMarketsStatusesResponse[], any>({
        path: `/v1/risk/all-markets-statuses`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Risk
     * @name RiskControllerCalculateLn
     * @summary Calculate position Open Interest for liquidation at given rate and side
     * @request GET:/v1/risk/calculate-ln
     */
    riskControllerCalculateLn: (
      query: {
        /** Market ID */
        marketId: number;
        /** Rate as a number */
        rateFrom?: number;
        /** Rate as a number */
        rateTo?: number;
        /** Side { LONG : 0, SHORT : 1 } */
        side: 0 | 1;
      },
      params: RequestParams = {}
    ) =>
      this.request<CalculateLNResponse, any>({
        path: `/v1/risk/calculate-ln`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Risk
     * @name RiskControllerGetAmmImpliedRate
     * @summary Get AMM implied rate
     * @request GET:/v1/risk/amm-implied-rate
     */
    riskControllerGetAmmImpliedRate: (
      query: {
        /** Market ID */
        marketId: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<RiskGetAmmImpliedRateResponse, any>({
        path: `/v1/risk/amm-implied-rate`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Risk
     * @name RiskControllerGetPriceDeviation
     * @summary Get price deviation
     * @request GET:/v1/risk/price-deviation
     */
    riskControllerGetPriceDeviation: (
      query: {
        /** Time series frequency in minutes */
        frequency: number;
        marketId: number;
        /** Maximum number of data points to return, default is 10 */
        limit?: number;
        /** Time window to calculate the price deviation in minutes */
        timeWindow: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<PriceDeviationResponse, any>({
        path: `/v1/risk/price-deviation`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Risk
     * @name RiskControllerLnSnapshot
     * @summary Get LN overall snapshot
     * @request GET:/v1/risk/ln-snapshot
     */
    riskControllerLnSnapshot: (
      query: {
        marketId: number;
        /** @format date-time */
        timestamp?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<LnSnapshotResponse, any>({
        path: `/v1/risk/ln-snapshot`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Risk
     * @name RiskControllerLnSnapshotSeries
     * @summary Get LN snapshot series
     * @request GET:/v1/risk/ln-snapshot-series
     */
    riskControllerLnSnapshotSeries: (
      query: {
        /** Time series frequency in minutes */
        frequency: number;
        marketId: number;
        /** Maximum number of data points to return, default is 10 */
        limit?: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<LnSnapshotSeriesResponse, any>({
        path: `/v1/risk/ln-snapshot-series`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Risk
     * @name RiskControllerLiquidationSnapshot
     * @summary Get liquidation snapshot
     * @request GET:/v1/risk/liquidation-snapshot
     */
    riskControllerLiquidationSnapshot: (
      query: {
        marketId: number;
        /** @format date-time */
        timestamp?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<LiquidationSnapshotResponse, any>({
        path: `/v1/risk/liquidation-snapshot`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Risk
     * @name RiskControllerGetUnhealthyVolume
     * @summary Get unhealthy volume
     * @request GET:/v1/risk/unhealthy-volume
     */
    riskControllerGetUnhealthyVolume: (
      query: {
        /** Time series frequency in minutes */
        frequency: number;
        marketId: number;
        /** Maximum number of data points to return, default is 10 */
        limit?: number;
        /** The rate to observe unhealthy volume, 1% is 0.01 */
        rate: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<UnhealthyVolumeResponse, any>({
        path: `/v1/risk/unhealthy-volume`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Risk
     * @name RiskControllerGetLiquidationCost
     * @summary Get liquidation cost
     * @request GET:/v1/risk/liquidation-cost
     */
    riskControllerGetLiquidationCost: (
      query: {
        /** Time series frequency in minutes */
        frequency: number;
        marketId: number;
        /** Maximum number of data points to return, default is 10 */
        limit?: number;
        /** the percentage of Open Interest to calculate liquidation cost, 1% is 0.01 */
        openInterestPercentage: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<LiquidationCostResponse, any>({
        path: `/v1/risk/liquidation-cost`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Risk
     * @name RiskControllerGetTradedVolume
     * @summary Get traded volume
     * @request GET:/v1/risk/traded-volume
     */
    riskControllerGetTradedVolume: (
      query: {
        /** Time series frequency in minutes */
        frequency: number;
        marketId: number;
        /** Maximum number of data points to return, default is 10 */
        limit?: number;
        /** Time window for calculating traded volume in minutes */
        timeWindow: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<TradedVolumeResponse, any>({
        path: `/v1/risk/traded-volume`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Risk
     * @name RiskControllerGetLiquidityDepthV2
     * @summary Get liquidity depth
     * @request GET:/v2/risk/liquidity-depth
     */
    riskControllerGetLiquidityDepthV2: (
      query: {
        /** Time series frequency in minutes */
        frequency: number;
        marketId: number;
        /** Maximum number of data points to return, default is 10 */
        limit?: number;
        /** the price deviation to observe */
        deltaRate: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<LiquidityDepthResponseV2, any>({
        path: `/v2/risk/liquidity-depth`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Risk
     * @name RiskControllerGetMarketSnapshots
     * @summary Get market snapshots
     * @request GET:/v1/risk/market-snapshots
     */
    riskControllerGetMarketSnapshots: (
      query: {
        /** Time series frequency in minutes */
        frequency: number;
        marketId: number;
        /** Maximum number of data points to return, default is 10 */
        limit?: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<MarketSnapshotResponse, any>({
        path: `/v1/risk/market-snapshots`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Risk
     * @name RiskControllerGetAllMarketAccs
     * @summary Get all market accounts
     * @request GET:/v1/risk/all-market-accs
     */
    riskControllerGetAllMarketAccs: (params: RequestParams = {}) =>
      this.request<GetAllMarketAccsResponse, any>({
        path: `/v1/risk/all-market-accs`,
        method: 'GET',
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
        /**
         * The end timestamp
         * @example 1715769600
         */
        toTimestamp?: number;
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
}
