import { FixedX18 } from '@pendle/boros-offchain-math';
import { Address, Hex, WalletClient } from 'viem';
import { BorosBackend } from '../../backend';
import { Side } from '../../types';
import { AgentExecuteParams, MarketAccLib, OrderIdLib, signWithAgent } from '../../utils';
import { Agent, setInternalAgent } from '../agent';
import { publicClient } from './../publicClient';
import {
  BulkPlaceOrderParams,
  CancelOrdersParams,
  CashTransferParams,
  CloseActivePositionsParams,
  DepositParams,
  GetActivePositionsParams,
  GetClosedPositionsParams,
  GetMarketsParams,
  GetOrderBookParams,
  GetPnlLimitOrdersParams,
  ModifyOrderParams,
  PlaceOrderParams,
  UpdateSettingsParams,
  WithdrawParams,
} from './types';
import { decodeLog, parseEvents } from './utils';

export const MIN_DESIRED_MATCH_RATE = FixedX18.fromRawValue(-(2n ** 127n)); // int128
export const MAX_DESIRED_MATCH_RATE = FixedX18.fromRawValue(2n ** 127n - 1n); // int128
export class Exchange {
  static readonly DEFAULT_SLIPPAGE = 0.05;

  private walletClient: WalletClient;
  private root: Address;
  private accountId: number;
  private borosBackendSdk: BorosBackend.DefaultSdk;

  constructor(walletClient: WalletClient, root: Address, accountId: number) {
    this.walletClient = walletClient;
    this.root = root;
    this.accountId = accountId;
    this.borosBackendSdk = BorosBackend.getSdk();
  }

  async bulkSignAndExecute(call: AgentExecuteParams) {
    const sign = await signWithAgent({
      root: this.root,
      accountId: this.accountId,
      call,
    });
    const { data: executeResponse } = await this.borosBackendSdk.calldata.calldataControllerDirectCall({
      ...sign,
      message: {
        ...sign.message,
        nonce: sign.message.nonce.toString(),
      },
    });
    const txHash = executeResponse.txHash;
    const receipt = await publicClient.waitForTransactionReceipt({ hash: txHash as Hex });
    const blockTimestamp = receipt.blockNumber;
    const logGroups = [];
    let events = [];
    const decodedEvents = receipt.logs.map((log) => decodeLog(log));
    for (const event of decodedEvents) {
      if (event && (event.eventName === 'TryAggregateCallSucceeded' || event.eventName === 'TryAggregateCallFailed')) {
        events.push(event);
        logGroups.push([...events]);
        events = [];
      } else {
        events.push(event);
      }
    }

    return logGroups.map((log) => ({
      executeResponse,
      events: log,
      blockTimestamp,
    }));
  }

  async signAndExecute(call: AgentExecuteParams) {
    const sign = await signWithAgent({
      root: this.root,
      accountId: this.accountId,
      call,
    });

    const { data: executeResponse } = await this.borosBackendSdk.calldata.calldataControllerDirectCall({
      ...sign,
      message: {
        ...sign.message,
        nonce: sign.message.nonce.toString(),
      },
    });
    const receipt = await publicClient.waitForTransactionReceipt({ hash: executeResponse.txHash as Hex });
    const blockTimestamp = (await publicClient.getBlock({ blockNumber: receipt.blockNumber })).timestamp;
    const logIndex = executeResponse.index;
    const decodedEvents = receipt.logs.map((log) => decodeLog(log));
    const logGroups = [];
    let events = [];

    for (const event of decodedEvents) {
      if (event && (event.eventName === 'TryAggregateCallSucceeded' || event.eventName === 'TryAggregateCallFailed')) {
        events.push(event);
        logGroups.push([...events]);
        events = [];
      } else {
        events.push(event);
      }
    }

    return { executeResponse, events: logGroups[logIndex], blockTimestamp };
  }

