import { WalletClient } from 'viem';
import { getUserAddressFromWalletClient } from '..';
import { ApproveAgentMessage, SetAccManagerStruct } from '../../types';
import { EIP712_DOMAIN_TYPES, PENDLE_BOROS_ROUTER_DOMAIN } from './common';
import { Environment } from '../../addresses';

export async function signSetAccManagerMessage(wallet: WalletClient, message: SetAccManagerStruct, env: Environment) {
  const account = await getUserAddressFromWalletClient(wallet);
  return wallet.signTypedData({
    account: wallet.account ?? account,
    domain: PENDLE_BOROS_ROUTER_DOMAIN(env),
    types: {
      EIP712Domain: EIP712_DOMAIN_TYPES,
      SetAccManagerMessage: [
        { name: 'root', type: 'address' },
        { name: 'accountId', type: 'uint8' },
        { name: 'accManager', type: 'address' },
        { name: 'nonce', type: 'uint64' },
      ],
    },
    primaryType: 'SetAccManagerMessage',
    message,
  });
}

export async function signApproveAgentMessage(wallet: WalletClient, message: ApproveAgentMessage, env: Environment) {
  const account = await getUserAddressFromWalletClient(wallet);
  return wallet.signTypedData({
    account: wallet.account ?? account,
    domain: PENDLE_BOROS_ROUTER_DOMAIN(env),
    types: {
      EIP712Domain: EIP712_DOMAIN_TYPES,
      ApproveAgentMessage: [
        { name: 'root', type: 'address' },
        { name: 'accountId', type: 'uint8' },
        { name: 'agent', type: 'address' },
        { name: 'expiry', type: 'uint64' },
        { name: 'nonce', type: 'uint64' },
      ],
    },
    primaryType: 'ApproveAgentMessage',
    message,
  });
}
