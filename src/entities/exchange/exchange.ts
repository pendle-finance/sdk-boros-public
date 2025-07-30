import { FixedX18 } from '@pendle/boros-offchain-math';
import { Address, erc20Abi, getContract, Hex, WalletClient } from 'viem';
import { BorosBackend } from '../../backend';
import { BulkAgentExecuteParamsResponseV2 } from '../../backend/secrettune/BorosCoreSDK';
import { MarketAccLib, OrderIdLib, bulkSignWithAgent, signWithAgent } from '../../utils';
import { Agent, setInternalAgent } from '../agent';
import { publicClient } from './../publicClient';
import {
  BulkPlaceOrderParams,
  BulkPlaceOrderV2Params,
  BulkPlaceOrderV3Params,
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
import { Side } from '../../types';

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

  async bulkSignAndExecute(calldatas: Hex[]) {
    const signs = await bulkSignWithAgent({
      root: this.root,
      accountId: this.accountId,
      calldatas,
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

  async signAndExecute(calldata: Hex) {
    const sign = await signWithAgent({
      root: this.root,
      accountId: this.accountId,
      calldata,
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
      await this.borosCoreSdk.calldata.calldataControllerGetPlaceOrderCalldataV4({
        marketAcc,
        marketId,
        side,
        size: size.toString(),
        limitTick,
        tif,
        slippage,
      });

    const placeOrderResponses = await this.bulkSignAndExecute(
      (placeOrderCalldataResponse as BulkAgentExecuteParamsResponseV2).calldatas as Hex[]
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

  async bulkPlaceOrdersV3(request: BulkPlaceOrderV3Params) {
    const { cross, bulks, slippage } = request;
    const originalOrderIds: string[] = [];
    const marketIds = bulks.map(bulk => bulk.marketId);
    const bulkOrders = bulks.flatMap((bulk) => {
      const longSizes = bulk.orders.sizes.filter((_, index) => bulk.orders.sides[index] === Side.LONG);
      const longLimitTicks = bulk.orders.limitTicks.filter((_, index) => bulk.orders.sides[index] === Side.LONG);
      const shortSizes = bulk.orders.sizes.filter((_, index) => bulk.orders.sides[index] === Side.SHORT);
      const shortLimitTicks = bulk.orders.limitTicks.filter((_, index) => bulk.orders.sides[index] === Side.SHORT);
      bulk.orders.limitTicks.forEach((tick, index) => originalOrderIds.push(`${bulk.marketId}-${tick}-${bulk.orders.sides[index]}-${bulk.orders.sizes[index]}`));
      const firstSizes = longSizes.length > 0 ? longSizes : shortSizes;
      const firstLimitTicks = longSizes.length > 0 ? longLimitTicks : shortLimitTicks;
      const firstSide = longSizes.length > 0 ? Side.LONG : Side.SHORT;
      const secondSizes = longSizes.length > 0 ? shortSizes : longSizes;
      const secondLimitTicks = longSizes.length > 0 ? shortLimitTicks : longLimitTicks;
      const secondSide = longSizes.length > 0 ? Side.SHORT : Side.LONG;
      const orders = [];
      orders.push({
        marketId: bulk.marketId,
        orders: {
          tif: bulk.orders.tif,
          sizes: firstSizes.map((size) => size.toString()),
          limitTicks: firstLimitTicks,
          side: firstSide,
        },
        cancelData: {
          ids: bulk.cancelData.ids.map((id) => id.toString()),
          isAll: bulk.cancelData.isAll,
          isStrict: bulk.cancelData.isStrict,
        },
      });
      if(secondSizes.length > 0) {
        orders.push({
          marketId: bulk.marketId,
          orders: {
            tif: bulk.orders.tif,
            sizes: secondSizes.map((size) => size.toString()),
            limitTicks: secondLimitTicks,
            side: secondSide,
          },
          cancelData: {
            ids: [],
            isAll: false,
            isStrict: false,
          },
        });
      }
      return orders;
    })
    const { data: bulkPlaceOrderCalldataResponse } =
      await this.borosCoreSdk.calldata.calldataControllerGetBulkPlaceOrderCalldataV5({
        cross,
        bulks: bulkOrders,
        slippage,
      });
    const bulkOrderResponses = await this.signAndExecute(
      bulkPlaceOrderCalldataResponse.calldatas[0] as Hex
    );

    const limitOrderPlacedEvents = bulkOrderResponses.events.filter((event) => event?.eventName === 'LimitOrderPlaced');
    const limitOrderCancelledEvents = bulkOrderResponses.events.filter((event) => event?.eventName === 'LimitOrderCancelled');
    // const swapEvents = bulkOrderResponses.events.filter((event) => event?.eventName === 'Swap');

    const cancelledOrderIds = limitOrderCancelledEvents.flatMap((event) => event?.args?.orderIds.map((orderId) => orderId.toString()));

    // const orderPlacedMap = new Map<string, {
    //   originalOrderId: string;
    //   orderId: string;
    //   side: Side;
    //   size: bigint;
    //   limitTick: number;
    // }>();

    const orderPlaced = limitOrderPlacedEvents.map((event) => {
      const { side, tickIndex } = OrderIdLib.unpack(event?.args?.orderIds[0]);
      const size = event?.args?.sizes[0];
      const order = {
        // originalOrderId: `${tickIndex}-${side}-${size}`,
        orderId: event?.args?.orderIds[0].toString(),
        side,
        size,
        limitTick: tickIndex,
      }
      // orderPlacedMap.set(`${tickIndex}-${side}-${size}`, order);
      return order;
    });

    // const orderResults= originalOrderIds.map((originalOrderId) => {
    //   const order = orderPlacedMap.get(originalOrderId);
    //   if(!order) {
    //     return {
    //       error: `Order ${originalOrderId} not found`,
    //     }
    //   }
    //   return {
    //     originalOrderId,
    //     orderId: order?.orderId,
    //     side: order?.side,
    //     size: order?.size,
    //     limitTick: order?.limitTick,
    //   }
    // });

    return {  
      executeResponse: bulkOrderResponses.executeResponse,
      result: {
        events: bulkOrderResponses.events,
        orders: orderPlaced,
        cancelledOrderIds,
        blockTimestamp: bulkOrderResponses.blockTimestamp,
        root: this.root,
        accountId: this.accountId,
        isCross: request.cross,
      }
    };

  }

  async bulkPlaceOrders(request: BulkPlaceOrderParams) {
    const { orders } = request;
    const longSizes = orders.sizes.filter((_, index) => orders.sides[index] === Side.LONG);
    const longLimitTicks = orders.limitTicks.filter((_, index) => orders.sides[index] === Side.LONG);
    const shortSizes = orders.sizes.filter((_, index) => orders.sides[index] === Side.SHORT);
    const shortLimitTicks = orders.limitTicks.filter((_, index) => orders.sides[index] === Side.SHORT);
    const originalOrderIds = orders.limitTicks.map((tick, index) => `${tick}-${orders.sides[index]}-${orders.sizes[index]}`);
    const { data: bulkPlaceOrderCalldataResponse } =
      await this.borosCoreSdk.calldata.calldataControllerGetBulkPlaceOrderCalldataV4({
        marketAcc: request.marketAcc,
        marketId: request.marketId,
        cancels: {
          ids: request.cancels.ids.map((id) => id.toString()),
          isAll: request.cancels.isAll,
          isStrict: request.cancels.isStrict,
        },
        longOrders: {
          tif: orders.tif,
          sizes: longSizes.map((size) => size.toString()),
          limitTicks: longLimitTicks,
          side: Side.LONG,
        },
        shortOrders: {
          tif: orders.tif,
          sizes: shortSizes.map((size) => size.toString()),
          limitTicks: shortLimitTicks,
          side: Side.SHORT,
        },
      });
      const bulkOrderResponses = await this.signAndExecute(bulkPlaceOrderCalldataResponse.calldatas[0] as unknown as Hex);
      const limitOrderPlacedEvents = bulkOrderResponses.events.filter((event) => event?.eventName === 'LimitOrderPlaced');
      const longLimitOrderPlacedEvent = limitOrderPlacedEvents[0];
      const shortLimitOrderPlacedEvent = limitOrderPlacedEvents[1];
      const limitOrderCancelledEvent = bulkOrderResponses.events.filter((event) => event?.eventName === 'LimitOrderCancelled')[0];
      // const swapEvents = bulkOrderResponses.events.filter((event) => event?.eventName === 'Swap');
      // const otcSwapEvents = bulkOrderResponses.events.filter((event) => event?.eventName === 'OtcSwap');
      // const limitOrderPartiallyFilledEvents = bulkOrderResponses.events.filter(
      //   (event) => event?.eventName === 'LimitOrderPartiallyFilled'
      // );
      const longOrdersPlaced = longLimitOrderPlacedEvent?.args?.orderIds.map((orderId, index) => { 
        const { side, tickIndex } = OrderIdLib.unpack(orderId);
        const size = longLimitOrderPlacedEvent?.args?.sizes[index];
        return {
          originalOrderId: `${tickIndex}-${side}-${size}`,
          orderId: orderId.toString(),
          side,
          size,
          limitTick: tickIndex,
        }
      }) ?? [];
      const shortOrdersPlaced = shortLimitOrderPlacedEvent?.args?.orderIds.map((orderId, index) => { 
        const { side, tickIndex } = OrderIdLib.unpack(orderId);
        const size = shortLimitOrderPlacedEvent?.args?.sizes[index];
        return {
          originalOrderId: `${tickIndex}-${side}-${size}`,
          orderId: orderId.toString(), 
          side,
          size,
          limitTick: tickIndex,
        }
      }) ?? [];

      const orderPlacedMap = new Map<string, {
        originalOrderId: string;
        orderId: string;
        side: Side;
        size: bigint;
        limitTick: number;
      }>();

      longOrdersPlaced.concat(shortOrdersPlaced).forEach((order) => {
        orderPlacedMap.set(order.originalOrderId, order);
      });

      const orderResults= originalOrderIds.map((originalOrderId) => {
        const order = orderPlacedMap.get(originalOrderId);
        if(!order) {
          return {
            error: `Order ${originalOrderId} not found`,
          }
        }
        return {
          originalOrderId,
          orderId: order?.orderId,
          side: order?.side,
          size: order?.size,
          limitTick: order?.limitTick,
        }
      });
      
      const cancelledOrderIds = limitOrderCancelledEvent?.args?.orderIds.map((orderId) => orderId.toString());

      const cancelledOrdersInfo = cancelledOrderIds ? {
        orderIds: cancelledOrderIds,
        root: this.root,
        marketId: request.marketId,
        accountId: this.accountId,
      } : undefined;

      return {
        executeResponse: bulkOrderResponses.executeResponse,
        result: {
          orders: orderResults,
          cancelledOrders: cancelledOrdersInfo,
          events: bulkOrderResponses.events,
          root: this.root,
          marketId: request.marketId,
          accountId: this.accountId,
          isCross: MarketAccLib.isCrossMarket(request.marketAcc),
          blockTimestamp: bulkOrderResponses.blockTimestamp,
          marketAcc: request.marketAcc,
        },
      };
  }

  async bulkPlaceOrdersV2(request: BulkPlaceOrderV2Params) {
    const { data: bulkPlaceOrderCalldataResponse } =
      await this.borosCoreSdk.calldata.calldataControllerGetBulkPlaceOrderCalldataV3({
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
      (bulkPlaceOrderCalldataResponse as BulkAgentExecuteParamsResponseV2).calldatas as Hex[]
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
      await this.borosCoreSdk.calldata.calldataControllerGetCancelOrderCalldataV3({
        marketAcc,
        marketId,
        cancelAll,
        orderIds: orderIdsStr,
      });

    const cancelOrderResponses = await this.bulkSignAndExecute(
      (cancelOrderCalldataResponse as BulkAgentExecuteParamsResponseV2).calldatas as Hex[]
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
      });
    return getGasBalanceCalldataResponse.balanceInUSD;
  }

  async payTreasury(params: PayTreasuryParams) {
    const { data: payTreasuryCalldataResponse } =
      await this.borosCoreSdk.calldata.calldataControllerGetPayTreasuryCalldataV2(params);

    const payTreasuryResponse = await this.bulkSignAndExecute(
      (payTreasuryCalldataResponse as BulkAgentExecuteParamsResponseV2).calldatas as Hex[]
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
    const [depositCalldataResponse, tokenAddress] = await Promise.all([
      this.borosCoreSdk.calldata.calldataControllerGetDepositCalldataV2({
      userAddress,
      tokenId,
      amount: amount.toString(),
      accountId,
      marketId,
      }),
      params.tokenAddress ? params.tokenAddress : this.borosCoreSdk.assets.assetsControllerGetAllAssets().then(res => {
        const tokenAddress = res.data.assets.find((asset) => asset.tokenId === tokenId)?.address!;
        return tokenAddress;
       })
    ]);
    const tokenContract = getContract({
      abi: erc20Abi,
      address: tokenAddress as Address,
      client: this.walletClient,
    })

    const approvalhash = await tokenContract.write.approve([depositCalldataResponse.data.to as Address, amount], {
      account: this.walletClient.account!,
      chain: this.walletClient.chain,
      gas: 1_000_000n,
      type: 'eip1559'
    });
    await publicClient.waitForTransactionReceipt({ hash: approvalhash, confirmations: 1 });
    const hash = await this.walletClient.sendTransaction({
      to: depositCalldataResponse.data.to as Address,
      data: depositCalldataResponse.data.data as Hex,
      account: this.walletClient.account!,
      chain: this.walletClient.chain,
      gas: 1_000_000n,
      type: 'eip1559'
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
      account: this.walletClient.account!,
      chain: this.walletClient.chain,
      gas: 1_000_000n,
      type: 'eip1559'
    });

    const receipt = await publicClient.waitForTransactionReceipt({ hash, confirmations: 1 });
    return receipt;
  }

  async cashTransfer(params: CashTransferParams) {
    const { marketId, isDeposit, amount } = params;
    const { data: cashTransferCalldataResponse } =
      await this.borosCoreSdk.calldata.calldataControllerGetPositionTransferCalldataV3({
        marketId,
        isDeposit,
        amount: amount.toString(),
      });
    const response = await this.bulkSignAndExecute(
      (cashTransferCalldataResponse as BulkAgentExecuteParamsResponseV2).calldatas as Hex[]
    );
    return response;
  }

  async closeActivePositions(params: CloseActivePositionsParams) {
    const { marketAcc, marketId, side, size, limitTick, tif, slippage } = params;
    const { data: closeActivePositionsCalldataResponse } =
      await this.borosCoreSdk.calldata.calldataControllerGetCloseActiveMarketPositionV4({
        marketAcc,
        marketId,
        side,
        size: size.toString(),
        limitTick,
        tif,
        slippage,
      });
    const response = await this.bulkSignAndExecute(
      (closeActivePositionsCalldataResponse as BulkAgentExecuteParamsResponseV2).calldatas as Hex[]
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
    const { skip, limit, isActive, marketId, orderBy, userAddress, accountId } = params ?? {};
    const { data: getPnlLimitOrdersCalldataResponse } = await this.borosCoreSdk.pnL.pnlControllerGetLimitOrders({
      userAddress: userAddress ?? this.root,
      accountId: accountId ?? this.accountId,
      marketId,
      skip,
      limit,
      isActive,
      orderBy,
    });
    return getPnlLimitOrdersCalldataResponse;
  }

  async getCollaterals({
    userAddress,  
    accountId,
  }: {
    userAddress?: Address;
    accountId?: number;
  }) {
    const { data: getCollateralsCalldataResponse } =
      await this.borosCoreSdk.collaterals.collateralControllerGetAllCollateralSummary({
        userAddress: userAddress ?? this.root,
        accountId: accountId ?? this.accountId,
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
