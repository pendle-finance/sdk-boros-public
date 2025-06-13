import { Address } from "viem";
import { BorosBackend } from "../../backend";
import { MAKER_INCENTIVE_MERKLE_DISTRIBUTOR_ADDRESS } from "./constants";
import { RewardDistributor } from "./RewardDistributor";


export class MakerIncentiveRewardsDistributor extends RewardDistributor {
    private borosBackendSdk: BorosBackend.DefaultSdk;
    constructor(){
        super(MAKER_INCENTIVE_MERKLE_DISTRIBUTOR_ADDRESS);
        this.borosBackendSdk = BorosBackend.getSdk();
    }    

    async getMerkleByUser(user: Address): Promise<{
        tokens: Address[];
        accruedAmounts: bigint[];
        proofs: string[][];
    }> {
        const resp = await this.borosBackendSdk.merkels.merklesControllerGetMerkleByUserAndCampaign('maker_incentive', user);
        const { tokens, accruedAmounts, proofs } = resp.data;
        return {
            tokens: tokens.map(token => token as Address), 
            accruedAmounts: accruedAmounts.map(amount => BigInt(amount)), 
            proofs
        };
    }
}

export default MakerIncentiveRewardsDistributor;