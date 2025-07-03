import { Address, Hex } from 'viem';

export type Account = Hex;
export type MarketAcc = Hex;

export type TokenId = number;
export type MarketId = number;

export type OrderId = bigint;

export enum TimeInForce {
  GOOD_TIL_CANCELLED = 0,
  IMMEDIATE_OR_CANCEL = 1,
  FILL_OR_KILL = 2,
  ADD_LIQUIDITY_ONLY = 3,
  SOFT_ADD_LIQUIDITY_ONLY = 4,
}

export enum Side {
  LONG = 0,
  SHORT = 1,
}

export type SimulateData = {
  account: Account;
  target: Address;
  data: Hex;
};

export type MarketConfigStruct = {
  maxOpenOrders: number;
  markRateOracle: Address;
  fIndexOracle: Address;
  OICap: bigint;
  takerFee: bigint;
  otcFee: bigint;
  liqIncentive: LiqIncentiveConfig;
  IMFactor: bigint;
  MMFactor: bigint;
  minMarginIndexRate: bigint;
  minMarginIndexDuration: number;
};

export type LiqIncentiveConfig = {
  base: bigint;
  slope: bigint;
};

export type FIndexConfig = {
  oracle: Address;
  paymentPeriod: number;
  maxUpdateDelay: number;
};

export type MarginConfig = {
  q: [bigint, bigint];
  mm: [bigint, bigint, bigint];
};

export type MarginDisc = {
  disc: [bigint, bigint, bigint];
};

export type PendleSignTxStruct = {
  account: Account;
  connectionId: Hex;
  nonce: bigint;
};

export type ApproveAgentMessage = {
  root: Address;
  accountId: number;
  agent: Address;
  expiry: bigint;
  nonce: bigint;
};

export type SetAccManagerStruct = {
  root: Address;
  accountId: number;
  accManager: Address;
  nonce: bigint;
};

export type AMMState = {
  totalFloatAmount: bigint;
  normFixedAmount: bigint;
  totalLp: bigint;
  latestFTime: bigint;
  maturity: bigint;
  seedTime: bigint;
  minAbsRate: bigint;
  maxAbsRate: bigint;
  cutOffTimestamp: bigint;
};
