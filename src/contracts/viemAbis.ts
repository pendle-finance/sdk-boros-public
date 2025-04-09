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
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: false, internalType: 'MarketId', name: 'marketId', type: 'uint24' },
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
    inputs: [
      { indexed: true, internalType: 'address', name: 'root', type: 'address' },
      { indexed: false, internalType: 'uint8', name: 'maxAllowedSubaccountIdOld', type: 'uint8' },
      { indexed: false, internalType: 'uint8', name: 'maxAllowedSubaccountIdNew', type: 'uint8' },
    ],
    name: 'MaxAllowedSubaccountUpdated',
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
      { indexed: false, internalType: 'address', name: 'root', type: 'address' },
      { indexed: false, internalType: 'TokenId', name: 'tokenId', type: 'uint16' },
      { indexed: false, internalType: 'int256', name: 'unscaledAmount', type: 'int256' },
    ],
    name: 'VaultTransfer',
    type: 'event',
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
      { internalType: 'MarketId', name: 'marketId', type: 'uint24' },
      { internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { internalType: 'bool', name: 'isCancelAll', type: 'bool' },
      { internalType: 'OrderId[]', name: 'idsToCancel', type: 'uint64[]' },
    ],
    name: 'forceCancel',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'MarketId', name: 'marketId', type: 'uint24' },
      { internalType: 'MarketAcc', name: 'user1', type: 'bytes26' },
      { internalType: 'MarketAcc', name: 'user2', type: 'bytes26' },
      { internalType: 'int256', name: 'size', type: 'int256' },
    ],
    name: 'forceDeleverage',
    outputs: [{ internalType: 'Trade', name: 'forcedTrade', type: 'uint256' }],
    stateMutability: 'nonpayable',
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
    inputs: [
      { internalType: 'MarketId', name: 'marketId', type: 'uint24' },
      { internalType: 'MarketAcc', name: 'liquidator', type: 'bytes26' },
      { internalType: 'MarketAcc', name: 'violator', type: 'bytes26' },
      { internalType: 'int256', name: 'sizeToLiquidator', type: 'int256' },
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
    inputs: [
      { internalType: 'MarketId', name: 'marketId', type: 'uint24' },
      { internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      {
        components: [
          { internalType: 'enum TimeInForce', name: 'tif', type: 'uint8' },
          { internalType: 'Side', name: 'side', type: 'uint8' },
          { internalType: 'uint256[]', name: 'sizes', type: 'uint256[]' },
          { internalType: 'int16[]', name: 'limitTicks', type: 'int16[]' },
          { internalType: 'OrderId[]', name: 'idsToCancel', type: 'uint64[]' },
          { internalType: 'bool', name: 'isCancelAll', type: 'bool' },
          { internalType: 'bool', name: 'isStrictCancel', type: 'bool' },
        ],
        internalType: 'struct LongShort',
        name: 'orders',
        type: 'tuple',
      },
      {
        components: [
          { internalType: 'Trade', name: 'trade', type: 'uint256' },
          { internalType: 'MarketAcc', name: 'counter', type: 'bytes26' },
        ],
        internalType: 'struct OTCTrade[]',
        name: 'OTCs',
        type: 'tuple[]',
      },
    ],
    name: 'orderAndOtc',
    outputs: [
      { internalType: 'Trade', name: 'bookMatched', type: 'uint256' },
      { internalType: 'uint256', name: 'takerFee', type: 'uint256' },
      { internalType: 'uint256', name: 'otcFee', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'MarketId', name: 'marketId', type: 'uint24' },
      { internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { internalType: 'MarketAcc', name: 'counter', type: 'bytes26' },
      { internalType: 'Trade', name: 'trade', type: 'uint256' },
      { internalType: 'int256', name: 'amount', type: 'int256' },
    ],
    name: 'otcAndCashTransfer',
    outputs: [{ internalType: 'uint256', name: 'otcFee', type: 'uint256' }],
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
      { internalType: 'uint8', name: 'maxAllowedSubaccountIdNew', type: 'uint8' },
    ],
    name: 'setMaxAllowedSubaccountId',
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
      { internalType: 'VMResult', name: 'totalIM', type: 'uint256' },
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
        internalType: 'struct IMarketHubStorageOnly.TokenData',
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
    inputs: [{ internalType: 'address', name: 'token', type: 'address' }],
    name: 'tokenToId',
    outputs: [{ internalType: 'TokenId', name: '', type: 'uint16' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'TokenId', name: 'tokenId', type: 'uint16' }],
    name: 'treasuryCash',
    outputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'root', type: 'address' },
      { internalType: 'TokenId', name: 'tokenId', type: 'uint16' },
      { internalType: 'int256', name: 'rawAmount', type: 'int256' },
    ],
    name: 'vaultTransfer',
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
      { internalType: 'address', name: 'root', type: 'address' },
      { internalType: 'TokenId', name: 'tokenId', type: 'uint16' },
      { internalType: 'int256', name: 'rawAmount', type: 'int256' },
    ],
    name: 'vaultTransfer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IMarketHubOnly
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iMarketHubOnlyAbi = [
  {
    inputs: [
      { internalType: 'MarketId', name: 'marketId', type: 'uint24' },
      { internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { internalType: 'bool', name: 'isCancelAll', type: 'bool' },
      { internalType: 'OrderId[]', name: 'idsToCancel', type: 'uint64[]' },
    ],
    name: 'forceCancel',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'MarketId', name: 'marketId', type: 'uint24' },
      { internalType: 'MarketAcc', name: 'user1', type: 'bytes26' },
      { internalType: 'MarketAcc', name: 'user2', type: 'bytes26' },
      { internalType: 'int256', name: 'size', type: 'int256' },
    ],
    name: 'forceDeleverage',
    outputs: [{ internalType: 'Trade', name: 'forcedTrade', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'MarketId', name: 'marketId', type: 'uint24' },
      { internalType: 'MarketAcc', name: 'liquidator', type: 'bytes26' },
      { internalType: 'MarketAcc', name: 'violator', type: 'bytes26' },
      { internalType: 'int256', name: 'sizeToLiquidator', type: 'int256' },
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
          { internalType: 'Side', name: 'side', type: 'uint8' },
          { internalType: 'uint256[]', name: 'sizes', type: 'uint256[]' },
          { internalType: 'int16[]', name: 'limitTicks', type: 'int16[]' },
          { internalType: 'OrderId[]', name: 'idsToCancel', type: 'uint64[]' },
          { internalType: 'bool', name: 'isCancelAll', type: 'bool' },
          { internalType: 'bool', name: 'isStrictCancel', type: 'bool' },
        ],
        internalType: 'struct LongShort',
        name: 'orders',
        type: 'tuple',
      },
      {
        components: [
          { internalType: 'Trade', name: 'trade', type: 'uint256' },
          { internalType: 'MarketAcc', name: 'counter', type: 'bytes26' },
        ],
        internalType: 'struct OTCTrade[]',
        name: 'OTCs',
        type: 'tuple[]',
      },
    ],
    name: 'orderAndOtc',
    outputs: [
      { internalType: 'Trade', name: 'bookMatched', type: 'uint256' },
      { internalType: 'uint256', name: 'takerFee', type: 'uint256' },
      { internalType: 'uint256', name: 'otcFee', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'MarketId', name: 'marketId', type: 'uint24' },
      { internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { internalType: 'MarketAcc', name: 'counter', type: 'bytes26' },
      { internalType: 'Trade', name: 'trade', type: 'uint256' },
      { internalType: 'int256', name: 'amount', type: 'int256' },
    ],
    name: 'otcAndCashTransfer',
    outputs: [{ internalType: 'uint256', name: 'otcFee', type: 'uint256' }],
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
      { internalType: 'VMResult', name: 'totalIM', type: 'uint256' },
      { internalType: 'int256', name: 'signedSize', type: 'int256' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IMarketHubAllEvents
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iMarketHubAllEventsAbi = [
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
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: false, internalType: 'MarketId', name: 'marketId', type: 'uint24' },
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
    inputs: [
      { indexed: true, internalType: 'address', name: 'root', type: 'address' },
      { indexed: false, internalType: 'uint8', name: 'maxAllowedSubaccountIdOld', type: 'uint8' },
      { indexed: false, internalType: 'uint8', name: 'maxAllowedSubaccountIdNew', type: 'uint8' },
    ],
    name: 'MaxAllowedSubaccountUpdated',
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
      { indexed: false, internalType: 'address', name: 'root', type: 'address' },
      { indexed: false, internalType: 'TokenId', name: 'tokenId', type: 'uint16' },
      { indexed: false, internalType: 'int256', name: 'unscaledAmount', type: 'int256' },
    ],
    name: 'VaultTransfer',
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
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: false, internalType: 'MarketId', name: 'marketId', type: 'uint24' },
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
    inputs: [
      { indexed: true, internalType: 'address', name: 'root', type: 'address' },
      { indexed: false, internalType: 'uint8', name: 'maxAllowedSubaccountIdOld', type: 'uint8' },
      { indexed: false, internalType: 'uint8', name: 'maxAllowedSubaccountIdNew', type: 'uint8' },
    ],
    name: 'MaxAllowedSubaccountUpdated',
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
      { indexed: false, internalType: 'address', name: 'root', type: 'address' },
      { indexed: false, internalType: 'TokenId', name: 'tokenId', type: 'uint16' },
      { indexed: false, internalType: 'int256', name: 'unscaledAmount', type: 'int256' },
    ],
    name: 'VaultTransfer',
    type: 'event',
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
    inputs: [{ internalType: 'MarketAcc', name: 'user', type: 'bytes26' }],
    name: 'getEnteredMarkets',
    outputs: [{ internalType: 'MarketId[]', name: '', type: 'uint24[]' }],
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
      { internalType: 'uint8', name: 'maxAllowedSubaccountIdNew', type: 'uint8' },
    ],
    name: 'setMaxAllowedSubaccountId',
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
        internalType: 'struct IMarketHubStorageOnly.TokenData',
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
    inputs: [{ internalType: 'address', name: 'token', type: 'address' }],
    name: 'tokenToId',
    outputs: [{ internalType: 'TokenId', name: '', type: 'uint16' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'TokenId', name: 'tokenId', type: 'uint16' }],
    name: 'treasuryCash',
    outputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
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
          { internalType: 'uint128', name: 'OICap', type: 'uint128' },
          { internalType: 'uint64', name: 'takerFee', type: 'uint64' },
          { internalType: 'uint64', name: 'otcFee', type: 'uint64' },
          {
            components: [
              { internalType: 'uint128', name: 'base', type: 'uint128' },
              { internalType: 'uint128', name: 'slope', type: 'uint128' },
            ],
            internalType: 'struct IMarketAllTypes.LiqIncentiveConfig',
            name: 'liqIncentive',
            type: 'tuple',
          },
          { internalType: 'uint64', name: 'IMFactor', type: 'uint64' },
          { internalType: 'uint64', name: 'MMFactor', type: 'uint64' },
          { internalType: 'uint128', name: 'minMarginIndexRate', type: 'uint128' },
          { internalType: 'uint32', name: 'minMarginIndexDuration', type: 'uint32' },
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
      {
        components: [
          { internalType: 'uint16', name: 'maxOpenOrders', type: 'uint16' },
          { internalType: 'address', name: 'markRateOracle', type: 'address' },
          { internalType: 'address', name: 'fIndexOracle', type: 'address' },
          { internalType: 'uint128', name: 'OICap', type: 'uint128' },
          { internalType: 'uint64', name: 'takerFee', type: 'uint64' },
          { internalType: 'uint64', name: 'otcFee', type: 'uint64' },
          {
            components: [
              { internalType: 'uint128', name: 'base', type: 'uint128' },
              { internalType: 'uint128', name: 'slope', type: 'uint128' },
            ],
            internalType: 'struct IMarketAllTypes.LiqIncentiveConfig',
            name: 'liqIncentive',
            type: 'tuple',
          },
          { internalType: 'uint64', name: 'IMFactor', type: 'uint64' },
          { internalType: 'uint64', name: 'MMFactor', type: 'uint64' },
          { internalType: 'uint128', name: 'minMarginIndexRate', type: 'uint128' },
          { internalType: 'uint32', name: 'minMarginIndexDuration', type: 'uint32' },
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
      { indexed: true, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: true, internalType: 'address', name: 'ammAddr', type: 'address' },
      { indexed: false, internalType: 'int256', name: 'exactSizeIn', type: 'int256' },
      { indexed: false, internalType: 'uint256', name: 'netLpOut', type: 'uint256' },
      { indexed: false, internalType: 'int256', name: 'mintCashIn', type: 'int256' },
      { indexed: false, internalType: 'int256', name: 'netCashUsed', type: 'int256' },
    ],
    name: 'AddLiquidityDualToAmm',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: true, internalType: 'address', name: 'ammAddr', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'netLpOut', type: 'uint256' },
      { indexed: false, internalType: 'int256', name: 'netCashUsed', type: 'int256' },
      { indexed: false, internalType: 'int256', name: 'netSizeInterm', type: 'int256' },
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
      { indexed: false, internalType: 'MarketId', name: 'marketId', type: 'uint24' },
      { indexed: false, internalType: 'MarketAcc', name: 'amm', type: 'bytes26' },
    ],
    name: 'MarketIdAmmSet',
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
      { indexed: true, internalType: 'address', name: 'ammAddr', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'lpToRemove', type: 'uint256' },
      { indexed: false, internalType: 'int256', name: 'burnCashOut', type: 'int256' },
      { indexed: false, internalType: 'int256', name: 'netSizeOut', type: 'int256' },
      { indexed: false, internalType: 'int256', name: 'netCashOut', type: 'int256' },
    ],
    name: 'RemoveLiquidityDualFromAmm',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: true, internalType: 'address', name: 'ammAddr', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'lpToRemove', type: 'uint256' },
      { indexed: false, internalType: 'int256', name: 'netCashOut', type: 'int256' },
      { indexed: false, internalType: 'int256', name: 'netSizeInterm', type: 'int256' },
    ],
    name: 'RemoveLiquiditySingleCashFromAmm',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'uint256', name: 'index', type: 'uint256' }],
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
          { internalType: 'MarketId', name: 'marketId', type: 'uint24' },
          { internalType: 'address', name: 'ammAddr', type: 'address' },
          { internalType: 'int256', name: 'desiredCashIn', type: 'int256' },
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
      { internalType: 'int256', name: 'netCashUsed', type: 'int256' },
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
          { internalType: 'MarketId', name: 'marketId', type: 'uint24' },
          { internalType: 'address', name: 'ammAddr', type: 'address' },
          { internalType: 'int256', name: 'desiredCashIn', type: 'int256' },
          { internalType: 'uint256', name: 'minLpOut', type: 'uint256' },
          { internalType: 'uint256', name: 'maxIteration', type: 'uint256' },
          { internalType: 'uint256', name: 'eps', type: 'uint256' },
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
      { internalType: 'uint256', name: 'netTakerOtcFee', type: 'uint256' },
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
    inputs: [
      {
        components: [
          { internalType: 'Account', name: 'account', type: 'bytes21' },
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
    outputs: [{ internalType: 'bytes[]', name: '', type: 'bytes[]' }],
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
          { internalType: 'MarketId', name: 'marketId', type: 'uint24' },
          { internalType: 'OrderId[]', name: 'idsToCancel', type: 'uint64[]' },
          { internalType: 'Side', name: 'side', type: 'uint8' },
          { internalType: 'enum TimeInForce', name: 'tif', type: 'uint8' },
          { internalType: 'uint256[]', name: 'sizes', type: 'uint256[]' },
          { internalType: 'int16[]', name: 'limitTicks', type: 'int16[]' },
        ],
        internalType: 'struct IRouterEventsAndTypes.BulkModify',
        name: 'req',
        type: 'tuple',
      },
    ],
    name: 'bulkModifies',
    outputs: [
      { internalType: 'Trade', name: 'matched', type: 'uint256' },
      { internalType: 'uint256', name: 'takerFee', type: 'uint256' },
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
          { internalType: 'Side', name: 'side', type: 'uint8' },
          { internalType: 'enum TimeInForce', name: 'tif', type: 'uint8' },
          { internalType: 'uint256[]', name: 'sizes', type: 'uint256[]' },
          { internalType: 'int16[]', name: 'limitTicks', type: 'int16[]' },
        ],
        internalType: 'struct IRouterEventsAndTypes.BulkOrders',
        name: 'req',
        type: 'tuple',
      },
    ],
    name: 'bulkOrders',
    outputs: [
      { internalType: 'Trade', name: 'matched', type: 'uint256' },
      { internalType: 'uint256', name: 'takerFee', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'MarketId', name: 'marketId', type: 'uint24' },
          { internalType: 'uint256', name: 'amount', type: 'uint256' },
          { internalType: 'bool', name: 'isDeposit', type: 'bool' },
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
          { internalType: 'MarketId', name: 'marketId', type: 'uint24' },
          { internalType: 'bool', name: 'useAmm', type: 'bool' },
          { internalType: 'Side', name: 'side', type: 'uint8' },
          { internalType: 'enum TimeInForce', name: 'tif', type: 'uint8' },
          { internalType: 'int16', name: 'tick', type: 'int16' },
          { internalType: 'uint256', name: 'size', type: 'uint256' },
        ],
        internalType: 'struct IRouterEventsAndTypes.Order',
        name: 'order',
        type: 'tuple',
      },
    ],
    name: 'closeIsolatedPosition',
    outputs: [
      { internalType: 'Trade', name: 'matched', type: 'uint256' },
      { internalType: 'int256', name: 'amountOut', type: 'int256' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'bool', name: 'cross', type: 'bool' },
          { internalType: 'MarketId[]', name: 'marketIds', type: 'uint24[]' },
        ],
        internalType: 'struct IRouterEventsAndTypes.EnterMarketsReq',
        name: 'req',
        type: 'tuple',
      },
    ],
    name: 'enterMarkets',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'bool', name: 'cross', type: 'bool' },
          { internalType: 'MarketId[]', name: 'marketIds', type: 'uint24[]' },
        ],
        internalType: 'struct IRouterEventsAndTypes.ExitMarketsReq',
        name: 'req',
        type: 'tuple',
      },
    ],
    name: 'exitMarkets',
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
    inputs: [
      { internalType: 'bool', name: 'cross', type: 'bool' },
      { internalType: 'MarketId', name: 'marketId', type: 'uint24' },
      { internalType: 'MarketAcc', name: 'violator', type: 'bytes26' },
      { internalType: 'int256', name: 'sizeToLiquidator', type: 'int256' },
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
    name: 'marketIdAmm',
    outputs: [{ internalType: 'MarketAcc', name: '', type: 'bytes26' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'OrderId', name: 'idToCancel', type: 'uint64' },
          {
            components: [
              { internalType: 'bool', name: 'cross', type: 'bool' },
              { internalType: 'MarketId', name: 'marketId', type: 'uint24' },
              { internalType: 'bool', name: 'useAmm', type: 'bool' },
              { internalType: 'Side', name: 'side', type: 'uint8' },
              { internalType: 'enum TimeInForce', name: 'tif', type: 'uint8' },
              { internalType: 'int16', name: 'tick', type: 'int16' },
              { internalType: 'uint256', name: 'size', type: 'uint256' },
            ],
            internalType: 'struct IRouterEventsAndTypes.Order',
            name: 'newOrder',
            type: 'tuple',
          },
        ],
        internalType: 'struct IRouterEventsAndTypes.ModifyOrderReq',
        name: 'req',
        type: 'tuple',
      },
    ],
    name: 'modifyOrder',
    outputs: [{ internalType: 'Trade', name: 'matched', type: 'uint256' }],
    stateMutability: 'nonpayable',
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
          {
            components: [
              { internalType: 'bool', name: 'cross', type: 'bool' },
              { internalType: 'MarketId', name: 'marketId', type: 'uint24' },
              { internalType: 'bool', name: 'useAmm', type: 'bool' },
              { internalType: 'Side', name: 'side', type: 'uint8' },
              { internalType: 'enum TimeInForce', name: 'tif', type: 'uint8' },
              { internalType: 'int16', name: 'tick', type: 'int16' },
              { internalType: 'uint256', name: 'size', type: 'uint256' },
            ],
            internalType: 'struct IRouterEventsAndTypes.Order',
            name: 'order',
            type: 'tuple',
          },
          { internalType: 'uint256', name: 'cashIn', type: 'uint256' },
          { internalType: 'bool', name: 'enterMarket', type: 'bool' },
        ],
        internalType: 'struct IRouterEventsAndTypes.OpenIsolatedPositionRequest',
        name: 'req',
        type: 'tuple',
      },
    ],
    name: 'openIsolatedPosition',
    outputs: [{ internalType: 'Trade', name: 'matched', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'bool', name: 'cross', type: 'bool' },
          { internalType: 'MarketId', name: 'marketId', type: 'uint24' },
          { internalType: 'bool', name: 'useAmm', type: 'bool' },
          { internalType: 'Side', name: 'side', type: 'uint8' },
          { internalType: 'enum TimeInForce', name: 'tif', type: 'uint8' },
          { internalType: 'int16', name: 'tick', type: 'int16' },
          { internalType: 'uint256', name: 'size', type: 'uint256' },
        ],
        internalType: 'struct IRouterEventsAndTypes.Order',
        name: 'order',
        type: 'tuple',
      },
    ],
    name: 'placeOrder',
    outputs: [{ internalType: 'Trade', name: 'matched', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'bool', name: 'cross', type: 'bool' },
          { internalType: 'MarketId', name: 'marketId', type: 'uint24' },
          { internalType: 'address', name: 'ammAddr', type: 'address' },
          { internalType: 'uint256', name: 'lpToRemove', type: 'uint256' },
          { internalType: 'int256', name: 'minCashOut', type: 'int256' },
          { internalType: 'int256', name: 'desiredSizeOut', type: 'int256' },
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
          { internalType: 'MarketId', name: 'marketId', type: 'uint24' },
          { internalType: 'address', name: 'ammAddr', type: 'address' },
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
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'Account', name: 'account', type: 'bytes21' },
          { internalType: 'address[]', name: 'agents', type: 'address[]' },
          { internalType: 'uint64', name: 'nonce', type: 'uint64' },
        ],
        internalType: 'struct IRouterEventsAndTypes.RevokeAgentMessage',
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
          { internalType: 'Account', name: 'account', type: 'bytes21' },
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
      { internalType: 'MarketId', name: 'marketId', type: 'uint24' },
      { internalType: 'MarketAcc', name: 'amm', type: 'bytes26' },
    ],
    name: 'setMarketIdAmm',
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
    inputs: [{ internalType: 'MarketAcc', name: 'user', type: 'bytes26' }],
    name: 'settlePaymentAndOrders',
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
      { internalType: 'uint8', name: 'accountId', type: 'uint8' },
      { internalType: 'TokenId', name: 'tokenId', type: 'uint16' },
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
          { internalType: 'address', name: 'root', type: 'address' },
          { internalType: 'uint8', name: 'accountId', type: 'uint8' },
          { internalType: 'TokenId', name: 'tokenId', type: 'uint16' },
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
      {
        components: [
          { internalType: 'bool', name: 'cross', type: 'bool' },
          { internalType: 'MarketId', name: 'marketId', type: 'uint24' },
          { internalType: 'address', name: 'ammAddr', type: 'address' },
          { internalType: 'int256', name: 'signedSize', type: 'int256' },
          { internalType: 'int256', name: 'maxCost', type: 'int256' },
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
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'TokenId', name: 'tokenId', type: 'uint16' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
      { internalType: 'bool', name: 'isDeposit', type: 'bool' },
    ],
    name: 'vaultTransfer',
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
          { internalType: 'bool', name: 'isDeposit', type: 'bool' },
          { internalType: 'uint64', name: 'nonce', type: 'uint64' },
        ],
        internalType: 'struct IRouterEventsAndTypes.VaultTransferMessage',
        name: 'message',
        type: 'tuple',
      },
      { internalType: 'bytes', name: 'signature', type: 'bytes' },
    ],
    name: 'vaultTransfer',
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
    inputs: [{ indexed: false, internalType: 'FIndex', name: 'newIndex', type: 'bytes26' }],
    name: 'FIndexUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: false, internalType: 'bool', name: 'isCancelAll', type: 'bool' },
      { indexed: false, internalType: 'OrderId[]', name: 'removedIds', type: 'uint64[]' },
    ],
    name: 'ForceCancel',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'winningUser', type: 'bytes26' },
      { indexed: false, internalType: 'MarketAcc', name: 'losingUser', type: 'bytes26' },
      { indexed: false, internalType: 'Trade', name: 'trade', type: 'uint256' },
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
      { indexed: false, internalType: 'OrderId', name: 'from', type: 'uint64' },
      { indexed: false, internalType: 'OrderId', name: 'to', type: 'uint64' },
    ],
    name: 'LimitOrderFilled',
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
      { indexed: false, internalType: 'MarketAcc', name: 'liquidator', type: 'bytes26' },
      { indexed: false, internalType: 'MarketAcc', name: 'violator', type: 'bytes26' },
      { indexed: false, internalType: 'Trade', name: 'liqTrade', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'fees', type: 'uint256' },
    ],
    name: 'Liquidate',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        components: [
          { internalType: 'uint16', name: 'maxOpenOrders', type: 'uint16' },
          { internalType: 'address', name: 'markRateOracle', type: 'address' },
          { internalType: 'address', name: 'fIndexOracle', type: 'address' },
          { internalType: 'uint128', name: 'OICap', type: 'uint128' },
          { internalType: 'uint64', name: 'takerFee', type: 'uint64' },
          { internalType: 'uint64', name: 'otcFee', type: 'uint64' },
          {
            components: [
              { internalType: 'uint128', name: 'base', type: 'uint128' },
              { internalType: 'uint128', name: 'slope', type: 'uint128' },
            ],
            internalType: 'struct IMarketAllTypes.LiqIncentiveConfig',
            name: 'liqIncentive',
            type: 'tuple',
          },
          { internalType: 'uint64', name: 'IMFactor', type: 'uint64' },
          { internalType: 'uint64', name: 'MMFactor', type: 'uint64' },
          { internalType: 'uint128', name: 'minMarginIndexRate', type: 'uint128' },
          { internalType: 'uint32', name: 'minMarginIndexDuration', type: 'uint32' },
        ],
        indexed: false,
        internalType: 'struct IMarketAllTypes.MarketConfigStruct',
        name: 'newConfig',
        type: 'tuple',
      },
    ],
    name: 'MarketConfigUpdated',
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
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: false, internalType: 'MarketAcc', name: 'counterParty', type: 'bytes26' },
      { indexed: false, internalType: 'Trade', name: 'trade', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'fees', type: 'uint256' },
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
      { indexed: true, internalType: 'address', name: 'user', type: 'address' },
      { indexed: false, internalType: 'uint64', name: 'newTakerDisc', type: 'uint64' },
      { indexed: false, internalType: 'uint64', name: 'newOtcDisc', type: 'uint64' },
    ],
    name: 'PersonalDiscRatesUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'user', type: 'address' },
      { indexed: false, internalType: 'uint64', name: 'newIMFactor', type: 'uint64' },
      { indexed: false, internalType: 'uint64', name: 'newMMFactor', type: 'uint64' },
    ],
    name: 'PersonalMarginConfigUpdated',
    type: 'event',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IMarket
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iMarketAbi = [
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'FIndex', name: 'newIndex', type: 'bytes26' }],
    name: 'FIndexUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: false, internalType: 'bool', name: 'isCancelAll', type: 'bool' },
      { indexed: false, internalType: 'OrderId[]', name: 'removedIds', type: 'uint64[]' },
    ],
    name: 'ForceCancel',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'winningUser', type: 'bytes26' },
      { indexed: false, internalType: 'MarketAcc', name: 'losingUser', type: 'bytes26' },
      { indexed: false, internalType: 'Trade', name: 'trade', type: 'uint256' },
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
      { indexed: false, internalType: 'OrderId', name: 'from', type: 'uint64' },
      { indexed: false, internalType: 'OrderId', name: 'to', type: 'uint64' },
    ],
    name: 'LimitOrderFilled',
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
      { indexed: false, internalType: 'MarketAcc', name: 'liquidator', type: 'bytes26' },
      { indexed: false, internalType: 'MarketAcc', name: 'violator', type: 'bytes26' },
      { indexed: false, internalType: 'Trade', name: 'liqTrade', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'fees', type: 'uint256' },
    ],
    name: 'Liquidate',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        components: [
          { internalType: 'uint16', name: 'maxOpenOrders', type: 'uint16' },
          { internalType: 'address', name: 'markRateOracle', type: 'address' },
          { internalType: 'address', name: 'fIndexOracle', type: 'address' },
          { internalType: 'uint128', name: 'OICap', type: 'uint128' },
          { internalType: 'uint64', name: 'takerFee', type: 'uint64' },
          { internalType: 'uint64', name: 'otcFee', type: 'uint64' },
          {
            components: [
              { internalType: 'uint128', name: 'base', type: 'uint128' },
              { internalType: 'uint128', name: 'slope', type: 'uint128' },
            ],
            internalType: 'struct IMarketAllTypes.LiqIncentiveConfig',
            name: 'liqIncentive',
            type: 'tuple',
          },
          { internalType: 'uint64', name: 'IMFactor', type: 'uint64' },
          { internalType: 'uint64', name: 'MMFactor', type: 'uint64' },
          { internalType: 'uint128', name: 'minMarginIndexRate', type: 'uint128' },
          { internalType: 'uint32', name: 'minMarginIndexDuration', type: 'uint32' },
        ],
        indexed: false,
        internalType: 'struct IMarketAllTypes.MarketConfigStruct',
        name: 'newConfig',
        type: 'tuple',
      },
    ],
    name: 'MarketConfigUpdated',
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
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: false, internalType: 'MarketAcc', name: 'counterParty', type: 'bytes26' },
      { indexed: false, internalType: 'Trade', name: 'trade', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'fees', type: 'uint256' },
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
      { indexed: true, internalType: 'address', name: 'user', type: 'address' },
      { indexed: false, internalType: 'uint64', name: 'newTakerDisc', type: 'uint64' },
      { indexed: false, internalType: 'uint64', name: 'newOtcDisc', type: 'uint64' },
    ],
    name: 'PersonalDiscRatesUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'user', type: 'address' },
      { indexed: false, internalType: 'uint64', name: 'newIMFactor', type: 'uint64' },
      { indexed: false, internalType: 'uint64', name: 'newMMFactor', type: 'uint64' },
    ],
    name: 'PersonalMarginConfigUpdated',
    type: 'event',
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
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { internalType: 'bool', name: 'isCancelAll', type: 'bool' },
      { internalType: 'OrderId[]', name: 'idsToCancel', type: 'uint64[]' },
    ],
    name: 'forceCancel',
    outputs: [
      { internalType: 'PayFee', name: 'payFee', type: 'uint256' },
      { internalType: 'OrderId[]', name: 'removedIds', type: 'uint64[]' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'MarketAcc', name: 'winningUser', type: 'bytes26' },
      { internalType: 'MarketAcc', name: 'losingUser', type: 'bytes26' },
      { internalType: 'int256', name: 'size', type: 'int256' },
    ],
    name: 'forceDeleverage',
    outputs: [
      { internalType: 'Trade', name: 'forcedTrade', type: 'uint256' },
      { internalType: 'PayFee', name: 'settleWinningUser', type: 'uint256' },
      { internalType: 'PayFee', name: 'settleLosingUser', type: 'uint256' },
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
    name: 'getMarkRate',
    outputs: [{ internalType: 'int256', name: '', type: 'int256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'Side', name: 'side', type: 'uint8' },
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
          { internalType: 'uint128', name: 'OICap', type: 'uint128' },
          { internalType: 'uint64', name: 'takerFee', type: 'uint64' },
          { internalType: 'uint64', name: 'otcFee', type: 'uint64' },
          {
            components: [
              { internalType: 'uint128', name: 'base', type: 'uint128' },
              { internalType: 'uint128', name: 'slope', type: 'uint128' },
            ],
            internalType: 'struct IMarketAllTypes.LiqIncentiveConfig',
            name: 'liqIncentive',
            type: 'tuple',
          },
          { internalType: 'uint64', name: 'IMFactor', type: 'uint64' },
          { internalType: 'uint64', name: 'MMFactor', type: 'uint64' },
          { internalType: 'uint128', name: 'minMarginIndexRate', type: 'uint128' },
          { internalType: 'uint32', name: 'minMarginIndexDuration', type: 'uint32' },
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
      { internalType: 'MarketAcc', name: 'liquidator', type: 'bytes26' },
      { internalType: 'MarketAcc', name: 'violator', type: 'bytes26' },
      { internalType: 'int256', name: 'sizeToLiquidator', type: 'int256' },
      { internalType: 'int256', name: 'healthRatio', type: 'int256' },
    ],
    name: 'liquidate',
    outputs: [
      {
        components: [
          { internalType: 'VMResult', name: 'preIMLiq', type: 'uint256' },
          { internalType: 'VMResult', name: 'postIMLiq', type: 'uint256' },
          { internalType: 'PayFee', name: 'prePayFeeLiq', type: 'uint256' },
          { internalType: 'PayFee', name: 'postPayFeeLiq', type: 'uint256' },
          { internalType: 'PayFee', name: 'totalPayFeeVio', type: 'uint256' },
          { internalType: 'Trade', name: 'liqTrade', type: 'uint256' },
          { internalType: 'uint256', name: 'liqFee', type: 'uint256' },
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
      { internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      {
        components: [
          { internalType: 'enum TimeInForce', name: 'tif', type: 'uint8' },
          { internalType: 'Side', name: 'side', type: 'uint8' },
          { internalType: 'uint256[]', name: 'sizes', type: 'uint256[]' },
          { internalType: 'int16[]', name: 'limitTicks', type: 'int16[]' },
          { internalType: 'OrderId[]', name: 'idsToCancel', type: 'uint64[]' },
          { internalType: 'bool', name: 'isCancelAll', type: 'bool' },
          { internalType: 'bool', name: 'isStrictCancel', type: 'bool' },
        ],
        internalType: 'struct LongShort',
        name: 'orders',
        type: 'tuple',
      },
      {
        components: [
          { internalType: 'Trade', name: 'trade', type: 'uint256' },
          { internalType: 'MarketAcc', name: 'counter', type: 'bytes26' },
        ],
        internalType: 'struct OTCTrade[]',
        name: 'OTCs',
        type: 'tuple[]',
      },
    ],
    name: 'orderAndOtc',
    outputs: [
      {
        components: [
          { internalType: 'VMResult[]', name: 'preIM', type: 'uint256[]' },
          { internalType: 'VMResult[]', name: 'postIM', type: 'uint256[]' },
          { internalType: 'PayFee[]', name: 'prePayFee', type: 'uint256[]' },
          { internalType: 'PayFee[]', name: 'postPayFee', type: 'uint256[]' },
          { internalType: 'Trade', name: 'bookMatched', type: 'uint256' },
          { internalType: 'MarketAcc', name: 'extraUser', type: 'bytes26' },
          { internalType: 'PayFee', name: 'extraSettle', type: 'uint256' },
          { internalType: 'OrderId[]', name: 'removedIds', type: 'uint64[]' },
          { internalType: 'uint256', name: 'totalTakerFee', type: 'uint256' },
          { internalType: 'uint256', name: 'totalOtcFee', type: 'uint256' },
        ],
        internalType: 'struct MainResult',
        name: 'res',
        type: 'tuple',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint32', name: 'newWindow', type: 'uint32' }],
    name: 'setImpliedRateObservationWindow',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'uint16', name: 'maxOpenOrders', type: 'uint16' },
          { internalType: 'address', name: 'markRateOracle', type: 'address' },
          { internalType: 'address', name: 'fIndexOracle', type: 'address' },
          { internalType: 'uint128', name: 'OICap', type: 'uint128' },
          { internalType: 'uint64', name: 'takerFee', type: 'uint64' },
          { internalType: 'uint64', name: 'otcFee', type: 'uint64' },
          {
            components: [
              { internalType: 'uint128', name: 'base', type: 'uint128' },
              { internalType: 'uint128', name: 'slope', type: 'uint128' },
            ],
            internalType: 'struct IMarketAllTypes.LiqIncentiveConfig',
            name: 'liqIncentive',
            type: 'tuple',
          },
          { internalType: 'uint64', name: 'IMFactor', type: 'uint64' },
          { internalType: 'uint64', name: 'MMFactor', type: 'uint64' },
          { internalType: 'uint128', name: 'minMarginIndexRate', type: 'uint128' },
          { internalType: 'uint32', name: 'minMarginIndexDuration', type: 'uint32' },
        ],
        internalType: 'struct IMarketAllTypes.MarketConfigStruct',
        name: 'config',
        type: 'tuple',
      },
    ],
    name: 'setMarketConfig',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'user', type: 'address' },
      { internalType: 'uint64', name: 'takerDisc', type: 'uint64' },
      { internalType: 'uint64', name: 'otcDisc', type: 'uint64' },
    ],
    name: 'setPersonalDiscRates',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'user', type: 'address' },
      { internalType: 'uint64', name: 'IMFactor', type: 'uint64' },
      { internalType: 'uint64', name: 'MMFactor', type: 'uint64' },
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
    inputs: [{ indexed: false, internalType: 'FIndex', name: 'newIndex', type: 'bytes26' }],
    name: 'FIndexUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: false, internalType: 'bool', name: 'isCancelAll', type: 'bool' },
      { indexed: false, internalType: 'OrderId[]', name: 'removedIds', type: 'uint64[]' },
    ],
    name: 'ForceCancel',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'winningUser', type: 'bytes26' },
      { indexed: false, internalType: 'MarketAcc', name: 'losingUser', type: 'bytes26' },
      { indexed: false, internalType: 'Trade', name: 'trade', type: 'uint256' },
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
      { indexed: false, internalType: 'OrderId', name: 'from', type: 'uint64' },
      { indexed: false, internalType: 'OrderId', name: 'to', type: 'uint64' },
    ],
    name: 'LimitOrderFilled',
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
      { indexed: false, internalType: 'MarketAcc', name: 'liquidator', type: 'bytes26' },
      { indexed: false, internalType: 'MarketAcc', name: 'violator', type: 'bytes26' },
      { indexed: false, internalType: 'Trade', name: 'liqTrade', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'fees', type: 'uint256' },
    ],
    name: 'Liquidate',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        components: [
          { internalType: 'uint16', name: 'maxOpenOrders', type: 'uint16' },
          { internalType: 'address', name: 'markRateOracle', type: 'address' },
          { internalType: 'address', name: 'fIndexOracle', type: 'address' },
          { internalType: 'uint128', name: 'OICap', type: 'uint128' },
          { internalType: 'uint64', name: 'takerFee', type: 'uint64' },
          { internalType: 'uint64', name: 'otcFee', type: 'uint64' },
          {
            components: [
              { internalType: 'uint128', name: 'base', type: 'uint128' },
              { internalType: 'uint128', name: 'slope', type: 'uint128' },
            ],
            internalType: 'struct IMarketAllTypes.LiqIncentiveConfig',
            name: 'liqIncentive',
            type: 'tuple',
          },
          { internalType: 'uint64', name: 'IMFactor', type: 'uint64' },
          { internalType: 'uint64', name: 'MMFactor', type: 'uint64' },
          { internalType: 'uint128', name: 'minMarginIndexRate', type: 'uint128' },
          { internalType: 'uint32', name: 'minMarginIndexDuration', type: 'uint32' },
        ],
        indexed: false,
        internalType: 'struct IMarketAllTypes.MarketConfigStruct',
        name: 'newConfig',
        type: 'tuple',
      },
    ],
    name: 'MarketConfigUpdated',
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
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: false, internalType: 'MarketAcc', name: 'counterParty', type: 'bytes26' },
      { indexed: false, internalType: 'Trade', name: 'trade', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'fees', type: 'uint256' },
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
      { indexed: true, internalType: 'address', name: 'user', type: 'address' },
      { indexed: false, internalType: 'uint64', name: 'newTakerDisc', type: 'uint64' },
      { indexed: false, internalType: 'uint64', name: 'newOtcDisc', type: 'uint64' },
    ],
    name: 'PersonalDiscRatesUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'user', type: 'address' },
      { indexed: false, internalType: 'uint64', name: 'newIMFactor', type: 'uint64' },
      { indexed: false, internalType: 'uint64', name: 'newMMFactor', type: 'uint64' },
    ],
    name: 'PersonalMarginConfigUpdated',
    type: 'event',
  },
  {
    inputs: [
      { internalType: 'MarketAcc', name: 'violator', type: 'bytes26' },
      { internalType: 'int256', name: 'sizeToLiquidator', type: 'int256' },
      { internalType: 'int256', name: 'healthRatio', type: 'int256' },
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
      { internalType: 'uint32', name: 'startCheckTime', type: 'uint32' },
      { internalType: 'int16', name: 'tick', type: 'int16' },
      { internalType: 'bool', name: 'toHaveRecentGte', type: 'bool' },
    ],
    name: 'checkStopTick',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
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
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { internalType: 'bool', name: 'isCancelAll', type: 'bool' },
      { internalType: 'OrderId[]', name: 'idsToCancel', type: 'uint64[]' },
    ],
    name: 'forceCancel',
    outputs: [
      { internalType: 'PayFee', name: 'payFee', type: 'uint256' },
      { internalType: 'OrderId[]', name: 'removedIds', type: 'uint64[]' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'MarketAcc', name: 'winningUser', type: 'bytes26' },
      { internalType: 'MarketAcc', name: 'losingUser', type: 'bytes26' },
      { internalType: 'int256', name: 'size', type: 'int256' },
    ],
    name: 'forceDeleverage',
    outputs: [
      { internalType: 'Trade', name: 'forcedTrade', type: 'uint256' },
      { internalType: 'PayFee', name: 'settleWinningUser', type: 'uint256' },
      { internalType: 'PayFee', name: 'settleLosingUser', type: 'uint256' },
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
    inputs: [{ internalType: 'MarketAcc', name: 'user', type: 'bytes26' }],
    name: 'getMarginFactor',
    outputs: [
      { internalType: 'uint64', name: 'IMFactor', type: 'uint64' },
      { internalType: 'uint64', name: 'MMFactor', type: 'uint64' },
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
          { internalType: 'uint128', name: 'OICap', type: 'uint128' },
          { internalType: 'uint64', name: 'takerFee', type: 'uint64' },
          { internalType: 'uint64', name: 'otcFee', type: 'uint64' },
          {
            components: [
              { internalType: 'uint128', name: 'base', type: 'uint128' },
              { internalType: 'uint128', name: 'slope', type: 'uint128' },
            ],
            internalType: 'struct IMarketAllTypes.LiqIncentiveConfig',
            name: 'liqIncentive',
            type: 'tuple',
          },
          { internalType: 'uint64', name: 'IMFactor', type: 'uint64' },
          { internalType: 'uint64', name: 'MMFactor', type: 'uint64' },
          { internalType: 'uint128', name: 'minMarginIndexRate', type: 'uint128' },
          { internalType: 'uint32', name: 'minMarginIndexDuration', type: 'uint32' },
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
      { internalType: 'Side', name: 'side', type: 'uint8' },
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
      { internalType: 'Side', name: 'side', type: 'uint8' },
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
          { internalType: 'uint128', name: 'OICap', type: 'uint128' },
          { internalType: 'uint64', name: 'takerFee', type: 'uint64' },
          { internalType: 'uint64', name: 'otcFee', type: 'uint64' },
          {
            components: [
              { internalType: 'uint128', name: 'base', type: 'uint128' },
              { internalType: 'uint128', name: 'slope', type: 'uint128' },
            ],
            internalType: 'struct IMarketAllTypes.LiqIncentiveConfig',
            name: 'liqIncentive',
            type: 'tuple',
          },
          { internalType: 'uint64', name: 'IMFactor', type: 'uint64' },
          { internalType: 'uint64', name: 'MMFactor', type: 'uint64' },
          { internalType: 'uint128', name: 'minMarginIndexRate', type: 'uint128' },
          { internalType: 'uint32', name: 'minMarginIndexDuration', type: 'uint32' },
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
      { internalType: 'MarketAcc', name: 'liquidator', type: 'bytes26' },
      { internalType: 'MarketAcc', name: 'violator', type: 'bytes26' },
      { internalType: 'int256', name: 'sizeToLiquidator', type: 'int256' },
      { internalType: 'int256', name: 'healthRatio', type: 'int256' },
    ],
    name: 'liquidate',
    outputs: [
      {
        components: [
          { internalType: 'VMResult', name: 'preIMLiq', type: 'uint256' },
          { internalType: 'VMResult', name: 'postIMLiq', type: 'uint256' },
          { internalType: 'PayFee', name: 'prePayFeeLiq', type: 'uint256' },
          { internalType: 'PayFee', name: 'postPayFeeLiq', type: 'uint256' },
          { internalType: 'PayFee', name: 'totalPayFeeVio', type: 'uint256' },
          { internalType: 'Trade', name: 'liqTrade', type: 'uint256' },
          { internalType: 'uint256', name: 'liqFee', type: 'uint256' },
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
      { internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      {
        components: [
          { internalType: 'enum TimeInForce', name: 'tif', type: 'uint8' },
          { internalType: 'Side', name: 'side', type: 'uint8' },
          { internalType: 'uint256[]', name: 'sizes', type: 'uint256[]' },
          { internalType: 'int16[]', name: 'limitTicks', type: 'int16[]' },
          { internalType: 'OrderId[]', name: 'idsToCancel', type: 'uint64[]' },
          { internalType: 'bool', name: 'isCancelAll', type: 'bool' },
          { internalType: 'bool', name: 'isStrictCancel', type: 'bool' },
        ],
        internalType: 'struct LongShort',
        name: 'orders',
        type: 'tuple',
      },
      {
        components: [
          { internalType: 'Trade', name: 'trade', type: 'uint256' },
          { internalType: 'MarketAcc', name: 'counter', type: 'bytes26' },
        ],
        internalType: 'struct OTCTrade[]',
        name: 'OTCs',
        type: 'tuple[]',
      },
    ],
    name: 'orderAndOtc',
    outputs: [
      {
        components: [
          { internalType: 'VMResult[]', name: 'preIM', type: 'uint256[]' },
          { internalType: 'VMResult[]', name: 'postIM', type: 'uint256[]' },
          { internalType: 'PayFee[]', name: 'prePayFee', type: 'uint256[]' },
          { internalType: 'PayFee[]', name: 'postPayFee', type: 'uint256[]' },
          { internalType: 'Trade', name: 'bookMatched', type: 'uint256' },
          { internalType: 'MarketAcc', name: 'extraUser', type: 'bytes26' },
          { internalType: 'PayFee', name: 'extraSettle', type: 'uint256' },
          { internalType: 'OrderId[]', name: 'removedIds', type: 'uint64[]' },
          { internalType: 'uint256', name: 'totalTakerFee', type: 'uint256' },
          { internalType: 'uint256', name: 'totalOtcFee', type: 'uint256' },
        ],
        internalType: 'struct MainResult',
        name: 'res',
        type: 'tuple',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint32', name: 'newWindow', type: 'uint32' }],
    name: 'setImpliedRateObservationWindow',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'uint16', name: 'maxOpenOrders', type: 'uint16' },
          { internalType: 'address', name: 'markRateOracle', type: 'address' },
          { internalType: 'address', name: 'fIndexOracle', type: 'address' },
          { internalType: 'uint128', name: 'OICap', type: 'uint128' },
          { internalType: 'uint64', name: 'takerFee', type: 'uint64' },
          { internalType: 'uint64', name: 'otcFee', type: 'uint64' },
          {
            components: [
              { internalType: 'uint128', name: 'base', type: 'uint128' },
              { internalType: 'uint128', name: 'slope', type: 'uint128' },
            ],
            internalType: 'struct IMarketAllTypes.LiqIncentiveConfig',
            name: 'liqIncentive',
            type: 'tuple',
          },
          { internalType: 'uint64', name: 'IMFactor', type: 'uint64' },
          { internalType: 'uint64', name: 'MMFactor', type: 'uint64' },
          { internalType: 'uint128', name: 'minMarginIndexRate', type: 'uint128' },
          { internalType: 'uint32', name: 'minMarginIndexDuration', type: 'uint32' },
        ],
        internalType: 'struct IMarketAllTypes.MarketConfigStruct',
        name: 'config',
        type: 'tuple',
      },
    ],
    name: 'setMarketConfig',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'user', type: 'address' },
      { internalType: 'uint64', name: 'takerDisc', type: 'uint64' },
      { internalType: 'uint64', name: 'otcDisc', type: 'uint64' },
    ],
    name: 'setPersonalDiscRates',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'user', type: 'address' },
      { internalType: 'uint64', name: 'IMFactor', type: 'uint64' },
      { internalType: 'uint64', name: 'MMFactor', type: 'uint64' },
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
    inputs: [{ indexed: false, internalType: 'FIndex', name: 'newIndex', type: 'bytes26' }],
    name: 'FIndexUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: false, internalType: 'bool', name: 'isCancelAll', type: 'bool' },
      { indexed: false, internalType: 'OrderId[]', name: 'removedIds', type: 'uint64[]' },
    ],
    name: 'ForceCancel',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'winningUser', type: 'bytes26' },
      { indexed: false, internalType: 'MarketAcc', name: 'losingUser', type: 'bytes26' },
      { indexed: false, internalType: 'Trade', name: 'trade', type: 'uint256' },
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
      { indexed: false, internalType: 'OrderId', name: 'from', type: 'uint64' },
      { indexed: false, internalType: 'OrderId', name: 'to', type: 'uint64' },
    ],
    name: 'LimitOrderFilled',
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
      { indexed: false, internalType: 'MarketAcc', name: 'liquidator', type: 'bytes26' },
      { indexed: false, internalType: 'MarketAcc', name: 'violator', type: 'bytes26' },
      { indexed: false, internalType: 'Trade', name: 'liqTrade', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'fees', type: 'uint256' },
    ],
    name: 'Liquidate',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        components: [
          { internalType: 'uint16', name: 'maxOpenOrders', type: 'uint16' },
          { internalType: 'address', name: 'markRateOracle', type: 'address' },
          { internalType: 'address', name: 'fIndexOracle', type: 'address' },
          { internalType: 'uint128', name: 'OICap', type: 'uint128' },
          { internalType: 'uint64', name: 'takerFee', type: 'uint64' },
          { internalType: 'uint64', name: 'otcFee', type: 'uint64' },
          {
            components: [
              { internalType: 'uint128', name: 'base', type: 'uint128' },
              { internalType: 'uint128', name: 'slope', type: 'uint128' },
            ],
            internalType: 'struct IMarketAllTypes.LiqIncentiveConfig',
            name: 'liqIncentive',
            type: 'tuple',
          },
          { internalType: 'uint64', name: 'IMFactor', type: 'uint64' },
          { internalType: 'uint64', name: 'MMFactor', type: 'uint64' },
          { internalType: 'uint128', name: 'minMarginIndexRate', type: 'uint128' },
          { internalType: 'uint32', name: 'minMarginIndexDuration', type: 'uint32' },
        ],
        indexed: false,
        internalType: 'struct IMarketAllTypes.MarketConfigStruct',
        name: 'newConfig',
        type: 'tuple',
      },
    ],
    name: 'MarketConfigUpdated',
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
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: false, internalType: 'MarketAcc', name: 'counterParty', type: 'bytes26' },
      { indexed: false, internalType: 'Trade', name: 'trade', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'fees', type: 'uint256' },
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
      { indexed: true, internalType: 'address', name: 'user', type: 'address' },
      { indexed: false, internalType: 'uint64', name: 'newTakerDisc', type: 'uint64' },
      { indexed: false, internalType: 'uint64', name: 'newOtcDisc', type: 'uint64' },
    ],
    name: 'PersonalDiscRatesUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'user', type: 'address' },
      { indexed: false, internalType: 'uint64', name: 'newIMFactor', type: 'uint64' },
      { indexed: false, internalType: 'uint64', name: 'newMMFactor', type: 'uint64' },
    ],
    name: 'PersonalMarginConfigUpdated',
    type: 'event',
  },
  {
    inputs: [
      { internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      {
        components: [
          { internalType: 'enum TimeInForce', name: 'tif', type: 'uint8' },
          { internalType: 'Side', name: 'side', type: 'uint8' },
          { internalType: 'uint256[]', name: 'sizes', type: 'uint256[]' },
          { internalType: 'int16[]', name: 'limitTicks', type: 'int16[]' },
          { internalType: 'OrderId[]', name: 'idsToCancel', type: 'uint64[]' },
          { internalType: 'bool', name: 'isCancelAll', type: 'bool' },
          { internalType: 'bool', name: 'isStrictCancel', type: 'bool' },
        ],
        internalType: 'struct LongShort',
        name: 'orders',
        type: 'tuple',
      },
      {
        components: [
          { internalType: 'Trade', name: 'trade', type: 'uint256' },
          { internalType: 'MarketAcc', name: 'counter', type: 'bytes26' },
        ],
        internalType: 'struct OTCTrade[]',
        name: 'OTCs',
        type: 'tuple[]',
      },
    ],
    name: 'orderAndOtc',
    outputs: [
      {
        components: [
          { internalType: 'VMResult[]', name: 'preIM', type: 'uint256[]' },
          { internalType: 'VMResult[]', name: 'postIM', type: 'uint256[]' },
          { internalType: 'PayFee[]', name: 'prePayFee', type: 'uint256[]' },
          { internalType: 'PayFee[]', name: 'postPayFee', type: 'uint256[]' },
          { internalType: 'Trade', name: 'bookMatched', type: 'uint256' },
          { internalType: 'MarketAcc', name: 'extraUser', type: 'bytes26' },
          { internalType: 'PayFee', name: 'extraSettle', type: 'uint256' },
          { internalType: 'OrderId[]', name: 'removedIds', type: 'uint64[]' },
          { internalType: 'uint256', name: 'totalTakerFee', type: 'uint256' },
          { internalType: 'uint256', name: 'totalOtcFee', type: 'uint256' },
        ],
        internalType: 'struct MainResult',
        name: 'res',
        type: 'tuple',
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
    inputs: [{ indexed: false, internalType: 'FIndex', name: 'newIndex', type: 'bytes26' }],
    name: 'FIndexUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: false, internalType: 'bool', name: 'isCancelAll', type: 'bool' },
      { indexed: false, internalType: 'OrderId[]', name: 'removedIds', type: 'uint64[]' },
    ],
    name: 'ForceCancel',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'winningUser', type: 'bytes26' },
      { indexed: false, internalType: 'MarketAcc', name: 'losingUser', type: 'bytes26' },
      { indexed: false, internalType: 'Trade', name: 'trade', type: 'uint256' },
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
      { indexed: false, internalType: 'OrderId', name: 'from', type: 'uint64' },
      { indexed: false, internalType: 'OrderId', name: 'to', type: 'uint64' },
    ],
    name: 'LimitOrderFilled',
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
      { indexed: false, internalType: 'MarketAcc', name: 'liquidator', type: 'bytes26' },
      { indexed: false, internalType: 'MarketAcc', name: 'violator', type: 'bytes26' },
      { indexed: false, internalType: 'Trade', name: 'liqTrade', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'fees', type: 'uint256' },
    ],
    name: 'Liquidate',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        components: [
          { internalType: 'uint16', name: 'maxOpenOrders', type: 'uint16' },
          { internalType: 'address', name: 'markRateOracle', type: 'address' },
          { internalType: 'address', name: 'fIndexOracle', type: 'address' },
          { internalType: 'uint128', name: 'OICap', type: 'uint128' },
          { internalType: 'uint64', name: 'takerFee', type: 'uint64' },
          { internalType: 'uint64', name: 'otcFee', type: 'uint64' },
          {
            components: [
              { internalType: 'uint128', name: 'base', type: 'uint128' },
              { internalType: 'uint128', name: 'slope', type: 'uint128' },
            ],
            internalType: 'struct IMarketAllTypes.LiqIncentiveConfig',
            name: 'liqIncentive',
            type: 'tuple',
          },
          { internalType: 'uint64', name: 'IMFactor', type: 'uint64' },
          { internalType: 'uint64', name: 'MMFactor', type: 'uint64' },
          { internalType: 'uint128', name: 'minMarginIndexRate', type: 'uint128' },
          { internalType: 'uint32', name: 'minMarginIndexDuration', type: 'uint32' },
        ],
        indexed: false,
        internalType: 'struct IMarketAllTypes.MarketConfigStruct',
        name: 'newConfig',
        type: 'tuple',
      },
    ],
    name: 'MarketConfigUpdated',
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
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: false, internalType: 'MarketAcc', name: 'counterParty', type: 'bytes26' },
      { indexed: false, internalType: 'Trade', name: 'trade', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'fees', type: 'uint256' },
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
      { indexed: true, internalType: 'address', name: 'user', type: 'address' },
      { indexed: false, internalType: 'uint64', name: 'newTakerDisc', type: 'uint64' },
      { indexed: false, internalType: 'uint64', name: 'newOtcDisc', type: 'uint64' },
    ],
    name: 'PersonalDiscRatesUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'user', type: 'address' },
      { indexed: false, internalType: 'uint64', name: 'newIMFactor', type: 'uint64' },
      { indexed: false, internalType: 'uint64', name: 'newMMFactor', type: 'uint64' },
    ],
    name: 'PersonalMarginConfigUpdated',
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
          { internalType: 'uint128', name: 'OICap', type: 'uint128' },
          { internalType: 'uint64', name: 'takerFee', type: 'uint64' },
          { internalType: 'uint64', name: 'otcFee', type: 'uint64' },
          {
            components: [
              { internalType: 'uint128', name: 'base', type: 'uint128' },
              { internalType: 'uint128', name: 'slope', type: 'uint128' },
            ],
            internalType: 'struct IMarketAllTypes.LiqIncentiveConfig',
            name: 'liqIncentive',
            type: 'tuple',
          },
          { internalType: 'uint64', name: 'IMFactor', type: 'uint64' },
          { internalType: 'uint64', name: 'MMFactor', type: 'uint64' },
          { internalType: 'uint128', name: 'minMarginIndexRate', type: 'uint128' },
          { internalType: 'uint32', name: 'minMarginIndexDuration', type: 'uint32' },
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
    inputs: [{ internalType: 'uint32', name: 'newWindow', type: 'uint32' }],
    name: 'setImpliedRateObservationWindow',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'uint16', name: 'maxOpenOrders', type: 'uint16' },
          { internalType: 'address', name: 'markRateOracle', type: 'address' },
          { internalType: 'address', name: 'fIndexOracle', type: 'address' },
          { internalType: 'uint128', name: 'OICap', type: 'uint128' },
          { internalType: 'uint64', name: 'takerFee', type: 'uint64' },
          { internalType: 'uint64', name: 'otcFee', type: 'uint64' },
          {
            components: [
              { internalType: 'uint128', name: 'base', type: 'uint128' },
              { internalType: 'uint128', name: 'slope', type: 'uint128' },
            ],
            internalType: 'struct IMarketAllTypes.LiqIncentiveConfig',
            name: 'liqIncentive',
            type: 'tuple',
          },
          { internalType: 'uint64', name: 'IMFactor', type: 'uint64' },
          { internalType: 'uint64', name: 'MMFactor', type: 'uint64' },
          { internalType: 'uint128', name: 'minMarginIndexRate', type: 'uint128' },
          { internalType: 'uint32', name: 'minMarginIndexDuration', type: 'uint32' },
        ],
        internalType: 'struct IMarketAllTypes.MarketConfigStruct',
        name: 'config',
        type: 'tuple',
      },
    ],
    name: 'setMarketConfig',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'user', type: 'address' },
      { internalType: 'uint64', name: 'takerDisc', type: 'uint64' },
      { internalType: 'uint64', name: 'otcDisc', type: 'uint64' },
    ],
    name: 'setPersonalDiscRates',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'user', type: 'address' },
      { internalType: 'uint64', name: 'IMFactor', type: 'uint64' },
      { internalType: 'uint64', name: 'MMFactor', type: 'uint64' },
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
// IMarketEntry
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iMarketEntryAbi = [
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'FIndex', name: 'newIndex', type: 'bytes26' }],
    name: 'FIndexUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: false, internalType: 'bool', name: 'isCancelAll', type: 'bool' },
      { indexed: false, internalType: 'OrderId[]', name: 'removedIds', type: 'uint64[]' },
    ],
    name: 'ForceCancel',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'winningUser', type: 'bytes26' },
      { indexed: false, internalType: 'MarketAcc', name: 'losingUser', type: 'bytes26' },
      { indexed: false, internalType: 'Trade', name: 'trade', type: 'uint256' },
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
      { indexed: false, internalType: 'OrderId', name: 'from', type: 'uint64' },
      { indexed: false, internalType: 'OrderId', name: 'to', type: 'uint64' },
    ],
    name: 'LimitOrderFilled',
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
      { indexed: false, internalType: 'MarketAcc', name: 'liquidator', type: 'bytes26' },
      { indexed: false, internalType: 'MarketAcc', name: 'violator', type: 'bytes26' },
      { indexed: false, internalType: 'Trade', name: 'liqTrade', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'fees', type: 'uint256' },
    ],
    name: 'Liquidate',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        components: [
          { internalType: 'uint16', name: 'maxOpenOrders', type: 'uint16' },
          { internalType: 'address', name: 'markRateOracle', type: 'address' },
          { internalType: 'address', name: 'fIndexOracle', type: 'address' },
          { internalType: 'uint128', name: 'OICap', type: 'uint128' },
          { internalType: 'uint64', name: 'takerFee', type: 'uint64' },
          { internalType: 'uint64', name: 'otcFee', type: 'uint64' },
          {
            components: [
              { internalType: 'uint128', name: 'base', type: 'uint128' },
              { internalType: 'uint128', name: 'slope', type: 'uint128' },
            ],
            internalType: 'struct IMarketAllTypes.LiqIncentiveConfig',
            name: 'liqIncentive',
            type: 'tuple',
          },
          { internalType: 'uint64', name: 'IMFactor', type: 'uint64' },
          { internalType: 'uint64', name: 'MMFactor', type: 'uint64' },
          { internalType: 'uint128', name: 'minMarginIndexRate', type: 'uint128' },
          { internalType: 'uint32', name: 'minMarginIndexDuration', type: 'uint32' },
        ],
        indexed: false,
        internalType: 'struct IMarketAllTypes.MarketConfigStruct',
        name: 'newConfig',
        type: 'tuple',
      },
    ],
    name: 'MarketConfigUpdated',
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
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: false, internalType: 'MarketAcc', name: 'counterParty', type: 'bytes26' },
      { indexed: false, internalType: 'Trade', name: 'trade', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'fees', type: 'uint256' },
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
      { indexed: true, internalType: 'address', name: 'user', type: 'address' },
      { indexed: false, internalType: 'uint64', name: 'newTakerDisc', type: 'uint64' },
      { indexed: false, internalType: 'uint64', name: 'newOtcDisc', type: 'uint64' },
    ],
    name: 'PersonalDiscRatesUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'user', type: 'address' },
      { indexed: false, internalType: 'uint64', name: 'newIMFactor', type: 'uint64' },
      { indexed: false, internalType: 'uint64', name: 'newMMFactor', type: 'uint64' },
    ],
    name: 'PersonalMarginConfigUpdated',
    type: 'event',
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
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { internalType: 'bool', name: 'isCancelAll', type: 'bool' },
      { internalType: 'OrderId[]', name: 'idsToCancel', type: 'uint64[]' },
    ],
    name: 'forceCancel',
    outputs: [
      { internalType: 'PayFee', name: 'payFee', type: 'uint256' },
      { internalType: 'OrderId[]', name: 'removedIds', type: 'uint64[]' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'MarketAcc', name: 'winningUser', type: 'bytes26' },
      { internalType: 'MarketAcc', name: 'losingUser', type: 'bytes26' },
      { internalType: 'int256', name: 'size', type: 'int256' },
    ],
    name: 'forceDeleverage',
    outputs: [
      { internalType: 'Trade', name: 'forcedTrade', type: 'uint256' },
      { internalType: 'PayFee', name: 'settleWinningUser', type: 'uint256' },
      { internalType: 'PayFee', name: 'settleLosingUser', type: 'uint256' },
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
    name: 'getMarkRate',
    outputs: [{ internalType: 'int256', name: '', type: 'int256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'Side', name: 'side', type: 'uint8' },
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
      { internalType: 'MarketAcc', name: 'liquidator', type: 'bytes26' },
      { internalType: 'MarketAcc', name: 'violator', type: 'bytes26' },
      { internalType: 'int256', name: 'sizeToLiquidator', type: 'int256' },
      { internalType: 'int256', name: 'healthRatio', type: 'int256' },
    ],
    name: 'liquidate',
    outputs: [
      {
        components: [
          { internalType: 'VMResult', name: 'preIMLiq', type: 'uint256' },
          { internalType: 'VMResult', name: 'postIMLiq', type: 'uint256' },
          { internalType: 'PayFee', name: 'prePayFeeLiq', type: 'uint256' },
          { internalType: 'PayFee', name: 'postPayFeeLiq', type: 'uint256' },
          { internalType: 'PayFee', name: 'totalPayFeeVio', type: 'uint256' },
          { internalType: 'Trade', name: 'liqTrade', type: 'uint256' },
          { internalType: 'uint256', name: 'liqFee', type: 'uint256' },
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
      { internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { internalType: 'enum GetRequest', name: 'getType', type: 'uint8' },
    ],
    name: 'settleAndGet',
    outputs: [
      { internalType: 'VMResult', name: 'res', type: 'uint256' },
      { internalType: 'PayFee', name: 'payFee', type: 'uint256' },
      { internalType: 'int256', name: 'signedSize', type: 'int256' },
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
    inputs: [{ indexed: false, internalType: 'FIndex', name: 'newIndex', type: 'bytes26' }],
    name: 'FIndexUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: false, internalType: 'bool', name: 'isCancelAll', type: 'bool' },
      { indexed: false, internalType: 'OrderId[]', name: 'removedIds', type: 'uint64[]' },
    ],
    name: 'ForceCancel',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'winningUser', type: 'bytes26' },
      { indexed: false, internalType: 'MarketAcc', name: 'losingUser', type: 'bytes26' },
      { indexed: false, internalType: 'Trade', name: 'trade', type: 'uint256' },
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
      { indexed: false, internalType: 'OrderId', name: 'from', type: 'uint64' },
      { indexed: false, internalType: 'OrderId', name: 'to', type: 'uint64' },
    ],
    name: 'LimitOrderFilled',
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
      { indexed: false, internalType: 'MarketAcc', name: 'liquidator', type: 'bytes26' },
      { indexed: false, internalType: 'MarketAcc', name: 'violator', type: 'bytes26' },
      { indexed: false, internalType: 'Trade', name: 'liqTrade', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'fees', type: 'uint256' },
    ],
    name: 'Liquidate',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        components: [
          { internalType: 'uint16', name: 'maxOpenOrders', type: 'uint16' },
          { internalType: 'address', name: 'markRateOracle', type: 'address' },
          { internalType: 'address', name: 'fIndexOracle', type: 'address' },
          { internalType: 'uint128', name: 'OICap', type: 'uint128' },
          { internalType: 'uint64', name: 'takerFee', type: 'uint64' },
          { internalType: 'uint64', name: 'otcFee', type: 'uint64' },
          {
            components: [
              { internalType: 'uint128', name: 'base', type: 'uint128' },
              { internalType: 'uint128', name: 'slope', type: 'uint128' },
            ],
            internalType: 'struct IMarketAllTypes.LiqIncentiveConfig',
            name: 'liqIncentive',
            type: 'tuple',
          },
          { internalType: 'uint64', name: 'IMFactor', type: 'uint64' },
          { internalType: 'uint64', name: 'MMFactor', type: 'uint64' },
          { internalType: 'uint128', name: 'minMarginIndexRate', type: 'uint128' },
          { internalType: 'uint32', name: 'minMarginIndexDuration', type: 'uint32' },
        ],
        indexed: false,
        internalType: 'struct IMarketAllTypes.MarketConfigStruct',
        name: 'newConfig',
        type: 'tuple',
      },
    ],
    name: 'MarketConfigUpdated',
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
    inputs: [
      { indexed: false, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: false, internalType: 'MarketAcc', name: 'counterParty', type: 'bytes26' },
      { indexed: false, internalType: 'Trade', name: 'trade', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'fees', type: 'uint256' },
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
      { indexed: true, internalType: 'address', name: 'user', type: 'address' },
      { indexed: false, internalType: 'uint64', name: 'newTakerDisc', type: 'uint64' },
      { indexed: false, internalType: 'uint64', name: 'newOtcDisc', type: 'uint64' },
    ],
    name: 'PersonalDiscRatesUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'user', type: 'address' },
      { indexed: false, internalType: 'uint64', name: 'newIMFactor', type: 'uint64' },
      { indexed: false, internalType: 'uint64', name: 'newMMFactor', type: 'uint64' },
    ],
    name: 'PersonalMarginConfigUpdated',
    type: 'event',
  },
  {
    inputs: [
      { internalType: 'MarketAcc', name: 'violator', type: 'bytes26' },
      { internalType: 'int256', name: 'sizeToLiquidator', type: 'int256' },
      { internalType: 'int256', name: 'healthRatio', type: 'int256' },
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
      { internalType: 'uint32', name: 'startCheckTime', type: 'uint32' },
      { internalType: 'int16', name: 'tick', type: 'int16' },
      { internalType: 'bool', name: 'toHaveRecentGte', type: 'bool' },
    ],
    name: 'checkStopTick',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
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
    name: 'getMarginFactor',
    outputs: [
      { internalType: 'uint64', name: 'IMFactor', type: 'uint64' },
      { internalType: 'uint64', name: 'MMFactor', type: 'uint64' },
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
          { internalType: 'uint128', name: 'OICap', type: 'uint128' },
          { internalType: 'uint64', name: 'takerFee', type: 'uint64' },
          { internalType: 'uint64', name: 'otcFee', type: 'uint64' },
          {
            components: [
              { internalType: 'uint128', name: 'base', type: 'uint128' },
              { internalType: 'uint128', name: 'slope', type: 'uint128' },
            ],
            internalType: 'struct IMarketAllTypes.LiqIncentiveConfig',
            name: 'liqIncentive',
            type: 'tuple',
          },
          { internalType: 'uint64', name: 'IMFactor', type: 'uint64' },
          { internalType: 'uint64', name: 'MMFactor', type: 'uint64' },
          { internalType: 'uint128', name: 'minMarginIndexRate', type: 'uint128' },
          { internalType: 'uint32', name: 'minMarginIndexDuration', type: 'uint32' },
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
      { internalType: 'Side', name: 'side', type: 'uint8' },
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
    inputs: [{ internalType: 'contract IMarketOff', name: 'market', type: 'address' }],
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
      { internalType: 'contract IMarketOff', name: 'market', type: 'address' },
      { internalType: 'Side', name: 'side', type: 'uint8' },
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
              { internalType: 'address', name: 'market', type: 'address' },
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
      { internalType: 'contract IMarketOff', name: 'market', type: 'address' },
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
              { internalType: 'address', name: 'market', type: 'address' },
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
              { internalType: 'address', name: 'market', type: 'address' },
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
      { internalType: 'contract IMarketOff', name: 'market', type: 'address' },
      { internalType: 'bool', name: 'useAmm', type: 'bool' },
      { internalType: 'Side', name: 'side', type: 'uint8' },
      { internalType: 'enum TimeInForce', name: 'tif', type: 'uint8' },
      { internalType: 'uint256', name: 'size', type: 'uint256' },
      { internalType: 'int16', name: 'tick', type: 'int16' },
    ],
    name: 'getUserInfoAfterPlaceOrder',
    outputs: [
      {
        components: [
          { internalType: 'int256', name: 'totalCash', type: 'int256' },
          {
            components: [
              { internalType: 'address', name: 'market', type: 'address' },
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
              { internalType: 'address', name: 'market', type: 'address' },
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
      { indexed: true, internalType: 'address', name: 'ammAddr', type: 'address' },
      { indexed: false, internalType: 'int256', name: 'exactSizeIn', type: 'int256' },
      { indexed: false, internalType: 'uint256', name: 'netLpOut', type: 'uint256' },
      { indexed: false, internalType: 'int256', name: 'mintCashIn', type: 'int256' },
      { indexed: false, internalType: 'int256', name: 'netCashUsed', type: 'int256' },
    ],
    name: 'AddLiquidityDualToAmm',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: true, internalType: 'address', name: 'ammAddr', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'netLpOut', type: 'uint256' },
      { indexed: false, internalType: 'int256', name: 'netCashUsed', type: 'int256' },
      { indexed: false, internalType: 'int256', name: 'netSizeInterm', type: 'int256' },
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
      { indexed: true, internalType: 'address', name: 'ammAddr', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'lpToRemove', type: 'uint256' },
      { indexed: false, internalType: 'int256', name: 'burnCashOut', type: 'int256' },
      { indexed: false, internalType: 'int256', name: 'netSizeOut', type: 'int256' },
      { indexed: false, internalType: 'int256', name: 'netCashOut', type: 'int256' },
    ],
    name: 'RemoveLiquidityDualFromAmm',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: true, internalType: 'address', name: 'ammAddr', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'lpToRemove', type: 'uint256' },
      { indexed: false, internalType: 'int256', name: 'netCashOut', type: 'int256' },
      { indexed: false, internalType: 'int256', name: 'netSizeInterm', type: 'int256' },
    ],
    name: 'RemoveLiquiditySingleCashFromAmm',
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
          { internalType: 'MarketId', name: 'marketId', type: 'uint24' },
          { internalType: 'OrderId[]', name: 'idsToCancel', type: 'uint64[]' },
          { internalType: 'Side', name: 'side', type: 'uint8' },
          { internalType: 'enum TimeInForce', name: 'tif', type: 'uint8' },
          { internalType: 'uint256[]', name: 'sizes', type: 'uint256[]' },
          { internalType: 'int16[]', name: 'limitTicks', type: 'int16[]' },
        ],
        internalType: 'struct IRouterEventsAndTypes.BulkModify',
        name: 'req',
        type: 'tuple',
      },
    ],
    name: 'bulkModifies',
    outputs: [
      { internalType: 'Trade', name: 'matched', type: 'uint256' },
      { internalType: 'uint256', name: 'takerFee', type: 'uint256' },
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
          { internalType: 'Side', name: 'side', type: 'uint8' },
          { internalType: 'enum TimeInForce', name: 'tif', type: 'uint8' },
          { internalType: 'uint256[]', name: 'sizes', type: 'uint256[]' },
          { internalType: 'int16[]', name: 'limitTicks', type: 'int16[]' },
        ],
        internalType: 'struct IRouterEventsAndTypes.BulkOrders',
        name: 'req',
        type: 'tuple',
      },
    ],
    name: 'bulkOrders',
    outputs: [
      { internalType: 'Trade', name: 'matched', type: 'uint256' },
      { internalType: 'uint256', name: 'takerFee', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'MarketId', name: 'marketId', type: 'uint24' },
          { internalType: 'uint256', name: 'amount', type: 'uint256' },
          { internalType: 'bool', name: 'isDeposit', type: 'bool' },
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
          { internalType: 'MarketId', name: 'marketId', type: 'uint24' },
          { internalType: 'bool', name: 'useAmm', type: 'bool' },
          { internalType: 'Side', name: 'side', type: 'uint8' },
          { internalType: 'enum TimeInForce', name: 'tif', type: 'uint8' },
          { internalType: 'int16', name: 'tick', type: 'int16' },
          { internalType: 'uint256', name: 'size', type: 'uint256' },
        ],
        internalType: 'struct IRouterEventsAndTypes.Order',
        name: 'order',
        type: 'tuple',
      },
    ],
    name: 'closeIsolatedPosition',
    outputs: [
      { internalType: 'Trade', name: 'matched', type: 'uint256' },
      { internalType: 'int256', name: 'amountOut', type: 'int256' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'bool', name: 'cross', type: 'bool' },
          { internalType: 'MarketId[]', name: 'marketIds', type: 'uint24[]' },
        ],
        internalType: 'struct IRouterEventsAndTypes.EnterMarketsReq',
        name: 'req',
        type: 'tuple',
      },
    ],
    name: 'enterMarkets',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'bool', name: 'cross', type: 'bool' },
          { internalType: 'MarketId[]', name: 'marketIds', type: 'uint24[]' },
        ],
        internalType: 'struct IRouterEventsAndTypes.ExitMarketsReq',
        name: 'req',
        type: 'tuple',
      },
    ],
    name: 'exitMarkets',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'bool', name: 'cross', type: 'bool' },
      { internalType: 'MarketId', name: 'marketId', type: 'uint24' },
      { internalType: 'MarketAcc', name: 'violator', type: 'bytes26' },
      { internalType: 'int256', name: 'sizeToLiquidator', type: 'int256' },
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
      {
        components: [
          { internalType: 'OrderId', name: 'idToCancel', type: 'uint64' },
          {
            components: [
              { internalType: 'bool', name: 'cross', type: 'bool' },
              { internalType: 'MarketId', name: 'marketId', type: 'uint24' },
              { internalType: 'bool', name: 'useAmm', type: 'bool' },
              { internalType: 'Side', name: 'side', type: 'uint8' },
              { internalType: 'enum TimeInForce', name: 'tif', type: 'uint8' },
              { internalType: 'int16', name: 'tick', type: 'int16' },
              { internalType: 'uint256', name: 'size', type: 'uint256' },
            ],
            internalType: 'struct IRouterEventsAndTypes.Order',
            name: 'newOrder',
            type: 'tuple',
          },
        ],
        internalType: 'struct IRouterEventsAndTypes.ModifyOrderReq',
        name: 'req',
        type: 'tuple',
      },
    ],
    name: 'modifyOrder',
    outputs: [{ internalType: 'Trade', name: 'matched', type: 'uint256' }],
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
              { internalType: 'bool', name: 'useAmm', type: 'bool' },
              { internalType: 'Side', name: 'side', type: 'uint8' },
              { internalType: 'enum TimeInForce', name: 'tif', type: 'uint8' },
              { internalType: 'int16', name: 'tick', type: 'int16' },
              { internalType: 'uint256', name: 'size', type: 'uint256' },
            ],
            internalType: 'struct IRouterEventsAndTypes.Order',
            name: 'order',
            type: 'tuple',
          },
          { internalType: 'uint256', name: 'cashIn', type: 'uint256' },
          { internalType: 'bool', name: 'enterMarket', type: 'bool' },
        ],
        internalType: 'struct IRouterEventsAndTypes.OpenIsolatedPositionRequest',
        name: 'req',
        type: 'tuple',
      },
    ],
    name: 'openIsolatedPosition',
    outputs: [{ internalType: 'Trade', name: 'matched', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'bool', name: 'cross', type: 'bool' },
          { internalType: 'MarketId', name: 'marketId', type: 'uint24' },
          { internalType: 'bool', name: 'useAmm', type: 'bool' },
          { internalType: 'Side', name: 'side', type: 'uint8' },
          { internalType: 'enum TimeInForce', name: 'tif', type: 'uint8' },
          { internalType: 'int16', name: 'tick', type: 'int16' },
          { internalType: 'uint256', name: 'size', type: 'uint256' },
        ],
        internalType: 'struct IRouterEventsAndTypes.Order',
        name: 'order',
        type: 'tuple',
      },
    ],
    name: 'placeOrder',
    outputs: [{ internalType: 'Trade', name: 'matched', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'MarketAcc', name: 'user', type: 'bytes26' }],
    name: 'settlePaymentAndOrders',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint8', name: 'accountId', type: 'uint8' },
      { internalType: 'TokenId', name: 'tokenId', type: 'uint16' },
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
      { internalType: 'TokenId', name: 'tokenId', type: 'uint16' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
      { internalType: 'bool', name: 'isDeposit', type: 'bool' },
    ],
    name: 'vaultTransfer',
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
      { indexed: true, internalType: 'address', name: 'ammAddr', type: 'address' },
      { indexed: false, internalType: 'int256', name: 'exactSizeIn', type: 'int256' },
      { indexed: false, internalType: 'uint256', name: 'netLpOut', type: 'uint256' },
      { indexed: false, internalType: 'int256', name: 'mintCashIn', type: 'int256' },
      { indexed: false, internalType: 'int256', name: 'netCashUsed', type: 'int256' },
    ],
    name: 'AddLiquidityDualToAmm',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: true, internalType: 'address', name: 'ammAddr', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'netLpOut', type: 'uint256' },
      { indexed: false, internalType: 'int256', name: 'netCashUsed', type: 'int256' },
      { indexed: false, internalType: 'int256', name: 'netSizeInterm', type: 'int256' },
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
      { indexed: true, internalType: 'address', name: 'ammAddr', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'lpToRemove', type: 'uint256' },
      { indexed: false, internalType: 'int256', name: 'burnCashOut', type: 'int256' },
      { indexed: false, internalType: 'int256', name: 'netSizeOut', type: 'int256' },
      { indexed: false, internalType: 'int256', name: 'netCashOut', type: 'int256' },
    ],
    name: 'RemoveLiquidityDualFromAmm',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'MarketAcc', name: 'user', type: 'bytes26' },
      { indexed: true, internalType: 'address', name: 'ammAddr', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'lpToRemove', type: 'uint256' },
      { indexed: false, internalType: 'int256', name: 'netCashOut', type: 'int256' },
      { indexed: false, internalType: 'int256', name: 'netSizeInterm', type: 'int256' },
    ],
    name: 'RemoveLiquiditySingleCashFromAmm',
    type: 'event',
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
      {
        components: [
          { internalType: 'address', name: 'root', type: 'address' },
          { internalType: 'uint8', name: 'accountId', type: 'uint8' },
          { internalType: 'TokenId', name: 'tokenId', type: 'uint16' },
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
      {
        components: [
          { internalType: 'address', name: 'root', type: 'address' },
          { internalType: 'TokenId', name: 'tokenId', type: 'uint16' },
          { internalType: 'uint256', name: 'amount', type: 'uint256' },
          { internalType: 'bool', name: 'isDeposit', type: 'bool' },
          { internalType: 'uint64', name: 'nonce', type: 'uint64' },
        ],
        internalType: 'struct IRouterEventsAndTypes.VaultTransferMessage',
        name: 'message',
        type: 'tuple',
      },
      { internalType: 'bytes', name: 'signature', type: 'bytes' },
    ],
    name: 'vaultTransfer',
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
      { internalType: 'uint32', name: 'maxUpdateDelay', type: 'uint32' },
    ],
    name: 'setConfig',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'int112', name: 'floatingRate', type: 'int112' },
      { internalType: 'uint32', name: 'desiredTimestamp', type: 'uint32' },
    ],
    name: 'updateFloatingRate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;
