import { Address, ByteArray, createPublicClient, encodeFunctionData, getContract, http } from 'viem';
import { arbitrum } from 'viem/chains';
import { RPC_URL } from '../../common';
import { multiTokenMerkleDistributorAbi } from '../../contracts/abis/multiTokenMerkleDistributorAbi';

export class MultiTokenMerkleDistributorContract {
  private distributorContract;
  private contractAddress: Address;
  constructor(contractAddress: Address) {
    this.contractAddress = contractAddress;
    this.distributorContract = getContract({
      address: contractAddress,
      abi: multiTokenMerkleDistributorAbi,
      client: createPublicClient({
        chain: arbitrum,
        transport: http(RPC_URL),
      }),
    });
  }

  async claim(receiver: Address, tokens: Address[], totalAccrueds: bigint[], proofs: string[][]) {
    const args = [receiver, tokens, totalAccrueds, proofs];
    const data = encodeFunctionData({
      abi: multiTokenMerkleDistributorAbi,
      functionName: 'claim',
      args: args,
    });

    const gas = (await this.distributorContract.estimateGas.claim(args, {
      account: receiver,
    })) * BigInt(2);

    return {
      from: receiver,
      to: this.contractAddress,
      data,
      gas,
    };
  }

  async getMerkleRoot() {
    const merkleRoot = await this.distributorContract.read.merkleRoot();
    return merkleRoot;
  }
}
