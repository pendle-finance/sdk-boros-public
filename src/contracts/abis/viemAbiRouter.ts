export const iRouterAbi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'AMMId',
        name: 'ammId',
        type: 'uint24',
      },
      {
        indexed: false,
        internalType: 'MarketAcc',
        name: 'amm',
        type: 'bytes26',
      },
    ],
    name: 'AMMIdToAccUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'MarketAcc',
        name: 'user',
        type: 'bytes26',
      },
      {
        indexed: true,
        internalType: 'AMMId',
        name: 'ammId',
        type: 'uint24',
      },
      {
        indexed: false,
        internalType: 'int256',
        name: 'exactSizeIn',
        type: 'int256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'netLpOut',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'int256',
        name: 'netCashIn',
        type: 'int256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'netOtcFee',
        type: 'uint256',
      },
    ],
    name: 'AddLiquidityDualToAmm',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'MarketAcc',
        name: 'user',
        type: 'bytes26',
      },
      {
        indexed: true,
        internalType: 'AMMId',
        name: 'ammId',
        type: 'uint24',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'netLpOut',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'int256',
        name: 'netCashIn',
        type: 'int256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'totalTakerOtcFee',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'int256',
        name: 'swapSizeInterm',
        type: 'int256',
      },
    ],
    name: 'AddLiquiditySingleCashToAmm',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'Account',
        name: 'account',
        type: 'bytes21',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'agent',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint64',
        name: 'expiry',
        type: 'uint64',
      },
    ],
    name: 'AgentApproved',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'Account',
        name: 'account',
        type: 'bytes21',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'agent',
        type: 'address',
      },
    ],
    name: 'AgentRevoked',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'relayer',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'allowed',
        type: 'bool',
      },
    ],
    name: 'AllowedRelayerUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'TokenId',
        name: 'tokenId',
        type: 'uint16',
      },
    ],
    name: 'ApprovedMarketHubInf',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'MarketAcc',
        name: 'user',
        type: 'bytes26',
      },
      {
        indexed: true,
        internalType: 'MarketId',
        name: 'marketId',
        type: 'uint24',
      },
      {
        indexed: false,
        internalType: 'enum TimeInForce',
        name: 'tif',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'Trade',
        name: 'matched',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'takerFee',
        type: 'uint256',
      },
    ],
    name: 'BulkOrdersExecuted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'MarketAcc',
        name: 'user',
        type: 'bytes26',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'orderHash',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'MarketId',
        name: 'marketId',
        type: 'uint24',
      },
      {
        indexed: false,
        internalType: 'AMMId',
        name: 'ammId',
        type: 'uint24',
      },
      {
        indexed: false,
        internalType: 'enum TimeInForce',
        name: 'tif',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'Trade',
        name: 'matched',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'takerOtcFee',
        type: 'uint256',
      },
    ],
    name: 'ConditionalOrderExecuted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'validator',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'isValidator',
        type: 'bool',
      },
    ],
    name: 'ConditionalValidatorUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'root',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint32',
        name: 'boxId',
        type: 'uint32',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'tokenSpent',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amountSpent',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'accountId',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'TokenId',
        name: 'tokenId',
        type: 'uint16',
      },
      {
        indexed: false,
        internalType: 'MarketId',
        name: 'marketId',
        type: 'uint24',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'depositAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'payTreasuryAmount',
        type: 'uint256',
      },
    ],
    name: 'DepositFromBox',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newMaxIteration',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newEps',
        type: 'uint256',
      },
    ],
    name: 'MaxIterationAndEpsUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'Account',
        name: 'account',
        type: 'bytes21',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newAccManager',
        type: 'address',
      },
    ],
    name: 'NewAccManagerSet',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint16',
        name: 'newNumTicksToTryAtOnce',
        type: 'uint16',
      },
    ],
    name: 'NumTicksToTryAtOnceUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'MarketAcc',
        name: 'user',
        type: 'bytes26',
      },
      {
        indexed: true,
        internalType: 'AMMId',
        name: 'ammId',
        type: 'uint24',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'lpToRemove',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'int256',
        name: 'netCashOut',
        type: 'int256',
      },
      {
        indexed: false,
        internalType: 'int256',
        name: 'netSizeOut',
        type: 'int256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'netOtcFee',
        type: 'uint256',
      },
    ],
    name: 'RemoveLiquidityDualFromAmm',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'MarketAcc',
        name: 'user',
        type: 'bytes26',
      },
      {
        indexed: true,
        internalType: 'AMMId',
        name: 'ammId',
        type: 'uint24',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'lpToRemove',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'int256',
        name: 'netCashOut',
        type: 'int256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'netTakerOtcFee',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'int256',
        name: 'netSizeInterm',
        type: 'int256',
      },
    ],
    name: 'RemoveLiquiditySingleCashFromAmm',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'MarketAcc',
        name: 'user',
        type: 'bytes26',
      },
      {
        indexed: true,
        internalType: 'MarketId',
        name: 'marketId',
        type: 'uint24',
      },
      {
        indexed: true,
        internalType: 'AMMId',
        name: 'ammId',
        type: 'uint24',
      },
      {
        indexed: false,
        internalType: 'enum TimeInForce',
        name: 'tif',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'Trade',
        name: 'matched',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'takerOtcFee',
        type: 'uint256',
      },
    ],
    name: 'SingleOrderExecuted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'MarketAcc',
        name: 'user',
        type: 'bytes26',
      },
      {
        indexed: true,
        internalType: 'MarketId',
        name: 'marketId',
        type: 'uint24',
      },
      {
        indexed: true,
        internalType: 'AMMId',
        name: 'ammId',
        type: 'uint24',
      },
      {
        indexed: false,
        internalType: 'Trade',
        name: 'matched',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'otcFee',
        type: 'uint256',
      },
    ],
    name: 'SwapWithAmm',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'index',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'bytes4',
        name: 'errorSelector',
        type: 'bytes4',
      },
    ],
    name: 'TryAggregateCallFailed',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'index',
        type: 'uint256',
      },
    ],
    name: 'TryAggregateCallSucceeded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'root',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint32',
        name: 'boxId',
        type: 'uint32',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'WithdrawFromBox',
    type: 'event',
  },
  {
    inputs: [],
    name: 'DEPOSIT_BOX_FACTORY',
    outputs: [
      {
        internalType: 'contract IPDepositBoxFactory',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'Account',
        name: 'acc',
        type: 'bytes21',
      },
    ],
    name: 'accountManager',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'bool',
            name: 'cross',
            type: 'bool',
          },
          {
            internalType: 'AMMId',
            name: 'ammId',
            type: 'uint24',
          },
          {
            internalType: 'int256',
            name: 'maxCashIn',
            type: 'int256',
          },
          {
            internalType: 'int256',
            name: 'exactSizeIn',
            type: 'int256',
          },
          {
            internalType: 'uint256',
            name: 'minLpOut',
            type: 'uint256',
          },
        ],
        internalType: 'struct IRouterEventsAndTypes.AddLiquidityDualToAmmReq',
        name: 'req',
        type: 'tuple',
      },
    ],
    name: 'addLiquidityDualToAmm',
    outputs: [
      {
        internalType: 'uint256',
        name: 'netLpOut',
        type: 'uint256',
      },
      {
        internalType: 'int256',
        name: 'netCashIn',
        type: 'int256',
      },
      {
        internalType: 'uint256',
        name: 'netOtcFee',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'bool',
            name: 'cross',
            type: 'bool',
          },
          {
            internalType: 'AMMId',
            name: 'ammId',
            type: 'uint24',
          },
          {
            internalType: 'bool',
            name: 'enterMarket',
            type: 'bool',
          },
          {
            internalType: 'int256',
            name: 'netCashIn',
            type: 'int256',
          },
          {
            internalType: 'uint256',
            name: 'minLpOut',
            type: 'uint256',
          },
          {
            internalType: 'enum Side',
            name: 'desiredSwapSide',
            type: 'uint8',
          },
          {
            internalType: 'int128',
            name: 'desiredSwapRate',
            type: 'int128',
          },
        ],
        internalType: 'struct IRouterEventsAndTypes.AddLiquiditySingleCashToAmmReq',
        name: 'req',
        type: 'tuple',
      },
    ],
    name: 'addLiquiditySingleCashToAmm',
    outputs: [
      {
        internalType: 'uint256',
        name: 'netLpOut',
        type: 'uint256',
      },
      {
        internalType: 'int256',
        name: 'netCashUsed',
        type: 'int256',
      },
      {
        internalType: 'uint256',
        name: 'totalTakerOtcFee',
        type: 'uint256',
      },
      {
        internalType: 'Trade',
        name: 'swapTradeInterm',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'agent',
        type: 'address',
      },
      {
        components: [
          {
            internalType: 'Account',
            name: 'account',
            type: 'bytes21',
          },
          {
            internalType: 'bytes32',
            name: 'connectionId',
            type: 'bytes32',
          },
          {
            internalType: 'uint64',
            name: 'nonce',
            type: 'uint64',
          },
        ],
        internalType: 'struct IRouterEventsAndTypes.PendleSignTx',
        name: 'message',
        type: 'tuple',
      },
      {
        internalType: 'bytes',
        name: 'signature',
        type: 'bytes',
      },
      {
        internalType: 'bytes',
        name: 'callData',
        type: 'bytes',
      },
    ],
    name: 'agentExecute',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'Account',
        name: 'acc',
        type: 'bytes21',
      },
      {
        internalType: 'address',
        name: 'agent',
        type: 'address',
      },
    ],
    name: 'agentExpiry',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'MarketId',
            name: 'marketId',
            type: 'uint24',
          },
          {
            internalType: 'uint256',
            name: 'cashIn',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'cashTransferAll',
            type: 'bool',
          },
        ],
        internalType: 'struct IRouterEventsAndTypes.AMMCashTransferReq',
        name: 'req',
        type: 'tuple',
      },
    ],
    name: 'ammCashTransfer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'AMMId',
        name: 'ammId',
        type: 'uint24',
      },
    ],
    name: 'ammIdToAcc',
    outputs: [
      {
        internalType: 'MarketAcc',
        name: '',
        type: 'bytes26',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'root',
            type: 'address',
          },
          {
            internalType: 'uint8',
            name: 'accountId',
            type: 'uint8',
          },
          {
            internalType: 'address',
            name: 'agent',
            type: 'address',
          },
          {
            internalType: 'uint64',
            name: 'expiry',
            type: 'uint64',
          },
        ],
        internalType: 'struct IRouterEventsAndTypes.ApproveAgentReq',
        name: 'req',
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
          {
            internalType: 'address',
            name: 'root',
            type: 'address',
          },
          {
            internalType: 'uint8',
            name: 'accountId',
            type: 'uint8',
          },
          {
            internalType: 'address',
            name: 'agent',
            type: 'address',
          },
          {
            internalType: 'uint64',
            name: 'expiry',
            type: 'uint64',
          },
          {
            internalType: 'uint64',
            name: 'nonce',
            type: 'uint64',
          },
        ],
        internalType: 'struct IRouterEventsAndTypes.ApproveAgentMessage',
        name: 'data',
        type: 'tuple',
      },
      {
        internalType: 'bytes',
        name: 'signature',
        type: 'bytes',
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
        internalType: 'TokenId',
        name: 'tokenId',
        type: 'uint16',
      },
    ],
    name: 'approveMarketHubInf',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'Account',
            name: 'account',
            type: 'bytes21',
          },
          {
            internalType: 'address',
            name: 'target',
            type: 'address',
          },
          {
            internalType: 'bytes',
            name: 'data',
            type: 'bytes',
          },
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
          {
            internalType: 'Account',
            name: 'account',
            type: 'bytes21',
          },
          {
            internalType: 'address',
            name: 'target',
            type: 'address',
          },
          {
            internalType: 'bytes',
            name: 'data',
            type: 'bytes',
          },
        ],
        internalType: 'struct IMiscModule.SimulateData[]',
        name: 'calls',
        type: 'tuple[]',
      },
    ],
    name: 'batchSimulate',
    outputs: [
      {
        internalType: 'bytes[]',
        name: 'results',
        type: 'bytes[]',
      },
      {
        internalType: 'uint256[]',
        name: 'gasUsed',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'bool',
            name: 'cross',
            type: 'bool',
          },
          {
            internalType: 'MarketId',
            name: 'marketId',
            type: 'uint24',
          },
          {
            internalType: 'bool',
            name: 'cancelAll',
            type: 'bool',
          },
          {
            internalType: 'OrderId[]',
            name: 'orderIds',
            type: 'uint64[]',
          },
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
          {
            internalType: 'bool',
            name: 'cross',
            type: 'bool',
          },
          {
            components: [
              {
                internalType: 'MarketId',
                name: 'marketId',
                type: 'uint24',
              },
              {
                components: [
                  {
                    internalType: 'enum TimeInForce',
                    name: 'tif',
                    type: 'uint8',
                  },
                  {
                    internalType: 'enum Side',
                    name: 'side',
                    type: 'uint8',
                  },
                  {
                    internalType: 'uint256[]',
                    name: 'sizes',
                    type: 'uint256[]',
                  },
                  {
                    internalType: 'int16[]',
                    name: 'limitTicks',
                    type: 'int16[]',
                  },
                ],
                internalType: 'struct LongShort',
                name: 'orders',
                type: 'tuple',
              },
              {
                components: [
                  {
                    internalType: 'OrderId[]',
                    name: 'ids',
                    type: 'uint64[]',
                  },
                  {
                    internalType: 'bool',
                    name: 'isAll',
                    type: 'bool',
                  },
                  {
                    internalType: 'bool',
                    name: 'isStrict',
                    type: 'bool',
                  },
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
          {
            internalType: 'int128[]',
            name: 'desiredMatchRates',
            type: 'int128[]',
          },
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
          {
            internalType: 'Trade',
            name: 'matched',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'takerFee',
            type: 'uint256',
          },
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
      {
        internalType: 'TokenId',
        name: 'tokenId',
        type: 'uint16',
      },
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
          {
            internalType: 'address',
            name: 'root',
            type: 'address',
          },
          {
            internalType: 'TokenId',
            name: 'tokenId',
            type: 'uint16',
          },
          {
            internalType: 'uint64',
            name: 'nonce',
            type: 'uint64',
          },
        ],
        internalType: 'struct IRouterEventsAndTypes.CancelVaultWithdrawalMessage',
        name: 'message',
        type: 'tuple',
      },
      {
        internalType: 'bytes',
        name: 'signature',
        type: 'bytes',
      },
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
          {
            internalType: 'MarketId',
            name: 'marketId',
            type: 'uint24',
          },
          {
            internalType: 'int256',
            name: 'signedAmount',
            type: 'int256',
          },
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
          {
            internalType: 'address',
            name: 'root',
            type: 'address',
          },
          {
            internalType: 'uint32',
            name: 'boxId',
            type: 'uint32',
          },
          {
            internalType: 'address',
            name: 'tokenSpent',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'maxAmountSpent',
            type: 'uint256',
          },
          {
            internalType: 'uint8',
            name: 'accountId',
            type: 'uint8',
          },
          {
            internalType: 'TokenId',
            name: 'tokenId',
            type: 'uint16',
          },
          {
            internalType: 'MarketId',
            name: 'marketId',
            type: 'uint24',
          },
          {
            internalType: 'uint256',
            name: 'minDepositAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'payTreasuryAmount',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'swapExtRouter',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'swapApprove',
            type: 'address',
          },
          {
            internalType: 'bytes',
            name: 'swapCalldata',
            type: 'bytes',
          },
          {
            internalType: 'uint64',
            name: 'expiry',
            type: 'uint64',
          },
          {
            internalType: 'uint256',
            name: 'salt',
            type: 'uint256',
          },
        ],
        internalType: 'struct IRouterEventsAndTypes.DepositFromBoxMessage',
        name: 'message',
        type: 'tuple',
      },
      {
        internalType: 'bytes',
        name: 'signature',
        type: 'bytes',
      },
    ],
    name: 'depositFromBox',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'bool',
            name: 'cross',
            type: 'bool',
          },
          {
            internalType: 'bool',
            name: 'isEnter',
            type: 'bool',
          },
          {
            internalType: 'MarketId[]',
            name: 'marketIds',
            type: 'uint24[]',
          },
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
      {
        components: [
          {
            components: [
              {
                internalType: 'Account',
                name: 'account',
                type: 'bytes21',
              },
              {
                internalType: 'bool',
                name: 'cross',
                type: 'bool',
              },
              {
                internalType: 'MarketId',
                name: 'marketId',
                type: 'uint24',
              },
              {
                internalType: 'enum Side',
                name: 'side',
                type: 'uint8',
              },
              {
                internalType: 'enum TimeInForce',
                name: 'tif',
                type: 'uint8',
              },
              {
                internalType: 'uint256',
                name: 'size',
                type: 'uint256',
              },
              {
                internalType: 'int16',
                name: 'tick',
                type: 'int16',
              },
              {
                internalType: 'bool',
                name: 'reduceOnly',
                type: 'bool',
              },
              {
                internalType: 'uint256',
                name: 'salt',
                type: 'uint256',
              },
              {
                internalType: 'uint64',
                name: 'expiry',
                type: 'uint64',
              },
              {
                internalType: 'bytes32',
                name: 'hashedOffchainCondition',
                type: 'bytes32',
              },
            ],
            internalType: 'struct IRouterEventsAndTypes.ConditionalOrder',
            name: 'order',
            type: 'tuple',
          },
          {
            internalType: 'bytes',
            name: 'execParams',
            type: 'bytes',
          },
          {
            internalType: 'address',
            name: 'agent',
            type: 'address',
          },
          {
            internalType: 'bytes',
            name: 'placeSig',
            type: 'bytes',
          },
          {
            internalType: 'address',
            name: 'validator',
            type: 'address',
          },
          {
            internalType: 'uint64',
            name: 'execMsgExpiry',
            type: 'uint64',
          },
          {
            internalType: 'bytes',
            name: 'execSig',
            type: 'bytes',
          },
        ],
        internalType: 'struct IRouterEventsAndTypes.ExecuteConditionalOrderReq',
        name: 'req',
        type: 'tuple',
      },
    ],
    name: 'executeConditionalOrder',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'eip712Name',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'eip712Version',
        type: 'string',
      },
      {
        internalType: 'uint16',
        name: 'numTicksToTryAtOnce',
        type: 'uint16',
      },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'actionHash',
        type: 'bytes32',
      },
    ],
    name: 'isActionExecuted',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'relayer',
        type: 'address',
      },
    ],
    name: 'isAllowedRelayer',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'validator',
        type: 'address',
      },
    ],
    name: 'isConditionalValidator',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'intentHash',
        type: 'bytes32',
      },
    ],
    name: 'isIntentExecuted',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'maxIterationAndEps',
    outputs: [
      {
        internalType: 'uint256',
        name: 'maxIteration',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'eps',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'numTicksToTryAtOnce',
    outputs: [
      {
        internalType: 'uint16',
        name: '',
        type: 'uint16',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'bool',
            name: 'cross',
            type: 'bool',
          },
          {
            internalType: 'MarketId',
            name: 'marketId',
            type: 'uint24',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
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
              {
                internalType: 'bool',
                name: 'cross',
                type: 'bool',
              },
              {
                internalType: 'MarketId',
                name: 'marketId',
                type: 'uint24',
              },
              {
                internalType: 'AMMId',
                name: 'ammId',
                type: 'uint24',
              },
              {
                internalType: 'enum Side',
                name: 'side',
                type: 'uint8',
              },
              {
                internalType: 'enum TimeInForce',
                name: 'tif',
                type: 'uint8',
              },
              {
                internalType: 'uint256',
                name: 'size',
                type: 'uint256',
              },
              {
                internalType: 'int16',
                name: 'tick',
                type: 'int16',
              },
            ],
            internalType: 'struct IRouterEventsAndTypes.OrderReq',
            name: 'order',
            type: 'tuple',
          },
          {
            internalType: 'bool',
            name: 'enterMarket',
            type: 'bool',
          },
          {
            internalType: 'OrderId',
            name: 'idToStrictCancel',
            type: 'uint64',
          },
          {
            internalType: 'bool',
            name: 'exitMarket',
            type: 'bool',
          },
          {
            internalType: 'uint256',
            name: 'isolated_cashIn',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'isolated_cashTransferAll',
            type: 'bool',
          },
          {
            internalType: 'int128',
            name: 'desiredMatchRate',
            type: 'int128',
          },
        ],
        internalType: 'struct IRouterEventsAndTypes.SingleOrderReq',
        name: 'req',
        type: 'tuple',
      },
    ],
    name: 'placeSingleOrder',
    outputs: [
      {
        internalType: 'Trade',
        name: 'matched',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'takerOtcFee',
        type: 'uint256',
      },
      {
        internalType: 'int256',
        name: 'cashWithdrawn',
        type: 'int256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'bool',
            name: 'cross',
            type: 'bool',
          },
          {
            internalType: 'AMMId',
            name: 'ammId',
            type: 'uint24',
          },
          {
            internalType: 'uint256',
            name: 'lpToRemove',
            type: 'uint256',
          },
          {
            internalType: 'int256',
            name: 'minCashOut',
            type: 'int256',
          },
          {
            internalType: 'int256',
            name: 'minSizeOut',
            type: 'int256',
          },
          {
            internalType: 'int256',
            name: 'maxSizeOut',
            type: 'int256',
          },
        ],
        internalType: 'struct IRouterEventsAndTypes.RemoveLiquidityDualFromAmmReq',
        name: 'req',
        type: 'tuple',
      },
    ],
    name: 'removeLiquidityDualFromAmm',
    outputs: [
      {
        internalType: 'int256',
        name: 'netCashOut',
        type: 'int256',
      },
      {
        internalType: 'int256',
        name: 'netSizeOut',
        type: 'int256',
      },
      {
        internalType: 'uint256',
        name: 'netOtcFee',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'bool',
            name: 'cross',
            type: 'bool',
          },
          {
            internalType: 'AMMId',
            name: 'ammId',
            type: 'uint24',
          },
          {
            internalType: 'uint256',
            name: 'lpToRemove',
            type: 'uint256',
          },
          {
            internalType: 'int256',
            name: 'minCashOut',
            type: 'int256',
          },
          {
            internalType: 'enum Side',
            name: 'desiredSwapSide',
            type: 'uint8',
          },
          {
            internalType: 'int128',
            name: 'desiredSwapRate',
            type: 'int128',
          },
        ],
        internalType: 'struct IRouterEventsAndTypes.RemoveLiquiditySingleCashFromAmmReq',
        name: 'req',
        type: 'tuple',
      },
    ],
    name: 'removeLiquiditySingleCashFromAmm',
    outputs: [
      {
        internalType: 'int256',
        name: 'netCashOut',
        type: 'int256',
      },
      {
        internalType: 'uint256',
        name: 'netTakerOtcFee',
        type: 'uint256',
      },
      {
        internalType: 'Trade',
        name: 'swapTradeInterm',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'root',
            type: 'address',
          },
          {
            internalType: 'TokenId',
            name: 'tokenId',
            type: 'uint16',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'uint64',
            name: 'nonce',
            type: 'uint64',
          },
        ],
        internalType: 'struct IRouterEventsAndTypes.RequestVaultWithdrawalMessage',
        name: 'message',
        type: 'tuple',
      },
      {
        internalType: 'bytes',
        name: 'signature',
        type: 'bytes',
      },
    ],
    name: 'requestVaultWithdrawal',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'TokenId',
        name: 'tokenId',
        type: 'uint16',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
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
          {
            internalType: 'address',
            name: 'root',
            type: 'address',
          },
          {
            internalType: 'uint8',
            name: 'accountId',
            type: 'uint8',
          },
          {
            internalType: 'address[]',
            name: 'agents',
            type: 'address[]',
          },
        ],
        internalType: 'struct IRouterEventsAndTypes.RevokeAgentsReq',
        name: 'req',
        type: 'tuple',
      },
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
          {
            internalType: 'address',
            name: 'root',
            type: 'address',
          },
          {
            internalType: 'uint8',
            name: 'accountId',
            type: 'uint8',
          },
          {
            internalType: 'address[]',
            name: 'agents',
            type: 'address[]',
          },
          {
            internalType: 'uint64',
            name: 'nonce',
            type: 'uint64',
          },
        ],
        internalType: 'struct IRouterEventsAndTypes.RevokeAgentsMessage',
        name: 'data',
        type: 'tuple',
      },
      {
        internalType: 'bytes',
        name: 'signature',
        type: 'bytes',
      },
    ],
    name: 'revokeAgent',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'amm',
        type: 'address',
      },
      {
        internalType: 'bool',
        name: 'forceOverride',
        type: 'bool',
      },
    ],
    name: 'setAMMIdToAcc',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'root',
            type: 'address',
          },
          {
            internalType: 'uint8',
            name: 'accountId',
            type: 'uint8',
          },
          {
            internalType: 'address',
            name: 'accManager',
            type: 'address',
          },
          {
            internalType: 'uint64',
            name: 'nonce',
            type: 'uint64',
          },
        ],
        internalType: 'struct IRouterEventsAndTypes.SetAccManagerMessage',
        name: 'data',
        type: 'tuple',
      },
      {
        internalType: 'bytes',
        name: 'signature',
        type: 'bytes',
      },
    ],
    name: 'setAccManager',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'relayer',
        type: 'address',
      },
      {
        internalType: 'bool',
        name: 'allowed',
        type: 'bool',
      },
    ],
    name: 'setAllowedRelayer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'validator',
        type: 'address',
      },
      {
        internalType: 'bool',
        name: 'isValidator',
        type: 'bool',
      },
    ],
    name: 'setConditionalValidator',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'newMaxIteration',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'newEps',
        type: 'uint256',
      },
    ],
    name: 'setMaxIterationAndEps',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint16',
        name: 'newNumTicksToTryAtOnce',
        type: 'uint16',
      },
    ],
    name: 'setNumTicksToTryAtOnce',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'signer',
        type: 'address',
      },
    ],
    name: 'signerNonce',
    outputs: [
      {
        internalType: 'uint64',
        name: '',
        type: 'uint64',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'root',
            type: 'address',
          },
          {
            internalType: 'uint8',
            name: 'accountId',
            type: 'uint8',
          },
          {
            internalType: 'TokenId',
            name: 'tokenId',
            type: 'uint16',
          },
          {
            internalType: 'MarketId',
            name: 'marketId',
            type: 'uint24',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'isDeposit',
            type: 'bool',
          },
          {
            internalType: 'uint64',
            name: 'nonce',
            type: 'uint64',
          },
        ],
        internalType: 'struct IRouterEventsAndTypes.SubaccountTransferMessage',
        name: 'message',
        type: 'tuple',
      },
      {
        internalType: 'bytes',
        name: 'signature',
        type: 'bytes',
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
        internalType: 'uint8',
        name: 'accountId',
        type: 'uint8',
      },
      {
        internalType: 'TokenId',
        name: 'tokenId',
        type: 'uint16',
      },
      {
        internalType: 'MarketId',
        name: 'marketId',
        type: 'uint24',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: 'isDeposit',
        type: 'bool',
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
          {
            internalType: 'bool',
            name: 'cross',
            type: 'bool',
          },
          {
            internalType: 'AMMId',
            name: 'ammId',
            type: 'uint24',
          },
          {
            internalType: 'int256',
            name: 'signedSize',
            type: 'int256',
          },
          {
            internalType: 'int128',
            name: 'desiredSwapRate',
            type: 'int128',
          },
        ],
        internalType: 'struct IRouterEventsAndTypes.SwapWithAmmReq',
        name: 'req',
        type: 'tuple',
      },
    ],
    name: 'swapWithAmm',
    outputs: [
      {
        internalType: 'Trade',
        name: 'matched',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'otcFee',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'Account[]',
        name: 'accounts',
        type: 'bytes21[]',
      },
      {
        internalType: 'address[]',
        name: 'agents',
        type: 'address[]',
      },
    ],
    name: 'systemRevokeAgent',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bool',
        name: 'requireSuccess',
        type: 'bool',
      },
      {
        internalType: 'bytes[]',
        name: 'calls',
        type: 'bytes[]',
      },
    ],
    name: 'tryAggregate',
    outputs: [
      {
        components: [
          {
            internalType: 'bool',
            name: 'success',
            type: 'bool',
          },
          {
            internalType: 'bytes',
            name: 'returnData',
            type: 'bytes',
          },
        ],
        internalType: 'struct IMiscModule.Result[]',
        name: 'returnData',
        type: 'tuple[]',
      },
      {
        internalType: 'uint256[]',
        name: 'gasUsed',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint8',
        name: 'accountId',
        type: 'uint8',
      },
      {
        internalType: 'TokenId',
        name: 'tokenId',
        type: 'uint16',
      },
      {
        internalType: 'MarketId',
        name: 'marketId',
        type: 'uint24',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
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
          {
            internalType: 'address',
            name: 'root',
            type: 'address',
          },
          {
            internalType: 'uint8',
            name: 'accountId',
            type: 'uint8',
          },
          {
            internalType: 'TokenId',
            name: 'tokenId',
            type: 'uint16',
          },
          {
            internalType: 'MarketId',
            name: 'marketId',
            type: 'uint24',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'uint64',
            name: 'nonce',
            type: 'uint64',
          },
        ],
        internalType: 'struct IRouterEventsAndTypes.VaultDepositMessage',
        name: 'message',
        type: 'tuple',
      },
      {
        internalType: 'bytes',
        name: 'signature',
        type: 'bytes',
      },
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
          {
            internalType: 'address',
            name: 'root',
            type: 'address',
          },
          {
            internalType: 'TokenId',
            name: 'tokenId',
            type: 'uint16',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'uint64',
            name: 'nonce',
            type: 'uint64',
          },
        ],
        internalType: 'struct IRouterEventsAndTypes.VaultPayTreasuryMessage',
        name: 'message',
        type: 'tuple',
      },
      {
        internalType: 'bytes',
        name: 'signature',
        type: 'bytes',
      },
    ],
    name: 'vaultPayTreasury',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'TokenId',
        name: 'tokenId',
        type: 'uint16',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'vaultPayTreasury',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'root',
            type: 'address',
          },
          {
            internalType: 'uint32',
            name: 'boxId',
            type: 'uint32',
          },
          {
            internalType: 'address',
            name: 'token',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'uint64',
            name: 'expiry',
            type: 'uint64',
          },
          {
            internalType: 'uint256',
            name: 'salt',
            type: 'uint256',
          },
        ],
        internalType: 'struct IRouterEventsAndTypes.WithdrawFromBoxMessage',
        name: 'message',
        type: 'tuple',
      },
      {
        internalType: 'bytes',
        name: 'signature',
        type: 'bytes',
      },
    ],
    name: 'withdrawFromBox',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;
