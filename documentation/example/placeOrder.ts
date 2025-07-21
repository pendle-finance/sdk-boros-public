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

    const gasBalance = await exchange.getGasBalance();
    console.log('gasBalance', gasBalance);

    const payTreasuryRes = await exchange.payTreasury({
      isCross: true,
      marketId: 2,
      usdAmount: 1,
    });
    console.log(payTreasuryRes);

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


    const bulkOrderResult = await exchange.bulkPlaceOrders({
        marketAcc: '0x1eca053af93a7afaefcd2133a352f422c3c04903000001ffffff',
        marketId: 2,
        orders: {
            "sides": [
                0,
                1
            ],
            sizes: [
              1000000000000000000n,
              2000000000000000000n,
            ],
            limitTicks: [
                69,
                89,
            ],
            tif: TimeInForce.GOOD_TIL_CANCELLED,
        },
        cancels: {
          ids: [],
          isAll: false,
          isStrict: false,
      }
      });
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
