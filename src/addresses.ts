import { Address } from 'viem';

export type Environment = 'production' | 'development';

export let env: Environment = 'production';

export function setEnv(environment: Environment) {
  env = environment;
}

const PROD_ADDRESSES = {
  ROUTER_ADDRESS: '0x8080808080daB95eFED788a9214e400ba552DEf6',
  MARKET_HUB_ADDRESS: '0x1080808080f145b14228443212e62447C112ADaD',
  EXPLORER_ADDRESS: '0x40808080804111c374C8F1dc78b13FB57Df93197',
  MARKET_FACTORY_ADDRESS: '0x3080808080Ee6a795c1a6Ff388195Aa5F11ECeE0',
  EXPLORER_CONTRACT_ADDRESS: '0x40808080804111c374C8F1dc78b13FB57Df93197',
  CHAIN_ID: 42161,

  //TODO: fix this
  REFERRAL_MERKLE_DISTRIBUTOR_ADDRESS: '0xD2808080809a71248620a7ddc25b721d3DBe1058',
  MAKER_INCENTIVE_MERKLE_DISTRIBUTOR_ADDRESS: '0xD0808080803c59dBF8825290bca8979786C2d65B',
  LP_REWARDS_MERKLE_DISTRIBUTOR_ADDRESS: '0xD180808080402FE41711Db560B8db5C41e21Df71',
} as const;

const DEV_ADDRESSES = {
  ROUTER_ADDRESS: '0x17386DF702Cc9ec208669aB3ca5b49abE5a26dF3',
  MARKET_HUB_ADDRESS: '0x85826c9973965aebC86dCb52C13472EB062f9B09',
  EXPLORER_ADDRESS: '0x0CcB40176E133E5A011130D6BF6665005C29839E',
  MARKET_FACTORY_ADDRESS: '0xD3FC4B3fDA95597caAB5ea781337e0cD94d6850A',
  EXPLORER_CONTRACT_ADDRESS: '0x0CcB40176E133E5A011130D6BF6665005C29839E',
  CHAIN_ID: 42161,
  REFERRAL_MERKLE_DISTRIBUTOR_ADDRESS: '0x580bd289c25e7f254634e6ad8a95d631393c7172',
  MAKER_INCENTIVE_MERKLE_DISTRIBUTOR_ADDRESS: '0xAe94ccf0Cc9E6A783bc5ec3515f745bFaF68960A',
  LP_REWARDS_MERKLE_DISTRIBUTOR_ADDRESS: '0x5fa1be763d5eb2cb4df90f557468421bd7f27fbf',
} as const;

export const getRouterAddress = (): Address => {
  return env === 'production' ? PROD_ADDRESSES.ROUTER_ADDRESS : DEV_ADDRESSES.ROUTER_ADDRESS;
};

export const getMarketHubAddress = (): Address => {
  return env === 'production' ? PROD_ADDRESSES.MARKET_HUB_ADDRESS : DEV_ADDRESSES.MARKET_HUB_ADDRESS;
};

export const getExplorerAddress = (): Address => {
  return env === 'production' ? PROD_ADDRESSES.EXPLORER_ADDRESS : DEV_ADDRESSES.EXPLORER_ADDRESS;
};

export const getMarketFactoryAddress = (): Address => {
  return env === 'production' ? PROD_ADDRESSES.MARKET_FACTORY_ADDRESS : DEV_ADDRESSES.MARKET_FACTORY_ADDRESS;
};

export const getExplorerContractAddress = (): Address => {
  return env === 'production' ? PROD_ADDRESSES.EXPLORER_CONTRACT_ADDRESS : DEV_ADDRESSES.EXPLORER_CONTRACT_ADDRESS;
};

export const getReferralMerkleDistributorAddress = (): Address => {
  return env === 'production'
    ? PROD_ADDRESSES.REFERRAL_MERKLE_DISTRIBUTOR_ADDRESS
    : DEV_ADDRESSES.REFERRAL_MERKLE_DISTRIBUTOR_ADDRESS;
};
export const getMakerIncentiveMerkleDistributorAddress = (): Address => {
  return env === 'production'
    ? PROD_ADDRESSES.MAKER_INCENTIVE_MERKLE_DISTRIBUTOR_ADDRESS
    : DEV_ADDRESSES.MAKER_INCENTIVE_MERKLE_DISTRIBUTOR_ADDRESS;
};

export const getLpRewardsMerkleDistributorAddress = (): Address => {
  return env === 'production'
    ? PROD_ADDRESSES.LP_REWARDS_MERKLE_DISTRIBUTOR_ADDRESS
    : DEV_ADDRESSES.LP_REWARDS_MERKLE_DISTRIBUTOR_ADDRESS;
};

export const getChainId = (): number => {
  return env === 'production' ? PROD_ADDRESSES.CHAIN_ID : DEV_ADDRESSES.CHAIN_ID;
};

export const getAddressesForEnvironment = () => ({
  ROUTER_ADDRESS: getRouterAddress(),
  MARKET_HUB_ADDRESS: getMarketHubAddress(),
  EXPLORER_ADDRESS: getExplorerAddress(),
  MARKET_FACTORY_ADDRESS: getMarketFactoryAddress(),
  EXPLORER_CONTRACT_ADDRESS: getExplorerContractAddress(),
  CHAIN_ID: getChainId(),
  REFERRAL_MERKLE_DISTRIBUTOR_ADDRESS: getReferralMerkleDistributorAddress(),
  MAKER_INCENTIVE_MERKLE_DISTRIBUTOR_ADDRESS: getMakerIncentiveMerkleDistributorAddress(),
  LP_REWARDS_MERKLE_DISTRIBUTOR_ADDRESS: getLpRewardsMerkleDistributorAddress(),
});

export const ROUTER_ADDRESS = getRouterAddress();
export const MARKET_HUB_ADDRESS = getMarketHubAddress();
export const EXPLORER_ADDRESS = getExplorerAddress();
export const MARKET_FACTORY_ADDRESS = getMarketFactoryAddress();
export const CHAIN_ID = getChainId();
export const EXPLORER_CONTRACT_ADDRESS = getExplorerContractAddress();
export const MULTI_TOKEN_MERKLE_DISTRIBUTOR_ADDRESS = getReferralMerkleDistributorAddress();
export const MAKER_INCENTIVE_MERKLE_DISTRIBUTOR_ADDRESS = getMakerIncentiveMerkleDistributorAddress();
export const LP_REWARDS_MERKLE_DISTRIBUTOR_ADDRESS = getLpRewardsMerkleDistributorAddress();

export const PROD_ADDRESSES_CONFIG = PROD_ADDRESSES;
export const DEV_ADDRESSES_CONFIG = DEV_ADDRESSES;
