import { FixedX18 } from '@pendle/boros-offchain-math';
import { Address, Hex, WalletClient } from 'viem';
import { BorosBackend } from '../../backend';
import { CROSS_MARKET_ID } from '../../constants';
import { AgentExecuteParams, MarketAccLib, signWithAgent } from '../../utils';
import { BulkAgentExecuteParams, bulkSignWithAgent } from '../../utils/signing/agent';
import { Agent, setInternalAgent } from '../agent';
import { publicClient } from './../publicClient';
import {
  BulkPlaceOrderV2Params,
  CancelOrdersParams,
  CashTransferParams,
  CloseActivePositionsParams,
  DepositParams,
  GetMarketsParams,
  GetOrderBookParams,
  GetPnlLimitOrdersParams,
  PayTreasuryParams,
  PlaceOrderParams,
  UpdateSettingsParams,
  WithdrawParams,
} from './types';
import { decodeLog } from './utils';

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
    const { data: executeResponses } = await this.borosSendTxsBotSdk.agent.agentControllerBulkAgentDirectCallV2({
      datas: signs.map((sign) => ({
        ...sign,
        message: {
          ...sign.message,
          nonce: sign.message.nonce.toString(),
        },
      })),
    });

    const txHash = executeResponses.find((txResponse) => !txResponse.error)?.txHash;
    if (txHash) {
      const receipt = await publicClient.waitForTransactionReceipt({ hash: txHash as Hex });
      const blockTimestamp = receipt.blockNumber;
      const logGroups = [];
      let events = [];
      const decodedEvents = receipt.logs.map((log) => decodeLog(log));
      for (const event of decodedEvents) {
        if (
          event &&
          (event.eventName === 'TryAggregateCallSucceeded' || event.eventName === 'TryAggregateCallFailed')
        ) {
          events.push(event);
          logGroups.push([...events]);
          events = [];
        } else {
          events.push(event);
        }
      }

      const successExecuteResponses = executeResponses
        .map((txResponse, index) => ({
          txResponse,
          id: index,
        }))
        .filter((txResponse) => !txResponse.txResponse.error);

      const sentTxResponses = logGroups.map((events, index) => {
        return {
          result: {
            executeResponse: successExecuteResponses[index].txResponse,
            events,
            blockTimestamp,
          },
          id: successExecuteResponses[index].id,
        };
      });

      const res = executeResponses.map((txResponse, index) => {
        if (txResponse.error) {
          return {
            error: txResponse.error,
          };
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

    const { data: executeResponse } = await this.borosSendTxsBotSdk.agent.agentControllerDirectCallV2({
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
      await this.borosCoreSdk.calldata.calldataControllerGetPlaceOrderCalldataV3({
        marketAcc,
        marketId,
        side,
        size: size.toString(),
        limitTick,
        tif,
        slippage,
      });

    const placeOrderResponses = await this.bulkSignAndExecute(
      placeOrderCalldataResponse as unknown as BulkAgentExecuteParams
    );

    const placeOrderResponse = placeOrderResponses[placeOrderResponses.length - 1];

    if ('error' in placeOrderResponse) {
      throw new Error(placeOrderResponse.error);
    }

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

  async bulkPlaceOrdersV2(request: BulkPlaceOrderV2Params) {
    const { data: bulkPlaceOrderCalldataResponse } =
      await this.borosCoreSdk.calldata.calldataControllerGetBulkPlaceOrderCalldataV2({
        marketAcc: request.marketAcc,
        marketId: request.marketId,
        sides: request.sides,
        sizes: request.sizes.map((size) => size.toString()),
        limitTicks: request.limitTicks,
        tif: request.tif,
        ammId: request.ammId,
        slippage: request.slippage,
      });
    const placeOrdersResponse = await this.bulkSignAndExecute(
      bulkPlaceOrderCalldataResponse as unknown as BulkAgentExecuteParams
    );
    return placeOrdersResponse.map((orderResponse, index) => {
      if ('error' in orderResponse) {
        return {
          error: orderResponse.error,
        };
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
        side: request.sides[index],
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
      };
    });
  }

  async cancelOrders(params: CancelOrdersParams) {
    const { marketAcc, marketId, cancelAll, orderIds } = params;
    const orderIdsStr = orderIds.join(',');
    const { data: cancelOrderCalldataResponse } =
      await this.borosCoreSdk.calldata.calldataControllerGetCancelOrderCalldataV2({
        marketAcc,
        marketId,
        cancelAll,
        orderIds: orderIdsStr,
      });

    const cancelOrderResponses = await this.bulkSignAndExecute(
      cancelOrderCalldataResponse as unknown as BulkAgentExecuteParams
    );

    const cancelOrderResponse = cancelOrderResponses[cancelOrderResponses.length - 1];

    if ('error' in cancelOrderResponse) {
      throw new Error(cancelOrderResponse.error);
    }
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

  async getGasBalance(): Promise<number> {
    const { data: getGasBalanceCalldataResponse } =
      await this.borosCoreSdk.accounts.accountsControllerGetAccountGasBalance({
        userAddress: this.root,
        accountId: this.accountId,
      });
    return getGasBalanceCalldataResponse.balanceInUSD;
  }

  async payTreasury(params: PayTreasuryParams) {
    const { data: payTreasuryCalldataResponse } =
      await this.borosCoreSdk.calldata.calldataControllerGetPayTreasuryCalldata(params);

    const payTreasuryResponse = await this.bulkSignAndExecute(
      payTreasuryCalldataResponse as unknown as BulkAgentExecuteParams
    );
    return payTreasuryResponse;
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
    const { userAddress, tokenId, amount, accountId, marketId } = params;
    const { data: depositCalldataResponse } = await this.borosCoreSdk.calldata.calldataControllerGetDepositCalldataV2({
      userAddress,
      tokenId,
      amount: amount.toString(),
      accountId: accountId ?? 0,
      marketId: marketId ?? CROSS_MARKET_ID,
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
      await this.borosCoreSdk.calldata.calldataControllerGetWithdrawRequestCalldata({
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
      await this.borosCoreSdk.calldata.calldataControllerGetPositionTransferCalldataV2({
        marketId,
        isDeposit,
        amount: amount.toString(),
      });
    const response = await this.bulkSignAndExecute(cashTransferCalldataResponse as unknown as BulkAgentExecuteParams);
    return response;
  }

  async closeActivePositions(params: CloseActivePositionsParams) {
    const { marketAcc, marketId, side, size, limitTick, tif, slippage } = params;
    const { data: closeActivePositionsCalldataResponse } =
      await this.borosCoreSdk.calldata.calldataControllerGetCloseActiveMarketPositionV3({
        marketAcc,
        marketId,
        side,
        size: size.toString(),
        limitTick,
        tif,
        slippage,
      });
    const response = await this.bulkSignAndExecute(
      closeActivePositionsCalldataResponse as unknown as BulkAgentExecuteParams
    );
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
