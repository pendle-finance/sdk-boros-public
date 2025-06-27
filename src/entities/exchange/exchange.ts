import { FixedX18 } from '@pendle/boros-offchain-math';
import { Address, Hex, WalletClient } from 'viem';
import { BorosBackend } from '../../backend';
import { Side } from '../../types';
import { AgentExecuteParams, MarketAccLib, signWithAgent } from '../../utils';
import { Agent, setInternalAgent } from '../agent';
import { publicClient } from './../publicClient';
import {
  BulkPlaceOrderParams,
  CancelOrdersParams,
  CashTransferParams,
  CloseActivePositionsParams,
  DepositParams,
  GetMarketsParams,
  GetOrderBookParams,
  GetPnlLimitOrdersParams,
  ModifyOrderParams,
  PlaceOrderParams,
  UpdateSettingsParams,
  WithdrawParams,
} from './types';
import { decodeLog, parseEvents } from './utils';
import { BulkAgentExecuteParams, bulkSignWithAgent } from '../../utils/signing/agent';

export const MIN_DESIRED_MATCH_RATE = FixedX18.fromRawValue(-(2n ** 127n)); // int128
export const MAX_DESIRED_MATCH_RATE = FixedX18.fromRawValue(2n ** 127n - 1n); // int128
export class Exchange {
  static readonly DEFAULT_SLIPPAGE = 0.05;

  private walletClient: WalletClient;
  private root: Address;
  private accountId: number;
  private borosCoreSdk: BorosBackend.BorosCoreSdk;
  private borosSendTxsBotSdk: BorosBackend.BorosSendTxsBotSdk;

  constructor(walletClient: WalletClient, root: Address, accountId: number) {
    this.walletClient = walletClient;
    this.root = root;
    this.accountId = accountId;
    this.borosCoreSdk = BorosBackend.getCoreSdk();
    this.borosSendTxsBotSdk = BorosBackend.getSendTxsBotSdk();
  }

  async bulkSignAndExecute(bulkAgentExecuteParams: BulkAgentExecuteParams) {
    const signs = await bulkSignWithAgent({
      root: this.root,
      accountId: this.accountId,
      calls: bulkAgentExecuteParams.datas.map((data) => ({
        tag: bulkAgentExecuteParams.tag,
        data,
      })),
    });
    const { data: executeResponses } = await this.borosSendTxsBotSdk.agent.agentControllerBulkAgentDirectCall({
      datas: signs.map((sign) => ({
        ...sign,
        message: {
          ...sign.message,
          nonce: sign.message.nonce.toString(),
        },
      })),
    });


    const txHash = executeResponses.find((txResponse) => !txResponse.error)?.txHash;
    if(txHash) {
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

      const successExecuteResponses = executeResponses.map((txResponse, index) => ({
        txResponse,
        id: index,
      })).filter((txResponse) => !txResponse.txResponse.error);

      const sentTxResponses = logGroups.map((events, index) => {
        return {
          result: {
          executeResponse: successExecuteResponses[index].txResponse,
          events,
          blockTimestamp,
        },
        id: successExecuteResponses[index].id,
      }
      });

      const res =  executeResponses.map((txResponse, index) => {
        if(txResponse.error) {
          return {
            error: txResponse.error,
          }
        }
        const executeResponse = sentTxResponses.filter((successTxResponse) => successTxResponse.id === index)[0];
        return executeResponse.result;
      });
      return res;
    }
    return executeResponses.map((txResponse) => ({
      error: txResponse.error,
    }));
  }

