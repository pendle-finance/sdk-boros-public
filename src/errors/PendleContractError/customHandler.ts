import { createPendlecontractErrorMessageHandler, joinArgs } from './defaultHandler';
import { PendleContractErrorMessageHandler } from './type';

// Create a custom handler that extends the default one
export const customPendleContractErrorMessageHandler: PendleContractErrorMessageHandler =
  createPendlecontractErrorMessageHandler(
    {
      MMInsufficientIM: () => 'not enough margin',
      MarketOrderRateOutOfBound: () => 'rate out of bound',
    },
    // Keep the default fallback for other errors
    (errorName, ...args) => `${errorName}(${joinArgs(args)})`
  );
