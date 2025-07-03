import { Address, Hex, encodeFunctionData } from 'viem';
import { iExplorerAbi, iMarketHubAbi, iRouterAbi, iTradeModuleAbi } from '../contracts/viemAbis';
import { MarketAcc, MarketId, OrderId, Side, TimeInForce, TokenId } from './common';

export interface GetUserInfoReq {
  marketAcc: MarketAcc;
}

export interface AccCashReq {
  marketAcc: MarketAcc;
}

export interface VaultTransferReq {
  tokenId: TokenId;
  amount: bigint;
  isDeposit: boolean;
}

export interface SubaccountTransferReq {
  accountId: number;
  tokenId: TokenId;
  marketId: MarketId;
  amount: bigint;
  isDeposit: boolean;
}

export interface CashTransferReq {
  marketId: MarketId;
  signedAmount: bigint;
}

export interface OrderReq {
  cross: boolean;
  marketId: MarketId;
  ammId: number;
  side: Side;
  tif: TimeInForce;
  size: bigint;
  tick: number;
}

export interface CancelData {
  ids: OrderId[];
  isAll: boolean;
  isStrict: boolean;
}

export interface LongShort {
  tif: TimeInForce;
  side: Side;
  sizes: bigint[];
  limitTicks: number[];
}
export interface BulkOrdersReq {
  cross: boolean;
  marketId: MarketId;
  cancels: CancelData;
  orders1: LongShort;
  orders2: LongShort;
  desiredMatchRate1: bigint;
  desiredMatchRate2: bigint;
}

export interface BulkCancelsReq {
  cross: boolean;
  marketId: MarketId;
  cancelAll: boolean;
  orderIds: OrderId[];
}

export interface LiquidateReq {
  cross: boolean;
  marketId: MarketId;
  violator: MarketAcc;
  sizeToLiquidator: bigint;
}

export interface SettlePaymentAndOrdersReq {
  user: MarketAcc;
}

export interface SwapWithAmmReq {
  cross: boolean;
  ammId: number;
  signedSize: bigint;
  desiredSwapRate: bigint;
}

export interface AddLiquidityDualToAmmReq {
  cross: boolean;
  ammId: number;
  maxCashIn: bigint;
  exactSizeIn: bigint;
  minLpOut: bigint;
}

export interface AddLiquiditySingleCashToAmmReq {
  cross: boolean;
  ammId: number;
  netCashIn: bigint;
  minLpOut: bigint;
  enterMarket: boolean;
}

export interface RemoveLiquidityDualFromAmmReq {
  cross: boolean;
  ammId: number;
  lpToRemove: bigint;
  minCashOut: bigint;
  minSizeOut: bigint;
  maxSizeOut: bigint;
}

export interface RemoveLiquiditySingleCashFromAmmReq {
  cross: boolean;
  ammId: number;
  lpToRemove: bigint;
  minCashOut: bigint;
}

export interface PlaceSingleOrderReq {
  order: OrderReq;
  enterMarket: boolean;
  idToStrictCancel: OrderId;
  exitMarket: boolean;
  isolated_cashIn: bigint;
  isolated_cashTransferAll: boolean;
  desiredMatchRate: bigint;
}

export interface EnterExitMarketsReq {
  cross: boolean;
  isEnter: boolean;
  marketIds: MarketId[];
}

export interface VaultDepositReq {
  accountId: number;
  tokenId: TokenId;
  marketId: MarketId;
  amount: bigint;
}

export interface RequestVaultWithdrawalReq {
  tokenId: TokenId;
  amount: bigint;
}

export interface CancelVaultWithdrawalReq {
  tokenId: TokenId;
}

export interface FinalizeVaultWithdrawalReq {
  user: Address;
  tokenId: TokenId;
}

export interface PayTreasuryReq {
  cross: boolean;
  marketId: MarketId;
  amount: bigint;
}

export const functionEncoder = {
  vaultDeposit(params: VaultDepositReq) {
    return encodeFunctionData({
      abi: iTradeModuleAbi,
      functionName: 'vaultDeposit',
      args: [params.accountId, params.tokenId, params.marketId, params.amount],
    });
  },

  requestVaultWithdrawal(params: RequestVaultWithdrawalReq) {
    return encodeFunctionData({
      abi: iTradeModuleAbi,
      functionName: 'requestVaultWithdrawal',
      args: [params.tokenId, params.amount],
    });
  },

  cancelVaultWithdrawal(params: CancelVaultWithdrawalReq) {
    return encodeFunctionData({
      abi: iTradeModuleAbi,
      functionName: 'cancelVaultWithdrawal',
      args: [params.tokenId],
    });
  },

  finalizeVaultWithdrawal(params: FinalizeVaultWithdrawalReq) {
    return encodeFunctionData({
      abi: iTradeModuleAbi,
      functionName: 'finalizeVaultWithdrawal',
      args: [params.user, params.tokenId],
    });
  },

  payTreasury(params: PayTreasuryReq) {
    return encodeFunctionData({
      abi: iTradeModuleAbi,
      functionName: 'payTreasury',
      args: [params],
    });
  },

  subaccountTransfer(params: SubaccountTransferReq) {
    return encodeFunctionData({
      abi: iRouterAbi,
      functionName: 'subaccountTransfer',
      args: [params.accountId, params.tokenId, params.marketId, params.amount, params.isDeposit],
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

  bulkOrders(req: BulkOrdersReq) {
    return encodeFunctionData({
      abi: iRouterAbi,
      functionName: 'bulkOrders',
      args: [req],
    });
  },

  bulkCancels(req: BulkCancelsReq) {
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

  liquidate(params: LiquidateReq) {
    return encodeFunctionData({
      abi: iRouterAbi,
      functionName: 'liquidate',
      args: [params.cross, params.marketId, params.violator, params.sizeToLiquidator],
    });
  },

  settlePaymentAndOrders(params: SettlePaymentAndOrdersReq) {
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

  getUserInfo(params: GetUserInfoReq): Hex {
    return encodeFunctionData({
      abi: iExplorerAbi,
      functionName: 'getUserInfo',
      args: [params.marketAcc],
    });
  },

  accCash(params: AccCashReq) {
    return encodeFunctionData({
      abi: iMarketHubAbi,
      functionName: 'accCash',
      args: [params.marketAcc],
    });
  },
};
