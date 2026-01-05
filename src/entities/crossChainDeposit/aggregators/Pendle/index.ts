import { Address, Hex, PublicClient, TransactionReceiptNotFoundError, zeroAddress } from 'viem';
import { arbitrum } from 'viem/chains';
import { toAddress } from '../../../../addresses';
import { PendleSwapDtoV2, PendleSwapResponse } from '../../../../backend/secrettune/PendleV2SDK';
import { BorosCoreSdk, PendleV2Sdk } from '../../../../backend/secrettune/module';
import { GlobalCache } from '../../../../common/cacheDecorators';
import { DepositBoxFactoryContract } from '../../../../contracts/deposit-box-factory';
import { MILLISECONDS_IN_A_MINUTE } from '../../../../multicall/constants';
import { TokenAmount } from '../../../token/Token';
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
import { ensureDepositBoxAddress } from '../../helpers/utils';

export class PendleSwapResult implements AggregatorResult {
  routes: AggregatorRoute[] = [];
  private rawResult: PendleSwapResponse;
  private req: QuoteDepositParams;
  private helper: PendleSwapHelper;

  constructor(params: {
    req: QuoteDepositParams;
    res: PendleSwapResponse;
    tokenLookupTable: TokenLookupTable;
    helper: PendleSwapHelper;
  }) {
    const { req, res, tokenLookupTable, helper } = params;
    this.helper = helper;
    this.req = req;
    const fromToken = tokenLookupTable.lookup(arbitrum.id, req.fromToken as Address, true);
    const toToken = tokenLookupTable.lookup(arbitrum.id, req.toToken as Address, true);

    this.routes = [
      {
        id: 'pendle',
        inputTokenAmount: new TokenAmount(fromToken, BigInt(req.fromAmount)),
        outputTokenAmount: new TokenAmount(toToken, BigInt(res.data.amountOut)),
        minOutputTokenAmount: new TokenAmount(toToken, BigInt(res.data.amountOut)).slipDown(req.slippage),
        steps: [
          {
            fromTokenAmount: new TokenAmount(fromToken, BigInt(req.fromAmount)),
            toTokenAmount: new TokenAmount(toToken, BigInt(res.data.amountOut)),
            executionDuration: 0.25,
            feeCosts: [],
            gasCosts: [],
            tool: {
              key: 'pendle',
              name: 'Pendle Swap',
              logoURI:
                'https://storage.googleapis.com/prod-pendle-bucket-a/images/assets/pro/ea33e392-1876-46a5-b7ce-c8434b5a7e71.svg',
            },
          },
        ],
      },
    ];

    this.rawResult = res;
  }

  getAggregatorName(): AggregatorName {
    return AggregatorName.PENDLE;
  }

  selectRoute(): PendleSwapResponse | undefined {
    return this.rawResult;
  }

  async getRouteData(): Promise<{ transferData: AggregatorTransferData; swapData: AggregatorSwapData }> {
    const transferData = await this.helper.prepareTransferCall(this.req);
    return {
      transferData,
      swapData: {
        tokenSpent: this.req.fromToken,
        amountSpent: BigInt(this.req.fromAmount),
        minAmountSpent: BigInt(this.req.fromAmount),
        extRouter: toAddress(this.rawResult.tx.to),
        extCalldata: this.rawResult.tx.data as Hex,
      },
    };
  }
}

export class PendleWithdrawResult implements AggregatorResult {
  routes: AggregatorRoute[] = [];
  private rawResult: PendleSwapResponse;
  private req: QuoteWithdrawParams;

  constructor(params: { req: QuoteWithdrawParams; res: PendleSwapResponse; tokenLookupTable: TokenLookupTable }) {
    const { req, res, tokenLookupTable } = params;
    this.req = req;
    this.rawResult = res;

    const fromToken = tokenLookupTable.lookup(arbitrum.id, req.fromToken as Address, true);
    const toToken = tokenLookupTable.lookup(arbitrum.id, req.toToken as Address, true);

    this.routes = [
      {
        id: 'pendle',
        inputTokenAmount: new TokenAmount(fromToken, BigInt(req.fromAmount)),
        outputTokenAmount: new TokenAmount(toToken, BigInt(res.data.amountOut)),
        minOutputTokenAmount: new TokenAmount(toToken, BigInt(res.data.amountOut)).slipDown(req.slippage),
        steps: [
          {
            fromTokenAmount: new TokenAmount(fromToken, BigInt(req.fromAmount)),
            toTokenAmount: new TokenAmount(toToken, BigInt(res.data.amountOut)),
            executionDuration: 0.25,
            feeCosts: [],
            gasCosts: [],
            tool: {
              key: 'pendle',
              name: 'Pendle Swap',
              logoURI:
                'https://storage.googleapis.com/prod-pendle-bucket-a/images/assets/pro/ea33e392-1876-46a5-b7ce-c8434b5a7e71.svg',
            },
          },
        ],
      },
    ];
  }

  getAggregatorName(): AggregatorName {
    return AggregatorName.PENDLE;
  }

  selectRoute(): PendleSwapResponse | undefined {
    return this.rawResult;
  }

