import { Hex } from 'viem';
import { arbitrum, bsc } from 'viem/chains';
import { getDepositBoxFactoryAddress } from '../../addresses';
import { BorosCoreSdk, getCoreSdk, getPendleV2Sdk } from '../../backend/secrettune/module';
import { ChainId } from '../../common/chainId';
import { ContractsFactory } from '../../contracts/contracts.factory';
import { DepositBoxFactoryContract } from '../../contracts/deposit-box-factory';
import { TokenId } from '../../types';
import { Token } from '../token';
import {
  AggregatorHelper,
  AggregatorName,
  AggregatorResult,
  AggregatorRouteStatus,
  QuoteWithdrawParams,
} from './AggregatorHelper';
import { BorosLzBridgeHelper } from './aggregators/Boros';
import { LifiAggregatorHelper } from './aggregators/Lifi';
import { PendleSwapHelper } from './aggregators/Pendle';
import { TokenHelper } from './helpers/TokenHelper';

export class Withdrawer {
  private readonly coreSdk: BorosCoreSdk;
  private readonly contractsFactory: ContractsFactory;
  private readonly depositBoxFactoryContract: DepositBoxFactoryContract;
  private readonly tokenHelper: TokenHelper;

  readonly lifiAggregatorHelper: LifiAggregatorHelper;
  readonly pendleSwapHelper: PendleSwapHelper;
  readonly borosLzBridgeHelper: BorosLzBridgeHelper;

  constructor(rpcUrls: string[]) {
    this.coreSdk = getCoreSdk();
    this.contractsFactory = new ContractsFactory(rpcUrls);
    this.depositBoxFactoryContract = this.contractsFactory.getDepositBoxFactoryContract(getDepositBoxFactoryAddress());
    this.tokenHelper = new TokenHelper(this.coreSdk);
    this.lifiAggregatorHelper = new LifiAggregatorHelper(
      this.contractsFactory.getDepositBoxFactoryContract(getDepositBoxFactoryAddress())
    );
    this.pendleSwapHelper = new PendleSwapHelper(
      getPendleV2Sdk(),
      this.coreSdk,
      this.contractsFactory.getRpcClient(),
      this.tokenHelper,
      this.depositBoxFactoryContract
    );
    this.borosLzBridgeHelper = new BorosLzBridgeHelper(this.coreSdk, this.tokenHelper);
  }

  private getAggregatorHelper(toChainId: number): AggregatorHelper {
    switch (toChainId) {
      case arbitrum.id:
        return this.pendleSwapHelper;
      case bsc.id:
        return this.borosLzBridgeHelper;
      default:
        return this.lifiAggregatorHelper;
    }
  }

  async getRoutes(params: QuoteWithdrawParams): Promise<AggregatorResult> {
    const aggregatorHelper = this.getAggregatorHelper(params.toChainId);
    return aggregatorHelper.quoteWithdraw(params);
  }

  async getTokens(options?: { dstChainId?: ChainId; srcTokenId?: TokenId }): Promise<Token[]> {
    return this.tokenHelper.getWithdrawerTokens(options);
  }

  async getRouteStatus(
    aggregatorName: AggregatorName,
    txHash: Hex,
    options?: { fromChain: number }
  ): Promise<AggregatorRouteStatus> {
    switch (aggregatorName) {
      case AggregatorName.LIFI:
        return this.lifiAggregatorHelper.getRouteStatus(txHash, options);
      case AggregatorName.BOROS:
        return this.borosLzBridgeHelper.getRouteStatus(txHash);
      case AggregatorName.PENDLE:
        return this.pendleSwapHelper.getRouteStatus(txHash);
    }
  }
}
