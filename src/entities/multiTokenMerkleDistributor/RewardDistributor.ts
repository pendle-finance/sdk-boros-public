import { Address } from "viem";
import { MultiTokenMerkleDistributorContract } from "./multiTokenMerkleDistributorContract";

export abstract class RewardDistributor {
    private merkleDistributor: MultiTokenMerkleDistributorContract;
    constructor(merkleDistributorAddress: Address){
        this.merkleDistributor = new MultiTokenMerkleDistributorContract(merkleDistributorAddress);
    }

    abstract getMerkleByUser(user: Address): Promise<{
        tokens: Address[];
        accruedAmounts: bigint[];
        proofs: string[][];
    }>;

    async claim(user: Address): Promise<{
        from: Address;
        to: Address;
        data: string;
        gas: bigint;
    }>{
        const { tokens, accruedAmounts, proofs } = await this.getMerkleByUser(user);
        const claimData = await this.merkleDistributor.claim(
            user, 
            tokens.map(token => token as Address), 
            accruedAmounts.map(amount => BigInt(amount)), 
            proofs
        );

        return claimData;
    }; 
}