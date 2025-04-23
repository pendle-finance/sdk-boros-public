import { Address, Hex, WalletClient, encodeFunctionData } from 'viem';
import { iRouterAbi } from '../../contracts/viemAbis';
import { SetAccManagerStruct } from '../../types/common';
import { getUserAddressFromWalletClient, signSetAccManagerMessage } from '../../utils';

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
}
