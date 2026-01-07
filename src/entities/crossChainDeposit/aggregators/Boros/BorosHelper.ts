import axios, { AxiosInstance } from 'axios';
import { Address, Hex, zeroAddress } from 'viem';
import { arbitrum, bsc } from 'viem/chains';
import { toAddress } from '../../../../addresses';
import {
  QuoteBscBridgeResponse,
  QuoteBscBridgeV2Dto,
  QuoteWithdrawBscDto,
  QuoteWithdrawBscResponse,
} from '../../../../backend/secrettune/BorosCoreSDK';
import { BorosCoreSdk } from '../../../../backend/secrettune/module';
import { GlobalCache } from '../../../../common/cacheDecorators';
import { ChainId } from '../../../../common/chainId';
import { MILLISECONDS_IN_A_MINUTE } from '../../../../multicall/constants';
import { TokenAmount } from '../../../token';
import {
  AggregatorChain,
  AggregatorHelper,
  AggregatorName,
  AggregatorResult,
  AggregatorRoute,
  AggregatorRouteStatus,
  AggregatorSwapData,
  AggregatorTransferData,
  QuoteDepositParams,
  QuoteWithdrawParams,
} from '../../AggregatorHelper';
import { classifyAggregatorError } from '../../AggregatorHelperErrors';
import { TokenHelper, TokenLookupTable } from '../../helpers/TokenHelper';
import { computeDepositBoxAddress, ensureCalldataHasBoxAddress } from '../../helpers/utils';
import { LayerZeroMessageResponse } from './types';

export const LAYER_ZERO_SCAN_API = 'https://scan.layerzero-api.com/v1';

export class BorosLzBridgeResult implements AggregatorResult {
  routes: AggregatorRoute[] = [];
  private rawResult: QuoteBscBridgeResponse;
  private req: QuoteBscBridgeV2Dto;

  constructor(params: {
    req: QuoteBscBridgeV2Dto;
    res: QuoteBscBridgeResponse;
    tokenLookupTable: TokenLookupTable;
  }) {
    const { req, res, tokenLookupTable } = params;

    this.req = req;
    this.rawResult = res;

    const fromToken = tokenLookupTable.lookup(bsc.id, res.fromToken as Address, true);
    const toToken = tokenLookupTable.lookup(arbitrum.id, res.toToken as Address, true);

    this.routes = [
      {
        id: 'boros',
        inputTokenAmount: new TokenAmount(fromToken, BigInt(res.fromAmount)),
        outputTokenAmount: new TokenAmount(toToken, BigInt(res.toAmount)),
        minOutputTokenAmount: new TokenAmount(toToken, BigInt(res.minToAmount)),
        steps: [
          {
            fromTokenAmount: new TokenAmount(fromToken, BigInt(res.fromAmount)),
            toTokenAmount: new TokenAmount(toToken, BigInt(res.toAmount)),
            executionDuration: 20,
            feeCosts: res.feeCosts.map((feeCost) => ({
              name: feeCost.name,
              amountUSD: Number(feeCost.amountUsd),
            })),
            gasCosts: res.gasCosts.flatMap((gasCost) => {
              const token = tokenLookupTable.lookup(gasCost.chainId as ChainId, gasCost.token as Address);
              if (token == null) {
                return [];
              }
              return {
                tokenAmount: new TokenAmount(token, BigInt(gasCost.amount)),
                amountUSD: Number(gasCost.amountUsd),
              };
            }),
            tool: {
              key: 'boros',
              name: 'LayerZero',
              logoURI:
                'https://storage.googleapis.com/prod-pendle-bucket-a/images/assets/pro/ea33e392-1876-46a5-b7ce-c8434b5a7e71.svg',
            },
          },
        ],
      },
    ];
  }

  getAggregatorName(): AggregatorName {
    return AggregatorName.BOROS;
  }

  selectRoute(): QuoteBscBridgeResponse | undefined {
    return this.rawResult;
  }

