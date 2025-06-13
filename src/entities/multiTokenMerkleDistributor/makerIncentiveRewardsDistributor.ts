import { Address, toBytes } from "viem";
import { BorosBackend } from "../../backend";
import { MultiTokenMerkleDistributor } from "./multiTokenMerkleDistributor";
import { MAKER_INCENTIVE_MERKLE_DISTRIBUTOR_ADDRESS } from "./constants";


export class MakerIncentiveRewardsDistributor {
    private borosBackendSdk: BorosBackend.DefaultSdk;
    private multiTokenMerkleDistributor: MultiTokenMerkleDistributor;
    constructor(){
        this.borosBackendSdk = BorosBackend.getSdk();
        this.multiTokenMerkleDistributor = new MultiTokenMerkleDistributor(MAKER_INCENTIVE_MERKLE_DISTRIBUTOR_ADDRESS);
    }    

    async claim(user: Address){
        const resp = await this.borosBackendSdk.merkels.merklesControllerGetMerkleByUserAndCampaign('maker_incentive', user);
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

export default MakerIncentiveRewardsDistributor;