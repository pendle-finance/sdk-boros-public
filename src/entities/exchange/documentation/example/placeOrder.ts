import { Address } from 'viem';
import { Side, TimeInForce } from '../../../../types';
import { ExampleConfig, createMarketAcc, setupExchange } from './utils';
import { CancelOrdersParams, PlaceOrderParams } from '../../types';

async function main() {
  const config: ExampleConfig = {
    privateKey: '0xYourPrivateKeyHere',
    rpcUrl: 'https://your-rpc-endpoint.com',
    accountId: 0
  };

  try {
    const { exchange, walletClient, marketAddress, tokenId, marketId } = await setupExchange(config);
    
    const marketAcc = await createMarketAcc(
      walletClient.account!.address,
      config.accountId,
      tokenId,
      marketId
    );

    const limitOrderParams: PlaceOrderParams = {
      marketAcc,
      marketAddress,
      ammAddresses: [],
      side: Side.LONG,
      size: BigInt('1000000000000000000'),
      limitTick: 1000,
      tif: TimeInForce.GOOD_TIL_CANCELLED,
      useOrderBook: true
    };

    const {result: limitOrderResult, executeResponse} = await exchange.placeOrder(limitOrderParams);

    console.log('Limit order result:', limitOrderResult);

    const {
        status,
        txHash
    } = executeResponse;

    const {
        side,
        placedSize,
        orderId,
        root,
        accountId,
        isCross,
        blockTimestamp,
    } = limitOrderResult.order!;
    
    const MAX_TICK = 32767;

    const marketOrderParams: PlaceOrderParams = {
      marketAcc,
      marketAddress,
      ammAddresses: [],
      side: Side.LONG,
      size: BigInt('1000000000000000000'),
      limitTick: MAX_TICK,
      tif: TimeInForce.FILL_OR_KILL,
      useOrderBook: true
    };

    const marketOrderResult = await exchange.placeOrder(marketOrderParams);
    console.log('Market order result:', marketOrderResult);

  } catch (error) {
    console.error('Error placing order:', error);
    throw error;
  }
}

// Run the example
if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

// Export for use in other examples
export { main as placeOrderExample };
