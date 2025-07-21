import { iAMMFactoryAbi, iMarketAbi, iMarketFactoryAbi, iMarketHubAbi, iRouterAbi } from '../contracts/abis/viemAbis';
import {
  Abi,
  AbiStateMutability,
  Address,
  BlockTag,
  ContractFunctionName,
  GetContractReturnType,
  GetEventArgs,
  Hex,
  PublicClient,
} from 'viem';

export interface Options {
  blockTag?: BlockTag;
}

export interface MulticallAndClient {
  multicall: Address | undefined;
  client: PublicClient;
}
export type Contract<
  abi extends Abi,
  client extends PublicClient = PublicClient,
  address extends Address = Address,
> = GetContractReturnType<abi, client, address>;

export type ExtractAbiFunctions<
  abi extends Abi,
  abiStateMutability extends AbiStateMutability = AbiStateMutability,
> = Extract<abi[number], { type: 'function'; stateMutability: abiStateMutability }>;

export type ExtractAbiFunction<
  abi extends Abi,
  functionName extends ContractFunctionName<abi>,
  abiStateMutability extends AbiStateMutability = AbiStateMutability,
> = Extract<ExtractAbiFunctions<abi, abiStateMutability>, { name: functionName }>;

export enum OrderStatus {
  NOT_EXIST = 0,
  OPEN = 1,
  FILLED = 2,
}

export enum MarketStatus {
  PAUSED = 0,
  CLO = 1, // CLOSE-ONLY
  GOOD = 2,
}

export type ContractOrder = {
  status: OrderStatus;
  id: bigint;
  maker: Address;
  size: bigint;
  rate: bigint;
};

export type Order = ContractOrder & {
  initialMarginWithLeverage: bigint;
};

export type ContractSwapPosition = {
  s: bigint;
  sf: bigint;
};

export type ContractUserMarketPosition = {
  marketId: number;
  signedSize: bigint;
  positionValue: bigint;
  liquidationApr: bigint;
  initialMargin: bigint;
  maintMargin: bigint;
  orders: ContractOrder[];
};

export type UserMarketPosition = Omit<ContractUserMarketPosition, 'orders'> & {
  leverage: number;
  initialMarginWithLeverage: bigint;
  orders: Order[];
};

export type ContractUserInfo = {
  totalCash: bigint;
  positions: ContractUserMarketPosition[];
  availableInitialMargin: bigint;
  availableMaintMargin: bigint;
};

export type UserInfo = Omit<ContractUserInfo, 'positions'> & {
  positions: UserMarketPosition[];
  netBalance: bigint;
  initialMargin: bigint;
  initialMarginWithLeverage: bigint;
  availableInitialMarginWithLeverage: bigint;
};

export type ExtractAbiEvents<abi extends Abi> = Extract<abi[number], { type: 'event' }>;
export type ExtractAbiEventNames<abi extends Abi> = ExtractAbiEvents<abi>['name'];
export type ExtractAbiEvent<abi extends Abi, eventName extends ExtractAbiEventNames<abi>> = Extract<
  ExtractAbiEvents<abi>,
  { name: eventName }
>;
export type EventArgs<
  abi extends Abi,
  eventName extends ExtractAbiEventNames<abi>,
  strict extends boolean = true,
> = GetEventArgs<
  abi,
  eventName,
  {
    EnableUnion: false;
    IndexedOnly: false;
    Required: strict extends boolean ? strict : false;
  }
>;

export type SwapPosition = {
  s: bigint;
  sf: bigint;
};

export type ExecData = {
  subaccountId: bigint;
  data: Hex;
};

export type FIndex = Hex;

export type CLOThreshold = {
  lowerThres: bigint;
  upperThres: bigint;
};

// Market events
export type PersonalMarginConfigUpdatedEventArgs = EventArgs<typeof iMarketAbi, 'PersonalMarginConfigUpdated'>;
export type PersonalDiscRatesUpdatedEventArgs = EventArgs<typeof iMarketAbi, 'PersonalDiscRatesUpdated'>;
export type PersonalExemptCLOCheckUpdatedEventArgs = EventArgs<typeof iMarketAbi, 'PersonalExemptCLOCheckUpdated'>;
export type ImpliedRateObservationWindowUpdatedEventArgs = EventArgs<
  typeof iMarketAbi,
  'ImpliedRateObservationWindowUpdated'
