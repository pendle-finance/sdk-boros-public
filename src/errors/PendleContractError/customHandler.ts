import { createPendlecontractErrorMessageHandler, joinArgs } from './defaultHandler';
import { PendleContractErrorMessageHandler } from './type';

// Create a custom handler that extends the default one
export const customPendleContractErrorMessageHandler: PendleContractErrorMessageHandler =
  createPendlecontractErrorMessageHandler(
    {
      MarketSelfSwap: () => 'Self swapping error',
      MarketOrderFOKNotFilled: () => 'Insufficient liquidity',
      MMInsufficientIM: () => 'Not enough margin',
      MarketOICapExceeded: () => 'Exceeded OI Cap',
      MarketMaxOrdersExceeded: () => 'Exceeded max orders',
      TradeUndesiredRate: () => 'Slippage too high',
    },
    // Keep the default fallback for other errors
    (errorName, ...args) => `${errorName}(${joinArgs(args)})`
  );
