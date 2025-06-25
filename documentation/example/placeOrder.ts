import { Address } from 'viem';
import { ExampleConfig, createMarketAcc, setupExchange } from './utils';
import { BulkPlaceOrderParams, PlaceOrderParams, Side, TimeInForce } from '../../src';
import { estimateTickForRate, FixedX18 } from '@pendle/boros-offchain-math';

async function main() {
  const config: ExampleConfig = {
    privateKey: '0xYourPrivateKeyHere',
    rpcUrl: 'https://your-rpc-endpoint.com',
    accountId: 0
  };

  try {
    const { exchange, walletClient, marketAddress, tokenId, marketId, market } = await setupExchange(config);
    
    const marketAcc = await createMarketAcc(
      walletClient.account!.address,
      config.accountId,
      tokenId,
      marketId
    );
    const interestRate = 1.5;

    const limitOrderParams: PlaceOrderParams = {
      marketAcc,
      marketId,
      side: Side.LONG,
      size: BigInt('1000000000000000000'),
      limitTick: Number(estimateTickForRate(FixedX18.fromNumber(interestRate), BigInt(market.imData.tickStep), true)),
      tif: TimeInForce.GOOD_TIL_CANCELLED,
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
    
    const marketOrderParams: PlaceOrderParams = {
      marketAcc,
      marketId,
      side: Side.LONG,
      size: BigInt('1000000000000000000'),
      tif: TimeInForce.FILL_OR_KILL,
    };

    const marketOrderResult = await exchange.placeOrder(marketOrderParams);
    console.log('Market order result:', marketOrderResult);


    const bulkOrderParams: BulkPlaceOrderParams = 
      {
        marketAcc,
        marketId,
        side: Side.LONG,
        sizes: [BigInt('1000000000000000000'), BigInt('2000000000000000000')],
        limitTicks: [Number(estimateTickForRate(FixedX18.fromNumber(interestRate), BigInt(market.imData.tickStep), true)),
           Number(estimateTickForRate(FixedX18.fromNumber(interestRate), BigInt(market.imData.tickStep), true))],
        tif: TimeInForce.GOOD_TIL_CANCELLED,
      };

    const bulkOrderResult = await exchange.bulkPlaceOrders(bulkOrderParams);
    const {
      executeResponse: bulkOrderExecuteResponse,
      result: {
        orders
      }
    } = bulkOrderResult;
    console.log('Bulk order result:', bulkOrderResult);
    

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
