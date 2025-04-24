import { Address, Hex, WalletClient, encodeFunctionData } from 'viem';
import { ROUTER_ADDRESS } from '../../addresses';
import { iRouterAbi } from '../../contracts/viemAbis';
import { Account, SetAccManagerStruct } from '../../types/common';
import { getUserAddressFromWalletClient, signSetAccManagerMessage } from '../../utils';
import { publicClient } from '../publicClient';

export class AccManager {
  private static async createSetAccManagerMessage(
    userAddress: Address,
    accManagerAddress: Address
  ): Promise<SetAccManagerStruct> {
    const nonce = BigInt(Date.now());
    return {
      root: userAddress,
      accountId: 0,
      accManager: accManagerAddress,
      nonce,
    };
  }

  static async setAccManager(userWalletClient: WalletClient, accManagerAddress: Address): Promise<Hex> {
    const userAddress = await getUserAddressFromWalletClient(userWalletClient);
    const setAccManagerStruct = await AccManager.createSetAccManagerMessage(userAddress, accManagerAddress);
    const setAccManagerSignature = await signSetAccManagerMessage(userWalletClient, setAccManagerStruct);
    return AccManager.getSetAccManagerData(setAccManagerStruct, setAccManagerSignature);
  }

  private static getSetAccManagerData(setAccManagerStruct: SetAccManagerStruct, signature: Hex): Hex {
    const data = encodeFunctionData({
      abi: iRouterAbi,
      functionName: 'setAccManager',
      args: [setAccManagerStruct, signature],
    });
    return data;
  }

  static async getAccManager(account: Account): Promise<Address> {
    const accManagerAddress = await publicClient.readContract({
      address: ROUTER_ADDRESS,
      abi: iRouterAbi,
      functionName: 'accountManager',
      args: [account],
    });
    return accManagerAddress;
  }
}
