import { Address, createPublicClient, getContract, http } from 'viem';
import { iPVeTokenAbi } from '../../contracts';
import { mainnet } from 'viem/chains';
import { FixedX18 } from '@pendle/boros-offchain-math';

const VE_PENDLE_ADDRESS = '0x4f30A9D41B80ecC5B94306AB4364951AE3170210';
const ETH_RPC_URL = 'https://eth.llamarpc.com';

export class VePendle {
  private vePendleContract;
  constructor(rpcUrl?: string) {
    this.vePendleContract = getContract({
      address: VE_PENDLE_ADDRESS,
      abi: iPVeTokenAbi,
      client: createPublicClient({
        chain: mainnet,
        transport: http(rpcUrl ?? ETH_RPC_URL),
      }),
    });
  }

  async getVePendleBalance(userAddress: Address) {
    const balance = await this.vePendleContract.read.balanceOf([userAddress]);
    return FixedX18.fromRawValue(balance).toNumber();
  }
}