  async placeOrder(params: PlaceOrderParams) {
    const { marketAcc, marketId, side, size, limitTick, tif, slippage } = params;
    const { data: placeOrderCalldataResponse } =
      await this.borosBackendSdk.calldata.calldataControllerGetPlaceOrderCalldata({
        marketAcc,
        marketId,
        side,
        size: size.toString(),
        limitTick,
        tif,
        slippage,
      });

    const placeOrderResponse = await this.signAndExecute(placeOrderCalldataResponse as unknown as AgentExecuteParams);
    const limitOrderPlacedEvent = placeOrderResponse.events.find((event) => event?.eventName === 'LimitOrderPlaced');
    const swapEvent = placeOrderResponse.events.find((event) => event?.eventName === 'Swap');
    const otcSwapEvent = placeOrderResponse.events.find((event) => event?.eventName === 'OtcSwap');
    const limitOrderPartiallyFilledEvent = placeOrderResponse.events.find(
      (event) => event?.eventName === 'LimitOrderPartiallyFilled'
    );
    const limitOrderFilledEvent = placeOrderResponse.events.find((event) => event?.eventName === 'LimitOrderFilled');

    const filledSize =
      (swapEvent?.args.sizeOut ?? 0n) +
      (otcSwapEvent?.args.trade ?? 0n) +
      (limitOrderPartiallyFilledEvent?.args.filledSize ?? 0n);
    const orderInfo = {
      side,
      placedSize: limitOrderPlacedEvent?.args.sizes[0],
      filledSize,
      orderId: limitOrderPlacedEvent?.args.orderIds[0],
      root: this.root,
      marketId,
      accountId: this.accountId,
      isCross: MarketAccLib.isCrossMarket(marketAcc),
      blockTimestamp: placeOrderResponse.blockTimestamp,
      marketAcc,
    };
    const results = {
      executeResponse: placeOrderResponse.executeResponse,
      result: {
        order: orderInfo,
        events: placeOrderResponse.events,
      },
    };
    return results;
  }

  async bulkPlaceOrders(request: BulkPlaceOrderParams) {
    const desiredMatchRate = request.side === Side.LONG ? MAX_DESIRED_MATCH_RATE : MIN_DESIRED_MATCH_RATE;
    const { data: bulkPlaceOrderCalldataResponse } =
      await this.borosBackendSdk.calldata.calldataControllerGetBulkPlaceOrderCalldata({
        marketAcc: request.marketAcc,
        marketId: request.marketId,
        side: request.side,
        sizes: request.sizes.map((size) => size.toString()),
        limitTicks: request.limitTicks,
        tif: request.tif,
        desiredMatchRate: desiredMatchRate.toNumber(),
      });
    const placeOrdersResponse = await this.signAndExecute(
      bulkPlaceOrderCalldataResponse as unknown as AgentExecuteParams
    );
    // const results = placeOrdersResponse.map((response, index) => {
    const event = placeOrdersResponse.events.filter((event) => event?.eventName === 'LimitOrderPlaced')[0];
    let orderInfos;
    if (event?.eventName === 'LimitOrderPlaced') {
      orderInfos = event.args.orderIds.map((orderId, index) => ({
        side: request.side,
        placedSize: event.args.sizes[index],
        orderId: orderId,
        root: this.root,
        marketId: request.marketId,
        accountId: this.accountId,
        isCross: MarketAccLib.isCrossMarket(request.marketAcc),
        blockTimestamp: placeOrdersResponse.blockTimestamp,
        marketAcc: request.marketAcc,
      }));
    }

    return {
      executeResponse: placeOrdersResponse.executeResponse,
      result: {
        orders: orderInfos,
        events: placeOrdersResponse.events,
      },
    };
  }