  async getRouteData(_routeId: string): Promise<{ transferData: AggregatorTransferData }> {
    return {
      transferData: {
        aggregatorName: AggregatorName.PENDLE,
        approvalAddress: toAddress(this.rawResult.tx.to),
        calldata: this.rawResult.tx.data as Hex,
        value: BigInt(this.rawResult.tx.value ?? 0),
        from: this.req.fromAddress,
        to: toAddress(this.rawResult.tx.to),
        chainId: arbitrum.id,
      },
    };
  }
}

export class PendleSwapHelper implements AggregatorHelper {
  aggregatorName = AggregatorName.PENDLE;

  constructor(
    private readonly pendleV2Sdk: PendleV2Sdk,
    private readonly coreSdk: BorosCoreSdk,
    private readonly publicClient: PublicClient,
    private readonly tokenHelper: TokenHelper,
    private readonly depositBoxFactoryContract: DepositBoxFactoryContract
  ) {}

  async getChains(): Promise<AggregatorChain[]> {
    return [
      {
        chainId: arbitrum.id,
        name: 'Arbitrum',
        key: 'arbitrum',
        coin: 'ETH',
        logoURI: 'https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/arbitrum.svg',
      },
    ];
  }

  @GlobalCache<PendleSwapHelper, 'getTokenLookupTable'>({
    generateLookupKey: () => 'PendleSwapHelper.getTokenLookupTable',
    ttl_ms: MILLISECONDS_IN_A_MINUTE * 10,
  })
  async getTokenLookupTable() {
    return this.tokenHelper.getTokenLookupTable();
  }

  async getRouteStatus(txHash: Hex): Promise<AggregatorRouteStatus> {
    try {
      const receipt = await this.publicClient.getTransactionReceipt({ hash: txHash });
      return receipt.status === 'success' ? AggregatorRouteStatus.DONE : AggregatorRouteStatus.FAILED;
    } catch (error) {
      if (error instanceof TransactionReceiptNotFoundError) {
        return AggregatorRouteStatus.NOT_FOUND;
      }
      throw classifyAggregatorError(
        AggregatorName.PENDLE,
        error,
        [500, 502, 503, 504],
        'getRouteStatus',
        txHash,
        () => undefined
      );
    }
  }

  async quoteDeposit(params: QuoteDepositParams): Promise<PendleSwapResult> {
    const { box } = await this.depositBoxFactoryContract.computeDepositBox(params.fromAddress, params.boxId);

    const req: PendleSwapDtoV2 = {
      receiver: box,
      inputs: [
        {
          token: params.fromToken,
          amount: params.fromAmount.toString(),
        },
      ],
      tokenOut: params.toToken,
      slippage: params.slippage,
      aggregators: 'kyberswap,okx',
    };

    ensureDepositBoxAddress(params.fromAddress, params.boxId, req.receiver);

    try {
      const [{ data }, tokenLookupTable] = await Promise.all([
        this.pendleV2Sdk.sdk.sdkControllerPendleSwapV2(arbitrum.id, req),
        this.getTokenLookupTable(),
      ]);

      return new PendleSwapResult({ req: params, res: data, tokenLookupTable, helper: this });
    } catch (error) {
      throw classifyAggregatorError(AggregatorName.PENDLE, error, [500, 502, 503, 504], 'quote', req, () => undefined);
    }
  }

  async quoteWithdraw(params: QuoteWithdrawParams): Promise<PendleWithdrawResult> {
    const req: PendleSwapDtoV2 = {
      receiver: params.fromAddress,
      inputs: [
        {
          token: params.fromToken,
          amount: params.fromAmount.toString(),
        },
      ],
      tokenOut: params.toToken,
      slippage: params.slippage,
      aggregators: 'kyberswap,okx',
    };

    try {
      const [{ data }, tokenLookupTable] = await Promise.all([
        this.pendleV2Sdk.sdk.sdkControllerPendleSwapV2(arbitrum.id, req),
        this.getTokenLookupTable(),
      ]);
      return new PendleWithdrawResult({ req: params, res: data, tokenLookupTable });
    } catch (error) {
      throw classifyAggregatorError(AggregatorName.PENDLE, error, [500, 502, 503, 504], 'quote', req, () => undefined);
    }
  }

  async prepareTransferCall(params: QuoteDepositParams): Promise<AggregatorTransferData> {
    try {
      const { data } = await this.coreSdk.depositBox.depositBoxControllerPrepareTransferToBox({
        chainId: arbitrum.id,
        token: params.fromToken,
        amount: params.fromAmount.toString(),
        root: params.fromAddress,
        boxId: params.boxId,
      });
      return {
        aggregatorName: AggregatorName.BOROS,
        approvalAddress: zeroAddress,
        chainId: arbitrum.id,
        calldata: data.calldata as Hex,
        value: BigInt(data.value),
        from: params.fromAddress,
        to: toAddress(data.to),
      };
    } catch (error) {
      throw classifyAggregatorError(
        AggregatorName.BOROS,
        error,
        [500, 502, 503, 504],
        'prepareTransferCall',
        params,
        () => undefined
      );
    }
  }
}
