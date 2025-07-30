import { Address } from 'viem';
import { BorosBackend } from '../../backend';
import { RewardDistributor } from './RewardDistributor';
import { MULTI_TOKEN_MERKLE_DISTRIBUTOR_ADDRESS } from './constants';
import { Environment } from '../../addresses';

export class ReferralRewardsDistributor extends RewardDistributor {
  private borosCoreSdk: BorosBackend.BorosCoreSdk;
  constructor(env?: Environment) {
    super(MULTI_TOKEN_MERKLE_DISTRIBUTOR_ADDRESS);
    this.borosCoreSdk = BorosBackend.getCoreSdk(env);
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