>;
export type MaxOpenOrdersUpdatedEventArgs = EventArgs<typeof iMarketAbi, 'MaxOpenOrdersUpdated'>;
export type OracleAddressesUpdatedEventArgs = EventArgs<typeof iMarketAbi, 'OracleAddressesUpdated'>;
export type OICapUpdatedEventArgs = EventArgs<typeof iMarketAbi, 'OICapUpdated'>;
export type FeeRatesUpdatedEventArgs = EventArgs<typeof iMarketAbi, 'FeeRatesUpdated'>;
export type LiquidationSettingsUpdatedEventArgs = EventArgs<typeof iMarketAbi, 'LiquidationSettingsUpdated'>;
export type MarginConfigUpdatedEventArgs = EventArgs<typeof iMarketAbi, 'MarginConfigUpdated'>;
export type LimitOrderConfigUpdatedEventArgs = EventArgs<typeof iMarketAbi, 'LimitOrderConfigUpdated'>;
export type StatusUpdatedEventArgs = EventArgs<typeof iMarketAbi, 'StatusUpdated'>;
export type FIndexUpdatedEventArgs = EventArgs<typeof iMarketAbi, 'FIndexUpdated'>;
export type FTagUpdatedOnPurgeEventArgs = EventArgs<typeof iMarketAbi, 'FTagUpdatedOnPurge'>;
export type PaymentFromSettlementEventArgs = EventArgs<typeof iMarketAbi, 'PaymentFromSettlement'>;
export type LimitOrderFilledEventArgs = EventArgs<typeof iMarketAbi, 'LimitOrderFilled'>;
export type LimitOrderPlacedEventArgs = EventArgs<typeof iMarketAbi, 'LimitOrderPlaced'>;
export type LimitOrderPartiallyFilledEventArgs = EventArgs<typeof iMarketAbi, 'LimitOrderPartiallyFilled'>;
export type LimitOrderCancelledEventArgs = EventArgs<typeof iMarketAbi, 'LimitOrderCancelled'>;
export type LimitOrderForcedCancelledEventArgs = EventArgs<typeof iMarketAbi, 'LimitOrderForcedCancelled'>;
export type OobOrdersPurgedEventArgs = EventArgs<typeof iMarketAbi, 'OobOrdersPurged'>;
export type MarketOrdersFilledEventArgs = EventArgs<typeof iMarketAbi, 'MarketOrdersFilled'>;
export type OtcSwapEventArgs = EventArgs<typeof iMarketAbi, 'OtcSwap'>;
export type LiquidateEventArgs = EventArgs<typeof iMarketAbi, 'Liquidate'>;
export type ForceDeleverageEventArgs = EventArgs<typeof iMarketAbi, 'ForceDeleverage'>;

