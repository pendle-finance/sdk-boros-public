import { WalletClient } from 'viem';
import { getUserAddressFromWalletClient } from '..';
import { ApproveAgentMessage, SetAccManagerStruct } from '../../types';
import { EIP712_DOMAIN_TYPES, PENDLE_BOROS_ROUTER_DOMAIN } from './common';

export async function signSetAccManagerMessage(wallet: WalletClient, message: SetAccManagerStruct) {
  const [account] = await wallet.getAddresses();
  return wallet.signTypedData({
    account: wallet.account ?? account,
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

export async function signApproveAgentMessage(wallet: WalletClient, message: ApproveAgentMessage) {
  const account = await getUserAddressFromWalletClient(wallet);
  return wallet.signTypedData({
    account: wallet.account ?? account,
    domain: PENDLE_BOROS_ROUTER_DOMAIN,
    types: {
      EIP712Domain: EIP712_DOMAIN_TYPES,
      ApproveAgentMessage: [
        { name: 'account', type: 'bytes21' },
        { name: 'agent', type: 'address' },
        { name: 'expiry', type: 'uint64' },
        { name: 'nonce', type: 'uint64' },
      ],
    },
    primaryType: 'ApproveAgentMessage',
    message,
  });
}
