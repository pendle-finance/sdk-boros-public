import { Hex, encodeFunctionData } from 'viem';
import { iExplorerAbi, iMarketHubAbi, iRouterAbi } from '../contracts/viemAbis';
import { MarketAcc, MarketId, OrderId, Side, TimeInForce, TokenId } from './common';

export interface GetUserInfoParams {
  marketAcc: MarketAcc;
}

export interface AccCashParams {
  marketAcc: MarketAcc;
}

interface VaultTransferParams {
  tokenId: TokenId;
  amount: bigint;
  isDeposit: boolean;
}

interface SubaccountTransferParams {
  accountId: number;
  tokenId: TokenId;
  amount: bigint;
  isDeposit: boolean;
}

interface CashTransferReq {
  marketId: MarketId;
  signedAmount: bigint;
}

interface Order {
  cross: boolean;
  marketId: MarketId;
  ammId: number;
  side: Side;
  tif: TimeInForce;
  size: bigint;
  tick: number;
}

interface BulkOrders {
  cross: boolean;
  marketId: MarketId;
  side: Side;
  tif: TimeInForce;
  sizes: bigint[];
  limitTicks: number[];
  idsToStrictCancel: OrderId[];
  desiredMatchRate: bigint;
}

interface BulkCancels {
  cross: boolean;
  marketId: MarketId;
  cancelAll: boolean;
  orderIds: OrderId[];
}

interface LiquidateParams {
  cross: boolean;
  marketId: MarketId;
  violator: MarketAcc;
  sizeToLiquidator: bigint;
}

interface SettlePaymentAndOrdersParams {
  user: MarketAcc;
}

interface SwapWithAmmReq {
  cross: boolean;
  ammId: number;
  signedSize: bigint;
  desiredSwapRate: bigint;
}

interface AddLiquidityDualToAmmReq {
  cross: boolean;
  ammId: number;
  maxCashIn: bigint;
  exactSizeIn: bigint;
  minLpOut: bigint;
}

interface AddLiquiditySingleCashToAmmReq {
  cross: boolean;
  ammId: number;
  netCashIn: bigint;
  minLpOut: bigint;
}

interface RemoveLiquidityDualFromAmmReq {
  cross: boolean;
  ammId: number;
  lpToRemove: bigint;
  minCashOut: bigint;
  minSizeOut: bigint;
  maxSizeOut: bigint;
}

interface RemoveLiquiditySingleCashFromAmmReq {
  cross: boolean;
  ammId: number;
  lpToRemove: bigint;
  minCashOut: bigint;
}

interface PlaceSingleOrderReq {
  order: Order;
  enterMarket: boolean;
  idToStrictCancel: OrderId;
  exitMarket: boolean;
  isolated_cashIn: bigint;
  isolated_cashTransferAll: boolean;
  desiredMatchRate: bigint;
}

interface EnterExitMarketsReq {
  cross: boolean;
  isEnter: boolean;
  marketIds: MarketId[];
}

export const functionEncoder = {
  vaultTransfer(params: VaultTransferParams) {
    return encodeFunctionData({
      abi: iRouterAbi,
      functionName: 'vaultTransfer',
      args: [params.tokenId, params.amount, params.isDeposit],
    });
  },

  subaccountTransfer(params: SubaccountTransferParams) {
    return encodeFunctionData({
      abi: iRouterAbi,
      functionName: 'subaccountTransfer',
      args: [params.accountId, params.tokenId, params.amount, params.isDeposit],
    });
  },

  cashTransfer(req: CashTransferReq) {
    return encodeFunctionData({
      abi: iRouterAbi,
      functionName: 'cashTransfer',
      args: [req],
    });
  },

  placeSingleOrder(req: PlaceSingleOrderReq) {
    return encodeFunctionData({
      abi: iRouterAbi,
      functionName: 'placeSingleOrder',
      args: [req],
    });
  },

  bulkOrders(req: BulkOrders) {
    return encodeFunctionData({
      abi: iRouterAbi,
      functionName: 'bulkOrders',
      args: [req],
    });
  },

  bulkCancels(req: BulkCancels) {
    return encodeFunctionData({
      abi: iRouterAbi,
      functionName: 'bulkCancels',
      args: [req],
    });
  },

  enterExitMarkets(req: EnterExitMarketsReq) {
    return encodeFunctionData({
      abi: iRouterAbi,
      functionName: 'enterExitMarkets',
      args: [req],
    });
  },

  liquidate(params: LiquidateParams) {
    return encodeFunctionData({
      abi: iRouterAbi,
      functionName: 'liquidate',
      args: [params.cross, params.marketId, params.violator, params.sizeToLiquidator],
    });
  },

  settlePaymentAndOrders(params: SettlePaymentAndOrdersParams) {
    return encodeFunctionData({
      abi: iRouterAbi,
      functionName: 'settlePaymentAndOrders',
      args: [params.user],
    });
  },

  swapWithAmm(params: SwapWithAmmReq) {
    return encodeFunctionData({
      abi: iRouterAbi,
      functionName: 'swapWithAmm',
      args: [params],
    });
  },

  addLiquidityDualToAmm(params: AddLiquidityDualToAmmReq) {
    return encodeFunctionData({
      abi: iRouterAbi,
      functionName: 'addLiquidityDualToAmm',
      args: [params],
    });
  },

  addLiquiditySingleCashToAmm(params: AddLiquiditySingleCashToAmmReq) {
    return encodeFunctionData({
      abi: iRouterAbi,
      functionName: 'addLiquiditySingleCashToAmm',
      args: [params],
    });
  },

  removeLiquidityDualFromAmm(params: RemoveLiquidityDualFromAmmReq) {
    return encodeFunctionData({
      abi: iRouterAbi,
      functionName: 'removeLiquidityDualFromAmm',
      args: [params],
    });
  },

  removeLiquiditySingleCashFromAmm(params: RemoveLiquiditySingleCashFromAmmReq) {
    return encodeFunctionData({
      abi: iRouterAbi,
      functionName: 'removeLiquiditySingleCashFromAmm',
      args: [params],
    });
  },

  getUserInfo(params: GetUserInfoParams): Hex {
    return encodeFunctionData({
      abi: iExplorerAbi,
      functionName: 'getUserInfo',
      args: [params.marketAcc],
    });
  },

  accCash(params: AccCashParams) {
    return encodeFunctionData({
      abi: iMarketHubAbi,
      functionName: 'accCash',
      args: [params.marketAcc],
    });
  },
};
