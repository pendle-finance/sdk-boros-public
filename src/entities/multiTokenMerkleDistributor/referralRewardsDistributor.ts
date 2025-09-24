import { Address } from 'viem';
import { BorosBackend } from '../../backend';
import { RewardDistributor } from './RewardDistributor';
import { getReferralMerkleDistributorAddress } from '../../addresses';

export class ReferralRewardsDistributor extends RewardDistributor {
  private borosCoreSdk: BorosBackend.BorosCoreSdk;
  constructor() {
    super(getReferralMerkleDistributorAddress());
    this.borosCoreSdk = BorosBackend.getCoreSdk();
  }

  async getMerkleByUser(user: Address): Promise<{
    tokens: Address[];
    accruedAmounts: bigint[];
    proofs: string[][];
  }> {
    const resp = await this.borosCoreSdk.merkels.merklesControllerGetMerkleByUserAndCampaign('referral', user);
    const { tokens, accruedAmounts, proofs } = resp.data;
    return {
      tokens: tokens.map((token) => token as Address),
      accruedAmounts: accruedAmounts.map((amount) => BigInt(amount)),
      proofs,
    };
  }
}

export default ReferralRewardsDistributor;
