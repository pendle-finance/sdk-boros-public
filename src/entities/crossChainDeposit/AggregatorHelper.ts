import { Address, Hex } from 'viem';
import { TokenAmount } from '../token/Token';

export type QuoteDepositParams = {
  fromChainId: number;
  fromToken: Address;
  fromAddress: Address;

  toToken: Address;
  fromAmount: bigint;

  boxId: number;
  slippage: number;
};

export type QuoteWithdrawParams = {
  toChainId: number;
  fromToken: Address;
  fromAddress: Address;

  toToken: Address;
  fromAmount: bigint;

  slippage: number;
};

export type MakeCallParams = {
  fromChainId: number;
  fromToken: Address;
  fromAddress: Address;

  toChainId: number;
  toToken: Address;
  fromAmount: bigint;
  toAddress: Address;

  slippage: number;
};

export interface AggregatorTransferData {
  aggregatorName: AggregatorName;
  approvalAddress: Address;
  calldata: Hex;
  value: bigint;
  from: Address;
  to: Address;
  chainId: number;
  gasPrice?: bigint;
  gasLimit?: bigint;
}

export interface AggregatorSwapData {
  tokenSpent: Address;
  amountSpent: bigint;
  minAmountSpent: bigint;
  extRouter: Address;
  extCalldata: Hex;
}

export interface AggregatorRoute {
  id: string;
  inputTokenAmount: TokenAmount;
  outputTokenAmount: TokenAmount;
  minOutputTokenAmount: TokenAmount;
  steps: {
    fromTokenAmount: TokenAmount;
    toTokenAmount: TokenAmount;
    executionDuration: number;
    feeCosts?: {
      name: string;
      amountUSD: number;
    }[];
    gasCosts?: {
      tokenAmount: TokenAmount;
      amountUSD?: number;
    }[];
    tool: {
      key?: string;
      name?: string;
      logoURI?: string;
    };
  }[];
}

export interface AggregatorResult {
  routes: AggregatorRoute[];

  getAggregatorName(): AggregatorName;
  getRouteData(routeId: string): Promise<{
    transferData: AggregatorTransferData;
    swapData?: AggregatorSwapData;
  }>;
}

export enum AggregatorName {
  LIFI = 'LIFI',
  PENDLE = 'PENDLE',
  BOROS = 'BOROS',
}

export type AggregatorChain = {
  chainId: number;
  name: string;
  key: string;
  coin: string;
  logoURI?: string;
};

export type AggregatorToken = {
  chainId: number;
  address: Address;
  decimals: number;
  symbol: string;
  name: string;
  logoURI?: string;
};

export enum AggregatorRouteStatus {
  PENDING = 'PENDING',
  DONE = 'DONE',
  NOT_FOUND = 'NOT_FOUND',
  FAILED = 'FAILED',
  INVALID = 'INVALID',
}

export enum IntentStatus {
  PENDING = 'pending',
  ARRIVED = 'arrived',
  DONE = 'done',
  FAILED = 'failed',
  EXPIRED = 'expired',
}

export interface AggregatorHelper {
  aggregatorName: AggregatorName;
  quoteDeposit(params: QuoteDepositParams): Promise<AggregatorResult>;
  quoteWithdraw(params: QuoteWithdrawParams): Promise<AggregatorResult>;
  getRouteStatus(txHash: Hex, ...params: unknown[]): Promise<AggregatorRouteStatus>;
}
