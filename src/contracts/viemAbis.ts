//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IArbitrageExecutor
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iArbitrageExecutorAbi = [
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'AMMId', name: 'ammId', type: 'uint24' },
      { indexed: false, internalType: 'int256', name: 'profit', type: 'int256' },
    ],
    name: 'ArbitrageExecuted',
    type: 'event',
  },
  {
    inputs: [],
    name: 'MARKET_HUB',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'ROUTER',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'TokenId', name: 'tokenId', type: 'uint16' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'deposit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'enum Side', name: 'bookSide', type: 'uint8' },
          { internalType: 'AMMId', name: 'ammId', type: 'uint24' },
          { internalType: 'int256', name: 'minProfit', type: 'int256' },
          { internalType: 'bool', name: 'maximizeProfit', type: 'bool' },
        ],
        internalType: 'struct IArbitrageExecutor.ArbitrageParams',
        name: 'params',
        type: 'tuple',
      },
    ],
    name: 'executeArbitrage',
    outputs: [
      { internalType: 'uint256', name: 'arbSize', type: 'uint256' },
      { internalType: 'int256', name: 'profit', type: 'int256' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'nTicksToTryAtOnce',
    outputs: [{ internalType: 'uint16', name: '', type: 'uint16' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'bool', name: 'cross', type: 'bool' },
      { internalType: 'MarketId', name: 'marketId', type: 'uint24' },
    ],
    name: 'payMarketEntranceFee',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'TokenId', name: 'tokenId', type: 'uint16' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'requestWithdrawal',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'TokenId', name: 'tokenId', type: 'uint16' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
      { internalType: 'address', name: 'receiver', type: 'address' },
    ],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IAMMFactory
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iAMMFactoryAbi = [
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'address', name: 'amm', type: 'address' },
      { indexed: false, internalType: 'bool', name: 'isPositive', type: 'bool' },
      {
        components: [
          { internalType: 'AMMId', name: 'ammId', type: 'uint24' },
          { internalType: 'string', name: 'name', type: 'string' },
          { internalType: 'string', name: 'symbol', type: 'string' },
          { internalType: 'address', name: 'router', type: 'address' },
          { internalType: 'address', name: 'market', type: 'address' },
          { internalType: 'uint32', name: 'oracleImpliedRateWindow', type: 'uint32' },
          { internalType: 'uint64', name: 'feeRate', type: 'uint64' },
          { internalType: 'uint256', name: 'totalSupplyCap', type: 'uint256' },
          { internalType: 'MarketAcc', name: 'seeder', type: 'bytes26' },
          { internalType: 'address', name: 'permissionController', type: 'address' },
        ],
        indexed: false,
        internalType: 'struct AMMCreateParams',
        name: 'createParams',
        type: 'tuple',
      },
      {
        components: [
          { internalType: 'uint256', name: 'minAbsRate', type: 'uint256' },
          { internalType: 'uint256', name: 'maxAbsRate', type: 'uint256' },
          { internalType: 'uint256', name: 'cutOffTimestamp', type: 'uint256' },
          { internalType: 'uint256', name: 'initialAbsRate', type: 'uint256' },
          { internalType: 'int256', name: 'initialSize', type: 'int256' },
          { internalType: 'uint256', name: 'flipLiquidity', type: 'uint256' },
          { internalType: 'uint256', name: 'initialCash', type: 'uint256' },
        ],
        indexed: false,
        internalType: 'struct AMMSeedParams',
        name: 'seedParams',
        type: 'tuple',
      },
    ],
    name: 'AMMCreated',
    type: 'event',
  },
  {
    inputs: [
      { internalType: 'bool', name: 'isPositive', type: 'bool' },
      {
        components: [
          { internalType: 'AMMId', name: 'ammId', type: 'uint24' },
          { internalType: 'string', name: 'name', type: 'string' },
          { internalType: 'string', name: 'symbol', type: 'string' },
          { internalType: 'address', name: 'router', type: 'address' },
          { internalType: 'address', name: 'market', type: 'address' },
          { internalType: 'uint32', name: 'oracleImpliedRateWindow', type: 'uint32' },
          { internalType: 'uint64', name: 'feeRate', type: 'uint64' },
          { internalType: 'uint256', name: 'totalSupplyCap', type: 'uint256' },
          { internalType: 'MarketAcc', name: 'seeder', type: 'bytes26' },
          { internalType: 'address', name: 'permissionController', type: 'address' },
        ],
        internalType: 'struct AMMCreateParams',
        name: 'createParams',
        type: 'tuple',
      },
      {
        components: [
          { internalType: 'uint256', name: 'minAbsRate', type: 'uint256' },
          { internalType: 'uint256', name: 'maxAbsRate', type: 'uint256' },
          { internalType: 'uint256', name: 'cutOffTimestamp', type: 'uint256' },
          { internalType: 'uint256', name: 'initialAbsRate', type: 'uint256' },
          { internalType: 'int256', name: 'initialSize', type: 'int256' },
          { internalType: 'uint256', name: 'flipLiquidity', type: 'uint256' },
          { internalType: 'uint256', name: 'initialCash', type: 'uint256' },
        ],
        internalType: 'struct AMMSeedParams',
        name: 'seedParams',
        type: 'tuple',
      },
    ],
    name: 'create',
    outputs: [{ internalType: 'address', name: 'newAMM', type: 'address' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IMarketHubEntryOnly
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iMarketHubEntryOnlyAbi = [
  {
    inputs: [
      { internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      {
        components: [
          { internalType: 'MarketId', name: 'marketId', type: 'uint24' },
          {
            components: [
              { internalType: 'enum TimeInForce', name: 'tif', type: 'uint8' },
              { internalType: 'enum Side', name: 'side', type: 'uint8' },
              { internalType: 'uint256[]', name: 'sizes', type: 'uint256[]' },
              { internalType: 'int16[]', name: 'limitTicks', type: 'int16[]' },
            ],
            internalType: 'struct LongShort',
            name: 'orders',
            type: 'tuple',
          },
          {
            components: [
              { internalType: 'OrderId[]', name: 'ids', type: 'uint64[]' },
              { internalType: 'bool', name: 'isAll', type: 'bool' },
              { internalType: 'bool', name: 'isStrict', type: 'bool' },
            ],
            internalType: 'struct CancelData',
            name: 'cancelData',
            type: 'tuple',
          },
        ],
        internalType: 'struct BulkOrder[]',
        name: 'bulks',
        type: 'tuple[]',
      },
    ],
    name: 'bulkOrders',
    outputs: [
      {
        components: [
          { internalType: 'Trade', name: 'matched', type: 'uint256' },
          { internalType: 'uint256', name: 'takerFee', type: 'uint256' },
        ],
        internalType: 'struct BulkOrderResult[]',
        name: 'results',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'MarketId', name: 'marketId', type: 'uint24' },
      { internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      {
        components: [
          { internalType: 'OrderId[]', name: 'ids', type: 'uint64[]' },
          { internalType: 'bool', name: 'isAll', type: 'bool' },
          { internalType: 'bool', name: 'isStrict', type: 'bool' },
        ],
        internalType: 'struct CancelData',
        name: 'cancelData',
        type: 'tuple',
      },
    ],
    name: 'cancel',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint32', name: 'globalCooldown', type: 'uint32' }],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'MarketId', name: 'marketId', type: 'uint24' },
      { internalType: 'MarketAcc', name: 'liq', type: 'bytes26' },
      { internalType: 'MarketAcc', name: 'vio', type: 'bytes26' },
      { internalType: 'int256', name: 'sizeToLiq', type: 'int256' },
    ],
    name: 'liquidate',
    outputs: [
      { internalType: 'Trade', name: 'liqTrade', type: 'uint256' },
      { internalType: 'uint256', name: 'liqFee', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'MarketId', name: 'marketId', type: 'uint24' },
      { internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      {
        components: [
          { internalType: 'enum TimeInForce', name: 'tif', type: 'uint8' },
          { internalType: 'enum Side', name: 'side', type: 'uint8' },
          { internalType: 'uint256[]', name: 'sizes', type: 'uint256[]' },
          { internalType: 'int16[]', name: 'limitTicks', type: 'int16[]' },
        ],
        internalType: 'struct LongShort',
        name: 'orders',
        type: 'tuple',
      },
      {
        components: [
          { internalType: 'OrderId[]', name: 'ids', type: 'uint64[]' },
          { internalType: 'bool', name: 'isAll', type: 'bool' },
          { internalType: 'bool', name: 'isStrict', type: 'bool' },
        ],
        internalType: 'struct CancelData',
        name: 'cancelData',
        type: 'tuple',
      },
      {
        components: [
          { internalType: 'MarketAcc', name: 'counter', type: 'bytes26' },
          { internalType: 'Trade', name: 'trade', type: 'uint256' },
          { internalType: 'int256', name: 'cashToCounter', type: 'int256' },
        ],
        internalType: 'struct OTCTrade[]',
        name: 'OTCs',
        type: 'tuple[]',
      },
    ],
    name: 'orderAndOtc',
    outputs: [
      { internalType: 'Trade', name: 'bookMatched', type: 'uint256' },
      { internalType: 'uint256', name: 'totalTakerOtcFee', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { internalType: 'enum GetRequest', name: 'req', type: 'uint8' },
      { internalType: 'MarketId', name: 'marketId', type: 'uint24' },
    ],
    name: 'settleAllAndGet',
    outputs: [
      { internalType: 'int256', name: 'cash', type: 'int256' },
      { internalType: 'VMResult', name: 'totalVM', type: 'uint256' },
      { internalType: 'int256', name: 'signedSize', type: 'int256' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IMarketHubRiskManagement
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iMarketHubRiskManagementAbi = [
  {
    inputs: [
      { internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { internalType: 'int256', name: 'delta', type: 'int256' },
    ],
    name: 'adjustAccCash',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'MarketId', name: 'marketId', type: 'uint24' },
      { internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      {
        components: [
          { internalType: 'OrderId[]', name: 'ids', type: 'uint64[]' },
          { internalType: 'bool', name: 'isAll', type: 'bool' },
          { internalType: 'bool', name: 'isStrict', type: 'bool' },
        ],
        internalType: 'struct CancelData',
        name: 'cancelData',
        type: 'tuple',
      },
    ],
    name: 'forceCancel',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'MarketId', name: 'marketId', type: 'uint24' },
      { internalType: 'MarketAcc', name: 'riskyUser', type: 'bytes26' },
    ],
    name: 'forceCancelAllRiskyUser',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'MarketId', name: 'marketId', type: 'uint24' },
      { internalType: 'MarketAcc', name: 'win', type: 'bytes26' },
      { internalType: 'MarketAcc', name: 'lose', type: 'bytes26' },
      { internalType: 'int256', name: 'sizeToWin', type: 'int256' },
      { internalType: 'uint256', name: 'alpha', type: 'uint256' },
    ],
    name: 'forceDeleverage',
    outputs: [{ internalType: 'Trade', name: 'delevTrade', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'MarketId[]', name: 'marketIds', type: 'uint24[]' },
      { internalType: 'uint256', name: 'maxNTicksPurgeOneSide', type: 'uint256' },
    ],
    name: 'forcePurgeOobOrders',
    outputs: [
      { internalType: 'uint256', name: 'totalTicksPurgedLong', type: 'uint256' },
      { internalType: 'uint256', name: 'totalTicksPurgedShort', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { internalType: 'int256', name: 'desiredCash', type: 'int256' },
    ],
    name: 'setAccCash',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IMarketHub
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iMarketHubAbi = [
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'from', type: 'bytes26' },
      { indexed: false, internalType: 'MarketAcc', name: 'to', type: 'bytes26' },
      { indexed: false, internalType: 'int256', name: 'amount', type: 'int256' },
    ],
    name: 'CashTransfer',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'TokenId', name: 'tokenId', type: 'uint16' },
      { indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'CollectFee',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'int256', name: 'newCritHR', type: 'int256' }],
    name: 'CritHRUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: false, internalType: 'MarketId', name: 'marketId', type: 'uint24' },
      { indexed: false, internalType: 'uint256', name: 'entranceFee', type: 'uint256' },
    ],
    name: 'EnterMarket',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: false, internalType: 'MarketId', name: 'marketId', type: 'uint24' },
    ],
    name: 'ExitMarket',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'uint32', name: 'newCooldown', type: 'uint32' }],
    name: 'GlobalCooldownSet',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'MarketId', name: 'marketId', type: 'uint24' },
      { indexed: true, internalType: 'address', name: 'marketAddress', type: 'address' },
    ],
    name: 'MarketAdded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'TokenId[]', name: 'tokenIds', type: 'uint16[]' },
      { indexed: false, internalType: 'uint128[]', name: 'entranceFees', type: 'uint128[]' },
    ],
    name: 'MarketEntranceFeesUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'TokenId[]', name: 'tokenIds', type: 'uint16[]' },
      { indexed: false, internalType: 'uint128[]', name: 'newMinCash', type: 'uint128[]' },
    ],
    name: 'MinCashCrossAccountsUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'TokenId[]', name: 'tokenIds', type: 'uint16[]' },
      { indexed: false, internalType: 'uint128[]', name: 'newMinCash', type: 'uint128[]' },
    ],
    name: 'MinCashIsolatedAccountsUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'PayTreasury',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'address', name: 'root', type: 'address' },
      { indexed: false, internalType: 'uint32', name: 'cooldown', type: 'uint32' },
    ],
    name: 'PersonalCooldownSet',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'int256', name: 'newRiskyThresHR', type: 'int256' }],
    name: 'RiskyThresHRUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'MarketId', name: 'marketId', type: 'uint24' },
      { indexed: false, internalType: 'bool', name: 'isEnabled', type: 'bool' },
    ],
    name: 'StrictHealthCheckUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'TokenId', name: 'tokenId', type: 'uint16' },
      { indexed: true, internalType: 'address', name: 'tokenAddress', type: 'address' },
    ],
    name: 'TokenAdded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'acc', type: 'bytes26' },
      { indexed: false, internalType: 'uint256', name: 'unscaledAmount', type: 'uint256' },
    ],
    name: 'VaultDeposit',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'address', name: 'root', type: 'address' },
      { indexed: false, internalType: 'TokenId', name: 'tokenId', type: 'uint16' },
      { indexed: false, internalType: 'uint256', name: 'totalUnscaledAmount', type: 'uint256' },
    ],
    name: 'VaultWithdrawalCanceled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'address', name: 'root', type: 'address' },
      { indexed: false, internalType: 'TokenId', name: 'tokenId', type: 'uint16' },
      { indexed: false, internalType: 'uint256', name: 'totalUnscaledAmount', type: 'uint256' },
    ],
    name: 'VaultWithdrawalFinalized',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'address', name: 'root', type: 'address' },
      { indexed: false, internalType: 'TokenId', name: 'tokenId', type: 'uint16' },
      { indexed: false, internalType: 'uint32', name: 'start', type: 'uint32' },
      { indexed: false, internalType: 'uint256', name: 'totalUnscaledAmount', type: 'uint256' },
    ],
    name: 'VaultWithdrawalRequested',
    type: 'event',
  },
  {
    inputs: [],
    name: 'MARKET_FACTORY',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'MAX_ENTERED_MARKETS',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'ROUTER',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'TREASURY',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'MarketAcc', name: 'user', type: 'bytes26' }],
    name: 'accCash',
    outputs: [{ internalType: 'int256', name: '', type: 'int256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { internalType: 'int256', name: 'delta', type: 'int256' },
    ],
    name: 'adjustAccCash',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      {
        components: [
          { internalType: 'MarketId', name: 'marketId', type: 'uint24' },
          {
            components: [
              { internalType: 'enum TimeInForce', name: 'tif', type: 'uint8' },
              { internalType: 'enum Side', name: 'side', type: 'uint8' },
              { internalType: 'uint256[]', name: 'sizes', type: 'uint256[]' },
              { internalType: 'int16[]', name: 'limitTicks', type: 'int16[]' },
            ],
            internalType: 'struct LongShort',
            name: 'orders',
            type: 'tuple',
          },
          {
            components: [
              { internalType: 'OrderId[]', name: 'ids', type: 'uint64[]' },
              { internalType: 'bool', name: 'isAll', type: 'bool' },
              { internalType: 'bool', name: 'isStrict', type: 'bool' },
            ],
            internalType: 'struct CancelData',
            name: 'cancelData',
            type: 'tuple',
          },
        ],
        internalType: 'struct BulkOrder[]',
        name: 'bulks',
        type: 'tuple[]',
      },
    ],
    name: 'bulkOrders',
    outputs: [
      {
        components: [
          { internalType: 'Trade', name: 'matched', type: 'uint256' },
          { internalType: 'uint256', name: 'takerFee', type: 'uint256' },
        ],
        internalType: 'struct BulkOrderResult[]',
        name: 'results',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'MarketId', name: 'marketId', type: 'uint24' },
      { internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      {
        components: [
          { internalType: 'OrderId[]', name: 'ids', type: 'uint64[]' },
          { internalType: 'bool', name: 'isAll', type: 'bool' },
          { internalType: 'bool', name: 'isStrict', type: 'bool' },
        ],
        internalType: 'struct CancelData',
        name: 'cancelData',
        type: 'tuple',
      },
    ],
    name: 'cancel',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'root', type: 'address' },
      { internalType: 'TokenId', name: 'tokenId', type: 'uint16' },
    ],
    name: 'cancelVaultWithdrawal',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'MarketAcc', name: 'from', type: 'bytes26' },
      { internalType: 'MarketAcc', name: 'to', type: 'bytes26' },
      { internalType: 'int256', name: 'amount', type: 'int256' },
    ],
    name: 'cashTransfer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'MarketAcc', name: 'from', type: 'bytes26' },
      { internalType: 'MarketAcc', name: 'to', type: 'bytes26' },
    ],
    name: 'cashTransferAll',
    outputs: [{ internalType: 'int256', name: 'amountOut', type: 'int256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'critHR',
    outputs: [{ internalType: 'int128', name: '', type: 'int128' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'MarketId', name: 'marketId', type: 'uint24' }],
    name: 'disableStrictHealthCheck',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'MarketId', name: 'marketId', type: 'uint24' }],
    name: 'enableStrictHealthCheck',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { internalType: 'MarketId', name: 'marketId', type: 'uint24' },
    ],
    name: 'enterMarket',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { internalType: 'MarketId', name: 'marketId', type: 'uint24' },
    ],
    name: 'exitMarket',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'root', type: 'address' },
      { internalType: 'TokenId', name: 'tokenId', type: 'uint16' },
    ],
    name: 'finalizeVaultWithdrawal',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'MarketId', name: 'marketId', type: 'uint24' },
      { internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      {
        components: [
          { internalType: 'OrderId[]', name: 'ids', type: 'uint64[]' },
          { internalType: 'bool', name: 'isAll', type: 'bool' },
          { internalType: 'bool', name: 'isStrict', type: 'bool' },
        ],
        internalType: 'struct CancelData',
        name: 'cancelData',
        type: 'tuple',
      },
    ],
    name: 'forceCancel',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'MarketId', name: 'marketId', type: 'uint24' },
      { internalType: 'MarketAcc', name: 'riskyUser', type: 'bytes26' },
    ],
    name: 'forceCancelAllRiskyUser',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'MarketId', name: 'marketId', type: 'uint24' },
      { internalType: 'MarketAcc', name: 'win', type: 'bytes26' },
      { internalType: 'MarketAcc', name: 'lose', type: 'bytes26' },
      { internalType: 'int256', name: 'sizeToWin', type: 'int256' },
      { internalType: 'uint256', name: 'alpha', type: 'uint256' },
    ],
    name: 'forceDeleverage',
    outputs: [{ internalType: 'Trade', name: 'delevTrade', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'MarketId[]', name: 'marketIds', type: 'uint24[]' },
      { internalType: 'uint256', name: 'maxNTicksPurgeOneSide', type: 'uint256' },
    ],
    name: 'forcePurgeOobOrders',
    outputs: [
      { internalType: 'uint256', name: 'totalTicksPurgedLong', type: 'uint256' },
      { internalType: 'uint256', name: 'totalTicksPurgedShort', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'TokenId', name: 'tokenId', type: 'uint16' }],
    name: 'getCashFeeData',
    outputs: [
      {
        components: [
          { internalType: 'uint128', name: 'treasuryCash', type: 'uint128' },
          { internalType: 'uint128', name: 'marketEntranceFee', type: 'uint128' },
          { internalType: 'uint128', name: 'minCashCross', type: 'uint128' },
          { internalType: 'uint128', name: 'minCashIsolated', type: 'uint128' },
        ],
        internalType: 'struct IMarketHubAllEventsAndTypes.CashFeeData',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'MarketAcc', name: 'user', type: 'bytes26' }],
    name: 'getEnteredMarkets',
    outputs: [{ internalType: 'MarketId[]', name: '', type: 'uint24[]' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'userAddr', type: 'address' }],
    name: 'getPersonalCooldown',
    outputs: [{ internalType: 'uint32', name: '', type: 'uint32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getStrictMarkets',
    outputs: [{ internalType: 'MarketId[]', name: '', type: 'uint24[]' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'userAddr', type: 'address' },
      { internalType: 'TokenId', name: 'tokenId', type: 'uint16' },
    ],
    name: 'getUserWithdrawalStatus',
    outputs: [
      {
        components: [
          { internalType: 'uint32', name: 'start', type: 'uint32' },
          { internalType: 'uint224', name: 'unscaled', type: 'uint224' },
        ],
        internalType: 'struct IMarketHubAllEventsAndTypes.Withdrawal',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'globalCooldown',
    outputs: [{ internalType: 'uint32', name: '', type: 'uint32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { internalType: 'MarketId', name: 'marketId', type: 'uint24' },
    ],
    name: 'hasEnteredMarketBefore',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint32', name: 'globalCooldown', type: 'uint32' }],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'MarketId', name: 'marketId', type: 'uint24' },
      { internalType: 'MarketAcc', name: 'liq', type: 'bytes26' },
      { internalType: 'MarketAcc', name: 'vio', type: 'bytes26' },
      { internalType: 'int256', name: 'sizeToLiq', type: 'int256' },
    ],
    name: 'liquidate',
    outputs: [
      { internalType: 'Trade', name: 'liqTrade', type: 'uint256' },
      { internalType: 'uint256', name: 'liqFee', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'MarketId', name: 'marketId', type: 'uint24' }],
    name: 'marketIdToAddress',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'root', type: 'address' }],
    name: 'maxAllowedSubaccountId',
    outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'MarketId', name: 'marketId', type: 'uint24' },
      { internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      {
        components: [
          { internalType: 'enum TimeInForce', name: 'tif', type: 'uint8' },
          { internalType: 'enum Side', name: 'side', type: 'uint8' },
          { internalType: 'uint256[]', name: 'sizes', type: 'uint256[]' },
          { internalType: 'int16[]', name: 'limitTicks', type: 'int16[]' },
        ],
        internalType: 'struct LongShort',
        name: 'orders',
        type: 'tuple',
      },
      {
        components: [
          { internalType: 'OrderId[]', name: 'ids', type: 'uint64[]' },
          { internalType: 'bool', name: 'isAll', type: 'bool' },
          { internalType: 'bool', name: 'isStrict', type: 'bool' },
        ],
        internalType: 'struct CancelData',
        name: 'cancelData',
        type: 'tuple',
      },
      {
        components: [
          { internalType: 'MarketAcc', name: 'counter', type: 'bytes26' },
          { internalType: 'Trade', name: 'trade', type: 'uint256' },
          { internalType: 'int256', name: 'cashToCounter', type: 'int256' },
        ],
        internalType: 'struct OTCTrade[]',
        name: 'OTCs',
        type: 'tuple[]',
      },
    ],
    name: 'orderAndOtc',
    outputs: [
      { internalType: 'Trade', name: 'bookMatched', type: 'uint256' },
      { internalType: 'uint256', name: 'totalTakerOtcFee', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'payTreasury',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address[]', name: 'markets', type: 'address[]' }],
    name: 'registerMarket',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'token', type: 'address' }],
    name: 'registerToken',
    outputs: [{ internalType: 'TokenId', name: 'newTokenId', type: 'uint16' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'root', type: 'address' },
      { internalType: 'TokenId', name: 'tokenId', type: 'uint16' },
      { internalType: 'uint256', name: 'unscaledAmount', type: 'uint256' },
    ],
    name: 'requestVaultWithdrawal',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'riskyThresHR',
    outputs: [{ internalType: 'int256', name: '', type: 'int256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { internalType: 'int256', name: 'desiredCash', type: 'int256' },
    ],
    name: 'setAccCash',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'int128', name: 'newCritHR', type: 'int128' }],
    name: 'setCritHR',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint32', name: 'newCooldown', type: 'uint32' }],
    name: 'setGlobalCooldown',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'TokenId[]', name: 'tokenIds', type: 'uint16[]' },
      { internalType: 'uint128[]', name: 'entranceFees', type: 'uint128[]' },
    ],
    name: 'setMarketEntranceFees',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'bool', name: 'isCross', type: 'bool' },
      { internalType: 'TokenId[]', name: 'tokenIds', type: 'uint16[]' },
      { internalType: 'uint128[]', name: 'newMinCash', type: 'uint128[]' },
    ],
    name: 'setMinCashForAccounts',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'root', type: 'address' },
      { internalType: 'uint32', name: 'cooldown', type: 'uint32' },
    ],
    name: 'setPersonalCooldown',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'int256', name: 'newRiskyThresHR', type: 'int256' }],
    name: 'setRiskyThresHR',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { internalType: 'enum GetRequest', name: 'req', type: 'uint8' },
      { internalType: 'MarketId', name: 'marketId', type: 'uint24' },
    ],
    name: 'settleAllAndGet',
    outputs: [
      { internalType: 'int256', name: 'cash', type: 'int256' },
      { internalType: 'VMResult', name: 'totalVM', type: 'uint256' },
      { internalType: 'int256', name: 'signedSize', type: 'int256' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'MarketAcc', name: 'acc', type: 'bytes26' },
      { internalType: 'int256', name: 'amount', type: 'int256' },
    ],
    name: 'simulateTransfer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'TokenId', name: 'tokenId', type: 'uint16' }],
    name: 'tokenData',
    outputs: [
      {
        components: [
          { internalType: 'address', name: 'token', type: 'address' },
          { internalType: 'uint96', name: 'scalingFactor', type: 'uint96' },
        ],
        internalType: 'struct IMarketHubAllEventsAndTypes.TokenData',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'TokenId', name: 'tokenId', type: 'uint16' }],
    name: 'tokenIdToAddress',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'MarketAcc', name: 'acc', type: 'bytes26' },
      { internalType: 'uint256', name: 'unscaledAmount', type: 'uint256' },
    ],
    name: 'vaultDeposit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'root', type: 'address' },
      { internalType: 'TokenId', name: 'tokenId', type: 'uint16' },
      { internalType: 'uint256', name: 'unscaled', type: 'uint256' },
    ],
    name: 'vaultPayTreasury',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'TokenId[]', name: 'tokenIds', type: 'uint16[]' }],
    name: 'withdrawTreasury',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IMarginManagerOnly
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iMarginManagerOnlyAbi = [
  {
    inputs: [
      { internalType: 'address', name: 'root', type: 'address' },
      { internalType: 'TokenId', name: 'tokenId', type: 'uint16' },
    ],
    name: 'cancelVaultWithdrawal',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'MarketAcc', name: 'from', type: 'bytes26' },
      { internalType: 'MarketAcc', name: 'to', type: 'bytes26' },
      { internalType: 'int256', name: 'amount', type: 'int256' },
    ],
    name: 'cashTransfer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'MarketAcc', name: 'from', type: 'bytes26' },
      { internalType: 'MarketAcc', name: 'to', type: 'bytes26' },
    ],
    name: 'cashTransferAll',
    outputs: [{ internalType: 'int256', name: 'amountOut', type: 'int256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { internalType: 'MarketId', name: 'marketId', type: 'uint24' },
    ],
    name: 'enterMarket',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { internalType: 'MarketId', name: 'marketId', type: 'uint24' },
    ],
    name: 'exitMarket',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'root', type: 'address' },
      { internalType: 'TokenId', name: 'tokenId', type: 'uint16' },
    ],
    name: 'finalizeVaultWithdrawal',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'payTreasury',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'root', type: 'address' },
      { internalType: 'TokenId', name: 'tokenId', type: 'uint16' },
      { internalType: 'uint256', name: 'unscaledAmount', type: 'uint256' },
    ],
    name: 'requestVaultWithdrawal',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'MarketAcc', name: 'acc', type: 'bytes26' },
      { internalType: 'int256', name: 'amount', type: 'int256' },
    ],
    name: 'simulateTransfer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'MarketAcc', name: 'acc', type: 'bytes26' },
      { internalType: 'uint256', name: 'unscaledAmount', type: 'uint256' },
    ],
    name: 'vaultDeposit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'root', type: 'address' },
      { internalType: 'TokenId', name: 'tokenId', type: 'uint16' },
      { internalType: 'uint256', name: 'unscaled', type: 'uint256' },
    ],
    name: 'vaultPayTreasury',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IMarketHubAllEventsAndTypes
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iMarketHubAllEventsAndTypesAbi = [
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'from', type: 'bytes26' },
      { indexed: false, internalType: 'MarketAcc', name: 'to', type: 'bytes26' },
      { indexed: false, internalType: 'int256', name: 'amount', type: 'int256' },
    ],
    name: 'CashTransfer',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'TokenId', name: 'tokenId', type: 'uint16' },
      { indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'CollectFee',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'int256', name: 'newCritHR', type: 'int256' }],
    name: 'CritHRUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: false, internalType: 'MarketId', name: 'marketId', type: 'uint24' },
      { indexed: false, internalType: 'uint256', name: 'entranceFee', type: 'uint256' },
    ],
    name: 'EnterMarket',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: false, internalType: 'MarketId', name: 'marketId', type: 'uint24' },
    ],
    name: 'ExitMarket',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'uint32', name: 'newCooldown', type: 'uint32' }],
    name: 'GlobalCooldownSet',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'MarketId', name: 'marketId', type: 'uint24' },
      { indexed: true, internalType: 'address', name: 'marketAddress', type: 'address' },
    ],
    name: 'MarketAdded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'TokenId[]', name: 'tokenIds', type: 'uint16[]' },
      { indexed: false, internalType: 'uint128[]', name: 'entranceFees', type: 'uint128[]' },
    ],
    name: 'MarketEntranceFeesUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'TokenId[]', name: 'tokenIds', type: 'uint16[]' },
      { indexed: false, internalType: 'uint128[]', name: 'newMinCash', type: 'uint128[]' },
    ],
    name: 'MinCashCrossAccountsUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'TokenId[]', name: 'tokenIds', type: 'uint16[]' },
      { indexed: false, internalType: 'uint128[]', name: 'newMinCash', type: 'uint128[]' },
    ],
    name: 'MinCashIsolatedAccountsUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'PayTreasury',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'address', name: 'root', type: 'address' },
      { indexed: false, internalType: 'uint32', name: 'cooldown', type: 'uint32' },
    ],
    name: 'PersonalCooldownSet',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'int256', name: 'newRiskyThresHR', type: 'int256' }],
    name: 'RiskyThresHRUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'MarketId', name: 'marketId', type: 'uint24' },
      { indexed: false, internalType: 'bool', name: 'isEnabled', type: 'bool' },
    ],
    name: 'StrictHealthCheckUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'TokenId', name: 'tokenId', type: 'uint16' },
      { indexed: true, internalType: 'address', name: 'tokenAddress', type: 'address' },
    ],
    name: 'TokenAdded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'acc', type: 'bytes26' },
      { indexed: false, internalType: 'uint256', name: 'unscaledAmount', type: 'uint256' },
    ],
    name: 'VaultDeposit',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'address', name: 'root', type: 'address' },
      { indexed: false, internalType: 'TokenId', name: 'tokenId', type: 'uint16' },
      { indexed: false, internalType: 'uint256', name: 'totalUnscaledAmount', type: 'uint256' },
    ],
    name: 'VaultWithdrawalCanceled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'address', name: 'root', type: 'address' },
      { indexed: false, internalType: 'TokenId', name: 'tokenId', type: 'uint16' },
      { indexed: false, internalType: 'uint256', name: 'totalUnscaledAmount', type: 'uint256' },
    ],
    name: 'VaultWithdrawalFinalized',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'address', name: 'root', type: 'address' },
      { indexed: false, internalType: 'TokenId', name: 'tokenId', type: 'uint16' },
      { indexed: false, internalType: 'uint32', name: 'start', type: 'uint32' },
      { indexed: false, internalType: 'uint256', name: 'totalUnscaledAmount', type: 'uint256' },
    ],
    name: 'VaultWithdrawalRequested',
    type: 'event',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IMarketHubStorageOnly
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iMarketHubStorageOnlyAbi = [
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'from', type: 'bytes26' },
      { indexed: false, internalType: 'MarketAcc', name: 'to', type: 'bytes26' },
      { indexed: false, internalType: 'int256', name: 'amount', type: 'int256' },
    ],
    name: 'CashTransfer',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'TokenId', name: 'tokenId', type: 'uint16' },
      { indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'CollectFee',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'int256', name: 'newCritHR', type: 'int256' }],
    name: 'CritHRUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: false, internalType: 'MarketId', name: 'marketId', type: 'uint24' },
      { indexed: false, internalType: 'uint256', name: 'entranceFee', type: 'uint256' },
    ],
    name: 'EnterMarket',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: false, internalType: 'MarketId', name: 'marketId', type: 'uint24' },
    ],
    name: 'ExitMarket',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'uint32', name: 'newCooldown', type: 'uint32' }],
    name: 'GlobalCooldownSet',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'MarketId', name: 'marketId', type: 'uint24' },
      { indexed: true, internalType: 'address', name: 'marketAddress', type: 'address' },
    ],
    name: 'MarketAdded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'TokenId[]', name: 'tokenIds', type: 'uint16[]' },
      { indexed: false, internalType: 'uint128[]', name: 'entranceFees', type: 'uint128[]' },
    ],
    name: 'MarketEntranceFeesUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'TokenId[]', name: 'tokenIds', type: 'uint16[]' },
      { indexed: false, internalType: 'uint128[]', name: 'newMinCash', type: 'uint128[]' },
    ],
    name: 'MinCashCrossAccountsUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'TokenId[]', name: 'tokenIds', type: 'uint16[]' },
      { indexed: false, internalType: 'uint128[]', name: 'newMinCash', type: 'uint128[]' },
    ],
    name: 'MinCashIsolatedAccountsUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'PayTreasury',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'address', name: 'root', type: 'address' },
      { indexed: false, internalType: 'uint32', name: 'cooldown', type: 'uint32' },
    ],
    name: 'PersonalCooldownSet',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'int256', name: 'newRiskyThresHR', type: 'int256' }],
    name: 'RiskyThresHRUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'MarketId', name: 'marketId', type: 'uint24' },
      { indexed: false, internalType: 'bool', name: 'isEnabled', type: 'bool' },
    ],
    name: 'StrictHealthCheckUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'TokenId', name: 'tokenId', type: 'uint16' },
      { indexed: true, internalType: 'address', name: 'tokenAddress', type: 'address' },
    ],
    name: 'TokenAdded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'acc', type: 'bytes26' },
      { indexed: false, internalType: 'uint256', name: 'unscaledAmount', type: 'uint256' },
    ],
    name: 'VaultDeposit',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'address', name: 'root', type: 'address' },
      { indexed: false, internalType: 'TokenId', name: 'tokenId', type: 'uint16' },
      { indexed: false, internalType: 'uint256', name: 'totalUnscaledAmount', type: 'uint256' },
    ],
    name: 'VaultWithdrawalCanceled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'address', name: 'root', type: 'address' },
      { indexed: false, internalType: 'TokenId', name: 'tokenId', type: 'uint16' },
      { indexed: false, internalType: 'uint256', name: 'totalUnscaledAmount', type: 'uint256' },
    ],
    name: 'VaultWithdrawalFinalized',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'address', name: 'root', type: 'address' },
      { indexed: false, internalType: 'TokenId', name: 'tokenId', type: 'uint16' },
      { indexed: false, internalType: 'uint32', name: 'start', type: 'uint32' },
      { indexed: false, internalType: 'uint256', name: 'totalUnscaledAmount', type: 'uint256' },
    ],
    name: 'VaultWithdrawalRequested',
    type: 'event',
  },
  {
    inputs: [],
    name: 'MARKET_FACTORY',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'MAX_ENTERED_MARKETS',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'ROUTER',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'TREASURY',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'MarketAcc', name: 'user', type: 'bytes26' }],
    name: 'accCash',
    outputs: [{ internalType: 'int256', name: '', type: 'int256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'critHR',
    outputs: [{ internalType: 'int128', name: '', type: 'int128' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'MarketId', name: 'marketId', type: 'uint24' }],
    name: 'disableStrictHealthCheck',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'MarketId', name: 'marketId', type: 'uint24' }],
    name: 'enableStrictHealthCheck',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'TokenId', name: 'tokenId', type: 'uint16' }],
    name: 'getCashFeeData',
    outputs: [
      {
        components: [
          { internalType: 'uint128', name: 'treasuryCash', type: 'uint128' },
          { internalType: 'uint128', name: 'marketEntranceFee', type: 'uint128' },
          { internalType: 'uint128', name: 'minCashCross', type: 'uint128' },
          { internalType: 'uint128', name: 'minCashIsolated', type: 'uint128' },
        ],
        internalType: 'struct IMarketHubAllEventsAndTypes.CashFeeData',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'MarketAcc', name: 'user', type: 'bytes26' }],
    name: 'getEnteredMarkets',
    outputs: [{ internalType: 'MarketId[]', name: '', type: 'uint24[]' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'userAddr', type: 'address' }],
    name: 'getPersonalCooldown',
    outputs: [{ internalType: 'uint32', name: '', type: 'uint32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getStrictMarkets',
    outputs: [{ internalType: 'MarketId[]', name: '', type: 'uint24[]' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'userAddr', type: 'address' },
      { internalType: 'TokenId', name: 'tokenId', type: 'uint16' },
    ],
    name: 'getUserWithdrawalStatus',
    outputs: [
      {
        components: [
          { internalType: 'uint32', name: 'start', type: 'uint32' },
          { internalType: 'uint224', name: 'unscaled', type: 'uint224' },
        ],
        internalType: 'struct IMarketHubAllEventsAndTypes.Withdrawal',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'globalCooldown',
    outputs: [{ internalType: 'uint32', name: '', type: 'uint32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { internalType: 'MarketId', name: 'marketId', type: 'uint24' },
    ],
    name: 'hasEnteredMarketBefore',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'MarketId', name: 'marketId', type: 'uint24' }],
    name: 'marketIdToAddress',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'root', type: 'address' }],
    name: 'maxAllowedSubaccountId',
    outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address[]', name: 'markets', type: 'address[]' }],
    name: 'registerMarket',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'token', type: 'address' }],
    name: 'registerToken',
    outputs: [{ internalType: 'TokenId', name: 'newTokenId', type: 'uint16' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'riskyThresHR',
    outputs: [{ internalType: 'int256', name: '', type: 'int256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'int128', name: 'newCritHR', type: 'int128' }],
    name: 'setCritHR',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint32', name: 'newCooldown', type: 'uint32' }],
    name: 'setGlobalCooldown',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'TokenId[]', name: 'tokenIds', type: 'uint16[]' },
      { internalType: 'uint128[]', name: 'entranceFees', type: 'uint128[]' },
    ],
    name: 'setMarketEntranceFees',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'bool', name: 'isCross', type: 'bool' },
      { internalType: 'TokenId[]', name: 'tokenIds', type: 'uint16[]' },
      { internalType: 'uint128[]', name: 'newMinCash', type: 'uint128[]' },
    ],
    name: 'setMinCashForAccounts',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'root', type: 'address' },
      { internalType: 'uint32', name: 'cooldown', type: 'uint32' },
    ],
    name: 'setPersonalCooldown',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'int256', name: 'newRiskyThresHR', type: 'int256' }],
    name: 'setRiskyThresHR',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'TokenId', name: 'tokenId', type: 'uint16' }],
    name: 'tokenData',
    outputs: [
      {
        components: [
          { internalType: 'address', name: 'token', type: 'address' },
          { internalType: 'uint96', name: 'scalingFactor', type: 'uint96' },
        ],
        internalType: 'struct IMarketHubAllEventsAndTypes.TokenData',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'TokenId', name: 'tokenId', type: 'uint16' }],
    name: 'tokenIdToAddress',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'TokenId[]', name: 'tokenIds', type: 'uint16[]' }],
    name: 'withdrawTreasury',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IMarketFactory
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iMarketFactoryAbi = [
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'address', name: 'market', type: 'address' },
      {
        components: [
          { internalType: 'string', name: 'name', type: 'string' },
          { internalType: 'string', name: 'symbol', type: 'string' },
          { internalType: 'bool', name: 'k_isIsolatedOnly', type: 'bool' },
          { internalType: 'uint32', name: 'k_maturity', type: 'uint32' },
          { internalType: 'TokenId', name: 'k_tokenId', type: 'uint16' },
          { internalType: 'MarketId', name: 'k_marketId', type: 'uint24' },
          { internalType: 'uint8', name: 'k_tickStep', type: 'uint8' },
          { internalType: 'uint16', name: 'k_iTickThresh', type: 'uint16' },
        ],
        indexed: false,
        internalType: 'struct IMarketAllTypes.MarketImmutableDataStruct',
        name: 'immData',
        type: 'tuple',
      },
      {
        components: [
          { internalType: 'uint16', name: 'maxOpenOrders', type: 'uint16' },
          { internalType: 'address', name: 'markRateOracle', type: 'address' },
          { internalType: 'address', name: 'fIndexOracle', type: 'address' },
          { internalType: 'uint128', name: 'hardOICap', type: 'uint128' },
          { internalType: 'uint64', name: 'takerFee', type: 'uint64' },
          { internalType: 'uint64', name: 'otcFee', type: 'uint64' },
          {
            components: [
              { internalType: 'uint64', name: 'base', type: 'uint64' },
              { internalType: 'uint64', name: 'slope', type: 'uint64' },
              { internalType: 'uint64', name: 'feeRate', type: 'uint64' },
            ],
            internalType: 'struct IMarketAllTypes.LiqSettings',
            name: 'liqSettings',
            type: 'tuple',
          },
          { internalType: 'uint64', name: 'kIM', type: 'uint64' },
          { internalType: 'uint64', name: 'kMM', type: 'uint64' },
          { internalType: 'uint32', name: 'tThresh', type: 'uint32' },
          { internalType: 'uint16', name: 'maxRateDeviationFactorBase1e4', type: 'uint16' },
          { internalType: 'uint16', name: 'closingOrderBoundBase1e4', type: 'uint16' },
          { internalType: 'int16', name: 'loUpperConstBase1e4', type: 'int16' },
          { internalType: 'int16', name: 'loUpperSlopeBase1e4', type: 'int16' },
          { internalType: 'int16', name: 'loLowerConstBase1e4', type: 'int16' },
          { internalType: 'int16', name: 'loLowerSlopeBase1e4', type: 'int16' },
          { internalType: 'enum IMarketAllTypes.MarketStatus', name: 'status', type: 'uint8' },
          { internalType: 'bool', name: 'useImpliedAsMarkRate', type: 'bool' },
        ],
        indexed: false,
        internalType: 'struct IMarketAllTypes.MarketConfigStruct',
        name: 'config',
        type: 'tuple',
      },
    ],
    name: 'MarketCreated',
    type: 'event',
  },
  {
    inputs: [],
    name: 'IMPLEMENTATION',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'MARKET_HUB',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'string', name: 'name', type: 'string' },
      { internalType: 'string', name: 'symbol', type: 'string' },
      { internalType: 'bool', name: 'isIsolatedOnly', type: 'bool' },
      { internalType: 'uint32', name: 'maturity', type: 'uint32' },
      { internalType: 'TokenId', name: 'tokenId', type: 'uint16' },
      { internalType: 'uint8', name: 'tickStep', type: 'uint8' },
      { internalType: 'uint16', name: 'iTickThresh', type: 'uint16' },
      {
        components: [
          { internalType: 'uint16', name: 'maxOpenOrders', type: 'uint16' },
          { internalType: 'address', name: 'markRateOracle', type: 'address' },
          { internalType: 'address', name: 'fIndexOracle', type: 'address' },
          { internalType: 'uint128', name: 'hardOICap', type: 'uint128' },
          { internalType: 'uint64', name: 'takerFee', type: 'uint64' },
          { internalType: 'uint64', name: 'otcFee', type: 'uint64' },
          {
            components: [
              { internalType: 'uint64', name: 'base', type: 'uint64' },
              { internalType: 'uint64', name: 'slope', type: 'uint64' },
              { internalType: 'uint64', name: 'feeRate', type: 'uint64' },
            ],
            internalType: 'struct IMarketAllTypes.LiqSettings',
            name: 'liqSettings',
            type: 'tuple',
          },
          { internalType: 'uint64', name: 'kIM', type: 'uint64' },
          { internalType: 'uint64', name: 'kMM', type: 'uint64' },
          { internalType: 'uint32', name: 'tThresh', type: 'uint32' },
          { internalType: 'uint16', name: 'maxRateDeviationFactorBase1e4', type: 'uint16' },
          { internalType: 'uint16', name: 'closingOrderBoundBase1e4', type: 'uint16' },
          { internalType: 'int16', name: 'loUpperConstBase1e4', type: 'int16' },
          { internalType: 'int16', name: 'loUpperSlopeBase1e4', type: 'int16' },
          { internalType: 'int16', name: 'loLowerConstBase1e4', type: 'int16' },
          { internalType: 'int16', name: 'loLowerSlopeBase1e4', type: 'int16' },
          { internalType: 'enum IMarketAllTypes.MarketStatus', name: 'status', type: 'uint8' },
          { internalType: 'bool', name: 'useImpliedAsMarkRate', type: 'bool' },
        ],
        internalType: 'struct IMarketAllTypes.MarketConfigStruct',
        name: 'config',
        type: 'tuple',
      },
      {
        components: [
          { internalType: 'int16', name: 'seedTradedTick', type: 'int16' },
          { internalType: 'uint32', name: 'window', type: 'uint32' },
        ],
        internalType: 'struct MarketImpliedRateLib.InitStruct',
        name: 'impliedRateInit',
        type: 'tuple',
      },
    ],
    name: 'create',
    outputs: [{ internalType: 'address', name: 'newMarket', type: 'address' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'marketNonce',
    outputs: [{ internalType: 'uint24', name: '', type: 'uint24' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IRouter
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iRouterAbi = [
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'AMMId', name: 'ammId', type: 'uint24' },
      { indexed: false, internalType: 'MarketAcc', name: 'amm', type: 'bytes26' },
    ],
    name: 'AMMIdToAccUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: true, internalType: 'AMMId', name: 'ammId', type: 'uint24' },
      { indexed: false, internalType: 'int256', name: 'exactSizeIn', type: 'int256' },
      { indexed: false, internalType: 'uint256', name: 'netLpOut', type: 'uint256' },
      { indexed: false, internalType: 'int256', name: 'netCashIn', type: 'int256' },
      { indexed: false, internalType: 'uint256', name: 'netOtcFee', type: 'uint256' },
    ],
    name: 'AddLiquidityDualToAmm',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: true, internalType: 'AMMId', name: 'ammId', type: 'uint24' },
      { indexed: false, internalType: 'uint256', name: 'netLpOut', type: 'uint256' },
      { indexed: false, internalType: 'int256', name: 'netCashIn', type: 'int256' },
      { indexed: false, internalType: 'uint256', name: 'totalTakerOtcFee', type: 'uint256' },
      { indexed: false, internalType: 'int256', name: 'swapSizeInterm', type: 'int256' },
    ],
    name: 'AddLiquiditySingleCashToAmm',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'Account', name: 'account', type: 'bytes21' },
      { indexed: true, internalType: 'address', name: 'agent', type: 'address' },
      { indexed: true, internalType: 'uint64', name: 'expiry', type: 'uint64' },
    ],
    name: 'AgentApproved',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'Account', name: 'account', type: 'bytes21' },
      { indexed: true, internalType: 'address', name: 'agent', type: 'address' },
    ],
    name: 'AgentRevoked',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: true, internalType: 'MarketId', name: 'marketId', type: 'uint24' },
      { indexed: false, internalType: 'enum TimeInForce', name: 'tif', type: 'uint8' },
      { indexed: false, internalType: 'Trade', name: 'matched', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'takerFee', type: 'uint256' },
    ],
    name: 'BulkOrdersExecuted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'uint256', name: 'newMaxIteration', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'newEps', type: 'uint256' },
    ],
    name: 'MaxIterationAndEpsUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'Account', name: 'account', type: 'bytes21' },
      { indexed: true, internalType: 'address', name: 'newAccManager', type: 'address' },
    ],
    name: 'NewAccManagerSet',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'uint16', name: 'newNumTicksToTryAtOnce', type: 'uint16' }],
    name: 'NumTicksToTryAtOnceUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: true, internalType: 'AMMId', name: 'ammId', type: 'uint24' },
      { indexed: false, internalType: 'uint256', name: 'lpToRemove', type: 'uint256' },
      { indexed: false, internalType: 'int256', name: 'netCashOut', type: 'int256' },
      { indexed: false, internalType: 'int256', name: 'netSizeOut', type: 'int256' },
      { indexed: false, internalType: 'uint256', name: 'netOtcFee', type: 'uint256' },
    ],
    name: 'RemoveLiquidityDualFromAmm',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: true, internalType: 'AMMId', name: 'ammId', type: 'uint24' },
      { indexed: false, internalType: 'uint256', name: 'lpToRemove', type: 'uint256' },
      { indexed: false, internalType: 'int256', name: 'netCashOut', type: 'int256' },
      { indexed: false, internalType: 'uint256', name: 'netTakerOtcFee', type: 'uint256' },
      { indexed: false, internalType: 'int256', name: 'netSizeInterm', type: 'int256' },
    ],
    name: 'RemoveLiquiditySingleCashFromAmm',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: true, internalType: 'MarketId', name: 'marketId', type: 'uint24' },
      { indexed: true, internalType: 'AMMId', name: 'ammId', type: 'uint24' },
      { indexed: false, internalType: 'enum TimeInForce', name: 'tif', type: 'uint8' },
      { indexed: false, internalType: 'Trade', name: 'matched', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'takerOtcFee', type: 'uint256' },
    ],
    name: 'SingleOrderExecuted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: true, internalType: 'MarketId', name: 'marketId', type: 'uint24' },
      { indexed: true, internalType: 'AMMId', name: 'ammId', type: 'uint24' },
      { indexed: false, internalType: 'Trade', name: 'matched', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'otcFee', type: 'uint256' },
    ],
    name: 'SwapWithAmm',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'uint256', name: 'index', type: 'uint256' },
      { indexed: false, internalType: 'bytes4', name: 'errorSelector', type: 'bytes4' },
    ],
    name: 'TryAggregateCallFailed',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'uint256', name: 'index', type: 'uint256' }],
    name: 'TryAggregateCallSucceeded',
    type: 'event',
  },
  {
    inputs: [{ internalType: 'Account', name: 'acc', type: 'bytes21' }],
    name: 'accountManager',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'bool', name: 'cross', type: 'bool' },
          { internalType: 'AMMId', name: 'ammId', type: 'uint24' },
          { internalType: 'int256', name: 'maxCashIn', type: 'int256' },
          { internalType: 'int256', name: 'exactSizeIn', type: 'int256' },
          { internalType: 'uint256', name: 'minLpOut', type: 'uint256' },
        ],
        internalType: 'struct IRouterEventsAndTypes.AddLiquidityDualToAmmReq',
        name: 'req',
        type: 'tuple',
      },
    ],
    name: 'addLiquidityDualToAmm',
    outputs: [
      { internalType: 'uint256', name: 'netLpOut', type: 'uint256' },
      { internalType: 'int256', name: 'netCashIn', type: 'int256' },
      { internalType: 'uint256', name: 'netOtcFee', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'bool', name: 'cross', type: 'bool' },
          { internalType: 'AMMId', name: 'ammId', type: 'uint24' },
          { internalType: 'bool', name: 'enterMarket', type: 'bool' },
          { internalType: 'int256', name: 'netCashIn', type: 'int256' },
          { internalType: 'uint256', name: 'minLpOut', type: 'uint256' },
        ],
        internalType: 'struct IRouterEventsAndTypes.AddLiquiditySingleCashToAmmReq',
        name: 'req',
        type: 'tuple',
      },
    ],
    name: 'addLiquiditySingleCashToAmm',
    outputs: [
      { internalType: 'uint256', name: 'netLpOut', type: 'uint256' },
      { internalType: 'int256', name: 'netCashUsed', type: 'int256' },
      { internalType: 'uint256', name: 'totalTakerOtcFee', type: 'uint256' },
      { internalType: 'int256', name: 'swapSizeOut', type: 'int256' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'agent', type: 'address' },
      {
        components: [
          { internalType: 'Account', name: 'account', type: 'bytes21' },
          { internalType: 'bytes32', name: 'connectionId', type: 'bytes32' },
          { internalType: 'uint64', name: 'nonce', type: 'uint64' },
        ],
        internalType: 'struct IRouterEventsAndTypes.PendleSignTx',
        name: 'message',
        type: 'tuple',
      },
      { internalType: 'bytes', name: 'signature', type: 'bytes' },
      { internalType: 'bytes', name: 'callData', type: 'bytes' },
    ],
    name: 'agentExecute',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'Account', name: 'acc', type: 'bytes21' },
      { internalType: 'address', name: 'agent', type: 'address' },
    ],
    name: 'agentExpiry',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'AMMId', name: 'ammId', type: 'uint24' }],
    name: 'ammIdToAcc',
    outputs: [{ internalType: 'MarketAcc', name: '', type: 'bytes26' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'root', type: 'address' },
          { internalType: 'uint8', name: 'accountId', type: 'uint8' },
          { internalType: 'address', name: 'agent', type: 'address' },
          { internalType: 'uint64', name: 'expiry', type: 'uint64' },
          { internalType: 'uint64', name: 'nonce', type: 'uint64' },
        ],
        internalType: 'struct IRouterEventsAndTypes.ApproveAgentMessage',
        name: 'data',
        type: 'tuple',
      },
      { internalType: 'bytes', name: 'signature', type: 'bytes' },
    ],
    name: 'approveAgent',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'Account', name: 'account', type: 'bytes21' },
          { internalType: 'bytes', name: 'data', type: 'bytes' },
        ],
        internalType: 'struct IMiscModule.ManipulateData[]',
        name: 'calls',
        type: 'tuple[]',
      },
    ],
    name: 'batchManipulate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'Account', name: 'account', type: 'bytes21' },
          { internalType: 'address', name: 'target', type: 'address' },
          { internalType: 'bytes', name: 'data', type: 'bytes' },
        ],
        internalType: 'struct IMiscModule.SimulateData[]',
        name: 'calls',
        type: 'tuple[]',
      },
    ],
    name: 'batchRevert',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'Account', name: 'account', type: 'bytes21' },
          { internalType: 'address', name: 'target', type: 'address' },
          { internalType: 'bytes', name: 'data', type: 'bytes' },
        ],
        internalType: 'struct IMiscModule.SimulateData[]',
        name: 'calls',
        type: 'tuple[]',
      },
    ],
    name: 'batchSimulate',
    outputs: [
      { internalType: 'bytes[]', name: 'results', type: 'bytes[]' },
      { internalType: 'uint256[]', name: 'gasUsed', type: 'uint256[]' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'bool', name: 'cross', type: 'bool' },
          { internalType: 'MarketId', name: 'marketId', type: 'uint24' },
          { internalType: 'bool', name: 'cancelAll', type: 'bool' },
          { internalType: 'OrderId[]', name: 'orderIds', type: 'uint64[]' },
        ],
        internalType: 'struct IRouterEventsAndTypes.BulkCancels',
        name: 'req',
        type: 'tuple',
      },
    ],
    name: 'bulkCancels',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'bool', name: 'cross', type: 'bool' },
          {
            components: [
              { internalType: 'MarketId', name: 'marketId', type: 'uint24' },
              {
                components: [
                  { internalType: 'enum TimeInForce', name: 'tif', type: 'uint8' },
                  { internalType: 'enum Side', name: 'side', type: 'uint8' },
                  { internalType: 'uint256[]', name: 'sizes', type: 'uint256[]' },
                  { internalType: 'int16[]', name: 'limitTicks', type: 'int16[]' },
                ],
                internalType: 'struct LongShort',
                name: 'orders',
                type: 'tuple',
              },
              {
                components: [
                  { internalType: 'OrderId[]', name: 'ids', type: 'uint64[]' },
                  { internalType: 'bool', name: 'isAll', type: 'bool' },
                  { internalType: 'bool', name: 'isStrict', type: 'bool' },
                ],
                internalType: 'struct CancelData',
                name: 'cancelData',
                type: 'tuple',
              },
            ],
            internalType: 'struct BulkOrder[]',
            name: 'bulks',
            type: 'tuple[]',
          },
          { internalType: 'int128[]', name: 'desiredMatchRates', type: 'int128[]' },
        ],
        internalType: 'struct IRouterEventsAndTypes.BulkOrdersReq',
        name: 'req',
        type: 'tuple',
      },
    ],
    name: 'bulkOrders',
    outputs: [
      {
        components: [
          { internalType: 'Trade', name: 'matched', type: 'uint256' },
          { internalType: 'uint256', name: 'takerFee', type: 'uint256' },
        ],
        internalType: 'struct BulkOrderResult[]',
        name: 'results',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'TokenId', name: 'tokenId', type: 'uint16' }],
    name: 'cancelVaultWithdrawal',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'root', type: 'address' },
          { internalType: 'TokenId', name: 'tokenId', type: 'uint16' },
          { internalType: 'uint64', name: 'nonce', type: 'uint64' },
        ],
        internalType: 'struct IRouterEventsAndTypes.CancelVaultWithdrawalMessage',
        name: 'message',
        type: 'tuple',
      },
      { internalType: 'bytes', name: 'signature', type: 'bytes' },
    ],
    name: 'cancelVaultWithdrawal',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'MarketId', name: 'marketId', type: 'uint24' },
          { internalType: 'int256', name: 'signedAmount', type: 'int256' },
        ],
        internalType: 'struct IRouterEventsAndTypes.CashTransferReq',
        name: 'transfer',
        type: 'tuple',
      },
    ],
    name: 'cashTransfer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'bool', name: 'cross', type: 'bool' },
          { internalType: 'bool', name: 'isEnter', type: 'bool' },
          { internalType: 'MarketId[]', name: 'marketIds', type: 'uint24[]' },
        ],
        internalType: 'struct IRouterEventsAndTypes.EnterExitMarketsReq',
        name: 'req',
        type: 'tuple',
      },
    ],
    name: 'enterExitMarkets',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'user', type: 'address' },
      { internalType: 'TokenId', name: 'tokenId', type: 'uint16' },
    ],
    name: 'finalizeVaultWithdrawal',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'string', name: 'eip712Name', type: 'string' },
      { internalType: 'string', name: 'eip712Version', type: 'string' },
      { internalType: 'uint16', name: 'numTicksToTryAtOnce', type: 'uint16' },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'maxIterationAndEps',
    outputs: [
      { internalType: 'uint256', name: 'maxIteration', type: 'uint256' },
      { internalType: 'uint256', name: 'eps', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'numTicksToTryAtOnce',
    outputs: [{ internalType: 'uint16', name: '', type: 'uint16' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'bool', name: 'cross', type: 'bool' },
          { internalType: 'MarketId', name: 'marketId', type: 'uint24' },
          { internalType: 'uint256', name: 'amount', type: 'uint256' },
        ],
        internalType: 'struct IRouterEventsAndTypes.PayTreasuryReq',
        name: 'req',
        type: 'tuple',
      },
    ],
    name: 'payTreasury',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              { internalType: 'bool', name: 'cross', type: 'bool' },
              { internalType: 'MarketId', name: 'marketId', type: 'uint24' },
              { internalType: 'AMMId', name: 'ammId', type: 'uint24' },
              { internalType: 'enum Side', name: 'side', type: 'uint8' },
              { internalType: 'enum TimeInForce', name: 'tif', type: 'uint8' },
              { internalType: 'uint256', name: 'size', type: 'uint256' },
              { internalType: 'int16', name: 'tick', type: 'int16' },
            ],
            internalType: 'struct IRouterEventsAndTypes.Order',
            name: 'order',
            type: 'tuple',
          },
          { internalType: 'bool', name: 'enterMarket', type: 'bool' },
          { internalType: 'OrderId', name: 'idToStrictCancel', type: 'uint64' },
          { internalType: 'bool', name: 'exitMarket', type: 'bool' },
          { internalType: 'uint256', name: 'isolated_cashIn', type: 'uint256' },
          { internalType: 'bool', name: 'isolated_cashTransferAll', type: 'bool' },
          { internalType: 'int128', name: 'desiredMatchRate', type: 'int128' },
        ],
        internalType: 'struct IRouterEventsAndTypes.SingleOrderReq',
        name: 'req',
        type: 'tuple',
      },
    ],
    name: 'placeSingleOrder',
    outputs: [
      { internalType: 'Trade', name: 'matched', type: 'uint256' },
      { internalType: 'uint256', name: 'takerOtcFee', type: 'uint256' },
      { internalType: 'int256', name: 'cashWithdrawn', type: 'int256' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'bool', name: 'cross', type: 'bool' },
          { internalType: 'AMMId', name: 'ammId', type: 'uint24' },
          { internalType: 'uint256', name: 'lpToRemove', type: 'uint256' },
          { internalType: 'int256', name: 'minCashOut', type: 'int256' },
          { internalType: 'int256', name: 'minSizeOut', type: 'int256' },
          { internalType: 'int256', name: 'maxSizeOut', type: 'int256' },
        ],
        internalType: 'struct IRouterEventsAndTypes.RemoveLiquidityDualFromAmmReq',
        name: 'req',
        type: 'tuple',
      },
    ],
    name: 'removeLiquidityDualFromAmm',
    outputs: [
      { internalType: 'int256', name: 'netCashOut', type: 'int256' },
      { internalType: 'int256', name: 'netSizeOut', type: 'int256' },
      { internalType: 'uint256', name: 'netOtcFee', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'bool', name: 'cross', type: 'bool' },
          { internalType: 'AMMId', name: 'ammId', type: 'uint24' },
          { internalType: 'uint256', name: 'lpToRemove', type: 'uint256' },
          { internalType: 'int256', name: 'minCashOut', type: 'int256' },
        ],
        internalType: 'struct IRouterEventsAndTypes.RemoveLiquiditySingleCashFromAmmReq',
        name: 'req',
        type: 'tuple',
      },
    ],
    name: 'removeLiquiditySingleCashFromAmm',
    outputs: [
      { internalType: 'int256', name: 'netCashOut', type: 'int256' },
      { internalType: 'uint256', name: 'netTakerOtcFee', type: 'uint256' },
      { internalType: 'int256', name: 'swapSizeInterm', type: 'int256' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'root', type: 'address' },
          { internalType: 'TokenId', name: 'tokenId', type: 'uint16' },
          { internalType: 'uint256', name: 'amount', type: 'uint256' },
          { internalType: 'uint64', name: 'nonce', type: 'uint64' },
        ],
        internalType: 'struct IRouterEventsAndTypes.RequestVaultWithdrawalMessage',
        name: 'message',
        type: 'tuple',
      },
      { internalType: 'bytes', name: 'signature', type: 'bytes' },
    ],
    name: 'requestVaultWithdrawal',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'TokenId', name: 'tokenId', type: 'uint16' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'requestVaultWithdrawal',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'root', type: 'address' },
          { internalType: 'uint8', name: 'accountId', type: 'uint8' },
          { internalType: 'address[]', name: 'agents', type: 'address[]' },
          { internalType: 'uint64', name: 'nonce', type: 'uint64' },
        ],
        internalType: 'struct IRouterEventsAndTypes.RevokeAgentsMessage',
        name: 'data',
        type: 'tuple',
      },
      { internalType: 'bytes', name: 'signature', type: 'bytes' },
    ],
    name: 'revokeAgent',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'amm', type: 'address' }],
    name: 'setAMMIdToAcc',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'root', type: 'address' },
          { internalType: 'uint8', name: 'accountId', type: 'uint8' },
          { internalType: 'address', name: 'accManager', type: 'address' },
          { internalType: 'uint64', name: 'nonce', type: 'uint64' },
        ],
        internalType: 'struct IRouterEventsAndTypes.SetAccManagerMessage',
        name: 'data',
        type: 'tuple',
      },
      { internalType: 'bytes', name: 'signature', type: 'bytes' },
    ],
    name: 'setAccManager',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'newMaxIteration', type: 'uint256' },
      { internalType: 'uint256', name: 'newEps', type: 'uint256' },
    ],
    name: 'setMaxIterationAndEps',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint16', name: 'newNumTicksToTryAtOnce', type: 'uint16' }],
    name: 'setNumTicksToTryAtOnce',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'signer', type: 'address' }],
    name: 'signerNonce',
    outputs: [{ internalType: 'uint64', name: '', type: 'uint64' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'root', type: 'address' },
          { internalType: 'uint8', name: 'accountId', type: 'uint8' },
          { internalType: 'TokenId', name: 'tokenId', type: 'uint16' },
          { internalType: 'MarketId', name: 'marketId', type: 'uint24' },
          { internalType: 'uint256', name: 'amount', type: 'uint256' },
          { internalType: 'bool', name: 'isDeposit', type: 'bool' },
          { internalType: 'uint64', name: 'nonce', type: 'uint64' },
        ],
        internalType: 'struct IRouterEventsAndTypes.SubaccountTransferMessage',
        name: 'message',
        type: 'tuple',
      },
      { internalType: 'bytes', name: 'signature', type: 'bytes' },
    ],
    name: 'subaccountTransfer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint8', name: 'accountId', type: 'uint8' },
      { internalType: 'TokenId', name: 'tokenId', type: 'uint16' },
      { internalType: 'MarketId', name: 'marketId', type: 'uint24' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
      { internalType: 'bool', name: 'isDeposit', type: 'bool' },
    ],
    name: 'subaccountTransfer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'bool', name: 'cross', type: 'bool' },
          { internalType: 'AMMId', name: 'ammId', type: 'uint24' },
          { internalType: 'int256', name: 'signedSize', type: 'int256' },
          { internalType: 'int128', name: 'desiredSwapRate', type: 'int128' },
        ],
        internalType: 'struct IRouterEventsAndTypes.SwapWithAmmReq',
        name: 'req',
        type: 'tuple',
      },
    ],
    name: 'swapWithAmm',
    outputs: [
      { internalType: 'Trade', name: 'matched', type: 'uint256' },
      { internalType: 'uint256', name: 'otcFee', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'Account[]', name: 'accounts', type: 'bytes21[]' },
      { internalType: 'address[]', name: 'agents', type: 'address[]' },
    ],
    name: 'systemRevokeAgent',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'bool', name: 'requireSuccess', type: 'bool' },
      { internalType: 'bytes[]', name: 'calls', type: 'bytes[]' },
    ],
    name: 'tryAggregate',
    outputs: [
      {
        components: [
          { internalType: 'bool', name: 'success', type: 'bool' },
          { internalType: 'bytes', name: 'returnData', type: 'bytes' },
        ],
        internalType: 'struct IMiscModule.Result[]',
        name: 'returnData',
        type: 'tuple[]',
      },
      { internalType: 'uint256[]', name: 'gasUsed', type: 'uint256[]' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint8', name: 'accountId', type: 'uint8' },
      { internalType: 'TokenId', name: 'tokenId', type: 'uint16' },
      { internalType: 'MarketId', name: 'marketId', type: 'uint24' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'vaultDeposit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'root', type: 'address' },
          { internalType: 'uint8', name: 'accountId', type: 'uint8' },
          { internalType: 'TokenId', name: 'tokenId', type: 'uint16' },
          { internalType: 'MarketId', name: 'marketId', type: 'uint24' },
          { internalType: 'uint256', name: 'amount', type: 'uint256' },
          { internalType: 'uint64', name: 'nonce', type: 'uint64' },
        ],
        internalType: 'struct IRouterEventsAndTypes.VaultDepositMessage',
        name: 'message',
        type: 'tuple',
      },
      { internalType: 'bytes', name: 'signature', type: 'bytes' },
    ],
    name: 'vaultDeposit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'root', type: 'address' },
          { internalType: 'TokenId', name: 'tokenId', type: 'uint16' },
          { internalType: 'uint256', name: 'amount', type: 'uint256' },
          { internalType: 'uint64', name: 'nonce', type: 'uint64' },
        ],
        internalType: 'struct IRouterEventsAndTypes.VaultPayTreasuryMessage',
        name: 'message',
        type: 'tuple',
      },
      { internalType: 'bytes', name: 'signature', type: 'bytes' },
    ],
    name: 'vaultPayTreasury',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'TokenId', name: 'tokenId', type: 'uint16' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'vaultPayTreasury',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IMarketAllEventsAndTypes
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iMarketAllEventsAndTypesAbi = [
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'FIndex', name: 'newIndex', type: 'bytes26' },
      { indexed: false, internalType: 'FTag', name: 'newFTag', type: 'uint32' },
    ],
    name: 'FIndexUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'FIndex', name: 'newIndex', type: 'bytes26' },
      { indexed: false, internalType: 'FTag', name: 'newFTag', type: 'uint32' },
    ],
    name: 'FTagUpdatedOnPurge',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'uint64', name: 'newTakerFee', type: 'uint64' },
      { indexed: false, internalType: 'uint64', name: 'newOtcFee', type: 'uint64' },
    ],
    name: 'FeeRatesUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'win', type: 'bytes26' },
      { indexed: false, internalType: 'MarketAcc', name: 'lose', type: 'bytes26' },
      { indexed: false, internalType: 'Trade', name: 'delevTrade', type: 'uint256' },
    ],
    name: 'ForceDeleverage',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'uint32', name: 'newWindow', type: 'uint32' }],
    name: 'ImpliedRateObservationWindowUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'OrderId[]', name: 'orderIds', type: 'uint64[]' }],
    name: 'LimitOrderCancelled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'int16', name: 'loUpperConstBase1e4', type: 'int16' },
      { indexed: false, internalType: 'int16', name: 'loUpperSlopeBase1e4', type: 'int16' },
      { indexed: false, internalType: 'int16', name: 'loLowerConstBase1e4', type: 'int16' },
      { indexed: false, internalType: 'int16', name: 'loLowerSlopeBase1e4', type: 'int16' },
    ],
    name: 'LimitOrderConfigUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'OrderId', name: 'from', type: 'uint64' },
      { indexed: false, internalType: 'OrderId', name: 'to', type: 'uint64' },
    ],
    name: 'LimitOrderFilled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'OrderId[]', name: 'orderIds', type: 'uint64[]' }],
    name: 'LimitOrderForcedCancelled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'OrderId', name: 'orderId', type: 'uint64' },
      { indexed: false, internalType: 'uint256', name: 'filledSize', type: 'uint256' },
    ],
    name: 'LimitOrderPartiallyFilled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'maker', type: 'bytes26' },
      { indexed: false, internalType: 'OrderId[]', name: 'orderIds', type: 'uint64[]' },
      { indexed: false, internalType: 'uint256[]', name: 'sizes', type: 'uint256[]' },
    ],
    name: 'LimitOrderPlaced',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'liq', type: 'bytes26' },
      { indexed: false, internalType: 'MarketAcc', name: 'vio', type: 'bytes26' },
      { indexed: false, internalType: 'Trade', name: 'liqTrade', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'liqFee', type: 'uint256' },
    ],
    name: 'Liquidate',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        components: [
          { internalType: 'uint64', name: 'base', type: 'uint64' },
          { internalType: 'uint64', name: 'slope', type: 'uint64' },
          { internalType: 'uint64', name: 'feeRate', type: 'uint64' },
        ],
        indexed: false,
        internalType: 'struct IMarketAllTypes.LiqSettings',
        name: 'newLiqSettings',
        type: 'tuple',
      },
    ],
    name: 'LiquidationSettingsUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'uint64', name: 'newKIM', type: 'uint64' },
      { indexed: false, internalType: 'uint64', name: 'newKMM', type: 'uint64' },
      { indexed: false, internalType: 'uint64', name: 'newTThresh', type: 'uint64' },
      { indexed: false, internalType: 'uint16', name: 'newMaxRateDeviationFactorBase1e4', type: 'uint16' },
      { indexed: false, internalType: 'uint16', name: 'newClosingOrderBoundBase1e4', type: 'uint16' },
    ],
    name: 'MarginConfigUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: false, internalType: 'Trade', name: 'totalTrade', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'totalFees', type: 'uint256' },
    ],
    name: 'MarketOrdersFilled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'uint16', name: 'newMaxOpenOrders', type: 'uint16' }],
    name: 'MaxOpenOrdersUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'uint128', name: 'newHardOICap', type: 'uint128' }],
    name: 'OICapUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'OrderId', name: 'from', type: 'uint64' },
      { indexed: false, internalType: 'OrderId', name: 'to', type: 'uint64' },
    ],
    name: 'OobOrdersPurged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'address', name: 'newMarkRateOracle', type: 'address' },
      { indexed: false, internalType: 'address', name: 'newFIndexOracle', type: 'address' },
    ],
    name: 'OracleAddressesUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: false, internalType: 'MarketAcc', name: 'counterParty', type: 'bytes26' },
      { indexed: false, internalType: 'Trade', name: 'trade', type: 'uint256' },
      { indexed: false, internalType: 'int256', name: 'cashToCounter', type: 'int256' },
      { indexed: false, internalType: 'uint256', name: 'otcFee', type: 'uint256' },
    ],
    name: 'OtcSwap',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: false, internalType: 'uint256', name: 'lastFTime', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'latestFTime', type: 'uint256' },
      { indexed: false, internalType: 'int256', name: 'payment', type: 'int256' },
      { indexed: false, internalType: 'uint256', name: 'fees', type: 'uint256' },
    ],
    name: 'PaymentFromSettlement',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: false, internalType: 'uint64', name: 'newTakerDisc', type: 'uint64' },
      { indexed: false, internalType: 'uint64', name: 'newOtcDisc', type: 'uint64' },
    ],
    name: 'PersonalDiscRatesUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: false, internalType: 'bool', name: 'exemptCLOCheck', type: 'bool' },
    ],
    name: 'PersonalExemptCLOCheckUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: false, internalType: 'uint64', name: 'newKIM', type: 'uint64' },
      { indexed: false, internalType: 'uint64', name: 'newKMM', type: 'uint64' },
    ],
    name: 'PersonalMarginConfigUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'enum IMarketAllTypes.MarketStatus', name: 'newStatus', type: 'uint8' }],
    name: 'StatusUpdated',
    type: 'event',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IMarket
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iMarketAbi = [
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'FIndex', name: 'newIndex', type: 'bytes26' },
      { indexed: false, internalType: 'FTag', name: 'newFTag', type: 'uint32' },
    ],
    name: 'FIndexUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'FIndex', name: 'newIndex', type: 'bytes26' },
      { indexed: false, internalType: 'FTag', name: 'newFTag', type: 'uint32' },
    ],
    name: 'FTagUpdatedOnPurge',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'uint64', name: 'newTakerFee', type: 'uint64' },
      { indexed: false, internalType: 'uint64', name: 'newOtcFee', type: 'uint64' },
    ],
    name: 'FeeRatesUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'win', type: 'bytes26' },
      { indexed: false, internalType: 'MarketAcc', name: 'lose', type: 'bytes26' },
      { indexed: false, internalType: 'Trade', name: 'delevTrade', type: 'uint256' },
    ],
    name: 'ForceDeleverage',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'uint32', name: 'newWindow', type: 'uint32' }],
    name: 'ImpliedRateObservationWindowUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'OrderId[]', name: 'orderIds', type: 'uint64[]' }],
    name: 'LimitOrderCancelled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'int16', name: 'loUpperConstBase1e4', type: 'int16' },
      { indexed: false, internalType: 'int16', name: 'loUpperSlopeBase1e4', type: 'int16' },
      { indexed: false, internalType: 'int16', name: 'loLowerConstBase1e4', type: 'int16' },
      { indexed: false, internalType: 'int16', name: 'loLowerSlopeBase1e4', type: 'int16' },
    ],
    name: 'LimitOrderConfigUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'OrderId', name: 'from', type: 'uint64' },
      { indexed: false, internalType: 'OrderId', name: 'to', type: 'uint64' },
    ],
    name: 'LimitOrderFilled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'OrderId[]', name: 'orderIds', type: 'uint64[]' }],
    name: 'LimitOrderForcedCancelled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'OrderId', name: 'orderId', type: 'uint64' },
      { indexed: false, internalType: 'uint256', name: 'filledSize', type: 'uint256' },
    ],
    name: 'LimitOrderPartiallyFilled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'maker', type: 'bytes26' },
      { indexed: false, internalType: 'OrderId[]', name: 'orderIds', type: 'uint64[]' },
      { indexed: false, internalType: 'uint256[]', name: 'sizes', type: 'uint256[]' },
    ],
    name: 'LimitOrderPlaced',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'liq', type: 'bytes26' },
      { indexed: false, internalType: 'MarketAcc', name: 'vio', type: 'bytes26' },
      { indexed: false, internalType: 'Trade', name: 'liqTrade', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'liqFee', type: 'uint256' },
    ],
    name: 'Liquidate',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        components: [
          { internalType: 'uint64', name: 'base', type: 'uint64' },
          { internalType: 'uint64', name: 'slope', type: 'uint64' },
          { internalType: 'uint64', name: 'feeRate', type: 'uint64' },
        ],
        indexed: false,
        internalType: 'struct IMarketAllTypes.LiqSettings',
        name: 'newLiqSettings',
        type: 'tuple',
      },
    ],
    name: 'LiquidationSettingsUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'uint64', name: 'newKIM', type: 'uint64' },
      { indexed: false, internalType: 'uint64', name: 'newKMM', type: 'uint64' },
      { indexed: false, internalType: 'uint64', name: 'newTThresh', type: 'uint64' },
      { indexed: false, internalType: 'uint16', name: 'newMaxRateDeviationFactorBase1e4', type: 'uint16' },
      { indexed: false, internalType: 'uint16', name: 'newClosingOrderBoundBase1e4', type: 'uint16' },
    ],
    name: 'MarginConfigUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: false, internalType: 'Trade', name: 'totalTrade', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'totalFees', type: 'uint256' },
    ],
    name: 'MarketOrdersFilled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'uint16', name: 'newMaxOpenOrders', type: 'uint16' }],
    name: 'MaxOpenOrdersUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'uint128', name: 'newHardOICap', type: 'uint128' }],
    name: 'OICapUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'OrderId', name: 'from', type: 'uint64' },
      { indexed: false, internalType: 'OrderId', name: 'to', type: 'uint64' },
    ],
    name: 'OobOrdersPurged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'address', name: 'newMarkRateOracle', type: 'address' },
      { indexed: false, internalType: 'address', name: 'newFIndexOracle', type: 'address' },
    ],
    name: 'OracleAddressesUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: false, internalType: 'MarketAcc', name: 'counterParty', type: 'bytes26' },
      { indexed: false, internalType: 'Trade', name: 'trade', type: 'uint256' },
      { indexed: false, internalType: 'int256', name: 'cashToCounter', type: 'int256' },
      { indexed: false, internalType: 'uint256', name: 'otcFee', type: 'uint256' },
    ],
    name: 'OtcSwap',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: false, internalType: 'uint256', name: 'lastFTime', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'latestFTime', type: 'uint256' },
      { indexed: false, internalType: 'int256', name: 'payment', type: 'int256' },
      { indexed: false, internalType: 'uint256', name: 'fees', type: 'uint256' },
    ],
    name: 'PaymentFromSettlement',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: false, internalType: 'uint64', name: 'newTakerDisc', type: 'uint64' },
      { indexed: false, internalType: 'uint64', name: 'newOtcDisc', type: 'uint64' },
    ],
    name: 'PersonalDiscRatesUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: false, internalType: 'bool', name: 'exemptCLOCheck', type: 'bool' },
    ],
    name: 'PersonalExemptCLOCheckUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: false, internalType: 'uint64', name: 'newKIM', type: 'uint64' },
      { indexed: false, internalType: 'uint64', name: 'newKMM', type: 'uint64' },
    ],
    name: 'PersonalMarginConfigUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'enum IMarketAllTypes.MarketStatus', name: 'newStatus', type: 'uint8' }],
    name: 'StatusUpdated',
    type: 'event',
  },
  {
    inputs: [
      { internalType: 'MarketAcc', name: 'userAddr', type: 'bytes26' },
      {
        components: [
          { internalType: 'OrderId[]', name: 'ids', type: 'uint64[]' },
          { internalType: 'bool', name: 'isAll', type: 'bool' },
          { internalType: 'bool', name: 'isStrict', type: 'bool' },
        ],
        internalType: 'struct CancelData',
        name: 'cancelData',
        type: 'tuple',
      },
      { internalType: 'bool', name: 'isForceCancel', type: 'bool' },
    ],
    name: 'cancel',
    outputs: [
      { internalType: 'PayFee', name: 'settle', type: 'uint256' },
      { internalType: 'OrderId[]', name: 'removedIds', type: 'uint64[]' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'descriptor',
    outputs: [
      { internalType: 'bool', name: 'isIsolatedOnly', type: 'bool' },
      { internalType: 'TokenId', name: 'tokenId', type: 'uint16' },
      { internalType: 'MarketId', name: 'marketId', type: 'uint24' },
      { internalType: 'uint32', name: 'maturity', type: 'uint32' },
      { internalType: 'uint8', name: 'tickStep', type: 'uint8' },
      { internalType: 'uint16', name: 'iTickThresh', type: 'uint16' },
      { internalType: 'uint32', name: 'latestFTime', type: 'uint32' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'MarketAcc', name: 'winAddr', type: 'bytes26' },
      { internalType: 'MarketAcc', name: 'loseAddr', type: 'bytes26' },
      { internalType: 'int256', name: 'sizeToWin', type: 'int256' },
      { internalType: 'int256', name: 'loseValue', type: 'int256' },
      { internalType: 'uint256', name: 'alpha', type: 'uint256' },
    ],
    name: 'forceDeleverage',
    outputs: [
      {
        components: [
          { internalType: 'PayFee', name: 'winSettle', type: 'uint256' },
          { internalType: 'PayFee', name: 'winPayment', type: 'uint256' },
          { internalType: 'PayFee', name: 'loseSettle', type: 'uint256' },
          { internalType: 'PayFee', name: 'losePayment', type: 'uint256' },
          { internalType: 'Trade', name: 'delevTrade', type: 'uint256' },
        ],
        internalType: 'struct DelevResult',
        name: 'res',
        type: 'tuple',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'maxNTicksPurgeOneSide', type: 'uint256' }],
    name: 'forcePurgeOobOrders',
    outputs: [
      { internalType: 'uint256', name: 'nTicksPurgedLong', type: 'uint256' },
      { internalType: 'uint256', name: 'nTicksPurgedShort', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { internalType: 'MarketAcc', name: 'otcCounter', type: 'bytes26' },
    ],
    name: 'getBestFeeRates',
    outputs: [
      { internalType: 'uint64', name: 'takerFee', type: 'uint64' },
      { internalType: 'uint64', name: 'otcFee', type: 'uint64' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'MarketAcc', name: 'user', type: 'bytes26' }],
    name: 'getDelevLiqNonce',
    outputs: [{ internalType: 'uint24', name: '', type: 'uint24' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getImpliedRate',
    outputs: [
      { internalType: 'int128', name: 'lastTradedRate', type: 'int128' },
      { internalType: 'int128', name: 'oracleRate', type: 'int128' },
      { internalType: 'uint32', name: 'lastTradedTime', type: 'uint32' },
      { internalType: 'uint32', name: 'observationWindow', type: 'uint32' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getLatestFIndex',
    outputs: [{ internalType: 'FIndex', name: '', type: 'bytes26' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getLatestFTime',
    outputs: [{ internalType: 'uint32', name: '', type: 'uint32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getMarkRate',
    outputs: [{ internalType: 'int256', name: '', type: 'int256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'enum Side', name: 'side', type: 'uint8' },
      { internalType: 'int16', name: 'limitTick', type: 'int16' },
      { internalType: 'uint256', name: 'maxNTicks', type: 'uint256' },
    ],
    name: 'getNextNTicks',
    outputs: [
      { internalType: 'int16[]', name: 'ticks', type: 'int16[]' },
      { internalType: 'uint256[]', name: 'tickSizes', type: 'uint256[]' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'string', name: 'name', type: 'string' },
          { internalType: 'string', name: 'symbol', type: 'string' },
          { internalType: 'bool', name: 'k_isIsolatedOnly', type: 'bool' },
          { internalType: 'uint32', name: 'k_maturity', type: 'uint32' },
          { internalType: 'TokenId', name: 'k_tokenId', type: 'uint16' },
          { internalType: 'MarketId', name: 'k_marketId', type: 'uint24' },
          { internalType: 'uint8', name: 'k_tickStep', type: 'uint8' },
          { internalType: 'uint16', name: 'k_iTickThresh', type: 'uint16' },
        ],
        internalType: 'struct IMarketAllTypes.MarketImmutableDataStruct',
        name: 'initialImmData',
        type: 'tuple',
      },
      {
        components: [
          { internalType: 'uint16', name: 'maxOpenOrders', type: 'uint16' },
          { internalType: 'address', name: 'markRateOracle', type: 'address' },
          { internalType: 'address', name: 'fIndexOracle', type: 'address' },
          { internalType: 'uint128', name: 'hardOICap', type: 'uint128' },
          { internalType: 'uint64', name: 'takerFee', type: 'uint64' },
          { internalType: 'uint64', name: 'otcFee', type: 'uint64' },
          {
            components: [
              { internalType: 'uint64', name: 'base', type: 'uint64' },
              { internalType: 'uint64', name: 'slope', type: 'uint64' },
              { internalType: 'uint64', name: 'feeRate', type: 'uint64' },
            ],
            internalType: 'struct IMarketAllTypes.LiqSettings',
            name: 'liqSettings',
            type: 'tuple',
          },
          { internalType: 'uint64', name: 'kIM', type: 'uint64' },
          { internalType: 'uint64', name: 'kMM', type: 'uint64' },
          { internalType: 'uint32', name: 'tThresh', type: 'uint32' },
          { internalType: 'uint16', name: 'maxRateDeviationFactorBase1e4', type: 'uint16' },
          { internalType: 'uint16', name: 'closingOrderBoundBase1e4', type: 'uint16' },
          { internalType: 'int16', name: 'loUpperConstBase1e4', type: 'int16' },
          { internalType: 'int16', name: 'loUpperSlopeBase1e4', type: 'int16' },
          { internalType: 'int16', name: 'loLowerConstBase1e4', type: 'int16' },
          { internalType: 'int16', name: 'loLowerSlopeBase1e4', type: 'int16' },
          { internalType: 'enum IMarketAllTypes.MarketStatus', name: 'status', type: 'uint8' },
          { internalType: 'bool', name: 'useImpliedAsMarkRate', type: 'bool' },
        ],
        internalType: 'struct IMarketAllTypes.MarketConfigStruct',
        name: 'initialConfig',
        type: 'tuple',
      },
      {
        components: [
          { internalType: 'int16', name: 'seedTradedTick', type: 'int16' },
          { internalType: 'uint32', name: 'window', type: 'uint32' },
        ],
        internalType: 'struct MarketImpliedRateLib.InitStruct',
        name: 'impliedRateInit',
        type: 'tuple',
      },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'MarketAcc', name: 'liqAddr', type: 'bytes26' },
      { internalType: 'MarketAcc', name: 'vioAddr', type: 'bytes26' },
      { internalType: 'int256', name: 'sizeToLiq', type: 'int256' },
      { internalType: 'int256', name: 'vioHealthRatio', type: 'int256' },
      { internalType: 'int256', name: 'critHR', type: 'int256' },
    ],
    name: 'liquidate',
    outputs: [
      {
        components: [
          { internalType: 'bool', name: 'isStrictIMLiq', type: 'bool' },
          { internalType: 'VMResult', name: 'finalVMLiq', type: 'uint256' },
          { internalType: 'PayFee', name: 'liqSettle', type: 'uint256' },
          { internalType: 'PayFee', name: 'liqPayment', type: 'uint256' },
          { internalType: 'PayFee', name: 'vioSettle', type: 'uint256' },
          { internalType: 'PayFee', name: 'vioPayment', type: 'uint256' },
          { internalType: 'Trade', name: 'liqTrade', type: 'uint256' },
        ],
        internalType: 'struct LiqResult',
        name: 'res',
        type: 'tuple',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'MarketAcc', name: 'userAddr', type: 'bytes26' },
      {
        components: [
          { internalType: 'enum TimeInForce', name: 'tif', type: 'uint8' },
          { internalType: 'enum Side', name: 'side', type: 'uint8' },
          { internalType: 'uint256[]', name: 'sizes', type: 'uint256[]' },
          { internalType: 'int16[]', name: 'limitTicks', type: 'int16[]' },
        ],
        internalType: 'struct LongShort',
        name: 'orders',
        type: 'tuple',
      },
      {
        components: [
          { internalType: 'OrderId[]', name: 'ids', type: 'uint64[]' },
          { internalType: 'bool', name: 'isAll', type: 'bool' },
          { internalType: 'bool', name: 'isStrict', type: 'bool' },
        ],
        internalType: 'struct CancelData',
        name: 'cancels',
        type: 'tuple',
      },
      {
        components: [
          { internalType: 'MarketAcc', name: 'counter', type: 'bytes26' },
          { internalType: 'Trade', name: 'trade', type: 'uint256' },
          { internalType: 'int256', name: 'cashToCounter', type: 'int256' },
        ],
        internalType: 'struct OTCTrade[]',
        name: 'OTCs',
        type: 'tuple[]',
      },
      { internalType: 'int256', name: 'critHR', type: 'int256' },
    ],
    name: 'orderAndOtc',
    outputs: [
      {
        components: [
          { internalType: 'PayFee', name: 'settle', type: 'uint256' },
          { internalType: 'PayFee', name: 'payment', type: 'uint256' },
          { internalType: 'OrderId[]', name: 'removedIds', type: 'uint64[]' },
          { internalType: 'Trade', name: 'bookMatched', type: 'uint256' },
          { internalType: 'MarketAcc', name: 'partialMaker', type: 'bytes26' },
          { internalType: 'PayFee', name: 'partialPayFee', type: 'uint256' },
          { internalType: 'bool', name: 'isStrictIM', type: 'bool' },
          { internalType: 'VMResult', name: 'finalVM', type: 'uint256' },
        ],
        internalType: 'struct UserResult',
        name: 'userRes',
        type: 'tuple',
      },
      {
        components: [
          { internalType: 'PayFee', name: 'settle', type: 'uint256' },
          { internalType: 'PayFee', name: 'payment', type: 'uint256' },
          { internalType: 'bool', name: 'isStrictIM', type: 'bool' },
          { internalType: 'VMResult', name: 'finalVM', type: 'uint256' },
        ],
        internalType: 'struct OTCResult[]',
        name: 'otcRes',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'MarketAcc', name: 'user', type: 'bytes26' }],
    name: 'resetDelevLiqNonce',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint64', name: 'newTakerFee', type: 'uint64' },
      { internalType: 'uint64', name: 'newOtcFee', type: 'uint64' },
    ],
    name: 'setGlobalFeeRates',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint128', name: 'newHardOICap', type: 'uint128' }],
    name: 'setGlobalHardOICap',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint32', name: 'newWindow', type: 'uint32' }],
    name: 'setGlobalImpliedWindow',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'int16', name: 'loUpperConstBase1e4', type: 'int16' },
      { internalType: 'int16', name: 'loUpperSlopeBase1e4', type: 'int16' },
      { internalType: 'int16', name: 'loLowerConstBase1e4', type: 'int16' },
      { internalType: 'int16', name: 'loLowerSlopeBase1e4', type: 'int16' },
    ],
    name: 'setGlobalLimitOrderConfig',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'uint64', name: 'base', type: 'uint64' },
          { internalType: 'uint64', name: 'slope', type: 'uint64' },
          { internalType: 'uint64', name: 'feeRate', type: 'uint64' },
        ],
        internalType: 'struct IMarketAllTypes.LiqSettings',
        name: 'newLiqSettings',
        type: 'tuple',
      },
    ],
    name: 'setGlobalLiquidationSettings',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint64', name: 'newKIM', type: 'uint64' },
      { internalType: 'uint64', name: 'newKMM', type: 'uint64' },
      { internalType: 'uint32', name: 'newTThresh', type: 'uint32' },
      { internalType: 'uint16', name: 'newMaxRateDeviationFactorBase1e4', type: 'uint16' },
      { internalType: 'uint16', name: 'newClosingOrderBoundBase1e4', type: 'uint16' },
    ],
    name: 'setGlobalMarginConfig',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint16', name: 'newMaxOpenOrders', type: 'uint16' }],
    name: 'setGlobalMaxOpenOrders',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'newMarkRateOracle', type: 'address' },
      { internalType: 'address', name: 'newFIndexOracle', type: 'address' },
    ],
    name: 'setGlobalOracleAddresses',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'enum IMarketAllTypes.MarketStatus', name: 'newStatus', type: 'uint8' }],
    name: 'setGlobalStatus',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { internalType: 'uint64', name: 'newTakerDisc', type: 'uint64' },
      { internalType: 'uint64', name: 'newOtcDisc', type: 'uint64' },
    ],
    name: 'setPersonalDiscRates',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { internalType: 'bool', name: 'exemptCLOCheck', type: 'bool' },
    ],
    name: 'setPersonalExemptCLOCheck',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { internalType: 'uint64', name: 'newKIM', type: 'uint64' },
      { internalType: 'uint64', name: 'newKMM', type: 'uint64' },
    ],
    name: 'setPersonalMarginConfig',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { internalType: 'enum GetRequest', name: 'getType', type: 'uint8' },
    ],
    name: 'settleAndGet',
    outputs: [
      { internalType: 'VMResult', name: 'res', type: 'uint256' },
      { internalType: 'PayFee', name: 'payFee', type: 'uint256' },
      { internalType: 'int256', name: 'signedSize', type: 'int256' },
      { internalType: 'uint256', name: 'nOrders', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'FIndex', name: 'newIndex', type: 'bytes26' }],
    name: 'updateFIndex',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IMarketOff
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iMarketOffAbi = [
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'FIndex', name: 'newIndex', type: 'bytes26' },
      { indexed: false, internalType: 'FTag', name: 'newFTag', type: 'uint32' },
    ],
    name: 'FIndexUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'FIndex', name: 'newIndex', type: 'bytes26' },
      { indexed: false, internalType: 'FTag', name: 'newFTag', type: 'uint32' },
    ],
    name: 'FTagUpdatedOnPurge',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'uint64', name: 'newTakerFee', type: 'uint64' },
      { indexed: false, internalType: 'uint64', name: 'newOtcFee', type: 'uint64' },
    ],
    name: 'FeeRatesUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'win', type: 'bytes26' },
      { indexed: false, internalType: 'MarketAcc', name: 'lose', type: 'bytes26' },
      { indexed: false, internalType: 'Trade', name: 'delevTrade', type: 'uint256' },
    ],
    name: 'ForceDeleverage',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'uint32', name: 'newWindow', type: 'uint32' }],
    name: 'ImpliedRateObservationWindowUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'OrderId[]', name: 'orderIds', type: 'uint64[]' }],
    name: 'LimitOrderCancelled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'int16', name: 'loUpperConstBase1e4', type: 'int16' },
      { indexed: false, internalType: 'int16', name: 'loUpperSlopeBase1e4', type: 'int16' },
      { indexed: false, internalType: 'int16', name: 'loLowerConstBase1e4', type: 'int16' },
      { indexed: false, internalType: 'int16', name: 'loLowerSlopeBase1e4', type: 'int16' },
    ],
    name: 'LimitOrderConfigUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'OrderId', name: 'from', type: 'uint64' },
      { indexed: false, internalType: 'OrderId', name: 'to', type: 'uint64' },
    ],
    name: 'LimitOrderFilled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'OrderId[]', name: 'orderIds', type: 'uint64[]' }],
    name: 'LimitOrderForcedCancelled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'OrderId', name: 'orderId', type: 'uint64' },
      { indexed: false, internalType: 'uint256', name: 'filledSize', type: 'uint256' },
    ],
    name: 'LimitOrderPartiallyFilled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'maker', type: 'bytes26' },
      { indexed: false, internalType: 'OrderId[]', name: 'orderIds', type: 'uint64[]' },
      { indexed: false, internalType: 'uint256[]', name: 'sizes', type: 'uint256[]' },
    ],
    name: 'LimitOrderPlaced',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'liq', type: 'bytes26' },
      { indexed: false, internalType: 'MarketAcc', name: 'vio', type: 'bytes26' },
      { indexed: false, internalType: 'Trade', name: 'liqTrade', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'liqFee', type: 'uint256' },
    ],
    name: 'Liquidate',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        components: [
          { internalType: 'uint64', name: 'base', type: 'uint64' },
          { internalType: 'uint64', name: 'slope', type: 'uint64' },
          { internalType: 'uint64', name: 'feeRate', type: 'uint64' },
        ],
        indexed: false,
        internalType: 'struct IMarketAllTypes.LiqSettings',
        name: 'newLiqSettings',
        type: 'tuple',
      },
    ],
    name: 'LiquidationSettingsUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'uint64', name: 'newKIM', type: 'uint64' },
      { indexed: false, internalType: 'uint64', name: 'newKMM', type: 'uint64' },
      { indexed: false, internalType: 'uint64', name: 'newTThresh', type: 'uint64' },
      { indexed: false, internalType: 'uint16', name: 'newMaxRateDeviationFactorBase1e4', type: 'uint16' },
      { indexed: false, internalType: 'uint16', name: 'newClosingOrderBoundBase1e4', type: 'uint16' },
    ],
    name: 'MarginConfigUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: false, internalType: 'Trade', name: 'totalTrade', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'totalFees', type: 'uint256' },
    ],
    name: 'MarketOrdersFilled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'uint16', name: 'newMaxOpenOrders', type: 'uint16' }],
    name: 'MaxOpenOrdersUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'uint128', name: 'newHardOICap', type: 'uint128' }],
    name: 'OICapUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'OrderId', name: 'from', type: 'uint64' },
      { indexed: false, internalType: 'OrderId', name: 'to', type: 'uint64' },
    ],
    name: 'OobOrdersPurged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'address', name: 'newMarkRateOracle', type: 'address' },
      { indexed: false, internalType: 'address', name: 'newFIndexOracle', type: 'address' },
    ],
    name: 'OracleAddressesUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: false, internalType: 'MarketAcc', name: 'counterParty', type: 'bytes26' },
      { indexed: false, internalType: 'Trade', name: 'trade', type: 'uint256' },
      { indexed: false, internalType: 'int256', name: 'cashToCounter', type: 'int256' },
      { indexed: false, internalType: 'uint256', name: 'otcFee', type: 'uint256' },
    ],
    name: 'OtcSwap',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: false, internalType: 'uint256', name: 'lastFTime', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'latestFTime', type: 'uint256' },
      { indexed: false, internalType: 'int256', name: 'payment', type: 'int256' },
      { indexed: false, internalType: 'uint256', name: 'fees', type: 'uint256' },
    ],
    name: 'PaymentFromSettlement',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: false, internalType: 'uint64', name: 'newTakerDisc', type: 'uint64' },
      { indexed: false, internalType: 'uint64', name: 'newOtcDisc', type: 'uint64' },
    ],
    name: 'PersonalDiscRatesUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: false, internalType: 'bool', name: 'exemptCLOCheck', type: 'bool' },
    ],
    name: 'PersonalExemptCLOCheckUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: false, internalType: 'uint64', name: 'newKIM', type: 'uint64' },
      { indexed: false, internalType: 'uint64', name: 'newKMM', type: 'uint64' },
    ],
    name: 'PersonalMarginConfigUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'enum IMarketAllTypes.MarketStatus', name: 'newStatus', type: 'uint8' }],
    name: 'StatusUpdated',
    type: 'event',
  },
  {
    inputs: [
      { internalType: 'MarketAcc', name: 'vioAddr', type: 'bytes26' },
      { internalType: 'int256', name: 'sizeToLiq', type: 'int256' },
      { internalType: 'int256', name: 'vioHealthRatio', type: 'int256' },
    ],
    name: 'calcLiqTradeNoSettle',
    outputs: [{ internalType: 'Trade', name: 'liqTrade', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { internalType: 'enum MarginType', name: 'marginType', type: 'uint8' },
    ],
    name: 'calcMarginNoSettle',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'MarketAcc', name: 'user', type: 'bytes26' }],
    name: 'calcPositionValueNoSettle',
    outputs: [{ internalType: 'int256', name: '', type: 'int256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'MarketAcc', name: 'userAddr', type: 'bytes26' },
      {
        components: [
          { internalType: 'OrderId[]', name: 'ids', type: 'uint64[]' },
          { internalType: 'bool', name: 'isAll', type: 'bool' },
          { internalType: 'bool', name: 'isStrict', type: 'bool' },
        ],
        internalType: 'struct CancelData',
        name: 'cancelData',
        type: 'tuple',
      },
      { internalType: 'bool', name: 'isForceCancel', type: 'bool' },
    ],
    name: 'cancel',
    outputs: [
      { internalType: 'PayFee', name: 'settle', type: 'uint256' },
      { internalType: 'OrderId[]', name: 'removedIds', type: 'uint64[]' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'descriptor',
    outputs: [
      { internalType: 'bool', name: 'isIsolatedOnly', type: 'bool' },
      { internalType: 'TokenId', name: 'tokenId', type: 'uint16' },
      { internalType: 'MarketId', name: 'marketId', type: 'uint24' },
      { internalType: 'uint32', name: 'maturity', type: 'uint32' },
      { internalType: 'uint8', name: 'tickStep', type: 'uint8' },
      { internalType: 'uint16', name: 'iTickThresh', type: 'uint16' },
      { internalType: 'uint32', name: 'latestFTime', type: 'uint32' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'MarketAcc', name: 'winAddr', type: 'bytes26' },
      { internalType: 'MarketAcc', name: 'loseAddr', type: 'bytes26' },
      { internalType: 'int256', name: 'sizeToWin', type: 'int256' },
      { internalType: 'int256', name: 'loseValue', type: 'int256' },
      { internalType: 'uint256', name: 'alpha', type: 'uint256' },
    ],
    name: 'forceDeleverage',
    outputs: [
      {
        components: [
          { internalType: 'PayFee', name: 'winSettle', type: 'uint256' },
          { internalType: 'PayFee', name: 'winPayment', type: 'uint256' },
          { internalType: 'PayFee', name: 'loseSettle', type: 'uint256' },
          { internalType: 'PayFee', name: 'losePayment', type: 'uint256' },
          { internalType: 'Trade', name: 'delevTrade', type: 'uint256' },
        ],
        internalType: 'struct DelevResult',
        name: 'res',
        type: 'tuple',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'maxNTicksPurgeOneSide', type: 'uint256' }],
    name: 'forcePurgeOobOrders',
    outputs: [
      { internalType: 'uint256', name: 'nTicksPurgedLong', type: 'uint256' },
      { internalType: 'uint256', name: 'nTicksPurgedShort', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'MarketAcc', name: 'user', type: 'bytes26' }],
    name: 'getAllOpenOrders',
    outputs: [
      {
        components: [
          { internalType: 'enum OrderStatus', name: 'status', type: 'uint8' },
          { internalType: 'OrderId', name: 'id', type: 'uint64' },
          { internalType: 'MarketAcc', name: 'maker', type: 'bytes26' },
          { internalType: 'uint256', name: 'size', type: 'uint256' },
          { internalType: 'int256', name: 'rate', type: 'int256' },
        ],
        internalType: 'struct IMarketOffViewOnly.Order[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { internalType: 'MarketAcc', name: 'otcCounter', type: 'bytes26' },
    ],
    name: 'getBestFeeRates',
    outputs: [
      { internalType: 'uint64', name: 'takerFee', type: 'uint64' },
      { internalType: 'uint64', name: 'otcFee', type: 'uint64' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'MarketAcc', name: 'user', type: 'bytes26' }],
    name: 'getDelevLiqNonce',
    outputs: [{ internalType: 'uint24', name: '', type: 'uint24' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'MarketAcc', name: 'user', type: 'bytes26' }],
    name: 'getDiscRates',
    outputs: [
      { internalType: 'uint64', name: 'takerDisc', type: 'uint64' },
      { internalType: 'uint64', name: 'otcDisc', type: 'uint64' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'MarketAcc', name: 'user', type: 'bytes26' }],
    name: 'getExemptCLOCheck',
    outputs: [{ internalType: 'bool', name: 'exemptCLOCheck', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getImpliedRate',
    outputs: [
      { internalType: 'int128', name: 'lastTradedRate', type: 'int128' },
      { internalType: 'int128', name: 'oracleRate', type: 'int128' },
      { internalType: 'uint32', name: 'lastTradedTime', type: 'uint32' },
      { internalType: 'uint32', name: 'observationWindow', type: 'uint32' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getLatestFIndex',
    outputs: [{ internalType: 'FIndex', name: '', type: 'bytes26' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getLatestFTime',
    outputs: [{ internalType: 'uint32', name: '', type: 'uint32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'MarketAcc', name: 'user', type: 'bytes26' }],
    name: 'getMarginFactor',
    outputs: [
      { internalType: 'uint64', name: 'kIM', type: 'uint64' },
      { internalType: 'uint64', name: 'kMM', type: 'uint64' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getMarkRate',
    outputs: [{ internalType: 'int256', name: '', type: 'int256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getMarkRateView',
    outputs: [{ internalType: 'int256', name: '', type: 'int256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getMarketConfig',
    outputs: [
      {
        components: [
          { internalType: 'uint16', name: 'maxOpenOrders', type: 'uint16' },
          { internalType: 'address', name: 'markRateOracle', type: 'address' },
          { internalType: 'address', name: 'fIndexOracle', type: 'address' },
          { internalType: 'uint128', name: 'hardOICap', type: 'uint128' },
          { internalType: 'uint64', name: 'takerFee', type: 'uint64' },
          { internalType: 'uint64', name: 'otcFee', type: 'uint64' },
          {
            components: [
              { internalType: 'uint64', name: 'base', type: 'uint64' },
              { internalType: 'uint64', name: 'slope', type: 'uint64' },
              { internalType: 'uint64', name: 'feeRate', type: 'uint64' },
            ],
            internalType: 'struct IMarketAllTypes.LiqSettings',
            name: 'liqSettings',
            type: 'tuple',
          },
          { internalType: 'uint64', name: 'kIM', type: 'uint64' },
          { internalType: 'uint64', name: 'kMM', type: 'uint64' },
          { internalType: 'uint32', name: 'tThresh', type: 'uint32' },
          { internalType: 'uint16', name: 'maxRateDeviationFactorBase1e4', type: 'uint16' },
          { internalType: 'uint16', name: 'closingOrderBoundBase1e4', type: 'uint16' },
          { internalType: 'int16', name: 'loUpperConstBase1e4', type: 'int16' },
          { internalType: 'int16', name: 'loUpperSlopeBase1e4', type: 'int16' },
          { internalType: 'int16', name: 'loLowerConstBase1e4', type: 'int16' },
          { internalType: 'int16', name: 'loLowerSlopeBase1e4', type: 'int16' },
          { internalType: 'enum IMarketAllTypes.MarketStatus', name: 'status', type: 'uint8' },
          { internalType: 'bool', name: 'useImpliedAsMarkRate', type: 'bool' },
        ],
        internalType: 'struct IMarketAllTypes.MarketConfigStruct',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'enum Side', name: 'side', type: 'uint8' },
      { internalType: 'int16', name: 'limitTick', type: 'int16' },
      { internalType: 'uint256', name: 'maxNTicks', type: 'uint256' },
    ],
    name: 'getNextNTicks',
    outputs: [
      { internalType: 'int16[]', name: 'ticks', type: 'int16[]' },
      { internalType: 'uint256[]', name: 'tickSizes', type: 'uint256[]' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getOI',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'OrderId', name: 'id', type: 'uint64' }],
    name: 'getOrder',
    outputs: [
      {
        components: [
          { internalType: 'enum OrderStatus', name: 'status', type: 'uint8' },
          { internalType: 'OrderId', name: 'id', type: 'uint64' },
          { internalType: 'MarketAcc', name: 'maker', type: 'bytes26' },
          { internalType: 'uint256', name: 'size', type: 'uint256' },
          { internalType: 'int256', name: 'rate', type: 'int256' },
        ],
        internalType: 'struct IMarketOffViewOnly.Order',
        name: 'order',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'MarketAcc', name: 'user', type: 'bytes26' }],
    name: 'getPendingSizes',
    outputs: [
      { internalType: 'uint256', name: 'pendingLongSize', type: 'uint256' },
      { internalType: 'uint256', name: 'pendingShortSize', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'MarketAcc', name: 'user', type: 'bytes26' }],
    name: 'getSignedSizeNoSettle',
    outputs: [{ internalType: 'int256', name: '', type: 'int256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'enum Side', name: 'side', type: 'uint8' },
      { internalType: 'int16', name: 'fromTick', type: 'int16' },
      { internalType: 'int16', name: 'toTick', type: 'int16' },
    ],
    name: 'getTickSumSize',
    outputs: [{ internalType: 'uint256[]', name: 'sizes', type: 'uint256[]' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'string', name: 'name', type: 'string' },
          { internalType: 'string', name: 'symbol', type: 'string' },
          { internalType: 'bool', name: 'k_isIsolatedOnly', type: 'bool' },
          { internalType: 'uint32', name: 'k_maturity', type: 'uint32' },
          { internalType: 'TokenId', name: 'k_tokenId', type: 'uint16' },
          { internalType: 'MarketId', name: 'k_marketId', type: 'uint24' },
          { internalType: 'uint8', name: 'k_tickStep', type: 'uint8' },
          { internalType: 'uint16', name: 'k_iTickThresh', type: 'uint16' },
        ],
        internalType: 'struct IMarketAllTypes.MarketImmutableDataStruct',
        name: 'initialImmData',
        type: 'tuple',
      },
      {
        components: [
          { internalType: 'uint16', name: 'maxOpenOrders', type: 'uint16' },
          { internalType: 'address', name: 'markRateOracle', type: 'address' },
          { internalType: 'address', name: 'fIndexOracle', type: 'address' },
          { internalType: 'uint128', name: 'hardOICap', type: 'uint128' },
          { internalType: 'uint64', name: 'takerFee', type: 'uint64' },
          { internalType: 'uint64', name: 'otcFee', type: 'uint64' },
          {
            components: [
              { internalType: 'uint64', name: 'base', type: 'uint64' },
              { internalType: 'uint64', name: 'slope', type: 'uint64' },
              { internalType: 'uint64', name: 'feeRate', type: 'uint64' },
            ],
            internalType: 'struct IMarketAllTypes.LiqSettings',
            name: 'liqSettings',
            type: 'tuple',
          },
          { internalType: 'uint64', name: 'kIM', type: 'uint64' },
          { internalType: 'uint64', name: 'kMM', type: 'uint64' },
          { internalType: 'uint32', name: 'tThresh', type: 'uint32' },
          { internalType: 'uint16', name: 'maxRateDeviationFactorBase1e4', type: 'uint16' },
          { internalType: 'uint16', name: 'closingOrderBoundBase1e4', type: 'uint16' },
          { internalType: 'int16', name: 'loUpperConstBase1e4', type: 'int16' },
          { internalType: 'int16', name: 'loUpperSlopeBase1e4', type: 'int16' },
          { internalType: 'int16', name: 'loLowerConstBase1e4', type: 'int16' },
          { internalType: 'int16', name: 'loLowerSlopeBase1e4', type: 'int16' },
          { internalType: 'enum IMarketAllTypes.MarketStatus', name: 'status', type: 'uint8' },
          { internalType: 'bool', name: 'useImpliedAsMarkRate', type: 'bool' },
        ],
        internalType: 'struct IMarketAllTypes.MarketConfigStruct',
        name: 'initialConfig',
        type: 'tuple',
      },
      {
        components: [
          { internalType: 'int16', name: 'seedTradedTick', type: 'int16' },
          { internalType: 'uint32', name: 'window', type: 'uint32' },
        ],
        internalType: 'struct MarketImpliedRateLib.InitStruct',
        name: 'impliedRateInit',
        type: 'tuple',
      },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'MarketAcc', name: 'liqAddr', type: 'bytes26' },
      { internalType: 'MarketAcc', name: 'vioAddr', type: 'bytes26' },
      { internalType: 'int256', name: 'sizeToLiq', type: 'int256' },
      { internalType: 'int256', name: 'vioHealthRatio', type: 'int256' },
      { internalType: 'int256', name: 'critHR', type: 'int256' },
    ],
    name: 'liquidate',
    outputs: [
      {
        components: [
          { internalType: 'bool', name: 'isStrictIMLiq', type: 'bool' },
          { internalType: 'VMResult', name: 'finalVMLiq', type: 'uint256' },
          { internalType: 'PayFee', name: 'liqSettle', type: 'uint256' },
          { internalType: 'PayFee', name: 'liqPayment', type: 'uint256' },
          { internalType: 'PayFee', name: 'vioSettle', type: 'uint256' },
          { internalType: 'PayFee', name: 'vioPayment', type: 'uint256' },
          { internalType: 'Trade', name: 'liqTrade', type: 'uint256' },
        ],
        internalType: 'struct LiqResult',
        name: 'res',
        type: 'tuple',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'marketHub',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'name',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'MarketAcc', name: 'userAddr', type: 'bytes26' },
      {
        components: [
          { internalType: 'enum TimeInForce', name: 'tif', type: 'uint8' },
          { internalType: 'enum Side', name: 'side', type: 'uint8' },
          { internalType: 'uint256[]', name: 'sizes', type: 'uint256[]' },
          { internalType: 'int16[]', name: 'limitTicks', type: 'int16[]' },
        ],
        internalType: 'struct LongShort',
        name: 'orders',
        type: 'tuple',
      },
      {
        components: [
          { internalType: 'OrderId[]', name: 'ids', type: 'uint64[]' },
          { internalType: 'bool', name: 'isAll', type: 'bool' },
          { internalType: 'bool', name: 'isStrict', type: 'bool' },
        ],
        internalType: 'struct CancelData',
        name: 'cancels',
        type: 'tuple',
      },
      {
        components: [
          { internalType: 'MarketAcc', name: 'counter', type: 'bytes26' },
          { internalType: 'Trade', name: 'trade', type: 'uint256' },
          { internalType: 'int256', name: 'cashToCounter', type: 'int256' },
        ],
        internalType: 'struct OTCTrade[]',
        name: 'OTCs',
        type: 'tuple[]',
      },
      { internalType: 'int256', name: 'critHR', type: 'int256' },
    ],
    name: 'orderAndOtc',
    outputs: [
      {
        components: [
          { internalType: 'PayFee', name: 'settle', type: 'uint256' },
          { internalType: 'PayFee', name: 'payment', type: 'uint256' },
          { internalType: 'OrderId[]', name: 'removedIds', type: 'uint64[]' },
          { internalType: 'Trade', name: 'bookMatched', type: 'uint256' },
          { internalType: 'MarketAcc', name: 'partialMaker', type: 'bytes26' },
          { internalType: 'PayFee', name: 'partialPayFee', type: 'uint256' },
          { internalType: 'bool', name: 'isStrictIM', type: 'bool' },
          { internalType: 'VMResult', name: 'finalVM', type: 'uint256' },
        ],
        internalType: 'struct UserResult',
        name: 'userRes',
        type: 'tuple',
      },
      {
        components: [
          { internalType: 'PayFee', name: 'settle', type: 'uint256' },
          { internalType: 'PayFee', name: 'payment', type: 'uint256' },
          { internalType: 'bool', name: 'isStrictIM', type: 'bool' },
          { internalType: 'VMResult', name: 'finalVM', type: 'uint256' },
        ],
        internalType: 'struct OTCResult[]',
        name: 'otcRes',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'MarketAcc', name: 'user', type: 'bytes26' }],
    name: 'resetDelevLiqNonce',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint64', name: 'newTakerFee', type: 'uint64' },
      { internalType: 'uint64', name: 'newOtcFee', type: 'uint64' },
    ],
    name: 'setGlobalFeeRates',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint128', name: 'newHardOICap', type: 'uint128' }],
    name: 'setGlobalHardOICap',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint32', name: 'newWindow', type: 'uint32' }],
    name: 'setGlobalImpliedWindow',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'int16', name: 'loUpperConstBase1e4', type: 'int16' },
      { internalType: 'int16', name: 'loUpperSlopeBase1e4', type: 'int16' },
      { internalType: 'int16', name: 'loLowerConstBase1e4', type: 'int16' },
      { internalType: 'int16', name: 'loLowerSlopeBase1e4', type: 'int16' },
    ],
    name: 'setGlobalLimitOrderConfig',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'uint64', name: 'base', type: 'uint64' },
          { internalType: 'uint64', name: 'slope', type: 'uint64' },
          { internalType: 'uint64', name: 'feeRate', type: 'uint64' },
        ],
        internalType: 'struct IMarketAllTypes.LiqSettings',
        name: 'newLiqSettings',
        type: 'tuple',
      },
    ],
    name: 'setGlobalLiquidationSettings',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint64', name: 'newKIM', type: 'uint64' },
      { internalType: 'uint64', name: 'newKMM', type: 'uint64' },
      { internalType: 'uint32', name: 'newTThresh', type: 'uint32' },
      { internalType: 'uint16', name: 'newMaxRateDeviationFactorBase1e4', type: 'uint16' },
      { internalType: 'uint16', name: 'newClosingOrderBoundBase1e4', type: 'uint16' },
    ],
    name: 'setGlobalMarginConfig',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint16', name: 'newMaxOpenOrders', type: 'uint16' }],
    name: 'setGlobalMaxOpenOrders',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'newMarkRateOracle', type: 'address' },
      { internalType: 'address', name: 'newFIndexOracle', type: 'address' },
    ],
    name: 'setGlobalOracleAddresses',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'enum IMarketAllTypes.MarketStatus', name: 'newStatus', type: 'uint8' }],
    name: 'setGlobalStatus',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { internalType: 'uint64', name: 'newTakerDisc', type: 'uint64' },
      { internalType: 'uint64', name: 'newOtcDisc', type: 'uint64' },
    ],
    name: 'setPersonalDiscRates',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { internalType: 'bool', name: 'exemptCLOCheck', type: 'bool' },
    ],
    name: 'setPersonalExemptCLOCheck',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { internalType: 'uint64', name: 'newKIM', type: 'uint64' },
      { internalType: 'uint64', name: 'newKMM', type: 'uint64' },
    ],
    name: 'setPersonalMarginConfig',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { internalType: 'enum GetRequest', name: 'getType', type: 'uint8' },
    ],
    name: 'settleAndGet',
    outputs: [
      { internalType: 'VMResult', name: 'res', type: 'uint256' },
      { internalType: 'PayFee', name: 'payFee', type: 'uint256' },
      { internalType: 'int256', name: 'signedSize', type: 'int256' },
      { internalType: 'uint256', name: 'nOrders', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'FIndex', name: 'newIndex', type: 'bytes26' }],
    name: 'updateFIndex',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IMarketOrderAndOtc
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iMarketOrderAndOtcAbi = [
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'FIndex', name: 'newIndex', type: 'bytes26' },
      { indexed: false, internalType: 'FTag', name: 'newFTag', type: 'uint32' },
    ],
    name: 'FIndexUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'FIndex', name: 'newIndex', type: 'bytes26' },
      { indexed: false, internalType: 'FTag', name: 'newFTag', type: 'uint32' },
    ],
    name: 'FTagUpdatedOnPurge',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'uint64', name: 'newTakerFee', type: 'uint64' },
      { indexed: false, internalType: 'uint64', name: 'newOtcFee', type: 'uint64' },
    ],
    name: 'FeeRatesUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'win', type: 'bytes26' },
      { indexed: false, internalType: 'MarketAcc', name: 'lose', type: 'bytes26' },
      { indexed: false, internalType: 'Trade', name: 'delevTrade', type: 'uint256' },
    ],
    name: 'ForceDeleverage',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'uint32', name: 'newWindow', type: 'uint32' }],
    name: 'ImpliedRateObservationWindowUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'OrderId[]', name: 'orderIds', type: 'uint64[]' }],
    name: 'LimitOrderCancelled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'int16', name: 'loUpperConstBase1e4', type: 'int16' },
      { indexed: false, internalType: 'int16', name: 'loUpperSlopeBase1e4', type: 'int16' },
      { indexed: false, internalType: 'int16', name: 'loLowerConstBase1e4', type: 'int16' },
      { indexed: false, internalType: 'int16', name: 'loLowerSlopeBase1e4', type: 'int16' },
    ],
    name: 'LimitOrderConfigUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'OrderId', name: 'from', type: 'uint64' },
      { indexed: false, internalType: 'OrderId', name: 'to', type: 'uint64' },
    ],
    name: 'LimitOrderFilled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'OrderId[]', name: 'orderIds', type: 'uint64[]' }],
    name: 'LimitOrderForcedCancelled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'OrderId', name: 'orderId', type: 'uint64' },
      { indexed: false, internalType: 'uint256', name: 'filledSize', type: 'uint256' },
    ],
    name: 'LimitOrderPartiallyFilled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'maker', type: 'bytes26' },
      { indexed: false, internalType: 'OrderId[]', name: 'orderIds', type: 'uint64[]' },
      { indexed: false, internalType: 'uint256[]', name: 'sizes', type: 'uint256[]' },
    ],
    name: 'LimitOrderPlaced',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'liq', type: 'bytes26' },
      { indexed: false, internalType: 'MarketAcc', name: 'vio', type: 'bytes26' },
      { indexed: false, internalType: 'Trade', name: 'liqTrade', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'liqFee', type: 'uint256' },
    ],
    name: 'Liquidate',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        components: [
          { internalType: 'uint64', name: 'base', type: 'uint64' },
          { internalType: 'uint64', name: 'slope', type: 'uint64' },
          { internalType: 'uint64', name: 'feeRate', type: 'uint64' },
        ],
        indexed: false,
        internalType: 'struct IMarketAllTypes.LiqSettings',
        name: 'newLiqSettings',
        type: 'tuple',
      },
    ],
    name: 'LiquidationSettingsUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'uint64', name: 'newKIM', type: 'uint64' },
      { indexed: false, internalType: 'uint64', name: 'newKMM', type: 'uint64' },
      { indexed: false, internalType: 'uint64', name: 'newTThresh', type: 'uint64' },
      { indexed: false, internalType: 'uint16', name: 'newMaxRateDeviationFactorBase1e4', type: 'uint16' },
      { indexed: false, internalType: 'uint16', name: 'newClosingOrderBoundBase1e4', type: 'uint16' },
    ],
    name: 'MarginConfigUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: false, internalType: 'Trade', name: 'totalTrade', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'totalFees', type: 'uint256' },
    ],
    name: 'MarketOrdersFilled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'uint16', name: 'newMaxOpenOrders', type: 'uint16' }],
    name: 'MaxOpenOrdersUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'uint128', name: 'newHardOICap', type: 'uint128' }],
    name: 'OICapUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'OrderId', name: 'from', type: 'uint64' },
      { indexed: false, internalType: 'OrderId', name: 'to', type: 'uint64' },
    ],
    name: 'OobOrdersPurged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'address', name: 'newMarkRateOracle', type: 'address' },
      { indexed: false, internalType: 'address', name: 'newFIndexOracle', type: 'address' },
    ],
    name: 'OracleAddressesUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: false, internalType: 'MarketAcc', name: 'counterParty', type: 'bytes26' },
      { indexed: false, internalType: 'Trade', name: 'trade', type: 'uint256' },
      { indexed: false, internalType: 'int256', name: 'cashToCounter', type: 'int256' },
      { indexed: false, internalType: 'uint256', name: 'otcFee', type: 'uint256' },
    ],
    name: 'OtcSwap',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: false, internalType: 'uint256', name: 'lastFTime', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'latestFTime', type: 'uint256' },
      { indexed: false, internalType: 'int256', name: 'payment', type: 'int256' },
      { indexed: false, internalType: 'uint256', name: 'fees', type: 'uint256' },
    ],
    name: 'PaymentFromSettlement',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: false, internalType: 'uint64', name: 'newTakerDisc', type: 'uint64' },
      { indexed: false, internalType: 'uint64', name: 'newOtcDisc', type: 'uint64' },
    ],
    name: 'PersonalDiscRatesUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: false, internalType: 'bool', name: 'exemptCLOCheck', type: 'bool' },
    ],
    name: 'PersonalExemptCLOCheckUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: false, internalType: 'uint64', name: 'newKIM', type: 'uint64' },
      { indexed: false, internalType: 'uint64', name: 'newKMM', type: 'uint64' },
    ],
    name: 'PersonalMarginConfigUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'enum IMarketAllTypes.MarketStatus', name: 'newStatus', type: 'uint8' }],
    name: 'StatusUpdated',
    type: 'event',
  },
  {
    inputs: [
      { internalType: 'MarketAcc', name: 'userAddr', type: 'bytes26' },
      {
        components: [
          { internalType: 'enum TimeInForce', name: 'tif', type: 'uint8' },
          { internalType: 'enum Side', name: 'side', type: 'uint8' },
          { internalType: 'uint256[]', name: 'sizes', type: 'uint256[]' },
          { internalType: 'int16[]', name: 'limitTicks', type: 'int16[]' },
        ],
        internalType: 'struct LongShort',
        name: 'orders',
        type: 'tuple',
      },
      {
        components: [
          { internalType: 'OrderId[]', name: 'ids', type: 'uint64[]' },
          { internalType: 'bool', name: 'isAll', type: 'bool' },
          { internalType: 'bool', name: 'isStrict', type: 'bool' },
        ],
        internalType: 'struct CancelData',
        name: 'cancels',
        type: 'tuple',
      },
      {
        components: [
          { internalType: 'MarketAcc', name: 'counter', type: 'bytes26' },
          { internalType: 'Trade', name: 'trade', type: 'uint256' },
          { internalType: 'int256', name: 'cashToCounter', type: 'int256' },
        ],
        internalType: 'struct OTCTrade[]',
        name: 'OTCs',
        type: 'tuple[]',
      },
      { internalType: 'int256', name: 'critHR', type: 'int256' },
    ],
    name: 'orderAndOtc',
    outputs: [
      {
        components: [
          { internalType: 'PayFee', name: 'settle', type: 'uint256' },
          { internalType: 'PayFee', name: 'payment', type: 'uint256' },
          { internalType: 'OrderId[]', name: 'removedIds', type: 'uint64[]' },
          { internalType: 'Trade', name: 'bookMatched', type: 'uint256' },
          { internalType: 'MarketAcc', name: 'partialMaker', type: 'bytes26' },
          { internalType: 'PayFee', name: 'partialPayFee', type: 'uint256' },
          { internalType: 'bool', name: 'isStrictIM', type: 'bool' },
          { internalType: 'VMResult', name: 'finalVM', type: 'uint256' },
        ],
        internalType: 'struct UserResult',
        name: 'userRes',
        type: 'tuple',
      },
      {
        components: [
          { internalType: 'PayFee', name: 'settle', type: 'uint256' },
          { internalType: 'PayFee', name: 'payment', type: 'uint256' },
          { internalType: 'bool', name: 'isStrictIM', type: 'bool' },
          { internalType: 'VMResult', name: 'finalVM', type: 'uint256' },
        ],
        internalType: 'struct OTCResult[]',
        name: 'otcRes',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IMarketAllTypes
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iMarketAllTypesAbi = [] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IMarketSetting
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iMarketSettingAbi = [
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'FIndex', name: 'newIndex', type: 'bytes26' },
      { indexed: false, internalType: 'FTag', name: 'newFTag', type: 'uint32' },
    ],
    name: 'FIndexUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'FIndex', name: 'newIndex', type: 'bytes26' },
      { indexed: false, internalType: 'FTag', name: 'newFTag', type: 'uint32' },
    ],
    name: 'FTagUpdatedOnPurge',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'uint64', name: 'newTakerFee', type: 'uint64' },
      { indexed: false, internalType: 'uint64', name: 'newOtcFee', type: 'uint64' },
    ],
    name: 'FeeRatesUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'win', type: 'bytes26' },
      { indexed: false, internalType: 'MarketAcc', name: 'lose', type: 'bytes26' },
      { indexed: false, internalType: 'Trade', name: 'delevTrade', type: 'uint256' },
    ],
    name: 'ForceDeleverage',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'uint32', name: 'newWindow', type: 'uint32' }],
    name: 'ImpliedRateObservationWindowUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'OrderId[]', name: 'orderIds', type: 'uint64[]' }],
    name: 'LimitOrderCancelled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'int16', name: 'loUpperConstBase1e4', type: 'int16' },
      { indexed: false, internalType: 'int16', name: 'loUpperSlopeBase1e4', type: 'int16' },
      { indexed: false, internalType: 'int16', name: 'loLowerConstBase1e4', type: 'int16' },
      { indexed: false, internalType: 'int16', name: 'loLowerSlopeBase1e4', type: 'int16' },
    ],
    name: 'LimitOrderConfigUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'OrderId', name: 'from', type: 'uint64' },
      { indexed: false, internalType: 'OrderId', name: 'to', type: 'uint64' },
    ],
    name: 'LimitOrderFilled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'OrderId[]', name: 'orderIds', type: 'uint64[]' }],
    name: 'LimitOrderForcedCancelled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'OrderId', name: 'orderId', type: 'uint64' },
      { indexed: false, internalType: 'uint256', name: 'filledSize', type: 'uint256' },
    ],
    name: 'LimitOrderPartiallyFilled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'maker', type: 'bytes26' },
      { indexed: false, internalType: 'OrderId[]', name: 'orderIds', type: 'uint64[]' },
      { indexed: false, internalType: 'uint256[]', name: 'sizes', type: 'uint256[]' },
    ],
    name: 'LimitOrderPlaced',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'liq', type: 'bytes26' },
      { indexed: false, internalType: 'MarketAcc', name: 'vio', type: 'bytes26' },
      { indexed: false, internalType: 'Trade', name: 'liqTrade', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'liqFee', type: 'uint256' },
    ],
    name: 'Liquidate',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        components: [
          { internalType: 'uint64', name: 'base', type: 'uint64' },
          { internalType: 'uint64', name: 'slope', type: 'uint64' },
          { internalType: 'uint64', name: 'feeRate', type: 'uint64' },
        ],
        indexed: false,
        internalType: 'struct IMarketAllTypes.LiqSettings',
        name: 'newLiqSettings',
        type: 'tuple',
      },
    ],
    name: 'LiquidationSettingsUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'uint64', name: 'newKIM', type: 'uint64' },
      { indexed: false, internalType: 'uint64', name: 'newKMM', type: 'uint64' },
      { indexed: false, internalType: 'uint64', name: 'newTThresh', type: 'uint64' },
      { indexed: false, internalType: 'uint16', name: 'newMaxRateDeviationFactorBase1e4', type: 'uint16' },
      { indexed: false, internalType: 'uint16', name: 'newClosingOrderBoundBase1e4', type: 'uint16' },
    ],
    name: 'MarginConfigUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: false, internalType: 'Trade', name: 'totalTrade', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'totalFees', type: 'uint256' },
    ],
    name: 'MarketOrdersFilled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'uint16', name: 'newMaxOpenOrders', type: 'uint16' }],
    name: 'MaxOpenOrdersUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'uint128', name: 'newHardOICap', type: 'uint128' }],
    name: 'OICapUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'OrderId', name: 'from', type: 'uint64' },
      { indexed: false, internalType: 'OrderId', name: 'to', type: 'uint64' },
    ],
    name: 'OobOrdersPurged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'address', name: 'newMarkRateOracle', type: 'address' },
      { indexed: false, internalType: 'address', name: 'newFIndexOracle', type: 'address' },
    ],
    name: 'OracleAddressesUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: false, internalType: 'MarketAcc', name: 'counterParty', type: 'bytes26' },
      { indexed: false, internalType: 'Trade', name: 'trade', type: 'uint256' },
      { indexed: false, internalType: 'int256', name: 'cashToCounter', type: 'int256' },
      { indexed: false, internalType: 'uint256', name: 'otcFee', type: 'uint256' },
    ],
    name: 'OtcSwap',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: false, internalType: 'uint256', name: 'lastFTime', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'latestFTime', type: 'uint256' },
      { indexed: false, internalType: 'int256', name: 'payment', type: 'int256' },
      { indexed: false, internalType: 'uint256', name: 'fees', type: 'uint256' },
    ],
    name: 'PaymentFromSettlement',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: false, internalType: 'uint64', name: 'newTakerDisc', type: 'uint64' },
      { indexed: false, internalType: 'uint64', name: 'newOtcDisc', type: 'uint64' },
    ],
    name: 'PersonalDiscRatesUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: false, internalType: 'bool', name: 'exemptCLOCheck', type: 'bool' },
    ],
    name: 'PersonalExemptCLOCheckUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: false, internalType: 'uint64', name: 'newKIM', type: 'uint64' },
      { indexed: false, internalType: 'uint64', name: 'newKMM', type: 'uint64' },
    ],
    name: 'PersonalMarginConfigUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'enum IMarketAllTypes.MarketStatus', name: 'newStatus', type: 'uint8' }],
    name: 'StatusUpdated',
    type: 'event',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'string', name: 'name', type: 'string' },
          { internalType: 'string', name: 'symbol', type: 'string' },
          { internalType: 'bool', name: 'k_isIsolatedOnly', type: 'bool' },
          { internalType: 'uint32', name: 'k_maturity', type: 'uint32' },
          { internalType: 'TokenId', name: 'k_tokenId', type: 'uint16' },
          { internalType: 'MarketId', name: 'k_marketId', type: 'uint24' },
          { internalType: 'uint8', name: 'k_tickStep', type: 'uint8' },
          { internalType: 'uint16', name: 'k_iTickThresh', type: 'uint16' },
        ],
        internalType: 'struct IMarketAllTypes.MarketImmutableDataStruct',
        name: 'initialImmData',
        type: 'tuple',
      },
      {
        components: [
          { internalType: 'uint16', name: 'maxOpenOrders', type: 'uint16' },
          { internalType: 'address', name: 'markRateOracle', type: 'address' },
          { internalType: 'address', name: 'fIndexOracle', type: 'address' },
          { internalType: 'uint128', name: 'hardOICap', type: 'uint128' },
          { internalType: 'uint64', name: 'takerFee', type: 'uint64' },
          { internalType: 'uint64', name: 'otcFee', type: 'uint64' },
          {
            components: [
              { internalType: 'uint64', name: 'base', type: 'uint64' },
              { internalType: 'uint64', name: 'slope', type: 'uint64' },
              { internalType: 'uint64', name: 'feeRate', type: 'uint64' },
            ],
            internalType: 'struct IMarketAllTypes.LiqSettings',
            name: 'liqSettings',
            type: 'tuple',
          },
          { internalType: 'uint64', name: 'kIM', type: 'uint64' },
          { internalType: 'uint64', name: 'kMM', type: 'uint64' },
          { internalType: 'uint32', name: 'tThresh', type: 'uint32' },
          { internalType: 'uint16', name: 'maxRateDeviationFactorBase1e4', type: 'uint16' },
          { internalType: 'uint16', name: 'closingOrderBoundBase1e4', type: 'uint16' },
          { internalType: 'int16', name: 'loUpperConstBase1e4', type: 'int16' },
          { internalType: 'int16', name: 'loUpperSlopeBase1e4', type: 'int16' },
          { internalType: 'int16', name: 'loLowerConstBase1e4', type: 'int16' },
          { internalType: 'int16', name: 'loLowerSlopeBase1e4', type: 'int16' },
          { internalType: 'enum IMarketAllTypes.MarketStatus', name: 'status', type: 'uint8' },
          { internalType: 'bool', name: 'useImpliedAsMarkRate', type: 'bool' },
        ],
        internalType: 'struct IMarketAllTypes.MarketConfigStruct',
        name: 'initialConfig',
        type: 'tuple',
      },
      {
        components: [
          { internalType: 'int16', name: 'seedTradedTick', type: 'int16' },
          { internalType: 'uint32', name: 'window', type: 'uint32' },
        ],
        internalType: 'struct MarketImpliedRateLib.InitStruct',
        name: 'impliedRateInit',
        type: 'tuple',
      },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint64', name: 'newTakerFee', type: 'uint64' },
      { internalType: 'uint64', name: 'newOtcFee', type: 'uint64' },
    ],
    name: 'setGlobalFeeRates',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint128', name: 'newHardOICap', type: 'uint128' }],
    name: 'setGlobalHardOICap',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint32', name: 'newWindow', type: 'uint32' }],
    name: 'setGlobalImpliedWindow',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'int16', name: 'loUpperConstBase1e4', type: 'int16' },
      { internalType: 'int16', name: 'loUpperSlopeBase1e4', type: 'int16' },
      { internalType: 'int16', name: 'loLowerConstBase1e4', type: 'int16' },
      { internalType: 'int16', name: 'loLowerSlopeBase1e4', type: 'int16' },
    ],
    name: 'setGlobalLimitOrderConfig',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'uint64', name: 'base', type: 'uint64' },
          { internalType: 'uint64', name: 'slope', type: 'uint64' },
          { internalType: 'uint64', name: 'feeRate', type: 'uint64' },
        ],
        internalType: 'struct IMarketAllTypes.LiqSettings',
        name: 'newLiqSettings',
        type: 'tuple',
      },
    ],
    name: 'setGlobalLiquidationSettings',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint64', name: 'newKIM', type: 'uint64' },
      { internalType: 'uint64', name: 'newKMM', type: 'uint64' },
      { internalType: 'uint32', name: 'newTThresh', type: 'uint32' },
      { internalType: 'uint16', name: 'newMaxRateDeviationFactorBase1e4', type: 'uint16' },
      { internalType: 'uint16', name: 'newClosingOrderBoundBase1e4', type: 'uint16' },
    ],
    name: 'setGlobalMarginConfig',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint16', name: 'newMaxOpenOrders', type: 'uint16' }],
    name: 'setGlobalMaxOpenOrders',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'newMarkRateOracle', type: 'address' },
      { internalType: 'address', name: 'newFIndexOracle', type: 'address' },
    ],
    name: 'setGlobalOracleAddresses',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'enum IMarketAllTypes.MarketStatus', name: 'newStatus', type: 'uint8' }],
    name: 'setGlobalStatus',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { internalType: 'uint64', name: 'newTakerDisc', type: 'uint64' },
      { internalType: 'uint64', name: 'newOtcDisc', type: 'uint64' },
    ],
    name: 'setPersonalDiscRates',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { internalType: 'bool', name: 'exemptCLOCheck', type: 'bool' },
    ],
    name: 'setPersonalExemptCLOCheck',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { internalType: 'uint64', name: 'newKIM', type: 'uint64' },
      { internalType: 'uint64', name: 'newKMM', type: 'uint64' },
    ],
    name: 'setPersonalMarginConfig',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'FIndex', name: 'newIndex', type: 'bytes26' }],
    name: 'updateFIndex',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IMarketRiskManagement
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iMarketRiskManagementAbi = [
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'FIndex', name: 'newIndex', type: 'bytes26' },
      { indexed: false, internalType: 'FTag', name: 'newFTag', type: 'uint32' },
    ],
    name: 'FIndexUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'FIndex', name: 'newIndex', type: 'bytes26' },
      { indexed: false, internalType: 'FTag', name: 'newFTag', type: 'uint32' },
    ],
    name: 'FTagUpdatedOnPurge',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'uint64', name: 'newTakerFee', type: 'uint64' },
      { indexed: false, internalType: 'uint64', name: 'newOtcFee', type: 'uint64' },
    ],
    name: 'FeeRatesUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'win', type: 'bytes26' },
      { indexed: false, internalType: 'MarketAcc', name: 'lose', type: 'bytes26' },
      { indexed: false, internalType: 'Trade', name: 'delevTrade', type: 'uint256' },
    ],
    name: 'ForceDeleverage',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'uint32', name: 'newWindow', type: 'uint32' }],
    name: 'ImpliedRateObservationWindowUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'OrderId[]', name: 'orderIds', type: 'uint64[]' }],
    name: 'LimitOrderCancelled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'int16', name: 'loUpperConstBase1e4', type: 'int16' },
      { indexed: false, internalType: 'int16', name: 'loUpperSlopeBase1e4', type: 'int16' },
      { indexed: false, internalType: 'int16', name: 'loLowerConstBase1e4', type: 'int16' },
      { indexed: false, internalType: 'int16', name: 'loLowerSlopeBase1e4', type: 'int16' },
    ],
    name: 'LimitOrderConfigUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'OrderId', name: 'from', type: 'uint64' },
      { indexed: false, internalType: 'OrderId', name: 'to', type: 'uint64' },
    ],
    name: 'LimitOrderFilled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'OrderId[]', name: 'orderIds', type: 'uint64[]' }],
    name: 'LimitOrderForcedCancelled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'OrderId', name: 'orderId', type: 'uint64' },
      { indexed: false, internalType: 'uint256', name: 'filledSize', type: 'uint256' },
    ],
    name: 'LimitOrderPartiallyFilled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'maker', type: 'bytes26' },
      { indexed: false, internalType: 'OrderId[]', name: 'orderIds', type: 'uint64[]' },
      { indexed: false, internalType: 'uint256[]', name: 'sizes', type: 'uint256[]' },
    ],
    name: 'LimitOrderPlaced',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'liq', type: 'bytes26' },
      { indexed: false, internalType: 'MarketAcc', name: 'vio', type: 'bytes26' },
      { indexed: false, internalType: 'Trade', name: 'liqTrade', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'liqFee', type: 'uint256' },
    ],
    name: 'Liquidate',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        components: [
          { internalType: 'uint64', name: 'base', type: 'uint64' },
          { internalType: 'uint64', name: 'slope', type: 'uint64' },
          { internalType: 'uint64', name: 'feeRate', type: 'uint64' },
        ],
        indexed: false,
        internalType: 'struct IMarketAllTypes.LiqSettings',
        name: 'newLiqSettings',
        type: 'tuple',
      },
    ],
    name: 'LiquidationSettingsUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'uint64', name: 'newKIM', type: 'uint64' },
      { indexed: false, internalType: 'uint64', name: 'newKMM', type: 'uint64' },
      { indexed: false, internalType: 'uint64', name: 'newTThresh', type: 'uint64' },
      { indexed: false, internalType: 'uint16', name: 'newMaxRateDeviationFactorBase1e4', type: 'uint16' },
      { indexed: false, internalType: 'uint16', name: 'newClosingOrderBoundBase1e4', type: 'uint16' },
    ],
    name: 'MarginConfigUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: false, internalType: 'Trade', name: 'totalTrade', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'totalFees', type: 'uint256' },
    ],
    name: 'MarketOrdersFilled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'uint16', name: 'newMaxOpenOrders', type: 'uint16' }],
    name: 'MaxOpenOrdersUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'uint128', name: 'newHardOICap', type: 'uint128' }],
    name: 'OICapUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'OrderId', name: 'from', type: 'uint64' },
      { indexed: false, internalType: 'OrderId', name: 'to', type: 'uint64' },
    ],
    name: 'OobOrdersPurged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'address', name: 'newMarkRateOracle', type: 'address' },
      { indexed: false, internalType: 'address', name: 'newFIndexOracle', type: 'address' },
    ],
    name: 'OracleAddressesUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: false, internalType: 'MarketAcc', name: 'counterParty', type: 'bytes26' },
      { indexed: false, internalType: 'Trade', name: 'trade', type: 'uint256' },
      { indexed: false, internalType: 'int256', name: 'cashToCounter', type: 'int256' },
      { indexed: false, internalType: 'uint256', name: 'otcFee', type: 'uint256' },
    ],
    name: 'OtcSwap',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: false, internalType: 'uint256', name: 'lastFTime', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'latestFTime', type: 'uint256' },
      { indexed: false, internalType: 'int256', name: 'payment', type: 'int256' },
      { indexed: false, internalType: 'uint256', name: 'fees', type: 'uint256' },
    ],
    name: 'PaymentFromSettlement',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: false, internalType: 'uint64', name: 'newTakerDisc', type: 'uint64' },
      { indexed: false, internalType: 'uint64', name: 'newOtcDisc', type: 'uint64' },
    ],
    name: 'PersonalDiscRatesUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: false, internalType: 'bool', name: 'exemptCLOCheck', type: 'bool' },
    ],
    name: 'PersonalExemptCLOCheckUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: false, internalType: 'uint64', name: 'newKIM', type: 'uint64' },
      { indexed: false, internalType: 'uint64', name: 'newKMM', type: 'uint64' },
    ],
    name: 'PersonalMarginConfigUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'enum IMarketAllTypes.MarketStatus', name: 'newStatus', type: 'uint8' }],
    name: 'StatusUpdated',
    type: 'event',
  },
  {
    inputs: [
      { internalType: 'MarketAcc', name: 'winAddr', type: 'bytes26' },
      { internalType: 'MarketAcc', name: 'loseAddr', type: 'bytes26' },
      { internalType: 'int256', name: 'sizeToWin', type: 'int256' },
      { internalType: 'int256', name: 'loseValue', type: 'int256' },
      { internalType: 'uint256', name: 'alpha', type: 'uint256' },
    ],
    name: 'forceDeleverage',
    outputs: [
      {
        components: [
          { internalType: 'PayFee', name: 'winSettle', type: 'uint256' },
          { internalType: 'PayFee', name: 'winPayment', type: 'uint256' },
          { internalType: 'PayFee', name: 'loseSettle', type: 'uint256' },
          { internalType: 'PayFee', name: 'losePayment', type: 'uint256' },
          { internalType: 'Trade', name: 'delevTrade', type: 'uint256' },
        ],
        internalType: 'struct DelevResult',
        name: 'res',
        type: 'tuple',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'maxNTicksPurgeOneSide', type: 'uint256' }],
    name: 'forcePurgeOobOrders',
    outputs: [
      { internalType: 'uint256', name: 'nTicksPurgedLong', type: 'uint256' },
      { internalType: 'uint256', name: 'nTicksPurgedShort', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IMarketEntry
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iMarketEntryAbi = [
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'FIndex', name: 'newIndex', type: 'bytes26' },
      { indexed: false, internalType: 'FTag', name: 'newFTag', type: 'uint32' },
    ],
    name: 'FIndexUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'FIndex', name: 'newIndex', type: 'bytes26' },
      { indexed: false, internalType: 'FTag', name: 'newFTag', type: 'uint32' },
    ],
    name: 'FTagUpdatedOnPurge',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'uint64', name: 'newTakerFee', type: 'uint64' },
      { indexed: false, internalType: 'uint64', name: 'newOtcFee', type: 'uint64' },
    ],
    name: 'FeeRatesUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'win', type: 'bytes26' },
      { indexed: false, internalType: 'MarketAcc', name: 'lose', type: 'bytes26' },
      { indexed: false, internalType: 'Trade', name: 'delevTrade', type: 'uint256' },
    ],
    name: 'ForceDeleverage',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'uint32', name: 'newWindow', type: 'uint32' }],
    name: 'ImpliedRateObservationWindowUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'OrderId[]', name: 'orderIds', type: 'uint64[]' }],
    name: 'LimitOrderCancelled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'int16', name: 'loUpperConstBase1e4', type: 'int16' },
      { indexed: false, internalType: 'int16', name: 'loUpperSlopeBase1e4', type: 'int16' },
      { indexed: false, internalType: 'int16', name: 'loLowerConstBase1e4', type: 'int16' },
      { indexed: false, internalType: 'int16', name: 'loLowerSlopeBase1e4', type: 'int16' },
    ],
    name: 'LimitOrderConfigUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'OrderId', name: 'from', type: 'uint64' },
      { indexed: false, internalType: 'OrderId', name: 'to', type: 'uint64' },
    ],
    name: 'LimitOrderFilled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'OrderId[]', name: 'orderIds', type: 'uint64[]' }],
    name: 'LimitOrderForcedCancelled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'OrderId', name: 'orderId', type: 'uint64' },
      { indexed: false, internalType: 'uint256', name: 'filledSize', type: 'uint256' },
    ],
    name: 'LimitOrderPartiallyFilled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'maker', type: 'bytes26' },
      { indexed: false, internalType: 'OrderId[]', name: 'orderIds', type: 'uint64[]' },
      { indexed: false, internalType: 'uint256[]', name: 'sizes', type: 'uint256[]' },
    ],
    name: 'LimitOrderPlaced',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'liq', type: 'bytes26' },
      { indexed: false, internalType: 'MarketAcc', name: 'vio', type: 'bytes26' },
      { indexed: false, internalType: 'Trade', name: 'liqTrade', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'liqFee', type: 'uint256' },
    ],
    name: 'Liquidate',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        components: [
          { internalType: 'uint64', name: 'base', type: 'uint64' },
          { internalType: 'uint64', name: 'slope', type: 'uint64' },
          { internalType: 'uint64', name: 'feeRate', type: 'uint64' },
        ],
        indexed: false,
        internalType: 'struct IMarketAllTypes.LiqSettings',
        name: 'newLiqSettings',
        type: 'tuple',
      },
    ],
    name: 'LiquidationSettingsUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'uint64', name: 'newKIM', type: 'uint64' },
      { indexed: false, internalType: 'uint64', name: 'newKMM', type: 'uint64' },
      { indexed: false, internalType: 'uint64', name: 'newTThresh', type: 'uint64' },
      { indexed: false, internalType: 'uint16', name: 'newMaxRateDeviationFactorBase1e4', type: 'uint16' },
      { indexed: false, internalType: 'uint16', name: 'newClosingOrderBoundBase1e4', type: 'uint16' },
    ],
    name: 'MarginConfigUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: false, internalType: 'Trade', name: 'totalTrade', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'totalFees', type: 'uint256' },
    ],
    name: 'MarketOrdersFilled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'uint16', name: 'newMaxOpenOrders', type: 'uint16' }],
    name: 'MaxOpenOrdersUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'uint128', name: 'newHardOICap', type: 'uint128' }],
    name: 'OICapUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'OrderId', name: 'from', type: 'uint64' },
      { indexed: false, internalType: 'OrderId', name: 'to', type: 'uint64' },
    ],
    name: 'OobOrdersPurged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'address', name: 'newMarkRateOracle', type: 'address' },
      { indexed: false, internalType: 'address', name: 'newFIndexOracle', type: 'address' },
    ],
    name: 'OracleAddressesUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: false, internalType: 'MarketAcc', name: 'counterParty', type: 'bytes26' },
      { indexed: false, internalType: 'Trade', name: 'trade', type: 'uint256' },
      { indexed: false, internalType: 'int256', name: 'cashToCounter', type: 'int256' },
      { indexed: false, internalType: 'uint256', name: 'otcFee', type: 'uint256' },
    ],
    name: 'OtcSwap',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: false, internalType: 'uint256', name: 'lastFTime', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'latestFTime', type: 'uint256' },
      { indexed: false, internalType: 'int256', name: 'payment', type: 'int256' },
      { indexed: false, internalType: 'uint256', name: 'fees', type: 'uint256' },
    ],
    name: 'PaymentFromSettlement',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: false, internalType: 'uint64', name: 'newTakerDisc', type: 'uint64' },
      { indexed: false, internalType: 'uint64', name: 'newOtcDisc', type: 'uint64' },
    ],
    name: 'PersonalDiscRatesUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: false, internalType: 'bool', name: 'exemptCLOCheck', type: 'bool' },
    ],
    name: 'PersonalExemptCLOCheckUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: false, internalType: 'uint64', name: 'newKIM', type: 'uint64' },
      { indexed: false, internalType: 'uint64', name: 'newKMM', type: 'uint64' },
    ],
    name: 'PersonalMarginConfigUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'enum IMarketAllTypes.MarketStatus', name: 'newStatus', type: 'uint8' }],
    name: 'StatusUpdated',
    type: 'event',
  },
  {
    inputs: [
      { internalType: 'MarketAcc', name: 'userAddr', type: 'bytes26' },
      {
        components: [
          { internalType: 'OrderId[]', name: 'ids', type: 'uint64[]' },
          { internalType: 'bool', name: 'isAll', type: 'bool' },
          { internalType: 'bool', name: 'isStrict', type: 'bool' },
        ],
        internalType: 'struct CancelData',
        name: 'cancelData',
        type: 'tuple',
      },
      { internalType: 'bool', name: 'isForceCancel', type: 'bool' },
    ],
    name: 'cancel',
    outputs: [
      { internalType: 'PayFee', name: 'settle', type: 'uint256' },
      { internalType: 'OrderId[]', name: 'removedIds', type: 'uint64[]' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'descriptor',
    outputs: [
      { internalType: 'bool', name: 'isIsolatedOnly', type: 'bool' },
      { internalType: 'TokenId', name: 'tokenId', type: 'uint16' },
      { internalType: 'MarketId', name: 'marketId', type: 'uint24' },
      { internalType: 'uint32', name: 'maturity', type: 'uint32' },
      { internalType: 'uint8', name: 'tickStep', type: 'uint8' },
      { internalType: 'uint16', name: 'iTickThresh', type: 'uint16' },
      { internalType: 'uint32', name: 'latestFTime', type: 'uint32' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { internalType: 'MarketAcc', name: 'otcCounter', type: 'bytes26' },
    ],
    name: 'getBestFeeRates',
    outputs: [
      { internalType: 'uint64', name: 'takerFee', type: 'uint64' },
      { internalType: 'uint64', name: 'otcFee', type: 'uint64' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'MarketAcc', name: 'user', type: 'bytes26' }],
    name: 'getDelevLiqNonce',
    outputs: [{ internalType: 'uint24', name: '', type: 'uint24' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getImpliedRate',
    outputs: [
      { internalType: 'int128', name: 'lastTradedRate', type: 'int128' },
      { internalType: 'int128', name: 'oracleRate', type: 'int128' },
      { internalType: 'uint32', name: 'lastTradedTime', type: 'uint32' },
      { internalType: 'uint32', name: 'observationWindow', type: 'uint32' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getLatestFIndex',
    outputs: [{ internalType: 'FIndex', name: '', type: 'bytes26' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getLatestFTime',
    outputs: [{ internalType: 'uint32', name: '', type: 'uint32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getMarkRate',
    outputs: [{ internalType: 'int256', name: '', type: 'int256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'enum Side', name: 'side', type: 'uint8' },
      { internalType: 'int16', name: 'limitTick', type: 'int16' },
      { internalType: 'uint256', name: 'maxNTicks', type: 'uint256' },
    ],
    name: 'getNextNTicks',
    outputs: [
      { internalType: 'int16[]', name: 'ticks', type: 'int16[]' },
      { internalType: 'uint256[]', name: 'tickSizes', type: 'uint256[]' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'MarketAcc', name: 'liqAddr', type: 'bytes26' },
      { internalType: 'MarketAcc', name: 'vioAddr', type: 'bytes26' },
      { internalType: 'int256', name: 'sizeToLiq', type: 'int256' },
      { internalType: 'int256', name: 'vioHealthRatio', type: 'int256' },
      { internalType: 'int256', name: 'critHR', type: 'int256' },
    ],
    name: 'liquidate',
    outputs: [
      {
        components: [
          { internalType: 'bool', name: 'isStrictIMLiq', type: 'bool' },
          { internalType: 'VMResult', name: 'finalVMLiq', type: 'uint256' },
          { internalType: 'PayFee', name: 'liqSettle', type: 'uint256' },
          { internalType: 'PayFee', name: 'liqPayment', type: 'uint256' },
          { internalType: 'PayFee', name: 'vioSettle', type: 'uint256' },
          { internalType: 'PayFee', name: 'vioPayment', type: 'uint256' },
          { internalType: 'Trade', name: 'liqTrade', type: 'uint256' },
        ],
        internalType: 'struct LiqResult',
        name: 'res',
        type: 'tuple',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'MarketAcc', name: 'user', type: 'bytes26' }],
    name: 'resetDelevLiqNonce',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { internalType: 'enum GetRequest', name: 'getType', type: 'uint8' },
    ],
    name: 'settleAndGet',
    outputs: [
      { internalType: 'VMResult', name: 'res', type: 'uint256' },
      { internalType: 'PayFee', name: 'payFee', type: 'uint256' },
      { internalType: 'int256', name: 'signedSize', type: 'int256' },
      { internalType: 'uint256', name: 'nOrders', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IMarketOffViewOnly
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iMarketOffViewOnlyAbi = [
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'FIndex', name: 'newIndex', type: 'bytes26' },
      { indexed: false, internalType: 'FTag', name: 'newFTag', type: 'uint32' },
    ],
    name: 'FIndexUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'FIndex', name: 'newIndex', type: 'bytes26' },
      { indexed: false, internalType: 'FTag', name: 'newFTag', type: 'uint32' },
    ],
    name: 'FTagUpdatedOnPurge',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'uint64', name: 'newTakerFee', type: 'uint64' },
      { indexed: false, internalType: 'uint64', name: 'newOtcFee', type: 'uint64' },
    ],
    name: 'FeeRatesUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'win', type: 'bytes26' },
      { indexed: false, internalType: 'MarketAcc', name: 'lose', type: 'bytes26' },
      { indexed: false, internalType: 'Trade', name: 'delevTrade', type: 'uint256' },
    ],
    name: 'ForceDeleverage',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'uint32', name: 'newWindow', type: 'uint32' }],
    name: 'ImpliedRateObservationWindowUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'OrderId[]', name: 'orderIds', type: 'uint64[]' }],
    name: 'LimitOrderCancelled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'int16', name: 'loUpperConstBase1e4', type: 'int16' },
      { indexed: false, internalType: 'int16', name: 'loUpperSlopeBase1e4', type: 'int16' },
      { indexed: false, internalType: 'int16', name: 'loLowerConstBase1e4', type: 'int16' },
      { indexed: false, internalType: 'int16', name: 'loLowerSlopeBase1e4', type: 'int16' },
    ],
    name: 'LimitOrderConfigUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'OrderId', name: 'from', type: 'uint64' },
      { indexed: false, internalType: 'OrderId', name: 'to', type: 'uint64' },
    ],
    name: 'LimitOrderFilled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'OrderId[]', name: 'orderIds', type: 'uint64[]' }],
    name: 'LimitOrderForcedCancelled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'OrderId', name: 'orderId', type: 'uint64' },
      { indexed: false, internalType: 'uint256', name: 'filledSize', type: 'uint256' },
    ],
    name: 'LimitOrderPartiallyFilled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'maker', type: 'bytes26' },
      { indexed: false, internalType: 'OrderId[]', name: 'orderIds', type: 'uint64[]' },
      { indexed: false, internalType: 'uint256[]', name: 'sizes', type: 'uint256[]' },
    ],
    name: 'LimitOrderPlaced',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'liq', type: 'bytes26' },
      { indexed: false, internalType: 'MarketAcc', name: 'vio', type: 'bytes26' },
      { indexed: false, internalType: 'Trade', name: 'liqTrade', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'liqFee', type: 'uint256' },
    ],
    name: 'Liquidate',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        components: [
          { internalType: 'uint64', name: 'base', type: 'uint64' },
          { internalType: 'uint64', name: 'slope', type: 'uint64' },
          { internalType: 'uint64', name: 'feeRate', type: 'uint64' },
        ],
        indexed: false,
        internalType: 'struct IMarketAllTypes.LiqSettings',
        name: 'newLiqSettings',
        type: 'tuple',
      },
    ],
    name: 'LiquidationSettingsUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'uint64', name: 'newKIM', type: 'uint64' },
      { indexed: false, internalType: 'uint64', name: 'newKMM', type: 'uint64' },
      { indexed: false, internalType: 'uint64', name: 'newTThresh', type: 'uint64' },
      { indexed: false, internalType: 'uint16', name: 'newMaxRateDeviationFactorBase1e4', type: 'uint16' },
      { indexed: false, internalType: 'uint16', name: 'newClosingOrderBoundBase1e4', type: 'uint16' },
    ],
    name: 'MarginConfigUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: false, internalType: 'Trade', name: 'totalTrade', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'totalFees', type: 'uint256' },
    ],
    name: 'MarketOrdersFilled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'uint16', name: 'newMaxOpenOrders', type: 'uint16' }],
    name: 'MaxOpenOrdersUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'uint128', name: 'newHardOICap', type: 'uint128' }],
    name: 'OICapUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'OrderId', name: 'from', type: 'uint64' },
      { indexed: false, internalType: 'OrderId', name: 'to', type: 'uint64' },
    ],
    name: 'OobOrdersPurged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'address', name: 'newMarkRateOracle', type: 'address' },
      { indexed: false, internalType: 'address', name: 'newFIndexOracle', type: 'address' },
    ],
    name: 'OracleAddressesUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: false, internalType: 'MarketAcc', name: 'counterParty', type: 'bytes26' },
      { indexed: false, internalType: 'Trade', name: 'trade', type: 'uint256' },
      { indexed: false, internalType: 'int256', name: 'cashToCounter', type: 'int256' },
      { indexed: false, internalType: 'uint256', name: 'otcFee', type: 'uint256' },
    ],
    name: 'OtcSwap',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: false, internalType: 'uint256', name: 'lastFTime', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'latestFTime', type: 'uint256' },
      { indexed: false, internalType: 'int256', name: 'payment', type: 'int256' },
      { indexed: false, internalType: 'uint256', name: 'fees', type: 'uint256' },
    ],
    name: 'PaymentFromSettlement',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: false, internalType: 'uint64', name: 'newTakerDisc', type: 'uint64' },
      { indexed: false, internalType: 'uint64', name: 'newOtcDisc', type: 'uint64' },
    ],
    name: 'PersonalDiscRatesUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: false, internalType: 'bool', name: 'exemptCLOCheck', type: 'bool' },
    ],
    name: 'PersonalExemptCLOCheckUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: false, internalType: 'uint64', name: 'newKIM', type: 'uint64' },
      { indexed: false, internalType: 'uint64', name: 'newKMM', type: 'uint64' },
    ],
    name: 'PersonalMarginConfigUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'enum IMarketAllTypes.MarketStatus', name: 'newStatus', type: 'uint8' }],
    name: 'StatusUpdated',
    type: 'event',
  },
  {
    inputs: [
      { internalType: 'MarketAcc', name: 'vioAddr', type: 'bytes26' },
      { internalType: 'int256', name: 'sizeToLiq', type: 'int256' },
      { internalType: 'int256', name: 'vioHealthRatio', type: 'int256' },
    ],
    name: 'calcLiqTradeNoSettle',
    outputs: [{ internalType: 'Trade', name: 'liqTrade', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { internalType: 'enum MarginType', name: 'marginType', type: 'uint8' },
    ],
    name: 'calcMarginNoSettle',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'MarketAcc', name: 'user', type: 'bytes26' }],
    name: 'calcPositionValueNoSettle',
    outputs: [{ internalType: 'int256', name: '', type: 'int256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'MarketAcc', name: 'user', type: 'bytes26' }],
    name: 'getAllOpenOrders',
    outputs: [
      {
        components: [
          { internalType: 'enum OrderStatus', name: 'status', type: 'uint8' },
          { internalType: 'OrderId', name: 'id', type: 'uint64' },
          { internalType: 'MarketAcc', name: 'maker', type: 'bytes26' },
          { internalType: 'uint256', name: 'size', type: 'uint256' },
          { internalType: 'int256', name: 'rate', type: 'int256' },
        ],
        internalType: 'struct IMarketOffViewOnly.Order[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'MarketAcc', name: 'user', type: 'bytes26' }],
    name: 'getDiscRates',
    outputs: [
      { internalType: 'uint64', name: 'takerDisc', type: 'uint64' },
      { internalType: 'uint64', name: 'otcDisc', type: 'uint64' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'MarketAcc', name: 'user', type: 'bytes26' }],
    name: 'getExemptCLOCheck',
    outputs: [{ internalType: 'bool', name: 'exemptCLOCheck', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'MarketAcc', name: 'user', type: 'bytes26' }],
    name: 'getMarginFactor',
    outputs: [
      { internalType: 'uint64', name: 'kIM', type: 'uint64' },
      { internalType: 'uint64', name: 'kMM', type: 'uint64' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getMarkRateView',
    outputs: [{ internalType: 'int256', name: '', type: 'int256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getMarketConfig',
    outputs: [
      {
        components: [
          { internalType: 'uint16', name: 'maxOpenOrders', type: 'uint16' },
          { internalType: 'address', name: 'markRateOracle', type: 'address' },
          { internalType: 'address', name: 'fIndexOracle', type: 'address' },
          { internalType: 'uint128', name: 'hardOICap', type: 'uint128' },
          { internalType: 'uint64', name: 'takerFee', type: 'uint64' },
          { internalType: 'uint64', name: 'otcFee', type: 'uint64' },
          {
            components: [
              { internalType: 'uint64', name: 'base', type: 'uint64' },
              { internalType: 'uint64', name: 'slope', type: 'uint64' },
              { internalType: 'uint64', name: 'feeRate', type: 'uint64' },
            ],
            internalType: 'struct IMarketAllTypes.LiqSettings',
            name: 'liqSettings',
            type: 'tuple',
          },
          { internalType: 'uint64', name: 'kIM', type: 'uint64' },
          { internalType: 'uint64', name: 'kMM', type: 'uint64' },
          { internalType: 'uint32', name: 'tThresh', type: 'uint32' },
          { internalType: 'uint16', name: 'maxRateDeviationFactorBase1e4', type: 'uint16' },
          { internalType: 'uint16', name: 'closingOrderBoundBase1e4', type: 'uint16' },
          { internalType: 'int16', name: 'loUpperConstBase1e4', type: 'int16' },
          { internalType: 'int16', name: 'loUpperSlopeBase1e4', type: 'int16' },
          { internalType: 'int16', name: 'loLowerConstBase1e4', type: 'int16' },
          { internalType: 'int16', name: 'loLowerSlopeBase1e4', type: 'int16' },
          { internalType: 'enum IMarketAllTypes.MarketStatus', name: 'status', type: 'uint8' },
          { internalType: 'bool', name: 'useImpliedAsMarkRate', type: 'bool' },
        ],
        internalType: 'struct IMarketAllTypes.MarketConfigStruct',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getOI',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'OrderId', name: 'id', type: 'uint64' }],
    name: 'getOrder',
    outputs: [
      {
        components: [
          { internalType: 'enum OrderStatus', name: 'status', type: 'uint8' },
          { internalType: 'OrderId', name: 'id', type: 'uint64' },
          { internalType: 'MarketAcc', name: 'maker', type: 'bytes26' },
          { internalType: 'uint256', name: 'size', type: 'uint256' },
          { internalType: 'int256', name: 'rate', type: 'int256' },
        ],
        internalType: 'struct IMarketOffViewOnly.Order',
        name: 'order',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'MarketAcc', name: 'user', type: 'bytes26' }],
    name: 'getPendingSizes',
    outputs: [
      { internalType: 'uint256', name: 'pendingLongSize', type: 'uint256' },
      { internalType: 'uint256', name: 'pendingShortSize', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'MarketAcc', name: 'user', type: 'bytes26' }],
    name: 'getSignedSizeNoSettle',
    outputs: [{ internalType: 'int256', name: '', type: 'int256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'enum Side', name: 'side', type: 'uint8' },
      { internalType: 'int16', name: 'fromTick', type: 'int16' },
      { internalType: 'int16', name: 'toTick', type: 'int16' },
    ],
    name: 'getTickSumSize',
    outputs: [{ internalType: 'uint256[]', name: 'sizes', type: 'uint256[]' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'marketHub',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'name',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IMulticall3
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iMulticall3Abi = [
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'target', type: 'address' },
          { internalType: 'bytes', name: 'callData', type: 'bytes' },
        ],
        internalType: 'struct IMulticall3.Call[]',
        name: 'calls',
        type: 'tuple[]',
      },
    ],
    name: 'aggregate',
    outputs: [
      { internalType: 'uint256', name: 'blockNumber', type: 'uint256' },
      { internalType: 'bytes[]', name: 'returnData', type: 'bytes[]' },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'target', type: 'address' },
          { internalType: 'bool', name: 'allowFailure', type: 'bool' },
          { internalType: 'bytes', name: 'callData', type: 'bytes' },
        ],
        internalType: 'struct IMulticall3.Call3[]',
        name: 'calls',
        type: 'tuple[]',
      },
    ],
    name: 'aggregate3',
    outputs: [
      {
        components: [
          { internalType: 'bool', name: 'success', type: 'bool' },
          { internalType: 'bytes', name: 'returnData', type: 'bytes' },
        ],
        internalType: 'struct IMulticall3.Result[]',
        name: 'returnData',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'target', type: 'address' },
          { internalType: 'bool', name: 'allowFailure', type: 'bool' },
          { internalType: 'uint256', name: 'value', type: 'uint256' },
          { internalType: 'bytes', name: 'callData', type: 'bytes' },
        ],
        internalType: 'struct IMulticall3.Call3Value[]',
        name: 'calls',
        type: 'tuple[]',
      },
    ],
    name: 'aggregate3Value',
    outputs: [
      {
        components: [
          { internalType: 'bool', name: 'success', type: 'bool' },
          { internalType: 'bytes', name: 'returnData', type: 'bytes' },
        ],
        internalType: 'struct IMulticall3.Result[]',
        name: 'returnData',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'target', type: 'address' },
          { internalType: 'bytes', name: 'callData', type: 'bytes' },
        ],
        internalType: 'struct IMulticall3.Call[]',
        name: 'calls',
        type: 'tuple[]',
      },
    ],
    name: 'blockAndAggregate',
    outputs: [
      { internalType: 'uint256', name: 'blockNumber', type: 'uint256' },
      { internalType: 'bytes32', name: 'blockHash', type: 'bytes32' },
      {
        components: [
          { internalType: 'bool', name: 'success', type: 'bool' },
          { internalType: 'bytes', name: 'returnData', type: 'bytes' },
        ],
        internalType: 'struct IMulticall3.Result[]',
        name: 'returnData',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getBasefee',
    outputs: [{ internalType: 'uint256', name: 'basefee', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'blockNumber', type: 'uint256' }],
    name: 'getBlockHash',
    outputs: [{ internalType: 'bytes32', name: 'blockHash', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getBlockNumber',
    outputs: [{ internalType: 'uint256', name: 'blockNumber', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getChainId',
    outputs: [{ internalType: 'uint256', name: 'chainid', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getCurrentBlockCoinbase',
    outputs: [{ internalType: 'address', name: 'coinbase', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getCurrentBlockDifficulty',
    outputs: [{ internalType: 'uint256', name: 'difficulty', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getCurrentBlockGasLimit',
    outputs: [{ internalType: 'uint256', name: 'gaslimit', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getCurrentBlockTimestamp',
    outputs: [{ internalType: 'uint256', name: 'timestamp', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'addr', type: 'address' }],
    name: 'getEthBalance',
    outputs: [{ internalType: 'uint256', name: 'balance', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getLastBlockHash',
    outputs: [{ internalType: 'bytes32', name: 'blockHash', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'bool', name: 'requireSuccess', type: 'bool' },
      {
        components: [
          { internalType: 'address', name: 'target', type: 'address' },
          { internalType: 'bytes', name: 'callData', type: 'bytes' },
        ],
        internalType: 'struct IMulticall3.Call[]',
        name: 'calls',
        type: 'tuple[]',
      },
    ],
    name: 'tryAggregate',
    outputs: [
      {
        components: [
          { internalType: 'bool', name: 'success', type: 'bool' },
          { internalType: 'bytes', name: 'returnData', type: 'bytes' },
        ],
        internalType: 'struct IMulticall3.Result[]',
        name: 'returnData',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'bool', name: 'requireSuccess', type: 'bool' },
      {
        components: [
          { internalType: 'address', name: 'target', type: 'address' },
          { internalType: 'bytes', name: 'callData', type: 'bytes' },
        ],
        internalType: 'struct IMulticall3.Call[]',
        name: 'calls',
        type: 'tuple[]',
      },
    ],
    name: 'tryBlockAndAggregate',
    outputs: [
      { internalType: 'uint256', name: 'blockNumber', type: 'uint256' },
      { internalType: 'bytes32', name: 'blockHash', type: 'bytes32' },
      {
        components: [
          { internalType: 'bool', name: 'success', type: 'bool' },
          { internalType: 'bytes', name: 'returnData', type: 'bytes' },
        ],
        internalType: 'struct IMulticall3.Result[]',
        name: 'returnData',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IExplorer
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iExplorerAbi = [
  {
    inputs: [],
    name: 'MARKET_HUB',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'ROUTER',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'MarketId', name: 'marketId', type: 'uint24' }],
    name: 'getMarketInfo',
    outputs: [
      {
        components: [
          { internalType: 'string', name: 'name', type: 'string' },
          { internalType: 'string', name: 'symbol', type: 'string' },
          { internalType: 'bool', name: 'isIsolatedOnly', type: 'bool' },
          { internalType: 'TokenId', name: 'tokenId', type: 'uint16' },
          { internalType: 'MarketId', name: 'marketId', type: 'uint24' },
          { internalType: 'uint32', name: 'maturity', type: 'uint32' },
          { internalType: 'uint8', name: 'tickStep', type: 'uint8' },
          { internalType: 'uint16', name: 'iTickThresh', type: 'uint16' },
          { internalType: 'bool', name: 'isMatured', type: 'bool' },
          { internalType: 'int256', name: 'impliedApr', type: 'int256' },
          { internalType: 'int256', name: 'markApr', type: 'int256' },
          { internalType: 'int256', name: 'underlyingApr', type: 'int256' },
          { internalType: 'uint32', name: 'nextSettleTime', type: 'uint32' },
        ],
        internalType: 'struct IExplorer.MarketInfo',
        name: 'info',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'MarketId', name: 'marketId', type: 'uint24' },
      { internalType: 'enum Side', name: 'side', type: 'uint8' },
      { internalType: 'int16', name: 'from', type: 'int16' },
      { internalType: 'int16', name: 'to', type: 'int16' },
    ],
    name: 'getMarketOrderBook',
    outputs: [{ internalType: 'uint256[]', name: 'size', type: 'uint256[]' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'MarketAcc', name: 'user', type: 'bytes26' }],
    name: 'getUserInfo',
    outputs: [
      {
        components: [
          { internalType: 'int256', name: 'totalCash', type: 'int256' },
          {
            components: [
              { internalType: 'MarketId', name: 'marketId', type: 'uint24' },
              { internalType: 'int256', name: 'signedSize', type: 'int256' },
              { internalType: 'int256', name: 'positionValue', type: 'int256' },
              { internalType: 'int256', name: 'liquidationApr', type: 'int256' },
              { internalType: 'uint256', name: 'initialMargin', type: 'uint256' },
              { internalType: 'uint256', name: 'maintMargin', type: 'uint256' },
              {
                components: [
                  { internalType: 'enum OrderStatus', name: 'status', type: 'uint8' },
                  { internalType: 'OrderId', name: 'id', type: 'uint64' },
                  { internalType: 'MarketAcc', name: 'maker', type: 'bytes26' },
                  { internalType: 'uint256', name: 'size', type: 'uint256' },
                  { internalType: 'int256', name: 'rate', type: 'int256' },
                ],
                internalType: 'struct IMarketOffViewOnly.Order[]',
                name: 'orders',
                type: 'tuple[]',
              },
            ],
            internalType: 'struct IExplorer.PositionInfo[]',
            name: 'positions',
            type: 'tuple[]',
          },
          { internalType: 'int256', name: 'availableInitialMargin', type: 'int256' },
          { internalType: 'int256', name: 'availableMaintMargin', type: 'int256' },
        ],
        internalType: 'struct IExplorer.UserInfo',
        name: 'userInfo',
        type: 'tuple',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { internalType: 'MarketId', name: 'marketId', type: 'uint24' },
      { internalType: 'bool', name: 'cancelAll', type: 'bool' },
      { internalType: 'OrderId[]', name: 'orderIds', type: 'uint64[]' },
    ],
    name: 'getUserInfoAfterBulkCancels',
    outputs: [
      {
        components: [
          { internalType: 'int256', name: 'totalCash', type: 'int256' },
          {
            components: [
              { internalType: 'MarketId', name: 'marketId', type: 'uint24' },
              { internalType: 'int256', name: 'signedSize', type: 'int256' },
              { internalType: 'int256', name: 'positionValue', type: 'int256' },
              { internalType: 'int256', name: 'liquidationApr', type: 'int256' },
              { internalType: 'uint256', name: 'initialMargin', type: 'uint256' },
              { internalType: 'uint256', name: 'maintMargin', type: 'uint256' },
              {
                components: [
                  { internalType: 'enum OrderStatus', name: 'status', type: 'uint8' },
                  { internalType: 'OrderId', name: 'id', type: 'uint64' },
                  { internalType: 'MarketAcc', name: 'maker', type: 'bytes26' },
                  { internalType: 'uint256', name: 'size', type: 'uint256' },
                  { internalType: 'int256', name: 'rate', type: 'int256' },
                ],
                internalType: 'struct IMarketOffViewOnly.Order[]',
                name: 'orders',
                type: 'tuple[]',
              },
            ],
            internalType: 'struct IExplorer.PositionInfo[]',
            name: 'positions',
            type: 'tuple[]',
          },
          { internalType: 'int256', name: 'availableInitialMargin', type: 'int256' },
          { internalType: 'int256', name: 'availableMaintMargin', type: 'int256' },
        ],
        internalType: 'struct IExplorer.UserInfo',
        name: 'preUserInfo',
        type: 'tuple',
      },
      {
        components: [
          { internalType: 'int256', name: 'totalCash', type: 'int256' },
          {
            components: [
              { internalType: 'MarketId', name: 'marketId', type: 'uint24' },
              { internalType: 'int256', name: 'signedSize', type: 'int256' },
              { internalType: 'int256', name: 'positionValue', type: 'int256' },
              { internalType: 'int256', name: 'liquidationApr', type: 'int256' },
              { internalType: 'uint256', name: 'initialMargin', type: 'uint256' },
              { internalType: 'uint256', name: 'maintMargin', type: 'uint256' },
              {
                components: [
                  { internalType: 'enum OrderStatus', name: 'status', type: 'uint8' },
                  { internalType: 'OrderId', name: 'id', type: 'uint64' },
                  { internalType: 'MarketAcc', name: 'maker', type: 'bytes26' },
                  { internalType: 'uint256', name: 'size', type: 'uint256' },
                  { internalType: 'int256', name: 'rate', type: 'int256' },
                ],
                internalType: 'struct IMarketOffViewOnly.Order[]',
                name: 'orders',
                type: 'tuple[]',
              },
            ],
            internalType: 'struct IExplorer.PositionInfo[]',
            name: 'positions',
            type: 'tuple[]',
          },
          { internalType: 'int256', name: 'availableInitialMargin', type: 'int256' },
          { internalType: 'int256', name: 'availableMaintMargin', type: 'int256' },
        ],
        internalType: 'struct IExplorer.UserInfo',
        name: 'postUserInfo',
        type: 'tuple',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { internalType: 'MarketId', name: 'marketId', type: 'uint24' },
      { internalType: 'AMMId', name: 'ammId', type: 'uint24' },
      { internalType: 'enum Side', name: 'side', type: 'uint8' },
      { internalType: 'enum TimeInForce', name: 'tif', type: 'uint8' },
      { internalType: 'uint256', name: 'size', type: 'uint256' },
      { internalType: 'int16', name: 'tick', type: 'int16' },
      { internalType: 'int128', name: 'desiredMatchRate', type: 'int128' },
    ],
    name: 'getUserInfoAfterPlaceOrder',
    outputs: [
      {
        components: [
          { internalType: 'int256', name: 'totalCash', type: 'int256' },
          {
            components: [
              { internalType: 'MarketId', name: 'marketId', type: 'uint24' },
              { internalType: 'int256', name: 'signedSize', type: 'int256' },
              { internalType: 'int256', name: 'positionValue', type: 'int256' },
              { internalType: 'int256', name: 'liquidationApr', type: 'int256' },
              { internalType: 'uint256', name: 'initialMargin', type: 'uint256' },
              { internalType: 'uint256', name: 'maintMargin', type: 'uint256' },
              {
                components: [
                  { internalType: 'enum OrderStatus', name: 'status', type: 'uint8' },
                  { internalType: 'OrderId', name: 'id', type: 'uint64' },
                  { internalType: 'MarketAcc', name: 'maker', type: 'bytes26' },
                  { internalType: 'uint256', name: 'size', type: 'uint256' },
                  { internalType: 'int256', name: 'rate', type: 'int256' },
                ],
                internalType: 'struct IMarketOffViewOnly.Order[]',
                name: 'orders',
                type: 'tuple[]',
              },
            ],
            internalType: 'struct IExplorer.PositionInfo[]',
            name: 'positions',
            type: 'tuple[]',
          },
          { internalType: 'int256', name: 'availableInitialMargin', type: 'int256' },
          { internalType: 'int256', name: 'availableMaintMargin', type: 'int256' },
        ],
        internalType: 'struct IExplorer.UserInfo',
        name: 'preUserInfo',
        type: 'tuple',
      },
      {
        components: [
          { internalType: 'int256', name: 'totalCash', type: 'int256' },
          {
            components: [
              { internalType: 'MarketId', name: 'marketId', type: 'uint24' },
              { internalType: 'int256', name: 'signedSize', type: 'int256' },
              { internalType: 'int256', name: 'positionValue', type: 'int256' },
              { internalType: 'int256', name: 'liquidationApr', type: 'int256' },
              { internalType: 'uint256', name: 'initialMargin', type: 'uint256' },
              { internalType: 'uint256', name: 'maintMargin', type: 'uint256' },
              {
                components: [
                  { internalType: 'enum OrderStatus', name: 'status', type: 'uint8' },
                  { internalType: 'OrderId', name: 'id', type: 'uint64' },
                  { internalType: 'MarketAcc', name: 'maker', type: 'bytes26' },
                  { internalType: 'uint256', name: 'size', type: 'uint256' },
                  { internalType: 'int256', name: 'rate', type: 'int256' },
                ],
                internalType: 'struct IMarketOffViewOnly.Order[]',
                name: 'orders',
                type: 'tuple[]',
              },
            ],
            internalType: 'struct IExplorer.PositionInfo[]',
            name: 'positions',
            type: 'tuple[]',
          },
          { internalType: 'int256', name: 'availableInitialMargin', type: 'int256' },
          { internalType: 'int256', name: 'availableMaintMargin', type: 'int256' },
        ],
        internalType: 'struct IExplorer.UserInfo',
        name: 'postUserInfo',
        type: 'tuple',
      },
      { internalType: 'Trade', name: 'matched', type: 'uint256' },
      { internalType: 'uint256', name: 'marginRequired', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IMarkRateOracle
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iMarkRateOracleAbi = [
  {
    inputs: [],
    name: 'getMarkRate',
    outputs: [{ internalType: 'int256', name: '', type: 'int256' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ITradeModule
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iTradeModuleAbi = [
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: true, internalType: 'AMMId', name: 'ammId', type: 'uint24' },
      { indexed: false, internalType: 'int256', name: 'exactSizeIn', type: 'int256' },
      { indexed: false, internalType: 'uint256', name: 'netLpOut', type: 'uint256' },
      { indexed: false, internalType: 'int256', name: 'netCashIn', type: 'int256' },
      { indexed: false, internalType: 'uint256', name: 'netOtcFee', type: 'uint256' },
    ],
    name: 'AddLiquidityDualToAmm',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: true, internalType: 'AMMId', name: 'ammId', type: 'uint24' },
      { indexed: false, internalType: 'uint256', name: 'netLpOut', type: 'uint256' },
      { indexed: false, internalType: 'int256', name: 'netCashIn', type: 'int256' },
      { indexed: false, internalType: 'uint256', name: 'totalTakerOtcFee', type: 'uint256' },
      { indexed: false, internalType: 'int256', name: 'swapSizeInterm', type: 'int256' },
    ],
    name: 'AddLiquiditySingleCashToAmm',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'Account', name: 'account', type: 'bytes21' },
      { indexed: true, internalType: 'address', name: 'agent', type: 'address' },
      { indexed: true, internalType: 'uint64', name: 'expiry', type: 'uint64' },
    ],
    name: 'AgentApproved',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'Account', name: 'account', type: 'bytes21' },
      { indexed: true, internalType: 'address', name: 'agent', type: 'address' },
    ],
    name: 'AgentRevoked',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: true, internalType: 'MarketId', name: 'marketId', type: 'uint24' },
      { indexed: false, internalType: 'enum TimeInForce', name: 'tif', type: 'uint8' },
      { indexed: false, internalType: 'Trade', name: 'matched', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'takerFee', type: 'uint256' },
    ],
    name: 'BulkOrdersExecuted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'Account', name: 'account', type: 'bytes21' },
      { indexed: true, internalType: 'address', name: 'newAccManager', type: 'address' },
    ],
    name: 'NewAccManagerSet',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: true, internalType: 'AMMId', name: 'ammId', type: 'uint24' },
      { indexed: false, internalType: 'uint256', name: 'lpToRemove', type: 'uint256' },
      { indexed: false, internalType: 'int256', name: 'netCashOut', type: 'int256' },
      { indexed: false, internalType: 'int256', name: 'netSizeOut', type: 'int256' },
      { indexed: false, internalType: 'uint256', name: 'netOtcFee', type: 'uint256' },
    ],
    name: 'RemoveLiquidityDualFromAmm',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: true, internalType: 'AMMId', name: 'ammId', type: 'uint24' },
      { indexed: false, internalType: 'uint256', name: 'lpToRemove', type: 'uint256' },
      { indexed: false, internalType: 'int256', name: 'netCashOut', type: 'int256' },
      { indexed: false, internalType: 'uint256', name: 'netTakerOtcFee', type: 'uint256' },
      { indexed: false, internalType: 'int256', name: 'netSizeInterm', type: 'int256' },
    ],
    name: 'RemoveLiquiditySingleCashFromAmm',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: true, internalType: 'MarketId', name: 'marketId', type: 'uint24' },
      { indexed: true, internalType: 'AMMId', name: 'ammId', type: 'uint24' },
      { indexed: false, internalType: 'enum TimeInForce', name: 'tif', type: 'uint8' },
      { indexed: false, internalType: 'Trade', name: 'matched', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'takerOtcFee', type: 'uint256' },
    ],
    name: 'SingleOrderExecuted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: true, internalType: 'MarketId', name: 'marketId', type: 'uint24' },
      { indexed: true, internalType: 'AMMId', name: 'ammId', type: 'uint24' },
      { indexed: false, internalType: 'Trade', name: 'matched', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'otcFee', type: 'uint256' },
    ],
    name: 'SwapWithAmm',
    type: 'event',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'bool', name: 'cross', type: 'bool' },
          { internalType: 'MarketId', name: 'marketId', type: 'uint24' },
          { internalType: 'bool', name: 'cancelAll', type: 'bool' },
          { internalType: 'OrderId[]', name: 'orderIds', type: 'uint64[]' },
        ],
        internalType: 'struct IRouterEventsAndTypes.BulkCancels',
        name: 'req',
        type: 'tuple',
      },
    ],
    name: 'bulkCancels',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'bool', name: 'cross', type: 'bool' },
          {
            components: [
              { internalType: 'MarketId', name: 'marketId', type: 'uint24' },
              {
                components: [
                  { internalType: 'enum TimeInForce', name: 'tif', type: 'uint8' },
                  { internalType: 'enum Side', name: 'side', type: 'uint8' },
                  { internalType: 'uint256[]', name: 'sizes', type: 'uint256[]' },
                  { internalType: 'int16[]', name: 'limitTicks', type: 'int16[]' },
                ],
                internalType: 'struct LongShort',
                name: 'orders',
                type: 'tuple',
              },
              {
                components: [
                  { internalType: 'OrderId[]', name: 'ids', type: 'uint64[]' },
                  { internalType: 'bool', name: 'isAll', type: 'bool' },
                  { internalType: 'bool', name: 'isStrict', type: 'bool' },
                ],
                internalType: 'struct CancelData',
                name: 'cancelData',
                type: 'tuple',
              },
            ],
            internalType: 'struct BulkOrder[]',
            name: 'bulks',
            type: 'tuple[]',
          },
          { internalType: 'int128[]', name: 'desiredMatchRates', type: 'int128[]' },
        ],
        internalType: 'struct IRouterEventsAndTypes.BulkOrdersReq',
        name: 'req',
        type: 'tuple',
      },
    ],
    name: 'bulkOrders',
    outputs: [
      {
        components: [
          { internalType: 'Trade', name: 'matched', type: 'uint256' },
          { internalType: 'uint256', name: 'takerFee', type: 'uint256' },
        ],
        internalType: 'struct BulkOrderResult[]',
        name: 'results',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'TokenId', name: 'tokenId', type: 'uint16' }],
    name: 'cancelVaultWithdrawal',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'MarketId', name: 'marketId', type: 'uint24' },
          { internalType: 'int256', name: 'signedAmount', type: 'int256' },
        ],
        internalType: 'struct IRouterEventsAndTypes.CashTransferReq',
        name: 'transfer',
        type: 'tuple',
      },
    ],
    name: 'cashTransfer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'bool', name: 'cross', type: 'bool' },
          { internalType: 'bool', name: 'isEnter', type: 'bool' },
          { internalType: 'MarketId[]', name: 'marketIds', type: 'uint24[]' },
        ],
        internalType: 'struct IRouterEventsAndTypes.EnterExitMarketsReq',
        name: 'req',
        type: 'tuple',
      },
    ],
    name: 'enterExitMarkets',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'user', type: 'address' },
      { internalType: 'TokenId', name: 'tokenId', type: 'uint16' },
    ],
    name: 'finalizeVaultWithdrawal',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'bool', name: 'cross', type: 'bool' },
          { internalType: 'MarketId', name: 'marketId', type: 'uint24' },
          { internalType: 'uint256', name: 'amount', type: 'uint256' },
        ],
        internalType: 'struct IRouterEventsAndTypes.PayTreasuryReq',
        name: 'req',
        type: 'tuple',
      },
    ],
    name: 'payTreasury',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              { internalType: 'bool', name: 'cross', type: 'bool' },
              { internalType: 'MarketId', name: 'marketId', type: 'uint24' },
              { internalType: 'AMMId', name: 'ammId', type: 'uint24' },
              { internalType: 'enum Side', name: 'side', type: 'uint8' },
              { internalType: 'enum TimeInForce', name: 'tif', type: 'uint8' },
              { internalType: 'uint256', name: 'size', type: 'uint256' },
              { internalType: 'int16', name: 'tick', type: 'int16' },
            ],
            internalType: 'struct IRouterEventsAndTypes.Order',
            name: 'order',
            type: 'tuple',
          },
          { internalType: 'bool', name: 'enterMarket', type: 'bool' },
          { internalType: 'OrderId', name: 'idToStrictCancel', type: 'uint64' },
          { internalType: 'bool', name: 'exitMarket', type: 'bool' },
          { internalType: 'uint256', name: 'isolated_cashIn', type: 'uint256' },
          { internalType: 'bool', name: 'isolated_cashTransferAll', type: 'bool' },
          { internalType: 'int128', name: 'desiredMatchRate', type: 'int128' },
        ],
        internalType: 'struct IRouterEventsAndTypes.SingleOrderReq',
        name: 'req',
        type: 'tuple',
      },
    ],
    name: 'placeSingleOrder',
    outputs: [
      { internalType: 'Trade', name: 'matched', type: 'uint256' },
      { internalType: 'uint256', name: 'takerOtcFee', type: 'uint256' },
      { internalType: 'int256', name: 'cashWithdrawn', type: 'int256' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'TokenId', name: 'tokenId', type: 'uint16' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'requestVaultWithdrawal',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint8', name: 'accountId', type: 'uint8' },
      { internalType: 'TokenId', name: 'tokenId', type: 'uint16' },
      { internalType: 'MarketId', name: 'marketId', type: 'uint24' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
      { internalType: 'bool', name: 'isDeposit', type: 'bool' },
    ],
    name: 'subaccountTransfer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint8', name: 'accountId', type: 'uint8' },
      { internalType: 'TokenId', name: 'tokenId', type: 'uint16' },
      { internalType: 'MarketId', name: 'marketId', type: 'uint24' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'vaultDeposit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'TokenId', name: 'tokenId', type: 'uint16' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'vaultPayTreasury',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IAuthModule
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iAuthModuleAbi = [
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: true, internalType: 'AMMId', name: 'ammId', type: 'uint24' },
      { indexed: false, internalType: 'int256', name: 'exactSizeIn', type: 'int256' },
      { indexed: false, internalType: 'uint256', name: 'netLpOut', type: 'uint256' },
      { indexed: false, internalType: 'int256', name: 'netCashIn', type: 'int256' },
      { indexed: false, internalType: 'uint256', name: 'netOtcFee', type: 'uint256' },
    ],
    name: 'AddLiquidityDualToAmm',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: true, internalType: 'AMMId', name: 'ammId', type: 'uint24' },
      { indexed: false, internalType: 'uint256', name: 'netLpOut', type: 'uint256' },
      { indexed: false, internalType: 'int256', name: 'netCashIn', type: 'int256' },
      { indexed: false, internalType: 'uint256', name: 'totalTakerOtcFee', type: 'uint256' },
      { indexed: false, internalType: 'int256', name: 'swapSizeInterm', type: 'int256' },
    ],
    name: 'AddLiquiditySingleCashToAmm',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'Account', name: 'account', type: 'bytes21' },
      { indexed: true, internalType: 'address', name: 'agent', type: 'address' },
      { indexed: true, internalType: 'uint64', name: 'expiry', type: 'uint64' },
    ],
    name: 'AgentApproved',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'Account', name: 'account', type: 'bytes21' },
      { indexed: true, internalType: 'address', name: 'agent', type: 'address' },
    ],
    name: 'AgentRevoked',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: true, internalType: 'MarketId', name: 'marketId', type: 'uint24' },
      { indexed: false, internalType: 'enum TimeInForce', name: 'tif', type: 'uint8' },
      { indexed: false, internalType: 'Trade', name: 'matched', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'takerFee', type: 'uint256' },
    ],
    name: 'BulkOrdersExecuted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'Account', name: 'account', type: 'bytes21' },
      { indexed: true, internalType: 'address', name: 'newAccManager', type: 'address' },
    ],
    name: 'NewAccManagerSet',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: true, internalType: 'AMMId', name: 'ammId', type: 'uint24' },
      { indexed: false, internalType: 'uint256', name: 'lpToRemove', type: 'uint256' },
      { indexed: false, internalType: 'int256', name: 'netCashOut', type: 'int256' },
      { indexed: false, internalType: 'int256', name: 'netSizeOut', type: 'int256' },
      { indexed: false, internalType: 'uint256', name: 'netOtcFee', type: 'uint256' },
    ],
    name: 'RemoveLiquidityDualFromAmm',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: true, internalType: 'AMMId', name: 'ammId', type: 'uint24' },
      { indexed: false, internalType: 'uint256', name: 'lpToRemove', type: 'uint256' },
      { indexed: false, internalType: 'int256', name: 'netCashOut', type: 'int256' },
      { indexed: false, internalType: 'uint256', name: 'netTakerOtcFee', type: 'uint256' },
      { indexed: false, internalType: 'int256', name: 'netSizeInterm', type: 'int256' },
    ],
    name: 'RemoveLiquiditySingleCashFromAmm',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: true, internalType: 'MarketId', name: 'marketId', type: 'uint24' },
      { indexed: true, internalType: 'AMMId', name: 'ammId', type: 'uint24' },
      { indexed: false, internalType: 'enum TimeInForce', name: 'tif', type: 'uint8' },
      { indexed: false, internalType: 'Trade', name: 'matched', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'takerOtcFee', type: 'uint256' },
    ],
    name: 'SingleOrderExecuted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: true, internalType: 'MarketId', name: 'marketId', type: 'uint24' },
      { indexed: true, internalType: 'AMMId', name: 'ammId', type: 'uint24' },
      { indexed: false, internalType: 'Trade', name: 'matched', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'otcFee', type: 'uint256' },
    ],
    name: 'SwapWithAmm',
    type: 'event',
  },
  {
    inputs: [{ internalType: 'Account', name: 'acc', type: 'bytes21' }],
    name: 'accountManager',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'agent', type: 'address' },
      {
        components: [
          { internalType: 'Account', name: 'account', type: 'bytes21' },
          { internalType: 'bytes32', name: 'connectionId', type: 'bytes32' },
          { internalType: 'uint64', name: 'nonce', type: 'uint64' },
        ],
        internalType: 'struct IRouterEventsAndTypes.PendleSignTx',
        name: 'message',
        type: 'tuple',
      },
      { internalType: 'bytes', name: 'signature', type: 'bytes' },
      { internalType: 'bytes', name: 'callData', type: 'bytes' },
    ],
    name: 'agentExecute',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'Account', name: 'acc', type: 'bytes21' },
      { internalType: 'address', name: 'agent', type: 'address' },
    ],
    name: 'agentExpiry',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'root', type: 'address' },
          { internalType: 'uint8', name: 'accountId', type: 'uint8' },
          { internalType: 'address', name: 'agent', type: 'address' },
          { internalType: 'uint64', name: 'expiry', type: 'uint64' },
          { internalType: 'uint64', name: 'nonce', type: 'uint64' },
        ],
        internalType: 'struct IRouterEventsAndTypes.ApproveAgentMessage',
        name: 'data',
        type: 'tuple',
      },
      { internalType: 'bytes', name: 'signature', type: 'bytes' },
    ],
    name: 'approveAgent',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'root', type: 'address' },
          { internalType: 'TokenId', name: 'tokenId', type: 'uint16' },
          { internalType: 'uint64', name: 'nonce', type: 'uint64' },
        ],
        internalType: 'struct IRouterEventsAndTypes.CancelVaultWithdrawalMessage',
        name: 'message',
        type: 'tuple',
      },
      { internalType: 'bytes', name: 'signature', type: 'bytes' },
    ],
    name: 'cancelVaultWithdrawal',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'root', type: 'address' },
          { internalType: 'TokenId', name: 'tokenId', type: 'uint16' },
          { internalType: 'uint256', name: 'amount', type: 'uint256' },
          { internalType: 'uint64', name: 'nonce', type: 'uint64' },
        ],
        internalType: 'struct IRouterEventsAndTypes.RequestVaultWithdrawalMessage',
        name: 'message',
        type: 'tuple',
      },
      { internalType: 'bytes', name: 'signature', type: 'bytes' },
    ],
    name: 'requestVaultWithdrawal',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'root', type: 'address' },
          { internalType: 'uint8', name: 'accountId', type: 'uint8' },
          { internalType: 'address[]', name: 'agents', type: 'address[]' },
          { internalType: 'uint64', name: 'nonce', type: 'uint64' },
        ],
        internalType: 'struct IRouterEventsAndTypes.RevokeAgentsMessage',
        name: 'data',
        type: 'tuple',
      },
      { internalType: 'bytes', name: 'signature', type: 'bytes' },
    ],
    name: 'revokeAgent',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'root', type: 'address' },
          { internalType: 'uint8', name: 'accountId', type: 'uint8' },
          { internalType: 'address', name: 'accManager', type: 'address' },
          { internalType: 'uint64', name: 'nonce', type: 'uint64' },
        ],
        internalType: 'struct IRouterEventsAndTypes.SetAccManagerMessage',
        name: 'data',
        type: 'tuple',
      },
      { internalType: 'bytes', name: 'signature', type: 'bytes' },
    ],
    name: 'setAccManager',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'signer', type: 'address' }],
    name: 'signerNonce',
    outputs: [{ internalType: 'uint64', name: '', type: 'uint64' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'root', type: 'address' },
          { internalType: 'uint8', name: 'accountId', type: 'uint8' },
          { internalType: 'TokenId', name: 'tokenId', type: 'uint16' },
          { internalType: 'MarketId', name: 'marketId', type: 'uint24' },
          { internalType: 'uint256', name: 'amount', type: 'uint256' },
          { internalType: 'bool', name: 'isDeposit', type: 'bool' },
          { internalType: 'uint64', name: 'nonce', type: 'uint64' },
        ],
        internalType: 'struct IRouterEventsAndTypes.SubaccountTransferMessage',
        name: 'message',
        type: 'tuple',
      },
      { internalType: 'bytes', name: 'signature', type: 'bytes' },
    ],
    name: 'subaccountTransfer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'Account[]', name: 'accounts', type: 'bytes21[]' },
      { internalType: 'address[]', name: 'agents', type: 'address[]' },
    ],
    name: 'systemRevokeAgent',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'root', type: 'address' },
          { internalType: 'uint8', name: 'accountId', type: 'uint8' },
          { internalType: 'TokenId', name: 'tokenId', type: 'uint16' },
          { internalType: 'MarketId', name: 'marketId', type: 'uint24' },
          { internalType: 'uint256', name: 'amount', type: 'uint256' },
          { internalType: 'uint64', name: 'nonce', type: 'uint64' },
        ],
        internalType: 'struct IRouterEventsAndTypes.VaultDepositMessage',
        name: 'message',
        type: 'tuple',
      },
      { internalType: 'bytes', name: 'signature', type: 'bytes' },
    ],
    name: 'vaultDeposit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'root', type: 'address' },
          { internalType: 'TokenId', name: 'tokenId', type: 'uint16' },
          { internalType: 'uint256', name: 'amount', type: 'uint256' },
          { internalType: 'uint64', name: 'nonce', type: 'uint64' },
        ],
        internalType: 'struct IRouterEventsAndTypes.VaultPayTreasuryMessage',
        name: 'message',
        type: 'tuple',
      },
      { internalType: 'bytes', name: 'signature', type: 'bytes' },
    ],
    name: 'vaultPayTreasury',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IFIndexOracle
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iFIndexOracleAbi = [
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'uint64', name: 'newSettleFeeRate', type: 'uint64' },
      { indexed: false, internalType: 'uint32', name: 'newUpdatePeriod', type: 'uint32' },
      { indexed: false, internalType: 'uint32', name: 'newMaxUpdateDelay', type: 'uint32' },
    ],
    name: 'ConfigUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'address', name: 'newKeeper', type: 'address' }],
    name: 'KeeperUpdated',
    type: 'event',
  },
  {
    inputs: [],
    name: 'getConfig',
    outputs: [
      { internalType: 'uint64', name: 'settleFeeRate', type: 'uint64' },
      { internalType: 'uint32', name: 'updatePeriod', type: 'uint32' },
      { internalType: 'uint32', name: 'maxUpdateDelay', type: 'uint32' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getLatestFIndex',
    outputs: [{ internalType: 'FIndex', name: '', type: 'bytes26' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'isDueForUpdateNow',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'latestAnnualizedRate',
    outputs: [{ internalType: 'int256', name: 'rate', type: 'int256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'market',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'maturity',
    outputs: [{ internalType: 'uint32', name: '', type: 'uint32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'nextFIndexUpdateTime',
    outputs: [{ internalType: 'uint32', name: '', type: 'uint32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint64', name: 'settleFeeRate', type: 'uint64' },
      { internalType: 'uint32', name: 'updatePeriod', type: 'uint32' },
      { internalType: 'uint32', name: 'maxFUpdateDelay', type: 'uint32' },
    ],
    name: 'setConfig',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'keeper', type: 'address' }],
    name: 'setKeeper',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'int112', name: 'floatingIndexDelta', type: 'int112' },
      { internalType: 'uint32', name: 'desiredTimestamp', type: 'uint32' },
    ],
    name: 'updateFloatingRate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IAMM
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iAMMAbi = [
  {
    inputs: [
      { internalType: 'MarketAcc', name: 'account', type: 'bytes26' },
      { internalType: 'uint256', name: 'balance', type: 'uint256' },
      { internalType: 'uint256', name: 'value', type: 'uint256' },
    ],
    name: 'BOROS20NotEnoughBalance',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'uint128', name: 'minAbsRate', type: 'uint128' },
      { indexed: false, internalType: 'uint128', name: 'maxAbsRate', type: 'uint128' },
      { indexed: false, internalType: 'uint32', name: 'cutOffTimestamp', type: 'uint32' },
    ],
    name: 'AMMConfigUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'from', type: 'bytes26' },
      { indexed: false, internalType: 'MarketAcc', name: 'to', type: 'bytes26' },
      { indexed: false, internalType: 'uint256', name: 'value', type: 'uint256' },
    ],
    name: 'BOROS20Transfer',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'MarketAcc', name: 'payer', type: 'bytes26' },
      { indexed: false, internalType: 'uint256', name: 'netLpBurned', type: 'uint256' },
      { indexed: false, internalType: 'int256', name: 'netCashOut', type: 'int256' },
      { indexed: false, internalType: 'int256', name: 'netSizeOut', type: 'int256' },
    ],
    name: 'Burn',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'uint256', name: 'newFeeRate', type: 'uint256' }],
    name: 'FeeRateUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'uint32', name: 'newWindow', type: 'uint32' }],
    name: 'ImpliedRateObservationWindowUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'MarketAcc', name: 'receiver', type: 'bytes26' },
      { indexed: false, internalType: 'uint256', name: 'netLpMinted', type: 'uint256' },
      { indexed: false, internalType: 'int256', name: 'netCashIn', type: 'int256' },
      { indexed: false, internalType: 'int256', name: 'netSizeIn', type: 'int256' },
    ],
    name: 'Mint',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'int256', name: 'sizeOut', type: 'int256' },
      { indexed: false, internalType: 'int256', name: 'costOut', type: 'int256' },
      { indexed: false, internalType: 'uint256', name: 'fee', type: 'uint256' },
    ],
    name: 'Swap',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'uint256', name: 'newTotalSupplyCap', type: 'uint256' }],
    name: 'TotalSupplyCapUpdated',
    type: 'event',
  },
  {
    inputs: [],
    name: 'ACCOUNT_ONE',
    outputs: [{ internalType: 'MarketAcc', name: '', type: 'bytes26' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'AMM_ID',
    outputs: [{ internalType: 'AMMId', name: '', type: 'uint24' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'MARKET',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'MATURITY',
    outputs: [{ internalType: 'uint32', name: '', type: 'uint32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'ROUTER',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'SEED_TIME',
    outputs: [{ internalType: 'uint32', name: '', type: 'uint32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'SELF_ACC',
    outputs: [{ internalType: 'MarketAcc', name: '', type: 'bytes26' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: '_storage',
    outputs: [
      { internalType: 'uint128', name: 'minAbsRate', type: 'uint128' },
      { internalType: 'uint128', name: 'maxAbsRate', type: 'uint128' },
      { internalType: 'uint32', name: 'cutOffTimestamp', type: 'uint32' },
      { internalType: 'uint32', name: 'oracleImpliedRateWindow', type: 'uint32' },
      { internalType: 'uint64', name: 'feeRate', type: 'uint64' },
      { internalType: 'uint256', name: 'totalSupplyCap', type: 'uint256' },
      { internalType: 'uint128', name: 'totalFloatAmount', type: 'uint128' },
      { internalType: 'uint128', name: 'normFixedAmount', type: 'uint128' },
      { internalType: 'uint32', name: 'lastTradedTime', type: 'uint32' },
      { internalType: 'int128', name: 'prevOracleImpliedRate', type: 'int128' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'MarketAcc', name: 'account', type: 'bytes26' }],
    name: 'balanceOf',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'MarketAcc', name: 'payer', type: 'bytes26' },
      { internalType: 'int256', name: 'totalCash', type: 'int256' },
      { internalType: 'int256', name: 'totalSize', type: 'int256' },
      { internalType: 'uint256', name: 'lpToBurn', type: 'uint256' },
    ],
    name: 'burnByBorosRouter',
    outputs: [
      { internalType: 'int256', name: 'netCashOut', type: 'int256' },
      { internalType: 'int256', name: 'netSizeOut', type: 'int256' },
      { internalType: 'bool', name: 'isMatured', type: 'bool' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'int256', name: 'targetRate', type: 'int256' }],
    name: 'calcSwapSize',
    outputs: [{ internalType: 'int256', name: '', type: 'int256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'decimals',
    outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'feeRate',
    outputs: [{ internalType: 'uint64', name: '', type: 'uint64' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'impliedRate',
    outputs: [{ internalType: 'int256', name: '', type: 'int256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'MarketAcc', name: 'receiver', type: 'bytes26' },
      { internalType: 'int256', name: 'totalCash', type: 'int256' },
      { internalType: 'int256', name: 'totalSize', type: 'int256' },
      { internalType: 'int256', name: 'maxCashIn', type: 'int256' },
      { internalType: 'int256', name: 'exactSizeIn', type: 'int256' },
    ],
    name: 'mintByBorosRouter',
    outputs: [
      { internalType: 'int256', name: 'netCashIn', type: 'int256' },
      { internalType: 'uint256', name: 'netLpOut', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'name',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'oracleImpliedRate',
    outputs: [
      { internalType: 'int128', name: 'oracleImpliedRate', type: 'int128' },
      { internalType: 'uint32', name: 'observationWindow', type: 'uint32' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'readState',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'totalFloatAmount', type: 'uint256' },
          { internalType: 'uint256', name: 'normFixedAmount', type: 'uint256' },
          { internalType: 'uint256', name: 'totalLp', type: 'uint256' },
          { internalType: 'uint256', name: 'latestFTime', type: 'uint256' },
          { internalType: 'uint256', name: 'maturity', type: 'uint256' },
          { internalType: 'uint256', name: 'seedTime', type: 'uint256' },
          { internalType: 'uint256', name: 'minAbsRate', type: 'uint256' },
          { internalType: 'uint256', name: 'maxAbsRate', type: 'uint256' },
          { internalType: 'uint256', name: 'cutOffTimestamp', type: 'uint256' },
        ],
        internalType: 'struct AMMState',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint128', name: 'minAbsRate', type: 'uint128' },
      { internalType: 'uint128', name: 'maxAbsRate', type: 'uint128' },
      { internalType: 'uint32', name: 'cutOffTimestamp', type: 'uint32' },
    ],
    name: 'setAMMConfig',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint64', name: 'newFeeRate', type: 'uint64' }],
    name: 'setAMMFeeRate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint32', name: 'newWindow', type: 'uint32' }],
    name: 'setAMMImpliedRateObservationWindow',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'newTotalSupplyCap', type: 'uint256' }],
    name: 'setAMMTotalSupplyCap',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'int256', name: 'sizeOut', type: 'int256' }],
    name: 'swapByBorosRouter',
    outputs: [{ internalType: 'int256', name: 'costOut', type: 'int256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'int256', name: 'sizeOut', type: 'int256' }],
    name: 'swapView',
    outputs: [{ internalType: 'int256', name: 'costOut', type: 'int256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalSupplyCap',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IBOROS20
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iBOROS20Abi = [
  {
    inputs: [
      { internalType: 'MarketAcc', name: 'account', type: 'bytes26' },
      { internalType: 'uint256', name: 'balance', type: 'uint256' },
      { internalType: 'uint256', name: 'value', type: 'uint256' },
    ],
    name: 'BOROS20NotEnoughBalance',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'from', type: 'bytes26' },
      { indexed: false, internalType: 'MarketAcc', name: 'to', type: 'bytes26' },
      { indexed: false, internalType: 'uint256', name: 'value', type: 'uint256' },
    ],
    name: 'BOROS20Transfer',
    type: 'event',
  },
  {
    inputs: [{ internalType: 'MarketAcc', name: 'account', type: 'bytes26' }],
    name: 'balanceOf',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'decimals',
    outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'name',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IMultiTokenMerkleDistributor
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iMultiTokenMerkleDistributorAbi = [
  { inputs: [], name: 'InvalidMerkleProof', type: 'error' },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'token', type: 'address' },
      { indexed: true, internalType: 'address', name: 'user', type: 'address' },
      { indexed: true, internalType: 'address', name: 'receiver', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'Claimed',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: true, internalType: 'bytes32', name: 'merkleRoot', type: 'bytes32' }],
    name: 'SetMerkleRoot',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'token', type: 'address' },
      { indexed: true, internalType: 'address', name: 'user', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'amountClaimable', type: 'uint256' },
    ],
    name: 'Verified',
    type: 'event',
  },
  {
    inputs: [
      { internalType: 'address', name: 'receiver', type: 'address' },
      { internalType: 'address[]', name: 'tokens', type: 'address[]' },
      { internalType: 'uint256[]', name: 'totalAccrueds', type: 'uint256[]' },
      { internalType: 'bytes32[][]', name: 'proofs', type: 'bytes32[][]' },
    ],
    name: 'claim',
    outputs: [{ internalType: 'uint256[]', name: 'amountOuts', type: 'uint256[]' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'receiver', type: 'address' },
      { internalType: 'address[]', name: 'tokens', type: 'address[]' },
    ],
    name: 'claimVerified',
    outputs: [{ internalType: 'uint256[]', name: 'amountOuts', type: 'uint256[]' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'token', type: 'address' },
      { internalType: 'address', name: 'user', type: 'address' },
    ],
    name: 'claimed',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'merkleRoot',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'bytes32', name: 'newMerkleRoot', type: 'bytes32' }],
    name: 'setMerkleRoot',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'token', type: 'address' },
      { internalType: 'address', name: 'user', type: 'address' },
    ],
    name: 'verified',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'user', type: 'address' },
      { internalType: 'address[]', name: 'tokens', type: 'address[]' },
      { internalType: 'uint256[]', name: 'totalAccrueds', type: 'uint256[]' },
      { internalType: 'bytes32[][]', name: 'proofs', type: 'bytes32[][]' },
    ],
    name: 'verify',
    outputs: [{ internalType: 'uint256[]', name: 'amountClaimable', type: 'uint256[]' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;
