import { Hex } from 'viem';
import { Address } from 'viem';
import { OrderId, Side, TimeInForce } from '../../types/common';
import { CancelData, LongShort } from '../../types';

export type OrderBy = 'timeClosed' | 'positionSize' | 'avgFixedApr' | 'avgUnderlyingApr' | 'pnl';

export type PlaceOrderParams = {
  marketAcc: Hex;
  marketId: number;
  side: Side;
  size: bigint;
  limitTick?: number;
  slippage?: number;
  tif: TimeInForce;
};


export type BulkPlaceOrderParams = {
  marketAcc: Hex;
  marketId: number;
  cancels: CancelData;
  longOrders: Omit<LongShort, 'side'>;
  shortOrders: Omit<LongShort, 'side'>;
}

export type BulkPlaceOrderV2Params = {
  marketAcc: Hex;
  marketId: number;
  sides: Side[];
  sizes: bigint[];
  limitTicks: number[];
  tif: TimeInForce;
  ammId?: number;
  slippage?: number;
};

export type CancelOrdersParams = {
  marketAcc: Hex;
  marketId: number;
  cancelAll: boolean;
  orderIds: string[];
};

export type PayTreasuryParams = {
  isCross: boolean;
  marketId: number;
  usdAmount: number;
};

export type DepositParams = {
  userAddress: Address;
  tokenId: number;
  amount: bigint;
  accountId?: number;
  marketId?: number;
};

export type WithdrawParams = {
  userAddress: Address;
  tokenId: number;
  amount: bigint;
};

export type CashTransferParams = {
  marketId: number;
  isDeposit: boolean;
  amount: bigint;
};

export type CloseActivePositionsParams = {
  marketAcc: Hex;
  marketId: number;
  side: Side;
  size: bigint;
  limitTick: number;
  slippage?: number;
  tif: TimeInForce;
};

export type UpdateSettingsParams = {
  marketAcc: Hex;
  marketId: number;
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
  marketId: number;
  tickSize: 0.00001 | 0.0001 | 0.001 | 0.01 | 0.1;
};

export type GetPnlLimitOrdersParams = {
  skip?: number;
  limit?: number;
  isActive?: boolean;
  marketId?: number;
  orderBy?: OrderBy;
};
