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

export interface MarketFIndexConfigResponse {
  oracle: string;
  paymentPeriod: number;
  maxUpdateDelay: number;
}

export interface MarketConfigResponse {
  openInterestCap: string;
  orderBookFeesFactor: string;
  otcFeesFactor: string;
  settlementFeesFactor: string;
  imFactor: string;
  mmFactor: string;
  /** @deprecated */
  maxMarginIndexRate: string;
  minMarginIndexRate: string;
  minMarginIndexDuration: number;
}

export interface MarketDataResponse {
  volume24h?: number;
  notionalOI?: number;
  /** TWAP apr of the market */
  markApr: number;
  /** last traded apr of the market */
  lastTradedApr: number;
  /** the average of best bid apr and best ask apr of the market */
  impliedApr: number;
  floatingApr: number;
  longYieldApr?: number;
  nextSettlementTime?: number;
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
}

export interface MarketResponse {
  /** marketId used for MarketAcc packing */
  marketId: number;
  /** Market address */
  address: string;
  /** Maturity date of the market */
  maturity: number;
  /** Collateral token address */
  collateralAddress: string;
  /** Isolated only market */
  isIsolatedOnly: boolean;
  fIndexCfg: MarketFIndexConfigResponse;
  config: MarketConfigResponse;
  data?: MarketDataResponse;
  metadata?: MarketMetadataResponse;
  /** Block number of the market creation */
  block: number;
  /** Timestamp of the market creation, in seconds */
  timestamp: number;
  /** indicate whether the market is whitelisted */
  isWhitelisted: boolean;
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

export interface TickResponse {
  /** implied apy */
  ia: number;
  /** bigint string of notional size */
  sz: string;
}

export interface OrderBooksResponse {
  long: TickResponse[];
  short: TickResponse[];
}

export interface SideTickResponse {
  /** implied apy in term of tick size */
  ia: number[];
  /** bigint string of notional size */
  sz: string[];
}

export interface OrderBooksV3Response {
  long: SideTickResponse;
  short: SideTickResponse;
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
  /** bigint string of active position value */
  activePositionValue: string;
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
  liquidationApr: number;
  /** profit 25% apr */
  profit25PercentApr: number;
  /** price impact */
  priceImpact: number;
  /** bigint string of fee */
  fee: string;
  /** bigint string of limit order value */
  limitOrderValue: string;
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
  liquidationApr: number;
  /** profit 25% apr */
  profit25PercentApr: number;
  /** price impact */
  priceImpact: number;
  /** bigint string of fee */
  fee: string;
  /** bigint string of limit order value */
  limitOrderValue: string;
  /** actual leverage */
  actualLeverage: number;
}

export interface AssetMetadataResponse {
  /** Asset name */
  proSymbol: string;
  /** Asset icon */
  icon: string;
  /**
   * Asset accent color
   * @example "#B9BABE"
   */
  accentColor: string;
  /**
   * indicate whether the asset is whitelisted
   * @example false
   */
  isWhiteListed: boolean;
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
  /** indicate whether the asset is whitelisted */
  isWhiteListed: boolean;
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

export interface PlaceOrderQueryDto {
  marketAcc: string;
  marketAddress: string;
  /** comma separated amm addresses */
  ammAddresses?: string;
  /** Side { LONG : 0, SHORT : 1 } */
  side: 0 | 1;
  /** bigint string of size */
  size: string;
  /**
   * @min -32768
   * @max 32767
   */
  limitTick: number;
  /** TimeInForce { GOOD_TIL_CANCELLED : 0, IMMEDIATE_OR_CANCEL : 1, FILL_OR_KILL : 2, POST_ONLY : 3 } */
  tif: 0 | 1 | 2 | 3;
  useOrderBook: boolean;
}

export interface BulkPlaceOrderQueryDto {
  orders: PlaceOrderQueryDto[];
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
  calldata: string;
}

export interface SettingsByMarketResponse {
  /** Market address */
  marketAddress: string;
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
  marketAddress: string;
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
  /** The market address */
  marketAddress: string;
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
  /** The market address */
  marketAddress: string;
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
  /** The market address */
  marketAddress: string;
  /** The transaction time */
  time: number;
  /** Side { LONG : 0, SHORT : 1 } */
  side: 0 | 1;
  /** TxType { NORMAL : normal, LIQUIDATE : liquidate, FORCE_DELEVERAGE : force_deleverage } */
  txType: "normal" | "liquidate" | "force_deleverage";
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

export interface LimitOrderResponse {
  /** Side { LONG : 0, SHORT : 1 } */
  side: 0 | 1;
  /** Original Notional Size of the order */
  placedSize: string;
  /** Remaining Notional Size of the order */
  unfilledSize: string;
  /** the fixed APR of the order */
  impliedApr: number;
  /** Order value */
  orderValue: string;
  /** Margin required */
  marginRequired: string;
  /** Order ID */
  orderId: string;
  /** Maker address */
  root: string;
  /** Market address */
  marketAddress: string;
  /** Maker sub account id */
  accountId: number;
  /** Is cross market */
  isCross: boolean;
  /** LimitOrderStatus { Filling : 0, Cancelled : 1, FullyFilled : 2 } */
  status: 0 | 1 | 2;
  /** OrderType { LIMIT : 0, MARKET : 1 } */
  orderType: 0 | 1;
  /** The block timestamp of the order placement, in seconds */
  blockTimestamp: number;
  /** Account position */
  marketAcc: string;
}

export interface LimitOrdersResponseV2 {
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
  /** The market address */
  marketAddress: string;
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
  marketAddress: string;
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
  /** the address of the collateral */
  collateralAddress: string;
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
  historicalBalances: BalanceResponse[];
  currentBalance: BalanceResponse;
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
     * @name MarketsControllerGetMarketInfo
     * @summary Get market data by address
     * @request GET:/v1/markets/market/{address}
     */
    marketsControllerGetMarketInfo: (address: string, params: RequestParams = {}) =>
      this.request<MarketResponse, any>({
        path: `/v1/markets/market/${address}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Markets
     * @name MarketsControllerGetMarkets
     * @summary Get all markets
     * @request GET:/v1/markets/markets
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
        path: `/v1/markets/markets`,
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
        /** Market address */
        marketAddress: string;
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
        /** Market address */
        marketAddress: string;
        /** ClosePositionType { FIVE_MINUTES : 5m, ONE_HOUR : 1h, ONE_DAY : 1d, ONE_WEEK : 1w } */
        timeFrame: "5m" | "1h" | "1d" | "1w";
        /**
         * Start timestamp
         * @default 0
         */
        startTimestamp?: number;
        /**
         * End timestamp, default to current timestamp
         * @default 1744106150
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
  };
  orderBooks = {
    /**
     * No description
     *
     * @tags OrderBooks
     * @name OrderBooksControllerGetOrderBooks
     * @summary Get order books by marketAddress
     * @request GET:/v1/order-books
     * @deprecated
     */
    orderBooksControllerGetOrderBooks: (
      query: {
        marketAddress: string;
        nSigFigs?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<OrderBooksResponse, any>({
        path: `/v1/order-books`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags OrderBooks
     * @name OrderBooksControllerGetOrderBooksV2
     * @summary Get order books by marketAddress V2
     * @request GET:/v2/order-books
     */
    orderBooksControllerGetOrderBooksV2: (
      query: {
        marketAddress: string;
        tickSize: 0.00001 | 0.0001 | 0.001 | 0.01 | 0.1;
      },
      params: RequestParams = {},
    ) =>
      this.request<OrderBooksResponse, any>({
        path: `/v2/order-books`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

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
      this.request<OrderBooksV3Response, any>({
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
        collateralAddress: string;
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
        collateralAddress: string;
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
        marketAddress: string;
        /** comma separated amm addresses */
        ammAddresses?: string;
        /** Side { LONG : 0, SHORT : 1 } */
        side: 0 | 1;
        /** bigint string of size */
        size: string;
        /**
         * @min -32768
         * @max 32767
         */
        limitTick: number;
        /** TimeInForce { GOOD_TIL_CANCELLED : 0, IMMEDIATE_OR_CANCEL : 1, FILL_OR_KILL : 2, POST_ONLY : 3 } */
        tif: 0 | 1 | 2 | 3;
        useOrderBook: boolean;
        /** @default false */
        mockTransfer?: boolean;
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
        marketAddress: string;
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
        /** market address that the order is modified on */
        marketAddress: string;
        /** order id that is modified */
        orderId: string;
        /** comma separated amm addresses of modified order */
        ammAddresses?: string;
        /** Side { LONG : 0, SHORT : 1 } of modified order */
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
        /** use order book flag of modified order */
        useOrderBook: boolean;
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
        marketAddress: string;
        /** ClosePositionType { LIMIT : limit, MARKET : market } */
        type: "limit" | "market";
        size: string;
        /** Required if type is limit */
        rate?: number;
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
        collateralAddress: string;
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
        collateralAddress: string;
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
        marketAddress: string;
        /** comma separated amm addresses */
        ammAddresses?: string;
        /** Side { LONG : 0, SHORT : 1 } */
        side: 0 | 1;
        /** bigint string of size */
        size: string;
        /**
         * @min -32768
         * @max 32767
         */
        limitTick: number;
        /** TimeInForce { GOOD_TIL_CANCELLED : 0, IMMEDIATE_OR_CANCEL : 1, FILL_OR_KILL : 2, POST_ONLY : 3 } */
        tif: 0 | 1 | 2 | 3;
        useOrderBook: boolean;
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
     * @request GET:/v1/calldata/place-orders
     */
    calldataControllerGetBulkPlaceOrderCalldata: (data: BulkPlaceOrderQueryDto, params: RequestParams = {}) =>
      this.request<AgentExecuteParamsResponse[], any>({
        path: `/v1/calldata/place-orders`,
        method: "GET",
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
        marketAddress: string;
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
        marketAddress: string;
        /** ClosePositionType { LIMIT : limit, MARKET : market } */
        type: "limit" | "market";
        size: string;
        /** Required if type is limit */
        rate?: number;
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
        marketAddress: string;
        orderId: string;
        /** bigint string of size */
        size: string;
        /**
         * @min -32768
         * @max 32767
         */
        tick: number;
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
     * @name CalldataControllerRouterDirectCall
     * @summary Send direct call to router
     * @request POST:/v1/calldata/router-direct-call
     */
    calldataControllerRouterDirectCall: (data: ApproveAgentQueryDto, params: RequestParams = {}) =>
      this.request<TxResponse, any>({
        path: `/v1/calldata/router-direct-call`,
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
      this.request<TxResponse, any>({
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
        marketAddress?: string;
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
        marketAddress?: string;
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
        marketAddress?: string;
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
        marketAddress: string;
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
         * @default 1744106151
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
        marketAddress?: string;
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
      this.request<LimitOrdersResponseV2, any>({
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
        marketAddress?: string;
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
        collateralAddress: string;
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
        /** if not provided, will return balance of all collateral */
        collateralAddress?: string;
        /** Balance chart time { SEVEN_DAYS : 7d, THIRTY_DAYS : 30d, SIXTY_DAYS : 60d, NINETY_DAYS : 90d, ALL_TIME : all } */
        time: "7d" | "30d" | "60d" | "90d" | "all";
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
  };
}