// MarketHub events
export type EnterMarketEventArgs = EventArgs<typeof iMarketHubAbi, 'EnterMarket'>;
export type ExitMarketEventArgs = EventArgs<typeof iMarketHubAbi, 'ExitMarket'>;
export type VaultDepositEventArgs = EventArgs<typeof iMarketHubAbi, 'VaultDeposit'>;
export type VaultWithdrawalRequestedEventArgs = EventArgs<typeof iMarketHubAbi, 'VaultWithdrawalRequested'>;
export type VaultWithdrawalCanceledEventArgs = EventArgs<typeof iMarketHubAbi, 'VaultWithdrawalCanceled'>;
export type VaultWithdrawalFinalizedEventArgs = EventArgs<typeof iMarketHubAbi, 'VaultWithdrawalFinalized'>;
export type PersonalCooldownSetEventArgs = EventArgs<typeof iMarketHubAbi, 'PersonalCooldownSet'>;
export type CashTransferEventArgs = EventArgs<typeof iMarketHubAbi, 'CashTransfer'>;
export type PayTreasuryEventArgs = EventArgs<typeof iMarketHubAbi, 'PayTreasury'>;
export type TokenAddedEventArgs = EventArgs<typeof iMarketHubAbi, 'TokenAdded'>;
export type MarketAddedEventArgs = EventArgs<typeof iMarketHubAbi, 'MarketAdded'>;
export type GlobalCooldownSetEventArgs = EventArgs<typeof iMarketHubAbi, 'GlobalCooldownSet'>;
export type CollectFeeEventArgs = EventArgs<typeof iMarketHubAbi, 'CollectFee'>;
export type CritHRUpdatedEventArgs = EventArgs<typeof iMarketHubAbi, 'CritHRUpdated'>;
export type RiskyThresHRUpdatedEventArgs = EventArgs<typeof iMarketHubAbi, 'RiskyThresHRUpdated'>;
export type StrictHealthCheckUpdatedEventArgs = EventArgs<typeof iMarketHubAbi, 'StrictHealthCheckUpdated'>;
export type MinCashCrossAccountsUpdatedEventArgs = EventArgs<typeof iMarketHubAbi, 'MinCashCrossAccountsUpdated'>;
export type MinCashIsolatedAccountsUpdatedEventArgs = EventArgs<typeof iMarketHubAbi, 'MinCashIsolatedAccountsUpdated'>;
export type MarketEntranceFeesUpdatedEventArgs = EventArgs<typeof iMarketHubAbi, 'MarketEntranceFeesUpdated'>;

// MarketFactory events
export type MarketCreatedEventArgs = EventArgs<typeof iMarketFactoryAbi, 'MarketCreated'>;

// AmmFactory events
export type AmmCreatedEventArgs = EventArgs<typeof iAMMFactoryAbi, 'AMMCreated'>;

// Router events
export type NewAccManagerSetEventArgs = EventArgs<typeof iRouterAbi, 'NewAccManagerSet'>;
export type AgentApprovedEventArgs = EventArgs<typeof iRouterAbi, 'AgentApproved'>;
export type AgentRevokedEventArgs = EventArgs<typeof iRouterAbi, 'AgentRevoked'>;
export type SingleOrderExecutedEventArgs = EventArgs<typeof iRouterAbi, 'SingleOrderExecuted'>;
export type BulkOrdersExecutedEventArgs = EventArgs<typeof iRouterAbi, 'BulkOrdersExecuted'>;
export type SwapWithAmmEventArgs = EventArgs<typeof iRouterAbi, 'SwapWithAmm'>;
export type AddLiquidityDualToAmmEventArgs = EventArgs<typeof iRouterAbi, 'AddLiquidityDualToAmm'>;
export type AddLiquiditySingleCashToAmmEventArgs = EventArgs<typeof iRouterAbi, 'AddLiquiditySingleCashToAmm'>;
export type RemoveLiquidityDualFromAmmEventArgs = EventArgs<typeof iRouterAbi, 'RemoveLiquidityDualFromAmm'>;
export type RemoveLiquiditySingleCashFromAmmEventArgs = EventArgs<
  typeof iRouterAbi,
  'RemoveLiquiditySingleCashFromAmm'
>;

// Event groups
export type TradeEventArgs =
  | LimitOrderFilledEventArgs
  | LimitOrderPlacedEventArgs
  | LimitOrderPartiallyFilledEventArgs
  | LimitOrderCancelledEventArgs
  | OobOrdersPurgedEventArgs
  | ForceDeleverageEventArgs
  | LiquidateEventArgs
  | MarketOrdersFilledEventArgs
  | OtcSwapEventArgs
  | FIndexUpdatedEventArgs;

export type AmmEventArgs =
  | AddLiquidityDualToAmmEventArgs
  | AddLiquiditySingleCashToAmmEventArgs
  | RemoveLiquidityDualFromAmmEventArgs
  | RemoveLiquiditySingleCashFromAmmEventArgs;

export type OrderExecutedEventArgs = SingleOrderExecutedEventArgs | BulkOrdersExecutedEventArgs;

export type MarketId = number;
export type TokenId = number;
export type AccountId = number;