  async modifyOrder(params: ModifyOrderParams) {
    const { marketAcc, marketId, size, limitTick, tif, orderId } = params;
    const { data: modifyOrderCalldataResponse } =
      await this.borosBackendSdk.calldata.calldataControllerGetModifyOrderCalldata({
        marketAcc,
        marketId,
        size: size.toString(),
        limitTick,
        tif,
        orderId,
      });
    const modifyOrderResponse = await this.signAndExecute(modifyOrderCalldataResponse as unknown as AgentExecuteParams);
    const event = modifyOrderResponse.events.filter((event) => event?.eventName === 'LimitOrderPlaced')[0];
    let orderInfo;
    if (event.eventName === 'LimitOrderPlaced') {
      const { side } = OrderIdLib.unpack(event.args.orderIds[0]);
      orderInfo = {
        side,
        placedSize: event.args.sizes[0],
        orderId: event.args.orderIds[0],
        root: this.root,
        marketId,
        accountId: this.accountId,
        isCross: MarketAccLib.isCrossMarket(marketAcc),
        blockTimestamp: modifyOrderResponse.blockTimestamp,
        marketAcc,
      };
    }
    const results = {
      executeResponse: modifyOrderResponse.executeResponse,
      result: {
        order: orderInfo,
        events: modifyOrderResponse.events,
      },
    };
    return results;
  }

  async bulkModifyOrder(orderRequests: ModifyOrderParams[]) {
    const modifyOrderCalldataResponse = await Promise.all(
      orderRequests.map(async (orderRequest) => {
        return this.modifyOrder(orderRequest);
      })
    );
    return modifyOrderCalldataResponse;
  }

  async cancelOrders(params: CancelOrdersParams) {
    const { marketAcc, marketId, cancelAll, orderIds } = params;
    const orderIdsStr = orderIds.join(',');
    const { data: cancelOrderCalldataResponse } =
      await this.borosBackendSdk.calldata.calldataControllerGetCancelOrderCalldata({
        marketAcc,
        marketId,
        cancelAll,
        orderIds: orderIdsStr,
      });

    const cancelOrderResponse = await this.signAndExecute(cancelOrderCalldataResponse as unknown as AgentExecuteParams);

    const event = cancelOrderResponse.events.filter((event) => event?.eventName === 'LimitOrderCancelled')[0];
    let cancelledOrderInfo;
    if (event?.eventName === 'LimitOrderCancelled') {
      cancelledOrderInfo = event.args;
    }
    const results = {
      executeResponse: cancelOrderResponse.executeResponse,
      result: {
        cancelledOrders: cancelledOrderInfo,
      },
    };
    return results;
  }

  async bulkCancelOrders(cancelOrderRequests: CancelOrdersParams[]) {
    const cancelOrderCalldataResponse = await Promise.all(
      cancelOrderRequests.map(async (cancelOrderRequest) => {
        return this.cancelOrders(cancelOrderRequest);
      })
    );
    return cancelOrderCalldataResponse;
  }

  async scheduleCancel(time?: number) {
    throw new Error('Not implemented');
  }

  async approveAgent(agent?: Agent) {
    const agentToUse = agent ?? (await Agent.create(this.walletClient)).agent;
    setInternalAgent(agentToUse);

    const approveAgentData = await agentToUse.approveAgent(this.walletClient, 10_000_000_000);

    const { data: approveAgentResponse } = await this.borosBackendSdk.calldata.calldataControllerApproveAgent({
      approveAgentCalldata: approveAgentData,
    });

    return approveAgentResponse;
  }

  async deposit(params: DepositParams) {
    const { userAddress, tokenId, amount } = params;
    const { data: depositCalldataResponse } = await this.borosBackendSdk.calldata.calldataControllerGetDepositCalldata({
      userAddress,
      tokenId,
      amount: amount.toString(),
    });
    const hash = await this.walletClient.sendTransaction({
      to: depositCalldataResponse.to as Address,
      data: depositCalldataResponse.data as Hex,
      account: this.root,
      chain: this.walletClient.chain,
      gas: 1_000_000n,
    });

    const receipt = await publicClient.waitForTransactionReceipt({ hash, confirmations: 1 });
    return receipt;
  }

  async withdraw(params: WithdrawParams) {
    const { userAddress, tokenId, amount } = params;
    const { data: withdrawCalldataResponse } =
      await this.borosBackendSdk.calldata.calldataControllerGetWithdrawCalldata({
        userAddress,
        tokenId,
        amount: amount.toString(),
      });

    const hash = await this.walletClient.sendTransaction({
      to: withdrawCalldataResponse.to as Address,
      data: withdrawCalldataResponse.data as Hex,
      account: this.root,
      chain: this.walletClient.chain,
      gas: 1_000_000n,
    });

    const receipt = await publicClient.waitForTransactionReceipt({ hash, confirmations: 1 });
    return receipt;
  }

