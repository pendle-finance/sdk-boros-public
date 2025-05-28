import { Address, ByteArray, createPublicClient, encodeFunctionData, getContract, http } from "viem";
import { MULTI_TOKEN_MERKLE_DISTRIBUTOR_ADDRESS } from "./constants";
import { arbitrum } from "viem/chains";
import { RPC_URL } from "../../common";
import { multiTokenMerkleDistributorAbi } from "../../contracts/multiTokenMerkleDistributorAbi";

export class MultiTokenMerkleDistributor {
    private distributorContract;
    constructor() {
        this.distributorContract = getContract({
            address: MULTI_TOKEN_MERKLE_DISTRIBUTOR_ADDRESS,
            abi: multiTokenMerkleDistributorAbi,
            client: createPublicClient({
                chain: arbitrum,
                transport: http(RPC_URL),
            }),
        })
    }

    async claim(
        receiver: Address, 
        tokens: Address[], 
        totalAccrueds: bigint[], 
        proofs: string[][]
    ){
        const args = [receiver, tokens, totalAccrueds, proofs]; 
        const data = encodeFunctionData({
            abi: multiTokenMerkleDistributorAbi,
            functionName: 'claim',
            args: args
        })

        const gas = await this.distributorContract.estimateGas.claim(args, {
            account: receiver,
        })
        
        return {
            from: receiver, 
            to: MULTI_TOKEN_MERKLE_DISTRIBUTOR_ADDRESS, 
            data, 
            gas
        }
    }

    async getMerkleRoot(){
        const merkleRoot = await this.distributorContract.read.merkleRoot();
        return merkleRoot;
    }
}       