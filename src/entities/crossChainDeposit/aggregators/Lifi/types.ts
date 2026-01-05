import { Address, Hex } from 'viem';
import { AggregatorRouteStatus } from '../../AggregatorHelper';

export enum ChainType {
  EVM = 'EVM',
  SVM = 'SVM',
  UTXO = 'UTXO',
  MVM = 'MVM',
}

export type LifiTokenResponse = {
  address: Address;
  decimals: number;
  symbol: string;
  chainId: number;
  name: string;
  coinKey?: string;
  logoURI?: string;
  priceUSD?: string;
};

export type GetChainRequest = {
  chainTypes?: string;
};

export type GetChainsResponse = {
  chains: {
    key: string;
    name: string;
    coin: string;
    id: number;
    mainnet: boolean;
    logoURI: string;
    nativeToken: LifiTokenResponse;
  }[];
};

export type GetTokensRequest = {
  chains?: string;
  chainTypes?: string;
  minPriceUSD?: number;
};

export type GetTokensResponse = {
  tokens: Record<number, LifiTokenResponse[]>;
};

export enum GetRoutesOrder {
  FASTEST = 'FASTEST',
  CHEAPEST = 'CHEAPEST',
}

export type LifiGetChainsRequest = {
  chainTypes: ChainType[];
};

export type LifiGetRoutesRequest = {
  fromChainId: number;
  fromAmount: string;
  fromTokenAddress: Address;
  toChainId: number;
  toTokenAddress: Address;
  options?: {
    integrator?: string;
    slippage?: number;
    order?: GetRoutesOrder;
    allowSwitchChain?: boolean;
    allowDestinationCall?: boolean;
    referrer?: string;
    fee?: number;
    maxPriceImpact?: number;
  };
  fromAddress: Address;
  toAddress: Address;
};

export enum LifiGetRoutesType {
  SWAP = 'swap',
  CROSS = 'cross',
  LIFI = 'lifi',
}

export type LifiGetRoutesFeeCost = {
  name: string;
  percentage: string;
  token: LifiTokenResponse;
  amountUSD: string;
  included: boolean;
  description?: string;
  amount?: string;
};

export enum LifiLifiGetRoutesGasCostType {
  SEND = 'SEND',
  APPROVE = 'APPROVE',
  SUM = 'SUM',
}

export type LifiGetRoutesGasCost = {
  type: LifiLifiGetRoutesGasCostType;
  amount: string;
  token: LifiTokenResponse;
  price?: string;
  estimate?: string;
  limit?: string;
  amountUSD?: string;
};

export type LifiGetRoutesAction = {
  fromChainId: number;
  fromAmount: string;
  fromToken: LifiTokenResponse;
  toChainId: number;
  toToken: LifiTokenResponse;
  slippage?: number;
  fromAddress?: Address;
  toAddress?: Address;
};

export type LifiGetRoutesEstimate = {
  tool: string;
  fromAmount: string;
  toAmount: string;
  toAmountMin: string;
  approvalAddress: Address;
  executionDuration: number;
  fromAmountUSD?: string;
  toAmountUSD?: string;
  feeCosts?: LifiGetRoutesFeeCost[];
  gasCosts?: LifiGetRoutesGasCost[];
};

export type LifiGetRoutesIncludedStep = {
  id: string;
  type: LifiGetRoutesType;
  tool: string;
  toolDetails: {
    key?: string;
    name?: string;
    logoURI?: string;
  };
  action: LifiGetRoutesAction;
  estimate: LifiGetRoutesEstimate;
};

export type LifiGetRoutesStep = {
  id: string;
  type: LifiGetRoutesType;
  tool: string;
  action: LifiGetRoutesAction;
  toolDetails: {
    key?: string;
    name?: string;
    logoURI?: string;
  };
  estimate: LifiGetRoutesEstimate;
  integrator: string;
  includedSteps: LifiGetRoutesIncludedStep[];
  referrer?: string;
  execution?: any;
  transactionRequest?: any;
};

export type LifiGetRouteResponse = {
  id: string;
  fromChainId: number;
  fromAmountUSD: string;
  fromAmount: string;
  fromToken: LifiTokenResponse;
  toChainId: number;
  toAmountUSD: string;
  toAmount: string;
  toAmountMin: string;
  toToken: LifiTokenResponse;
  steps: LifiGetRoutesStep[];
  gasCostUSD?: string;
  fromAddress?: Address;
  toAddress?: Address;
  containsSwitchChain?: boolean;
};

export type LifiGetRoutesResponse = {
  routes: LifiGetRouteResponse[];
};

export type LifiGetRouteStatusRequest = {
  txHash: Hex;
  fromChain?: number;
  toChain?: number;
};

export type LifiGetRouteStatusResponse = {
  sending: {
    txHash: Hex;
    txLink: string;
    amount: string;
    chainId: number;
  };
  status: AggregatorRouteStatus;
  tool: string;
  receiving?: {
    txHash: Hex;
    txLink: string;
    amount: string;
    chainId: number;
  };
};
