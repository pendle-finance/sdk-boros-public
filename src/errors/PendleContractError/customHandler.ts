import { createPendlecontractErrorMessageHandler, joinArgs } from './defaultHandler';
import { PendleContractErrorMessageHandler } from './type';

// Create a custom handler that extends the default one
export const customPendleContractErrorMessageHandler: PendleContractErrorMessageHandler =
  createPendlecontractErrorMessageHandler(
    {
      AMMCutOffReached: () => 'Deposits Closed (Market Maturing)',
      AMMInsufficientCashOut: () => 'Slippage Too High',
      AMMInsufficientLpOut: () => 'Slippage Too High',
      AMMInsufficientSizeOut: () => 'Slippage Too High',
      AMMTotalSupplyCapExceeded: () => 'Vault Cap Hit',
      MMInsufficientIM: () => 'Not enough margin',
      MarketLastTradedRateTooFar: () => 'Large Rate Deviation',
      MarketMaxOrdersExceeded: () => 'Exceeded max orders',
      MarketOICapExceeded: () => 'Exceeded OI Cap',
      MarketOrderFOKNotFilled: () => 'Insufficient liquidity',
      MarketOrderRateOutOfBound: () => 'Rate Too Far Off',
      MarketSelfSwap: () => 'Self swapping error',
      TradeUndesiredRate: () => 'Slippage too high',
      MMInsufficientMinCash: () => 'Top up at least ~$10 to trade',
    },
    // Keep the default fallback for other errors
    (errorName, ...args) => `${errorName}(${joinArgs(args)})`
  );
