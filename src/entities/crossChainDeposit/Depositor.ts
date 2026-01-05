import { Address, Hex } from 'viem';
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
  QuoteDepositParams,
} from './AggregatorHelper';
import { BorosLzBridgeHelper } from './aggregators/Boros';
import { LifiAggregatorHelper } from './aggregators/Lifi';
import { PendleSwapHelper } from './aggregators/Pendle';
import { TokenHelper } from './helpers/TokenHelper';

export class Depositor {
  private readonly root: Address;
  private readonly contractsFactory: ContractsFactory;
  private readonly depositBoxFactoryContract: DepositBoxFactoryContract;
  private readonly tokenHelper: TokenHelper;
  private readonly coreSdk: BorosCoreSdk;

  readonly lifiAggregatorHelper: LifiAggregatorHelper;
  readonly pendleSwapHelper: PendleSwapHelper;
  readonly borosLzBridgeHelper: BorosLzBridgeHelper;

  constructor(root: Address, rpcUrls: string[]) {
    this.root = root;
    this.contractsFactory = new ContractsFactory(rpcUrls);
    this.tokenHelper = new TokenHelper(getCoreSdk());
    this.coreSdk = getCoreSdk();
    this.depositBoxFactoryContract = this.contractsFactory.getDepositBoxFactoryContract(getDepositBoxFactoryAddress());
    this.lifiAggregatorHelper = new LifiAggregatorHelper(this.depositBoxFactoryContract);
    this.pendleSwapHelper = new PendleSwapHelper(
      getPendleV2Sdk(),
      this.coreSdk,
      this.contractsFactory.getRpcClient(),
      this.tokenHelper,
      this.depositBoxFactoryContract
    );
    this.borosLzBridgeHelper = new BorosLzBridgeHelper(this.coreSdk, this.tokenHelper);
  }

  private getAggregatorHelper(fromChainId: number): AggregatorHelper {
    switch (fromChainId) {
      case arbitrum.id:
        return this.pendleSwapHelper;
      case bsc.id:
        return this.borosLzBridgeHelper;
      default:
        return this.lifiAggregatorHelper;
    }
  }

  async getRoutes(params: QuoteDepositParams): Promise<AggregatorResult> {
    const aggregatorHelper = this.getAggregatorHelper(params.fromChainId);
    return aggregatorHelper.quoteDeposit(params);
  }

  async getTokens(options?: { dstTokenId?: TokenId; srcChainId?: ChainId }): Promise<Token[]> {
    return this.tokenHelper.getTokens(options);
  }

  async getDepositableTokenIds(chainId: ChainId, tokenAddress: Address): Promise<TokenId[]> {
    return this.tokenHelper.getDepositableTokenIds(chainId, tokenAddress);
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

  async computeDepositBox(boxId: number): Promise<{ box: Address }> {
    return this.depositBoxFactoryContract.computeDepositBox(this.root, boxId);
  }
}
