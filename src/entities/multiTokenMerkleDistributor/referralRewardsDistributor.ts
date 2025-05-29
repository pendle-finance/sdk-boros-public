import { Address, toBytes } from "viem";
import { BorosBackend } from "../../backend";
import { MultiTokenMerkleDistributor } from "./multiTokenMerkleDistributor";


export class ReferralRewardsDistributor {
    private borosBackendSdk: BorosBackend.DefaultSdk;
    private multiTokenMerkleDistributor: MultiTokenMerkleDistributor;
    constructor(){
        this.borosBackendSdk = BorosBackend.getSdk();
        this.multiTokenMerkleDistributor = new MultiTokenMerkleDistributor();
    }    

    async claim(user: Address){
        const resp = await this.borosBackendSdk.merkels.merklesControllerGetMerkleByUserAndCampaign('referral', user);
        const { tokens, accruedAmounts, proofs } = resp.data;
        const claimData = await this.multiTokenMerkleDistributor.claim(
            user, 
            tokens.map(token => token as Address), 
            accruedAmounts.map(amount => BigInt(amount)), 
            proofs
        );

        return claimData; 
    }
}

export default ReferralRewardsDistributor;