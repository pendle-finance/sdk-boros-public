import { createPendlecontractErrorMessageHandler } from './defaultHandler';
import { PendleContractErrorParams, PendleContractErrorType } from './helperTypes';
import { PendleContractErrorMessageHandler } from './type';

// Create a custom handler that extends the default one
export const customPendleContractErrorMessageHandler: PendleContractErrorMessageHandler =
  createPendlecontractErrorMessageHandler(
    {
      MMInsufficientIM: () => 'not enough margin',
    },
    // Keep the default fallback for other errors
    (errorName, ...args) => `${errorName}(${args.join(', ')})`
  );
