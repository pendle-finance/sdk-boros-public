import axios, { AxiosInstance } from 'axios';
import { Hex, zeroAddress } from 'viem';
import { arbitrum } from 'viem/chains';
import { DepositBoxFactoryContract } from '../../../../contracts/deposit-box-factory';
import { TokenAmount } from '../../../token/Token';
import {
  AggregatorTransferData,
  AggregatorHelper,
  AggregatorName,
  AggregatorResult,
  AggregatorRoute,
  AggregatorRouteStatus,
  AggregatorSwapData,
  QuoteDepositParams,
  QuoteWithdrawParams,
} from '../../AggregatorHelper';
import { classifyAggregatorError } from '../../AggregatorHelperErrors';
import { ensureCalldataHasBoxAddress, ensureDepositBoxAddress } from '../../helpers/utils';
import {
  GetRoutesOrder,
  LifiGetRouteResponse,
  LifiGetRouteStatusRequest,
  LifiGetRouteStatusResponse,
  LifiGetRoutesRequest,
  LifiGetRoutesResponse,
  LifiGetRoutesStep,
} from './types';
import { toAddress } from '../../../../addresses';

export const LIFI_API = 'https://li.quest/v1';

export class LifiAggregatorResult implements AggregatorResult {
  private readonly aggregatorHelper: LifiAggregatorHelper;

  routes: AggregatorRoute[];
  private rawResult: LifiGetRouteResponse[];
  private req: LifiGetRoutesRequest;

  constructor(params: {
    req: LifiGetRoutesRequest;
    res: LifiGetRoutesResponse;
    aggregatorHelper: LifiAggregatorHelper;
  }) {
    const { req, res, aggregatorHelper } = params;
    this.req = req;

    const validRoutes = res.routes.filter((route) => this.isValidRoute(route));

    this.routes = validRoutes.map(({ id, fromAmount, fromToken, toAmount, toToken, steps, toAmountMin }) => ({
      id,
      inputTokenAmount: TokenAmount.createFromLifi(fromToken, fromAmount),
      outputTokenAmount: TokenAmount.createFromLifi(toToken, toAmount),
      minOutputTokenAmount: TokenAmount.createFromLifi(toToken, toAmountMin),
      steps: steps.map((step) => ({
        fromTokenAmount: TokenAmount.createFromLifi(step.action.fromToken, step.action.fromAmount),
        toTokenAmount: TokenAmount.createFromLifi(step.action.toToken, step.estimate.toAmount),
        executionDuration: step.estimate.executionDuration,
        feeCosts: step.estimate.feeCosts?.map((feeCost) => ({
          name: feeCost.name,
          amountUSD: Number(feeCost.amountUSD),
        })),
        gasCosts: step.estimate.gasCosts?.map((gasCost) => ({
          tokenAmount: TokenAmount.createFromLifi(gasCost.token, gasCost.amount),
          amountUSD: Number(gasCost.amountUSD),
        })),
        tool: {
          key: step.toolDetails.key,
          name: step.toolDetails.name,
          logoURI: step.toolDetails.logoURI,
        },
      })),
    }));
    this.rawResult = validRoutes;
    this.aggregatorHelper = aggregatorHelper;
  }

  private isValidRoute(route: LifiGetRouteResponse): boolean {
    return route.steps.length === 1;
  }

  getAggregatorName(): AggregatorName {
    return AggregatorName.LIFI;
  }

  getRouteData = async (
    routeId: string
  ): Promise<{ transferData: AggregatorTransferData; swapData: AggregatorSwapData }> => {
    const route = this.rawResult.find((route) => route.id === routeId);
    if (route == null) {
      throw new Error(`Route not found: ${routeId}`);
    }
    const [step] = route.steps;
    const result = await this.aggregatorHelper.assemble(step);

    ensureCalldataHasBoxAddress(result.calldata, this.req.toAddress);
    return {
      transferData: result,
      swapData: {
        tokenSpent: toAddress(this.req.toTokenAddress),
        amountSpent: BigInt(route.toAmount),
        minAmountSpent: BigInt(route.toAmountMin),
        extRouter: zeroAddress,
        extCalldata: '0x',
      },
    };
  };
}

export class LifiWithdrawResult implements AggregatorResult {
  private readonly aggregatorHelper: LifiAggregatorHelper;

  routes: AggregatorRoute[];
  private rawResult: LifiGetRouteResponse[];
  private req: LifiGetRoutesRequest;

  constructor(params: {
    req: LifiGetRoutesRequest;
    res: LifiGetRoutesResponse;
    aggregatorHelper: LifiAggregatorHelper;
  }) {
    const { req, res, aggregatorHelper } = params;
    this.req = req;

    const validRoutes = res.routes.filter((route) => this.isValidRoute(route));

    this.routes = validRoutes.map(({ id, fromAmount, fromToken, toAmount, toToken, steps, toAmountMin }) => ({
      id,
      inputTokenAmount: TokenAmount.createFromLifi(fromToken, fromAmount),
      outputTokenAmount: TokenAmount.createFromLifi(toToken, toAmount),
      minOutputTokenAmount: TokenAmount.createFromLifi(toToken, toAmountMin),
      steps: steps.map((step) => ({
        fromTokenAmount: TokenAmount.createFromLifi(step.action.fromToken, step.action.fromAmount),
        toTokenAmount: TokenAmount.createFromLifi(step.action.toToken, step.estimate.toAmount),
        executionDuration: step.estimate.executionDuration,
        feeCosts: step.estimate.feeCosts?.map((feeCost) => ({
          name: feeCost.name,
          amountUSD: Number(feeCost.amountUSD),
        })),
        gasCosts: step.estimate.gasCosts?.map((gasCost) => ({
          tokenAmount: TokenAmount.createFromLifi(gasCost.token, gasCost.amount),
          amountUSD: Number(gasCost.amountUSD),
        })),
        tool: {
          key: step.toolDetails.key,
          name: step.toolDetails.name,
          logoURI: step.toolDetails.logoURI,
        },
      })),
    }));
    this.rawResult = validRoutes;
    this.aggregatorHelper = aggregatorHelper;
  }