  async getRouteData(): Promise<{ transferData: AggregatorTransferData; swapData: AggregatorSwapData }> {
    const boxAddress = computeDepositBoxAddress(this.req.fromAddress as Address, this.req.boxId);
    ensureCalldataHasBoxAddress(this.rawResult.tx.calldata as Hex, boxAddress);

    return {
      transferData: {
        aggregatorName: AggregatorName.BOROS,
        approvalAddress: toAddress(this.rawResult.tx.to),
        calldata: this.rawResult.tx.calldata as Hex,
        value: BigInt(this.rawResult.tx.value),
        from: toAddress(this.rawResult.tx.from),
        to: toAddress(this.rawResult.tx.to),
        chainId: bsc.id,
      },
      swapData: {
        tokenSpent: toAddress(this.req.toToken),
        amountSpent: BigInt(this.rawResult.toAmount),
        minAmountSpent: BigInt(this.rawResult.minToAmount),
        extRouter: zeroAddress,
        extCalldata: '0x',
      },
    };
  }
}

export class BorosWithdrawResult implements AggregatorResult {
  routes: AggregatorRoute[] = [];
  private rawResult: QuoteWithdrawBscResponse;
  private req: QuoteWithdrawParams;

  constructor(params: { req: QuoteWithdrawParams; res: QuoteWithdrawBscResponse; tokenLookupTable: TokenLookupTable }) {
    const { req, res, tokenLookupTable } = params;
    this.req = req;
    this.rawResult = res;

    // For withdrawal: fromToken is on Arbitrum, toToken is on BSC
    const fromToken = tokenLookupTable.lookup(arbitrum.id, res.fromToken as Address, true);
    const toToken = tokenLookupTable.lookup(bsc.id, res.toToken as Address, true);

    this.routes = [
      {
        id: 'boros',
        inputTokenAmount: new TokenAmount(fromToken, BigInt(res.fromAmount)),
        outputTokenAmount: new TokenAmount(toToken, BigInt(res.toAmount)),
        minOutputTokenAmount: new TokenAmount(toToken, BigInt(res.minToAmount)),
        steps: [
          {
            fromTokenAmount: new TokenAmount(fromToken, BigInt(res.fromAmount)),
            toTokenAmount: new TokenAmount(toToken, BigInt(res.toAmount)),
            executionDuration: 20,
            feeCosts: res.feeCosts.map((feeCost) => ({
              name: feeCost.name,
              amountUSD: Number(feeCost.amountUsd),
            })),
            gasCosts: res.gasCosts.flatMap((gasCost) => {
              const token = tokenLookupTable.lookup(gasCost.chainId as ChainId, gasCost.token as Address);
              if (token == null) {
                return [];
              }
              return {
                tokenAmount: new TokenAmount(token, BigInt(gasCost.amount)),
                amountUSD: Number(gasCost.amountUsd),
              };
            }),
            tool: {
              key: 'boros',
              name: 'LayerZero',
              logoURI:
                'https://storage.googleapis.com/prod-pendle-bucket-a/images/assets/pro/ea33e392-1876-46a5-b7ce-c8434b5a7e71.svg',
            },
          },
        ],
      },
    ];
  }

  getAggregatorName(): AggregatorName {
    return AggregatorName.BOROS;
  }

  selectRoute(): QuoteWithdrawBscResponse | undefined {
    return this.rawResult;
  }

  async getRouteData(_routeId: string): Promise<{ transferData: AggregatorTransferData }> {
    return {
      transferData: {
        aggregatorName: AggregatorName.BOROS,
        approvalAddress: toAddress(this.rawResult.tx.to),
        calldata: this.rawResult.tx.calldata as Hex,
        value: BigInt(this.rawResult.tx.value),
        from: toAddress(this.rawResult.tx.from),
        to: toAddress(this.rawResult.tx.to),
        chainId: arbitrum.id, // Withdrawal tx is on Arbitrum
      },
    };
  }
}

export class BorosLzBridgeHelper implements AggregatorHelper {
  aggregatorName = AggregatorName.BOROS;

  private readonly axios: AxiosInstance;

