import { createWalletClient, http, Address, WalletClient } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { Exchange, Agent, MarketAccLib, Side, TimeInForce } from '../../src';
import { MarketResponse } from '../../src/backend/secrettune/BorosCoreSDK';
export interface ExampleConfig {
  privateKey: `0x${string}`;
  rpcUrl: string;
  accountId: number;
}

export async function setupWalletClient(config: ExampleConfig): Promise<WalletClient> {
  const account = privateKeyToAccount(config.privateKey);
  return createWalletClient({
    transport: http(config.rpcUrl),
    account: account,
  });
}

export async function setupExchange(config: ExampleConfig): Promise<{
  exchange: Exchange;
  agent: Agent;
  walletClient: WalletClient;
  marketAddress: Address;
  tokenId: number;
  marketId: number;
  market: MarketResponse;
}> {
  const walletClient = await setupWalletClient(config);
  const account = walletClient.account!;

  const exchange = new Exchange(
    walletClient,
    account.address,
    config.accountId,
    [config.rpcUrl]
  );

  const { agent } = await Agent.create(walletClient);
  await exchange.approveAgent(agent);

  const {results: markets} = await exchange.getMarkets();
  const {assets} = await exchange.getAssets();
  const tokenId = markets[0].tokenId;
  const marketId = markets[0].marketId;
  const marketAddress = markets[0].address as Address;
  const market = markets[0];

  return { exchange, agent, walletClient, marketAddress, tokenId, marketId, market };
}

export async function createMarketAcc(
  address: Address,
  accountId: number,
  tokenId: number,
  marketId: number
): Promise<`0x${string}`> {
  return MarketAccLib.pack(address, accountId, tokenId, marketId) as `0x${string}`;
}

export interface PlaceOrderConfig {
  marketAcc: `0x${string}`;
  marketId: number;
  side: Side;
  size: bigint;
  limitTick: number;
  tif?: TimeInForce;
}

export async function placeExampleOrder(
  exchange: Exchange,
  config: PlaceOrderConfig
) {
  const orderResult = await exchange.placeOrder({
    marketAcc: config.marketAcc,
    marketId: config.marketId,
    side: config.side,
    size: config.size,
    limitTick: config.limitTick,
    tif: config.tif ?? TimeInForce.GOOD_TIL_CANCELLED,
  });

  return orderResult;
}
