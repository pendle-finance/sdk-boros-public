import { Address, Hex } from 'viem';
import { Account, OrderId } from './common';

export enum TimeInForce {
  GOOD_TIL_CANCELLED = 0,
  IMMEDIATE_OR_CANCEL = 1,
  FILL_OR_KILL = 2,
  POST_ONLY = 3,
}

export type SetAccManagerStruct = {
  account: Account;
  accManager: Address;
  nonce: bigint;
};

export type ApproveAgentStruct = {
  account: Account;
  agent: Address;
  expiry: bigint;
  nonce: bigint;
};

export type OrderStruct = {
  market: Address;
  amms: Address[];
  useOrderbook: boolean;
  isCross: boolean;
  isLong: boolean;
  tick: number;
  size: bigint;
  tif: TimeInForce;
};

export type CancelStruct = {
  market: Address;
  isCross: boolean;
  cancelAll: boolean;
  orderIds: OrderId[];
};

export type PositionTransferStruct = {
  account: Account;
  market: Address;
  isCross: boolean;
  amount: bigint;
  isDeposit: boolean;
  nonce: bigint;
};

export type PendleSignTxStruct = {
  account: Account;
  connectionId: Hex;
  nonce: bigint;
};
