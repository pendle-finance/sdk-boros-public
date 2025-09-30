import { FixedX18, getRateAtTick } from '@pendle/boros-offchain-math';
import {
  http,
  Address,
  BlockNumber,
  Hex,
  PublicClient,
  WalletClient,
  createPublicClient,
  erc20Abi,
  getContract,
} from 'viem';
import { getExplorerContractAddress, getRouterAddress } from '../../addresses';
import { BorosBackend } from '../../backend';
import { BulkAgentExecuteParamsResponseV2, MarketsResponse } from '../../backend/secrettune/BorosCoreSDK';
import { TxResponse } from '../../backend/secrettune/BorosSendTxsBotSDK';
import { getCurrentTimestamp } from '../../common/time';
import { MarketStatus } from '../../common/types';
import { CROSS_MARKET_ID } from '../../constants';
import { ContractsFactory } from '../../contracts/contracts.factory';
import { ApproveAgentReq, functionEncoder, MarketAcc, RevokeAgentReq, Side } from '../../types';
import { MarketAccLib, OrderIdLib, bulkSignWithAgent, signWithAgent } from '../../utils';
import { Agent, setInternalAgent } from '../agent';
import { publicClient } from './../publicClient';
import {
  BulkOrderRequest,
  BulkPlaceOrderParams,
  BulkPlaceOrderV2Params,
  BulkPlaceOrderV3Params,
  BulkPlaceOrderV4Params,
  BulkPlaceOrderV5Params,
  CancelOrdersParams,
  CashTransferParams,
  CloseActivePositionsParams,
  DepositParams,
  GetMarketsParams,
  GetOrderBookParams,
  GetPnlLimitOrdersParams,
  PayTreasuryParams,
  PlaceOrderParams,
  SingleOrderRequest,
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
  private contractsFactory: ContractsFactory;
  private publicClient: PublicClient;
  private agent?: Agent;

  constructor(walletClient: WalletClient, root: Address, accountId: number, rpcUrls: string[], agent?: Agent) {
    this.walletClient = walletClient;
    this.root = root;
    this.accountId = accountId;
    this.borosCoreSdk = BorosBackend.getCoreSdk();
    this.borosSendTxsBotSdk = BorosBackend.getSendTxsBotSdk();
    this.contractsFactory = new ContractsFactory(rpcUrls);
    this.publicClient = this.contractsFactory.getRpcClient();
    this.agent = agent;
  }

  private getAgentForSigning(): Agent | undefined {
    return this.agent;
  }

  setAgent(agent: Agent): void {
    this.agent = agent;
  }

  getAgent(): Agent | undefined {
    return this.agent;
  }

  async enterMarkets(cross: boolean, marketIds: number[]) {
    const marketIdsString = marketIds.map((marketId) => marketId.toString()).join(',');
    const { data: enterMarketsCalldataResponse } =
      await this.borosCoreSdk.calldata.calldataControllerGetEnterExitMarketsCalldata({
        isCross: cross,
        marketIds: marketIdsString,
        isEnter: true,
      });
    const enterMarketsResponses = await this.bulkSignAndExecute(enterMarketsCalldataResponse.calldatas as Hex[]);
    return enterMarketsResponses;
  }

  async bulkSignAndExecute(calldatas: Hex[]) {
    const signs = await bulkSignWithAgent({
      root: this.root,
      accountId: this.accountId,
      calldatas,
      agent: this.getAgentForSigning(),
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
      const blockTimestamp = (await publicClient.getBlock({ blockNumber: receipt.blockNumber })).timestamp;
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
        .filter((txResponse) => txResponse.txResponse.txHash !== undefined);

      const sentTxResponses = logGroups
        .filter((_events, index) => {
          const successExecuteResponse = successExecuteResponses.find(
            (successExecuteResponse) => successExecuteResponse.txResponse.index === index
          );
          return successExecuteResponse !== undefined;
        })
        .map((events, index) => {
          return {
            result: {
              executeResponse: successExecuteResponses[index].txResponse,
              events,
              blockTimestamp,
              blockNumber: receipt.blockNumber,
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
      agent: this.getAgentForSigning(),
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

    return { executeResponse, events: logGroups[logIndex], blockTimestamp, blockNumber: receipt.blockNumber };
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

  async bulkPlaceOrdersV5(request: BulkPlaceOrderV5Params) {
    const { data: bulkPlaceOrderCalldataResponse } =
      await this.borosCoreSdk.calldata.calldataControllerGetBulkPlaceOrderCalldataV7({
        orderRequests: request.orderRequests.map((orderRequest) => {
          if ('size' in orderRequest) {
            return {
              singleOrder: {
                ...orderRequest,
                size: orderRequest.size.toString(),
              },
            };
          }
          return {
            bulkOrder: {
              cross: orderRequest.cross,
              bulks: orderRequest.bulks.map((bulk) => ({
                marketId: bulk.marketId,
                orders: {
                  ...bulk.orders,
                  sizes: bulk.orders.sizes.map((size) => size.toString()),
                },
                cancelData: {
                  ...bulk.cancelData,
                  ids: bulk.cancelData.ids.map((id) => id.toString()),
                },
              })),
              slippage: orderRequest.slippage,
            },
          };
        }),
      });
    const responses = await this.bulkSignAndExecute(bulkPlaceOrderCalldataResponse.calldatas as Hex[]);
    const parseSingleOrderResult = (index: number) => {
      const singleOrderRequest = request.orderRequests[index] as SingleOrderRequest;
      const orderResponse = responses[index];
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
        side: singleOrderRequest!,
        placedSize: limitOrderPlacedEvent?.args.sizes[0],
        filledSize,
        orderId: limitOrderPlacedEvent?.args.orderIds[0],
        root: this.root,
        marketId: singleOrderRequest.marketId,
        accountId: this.accountId,
        isCross: MarketAccLib.isCrossMarket(singleOrderRequest.marketAcc),
        blockTimestamp: orderResponse.blockTimestamp,
        marketAcc: singleOrderRequest.marketAcc,
      };
      return {
        executeResponse: orderResponse.executeResponse,
        blockNumber: orderResponse.blockNumber,
        result: {
          order: orderInfo,
          events: orderResponse.events,
        },
      };
    };
    const parseBulkOrderResult = (index: number) => {
      const bulkOrderRequest = request.orderRequests[index] as BulkOrderRequest;
      const orderResponse = responses[index];
      if ('error' in orderResponse) {
        return {
          error: orderResponse.error,
        };
      }
      if ('error' in orderResponse) return orderResponse;
      const limitOrderPlacedEvents = orderResponse.events.filter((event) => event?.eventName === 'LimitOrderPlaced');
      const limitOrderCancelledEvents = orderResponse.events.filter(
        (event) => event?.eventName === 'LimitOrderCancelled'
      );

      const cancelledOrderIds = limitOrderCancelledEvents.flatMap((event) =>
        event?.args?.orderIds.map((orderId) => orderId.toString())
      );
      const orderPlaced = limitOrderPlacedEvents.flatMap((event) => {
        return event.args.orderIds.map((orderId, id) => {
          const { side, tickIndex } = OrderIdLib.unpack(orderId);
          const size = event.args.sizes[id];
          const order = {
            orderId: orderId.toString(),
            side,
            size,
            limitTick: tickIndex,
          };
          return order;
        });
      });
      return {
        executeResponse: orderResponse.executeResponse,
        blockNumber: orderResponse.blockNumber,
        result: {
          events: orderResponse.events,
          orders: orderPlaced,
          cancelledOrderIds,
          blockTimestamp: orderResponse.blockTimestamp,
          root: this.root,
          accountId: this.accountId,
          isCross: bulkOrderRequest.cross,
        },
      };
    };

    const results = request.orderRequests.map((orderRequest, index) => {
      if ('size' in orderRequest) {
        return parseSingleOrderResult(index);
      }
      return parseBulkOrderResult(index);
    });
    return results;
  }

  async bulkPlaceOrdersV4(request: BulkPlaceOrderV4Params) {
    const { data: bulkPlaceOrderCalldataResponse } =
      await this.borosCoreSdk.calldata.calldataControllerGetBulkPlaceOrderCalldataV6({
        singleOrders: request.singleOrders
          ? request.singleOrders.map((singleOrder) => ({
              ...singleOrder,
              size: singleOrder.size.toString(),
            }))
          : undefined,
        bulkOrders: request.bulkOrders
          ? request.bulkOrders
              .filter((bulkOrder) => bulkOrder.bulks.length > 0)
              .map((bulkOrder) => ({
                cross: bulkOrder.cross,
                bulks: bulkOrder.bulks.map((bulk) => ({
                  marketId: bulk.marketId,
                  orders: {
                    ...bulk.orders,
                    sizes: bulk.orders.sizes.map((size) => size.toString()),
                  },
                  cancelData: {
                    ...bulk.cancelData,
                    ids: bulk.cancelData.ids.map((id) => id.toString()),
                  },
                })),
                slippage: bulkOrder.slippage,
              }))
          : undefined,
      });
    const responses = await this.bulkSignAndExecute(bulkPlaceOrderCalldataResponse.calldatas as Hex[]);
    const startBulkIndex = request.bulkOrders ? responses.length - request.bulkOrders.length : 0;
    const bulkOrdersResponses = request.bulkOrders ? responses.slice(startBulkIndex) : undefined;
    const singleOrdersResponses =
      request.singleOrders && request.bulkOrders
        ? responses.slice(0, startBulkIndex)
        : request.singleOrders
          ? responses
          : undefined;

    const singleOrdersResults = singleOrdersResponses?.map((orderResponse, index) => {
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
        side: request.singleOrders![index],
        placedSize: limitOrderPlacedEvent?.args.sizes[0],
        filledSize,
        orderId: limitOrderPlacedEvent?.args.orderIds[0],
        root: this.root,
        marketId: request.singleOrders![index].marketId,
        accountId: this.accountId,
        isCross: MarketAccLib.isCrossMarket(request.singleOrders![index].marketAcc),
        blockTimestamp: orderResponse.blockTimestamp,
        marketAcc: request.singleOrders![index].marketAcc,
      };
      return {
        executeResponse: orderResponse.executeResponse,
        blockNumber: orderResponse.blockNumber,
        result: {
          order: orderInfo,
          events: orderResponse.events,
        },
      };
    });
    const getBulkOrdersResults = () => {
      if (!bulkOrdersResponses) return undefined;
      return bulkOrdersResponses.map((bulkOrderResponse, index) => {
        if ('error' in bulkOrderResponse) return bulkOrderResponse;
        const limitOrderPlacedEvents = bulkOrderResponse.events.filter(
          (event) => event?.eventName === 'LimitOrderPlaced'
        );
        const limitOrderCancelledEvents = bulkOrderResponse.events.filter(
          (event) => event?.eventName === 'LimitOrderCancelled'
        );

        const cancelledOrderIds = limitOrderCancelledEvents.flatMap((event) =>
          event?.args?.orderIds.map((orderId) => orderId.toString())
        );
        const orderPlaced = limitOrderPlacedEvents.flatMap((event) => {
          return event.args.orderIds.map((orderId, id) => {
            const { side, tickIndex } = OrderIdLib.unpack(orderId);
            const size = event.args.sizes[id];
            const order = {
              orderId: orderId.toString(),
              side,
              size,
              limitTick: tickIndex,
            };
            return order;
          });
        });
        return {
          executeResponse: bulkOrderResponse.executeResponse,
          blockNumber: bulkOrderResponse.blockNumber,
          result: {
            events: bulkOrderResponse.events,
            orders: orderPlaced,
            cancelledOrderIds,
            blockTimestamp: bulkOrderResponse.blockTimestamp,
            root: this.root,
            accountId: this.accountId,
            isCross: request.bulkOrders![index].cross,
          },
        };
      });
    };

    return {
      singleOrders: singleOrdersResults,
      bulkOrders: getBulkOrdersResults(),
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
        blockNumber: orderResponse.blockNumber,
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
    const agentToUse = agent ?? this.agent ?? (await Agent.create(this.walletClient)).agent;

    // If no instance agent is set, set the agent for this instance
    if (!this.agent) {
      this.agent = agentToUse;
    }

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
      params.tokenAddress
        ? params.tokenAddress
        : this.borosCoreSdk.assets.assetsControllerGetAllAssets().then((res) => {
            const tokenAddress = res.data.assets.find((asset) => asset.tokenId === tokenId)?.address!;
            return tokenAddress;
          }),
    ]);
    const tokenContract = getContract({
      abi: erc20Abi,
      address: tokenAddress as Address,
      client: this.walletClient,
    });

    const approvalhash = await tokenContract.write.approve([depositCalldataResponse.data.to as Address, amount], {
      account: this.walletClient.account!,
      chain: this.walletClient.chain,
      gas: 1_000_000n,
      type: 'eip1559',
    });
    await publicClient.waitForTransactionReceipt({ hash: approvalhash, confirmations: 1 });
    const hash = await this.walletClient.sendTransaction({
      to: depositCalldataResponse.data.to as Address,
      data: depositCalldataResponse.data.data as Hex,
      account: this.walletClient.account!,
      chain: this.walletClient.chain,
      gas: 1_000_000n,
      type: 'eip1559',
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
      type: 'eip1559',
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

  async getAmmCutOffTimestamp(marketId: number) {
    const markets = await this.getMarkets();
    const market = markets.results.find((m) => m.marketId === marketId)!;
    const ammContract = this.contractsFactory.getAmmContract(market.metadata?.ammAddress as Address);
    const ammState = await ammContract?.readState();
    return ammState ? Number(ammState.cutOffTimestamp) : undefined;
  }

  async getMarketData(marketId: number): Promise<{
    midApr: number;
    impliedApr: number;
    bestBidApr: number | undefined;
    bestBidTick: number | undefined;
    bestAskApr: number | undefined;
    bestAskTick: number | undefined;
    lastTradedApr: number;
    markApr: number;
    marketStatus: MarketStatus;
  }> {
    const markets = await this.getMarkets();
    const market = markets.results.find((m) => m.marketId === marketId)!;

    const marketContract = this.contractsFactory.getMarketContract(market.address as Address);
    const explorerContract = this.contractsFactory.getExplorerContract(getExplorerContractAddress());
    const ammAddress = market.metadata?.ammAddress;
    const ammContract = ammAddress ? this.contractsFactory.getAmmContract(ammAddress as Address) : undefined;
    const [
      marketInfo,
      bestBidTickAndApr,
      bestAskTickAndApr,
      ammState,
      ammImpliedRateBigInt,
      impliedRateData,
      marketConfig,
    ] = await Promise.all([
      explorerContract.getMarketInfo(market.marketId),
      marketContract.getBestBidTickAndApr(BigInt(market.imData.tickStep)),
      marketContract.getBestAskTickAndApr(BigInt(market.imData.tickStep)),
      ammContract ? ammContract.readState().catch(() => undefined) : undefined,
      ammContract ? ammContract.impliedRate().catch(() => undefined) : undefined,
      marketContract.getImpliedRateData(),
      marketContract.getMarketConfig(),
    ]);
    const beforeCutOff = ammState ? Number(ammState.cutOffTimestamp) > getCurrentTimestamp() : false;
    const { impliedApr, markApr } = marketInfo;

    let midApr = FixedX18.fromRawValue(impliedApr).toNumber();
    if (beforeCutOff && ammImpliedRateBigInt) {
      midApr = FixedX18.fromRawValue(ammImpliedRateBigInt).toNumber();
      if (bestBidTickAndApr) {
        midApr = Math.max(midApr, bestBidTickAndApr.apr.toNumber());
      }
      if (bestAskTickAndApr) {
        midApr = Math.min(midApr, bestAskTickAndApr.apr.toNumber());
      }
    } else if (bestBidTickAndApr && bestAskTickAndApr) {
      midApr = (bestBidTickAndApr.apr.toNumber() + bestAskTickAndApr.apr.toNumber()) / 2;
    }
    return {
      midApr,
      impliedApr: FixedX18.fromRawValue(impliedApr).toNumber(),
      bestBidApr: bestBidTickAndApr?.apr.toNumber(),
      bestBidTick: bestBidTickAndApr?.tick,
      bestAskApr: bestAskTickAndApr?.apr.toNumber(),
      bestAskTick: bestAskTickAndApr?.tick,
      lastTradedApr: FixedX18.fromRawValue(impliedRateData.lastTradedRate).toNumber(),
      markApr: FixedX18.fromRawValue(markApr).toNumber(),
      marketStatus: marketConfig.status,
    };
  }

  private static _getMarketsCache: { [key: string]: { value: MarketsResponse; timestamp: number } } = {};
  private static _getMarketsCacheTTL = 5 * 60 * 1000; // 5 minutes in ms

  public async getMarkets(params?: GetMarketsParams): Promise<MarketsResponse> {
    const cacheKey = JSON.stringify(params ?? {});
    const now = Date.now();
    const cached = Exchange._getMarketsCache[cacheKey];
    if (cached && now - cached.timestamp < Exchange._getMarketsCacheTTL) {
      return cached.value;
    }
    const { skip, limit, isWhitelisted } = params ?? {};
    const { data: getMarketsCalldataResponse } = await this.borosCoreSdk.markets.marketsControllerGetMarkets({
      skip,
      limit,
      isWhitelisted,
    });
    Exchange._getMarketsCache[cacheKey] = { value: getMarketsCalldataResponse, timestamp: now };
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

  async getUserPositions(params: GetPnlLimitOrdersParams) {
    const { marketId, userAddress, accountId, tokenId } = params;
    const explorerContract = this.contractsFactory.getExplorerContract(getExplorerContractAddress());
    const marketAcc = MarketAccLib.pack(userAddress ?? this.root, accountId ?? this.accountId, tokenId, marketId);
    const crossMarketAcc = MarketAccLib.pack(
      userAddress ?? this.root,
      accountId ?? this.accountId,
      tokenId,
      CROSS_MARKET_ID
    );
    const [userInfo, crossUserInfo] = await Promise.all([
      explorerContract.getUserInfo(marketAcc),
      marketId !== CROSS_MARKET_ID ? explorerContract.getUserInfo(crossMarketAcc) : undefined,
    ]);
    const userPositions = userInfo.positions.map((position) => {
      return {
        position,
        marketAcc,
      };
    });
    const crossUserPositions = crossUserInfo?.positions.map((position) => {
      return {
        position,
        marketAcc: crossMarketAcc,
      };
    });
    const positions = userPositions
      .concat(crossUserPositions ?? [])
      .filter((val) => (marketId !== CROSS_MARKET_ID ? val.position.marketId === marketId : true))
      .map((val) => ({
        ...val.position,
        marketAcc: val.marketAcc,
        isCross: MarketAccLib.isCrossMarket(val.marketAcc),
      }));
    return positions;
  }

  private async getPnlLimitOrdersFromContract(params: GetPnlLimitOrdersParams) {
    const { marketId, userAddress, accountId, tokenId } = params;
    const explorerContract = this.contractsFactory.getExplorerContract(getExplorerContractAddress());
    const marketAcc = MarketAccLib.pack(userAddress ?? this.root, accountId ?? this.accountId, tokenId, marketId);
    const crossMarketAcc = MarketAccLib.pack(
      userAddress ?? this.root,
      accountId ?? this.accountId,
      tokenId,
      CROSS_MARKET_ID
    );
    const [userInfo, crossUserInfo, marketInfo, blockNumber] = await Promise.all([
      explorerContract.getUserInfo(marketAcc),
      marketId !== CROSS_MARKET_ID ? explorerContract.getUserInfo(crossMarketAcc) : undefined,
      explorerContract.getMarketInfo(marketId),
      this.publicClient.getBlockNumber(),
    ]);
    const positions = userInfo.positions
      .concat(crossUserInfo?.positions ?? [])
      .filter((position) => (marketId !== CROSS_MARKET_ID ? position.marketId === marketId : true));

    const limitOrders = positions.flatMap((position) => {
      const orders = position.orders;
      return orders.map((order) => {
        const { side, tickIndex } = OrderIdLib.unpack(order.id);
        const size = order.size;
        return {
          side,
          size,
          placedSized: undefined,
          unfilledSize: size,
          tick: tickIndex,
          impliedApr: getRateAtTick(BigInt(tickIndex), BigInt(marketInfo.tickStep)).toNumber(),
          orderId: order.id,
          root: userAddress ?? this.root,
          marketId: position.marketId,
          accountId: accountId ?? this.accountId,
          isCross: MarketAccLib.isCrossMarket(order.maker),
          status: 0,
          orderType: 0,
          marketAcc: order.maker,
        };
      });
    });

    return {
      results: limitOrders,
      total: limitOrders.length,
      blockNumber,
    };
  }

  async getPnlLimitOrders(params: GetPnlLimitOrdersParams) {
    const { skip, limit, isActive, marketId, orderBy, userAddress, accountId, fromContract } = params ?? {};
    if (fromContract) {
      return this.getPnlLimitOrdersFromContract(params);
    }

    const [{ data: getPnlLimitOrdersCalldataResponse }, blockNumber] = await Promise.all([
      this.borosCoreSdk.pnL.pnlControllerGetLimitOrders({
        userAddress: userAddress ?? this.root,
        accountId: accountId ?? this.accountId,
        marketId,
        skip,
        limit,
        isActive,
        orderBy,
      }),
      this.publicClient.getBlockNumber(),
    ]);
    return {
      ...getPnlLimitOrdersCalldataResponse,
      blockNumber,
    };
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

  async getCumulativePnl(params: { marketAcc: MarketAcc; marketId: number }) {
    const { data: getCumulativeFeesCalldataResponse } =
      await this.borosCoreSdk.pnL.pnlControllerGetMarketAccCumulativePnl(params);
    return getCumulativeFeesCalldataResponse;
  }

  async approveAgentData(params: ApproveAgentReq) {
    const calldata = functionEncoder.approveAgent(params);
    return {
      from: params.root,
      to: getRouterAddress(),
      data: calldata,
      gas: 1_000_000n,
    };
  }

  async revokeAgentData(params: RevokeAgentReq) {
    const calldata = functionEncoder.revokeAgent(params);
    return {
      from: params.root,
      to: getRouterAddress(),
      data: calldata,
      gas: 1_000_000n,
    };
  }
}
