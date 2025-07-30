import { Address } from 'viem';
import { BorosBackend } from '../../backend';
import { RewardDistributor } from './RewardDistributor';
import { LP_REWARDS_MERKLE_DISTRIBUTOR_ADDRESS, MAKER_INCENTIVE_MERKLE_DISTRIBUTOR_ADDRESS } from './constants';
import { Environment } from '../../addresses';

export class LpRewardsDistributor extends RewardDistributor {
  private borosCoreSdk: BorosBackend.BorosCoreSdk;
  constructor(env?: Environment) {
    super(LP_REWARDS_MERKLE_DISTRIBUTOR_ADDRESS);
    this.borosCoreSdk = BorosBackend.getCoreSdk(env);
  }

  async getMerkleByUser(user: Address): Promise<{
    tokens: Address[];
    accruedAmounts: bigint[];
    proofs: string[][];
  }> {
    const resp = await this.borosCoreSdk.merkels.merklesControllerGetMerkleByUserAndCampaign('amm_lp_rewards', user);
    const { tokens, accruedAmounts, proofs } = resp.data;
    return {
      tokens: tokens.map((token) => token as Address),
      accruedAmounts: accruedAmounts.map((amount) => BigInt(amount)),
      proofs,
    };
  }
}

export default LpRewardsDistributor;
