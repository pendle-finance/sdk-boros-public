import { createWalletClient, http, Address, WalletClient } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { Exchange, Agent } from '../../..';
import { Side, TimeInForce } from '../../../../types';
import { MarketAccLib } from '../../../../utils';

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
}> {
  const walletClient = await setupWalletClient(config);
  const account = walletClient.account!;

  const exchange = new Exchange(
    walletClient,
    account.address,
    config.accountId
  );

  const { agent } = await Agent.create(walletClient);
  await exchange.approveAgent(agent);

  const {results: markets} = await exchange.getMarkets();
  const {assets} = await exchange.getAssets();
  const collateralAddress = markets[0].collateralAddress;
  const tokenId = assets.find((a) => a.address === collateralAddress)!.tokenId;
  const marketId = markets[0].marketId;
  const marketAddress = markets[0].address as Address;

  return { exchange, agent, walletClient, marketAddress, tokenId, marketId };
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
  marketAddress: Address;
  ammAddresses: Address[];
  side: Side;
  size: bigint;
  limitTick: number;
  tif?: TimeInForce;
  useOrderBook?: boolean;
}

export async function placeExampleOrder(
  exchange: Exchange,
  config: PlaceOrderConfig
) {
  const orderResult = await exchange.placeOrder({
    marketAcc: config.marketAcc,
    marketAddress: config.marketAddress,
    ammAddresses: config.ammAddresses,
    side: config.side,
    size: config.size,
    limitTick: config.limitTick,
    tif: config.tif ?? TimeInForce.GOOD_TIL_CANCELLED,
    useOrderBook: config.useOrderBook ?? true
  });

  return orderResult;
}