  constructor(
    private readonly borosCoreSdk: BorosCoreSdk,
    private readonly tokenHelper: TokenHelper,
    private readonly layerZeroApiUrl: string = LAYER_ZERO_SCAN_API
  ) {
    this.axios = axios.create();
  }

  async getChains(): Promise<AggregatorChain[]> {
    return [
      {
        chainId: bsc.id,
        name: 'Binance Smart Chain',
        key: 'bsc',
        coin: 'BNB',
        logoURI: 'https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/bsc.svg',
      },
    ];
  }

  @GlobalCache<BorosLzBridgeHelper, 'getTokenLookupTable'>({
    generateLookupKey: () => 'BorosLzBridgeHelper.getTokenLookupTable',
    ttl_ms: MILLISECONDS_IN_A_MINUTE * 10,
  })
  async getTokenLookupTable() {
    return this.tokenHelper.getTokenLookupTable();
  }

  async getRouteStatus(txHash: Hex): Promise<AggregatorRouteStatus> {
    try {
      let lzData: LayerZeroMessageResponse;
      try {
        const response = await this.axios.get<LayerZeroMessageResponse>(
          `${this.layerZeroApiUrl}/messages/tx/${txHash}`
        );
        lzData = response.data;
      } catch (lzError) {
        if (axios.isAxiosError(lzError) && lzError.response?.status === 404) {
          return AggregatorRouteStatus.PENDING;
        }
        throw lzError;
      }

      switch (lzData.data[0].status.name) {
        case 'DELIVERED':
          return AggregatorRouteStatus.DONE;
        case 'FAILED':
          return AggregatorRouteStatus.FAILED;
        case 'UNKNOWN':
          return AggregatorRouteStatus.NOT_FOUND;
        case 'PAYLOAD_STORED':
        case 'CONFIRMING':
        case 'INFLIGHT':
          return AggregatorRouteStatus.PENDING;
      }
    } catch (error) {
      throw classifyAggregatorError(
        AggregatorName.BOROS,
        error,
        [500, 502, 503, 504],
        'getRouteStatus',
        txHash,
        () => undefined
      );
    }
  }

  private async getLayerZeroStatus(txHash: Hex): Promise<LayerZeroMessageResponse> {
    const response = await this.axios.get<LayerZeroMessageResponse>(`${this.layerZeroApiUrl}/messages/tx/${txHash}`);
    return response.data;
  }

  async quoteDeposit(params: QuoteDepositParams): Promise<AggregatorResult> {
    const req: QuoteBscBridgeV2Dto = {
      fromToken: params.fromToken,
      toToken: params.toToken,
      amount: params.fromAmount.toString(),
      fromAddress: params.fromAddress,
      boxId: params.boxId,
    };

    try {
      const [{ data }, tokenLookupTable] = await Promise.all([
        this.borosCoreSdk.depositBox.depositBoxControllerQuoteBscBridgeV2(req),
        this.getTokenLookupTable(),
      ]);

      return new BorosLzBridgeResult({ req, res: data, tokenLookupTable });
    } catch (error) {
      throw classifyAggregatorError(AggregatorName.BOROS, error, [500, 502, 503, 504], 'quote', req, () => undefined);
    }
  }

  async quoteWithdraw(params: QuoteWithdrawParams): Promise<BorosWithdrawResult> {
    const tokenLookupTable = await this.getTokenLookupTable();
    const tokenId = tokenLookupTable.lookupTokenId(arbitrum.id, params.fromToken);

    const req: QuoteWithdrawBscDto = {
      fromAddress: params.fromAddress,
      tokenId,
      amount: params.fromAmount.toString(),
      toAddress: params.fromAddress, // Withdraw to same address on BSC
    };

    try {
      const { data } = await this.borosCoreSdk.depositBox.depositBoxControllerQuoteWithdrawBsc(req);

      return new BorosWithdrawResult({ req: params, res: data, tokenLookupTable });
    } catch (error) {
      throw classifyAggregatorError(
        AggregatorName.BOROS,
        error,
        [500, 502, 503, 504],
        'quoteWithdraw',
        req,
        () => undefined
      );
    }
  }
}
