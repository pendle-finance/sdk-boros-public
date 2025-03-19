import { Address, Hex, encodeFunctionData } from 'viem';
import { iExplorerAbi, iRouterAbi } from '../contracts/viemAbis';
import { MarketAcc, MarketId, OrderId, Side, TimeInForce, TokenId } from './common';

export interface GetUserInfoParams {
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
  amount: bigint;
  isDeposit: boolean;
}

interface OpenIsolatedPositionRequest {
  order: Order;
  cashIn: bigint;
  enterMarket: boolean;
}

interface Order {
  cross: boolean;
  marketId: MarketId;
  useAmm: boolean;
  side: Side;
  tif: TimeInForce;
  tick: number;
  size: bigint;
}

interface BulkOrders {
  cross: boolean;
  marketId: MarketId;
  side: Side;
  tif: TimeInForce;
  sizes: bigint[];
  limitTicks: number[];
}

interface BulkCancels {
  cross: boolean;
  marketId: MarketId;
  cancelAll: boolean;
  orderIds: OrderId[];
}

interface ModifyOrderReq {
  idToCancel: OrderId;
  newOrder: Order;
}

interface EnterMarketsReq {
  cross: boolean;
  marketIds: MarketId[];
}

interface ExitMarketsReq {
  cross: boolean;
  marketIds: MarketId[];
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
  marketId: MarketId;
  ammAddr: Address;
  signedSize: bigint;
  maxCost: bigint;
}

interface AddLiquidityDualToAmmReq {
  cross: boolean;
  marketId: MarketId;
  ammAddr: Address;
  desiredCashIn: bigint;
  exactSizeIn: bigint;
  minLpOut: bigint;
}

interface AddLiquiditySingleCashToAmmReq {
  cross: boolean;
  marketId: MarketId;
  ammAddr: Address;
  desiredCashIn: bigint;
  minLpOut: bigint;
  maxIteration: bigint;
  eps: bigint;
}

interface RemoveLiquidityDualFromAmmReq {
  cross: boolean;
  marketId: MarketId;
  ammAddr: Address;
  lpToRemove: bigint;
  minCashOut: bigint;
  desiredSizeOut: bigint;
}

interface RemoveLiquiditySingleCashFromAmmReq {
  cross: boolean;
  marketId: MarketId;
  ammAddr: Address;
  lpToRemove: bigint;
  minCashOut: bigint;
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

  openIsolatedPosition(req: OpenIsolatedPositionRequest) {
    return encodeFunctionData({
      abi: iRouterAbi,
      functionName: 'openIsolatedPosition',
      args: [req],
    });
  },

  closeIsolatedPosition(order: Order) {
    return encodeFunctionData({
      abi: iRouterAbi,
      functionName: 'closeIsolatedPosition',
      args: [order],
    });
  },

  placeOrder(order: Order) {
    return encodeFunctionData({
      abi: iRouterAbi,
      functionName: 'placeOrder',
      args: [order],
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

  modifyOrder(req: ModifyOrderReq) {
    return encodeFunctionData({
      abi: iRouterAbi,
      functionName: 'modifyOrder',
      args: [req],
    });
  },

  enterMarkets(req: EnterMarketsReq) {
    return encodeFunctionData({
      abi: iRouterAbi,
      functionName: 'enterMarkets',
      args: [req],
    });
  },

  exitMarkets(req: ExitMarketsReq) {
    return encodeFunctionData({
      abi: iRouterAbi,
      functionName: 'exitMarkets',
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
};
