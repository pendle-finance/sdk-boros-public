import { WalletClient } from 'viem';
import { getUserAddressFromWalletClient } from '..';
import { ApproveAgentStruct, SetAccManagerStruct } from '../../types';
import { EIP712_DOMAIN_TYPES, PENDLE_BOROS_ROUTER_DOMAIN } from './common';

export async function signSetAccManagerMessage(wallet: WalletClient, message: SetAccManagerStruct) {
  const [account] = await wallet.getAddresses();
  return wallet.signTypedData({
    account,
    domain: PENDLE_BOROS_ROUTER_DOMAIN,
    types: {
      EIP712Domain: EIP712_DOMAIN_TYPES,
      SetAccManagerStruct: [
        { name: 'account', type: 'bytes21' },
        { name: 'accManager', type: 'address' },
        { name: 'nonce', type: 'uint64' },
      ],
    },
    primaryType: 'SetAccManagerStruct',
    message,
  });
}

export async function signApproveAgentMessage(wallet: WalletClient, message: ApproveAgentStruct) {
  const account = await getUserAddressFromWalletClient(wallet);
  return wallet.signTypedData({
    account,
    domain: PENDLE_BOROS_ROUTER_DOMAIN,
    types: {
      EIP712Domain: EIP712_DOMAIN_TYPES,
      ApproveAgentStruct: [
        { name: 'account', type: 'bytes21' },
        { name: 'agent', type: 'address' },
        { name: 'expiry', type: 'uint64' },
        { name: 'nonce', type: 'uint64' },
      ],
    },
    primaryType: 'ApproveAgentStruct',
    message,
  });
}
