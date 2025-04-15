import { Side, TimeInForce } from '../../../../types';
import { ExampleConfig, setupExchange, createMarketAcc, placeExampleOrder } from './utils';

async function placeAndCancelOrderExample() {
  // Configuration
  const config: ExampleConfig = {
    privateKey: '0xYourPrivateKey', // Replace with your private key
    rpcUrl: 'https://your-rpc-endpoint.com', // Replace with your RPC URL
    accountId: 0
  };

  try {
    // Setup exchange and agent using helper
    const { exchange, walletClient, marketAddress, tokenId, marketId } = await setupExchange(config);

    const marketAcc = await createMarketAcc(
      walletClient.account!.address,
      config.accountId,
      tokenId,
      marketId
    );
    
    // Place an order using helper
    const orderResult = await placeExampleOrder(exchange, {
      marketAcc,
      marketAddress,
      ammAddresses: [],
      side: Side.LONG,
      size: 100000000000000000000n, // 100 tokens with 18 decimals
      limitTick: 1000,
      tif: TimeInForce.GOOD_TIL_CANCELLED,
      useOrderBook: true
    });
    
    console.log('Order placed:', orderResult);
    
    // Get the order ID from the result and convert to string
    const orderId = orderResult.result?.order?.orderId;
    if (!orderId) {
      throw new Error('Failed to get order ID from result');
    }
    
    // Cancel the specific order
    const cancelResult = await exchange.cancelOrders({
      marketAcc,
      marketAddress,
      cancelAll: false,
      orderIds: [String(orderId)] // Convert bigint to string
    });
    
    console.log('Order cancelled:', cancelResult);

    // Example of cancelling all orders in a market
    const cancelAllResult = await exchange.cancelOrders({
      marketAcc,
      marketAddress,
      cancelAll: true,
      orderIds: []
    });
    
    console.log('All orders cancelled:', cancelAllResult);
    
    return {
      orderResult,
      cancelResult,
      cancelAllResult
    };
  } catch (error) {
    console.error('Error in example:', error);
    throw error;
  }
}

// Run the example
placeAndCancelOrderExample()
  .then(results => console.log('Example completed successfully:', results))
  .catch(error => console.error('Error running example:', error));
