// FIXME: @negativez2 hardcoded for now

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ICashManager
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iCashManagerAbi = [
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'Account', name: 'subaccount', type: 'bytes21' },
      { indexed: false, internalType: 'address', name: 'token', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
      { indexed: false, internalType: 'bool', name: 'isDeposit', type: 'bool' },
    ],
    name: 'SubaccountTransfer',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'address', name: 'root', type: 'address' },
      { indexed: false, internalType: 'address', name: 'token', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
      { indexed: false, internalType: 'bool', name: 'isDeposit', type: 'bool' },
    ],
    name: 'VaultTransfer',
    type: 'event',
  },
  {
    inputs: [],
    name: 'MARKET_FACTORY',
    outputs: [{ internalType: 'contract IMarketFactory', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'Account', name: 'account', type: 'bytes21' },
      { internalType: 'TokenId', name: 'tokenId', type: 'uint16' },
    ],
    name: 'accountBalance',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'router', type: 'address' }],
    name: 'addAllowedRouter',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'AccountPosition', name: 'user', type: 'bytes28' }],
    name: 'getCash',
    outputs: [{ internalType: 'int256', name: '', type: 'int256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'AccountPosition', name: 'user', type: 'bytes28' }],
    name: 'getEnteredMarkets',
    outputs: [{ internalType: 'address[]', name: '', type: 'address[]' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'maxEnabledMarkets',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'maxOpenOrders',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'router', type: 'address' }],
    name: 'removeAllowedRouter',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'maxEnabledMarkets', type: 'uint256' }],
    name: 'setMaxEnabledMarkets',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'maxOpenOrders', type: 'uint256' }],
    name: 'setMaxOpenOrders',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'Account', name: 'subaccount', type: 'bytes21' },
      { internalType: 'address', name: 'token', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
      { internalType: 'bool', name: 'isDeposit', type: 'bool' },
    ],
    name: 'subaccountTransfer',
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
        internalType: 'struct IMarketHubStorage.TokenData',
        name: '',
        type: 'tuple',
      },
    ],
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
    name: 'totalCash',
    outputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'treasury',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'TokenId', name: 'tokenId', type: 'uint16' }],
    name: 'treasuryBalance',
    outputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'root', type: 'address' },
      { internalType: 'address', name: 'token', type: 'address' },
      { internalType: 'uint256', name: 'rawAmount', type: 'uint256' },
      { internalType: 'bool', name: 'isDeposit', type: 'bool' },
    ],
    name: 'vaultTransfer',
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
      { indexed: false, internalType: 'AccountPosition', name: 'position', type: 'bytes28' },
      { indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
      { indexed: false, internalType: 'bool', name: 'isDeposit', type: 'bool' },
    ],
    name: 'AccountPositionTransfer',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'AccountPosition', name: 'from', type: 'bytes28' },
      { indexed: false, internalType: 'AccountPosition', name: 'to', type: 'bytes28' },
      { indexed: false, internalType: 'int256', name: 'scaledAmount', type: 'int256' },
    ],
    name: 'CrossPositionTransfer',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'AccountPosition', name: 'position', type: 'bytes28' },
      { indexed: false, internalType: 'address', name: 'market', type: 'address' },
    ],
    name: 'EnterMarket',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'AccountPosition', name: 'position', type: 'bytes28' },
      { indexed: false, internalType: 'address', name: 'market', type: 'address' },
    ],
    name: 'ExitMarket',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'Account', name: 'subaccount', type: 'bytes21' },
      { indexed: false, internalType: 'address', name: 'token', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
      { indexed: false, internalType: 'bool', name: 'isDeposit', type: 'bool' },
    ],
    name: 'SubaccountTransfer',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'address', name: 'root', type: 'address' },
      { indexed: false, internalType: 'address', name: 'token', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
      { indexed: false, internalType: 'bool', name: 'isDeposit', type: 'bool' },
    ],
    name: 'VaultTransfer',
    type: 'event',
  },
  {
    inputs: [],
    name: 'MARKET_FACTORY',
    outputs: [{ internalType: 'contract IMarketFactory', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'Account', name: 'account', type: 'bytes21' },
      { internalType: 'TokenId', name: 'tokenId', type: 'uint16' },
    ],
    name: 'accountBalance',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'router', type: 'address' }],
    name: 'addAllowedRouter',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'market', type: 'address' },
      { internalType: 'AccountPosition', name: 'user', type: 'bytes28' },
    ],
    name: 'cancelAllOrders',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'market', type: 'address' },
      { internalType: 'AccountPosition', name: 'user', type: 'bytes28' },
      { internalType: 'OrderId[]', name: 'orderIds', type: 'uint64[]' },
    ],
    name: 'cancelOrders',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'AccountPosition', name: 'from', type: 'bytes28' },
      { internalType: 'AccountPosition', name: 'to', type: 'bytes28' },
      { internalType: 'int256', name: 'scaledAmount', type: 'int256' },
    ],
    name: 'crossPositionTransfer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'AccountPosition', name: 'user', type: 'bytes28' },
      { internalType: 'address', name: 'market', type: 'address' },
    ],
    name: 'enterMarket',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'AccountPosition', name: 'user', type: 'bytes28' },
      { internalType: 'address', name: 'market', type: 'address' },
    ],
    name: 'exitMarket',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'market', type: 'address' },
      { internalType: 'AccountPosition', name: 'user1', type: 'bytes28' },
      { internalType: 'AccountPosition', name: 'user2', type: 'bytes28' },
      { internalType: 'int256', name: 'size', type: 'int256' },
    ],
    name: 'forceDeleverage',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'AccountPosition', name: 'user', type: 'bytes28' }],
    name: 'getCash',
    outputs: [{ internalType: 'int256', name: '', type: 'int256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'AccountPosition', name: 'user', type: 'bytes28' }],
    name: 'getEnteredMarkets',
    outputs: [{ internalType: 'address[]', name: '', type: 'address[]' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'market', type: 'address' },
      { internalType: 'uint16', name: 'cardinalityNext', type: 'uint16' },
    ],
    name: 'increaseObservationCardinalityNext',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'market', type: 'address' },
      { internalType: 'AccountPosition', name: 'liquidator', type: 'bytes28' },
      { internalType: 'AccountPosition', name: 'violator', type: 'bytes28' },
      { internalType: 'int256', name: 'sizeToLiquidator', type: 'int256' },
    ],
    name: 'liquidate',
    outputs: [
      {
        components: [
          { internalType: 'int256', name: 'size', type: 'int256' },
          { internalType: 'int256', name: 'cost', type: 'int256' },
        ],
        internalType: 'struct Trade',
        name: 'liqTrade',
        type: 'tuple',
      },
      { internalType: 'uint256', name: 'fees', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'maxEnabledMarkets',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'maxOpenOrders',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'market', type: 'address' },
      { internalType: 'AccountPosition', name: 'user', type: 'bytes28' },
      { internalType: 'AccountPosition', name: 'counterParty', type: 'bytes28' },
      {
        components: [
          { internalType: 'int256', name: 'size', type: 'int256' },
          { internalType: 'int256', name: 'cost', type: 'int256' },
        ],
        internalType: 'struct Trade',
        name: 'trade',
        type: 'tuple',
      },
    ],
    name: 'otcSwap',
    outputs: [{ internalType: 'uint256', name: 'fees', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'market', type: 'address' },
      { internalType: 'AccountPosition', name: 'user', type: 'bytes28' },
      { internalType: 'enum Side', name: 'side', type: 'uint8' },
      { internalType: 'uint256', name: 'size', type: 'uint256' },
      { internalType: 'int16', name: 'limitTick', type: 'int16' },
      { internalType: 'enum TimeInForce', name: 'tif', type: 'uint8' },
    ],
    name: 'placeOrder',
    outputs: [
      {
        components: [
          { internalType: 'int256', name: 'size', type: 'int256' },
          { internalType: 'int256', name: 'cost', type: 'int256' },
        ],
        internalType: 'struct Trade',
        name: 'matched',
        type: 'tuple',
      },
      { internalType: 'uint256', name: 'fees', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'AccountPosition', name: 'position', type: 'bytes28' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
      { internalType: 'bool', name: 'isDeposit', type: 'bool' },
    ],
    name: 'positionTransfer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'router', type: 'address' }],
    name: 'removeAllowedRouter',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'AccountPosition', name: 'user', type: 'bytes28' }],
    name: 'requestStrictMarginCheck',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'market', type: 'address' },
      {
        components: [
          { internalType: 'OrderId', name: 'orderId', type: 'uint64' },
          { internalType: 'uint256', name: 'index', type: 'uint256' },
        ],
        internalType: 'struct FilledIndexHint[]',
        name: 'hints',
        type: 'tuple[]',
      },
    ],
    name: 'setFilledIndexHints',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'maxEnabledMarkets', type: 'uint256' }],
    name: 'setMaxEnabledMarkets',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'maxOpenOrders', type: 'uint256' }],
    name: 'setMaxOpenOrders',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'AccountPosition', name: 'user', type: 'bytes28' }],
    name: 'settlePaymentAndOrders',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'Account', name: 'subaccount', type: 'bytes21' },
      { internalType: 'address', name: 'token', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
      { internalType: 'bool', name: 'isDeposit', type: 'bool' },
    ],
    name: 'subaccountTransfer',
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
        internalType: 'struct IMarketHubStorage.TokenData',
        name: '',
        type: 'tuple',
      },
    ],
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
    name: 'totalCash',
    outputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'treasury',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'TokenId', name: 'tokenId', type: 'uint16' }],
    name: 'treasuryBalance',
    outputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'bytes', name: 'data', type: 'bytes' }],
    name: 'unlockAndCallback',
    outputs: [{ internalType: 'bytes', name: 'result', type: 'bytes' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'market', type: 'address' }],
    name: 'updateFIndex',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'root', type: 'address' },
      { internalType: 'address', name: 'token', type: 'address' },
      { internalType: 'uint256', name: 'rawAmount', type: 'uint256' },
      { internalType: 'bool', name: 'isDeposit', type: 'bool' },
    ],
    name: 'vaultTransfer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IMarketHubStorage
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iMarketHubStorageAbi = [
  {
    inputs: [],
    name: 'MARKET_FACTORY',
    outputs: [{ internalType: 'contract IMarketFactory', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'Account', name: 'account', type: 'bytes21' },
      { internalType: 'TokenId', name: 'tokenId', type: 'uint16' },
    ],
    name: 'accountBalance',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'AccountPosition', name: 'user', type: 'bytes28' }],
    name: 'getCash',
    outputs: [{ internalType: 'int256', name: '', type: 'int256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'AccountPosition', name: 'user', type: 'bytes28' }],
    name: 'getEnteredMarkets',
    outputs: [{ internalType: 'address[]', name: '', type: 'address[]' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'maxEnabledMarkets',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'maxOpenOrders',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
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
        internalType: 'struct IMarketHubStorage.TokenData',
        name: '',
        type: 'tuple',
      },
    ],
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
    name: 'totalCash',
    outputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'treasury',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'TokenId', name: 'tokenId', type: 'uint16' }],
    name: 'treasuryBalance',
    outputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IMarginManager
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iMarginManagerAbi = [
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'AccountPosition', name: 'position', type: 'bytes28' },
      { indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
      { indexed: false, internalType: 'bool', name: 'isDeposit', type: 'bool' },
    ],
    name: 'AccountPositionTransfer',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'AccountPosition', name: 'from', type: 'bytes28' },
      { indexed: false, internalType: 'AccountPosition', name: 'to', type: 'bytes28' },
      { indexed: false, internalType: 'int256', name: 'scaledAmount', type: 'int256' },
    ],
    name: 'CrossPositionTransfer',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'AccountPosition', name: 'position', type: 'bytes28' },
      { indexed: false, internalType: 'address', name: 'market', type: 'address' },
    ],
    name: 'EnterMarket',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'AccountPosition', name: 'position', type: 'bytes28' },
      { indexed: false, internalType: 'address', name: 'market', type: 'address' },
    ],
    name: 'ExitMarket',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'Account', name: 'subaccount', type: 'bytes21' },
      { indexed: false, internalType: 'address', name: 'token', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
      { indexed: false, internalType: 'bool', name: 'isDeposit', type: 'bool' },
    ],
    name: 'SubaccountTransfer',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'address', name: 'root', type: 'address' },
      { indexed: false, internalType: 'address', name: 'token', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
      { indexed: false, internalType: 'bool', name: 'isDeposit', type: 'bool' },
    ],
    name: 'VaultTransfer',
    type: 'event',
  },
  {
    inputs: [],
    name: 'MARKET_FACTORY',
    outputs: [{ internalType: 'contract IMarketFactory', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'Account', name: 'account', type: 'bytes21' },
      { internalType: 'TokenId', name: 'tokenId', type: 'uint16' },
    ],
    name: 'accountBalance',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'router', type: 'address' }],
    name: 'addAllowedRouter',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'AccountPosition', name: 'from', type: 'bytes28' },
      { internalType: 'AccountPosition', name: 'to', type: 'bytes28' },
      { internalType: 'int256', name: 'scaledAmount', type: 'int256' },
    ],
    name: 'crossPositionTransfer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'AccountPosition', name: 'user', type: 'bytes28' },
      { internalType: 'address', name: 'market', type: 'address' },
    ],
    name: 'enterMarket',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'AccountPosition', name: 'user', type: 'bytes28' },
      { internalType: 'address', name: 'market', type: 'address' },
    ],
    name: 'exitMarket',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'AccountPosition', name: 'user', type: 'bytes28' }],
    name: 'getCash',
    outputs: [{ internalType: 'int256', name: '', type: 'int256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'AccountPosition', name: 'user', type: 'bytes28' }],
    name: 'getEnteredMarkets',
    outputs: [{ internalType: 'address[]', name: '', type: 'address[]' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'maxEnabledMarkets',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'maxOpenOrders',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'AccountPosition', name: 'position', type: 'bytes28' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
      { internalType: 'bool', name: 'isDeposit', type: 'bool' },
    ],
    name: 'positionTransfer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'router', type: 'address' }],
    name: 'removeAllowedRouter',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'AccountPosition', name: 'user', type: 'bytes28' }],
    name: 'requestStrictMarginCheck',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'maxEnabledMarkets', type: 'uint256' }],
    name: 'setMaxEnabledMarkets',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'maxOpenOrders', type: 'uint256' }],
    name: 'setMaxOpenOrders',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'Account', name: 'subaccount', type: 'bytes21' },
      { internalType: 'address', name: 'token', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
      { internalType: 'bool', name: 'isDeposit', type: 'bool' },
    ],
    name: 'subaccountTransfer',
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
        internalType: 'struct IMarketHubStorage.TokenData',
        name: '',
        type: 'tuple',
      },
    ],
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
    name: 'totalCash',
    outputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'treasury',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'TokenId', name: 'tokenId', type: 'uint16' }],
    name: 'treasuryBalance',
    outputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'bytes', name: 'data', type: 'bytes' }],
    name: 'unlockAndCallback',
    outputs: [{ internalType: 'bytes', name: 'result', type: 'bytes' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'root', type: 'address' },
      { internalType: 'address', name: 'token', type: 'address' },
      { internalType: 'uint256', name: 'rawAmount', type: 'uint256' },
      { internalType: 'bool', name: 'isDeposit', type: 'bool' },
    ],
    name: 'vaultTransfer',
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
          { internalType: 'string', name: 'k_name', type: 'string' },
          { internalType: 'string', name: 'k_symbol', type: 'string' },
          { internalType: 'bool', name: 'k_isIsolatedOnly', type: 'bool' },
          { internalType: 'TokenId', name: 'k_tokenId', type: 'uint16' },
          { internalType: 'MarketId', name: 'k_marketId', type: 'uint40' },
          { internalType: 'uint40', name: 'k_maturity', type: 'uint40' },
          { internalType: 'address', name: 'markPriceOracle', type: 'address' },
          { internalType: 'uint256', name: 'OICap', type: 'uint256' },
          {
            components: [
              { internalType: 'uint64', name: 'orderBook', type: 'uint64' },
              { internalType: 'uint64', name: 'openSwap', type: 'uint64' },
              { internalType: 'uint64', name: 'settlement', type: 'uint64' },
            ],
            internalType: 'struct FeeFactors',
            name: 'feeFactors',
            type: 'tuple',
          },
          {
            components: [
              { internalType: 'address', name: 'oracle', type: 'address' },
              { internalType: 'uint40', name: 'paymentPeriod', type: 'uint40' },
              { internalType: 'uint40', name: 'maxUpdateDelay', type: 'uint40' },
            ],
            internalType: 'struct IMarketAllTypes.FIndexConfig',
            name: 'fIndexCfg',
            type: 'tuple',
          },
          {
            components: [
              { internalType: 'uint256', name: 'base', type: 'uint256' },
              { internalType: 'uint256', name: 'slope', type: 'uint256' },
            ],
            internalType: 'struct IMarketAllTypes.LiqIncentiveConfig',
            name: 'liqIncentive',
            type: 'tuple',
          },
          {
            components: [
              { internalType: 'uint256[2]', name: 'q', type: 'uint256[2]' },
              { internalType: 'uint64[3]', name: 'mm', type: 'uint64[3]' },
            ],
            internalType: 'struct IMarketAllTypes.MarginConfig',
            name: 'IMConfig',
            type: 'tuple',
          },
          {
            components: [
              { internalType: 'uint256[2]', name: 'q', type: 'uint256[2]' },
              { internalType: 'uint64[3]', name: 'mm', type: 'uint64[3]' },
            ],
            internalType: 'struct IMarketAllTypes.MarginConfig',
            name: 'MMConfig',
            type: 'tuple',
          },
        ],
        indexed: false,
        internalType: 'struct IMarketAllTypes.MarketCtx',
        name: 'ctx',
        type: 'tuple',
      },
    ],
    name: 'MarketCreated',
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
    inputs: [
      { internalType: 'bool', name: 'isIsolatedOnly', type: 'bool' },
      { internalType: 'TokenId', name: 'tokenId', type: 'uint16' },
      { internalType: 'uint40', name: 'maturity', type: 'uint40' },
      { internalType: 'string', name: 'name', type: 'string' },
      { internalType: 'string', name: 'symbol', type: 'string' },
      {
        components: [
          { internalType: 'address', name: 'markPriceOracle', type: 'address' },
          { internalType: 'uint256', name: 'OICap', type: 'uint256' },
          {
            components: [
              { internalType: 'uint64', name: 'orderBook', type: 'uint64' },
              { internalType: 'uint64', name: 'openSwap', type: 'uint64' },
              { internalType: 'uint64', name: 'settlement', type: 'uint64' },
            ],
            internalType: 'struct FeeFactors',
            name: 'feeFactors',
            type: 'tuple',
          },
          {
            components: [
              { internalType: 'address', name: 'oracle', type: 'address' },
              { internalType: 'uint40', name: 'paymentPeriod', type: 'uint40' },
              { internalType: 'uint40', name: 'maxUpdateDelay', type: 'uint40' },
            ],
            internalType: 'struct IMarketAllTypes.FIndexConfig',
            name: 'fIndexCfg',
            type: 'tuple',
          },
          {
            components: [
              { internalType: 'uint256', name: 'base', type: 'uint256' },
              { internalType: 'uint256', name: 'slope', type: 'uint256' },
            ],
            internalType: 'struct IMarketAllTypes.LiqIncentiveConfig',
            name: 'liqIncentive',
            type: 'tuple',
          },
          {
            components: [
              { internalType: 'uint256[2]', name: 'q', type: 'uint256[2]' },
              { internalType: 'uint64[3]', name: 'mm', type: 'uint64[3]' },
            ],
            internalType: 'struct IMarketAllTypes.MarginConfig',
            name: 'IMConfig',
            type: 'tuple',
          },
          {
            components: [
              { internalType: 'uint256[2]', name: 'q', type: 'uint256[2]' },
              { internalType: 'uint64[3]', name: 'mm', type: 'uint64[3]' },
            ],
            internalType: 'struct IMarketAllTypes.MarginConfig',
            name: 'MMConfig',
            type: 'tuple',
          },
        ],
        internalType: 'struct IMarketAllTypes.MarketConfigStruct',
        name: 'config',
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
    name: 'implementation',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'marketNonce',
    outputs: [{ internalType: 'uint40', name: '', type: 'uint40' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'newImplementation', type: 'address' }],
    name: 'setImplementation',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IRouter
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iRouterAbi = [
  {
    inputs: [
      {
        components: [
          { internalType: 'Account', name: 'account', type: 'bytes21' },
          { internalType: 'address', name: 'target', type: 'address' },
          { internalType: 'bytes', name: 'data', type: 'bytes' },
        ],
        internalType: 'struct IRouter.SimulateData[]',
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
          { internalType: 'uint8', name: 'accountId', type: 'uint8' },
          { internalType: 'bytes', name: 'data', type: 'bytes' },
        ],
        internalType: 'struct IRouter.DirectCall[]',
        name: 'data',
        type: 'tuple[]',
      },
      { internalType: 'bool', name: 'requireMarginCheckCall', type: 'bool' },
    ],
    name: 'directCall',
    outputs: [{ internalType: 'bytes[]', name: '', type: 'bytes[]' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'bytes', name: 'data', type: 'bytes' }],
    name: 'viewCall',
    outputs: [{ internalType: 'bytes', name: '', type: 'bytes' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IMarket1
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iMarket1Abi = [
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'FIndex', name: 'oldIndex', type: 'bytes32' },
      { indexed: false, internalType: 'FIndex', name: 'newIndex', type: 'bytes32' },
    ],
    name: 'FIndexUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'AccountPosition', name: 'winningUser', type: 'bytes28' },
      { indexed: false, internalType: 'AccountPosition', name: 'losingUser', type: 'bytes28' },
      {
        components: [
          { internalType: 'int256', name: 'size', type: 'int256' },
          { internalType: 'int256', name: 'cost', type: 'int256' },
        ],
        indexed: false,
        internalType: 'struct Trade',
        name: 'trade',
        type: 'tuple',
      },
    ],
    name: 'ForceDeleverage',
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
      { indexed: false, internalType: 'int16', name: 'tick', type: 'int16' },
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
      { indexed: false, internalType: 'AccountPosition', name: 'maker', type: 'bytes28' },
      { indexed: false, internalType: 'OrderId', name: 'orderId', type: 'uint64' },
      { indexed: false, internalType: 'uint256', name: 'size', type: 'uint256' },
    ],
    name: 'LimitOrderPlaced',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'AccountPosition', name: 'liquidator', type: 'bytes28' },
      { indexed: false, internalType: 'AccountPosition', name: 'violator', type: 'bytes28' },
      {
        components: [
          { internalType: 'int256', name: 'size', type: 'int256' },
          { internalType: 'int256', name: 'cost', type: 'int256' },
        ],
        indexed: false,
        internalType: 'struct Trade',
        name: 'liqTrade',
        type: 'tuple',
      },
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
          { internalType: 'address', name: 'markPriceOracle', type: 'address' },
          { internalType: 'uint256', name: 'OICap', type: 'uint256' },
          {
            components: [
              { internalType: 'uint64', name: 'orderBook', type: 'uint64' },
              { internalType: 'uint64', name: 'openSwap', type: 'uint64' },
              { internalType: 'uint64', name: 'settlement', type: 'uint64' },
            ],
            internalType: 'struct FeeFactors',
            name: 'feeFactors',
            type: 'tuple',
          },
          {
            components: [
              { internalType: 'address', name: 'oracle', type: 'address' },
              { internalType: 'uint40', name: 'paymentPeriod', type: 'uint40' },
              { internalType: 'uint40', name: 'maxUpdateDelay', type: 'uint40' },
            ],
            internalType: 'struct IMarketAllTypes.FIndexConfig',
            name: 'fIndexCfg',
            type: 'tuple',
          },
          {
            components: [
              { internalType: 'uint256', name: 'base', type: 'uint256' },
              { internalType: 'uint256', name: 'slope', type: 'uint256' },
            ],
            internalType: 'struct IMarketAllTypes.LiqIncentiveConfig',
            name: 'liqIncentive',
            type: 'tuple',
          },
          {
            components: [
              { internalType: 'uint256[2]', name: 'q', type: 'uint256[2]' },
              { internalType: 'uint64[3]', name: 'mm', type: 'uint64[3]' },
            ],
            internalType: 'struct IMarketAllTypes.MarginConfig',
            name: 'IMConfig',
            type: 'tuple',
          },
          {
            components: [
              { internalType: 'uint256[2]', name: 'q', type: 'uint256[2]' },
              { internalType: 'uint64[3]', name: 'mm', type: 'uint64[3]' },
            ],
            internalType: 'struct IMarketAllTypes.MarginConfig',
            name: 'MMConfig',
            type: 'tuple',
          },
        ],
        indexed: false,
        internalType: 'struct IMarketAllTypes.MarketConfigStruct',
        name: 'oldConfig',
        type: 'tuple',
      },
      {
        components: [
          { internalType: 'address', name: 'markPriceOracle', type: 'address' },
          { internalType: 'uint256', name: 'OICap', type: 'uint256' },
          {
            components: [
              { internalType: 'uint64', name: 'orderBook', type: 'uint64' },
              { internalType: 'uint64', name: 'openSwap', type: 'uint64' },
              { internalType: 'uint64', name: 'settlement', type: 'uint64' },
            ],
            internalType: 'struct FeeFactors',
            name: 'feeFactors',
            type: 'tuple',
          },
          {
            components: [
              { internalType: 'address', name: 'oracle', type: 'address' },
              { internalType: 'uint40', name: 'paymentPeriod', type: 'uint40' },
              { internalType: 'uint40', name: 'maxUpdateDelay', type: 'uint40' },
            ],
            internalType: 'struct IMarketAllTypes.FIndexConfig',
            name: 'fIndexCfg',
            type: 'tuple',
          },
          {
            components: [
              { internalType: 'uint256', name: 'base', type: 'uint256' },
              { internalType: 'uint256', name: 'slope', type: 'uint256' },
            ],
            internalType: 'struct IMarketAllTypes.LiqIncentiveConfig',
            name: 'liqIncentive',
            type: 'tuple',
          },
          {
            components: [
              { internalType: 'uint256[2]', name: 'q', type: 'uint256[2]' },
              { internalType: 'uint64[3]', name: 'mm', type: 'uint64[3]' },
            ],
            internalType: 'struct IMarketAllTypes.MarginConfig',
            name: 'IMConfig',
            type: 'tuple',
          },
          {
            components: [
              { internalType: 'uint256[2]', name: 'q', type: 'uint256[2]' },
              { internalType: 'uint64[3]', name: 'mm', type: 'uint64[3]' },
            ],
            internalType: 'struct IMarketAllTypes.MarginConfig',
            name: 'MMConfig',
            type: 'tuple',
          },
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
      { indexed: false, internalType: 'AccountPosition', name: 'user', type: 'bytes28' },
      {
        components: [
          { internalType: 'int256', name: 'size', type: 'int256' },
          { internalType: 'int256', name: 'cost', type: 'int256' },
        ],
        indexed: false,
        internalType: 'struct Trade',
        name: 'trade',
        type: 'tuple',
      },
      { indexed: false, internalType: 'uint256', name: 'fees', type: 'uint256' },
    ],
    name: 'MarketOrderFilled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'AccountPosition', name: 'user', type: 'bytes28' },
      { indexed: false, internalType: 'AccountPosition', name: 'counterParty', type: 'bytes28' },
      {
        components: [
          { internalType: 'int256', name: 'size', type: 'int256' },
          { internalType: 'int256', name: 'cost', type: 'int256' },
        ],
        indexed: false,
        internalType: 'struct Trade',
        name: 'trade',
        type: 'tuple',
      },
      { indexed: false, internalType: 'uint256', name: 'fees', type: 'uint256' },
    ],
    name: 'OtcSwap',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'AccountPosition', name: 'user', type: 'bytes28' },
      { indexed: false, internalType: 'uint256', name: 'lastIndexTimestamp', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'latestIndexTimestamp', type: 'uint256' },
      { indexed: false, internalType: 'int256', name: 'payment', type: 'int256' },
      { indexed: false, internalType: 'uint256', name: 'fees', type: 'uint256' },
    ],
    name: 'PaymentFromSettlement',
    type: 'event',
  },
  {
    inputs: [
      { internalType: 'AccountPosition', name: 'violator', type: 'bytes28' },
      { internalType: 'int256', name: 'sizeToLiquidator', type: 'int256' },
      { internalType: 'int256', name: 'healthRatio', type: 'int256' },
    ],
    name: 'calcLiqTrade',
    outputs: [
      {
        components: [
          { internalType: 'int256', name: 'size', type: 'int256' },
          { internalType: 'int256', name: 'cost', type: 'int256' },
        ],
        internalType: 'struct Trade',
        name: 'liqTrade',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'AccountPosition', name: 'user', type: 'bytes28' },
      { internalType: 'enum MarginType', name: 'marginType', type: 'uint8' },
    ],
    name: 'calcMargin',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'AccountPosition', name: 'user', type: 'bytes28' }],
    name: 'calcPositionValue',
    outputs: [{ internalType: 'int256', name: '', type: 'int256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'AccountPosition', name: 'user', type: 'bytes28' }],
    name: 'cancelAllOrders',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'AccountPosition', name: 'user', type: 'bytes28' },
      { internalType: 'OrderId[]', name: 'orderIds', type: 'uint64[]' },
    ],
    name: 'cancelOrders',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'descriptor',
    outputs: [
      { internalType: 'bool', name: 'isIsolatedOnly', type: 'bool' },
      { internalType: 'TokenId', name: 'tokenId', type: 'uint16' },
      { internalType: 'MarketId', name: 'marketId', type: 'uint40' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'enum Side', name: 'side', type: 'uint8' }],
    name: 'findBestTickToMatch',
    outputs: [
      { internalType: 'int16', name: 'bestTick', type: 'int16' },
      { internalType: 'bool', name: 'found', type: 'bool' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'AccountPosition', name: 'winningUser', type: 'bytes28' },
      { internalType: 'AccountPosition', name: 'losingUser', type: 'bytes28' },
      { internalType: 'int256', name: 'size', type: 'int256' },
    ],
    name: 'forceDeleverage',
    outputs: [
      {
        components: [
          { internalType: 'int256', name: 'size', type: 'int256' },
          { internalType: 'int256', name: 'cost', type: 'int256' },
        ],
        internalType: 'struct Trade',
        name: 'forcedTrade',
        type: 'tuple',
      },
      {
        components: [
          { internalType: 'int256', name: 'payment', type: 'int256' },
          { internalType: 'uint256', name: 'fees', type: 'uint256' },
        ],
        internalType: 'struct SettlementResult',
        name: 'settleWinningUser',
        type: 'tuple',
      },
      {
        components: [
          { internalType: 'int256', name: 'payment', type: 'int256' },
          { internalType: 'uint256', name: 'fees', type: 'uint256' },
        ],
        internalType: 'struct SettlementResult',
        name: 'settleLosingUser',
        type: 'tuple',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'AccountPosition', name: 'user', type: 'bytes28' }],
    name: 'getCountPendingOrders',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getLatestIndex',
    outputs: [{ internalType: 'FIndex', name: '', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'AccountPosition', name: 'user', type: 'bytes28' }],
    name: 'getLiqNonce',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'AccountPosition', name: 'user', type: 'bytes28' }],
    name: 'getNotionalSize',
    outputs: [{ internalType: 'int256', name: '', type: 'int256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'enum Side', name: 'side', type: 'uint8' },
      { internalType: 'int16', name: 'tickIndex', type: 'int16' },
    ],
    name: 'getTickAndNext',
    outputs: [
      { internalType: 'uint256', name: 'size', type: 'uint256' },
      { internalType: 'bool', name: 'hasNext', type: 'bool' },
      { internalType: 'int16', name: 'nextTick', type: 'int16' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'isExpired',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'AccountPosition', name: 'liquidator', type: 'bytes28' },
      { internalType: 'AccountPosition', name: 'violator', type: 'bytes28' },
      { internalType: 'int256', name: 'sizeToLiquidator', type: 'int256' },
      { internalType: 'int256', name: 'healthRatio', type: 'int256' },
    ],
    name: 'liquidate',
    outputs: [
      {
        components: [
          { internalType: 'int256', name: 'size', type: 'int256' },
          { internalType: 'int256', name: 'cost', type: 'int256' },
        ],
        internalType: 'struct Trade',
        name: 'liqTrade',
        type: 'tuple',
      },
      { internalType: 'uint256', name: 'fees', type: 'uint256' },
      {
        components: [
          { internalType: 'int256', name: 'payment', type: 'int256' },
          { internalType: 'uint256', name: 'fees', type: 'uint256' },
        ],
        internalType: 'struct SettlementResult',
        name: 'settleLiquidator',
        type: 'tuple',
      },
      {
        components: [
          { internalType: 'int256', name: 'payment', type: 'int256' },
          { internalType: 'uint256', name: 'fees', type: 'uint256' },
        ],
        internalType: 'struct SettlementResult',
        name: 'settleViolator',
        type: 'tuple',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'maturity',
    outputs: [{ internalType: 'uint40', name: '', type: 'uint40' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'AccountPosition', name: 'user', type: 'bytes28' },
      { internalType: 'AccountPosition', name: 'counterParty', type: 'bytes28' },
      {
        components: [
          { internalType: 'int256', name: 'size', type: 'int256' },
          { internalType: 'int256', name: 'cost', type: 'int256' },
        ],
        internalType: 'struct Trade',
        name: 'trade',
        type: 'tuple',
      },
    ],
    name: 'otcSwap',
    outputs: [
      { internalType: 'uint256', name: 'fees', type: 'uint256' },
      {
        components: [
          { internalType: 'int256', name: 'payment', type: 'int256' },
          { internalType: 'uint256', name: 'fees', type: 'uint256' },
        ],
        internalType: 'struct SettlementResult',
        name: 'settleUser',
        type: 'tuple',
      },
      {
        components: [
          { internalType: 'int256', name: 'payment', type: 'int256' },
          { internalType: 'uint256', name: 'fees', type: 'uint256' },
        ],
        internalType: 'struct SettlementResult',
        name: 'settleCounterParty',
        type: 'tuple',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'AccountPosition', name: 'user', type: 'bytes28' },
      { internalType: 'enum Side', name: 'side', type: 'uint8' },
      { internalType: 'uint256', name: 'size', type: 'uint256' },
      { internalType: 'int16', name: 'limitTick', type: 'int16' },
      { internalType: 'enum TimeInForce', name: 'tif', type: 'uint8' },
    ],
    name: 'placeOrder',
    outputs: [
      {
        components: [
          { internalType: 'int256', name: 'size', type: 'int256' },
          { internalType: 'int256', name: 'cost', type: 'int256' },
        ],
        internalType: 'struct Trade',
        name: 'matched',
        type: 'tuple',
      },
      { internalType: 'uint256', name: 'fees', type: 'uint256' },
      { internalType: 'AccountPosition', name: 'maker', type: 'bytes28' },
      {
        components: [
          { internalType: 'int256', name: 'payment', type: 'int256' },
          { internalType: 'uint256', name: 'fees', type: 'uint256' },
        ],
        internalType: 'struct SettlementResult',
        name: 'settleUser',
        type: 'tuple',
      },
      {
        components: [
          { internalType: 'int256', name: 'payment', type: 'int256' },
          { internalType: 'uint256', name: 'fees', type: 'uint256' },
        ],
        internalType: 'struct SettlementResult',
        name: 'settleMaker',
        type: 'tuple',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'AccountPosition', name: 'user', type: 'bytes28' }],
    name: 'settlePaymentAndOrders',
    outputs: [
      {
        components: [
          { internalType: 'int256', name: 'payment', type: 'int256' },
          { internalType: 'uint256', name: 'fees', type: 'uint256' },
        ],
        internalType: 'struct SettlementResult',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'AccountPosition', name: 'user', type: 'bytes28' }],
    name: 'tryExitMarket',
    outputs: [
      {
        components: [
          { internalType: 'int256', name: 'payment', type: 'int256' },
          { internalType: 'uint256', name: 'fees', type: 'uint256' },
        ],
        internalType: 'struct SettlementResult',
        name: '',
        type: 'tuple',
      },
      { internalType: 'bool', name: 'exited', type: 'bool' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IMarket
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iMarketAbi = [
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'FIndex', name: 'oldIndex', type: 'bytes32' },
      { indexed: false, internalType: 'FIndex', name: 'newIndex', type: 'bytes32' },
    ],
    name: 'FIndexUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'AccountPosition', name: 'winningUser', type: 'bytes28' },
      { indexed: false, internalType: 'AccountPosition', name: 'losingUser', type: 'bytes28' },
      {
        components: [
          { internalType: 'int256', name: 'size', type: 'int256' },
          { internalType: 'int256', name: 'cost', type: 'int256' },
        ],
        indexed: false,
        internalType: 'struct Trade',
        name: 'trade',
        type: 'tuple',
      },
    ],
    name: 'ForceDeleverage',
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
      { indexed: false, internalType: 'int16', name: 'tick', type: 'int16' },
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
      { indexed: false, internalType: 'AccountPosition', name: 'maker', type: 'bytes28' },
      { indexed: false, internalType: 'OrderId', name: 'orderId', type: 'uint64' },
      { indexed: false, internalType: 'uint256', name: 'size', type: 'uint256' },
    ],
    name: 'LimitOrderPlaced',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'AccountPosition', name: 'liquidator', type: 'bytes28' },
      { indexed: false, internalType: 'AccountPosition', name: 'violator', type: 'bytes28' },
      {
        components: [
          { internalType: 'int256', name: 'size', type: 'int256' },
          { internalType: 'int256', name: 'cost', type: 'int256' },
        ],
        indexed: false,
        internalType: 'struct Trade',
        name: 'liqTrade',
        type: 'tuple',
      },
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
          { internalType: 'address', name: 'markPriceOracle', type: 'address' },
          { internalType: 'uint256', name: 'OICap', type: 'uint256' },
          {
            components: [
              { internalType: 'uint64', name: 'orderBook', type: 'uint64' },
              { internalType: 'uint64', name: 'openSwap', type: 'uint64' },
              { internalType: 'uint64', name: 'settlement', type: 'uint64' },
            ],
            internalType: 'struct FeeFactors',
            name: 'feeFactors',
            type: 'tuple',
          },
          {
            components: [
              { internalType: 'address', name: 'oracle', type: 'address' },
              { internalType: 'uint40', name: 'paymentPeriod', type: 'uint40' },
              { internalType: 'uint40', name: 'maxUpdateDelay', type: 'uint40' },
            ],
            internalType: 'struct IMarketAllTypes.FIndexConfig',
            name: 'fIndexCfg',
            type: 'tuple',
          },
          {
            components: [
              { internalType: 'uint256', name: 'base', type: 'uint256' },
              { internalType: 'uint256', name: 'slope', type: 'uint256' },
            ],
            internalType: 'struct IMarketAllTypes.LiqIncentiveConfig',
            name: 'liqIncentive',
            type: 'tuple',
          },
          {
            components: [
              { internalType: 'uint256[2]', name: 'q', type: 'uint256[2]' },
              { internalType: 'uint64[3]', name: 'mm', type: 'uint64[3]' },
            ],
            internalType: 'struct IMarketAllTypes.MarginConfig',
            name: 'IMConfig',
            type: 'tuple',
          },
          {
            components: [
              { internalType: 'uint256[2]', name: 'q', type: 'uint256[2]' },
              { internalType: 'uint64[3]', name: 'mm', type: 'uint64[3]' },
            ],
            internalType: 'struct IMarketAllTypes.MarginConfig',
            name: 'MMConfig',
            type: 'tuple',
          },
        ],
        indexed: false,
        internalType: 'struct IMarketAllTypes.MarketConfigStruct',
        name: 'oldConfig',
        type: 'tuple',
      },
      {
        components: [
          { internalType: 'address', name: 'markPriceOracle', type: 'address' },
          { internalType: 'uint256', name: 'OICap', type: 'uint256' },
          {
            components: [
              { internalType: 'uint64', name: 'orderBook', type: 'uint64' },
              { internalType: 'uint64', name: 'openSwap', type: 'uint64' },
              { internalType: 'uint64', name: 'settlement', type: 'uint64' },
            ],
            internalType: 'struct FeeFactors',
            name: 'feeFactors',
            type: 'tuple',
          },
          {
            components: [
              { internalType: 'address', name: 'oracle', type: 'address' },
              { internalType: 'uint40', name: 'paymentPeriod', type: 'uint40' },
              { internalType: 'uint40', name: 'maxUpdateDelay', type: 'uint40' },
            ],
            internalType: 'struct IMarketAllTypes.FIndexConfig',
            name: 'fIndexCfg',
            type: 'tuple',
          },
          {
            components: [
              { internalType: 'uint256', name: 'base', type: 'uint256' },
              { internalType: 'uint256', name: 'slope', type: 'uint256' },
            ],
            internalType: 'struct IMarketAllTypes.LiqIncentiveConfig',
            name: 'liqIncentive',
            type: 'tuple',
          },
          {
            components: [
              { internalType: 'uint256[2]', name: 'q', type: 'uint256[2]' },
              { internalType: 'uint64[3]', name: 'mm', type: 'uint64[3]' },
            ],
            internalType: 'struct IMarketAllTypes.MarginConfig',
            name: 'IMConfig',
            type: 'tuple',
          },
          {
            components: [
              { internalType: 'uint256[2]', name: 'q', type: 'uint256[2]' },
              { internalType: 'uint64[3]', name: 'mm', type: 'uint64[3]' },
            ],
            internalType: 'struct IMarketAllTypes.MarginConfig',
            name: 'MMConfig',
            type: 'tuple',
          },
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
      { indexed: false, internalType: 'AccountPosition', name: 'user', type: 'bytes28' },
      {
        components: [
          { internalType: 'int256', name: 'size', type: 'int256' },
          { internalType: 'int256', name: 'cost', type: 'int256' },
        ],
        indexed: false,
        internalType: 'struct Trade',
        name: 'trade',
        type: 'tuple',
      },
      { indexed: false, internalType: 'uint256', name: 'fees', type: 'uint256' },
    ],
    name: 'MarketOrderFilled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'AccountPosition', name: 'user', type: 'bytes28' },
      { indexed: false, internalType: 'AccountPosition', name: 'counterParty', type: 'bytes28' },
      {
        components: [
          { internalType: 'int256', name: 'size', type: 'int256' },
          { internalType: 'int256', name: 'cost', type: 'int256' },
        ],
        indexed: false,
        internalType: 'struct Trade',
        name: 'trade',
        type: 'tuple',
      },
      { indexed: false, internalType: 'uint256', name: 'fees', type: 'uint256' },
    ],
    name: 'OtcSwap',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'AccountPosition', name: 'user', type: 'bytes28' },
      { indexed: false, internalType: 'uint256', name: 'lastIndexTimestamp', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'latestIndexTimestamp', type: 'uint256' },
      { indexed: false, internalType: 'int256', name: 'payment', type: 'int256' },
      { indexed: false, internalType: 'uint256', name: 'fees', type: 'uint256' },
    ],
    name: 'PaymentFromSettlement',
    type: 'event',
  },
  {
    inputs: [
      { internalType: 'AccountPosition', name: 'violator', type: 'bytes28' },
      { internalType: 'int256', name: 'sizeToLiquidator', type: 'int256' },
      { internalType: 'int256', name: 'healthRatio', type: 'int256' },
    ],
    name: 'calcLiqTrade',
    outputs: [
      {
        components: [
          { internalType: 'int256', name: 'size', type: 'int256' },
          { internalType: 'int256', name: 'cost', type: 'int256' },
        ],
        internalType: 'struct Trade',
        name: 'liqTrade',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'AccountPosition', name: 'user', type: 'bytes28' },
      { internalType: 'enum MarginType', name: 'marginType', type: 'uint8' },
    ],
    name: 'calcMargin',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'AccountPosition', name: 'user', type: 'bytes28' }],
    name: 'calcPositionValue',
    outputs: [{ internalType: 'int256', name: '', type: 'int256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'AccountPosition', name: 'user', type: 'bytes28' }],
    name: 'cancelAllOrders',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'AccountPosition', name: 'user', type: 'bytes28' },
      { internalType: 'OrderId[]', name: 'orderIds', type: 'uint64[]' },
    ],
    name: 'cancelOrders',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'descriptor',
    outputs: [
      { internalType: 'bool', name: 'isIsolatedOnly', type: 'bool' },
      { internalType: 'TokenId', name: 'tokenId', type: 'uint16' },
      { internalType: 'MarketId', name: 'marketId', type: 'uint40' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'enum Side', name: 'side', type: 'uint8' }],
    name: 'findBestTickToMatch',
    outputs: [
      { internalType: 'int16', name: 'bestTick', type: 'int16' },
      { internalType: 'bool', name: 'found', type: 'bool' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'AccountPosition', name: 'winningUser', type: 'bytes28' },
      { internalType: 'AccountPosition', name: 'losingUser', type: 'bytes28' },
      { internalType: 'int256', name: 'size', type: 'int256' },
    ],
    name: 'forceDeleverage',
    outputs: [
      {
        components: [
          { internalType: 'int256', name: 'size', type: 'int256' },
          { internalType: 'int256', name: 'cost', type: 'int256' },
        ],
        internalType: 'struct Trade',
        name: 'forcedTrade',
        type: 'tuple',
      },
      {
        components: [
          { internalType: 'int256', name: 'payment', type: 'int256' },
          { internalType: 'uint256', name: 'fees', type: 'uint256' },
        ],
        internalType: 'struct SettlementResult',
        name: 'settleWinningUser',
        type: 'tuple',
      },
      {
        components: [
          { internalType: 'int256', name: 'payment', type: 'int256' },
          { internalType: 'uint256', name: 'fees', type: 'uint256' },
        ],
        internalType: 'struct SettlementResult',
        name: 'settleLosingUser',
        type: 'tuple',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'AccountPosition', name: 'user', type: 'bytes28' }],
    name: 'getAllPendingOrders',
    outputs: [
      {
        components: [
          { internalType: 'enum OrderStatus', name: 'status', type: 'uint8' },
          { internalType: 'OrderId', name: 'id', type: 'uint64' },
          { internalType: 'AccountPosition', name: 'maker', type: 'bytes28' },
          { internalType: 'uint256', name: 's', type: 'uint256' },
          { internalType: 'int256', name: 'f', type: 'int256' },
        ],
        internalType: 'struct IMarketOffView.Order[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getConfig',
    outputs: [
      {
        components: [
          { internalType: 'address', name: 'markPriceOracle', type: 'address' },
          { internalType: 'uint256', name: 'OICap', type: 'uint256' },
          {
            components: [
              { internalType: 'uint64', name: 'orderBook', type: 'uint64' },
              { internalType: 'uint64', name: 'openSwap', type: 'uint64' },
              { internalType: 'uint64', name: 'settlement', type: 'uint64' },
            ],
            internalType: 'struct FeeFactors',
            name: 'feeFactors',
            type: 'tuple',
          },
          {
            components: [
              { internalType: 'address', name: 'oracle', type: 'address' },
              { internalType: 'uint40', name: 'paymentPeriod', type: 'uint40' },
              { internalType: 'uint40', name: 'maxUpdateDelay', type: 'uint40' },
            ],
            internalType: 'struct IMarketAllTypes.FIndexConfig',
            name: 'fIndexCfg',
            type: 'tuple',
          },
          {
            components: [
              { internalType: 'uint256', name: 'base', type: 'uint256' },
              { internalType: 'uint256', name: 'slope', type: 'uint256' },
            ],
            internalType: 'struct IMarketAllTypes.LiqIncentiveConfig',
            name: 'liqIncentive',
            type: 'tuple',
          },
          {
            components: [
              { internalType: 'uint256[2]', name: 'q', type: 'uint256[2]' },
              { internalType: 'uint64[3]', name: 'mm', type: 'uint64[3]' },
            ],
            internalType: 'struct IMarketAllTypes.MarginConfig',
            name: 'IMConfig',
            type: 'tuple',
          },
          {
            components: [
              { internalType: 'uint256[2]', name: 'q', type: 'uint256[2]' },
              { internalType: 'uint64[3]', name: 'mm', type: 'uint64[3]' },
            ],
            internalType: 'struct IMarketAllTypes.MarginConfig',
            name: 'MMConfig',
            type: 'tuple',
          },
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
    inputs: [{ internalType: 'AccountPosition', name: 'user', type: 'bytes28' }],
    name: 'getCountPendingOrders',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'AccountPosition', name: 'user', type: 'bytes28' }],
    name: 'getFeeFactorsDisc',
    outputs: [
      {
        components: [
          { internalType: 'uint64', name: 'orderBookDisc', type: 'uint64' },
          { internalType: 'uint64', name: 'openSwapDisc', type: 'uint64' },
          { internalType: 'uint64', name: 'settlementDisc', type: 'uint64' },
        ],
        internalType: 'struct FeeFactorsDisc',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getFilledIndexHints',
    outputs: [
      {
        components: [
          { internalType: 'OrderId', name: 'orderId', type: 'uint64' },
          { internalType: 'uint256', name: 'index', type: 'uint256' },
        ],
        internalType: 'struct FilledIndexHint[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint32', name: 'secondsAgo', type: 'uint32' }],
    name: 'getImpliedRate',
    outputs: [{ internalType: 'int256', name: '', type: 'int256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getLatestIndex',
    outputs: [{ internalType: 'FIndex', name: '', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'AccountPosition', name: 'user', type: 'bytes28' }],
    name: 'getLiqNonce',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'AccountPosition', name: 'user', type: 'bytes28' },
      { internalType: 'enum MarginType', name: 'marginType', type: 'uint8' },
    ],
    name: 'getMarginDisc',
    outputs: [
      {
        components: [{ internalType: 'uint64[3]', name: 'disc', type: 'uint64[3]' }],
        internalType: 'struct IMarketAllTypes.MarginDisc',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getMarkRate',
    outputs: [{ internalType: 'int256', name: '', type: 'int256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'AccountPosition', name: 'user', type: 'bytes28' }],
    name: 'getNotionalSize',
    outputs: [{ internalType: 'int256', name: '', type: 'int256' }],
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
          { internalType: 'AccountPosition', name: 'maker', type: 'bytes28' },
          { internalType: 'uint256', name: 's', type: 'uint256' },
          { internalType: 'int256', name: 'f', type: 'int256' },
        ],
        internalType: 'struct IMarketOffView.Order',
        name: 'order',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'AccountPosition', name: 'user', type: 'bytes28' }],
    name: 'getPendingSizes',
    outputs: [
      { internalType: 'uint256', name: 'pendingLongSize', type: 'uint256' },
      { internalType: 'uint256', name: 'pendingShortSize', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'enum Side', name: 'side', type: 'uint8' },
      { internalType: 'int16', name: 'tickIndex', type: 'int16' },
    ],
    name: 'getTickAndNext',
    outputs: [
      { internalType: 'uint256', name: 'size', type: 'uint256' },
      { internalType: 'bool', name: 'hasNext', type: 'bool' },
      { internalType: 'int16', name: 'nextTick', type: 'int16' },
    ],
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
    inputs: [{ internalType: 'uint16', name: 'cardinalityNext', type: 'uint16' }],
    name: 'increaseObservationCardinalityNext',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'string', name: 'k_name', type: 'string' },
          { internalType: 'string', name: 'k_symbol', type: 'string' },
          { internalType: 'bool', name: 'k_isIsolatedOnly', type: 'bool' },
          { internalType: 'TokenId', name: 'k_tokenId', type: 'uint16' },
          { internalType: 'MarketId', name: 'k_marketId', type: 'uint40' },
          { internalType: 'uint40', name: 'k_maturity', type: 'uint40' },
          { internalType: 'address', name: 'markPriceOracle', type: 'address' },
          { internalType: 'uint256', name: 'OICap', type: 'uint256' },
          {
            components: [
              { internalType: 'uint64', name: 'orderBook', type: 'uint64' },
              { internalType: 'uint64', name: 'openSwap', type: 'uint64' },
              { internalType: 'uint64', name: 'settlement', type: 'uint64' },
            ],
            internalType: 'struct FeeFactors',
            name: 'feeFactors',
            type: 'tuple',
          },
          {
            components: [
              { internalType: 'address', name: 'oracle', type: 'address' },
              { internalType: 'uint40', name: 'paymentPeriod', type: 'uint40' },
              { internalType: 'uint40', name: 'maxUpdateDelay', type: 'uint40' },
            ],
            internalType: 'struct IMarketAllTypes.FIndexConfig',
            name: 'fIndexCfg',
            type: 'tuple',
          },
          {
            components: [
              { internalType: 'uint256', name: 'base', type: 'uint256' },
              { internalType: 'uint256', name: 'slope', type: 'uint256' },
            ],
            internalType: 'struct IMarketAllTypes.LiqIncentiveConfig',
            name: 'liqIncentive',
            type: 'tuple',
          },
          {
            components: [
              { internalType: 'uint256[2]', name: 'q', type: 'uint256[2]' },
              { internalType: 'uint64[3]', name: 'mm', type: 'uint64[3]' },
            ],
            internalType: 'struct IMarketAllTypes.MarginConfig',
            name: 'IMConfig',
            type: 'tuple',
          },
          {
            components: [
              { internalType: 'uint256[2]', name: 'q', type: 'uint256[2]' },
              { internalType: 'uint64[3]', name: 'mm', type: 'uint64[3]' },
            ],
            internalType: 'struct IMarketAllTypes.MarginConfig',
            name: 'MMConfig',
            type: 'tuple',
          },
        ],
        internalType: 'struct IMarketAllTypes.MarketCtx',
        name: 'initialCtx',
        type: 'tuple',
      },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'isExpired',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'AccountPosition', name: 'liquidator', type: 'bytes28' },
      { internalType: 'AccountPosition', name: 'violator', type: 'bytes28' },
      { internalType: 'int256', name: 'sizeToLiquidator', type: 'int256' },
      { internalType: 'int256', name: 'healthRatio', type: 'int256' },
    ],
    name: 'liquidate',
    outputs: [
      {
        components: [
          { internalType: 'int256', name: 'size', type: 'int256' },
          { internalType: 'int256', name: 'cost', type: 'int256' },
        ],
        internalType: 'struct Trade',
        name: 'liqTrade',
        type: 'tuple',
      },
      { internalType: 'uint256', name: 'fees', type: 'uint256' },
      {
        components: [
          { internalType: 'int256', name: 'payment', type: 'int256' },
          { internalType: 'uint256', name: 'fees', type: 'uint256' },
        ],
        internalType: 'struct SettlementResult',
        name: 'settleLiquidator',
        type: 'tuple',
      },
      {
        components: [
          { internalType: 'int256', name: 'payment', type: 'int256' },
          { internalType: 'uint256', name: 'fees', type: 'uint256' },
        ],
        internalType: 'struct SettlementResult',
        name: 'settleViolator',
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
    name: 'maturity',
    outputs: [{ internalType: 'uint40', name: '', type: 'uint40' }],
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
    name: 'nextFIndexUpdateTimestamp',
    outputs: [{ internalType: 'uint40', name: '', type: 'uint40' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'AccountPosition', name: 'user', type: 'bytes28' },
      { internalType: 'AccountPosition', name: 'counterParty', type: 'bytes28' },
      {
        components: [
          { internalType: 'int256', name: 'size', type: 'int256' },
          { internalType: 'int256', name: 'cost', type: 'int256' },
        ],
        internalType: 'struct Trade',
        name: 'trade',
        type: 'tuple',
      },
    ],
    name: 'otcSwap',
    outputs: [
      { internalType: 'uint256', name: 'fees', type: 'uint256' },
      {
        components: [
          { internalType: 'int256', name: 'payment', type: 'int256' },
          { internalType: 'uint256', name: 'fees', type: 'uint256' },
        ],
        internalType: 'struct SettlementResult',
        name: 'settleUser',
        type: 'tuple',
      },
      {
        components: [
          { internalType: 'int256', name: 'payment', type: 'int256' },
          { internalType: 'uint256', name: 'fees', type: 'uint256' },
        ],
        internalType: 'struct SettlementResult',
        name: 'settleCounterParty',
        type: 'tuple',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'AccountPosition', name: 'user', type: 'bytes28' },
      { internalType: 'enum Side', name: 'side', type: 'uint8' },
      { internalType: 'uint256', name: 'size', type: 'uint256' },
      { internalType: 'int16', name: 'limitTick', type: 'int16' },
      { internalType: 'enum TimeInForce', name: 'tif', type: 'uint8' },
    ],
    name: 'placeOrder',
    outputs: [
      {
        components: [
          { internalType: 'int256', name: 'size', type: 'int256' },
          { internalType: 'int256', name: 'cost', type: 'int256' },
        ],
        internalType: 'struct Trade',
        name: 'matched',
        type: 'tuple',
      },
      { internalType: 'uint256', name: 'fees', type: 'uint256' },
      { internalType: 'AccountPosition', name: 'maker', type: 'bytes28' },
      {
        components: [
          { internalType: 'int256', name: 'payment', type: 'int256' },
          { internalType: 'uint256', name: 'fees', type: 'uint256' },
        ],
        internalType: 'struct SettlementResult',
        name: 'settleUser',
        type: 'tuple',
      },
      {
        components: [
          { internalType: 'int256', name: 'payment', type: 'int256' },
          { internalType: 'uint256', name: 'fees', type: 'uint256' },
        ],
        internalType: 'struct SettlementResult',
        name: 'settleMaker',
        type: 'tuple',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'AccountPosition', name: 'user', type: 'bytes28' },
      {
        components: [
          { internalType: 'uint64', name: 'orderBookDisc', type: 'uint64' },
          { internalType: 'uint64', name: 'openSwapDisc', type: 'uint64' },
          { internalType: 'uint64', name: 'settlementDisc', type: 'uint64' },
        ],
        internalType: 'struct FeeFactorsDisc',
        name: 'discFactors',
        type: 'tuple',
      },
    ],
    name: 'setFeeFactorsDisc',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'OrderId', name: 'orderId', type: 'uint64' },
          { internalType: 'uint256', name: 'index', type: 'uint256' },
        ],
        internalType: 'struct FilledIndexHint[]',
        name: 'hints',
        type: 'tuple[]',
      },
    ],
    name: 'setFilledIndexHints',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'AccountPosition', name: 'user', type: 'bytes28' },
      { internalType: 'enum MarginType', name: 'marginType', type: 'uint8' },
      {
        components: [{ internalType: 'uint64[3]', name: 'disc', type: 'uint64[3]' }],
        internalType: 'struct IMarketAllTypes.MarginDisc',
        name: 'config',
        type: 'tuple',
      },
    ],
    name: 'setMarginDisc',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'markPriceOracle', type: 'address' },
          { internalType: 'uint256', name: 'OICap', type: 'uint256' },
          {
            components: [
              { internalType: 'uint64', name: 'orderBook', type: 'uint64' },
              { internalType: 'uint64', name: 'openSwap', type: 'uint64' },
              { internalType: 'uint64', name: 'settlement', type: 'uint64' },
            ],
            internalType: 'struct FeeFactors',
            name: 'feeFactors',
            type: 'tuple',
          },
          {
            components: [
              { internalType: 'address', name: 'oracle', type: 'address' },
              { internalType: 'uint40', name: 'paymentPeriod', type: 'uint40' },
              { internalType: 'uint40', name: 'maxUpdateDelay', type: 'uint40' },
            ],
            internalType: 'struct IMarketAllTypes.FIndexConfig',
            name: 'fIndexCfg',
            type: 'tuple',
          },
          {
            components: [
              { internalType: 'uint256', name: 'base', type: 'uint256' },
              { internalType: 'uint256', name: 'slope', type: 'uint256' },
            ],
            internalType: 'struct IMarketAllTypes.LiqIncentiveConfig',
            name: 'liqIncentive',
            type: 'tuple',
          },
          {
            components: [
              { internalType: 'uint256[2]', name: 'q', type: 'uint256[2]' },
              { internalType: 'uint64[3]', name: 'mm', type: 'uint64[3]' },
            ],
            internalType: 'struct IMarketAllTypes.MarginConfig',
            name: 'IMConfig',
            type: 'tuple',
          },
          {
            components: [
              { internalType: 'uint256[2]', name: 'q', type: 'uint256[2]' },
              { internalType: 'uint64[3]', name: 'mm', type: 'uint64[3]' },
            ],
            internalType: 'struct IMarketAllTypes.MarginConfig',
            name: 'MMConfig',
            type: 'tuple',
          },
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
    inputs: [{ internalType: 'AccountPosition', name: 'user', type: 'bytes28' }],
    name: 'settlePaymentAndOrders',
    outputs: [
      {
        components: [
          { internalType: 'int256', name: 'payment', type: 'int256' },
          { internalType: 'uint256', name: 'fees', type: 'uint256' },
        ],
        internalType: 'struct SettlementResult',
        name: '',
        type: 'tuple',
      },
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
    inputs: [{ internalType: 'AccountPosition', name: 'user', type: 'bytes28' }],
    name: 'tryExitMarket',
    outputs: [
      {
        components: [
          { internalType: 'int256', name: 'payment', type: 'int256' },
          { internalType: 'uint256', name: 'fees', type: 'uint256' },
        ],
        internalType: 'struct SettlementResult',
        name: '',
        type: 'tuple',
      },
      { internalType: 'bool', name: 'exited', type: 'bool' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  { inputs: [], name: 'updateFIndex', outputs: [], stateMutability: 'nonpayable', type: 'function' },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IMarketAllEvents
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iMarketAllEventsAbi = [
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'FIndex', name: 'oldIndex', type: 'bytes32' },
      { indexed: false, internalType: 'FIndex', name: 'newIndex', type: 'bytes32' },
    ],
    name: 'FIndexUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'AccountPosition', name: 'winningUser', type: 'bytes28' },
      { indexed: false, internalType: 'AccountPosition', name: 'losingUser', type: 'bytes28' },
      {
        components: [
          { internalType: 'int256', name: 'size', type: 'int256' },
          { internalType: 'int256', name: 'cost', type: 'int256' },
        ],
        indexed: false,
        internalType: 'struct Trade',
        name: 'trade',
        type: 'tuple',
      },
    ],
    name: 'ForceDeleverage',
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
      { indexed: false, internalType: 'int16', name: 'tick', type: 'int16' },
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
      { indexed: false, internalType: 'AccountPosition', name: 'maker', type: 'bytes28' },
      { indexed: false, internalType: 'OrderId', name: 'orderId', type: 'uint64' },
      { indexed: false, internalType: 'uint256', name: 'size', type: 'uint256' },
    ],
    name: 'LimitOrderPlaced',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'AccountPosition', name: 'liquidator', type: 'bytes28' },
      { indexed: false, internalType: 'AccountPosition', name: 'violator', type: 'bytes28' },
      {
        components: [
          { internalType: 'int256', name: 'size', type: 'int256' },
          { internalType: 'int256', name: 'cost', type: 'int256' },
        ],
        indexed: false,
        internalType: 'struct Trade',
        name: 'liqTrade',
        type: 'tuple',
      },
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
          { internalType: 'address', name: 'markPriceOracle', type: 'address' },
          { internalType: 'uint256', name: 'OICap', type: 'uint256' },
          {
            components: [
              { internalType: 'uint64', name: 'orderBook', type: 'uint64' },
              { internalType: 'uint64', name: 'openSwap', type: 'uint64' },
              { internalType: 'uint64', name: 'settlement', type: 'uint64' },
            ],
            internalType: 'struct FeeFactors',
            name: 'feeFactors',
            type: 'tuple',
          },
          {
            components: [
              { internalType: 'address', name: 'oracle', type: 'address' },
              { internalType: 'uint40', name: 'paymentPeriod', type: 'uint40' },
              { internalType: 'uint40', name: 'maxUpdateDelay', type: 'uint40' },
            ],
            internalType: 'struct IMarketAllTypes.FIndexConfig',
            name: 'fIndexCfg',
            type: 'tuple',
          },
          {
            components: [
              { internalType: 'uint256', name: 'base', type: 'uint256' },
              { internalType: 'uint256', name: 'slope', type: 'uint256' },
            ],
            internalType: 'struct IMarketAllTypes.LiqIncentiveConfig',
            name: 'liqIncentive',
            type: 'tuple',
          },
          {
            components: [
              { internalType: 'uint256[2]', name: 'q', type: 'uint256[2]' },
              { internalType: 'uint64[3]', name: 'mm', type: 'uint64[3]' },
            ],
            internalType: 'struct IMarketAllTypes.MarginConfig',
            name: 'IMConfig',
            type: 'tuple',
          },
          {
            components: [
              { internalType: 'uint256[2]', name: 'q', type: 'uint256[2]' },
              { internalType: 'uint64[3]', name: 'mm', type: 'uint64[3]' },
            ],
            internalType: 'struct IMarketAllTypes.MarginConfig',
            name: 'MMConfig',
            type: 'tuple',
          },
        ],
        indexed: false,
        internalType: 'struct IMarketAllTypes.MarketConfigStruct',
        name: 'oldConfig',
        type: 'tuple',
      },
      {
        components: [
          { internalType: 'address', name: 'markPriceOracle', type: 'address' },
          { internalType: 'uint256', name: 'OICap', type: 'uint256' },
          {
            components: [
              { internalType: 'uint64', name: 'orderBook', type: 'uint64' },
              { internalType: 'uint64', name: 'openSwap', type: 'uint64' },
              { internalType: 'uint64', name: 'settlement', type: 'uint64' },
            ],
            internalType: 'struct FeeFactors',
            name: 'feeFactors',
            type: 'tuple',
          },
          {
            components: [
              { internalType: 'address', name: 'oracle', type: 'address' },
              { internalType: 'uint40', name: 'paymentPeriod', type: 'uint40' },
              { internalType: 'uint40', name: 'maxUpdateDelay', type: 'uint40' },
            ],
            internalType: 'struct IMarketAllTypes.FIndexConfig',
            name: 'fIndexCfg',
            type: 'tuple',
          },
          {
            components: [
              { internalType: 'uint256', name: 'base', type: 'uint256' },
              { internalType: 'uint256', name: 'slope', type: 'uint256' },
            ],
            internalType: 'struct IMarketAllTypes.LiqIncentiveConfig',
            name: 'liqIncentive',
            type: 'tuple',
          },
          {
            components: [
              { internalType: 'uint256[2]', name: 'q', type: 'uint256[2]' },
              { internalType: 'uint64[3]', name: 'mm', type: 'uint64[3]' },
            ],
            internalType: 'struct IMarketAllTypes.MarginConfig',
            name: 'IMConfig',
            type: 'tuple',
          },
          {
            components: [
              { internalType: 'uint256[2]', name: 'q', type: 'uint256[2]' },
              { internalType: 'uint64[3]', name: 'mm', type: 'uint64[3]' },
            ],
            internalType: 'struct IMarketAllTypes.MarginConfig',
            name: 'MMConfig',
            type: 'tuple',
          },
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
      { indexed: false, internalType: 'AccountPosition', name: 'user', type: 'bytes28' },
      {
        components: [
          { internalType: 'int256', name: 'size', type: 'int256' },
          { internalType: 'int256', name: 'cost', type: 'int256' },
        ],
        indexed: false,
        internalType: 'struct Trade',
        name: 'trade',
        type: 'tuple',
      },
      { indexed: false, internalType: 'uint256', name: 'fees', type: 'uint256' },
    ],
    name: 'MarketOrderFilled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'AccountPosition', name: 'user', type: 'bytes28' },
      { indexed: false, internalType: 'AccountPosition', name: 'counterParty', type: 'bytes28' },
      {
        components: [
          { internalType: 'int256', name: 'size', type: 'int256' },
          { internalType: 'int256', name: 'cost', type: 'int256' },
        ],
        indexed: false,
        internalType: 'struct Trade',
        name: 'trade',
        type: 'tuple',
      },
      { indexed: false, internalType: 'uint256', name: 'fees', type: 'uint256' },
    ],
    name: 'OtcSwap',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'AccountPosition', name: 'user', type: 'bytes28' },
      { indexed: false, internalType: 'uint256', name: 'lastIndexTimestamp', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'latestIndexTimestamp', type: 'uint256' },
      { indexed: false, internalType: 'int256', name: 'payment', type: 'int256' },
      { indexed: false, internalType: 'uint256', name: 'fees', type: 'uint256' },
    ],
    name: 'PaymentFromSettlement',
    type: 'event',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IMarketOffView
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iMarketOffViewAbi = [
  {
    inputs: [{ internalType: 'AccountPosition', name: 'user', type: 'bytes28' }],
    name: 'getAllPendingOrders',
    outputs: [
      {
        components: [
          { internalType: 'enum OrderStatus', name: 'status', type: 'uint8' },
          { internalType: 'OrderId', name: 'id', type: 'uint64' },
          { internalType: 'AccountPosition', name: 'maker', type: 'bytes28' },
          { internalType: 'uint256', name: 's', type: 'uint256' },
          { internalType: 'int256', name: 'f', type: 'int256' },
        ],
        internalType: 'struct IMarketOffView.Order[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getConfig',
    outputs: [
      {
        components: [
          { internalType: 'address', name: 'markPriceOracle', type: 'address' },
          { internalType: 'uint256', name: 'OICap', type: 'uint256' },
          {
            components: [
              { internalType: 'uint64', name: 'orderBook', type: 'uint64' },
              { internalType: 'uint64', name: 'openSwap', type: 'uint64' },
              { internalType: 'uint64', name: 'settlement', type: 'uint64' },
            ],
            internalType: 'struct FeeFactors',
            name: 'feeFactors',
            type: 'tuple',
          },
          {
            components: [
              { internalType: 'address', name: 'oracle', type: 'address' },
              { internalType: 'uint40', name: 'paymentPeriod', type: 'uint40' },
              { internalType: 'uint40', name: 'maxUpdateDelay', type: 'uint40' },
            ],
            internalType: 'struct IMarketAllTypes.FIndexConfig',
            name: 'fIndexCfg',
            type: 'tuple',
          },
          {
            components: [
              { internalType: 'uint256', name: 'base', type: 'uint256' },
              { internalType: 'uint256', name: 'slope', type: 'uint256' },
            ],
            internalType: 'struct IMarketAllTypes.LiqIncentiveConfig',
            name: 'liqIncentive',
            type: 'tuple',
          },
          {
            components: [
              { internalType: 'uint256[2]', name: 'q', type: 'uint256[2]' },
              { internalType: 'uint64[3]', name: 'mm', type: 'uint64[3]' },
            ],
            internalType: 'struct IMarketAllTypes.MarginConfig',
            name: 'IMConfig',
            type: 'tuple',
          },
          {
            components: [
              { internalType: 'uint256[2]', name: 'q', type: 'uint256[2]' },
              { internalType: 'uint64[3]', name: 'mm', type: 'uint64[3]' },
            ],
            internalType: 'struct IMarketAllTypes.MarginConfig',
            name: 'MMConfig',
            type: 'tuple',
          },
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
    inputs: [{ internalType: 'AccountPosition', name: 'user', type: 'bytes28' }],
    name: 'getFeeFactorsDisc',
    outputs: [
      {
        components: [
          { internalType: 'uint64', name: 'orderBookDisc', type: 'uint64' },
          { internalType: 'uint64', name: 'openSwapDisc', type: 'uint64' },
          { internalType: 'uint64', name: 'settlementDisc', type: 'uint64' },
        ],
        internalType: 'struct FeeFactorsDisc',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint32', name: 'secondsAgo', type: 'uint32' }],
    name: 'getImpliedRate',
    outputs: [{ internalType: 'int256', name: '', type: 'int256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'AccountPosition', name: 'user', type: 'bytes28' },
      { internalType: 'enum MarginType', name: 'marginType', type: 'uint8' },
    ],
    name: 'getMarginDisc',
    outputs: [
      {
        components: [{ internalType: 'uint64[3]', name: 'disc', type: 'uint64[3]' }],
        internalType: 'struct IMarketAllTypes.MarginDisc',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getMarkRate',
    outputs: [{ internalType: 'int256', name: '', type: 'int256' }],
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
          { internalType: 'AccountPosition', name: 'maker', type: 'bytes28' },
          { internalType: 'uint256', name: 's', type: 'uint256' },
          { internalType: 'int256', name: 'f', type: 'int256' },
        ],
        internalType: 'struct IMarketOffView.Order',
        name: 'order',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'AccountPosition', name: 'user', type: 'bytes28' }],
    name: 'getPendingSizes',
    outputs: [
      { internalType: 'uint256', name: 'pendingLongSize', type: 'uint256' },
      { internalType: 'uint256', name: 'pendingShortSize', type: 'uint256' },
    ],
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
    name: 'nextFIndexUpdateTimestamp',
    outputs: [{ internalType: 'uint40', name: '', type: 'uint40' }],
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
// IMarketAllTypes
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iMarketAllTypesAbi = [] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IMarket2
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iMarket2Abi = [
  {
    inputs: [],
    name: 'getFilledIndexHints',
    outputs: [
      {
        components: [
          { internalType: 'OrderId', name: 'orderId', type: 'uint64' },
          { internalType: 'uint256', name: 'index', type: 'uint256' },
        ],
        internalType: 'struct FilledIndexHint[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint16', name: 'cardinalityNext', type: 'uint16' }],
    name: 'increaseObservationCardinalityNext',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'string', name: 'k_name', type: 'string' },
          { internalType: 'string', name: 'k_symbol', type: 'string' },
          { internalType: 'bool', name: 'k_isIsolatedOnly', type: 'bool' },
          { internalType: 'TokenId', name: 'k_tokenId', type: 'uint16' },
          { internalType: 'MarketId', name: 'k_marketId', type: 'uint40' },
          { internalType: 'uint40', name: 'k_maturity', type: 'uint40' },
          { internalType: 'address', name: 'markPriceOracle', type: 'address' },
          { internalType: 'uint256', name: 'OICap', type: 'uint256' },
          {
            components: [
              { internalType: 'uint64', name: 'orderBook', type: 'uint64' },
              { internalType: 'uint64', name: 'openSwap', type: 'uint64' },
              { internalType: 'uint64', name: 'settlement', type: 'uint64' },
            ],
            internalType: 'struct FeeFactors',
            name: 'feeFactors',
            type: 'tuple',
          },
          {
            components: [
              { internalType: 'address', name: 'oracle', type: 'address' },
              { internalType: 'uint40', name: 'paymentPeriod', type: 'uint40' },
              { internalType: 'uint40', name: 'maxUpdateDelay', type: 'uint40' },
            ],
            internalType: 'struct IMarketAllTypes.FIndexConfig',
            name: 'fIndexCfg',
            type: 'tuple',
          },
          {
            components: [
              { internalType: 'uint256', name: 'base', type: 'uint256' },
              { internalType: 'uint256', name: 'slope', type: 'uint256' },
            ],
            internalType: 'struct IMarketAllTypes.LiqIncentiveConfig',
            name: 'liqIncentive',
            type: 'tuple',
          },
          {
            components: [
              { internalType: 'uint256[2]', name: 'q', type: 'uint256[2]' },
              { internalType: 'uint64[3]', name: 'mm', type: 'uint64[3]' },
            ],
            internalType: 'struct IMarketAllTypes.MarginConfig',
            name: 'IMConfig',
            type: 'tuple',
          },
          {
            components: [
              { internalType: 'uint256[2]', name: 'q', type: 'uint256[2]' },
              { internalType: 'uint64[3]', name: 'mm', type: 'uint64[3]' },
            ],
            internalType: 'struct IMarketAllTypes.MarginConfig',
            name: 'MMConfig',
            type: 'tuple',
          },
        ],
        internalType: 'struct IMarketAllTypes.MarketCtx',
        name: 'initialCtx',
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
      { internalType: 'AccountPosition', name: 'user', type: 'bytes28' },
      {
        components: [
          { internalType: 'uint64', name: 'orderBookDisc', type: 'uint64' },
          { internalType: 'uint64', name: 'openSwapDisc', type: 'uint64' },
          { internalType: 'uint64', name: 'settlementDisc', type: 'uint64' },
        ],
        internalType: 'struct FeeFactorsDisc',
        name: 'discFactors',
        type: 'tuple',
      },
    ],
    name: 'setFeeFactorsDisc',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'OrderId', name: 'orderId', type: 'uint64' },
          { internalType: 'uint256', name: 'index', type: 'uint256' },
        ],
        internalType: 'struct FilledIndexHint[]',
        name: 'hints',
        type: 'tuple[]',
      },
    ],
    name: 'setFilledIndexHints',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'AccountPosition', name: 'user', type: 'bytes28' },
      { internalType: 'enum MarginType', name: 'marginType', type: 'uint8' },
      {
        components: [{ internalType: 'uint64[3]', name: 'disc', type: 'uint64[3]' }],
        internalType: 'struct IMarketAllTypes.MarginDisc',
        name: 'config',
        type: 'tuple',
      },
    ],
    name: 'setMarginDisc',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'markPriceOracle', type: 'address' },
          { internalType: 'uint256', name: 'OICap', type: 'uint256' },
          {
            components: [
              { internalType: 'uint64', name: 'orderBook', type: 'uint64' },
              { internalType: 'uint64', name: 'openSwap', type: 'uint64' },
              { internalType: 'uint64', name: 'settlement', type: 'uint64' },
            ],
            internalType: 'struct FeeFactors',
            name: 'feeFactors',
            type: 'tuple',
          },
          {
            components: [
              { internalType: 'address', name: 'oracle', type: 'address' },
              { internalType: 'uint40', name: 'paymentPeriod', type: 'uint40' },
              { internalType: 'uint40', name: 'maxUpdateDelay', type: 'uint40' },
            ],
            internalType: 'struct IMarketAllTypes.FIndexConfig',
            name: 'fIndexCfg',
            type: 'tuple',
          },
          {
            components: [
              { internalType: 'uint256', name: 'base', type: 'uint256' },
              { internalType: 'uint256', name: 'slope', type: 'uint256' },
            ],
            internalType: 'struct IMarketAllTypes.LiqIncentiveConfig',
            name: 'liqIncentive',
            type: 'tuple',
          },
          {
            components: [
              { internalType: 'uint256[2]', name: 'q', type: 'uint256[2]' },
              { internalType: 'uint64[3]', name: 'mm', type: 'uint64[3]' },
            ],
            internalType: 'struct IMarketAllTypes.MarginConfig',
            name: 'IMConfig',
            type: 'tuple',
          },
          {
            components: [
              { internalType: 'uint256[2]', name: 'q', type: 'uint256[2]' },
              { internalType: 'uint64[3]', name: 'mm', type: 'uint64[3]' },
            ],
            internalType: 'struct IMarketAllTypes.MarginConfig',
            name: 'MMConfig',
            type: 'tuple',
          },
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
  { inputs: [], name: 'updateFIndex', outputs: [], stateMutability: 'nonpayable', type: 'function' },
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
    inputs: [{ internalType: 'address', name: 'market', type: 'address' }],
    name: 'getMarketInfo',
    outputs: [
      {
        components: [
          { internalType: 'string', name: 'name', type: 'string' },
          { internalType: 'string', name: 'symbol', type: 'string' },
          { internalType: 'bool', name: 'isIsolatedOnly', type: 'bool' },
          { internalType: 'TokenId', name: 'tokenId', type: 'uint16' },
          { internalType: 'MarketId', name: 'marketId', type: 'uint40' },
          { internalType: 'uint40', name: 'maturity', type: 'uint40' },
          { internalType: 'int256', name: 'impliedApr', type: 'int256' },
          { internalType: 'int256', name: 'underlyingApr', type: 'int256' },
          { internalType: 'uint40', name: 'nextSettlementTime', type: 'uint40' },
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
      { internalType: 'address', name: 'market', type: 'address' },
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
    inputs: [{ internalType: 'AccountPosition', name: 'user', type: 'bytes28' }],
    name: 'getUserInfo',
    outputs: [
      {
        components: [
          { internalType: 'int256', name: 'totalCash', type: 'int256' },
          {
            components: [
              { internalType: 'address', name: 'market', type: 'address' },
              { internalType: 'int256', name: 'notionalSize', type: 'int256' },
              { internalType: 'int256', name: 'positionValue', type: 'int256' },
              { internalType: 'int256', name: 'liquidationApr', type: 'int256' },
              { internalType: 'uint256', name: 'initialMargin', type: 'uint256' },
              { internalType: 'uint256', name: 'maintMargin', type: 'uint256' },
              {
                components: [
                  { internalType: 'enum OrderStatus', name: 'status', type: 'uint8' },
                  { internalType: 'OrderId', name: 'id', type: 'uint64' },
                  { internalType: 'AccountPosition', name: 'maker', type: 'bytes28' },
                  { internalType: 'uint256', name: 's', type: 'uint256' },
                  { internalType: 'int256', name: 'f', type: 'int256' },
                ],
                internalType: 'struct IMarketOffView.Order[]',
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
      { internalType: 'AccountPosition', name: 'user', type: 'bytes28' },
      { internalType: 'address', name: 'market', type: 'address' },
      { internalType: 'bool', name: 'cancelAll', type: 'bool' },
      { internalType: 'OrderId[]', name: 'orderIds', type: 'uint64[]' },
    ],
    name: 'getUserInfoAfterCancelOrders',
    outputs: [
      {
        components: [
          { internalType: 'int256', name: 'totalCash', type: 'int256' },
          {
            components: [
              { internalType: 'address', name: 'market', type: 'address' },
              { internalType: 'int256', name: 'notionalSize', type: 'int256' },
              { internalType: 'int256', name: 'positionValue', type: 'int256' },
              { internalType: 'int256', name: 'liquidationApr', type: 'int256' },
              { internalType: 'uint256', name: 'initialMargin', type: 'uint256' },
              { internalType: 'uint256', name: 'maintMargin', type: 'uint256' },
              {
                components: [
                  { internalType: 'enum OrderStatus', name: 'status', type: 'uint8' },
                  { internalType: 'OrderId', name: 'id', type: 'uint64' },
                  { internalType: 'AccountPosition', name: 'maker', type: 'bytes28' },
                  { internalType: 'uint256', name: 's', type: 'uint256' },
                  { internalType: 'int256', name: 'f', type: 'int256' },
                ],
                internalType: 'struct IMarketOffView.Order[]',
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
              { internalType: 'int256', name: 'notionalSize', type: 'int256' },
              { internalType: 'int256', name: 'positionValue', type: 'int256' },
              { internalType: 'int256', name: 'liquidationApr', type: 'int256' },
              { internalType: 'uint256', name: 'initialMargin', type: 'uint256' },
              { internalType: 'uint256', name: 'maintMargin', type: 'uint256' },
              {
                components: [
                  { internalType: 'enum OrderStatus', name: 'status', type: 'uint8' },
                  { internalType: 'OrderId', name: 'id', type: 'uint64' },
                  { internalType: 'AccountPosition', name: 'maker', type: 'bytes28' },
                  { internalType: 'uint256', name: 's', type: 'uint256' },
                  { internalType: 'int256', name: 'f', type: 'int256' },
                ],
                internalType: 'struct IMarketOffView.Order[]',
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
      { internalType: 'AccountPosition', name: 'user', type: 'bytes28' },
      { internalType: 'address', name: 'market', type: 'address' },
      { internalType: 'address[]', name: 'ammAddresses', type: 'address[]' },
      { internalType: 'enum Side', name: 'side', type: 'uint8' },
      { internalType: 'uint256', name: 'size', type: 'uint256' },
      { internalType: 'int16', name: 'limitTick', type: 'int16' },
      { internalType: 'enum TimeInForce', name: 'tif', type: 'uint8' },
      { internalType: 'bool', name: 'useOrderBook', type: 'bool' },
    ],
    name: 'getUserInfoAfterPlaceOrder',
    outputs: [
      {
        components: [
          { internalType: 'int256', name: 'totalCash', type: 'int256' },
          {
            components: [
              { internalType: 'address', name: 'market', type: 'address' },
              { internalType: 'int256', name: 'notionalSize', type: 'int256' },
              { internalType: 'int256', name: 'positionValue', type: 'int256' },
              { internalType: 'int256', name: 'liquidationApr', type: 'int256' },
              { internalType: 'uint256', name: 'initialMargin', type: 'uint256' },
              { internalType: 'uint256', name: 'maintMargin', type: 'uint256' },
              {
                components: [
                  { internalType: 'enum OrderStatus', name: 'status', type: 'uint8' },
                  { internalType: 'OrderId', name: 'id', type: 'uint64' },
                  { internalType: 'AccountPosition', name: 'maker', type: 'bytes28' },
                  { internalType: 'uint256', name: 's', type: 'uint256' },
                  { internalType: 'int256', name: 'f', type: 'int256' },
                ],
                internalType: 'struct IMarketOffView.Order[]',
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
              { internalType: 'int256', name: 'notionalSize', type: 'int256' },
              { internalType: 'int256', name: 'positionValue', type: 'int256' },
              { internalType: 'int256', name: 'liquidationApr', type: 'int256' },
              { internalType: 'uint256', name: 'initialMargin', type: 'uint256' },
              { internalType: 'uint256', name: 'maintMargin', type: 'uint256' },
              {
                components: [
                  { internalType: 'enum OrderStatus', name: 'status', type: 'uint8' },
                  { internalType: 'OrderId', name: 'id', type: 'uint64' },
                  { internalType: 'AccountPosition', name: 'maker', type: 'bytes28' },
                  { internalType: 'uint256', name: 's', type: 'uint256' },
                  { internalType: 'int256', name: 'f', type: 'int256' },
                ],
                internalType: 'struct IMarketOffView.Order[]',
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
      {
        components: [
          { internalType: 'int256', name: 'size', type: 'int256' },
          { internalType: 'int256', name: 'cost', type: 'int256' },
        ],
        internalType: 'struct Trade',
        name: 'matched',
        type: 'tuple',
      },
      { internalType: 'uint256', name: 'marginRequired', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'AccountPosition', name: 'user', type: 'bytes28' },
      { internalType: 'bytes[]', name: 'data', type: 'bytes[]' },
    ],
    name: 'getUserInfoAfterSimulate',
    outputs: [
      {
        components: [
          { internalType: 'int256', name: 'totalCash', type: 'int256' },
          {
            components: [
              { internalType: 'address', name: 'market', type: 'address' },
              { internalType: 'int256', name: 'notionalSize', type: 'int256' },
              { internalType: 'int256', name: 'positionValue', type: 'int256' },
              { internalType: 'int256', name: 'liquidationApr', type: 'int256' },
              { internalType: 'uint256', name: 'initialMargin', type: 'uint256' },
              { internalType: 'uint256', name: 'maintMargin', type: 'uint256' },
              {
                components: [
                  { internalType: 'enum OrderStatus', name: 'status', type: 'uint8' },
                  { internalType: 'OrderId', name: 'id', type: 'uint64' },
                  { internalType: 'AccountPosition', name: 'maker', type: 'bytes28' },
                  { internalType: 'uint256', name: 's', type: 'uint256' },
                  { internalType: 'int256', name: 'f', type: 'int256' },
                ],
                internalType: 'struct IMarketOffView.Order[]',
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
              { internalType: 'int256', name: 'notionalSize', type: 'int256' },
              { internalType: 'int256', name: 'positionValue', type: 'int256' },
              { internalType: 'int256', name: 'liquidationApr', type: 'int256' },
              { internalType: 'uint256', name: 'initialMargin', type: 'uint256' },
              { internalType: 'uint256', name: 'maintMargin', type: 'uint256' },
              {
                components: [
                  { internalType: 'enum OrderStatus', name: 'status', type: 'uint8' },
                  { internalType: 'OrderId', name: 'id', type: 'uint64' },
                  { internalType: 'AccountPosition', name: 'maker', type: 'bytes28' },
                  { internalType: 'uint256', name: 's', type: 'uint256' },
                  { internalType: 'int256', name: 'f', type: 'int256' },
                ],
                internalType: 'struct IMarketOffView.Order[]',
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
      { internalType: 'bytes[]', name: 'results', type: 'bytes[]' },
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
    inputs: [
      { internalType: 'bool', name: 'cross', type: 'bool' },
      { internalType: 'address', name: 'ammAddr', type: 'address' },
      { internalType: 'int256', name: 'cashIn', type: 'int256' },
    ],
    name: 'addLiquidityDualToAmm',
    outputs: [
      { internalType: 'uint256', name: 'lpAmount', type: 'uint256' },
      { internalType: 'int256', name: 'sizeIn', type: 'int256' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'bool', name: 'cross', type: 'bool' },
      { internalType: 'address', name: 'market', type: 'address' },
      { internalType: 'bool', name: 'cancelAll', type: 'bool' },
      { internalType: 'OrderId[]', name: 'orderIds', type: 'uint64[]' },
    ],
    name: 'cancelOrders',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'bool', name: 'cross', type: 'bool' },
      { internalType: 'address', name: 'market', type: 'address' },
    ],
    name: 'enterMarket',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'bool', name: 'cross', type: 'bool' },
      { internalType: 'address', name: 'market', type: 'address' },
    ],
    name: 'exitMarket',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'bool', name: 'cross', type: 'bool' },
      { internalType: 'address', name: 'market', type: 'address' },
      { internalType: 'AccountPosition', name: 'violator', type: 'bytes28' },
      { internalType: 'int256', name: 'sizeToLiquidator', type: 'int256' },
    ],
    name: 'liquidate',
    outputs: [
      {
        components: [
          { internalType: 'int256', name: 'size', type: 'int256' },
          { internalType: 'int256', name: 'cost', type: 'int256' },
        ],
        internalType: 'struct Trade',
        name: 'liqTrade',
        type: 'tuple',
      },
      { internalType: 'uint256', name: 'fees', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'bool', name: 'cross', type: 'bool' },
      { internalType: 'address', name: 'market', type: 'address' },
      { internalType: 'address[]', name: 'ammAddresses', type: 'address[]' },
      { internalType: 'enum Side', name: 'side', type: 'uint8' },
      { internalType: 'uint256', name: 'size', type: 'uint256' },
      { internalType: 'int16', name: 'limitTick', type: 'int16' },
      { internalType: 'enum TimeInForce', name: 'tif', type: 'uint8' },
      { internalType: 'bool', name: 'useOrderBook', type: 'bool' },
    ],
    name: 'placeOrder',
    outputs: [
      {
        components: [
          { internalType: 'int256', name: 'size', type: 'int256' },
          { internalType: 'int256', name: 'cost', type: 'int256' },
        ],
        internalType: 'struct Trade',
        name: 'matched',
        type: 'tuple',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'bool', name: 'cross', type: 'bool' },
      { internalType: 'address', name: 'market', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
      { internalType: 'bool', name: 'isDeposit', type: 'bool' },
    ],
    name: 'positionTransfer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'bool', name: 'cross', type: 'bool' },
      { internalType: 'address', name: 'ammAddr', type: 'address' },
      { internalType: 'uint256', name: 'lpAmount', type: 'uint256' },
    ],
    name: 'removeLiquidityDualFromAmm',
    outputs: [
      { internalType: 'int256', name: 'collateralOut', type: 'int256' },
      { internalType: 'int256', name: 'sizeOut', type: 'int256' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'AccountPosition', name: 'user', type: 'bytes28' }],
    name: 'requestStrictMarginCheck',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'market', type: 'address' },
      {
        components: [
          { internalType: 'OrderId', name: 'orderId', type: 'uint64' },
          { internalType: 'uint256', name: 'index', type: 'uint256' },
        ],
        internalType: 'struct FilledIndexHint[]',
        name: 'hints',
        type: 'tuple[]',
      },
    ],
    name: 'setFilledIndexHints',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'AccountPosition', name: 'user', type: 'bytes28' }],
    name: 'settlePaymentAndOrders',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint8', name: 'accountId', type: 'uint8' },
      { internalType: 'address', name: 'token', type: 'address' },
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
      { internalType: 'address', name: 'token', type: 'address' },
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
      { indexed: false, internalType: 'bytes4', name: 'selector', type: 'bytes4' },
      {
        components: [
          { internalType: 'bool', name: 'success', type: 'bool' },
          { internalType: 'bytes', name: 'returnData', type: 'bytes' },
        ],
        indexed: false,
        internalType: 'struct IAuthModule.Result[]',
        name: 'results',
        type: 'tuple[]',
      },
    ],
    name: 'BatchResult',
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
      { internalType: 'Account', name: 'acc', type: 'bytes21' },
      { internalType: 'address', name: 'agent', type: 'address' },
    ],
    name: 'agentExpiry',
    outputs: [{ internalType: 'uint64', name: '', type: 'uint64' }],
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
        internalType: 'struct IAuthModule.ApproveAgentStruct',
        name: 'data',
        type: 'tuple',
      },
      { internalType: 'bytes', name: 'signature', type: 'bytes' },
      {
        components: [
          { internalType: 'enum RouterExtraDataVersion', name: 'version', type: 'uint8' },
          { internalType: 'bytes', name: 'data', type: 'bytes' },
        ],
        internalType: 'struct RouterExtraData',
        name: 'extra',
        type: 'tuple',
      },
    ],
    name: 'approveAgent',
    outputs: [],
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
        internalType: 'struct IAuthModule.PendleSignTx',
        name: 'message',
        type: 'tuple',
      },
      { internalType: 'bytes', name: 'signature', type: 'bytes' },
      {
        components: [
          { internalType: 'address', name: 'market', type: 'address' },
          { internalType: 'bool', name: 'isCross', type: 'bool' },
          { internalType: 'bool', name: 'cancelAll', type: 'bool' },
          { internalType: 'OrderId[]', name: 'orderIds', type: 'uint64[]' },
        ],
        internalType: 'struct IAuthModule.Cancel[]',
        name: 'cancels',
        type: 'tuple[]',
      },
      {
        components: [
          { internalType: 'enum RouterExtraDataVersion', name: 'version', type: 'uint8' },
          { internalType: 'bytes', name: 'data', type: 'bytes' },
        ],
        internalType: 'struct RouterExtraData',
        name: 'extra',
        type: 'tuple',
      },
    ],
    name: 'cancelOrders',
    outputs: [
      {
        components: [
          { internalType: 'bool', name: 'success', type: 'bool' },
          { internalType: 'bytes', name: 'returnData', type: 'bytes' },
        ],
        internalType: 'struct IAuthModule.Result[]',
        name: '',
        type: 'tuple[]',
      },
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
        internalType: 'struct IAuthModule.PendleSignTx',
        name: 'message',
        type: 'tuple',
      },
      { internalType: 'bytes', name: 'signature', type: 'bytes' },
      {
        components: [
          { internalType: 'bool', name: 'isCross', type: 'bool' },
          { internalType: 'bool', name: 'isEnter', type: 'bool' },
          { internalType: 'address', name: 'market', type: 'address' },
        ],
        internalType: 'struct IAuthModule.EnterExitMarket[]',
        name: 'enterExits',
        type: 'tuple[]',
      },
      {
        components: [
          { internalType: 'enum RouterExtraDataVersion', name: 'version', type: 'uint8' },
          { internalType: 'bytes', name: 'data', type: 'bytes' },
        ],
        internalType: 'struct RouterExtraData',
        name: 'extra',
        type: 'tuple',
      },
    ],
    name: 'enterExitMarkets',
    outputs: [
      {
        components: [
          { internalType: 'bool', name: 'success', type: 'bool' },
          { internalType: 'bytes', name: 'returnData', type: 'bytes' },
        ],
        internalType: 'struct IAuthModule.Result[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'nonpayable',
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
        internalType: 'struct IAuthModule.ApproveAgentStruct',
        name: 'message',
        type: 'tuple',
      },
    ],
    name: 'hashApproveAgentStruct',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'Account', name: 'account', type: 'bytes21' },
          { internalType: 'bytes32', name: 'connectionId', type: 'bytes32' },
          { internalType: 'uint64', name: 'nonce', type: 'uint64' },
        ],
        internalType: 'struct IAuthModule.PendleSignTx',
        name: 'message',
        type: 'tuple',
      },
    ],
    name: 'hashPendleSignTx',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'view',
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
        internalType: 'struct IAuthModule.SetAccManagerStruct',
        name: 'message',
        type: 'tuple',
      },
    ],
    name: 'hashSetAccManagerStruct',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'root', type: 'address' },
          { internalType: 'uint8', name: 'accountId', type: 'uint8' },
          { internalType: 'address', name: 'token', type: 'address' },
          { internalType: 'uint256', name: 'amount', type: 'uint256' },
          { internalType: 'bool', name: 'isDeposit', type: 'bool' },
          { internalType: 'uint64', name: 'nonce', type: 'uint64' },
        ],
        internalType: 'struct IAuthModule.SubaccountTransferStruct',
        name: 'message',
        type: 'tuple',
      },
    ],
    name: 'hashSubaccountTransferStruct',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'root', type: 'address' },
          { internalType: 'address', name: 'token', type: 'address' },
          { internalType: 'uint256', name: 'amount', type: 'uint256' },
          { internalType: 'bool', name: 'isDeposit', type: 'bool' },
          { internalType: 'uint64', name: 'nonce', type: 'uint64' },
        ],
        internalType: 'struct IAuthModule.VaultTransferStruct',
        name: 'message',
        type: 'tuple',
      },
    ],
    name: 'hashVaultTransferStruct',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
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
        internalType: 'struct IAuthModule.PendleSignTx',
        name: 'message',
        type: 'tuple',
      },
      { internalType: 'bytes', name: 'signature', type: 'bytes' },
      {
        components: [
          { internalType: 'address', name: 'market', type: 'address' },
          { internalType: 'address[]', name: 'amms', type: 'address[]' },
          { internalType: 'bool', name: 'useOrderbook', type: 'bool' },
          { internalType: 'bool', name: 'isCross', type: 'bool' },
          { internalType: 'bool', name: 'isLong', type: 'bool' },
          { internalType: 'int16', name: 'tick', type: 'int16' },
          { internalType: 'uint256', name: 'size', type: 'uint256' },
          { internalType: 'enum TimeInForce', name: 'tif', type: 'uint8' },
        ],
        internalType: 'struct IAuthModule.Order[]',
        name: 'orders',
        type: 'tuple[]',
      },
      {
        components: [
          { internalType: 'enum RouterExtraDataVersion', name: 'version', type: 'uint8' },
          { internalType: 'bytes', name: 'data', type: 'bytes' },
        ],
        internalType: 'struct RouterExtraData',
        name: 'extra',
        type: 'tuple',
      },
    ],
    name: 'placeOrders',
    outputs: [
      {
        components: [
          { internalType: 'bool', name: 'success', type: 'bool' },
          { internalType: 'bytes', name: 'returnData', type: 'bytes' },
        ],
        internalType: 'struct IAuthModule.Result[]',
        name: '',
        type: 'tuple[]',
      },
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
        internalType: 'struct IAuthModule.PendleSignTx',
        name: 'message',
        type: 'tuple',
      },
      { internalType: 'bytes', name: 'signature', type: 'bytes' },
      {
        components: [
          { internalType: 'Account', name: 'account', type: 'bytes21' },
          { internalType: 'address', name: 'market', type: 'address' },
          { internalType: 'bool', name: 'isCross', type: 'bool' },
          { internalType: 'uint256', name: 'amount', type: 'uint256' },
          { internalType: 'bool', name: 'isDeposit', type: 'bool' },
          { internalType: 'uint64', name: 'nonce', type: 'uint64' },
        ],
        internalType: 'struct IAuthModule.PositionTransferStruct[]',
        name: 'transfers',
        type: 'tuple[]',
      },
      {
        components: [
          { internalType: 'enum RouterExtraDataVersion', name: 'version', type: 'uint8' },
          { internalType: 'bytes', name: 'data', type: 'bytes' },
        ],
        internalType: 'struct RouterExtraData',
        name: 'extra',
        type: 'tuple',
      },
    ],
    name: 'positionTransfer',
    outputs: [
      {
        components: [
          { internalType: 'bool', name: 'success', type: 'bool' },
          { internalType: 'bytes', name: 'returnData', type: 'bytes' },
        ],
        internalType: 'struct IAuthModule.Result[]',
        name: '',
        type: 'tuple[]',
      },
    ],
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
        internalType: 'struct IAuthModule.SetAccManagerStruct',
        name: 'data',
        type: 'tuple',
      },
      { internalType: 'bytes', name: 'signature', type: 'bytes' },
      {
        components: [
          { internalType: 'enum RouterExtraDataVersion', name: 'version', type: 'uint8' },
          { internalType: 'bytes', name: 'data', type: 'bytes' },
        ],
        internalType: 'struct RouterExtraData',
        name: 'extra',
        type: 'tuple',
      },
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
          { internalType: 'address', name: 'token', type: 'address' },
          { internalType: 'uint256', name: 'amount', type: 'uint256' },
          { internalType: 'bool', name: 'isDeposit', type: 'bool' },
          { internalType: 'uint64', name: 'nonce', type: 'uint64' },
        ],
        internalType: 'struct IAuthModule.SubaccountTransferStruct',
        name: 'data',
        type: 'tuple',
      },
      { internalType: 'bytes', name: 'signature', type: 'bytes' },
      {
        components: [
          { internalType: 'enum RouterExtraDataVersion', name: 'version', type: 'uint8' },
          { internalType: 'bytes', name: 'data', type: 'bytes' },
        ],
        internalType: 'struct RouterExtraData',
        name: 'extra',
        type: 'tuple',
      },
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
          { internalType: 'address', name: 'token', type: 'address' },
          { internalType: 'uint256', name: 'amount', type: 'uint256' },
          { internalType: 'bool', name: 'isDeposit', type: 'bool' },
          { internalType: 'uint64', name: 'nonce', type: 'uint64' },
        ],
        internalType: 'struct IAuthModule.VaultTransferStruct',
        name: 'data',
        type: 'tuple',
      },
      { internalType: 'bytes', name: 'signature', type: 'bytes' },
      {
        components: [
          { internalType: 'enum RouterExtraDataVersion', name: 'version', type: 'uint8' },
          { internalType: 'bytes', name: 'data', type: 'bytes' },
        ],
        internalType: 'struct RouterExtraData',
        name: 'extra',
        type: 'tuple',
      },
    ],
    name: 'vaultTransfer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IAllModule
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iAllModuleAbi = [
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'bytes4', name: 'selector', type: 'bytes4' },
      {
        components: [
          { internalType: 'bool', name: 'success', type: 'bool' },
          { internalType: 'bytes', name: 'returnData', type: 'bytes' },
        ],
        indexed: false,
        internalType: 'struct IAuthModule.Result[]',
        name: 'results',
        type: 'tuple[]',
      },
    ],
    name: 'BatchResult',
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
    inputs: [{ internalType: 'AccountPosition', name: 'user', type: 'bytes28' }],
    name: 'accountNonce',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'bool', name: 'cross', type: 'bool' },
      { internalType: 'address', name: 'ammAddr', type: 'address' },
      { internalType: 'int256', name: 'cashIn', type: 'int256' },
    ],
    name: 'addLiquidityDualToAmm',
    outputs: [
      { internalType: 'uint256', name: 'lpAmount', type: 'uint256' },
      { internalType: 'int256', name: 'sizeIn', type: 'int256' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'Account', name: 'acc', type: 'bytes21' },
      { internalType: 'address', name: 'agent', type: 'address' },
    ],
    name: 'agentExpiry',
    outputs: [{ internalType: 'uint64', name: '', type: 'uint64' }],
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
        internalType: 'struct IAuthModule.ApproveAgentStruct',
        name: 'data',
        type: 'tuple',
      },
      { internalType: 'bytes', name: 'signature', type: 'bytes' },
      {
        components: [
          { internalType: 'enum RouterExtraDataVersion', name: 'version', type: 'uint8' },
          { internalType: 'bytes', name: 'data', type: 'bytes' },
        ],
        internalType: 'struct RouterExtraData',
        name: 'extra',
        type: 'tuple',
      },
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
        internalType: 'struct IRouter.SimulateData[]',
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
          { internalType: 'uint256', name: 'salt', type: 'uint256' },
          { internalType: 'uint256', name: 'expiry', type: 'uint256' },
          { internalType: 'uint256', name: 'nonce', type: 'uint256' },
          { internalType: 'AccountPosition', name: 'maker', type: 'bytes28' },
          { internalType: 'AccountPosition', name: 'taker', type: 'bytes28' },
          { internalType: 'address', name: 'market', type: 'address' },
          {
            components: [
              { internalType: 'int256', name: 'size', type: 'int256' },
              { internalType: 'int256', name: 'cost', type: 'int256' },
            ],
            internalType: 'struct Trade',
            name: 'trade',
            type: 'tuple',
          },
        ],
        internalType: 'struct IOTCModule.OpenSwapRequest',
        name: '',
        type: 'tuple',
      },
    ],
    name: 'cancelOpenSwapRequest',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'bool', name: 'cross', type: 'bool' },
      { internalType: 'address', name: 'market', type: 'address' },
      { internalType: 'bool', name: 'cancelAll', type: 'bool' },
      { internalType: 'OrderId[]', name: 'orderIds', type: 'uint64[]' },
    ],
    name: 'cancelOrders',
    outputs: [],
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
        internalType: 'struct IAuthModule.PendleSignTx',
        name: 'message',
        type: 'tuple',
      },
      { internalType: 'bytes', name: 'signature', type: 'bytes' },
      {
        components: [
          { internalType: 'address', name: 'market', type: 'address' },
          { internalType: 'bool', name: 'isCross', type: 'bool' },
          { internalType: 'bool', name: 'cancelAll', type: 'bool' },
          { internalType: 'OrderId[]', name: 'orderIds', type: 'uint64[]' },
        ],
        internalType: 'struct IAuthModule.Cancel[]',
        name: 'cancels',
        type: 'tuple[]',
      },
      {
        components: [
          { internalType: 'enum RouterExtraDataVersion', name: 'version', type: 'uint8' },
          { internalType: 'bytes', name: 'data', type: 'bytes' },
        ],
        internalType: 'struct RouterExtraData',
        name: 'extra',
        type: 'tuple',
      },
    ],
    name: 'cancelOrders',
    outputs: [
      {
        components: [
          { internalType: 'bool', name: 'success', type: 'bool' },
          { internalType: 'bytes', name: 'returnData', type: 'bytes' },
        ],
        internalType: 'struct IAuthModule.Result[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'uint8', name: 'accountId', type: 'uint8' },
          { internalType: 'bytes', name: 'data', type: 'bytes' },
        ],
        internalType: 'struct IRouter.DirectCall[]',
        name: 'data',
        type: 'tuple[]',
      },
      { internalType: 'bool', name: 'requireMarginCheckCall', type: 'bool' },
    ],
    name: 'directCall',
    outputs: [{ internalType: 'bytes[]', name: '', type: 'bytes[]' }],
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
        internalType: 'struct IAuthModule.PendleSignTx',
        name: 'message',
        type: 'tuple',
      },
      { internalType: 'bytes', name: 'signature', type: 'bytes' },
      {
        components: [
          { internalType: 'bool', name: 'isCross', type: 'bool' },
          { internalType: 'bool', name: 'isEnter', type: 'bool' },
          { internalType: 'address', name: 'market', type: 'address' },
        ],
        internalType: 'struct IAuthModule.EnterExitMarket[]',
        name: 'enterExits',
        type: 'tuple[]',
      },
      {
        components: [
          { internalType: 'enum RouterExtraDataVersion', name: 'version', type: 'uint8' },
          { internalType: 'bytes', name: 'data', type: 'bytes' },
        ],
        internalType: 'struct RouterExtraData',
        name: 'extra',
        type: 'tuple',
      },
    ],
    name: 'enterExitMarkets',
    outputs: [
      {
        components: [
          { internalType: 'bool', name: 'success', type: 'bool' },
          { internalType: 'bytes', name: 'returnData', type: 'bytes' },
        ],
        internalType: 'struct IAuthModule.Result[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'bool', name: 'cross', type: 'bool' },
      { internalType: 'address', name: 'market', type: 'address' },
    ],
    name: 'enterMarket',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'bool', name: 'cross', type: 'bool' },
      { internalType: 'address', name: 'market', type: 'address' },
    ],
    name: 'exitMarket',
    outputs: [],
    stateMutability: 'nonpayable',
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
        internalType: 'struct IAuthModule.ApproveAgentStruct',
        name: 'message',
        type: 'tuple',
      },
    ],
    name: 'hashApproveAgentStruct',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'uint256', name: 'salt', type: 'uint256' },
          { internalType: 'uint256', name: 'expiry', type: 'uint256' },
          { internalType: 'uint256', name: 'nonce', type: 'uint256' },
          { internalType: 'AccountPosition', name: 'maker', type: 'bytes28' },
          { internalType: 'AccountPosition', name: 'taker', type: 'bytes28' },
          { internalType: 'address', name: 'market', type: 'address' },
          {
            components: [
              { internalType: 'int256', name: 'size', type: 'int256' },
              { internalType: 'int256', name: 'cost', type: 'int256' },
            ],
            internalType: 'struct Trade',
            name: 'trade',
            type: 'tuple',
          },
        ],
        internalType: 'struct IOTCModule.OpenSwapRequest',
        name: 'request',
        type: 'tuple',
      },
    ],
    name: 'hashOpenSwapRequest',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'Account', name: 'account', type: 'bytes21' },
          { internalType: 'bytes32', name: 'connectionId', type: 'bytes32' },
          { internalType: 'uint64', name: 'nonce', type: 'uint64' },
        ],
        internalType: 'struct IAuthModule.PendleSignTx',
        name: 'message',
        type: 'tuple',
      },
    ],
    name: 'hashPendleSignTx',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'view',
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
        internalType: 'struct IAuthModule.SetAccManagerStruct',
        name: 'message',
        type: 'tuple',
      },
    ],
    name: 'hashSetAccManagerStruct',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'root', type: 'address' },
          { internalType: 'uint8', name: 'accountId', type: 'uint8' },
          { internalType: 'address', name: 'token', type: 'address' },
          { internalType: 'uint256', name: 'amount', type: 'uint256' },
          { internalType: 'bool', name: 'isDeposit', type: 'bool' },
          { internalType: 'uint64', name: 'nonce', type: 'uint64' },
        ],
        internalType: 'struct IAuthModule.SubaccountTransferStruct',
        name: 'message',
        type: 'tuple',
      },
    ],
    name: 'hashSubaccountTransferStruct',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'root', type: 'address' },
          { internalType: 'address', name: 'token', type: 'address' },
          { internalType: 'uint256', name: 'amount', type: 'uint256' },
          { internalType: 'bool', name: 'isDeposit', type: 'bool' },
          { internalType: 'uint64', name: 'nonce', type: 'uint64' },
        ],
        internalType: 'struct IAuthModule.VaultTransferStruct',
        name: 'message',
        type: 'tuple',
      },
    ],
    name: 'hashVaultTransferStruct',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'bool', name: 'cross', type: 'bool' },
      { internalType: 'address', name: 'market', type: 'address' },
    ],
    name: 'incOpenSwapNonce',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'bool', name: 'cross', type: 'bool' },
      { internalType: 'address', name: 'market', type: 'address' },
      { internalType: 'AccountPosition', name: 'violator', type: 'bytes28' },
      { internalType: 'int256', name: 'sizeToLiquidator', type: 'int256' },
    ],
    name: 'liquidate',
    outputs: [
      {
        components: [
          { internalType: 'int256', name: 'size', type: 'int256' },
          { internalType: 'int256', name: 'cost', type: 'int256' },
        ],
        internalType: 'struct Trade',
        name: 'liqTrade',
        type: 'tuple',
      },
      { internalType: 'uint256', name: 'fees', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'bool', name: 'cross', type: 'bool' },
      {
        components: [
          { internalType: 'uint256', name: 'salt', type: 'uint256' },
          { internalType: 'uint256', name: 'expiry', type: 'uint256' },
          { internalType: 'uint256', name: 'nonce', type: 'uint256' },
          { internalType: 'AccountPosition', name: 'maker', type: 'bytes28' },
          { internalType: 'AccountPosition', name: 'taker', type: 'bytes28' },
          { internalType: 'address', name: 'market', type: 'address' },
          {
            components: [
              { internalType: 'int256', name: 'size', type: 'int256' },
              { internalType: 'int256', name: 'cost', type: 'int256' },
            ],
            internalType: 'struct Trade',
            name: 'trade',
            type: 'tuple',
          },
        ],
        internalType: 'struct IOTCModule.OpenSwapRequest',
        name: '',
        type: 'tuple',
      },
      { internalType: 'bytes', name: 'signature', type: 'bytes' },
    ],
    name: 'openSwap',
    outputs: [{ internalType: 'uint256', name: 'fees', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'bool', name: 'cross', type: 'bool' },
      { internalType: 'address', name: 'market', type: 'address' },
      { internalType: 'address[]', name: 'ammAddresses', type: 'address[]' },
      { internalType: 'enum Side', name: 'side', type: 'uint8' },
      { internalType: 'uint256', name: 'size', type: 'uint256' },
      { internalType: 'int16', name: 'limitTick', type: 'int16' },
      { internalType: 'enum TimeInForce', name: 'tif', type: 'uint8' },
      { internalType: 'bool', name: 'useOrderBook', type: 'bool' },
    ],
    name: 'placeOrder',
    outputs: [
      {
        components: [
          { internalType: 'int256', name: 'size', type: 'int256' },
          { internalType: 'int256', name: 'cost', type: 'int256' },
        ],
        internalType: 'struct Trade',
        name: 'matched',
        type: 'tuple',
      },
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
        internalType: 'struct IAuthModule.PendleSignTx',
        name: 'message',
        type: 'tuple',
      },
      { internalType: 'bytes', name: 'signature', type: 'bytes' },
      {
        components: [
          { internalType: 'address', name: 'market', type: 'address' },
          { internalType: 'address[]', name: 'amms', type: 'address[]' },
          { internalType: 'bool', name: 'useOrderbook', type: 'bool' },
          { internalType: 'bool', name: 'isCross', type: 'bool' },
          { internalType: 'bool', name: 'isLong', type: 'bool' },
          { internalType: 'int16', name: 'tick', type: 'int16' },
          { internalType: 'uint256', name: 'size', type: 'uint256' },
          { internalType: 'enum TimeInForce', name: 'tif', type: 'uint8' },
        ],
        internalType: 'struct IAuthModule.Order[]',
        name: 'orders',
        type: 'tuple[]',
      },
      {
        components: [
          { internalType: 'enum RouterExtraDataVersion', name: 'version', type: 'uint8' },
          { internalType: 'bytes', name: 'data', type: 'bytes' },
        ],
        internalType: 'struct RouterExtraData',
        name: 'extra',
        type: 'tuple',
      },
    ],
    name: 'placeOrders',
    outputs: [
      {
        components: [
          { internalType: 'bool', name: 'success', type: 'bool' },
          { internalType: 'bytes', name: 'returnData', type: 'bytes' },
        ],
        internalType: 'struct IAuthModule.Result[]',
        name: '',
        type: 'tuple[]',
      },
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
        internalType: 'struct IAuthModule.PendleSignTx',
        name: 'message',
        type: 'tuple',
      },
      { internalType: 'bytes', name: 'signature', type: 'bytes' },
      {
        components: [
          { internalType: 'Account', name: 'account', type: 'bytes21' },
          { internalType: 'address', name: 'market', type: 'address' },
          { internalType: 'bool', name: 'isCross', type: 'bool' },
          { internalType: 'uint256', name: 'amount', type: 'uint256' },
          { internalType: 'bool', name: 'isDeposit', type: 'bool' },
          { internalType: 'uint64', name: 'nonce', type: 'uint64' },
        ],
        internalType: 'struct IAuthModule.PositionTransferStruct[]',
        name: 'transfers',
        type: 'tuple[]',
      },
      {
        components: [
          { internalType: 'enum RouterExtraDataVersion', name: 'version', type: 'uint8' },
          { internalType: 'bytes', name: 'data', type: 'bytes' },
        ],
        internalType: 'struct RouterExtraData',
        name: 'extra',
        type: 'tuple',
      },
    ],
    name: 'positionTransfer',
    outputs: [
      {
        components: [
          { internalType: 'bool', name: 'success', type: 'bool' },
          { internalType: 'bytes', name: 'returnData', type: 'bytes' },
        ],
        internalType: 'struct IAuthModule.Result[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'bool', name: 'cross', type: 'bool' },
      { internalType: 'address', name: 'market', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
      { internalType: 'bool', name: 'isDeposit', type: 'bool' },
    ],
    name: 'positionTransfer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'bool', name: 'cross', type: 'bool' },
      { internalType: 'address', name: 'ammAddr', type: 'address' },
      { internalType: 'uint256', name: 'lpAmount', type: 'uint256' },
    ],
    name: 'removeLiquidityDualFromAmm',
    outputs: [
      { internalType: 'int256', name: 'collateralOut', type: 'int256' },
      { internalType: 'int256', name: 'sizeOut', type: 'int256' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'bytes32', name: 'requestHash', type: 'bytes32' }],
    name: 'requestCanceled',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'AccountPosition', name: 'user', type: 'bytes28' }],
    name: 'requestStrictMarginCheck',
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
        internalType: 'struct IAuthModule.SetAccManagerStruct',
        name: 'data',
        type: 'tuple',
      },
      { internalType: 'bytes', name: 'signature', type: 'bytes' },
      {
        components: [
          { internalType: 'enum RouterExtraDataVersion', name: 'version', type: 'uint8' },
          { internalType: 'bytes', name: 'data', type: 'bytes' },
        ],
        internalType: 'struct RouterExtraData',
        name: 'extra',
        type: 'tuple',
      },
    ],
    name: 'setAccManager',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'market', type: 'address' },
      {
        components: [
          { internalType: 'OrderId', name: 'orderId', type: 'uint64' },
          { internalType: 'uint256', name: 'index', type: 'uint256' },
        ],
        internalType: 'struct FilledIndexHint[]',
        name: 'hints',
        type: 'tuple[]',
      },
    ],
    name: 'setFilledIndexHints',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'AccountPosition', name: 'user', type: 'bytes28' }],
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
      {
        components: [
          { internalType: 'address', name: 'root', type: 'address' },
          { internalType: 'uint8', name: 'accountId', type: 'uint8' },
          { internalType: 'address', name: 'token', type: 'address' },
          { internalType: 'uint256', name: 'amount', type: 'uint256' },
          { internalType: 'bool', name: 'isDeposit', type: 'bool' },
          { internalType: 'uint64', name: 'nonce', type: 'uint64' },
        ],
        internalType: 'struct IAuthModule.SubaccountTransferStruct',
        name: 'data',
        type: 'tuple',
      },
      { internalType: 'bytes', name: 'signature', type: 'bytes' },
      {
        components: [
          { internalType: 'enum RouterExtraDataVersion', name: 'version', type: 'uint8' },
          { internalType: 'bytes', name: 'data', type: 'bytes' },
        ],
        internalType: 'struct RouterExtraData',
        name: 'extra',
        type: 'tuple',
      },
    ],
    name: 'subaccountTransfer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint8', name: 'accountId', type: 'uint8' },
      { internalType: 'address', name: 'token', type: 'address' },
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
          { internalType: 'address', name: 'token', type: 'address' },
          { internalType: 'uint256', name: 'amount', type: 'uint256' },
          { internalType: 'bool', name: 'isDeposit', type: 'bool' },
          { internalType: 'uint64', name: 'nonce', type: 'uint64' },
        ],
        internalType: 'struct IAuthModule.VaultTransferStruct',
        name: 'data',
        type: 'tuple',
      },
      { internalType: 'bytes', name: 'signature', type: 'bytes' },
      {
        components: [
          { internalType: 'enum RouterExtraDataVersion', name: 'version', type: 'uint8' },
          { internalType: 'bytes', name: 'data', type: 'bytes' },
        ],
        internalType: 'struct RouterExtraData',
        name: 'extra',
        type: 'tuple',
      },
    ],
    name: 'vaultTransfer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'token', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
      { internalType: 'bool', name: 'isDeposit', type: 'bool' },
    ],
    name: 'vaultTransfer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'bytes', name: 'data', type: 'bytes' }],
    name: 'viewCall',
    outputs: [{ internalType: 'bytes', name: '', type: 'bytes' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const;
