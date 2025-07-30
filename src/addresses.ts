import { Address } from "viem";

export type Environment = 'production' | 'development';

const PROD_ADDRESSES = {
  ROUTER_ADDRESS: '0x8080808080daB95eFED788a9214e400ba552DEf6',
  MARKET_HUB_ADDRESS: '0x1080808080f145b14228443212e62447C112ADaD',
  EXPLORER_ADDRESS: '0x40808080804111c374C8F1dc78b13FB57Df93197',
  MARKET_FACTORY_ADDRESS: '0x3080808080Ee6a795c1a6Ff388195Aa5F11ECeE0',
  LIQUIDATION_EXECUTOR_ADDRESS: '0x1b779567A8A0FF6aC680605064B132a7a086D016',
  CHAIN_ID: 42161,
} as const;

const DEV_ADDRESSES = {
  ROUTER_ADDRESS: '0x17386DF702Cc9ec208669aB3ca5b49abE5a26dF3',
  MARKET_HUB_ADDRESS: '0x85826c9973965aebC86dCb52C13472EB062f9B09',
  EXPLORER_ADDRESS: '0x0CcB40176E133E5A011130D6BF6665005C29839E',
  MARKET_FACTORY_ADDRESS: '0xD3FC4B3fDA95597caAB5ea781337e0cD94d6850A',
  LIQUIDATION_EXECUTOR_ADDRESS: '0x1b779567A8A0FF6aC680605064B132a7a086D016',
  CHAIN_ID: 42161,
} as const;

export const getRouterAddress = (env: Environment = 'production'): Address => {
  return env === 'production' ? PROD_ADDRESSES.ROUTER_ADDRESS : DEV_ADDRESSES.ROUTER_ADDRESS;
};

export const getMarketHubAddress = (env: Environment = 'production'): Address => {
  return env === 'production' ? PROD_ADDRESSES.MARKET_HUB_ADDRESS : DEV_ADDRESSES.MARKET_HUB_ADDRESS;
};

export const getExplorerAddress = (env: Environment = 'production'): Address => {
  return env === 'production' ? PROD_ADDRESSES.EXPLORER_ADDRESS : DEV_ADDRESSES.EXPLORER_ADDRESS;
};

export const getMarketFactoryAddress = (env: Environment = 'production'): Address => {
  return env === 'production' ? PROD_ADDRESSES.MARKET_FACTORY_ADDRESS : DEV_ADDRESSES.MARKET_FACTORY_ADDRESS;
};

export const getLiquidationExecutorAddress = (env: Environment = 'production'): Address => {
  return env === 'production' ? PROD_ADDRESSES.LIQUIDATION_EXECUTOR_ADDRESS : DEV_ADDRESSES.LIQUIDATION_EXECUTOR_ADDRESS;
};

export const getChainId = (env: Environment = 'production'): number => {
  return env === 'production' ? PROD_ADDRESSES.CHAIN_ID : DEV_ADDRESSES.CHAIN_ID;
};

export const getAddressesForEnvironment = (env: Environment = 'production') => ({
  ROUTER_ADDRESS: getRouterAddress(env),
  MARKET_HUB_ADDRESS: getMarketHubAddress(env),
  EXPLORER_ADDRESS: getExplorerAddress(env),
  MARKET_FACTORY_ADDRESS: getMarketFactoryAddress(env),
  LIQUIDATION_EXECUTOR_ADDRESS: getLiquidationExecutorAddress(env),
  CHAIN_ID: getChainId(env),
});

export const ROUTER_ADDRESS = getRouterAddress('production');
export const MARKET_HUB_ADDRESS = getMarketHubAddress('production');
export const EXPLORER_ADDRESS = getExplorerAddress('production');
export const MARKET_FACTORY_ADDRESS = getMarketFactoryAddress('production');
export const LIQUIDATION_EXECUTOR_ADDRESS = getLiquidationExecutorAddress('production');
export const CHAIN_ID = getChainId('production');

export const PROD_ADDRESSES_CONFIG = PROD_ADDRESSES;
export const DEV_ADDRESSES_CONFIG = DEV_ADDRESSES;
