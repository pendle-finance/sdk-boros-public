export const iDepositBoxFactoryAbi = [
  {
    inputs: [],
    name: 'BEACON_PROXY_CODE_CONTRACT',
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
    inputs: [],
    name: 'DEPOSIT_BOX_BEACON',
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
    inputs: [],
    name: 'DEPOSIT_BOX_CODE_HASH',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        internalType: 'uint32',
        name: 'boxId',
        type: 'uint32',
      },
    ],
    name: 'computeDepositBox',
    outputs: [
      {
        internalType: 'address',
        name: 'box',
        type: 'address',
      },
      {
        internalType: 'bytes32',
        name: 'salt',
        type: 'bytes32',
      },
      {
        internalType: 'bool',
        name: 'deployed',
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
        name: 'owner',
        type: 'address',
      },
      {
        internalType: 'uint32',
        name: 'boxId',
        type: 'uint32',
      },
    ],
    name: 'deployDepositBox',
    outputs: [
      {
        internalType: 'contract IPDepositBox',
        name: 'box',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;