  async cashTransfer(params: CashTransferParams) {
    const { marketId, isDeposit, amount } = params;
    const { data: cashTransferCalldataResponse } =
      await this.borosBackendSdk.calldata.calldataControllerGetPositionTransferCalldata({
        marketId,
        isDeposit,
        amount: amount.toString(),
      });
    const response = await this.signAndExecute(cashTransferCalldataResponse as unknown as AgentExecuteParams);
    return response;
  }

  async closeActivePositions(params: CloseActivePositionsParams) {
    const { marketAcc, marketId, type, size, rate } = params;
    const { data: closeActivePositionsCalldataResponse } =
      await this.borosBackendSdk.calldata.calldataControllerGetCloseActiveMarketPosition({
        marketAcc,
        marketId,
        type,
        size: size.toString(),
        rate,
      });
    const response = await this.signAndExecute(closeActivePositionsCalldataResponse as unknown as AgentExecuteParams);
    return response;
  }

  async updateSettings(params: UpdateSettingsParams) {
    const { marketAcc, marketId, leverage, signature, agent, timestamp } = params;
    const { data: updateSettingsCalldataResponse } =
      await this.borosBackendSdk.accounts.accountsControllerUpdateAccountSettings({
        marketAcc,
        marketId,
        leverage,
        signature,
        agent,
        timestamp,
      });
    return updateSettingsCalldataResponse;
  }

  async getMarkets(params?: GetMarketsParams) {
    const { skip, limit, isWhitelisted } = params ?? {};
    const { data: getMarketsCalldataResponse } = await this.borosBackendSdk.markets.marketsControllerGetMarkets({
      skip,
      limit,
      isWhitelisted,
    });
    return getMarketsCalldataResponse;
  }

  async getOrderBook(params: GetOrderBookParams) {
    const { marketId, tickSize } = params;
    const { data: getOrderBookCalldataResponse } =
      await this.borosBackendSdk.orderBooks.orderBooksControllerGetOrderBooksByMarketId(marketId, {
        tickSize,
      });
    return getOrderBookCalldataResponse;
  }

  async getPnlLimitOrders(params?: GetPnlLimitOrdersParams) {
    const { skip, limit, isActive, marketId, orderBy } = params ?? {};
    const { data: getPnlLimitOrdersCalldataResponse } = await this.borosBackendSdk.pnL.pnlControllerGetLimitOrders({
      userAddress: this.root,
      accountId: this.accountId,
      marketId,
      skip,
      limit,
      isActive,
      orderBy,
    });
    return getPnlLimitOrdersCalldataResponse;
  }

  async getCollaterals() {
    const { data: getCollateralsCalldataResponse } =
      await this.borosBackendSdk.collaterals.collateralControllerGetAllCollateralSummary({
        userAddress: this.root,
        accountId: this.accountId,
      });
    return getCollateralsCalldataResponse;
  }

  async getAssets() {
    const { data: getAssetsCalldataResponse } = await this.borosBackendSdk.assets.assetsControllerGetAllAssets();
    return getAssetsCalldataResponse;
  }

  async getActivePositions(params: GetActivePositionsParams) {
    const { marketId } = params;
    const { data: getActivePositionsCalldataResponse } =
      await this.borosBackendSdk.pnL.pnlControllerGetActivePnlPositions({
        userAddress: this.root,
        accountId: this.accountId,
        marketId,
      });
    return getActivePositionsCalldataResponse;
  }

  async getClosedPositions(params: GetClosedPositionsParams) {
    const { marketId, skip, limit, orderBy } = params;
    const { data: getClosedPositionsCalldataResponse } =
      await this.borosBackendSdk.pnL.pnlControllerGetClosedPnlPositions({
        userAddress: this.root,
        accountId: this.accountId,
        marketId,
        skip,
        limit,
        orderBy,
      });
    return getClosedPositionsCalldataResponse;
  }
}
