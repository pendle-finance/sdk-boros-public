import { Hex } from 'viem';
import { Address } from 'viem';
import { Side, TimeInForce } from '../../types/common';

export type OrderBy = 'timeClosed' | 'positionSize' | 'avgFixedApr' | 'avgUnderlyingApr' | 'pnl';

export type PlaceOrderParams = {
  marketAcc: Hex;
  marketAddress: Address;
  ammAddresses: Address[];
  side: Side;
  size: bigint;
  limitTick: number;
  tif: TimeInForce;
  useOrderBook: boolean;
};

export type BulkPlaceOrderParams = {
  marketAcc: Hex;
  marketAddress: Address;
  side: Side;
  sizes: bigint[];
  limitTicks: number[];
  tif: TimeInForce;
  slippage?: number;
};

export type ModifyOrderParams = {
  orderId: string;
  marketAcc: Hex;
  marketAddress: Address;
  size: bigint;
  limitTick: number;
  tif: TimeInForce;
};

export type CancelOrdersParams = {
  marketAcc: Hex;
  marketAddress: Address;
  cancelAll: boolean;
  orderIds: string[];
};

export type DepositParams = {
  userAddress: Address;
  collateralAddress: Address;
  amount: bigint;
};

export type WithdrawParams = {
  userAddress: Address;
  collateralAddress: Address;
  amount: bigint;
};

export type CashTransferParams = {
  marketId: number;
  isDeposit: boolean;
  amount: bigint;
};

export type CloseActivePositionsParams = {
  marketAcc: Hex;
  marketAddress: Address;
  type: 'market' | 'limit';
  size: bigint;
  rate?: number;
};

export type UpdateSettingsParams = {
  marketAcc: Hex;
  marketAddress: Address;
  leverage: number;
  signature: Hex;
  agent: Hex;
  timestamp: number;
};

export type GetMarketsParams = {
  skip?: number;
  limit?: number;
  isWhitelisted?: boolean;
};

export type GetOrderBookParams = {
  marketAddress: Address;
  tickSize: 0.00001 | 0.0001 | 0.001 | 0.01 | 0.1;
};

export type GetPnlLimitOrdersParams = {
  skip?: number;
  limit?: number;
  isActive?: boolean;
  marketAddress?: Address;
  orderBy?: OrderBy;
};

export type GetActivePositionsParams = {
  marketAddress?: Address;
};

export type GetClosedPositionsParams = {
  marketAddress?: Address;
  skip?: number;
  limit?: number;
  orderBy?: OrderBy;
};
