import { Address } from "viem";
import { BorosBackend } from "../../backend";
import { MULTI_TOKEN_MERKLE_DISTRIBUTOR_ADDRESS } from "./constants";
import { RewardDistributor } from "./RewardDistributor";


export class ReferralRewardsDistributor extends RewardDistributor {
    private borosBackendSdk: BorosBackend.DefaultSdk;
    constructor(){
        super(MULTI_TOKEN_MERKLE_DISTRIBUTOR_ADDRESS);
        this.borosBackendSdk = BorosBackend.getSdk();
    }

    async getMerkleByUser(user: Address): Promise<{
        tokens: Address[];
        accruedAmounts: bigint[];
        proofs: string[][];
    }> {
        const resp = await this.borosBackendSdk.merkels.merklesControllerGetMerkleByUserAndCampaign('referral', user);
        const { tokens, accruedAmounts, proofs } = resp.data;
        return {
            tokens: tokens.map(token => token as Address), 
            accruedAmounts: accruedAmounts.map(amount => BigInt(amount)), 
            proofs
        };
    }    
}

export default ReferralRewardsDistributor;