  async signAndExecute(call: AgentExecuteParams) {
    const sign = await signWithAgent({
      root: this.root,
      accountId: this.accountId,
      call,
    });

    const { data: executeResponse } = await this.borosSendTxsBotSdk.agent.agentControllerDirectCall({
      ...sign,
      message: {
        ...sign.message,
        nonce: sign.message.nonce.toString(),
      },
    });
    if (executeResponse.error) {
      throw new Error(executeResponse.error);
    }
    const receipt = await publicClient.waitForTransactionReceipt({ hash: executeResponse.txHash as Hex });
    const blockTimestamp = (await publicClient.getBlock({ blockNumber: receipt.blockNumber })).timestamp;
    const logIndex = executeResponse.index!;
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
      await this.borosCoreSdk.calldata.calldataControllerGetPlaceOrderCalldataV2({
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

  async bulkPlaceOrdersV2(request: BulkPlaceOrderParams) {
    const { data: bulkPlaceOrderCalldataResponse } =
      await this.borosCoreSdk.calldata.calldataControllerGetBulkPlaceOrderCalldataV2({
        marketAcc: request.marketAcc,
        marketId: request.marketId,
        side: request.side,
        sizes: request.sizes.map((size) => size.toString()),
        limitTicks: request.limitTicks,
        tif: request.tif,
      });
    const placeOrdersResponse = await this.bulkSignAndExecute(
      bulkPlaceOrderCalldataResponse as unknown as BulkAgentExecuteParams
    );
    return placeOrdersResponse.map(orderResponse => {
      if('error' in orderResponse) {
        return {
          error: orderResponse.error,
        }
      }
      const limitOrderPlacedEvent = orderResponse.events.find((event) => event?.eventName === 'LimitOrderPlaced');
      const swapEvent = orderResponse.events.find((event) => event?.eventName === 'Swap');
      const otcSwapEvent = orderResponse.events.find((event) => event?.eventName === 'OtcSwap');
      const limitOrderPartiallyFilledEvent = orderResponse.events.find(
        (event) => event?.eventName === 'LimitOrderPartiallyFilled'
      );

      const filledSize =
        (swapEvent?.args.sizeOut ?? 0n) +
        (otcSwapEvent?.args.trade ?? 0n) +
        (limitOrderPartiallyFilledEvent?.args.filledSize ?? 0n);
      const orderInfo = {
        side: request.side,
        placedSize: limitOrderPlacedEvent?.args.sizes[0],
        filledSize,
        orderId: limitOrderPlacedEvent?.args.orderIds[0],
        root: this.root,
        marketId: request.marketId,
        accountId: this.accountId,
        isCross: MarketAccLib.isCrossMarket(request.marketAcc),
        blockTimestamp: orderResponse.blockTimestamp,
        marketAcc: request.marketAcc,
      };
      return {
        executeResponse: orderResponse.executeResponse,
        result: {
          order: orderInfo,
          events: orderResponse.events,
        },
      }
    });
  }

  async bulkPlaceOrders(request: BulkPlaceOrderParams) {
    const desiredMatchRate = request.side === Side.LONG ? MAX_DESIRED_MATCH_RATE : MIN_DESIRED_MATCH_RATE;
    const { data: bulkPlaceOrderCalldataResponse } =
      await this.borosCoreSdk.calldata.calldataControllerGetBulkPlaceOrderCalldata({
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

  async cancelOrders(params: CancelOrdersParams) {
    const { marketAcc, marketId, cancelAll, orderIds } = params;
    const orderIdsStr = orderIds.join(',');
    const { data: cancelOrderCalldataResponse } =
      await this.borosCoreSdk.calldata.calldataControllerGetCancelOrderCalldata({
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

    // set expired time to the next 7 days
    const expiredTime = Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60;
    const approveAgentData = await agentToUse.approveAgent(this.walletClient, expiredTime);

    const { data: approveAgentResponse } = await this.borosSendTxsBotSdk.agent.agentControllerApproveAgent({
      approveAgentCalldata: approveAgentData,
    });

    return approveAgentResponse;
  }

  async deposit(params: DepositParams) {
    const { userAddress, tokenId, amount } = params;
    const { data: depositCalldataResponse } = await this.borosCoreSdk.calldata.calldataControllerGetDepositCalldata({
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
    const { data: withdrawCalldataResponse } = await this.borosCoreSdk.calldata.calldataControllerGetWithdrawCalldata({
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
      await this.borosCoreSdk.calldata.calldataControllerGetPositionTransferCalldata({
        marketId,
        isDeposit,
        amount: amount.toString(),
      });
    const response = await this.signAndExecute(cashTransferCalldataResponse as unknown as AgentExecuteParams);
    return response;
  }

  async closeActivePositions(params: CloseActivePositionsParams) {
    const { marketAcc, marketId, side, size, limitTick, tif, slippage } = params;
    const { data: closeActivePositionsCalldataResponse } =
      await this.borosCoreSdk.calldata.calldataControllerGetCloseActiveMarketPositionV2({
        marketAcc,
        marketId,
        side,
        size: size.toString(),
        limitTick,
        tif,
        slippage,
      });
    const response = await this.signAndExecute(closeActivePositionsCalldataResponse as unknown as AgentExecuteParams);
    return response;
  }

  async updateSettings(params: UpdateSettingsParams) {
    const { marketAcc, marketId, leverage, signature, agent, timestamp } = params;
    const { data: updateSettingsCalldataResponse } =
      await this.borosCoreSdk.accounts.accountsControllerUpdateAccountSettings({
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
    const { data: getMarketsCalldataResponse } = await this.borosCoreSdk.markets.marketsControllerGetMarkets({
      skip,
      limit,
      isWhitelisted,
    });
    return getMarketsCalldataResponse;
  }

  async getOrderBook(params: GetOrderBookParams) {
    const { marketId, tickSize } = params;
    const { data: getOrderBookCalldataResponse } =
      await this.borosCoreSdk.orderBooks.orderBooksControllerGetOrderBooksByMarketId(marketId, {
        tickSize,
      });
    return getOrderBookCalldataResponse;
  }

  async getPnlLimitOrders(params?: GetPnlLimitOrdersParams) {
    const { skip, limit, isActive, marketId, orderBy } = params ?? {};
    const { data: getPnlLimitOrdersCalldataResponse } = await this.borosCoreSdk.pnL.pnlControllerGetLimitOrders({
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
      await this.borosCoreSdk.collaterals.collateralControllerGetAllCollateralSummary({
        userAddress: this.root,
        accountId: this.accountId,
      });
    return getCollateralsCalldataResponse;
  }

  async getAssets() {
    const { data: getAssetsCalldataResponse } = await this.borosCoreSdk.assets.assetsControllerGetAllAssets();
    return getAssetsCalldataResponse;
  }

  async getAmmInfoByAmmId(ammId: number) {
    const { data: getAmmInfoCalldataResponse } = await this.borosCoreSdk.amm.ammControllerGetAmmInfoByAmmId(ammId);
    return getAmmInfoCalldataResponse;
  }
}