  private isValidRoute(route: LifiGetRouteResponse): boolean {
    return route.steps.length === 1;
  }

  getAggregatorName(): AggregatorName {
    return AggregatorName.LIFI;
  }

  getRouteData = async (routeId: string): Promise<{ transferData: AggregatorTransferData }> => {
    const route = this.rawResult.find((route) => route.id === routeId);
    if (route == null) {
      throw new Error(`Route not found: ${routeId}`);
    }
    const [step] = route.steps;
    const result = await this.aggregatorHelper.assemble(step);

    return {
      transferData: result,
    };
  };
}

export class LifiAggregatorHelper implements AggregatorHelper {
  aggregatorName = AggregatorName.LIFI;

  private readonly axios: AxiosInstance;

  constructor(
    private readonly depositBoxFactoryContract: DepositBoxFactoryContract,
    private readonly apiUrl: string = LIFI_API
  ) {
    this.axios = axios.create();
  }

  async quoteDeposit(params: QuoteDepositParams): Promise<LifiAggregatorResult> {
    const { box } = await this.depositBoxFactoryContract.computeDepositBox(params.fromAddress, params.boxId);

    const callParams: LifiGetRoutesRequest = {
      fromChainId: params.fromChainId,
      toChainId: arbitrum.id,
      fromTokenAddress: params.fromToken,
      toTokenAddress: params.toToken,
      fromAmount: params.fromAmount.toString(),
      fromAddress: params.fromAddress,
      toAddress: box,
      options: {
        integrator: 'pendle',
        allowDestinationCall: false,
        order: GetRoutesOrder.FASTEST,
        slippage: params.slippage,
        maxPriceImpact: 0.005, // 0.5%
      },
    };

    ensureDepositBoxAddress(callParams.fromAddress, params.boxId, callParams.toAddress);

    return this.quote(callParams);
  }

  async quoteWithdraw(params: QuoteWithdrawParams): Promise<LifiWithdrawResult> {
    const callParams: LifiGetRoutesRequest = {
      fromChainId: arbitrum.id,
      toChainId: params.toChainId,
      fromTokenAddress: params.fromToken,
      toTokenAddress: params.toToken,
      fromAmount: params.fromAmount.toString(),
      fromAddress: params.fromAddress,
      toAddress: params.fromAddress,
      options: {
        integrator: 'Pendle',
        allowDestinationCall: false,
        order: GetRoutesOrder.CHEAPEST,
        slippage: params.slippage,
      },
    };

    try {
      const { data } = await this.axios.post<LifiGetRoutesResponse>(`${this.apiUrl}/advanced/routes`, callParams);

      return new LifiWithdrawResult({ req: callParams, res: data, aggregatorHelper: this });
    } catch (error) {
      throw classifyAggregatorError(
        AggregatorName.LIFI,
        error,
        [500, 502, 503, 504],
        'quote',
        callParams,
        () => undefined
      );
    }
  }

  async quote(callParams: LifiGetRoutesRequest): Promise<LifiAggregatorResult> {
    try {
      const { data } = await this.axios.post<LifiGetRoutesResponse>(`${this.apiUrl}/advanced/routes`, callParams);

      return new LifiAggregatorResult({ req: callParams, res: data, aggregatorHelper: this });
    } catch (error) {
      throw classifyAggregatorError(
        AggregatorName.LIFI,
        error,
        [500, 502, 503, 504],
        'quote',
        callParams,
        () => undefined
      );
    }
  }

  async assemble(params: LifiGetRoutesStep): Promise<AggregatorTransferData> {
    try {
      const { data } = await this.axios.post<LifiGetRoutesStep>(`${this.apiUrl}/advanced/stepTransaction`, params);
      return {
        aggregatorName: AggregatorName.LIFI,
        approvalAddress: params.estimate.approvalAddress,
        calldata: data.transactionRequest.data,
        value: BigInt(data.transactionRequest.value),
        from: data.transactionRequest.from,
        to: data.transactionRequest.to,
        chainId: data.transactionRequest.chainId,
        gasPrice: BigInt(data.transactionRequest.gasPrice),
        gasLimit: BigInt(data.transactionRequest.gasLimit),
      };
    } catch (error) {
      throw classifyAggregatorError(
        AggregatorName.LIFI,
        error,
        [500, 502, 503, 504],
        'assemble',
        params,
        () => undefined
      );
    }
  }

  async getRouteStatus(txHash: Hex, options?: { fromChain: number }): Promise<AggregatorRouteStatus> {
    const params: LifiGetRouteStatusRequest = { txHash, fromChain: options?.fromChain };
    try {
      const { data } = await this.axios.get<LifiGetRouteStatusResponse>(`${this.apiUrl}/status`, { params });
      return data.status;
    } catch (error) {
      throw classifyAggregatorError(
        AggregatorName.LIFI,
        error,
        [500, 502, 503, 504],
        'getRouteStatus',
        { txHash },
        () => undefined
      );
    }
  }
}
