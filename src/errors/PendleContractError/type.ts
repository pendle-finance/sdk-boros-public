// This file is generated via `yarn generateContractErrors`
import { Address } from 'viem';

/**
 * This type is generated from the ABI of Pendle contract Errors.
 *
 * @see https://github.com/pendle-finance/pendle-core-v3/blob/main/contracts/lib/Errors.sol
 */

export type PendleContractErrorMessageHandler = {
  AMMCutOffReached: () => string;
  AMMInsufficientCashIn: () => string;
  AMMInsufficientCashOut: () => string;
  AMMInsufficientLiquidity: () => string;
  AMMInsufficientLpOut: () => string;
  AMMInsufficientSizeOut: () => string;
  AMMInvalidParams: () => string;
  AMMInvalidRateRange: () => string;
  AMMNegativeCash: () => string;
  AMMNotFound: () => string;
  AMMSignMismatch: () => string;
  AMMWithdrawOnly: () => string;
  AuthAgentExpired: () => string;
  AuthExpiryInPast: () => string;
  AuthInvalidConnectionId: () => string;
  AuthInvalidMessage: () => string;
  AuthInvalidNonce: () => string;
  DivFailed: () => string;
  DivWadFailed: () => string;
  ERC20InsufficientAllowance: (spender: Address, allowance: bigint, needed: bigint) => string;
  ERC20InsufficientBalance: (sender: Address, balance: bigint, needed: bigint) => string;
  ERC20InvalidApprover: (approver: Address) => string;
  ERC20InvalidReceiver: (receiver: Address) => string;
  ERC20InvalidSender: (sender: Address) => string;
  ERC20InvalidSpender: (spender: Address) => string;
  FIndexInvalidTime: () => string;
  FIndexNotDueForUpdate: () => string;
  FIndexUpdatedAtMaturity: () => string;
  InvalidFeeRates: () => string;
  InvalidLength: () => string;
  InvalidMaturity: () => string;
  InvalidMinMarginIndexTick: () => string;
  InvalidNumTicks: () => string;
  InvalidObservationWindow: () => string;
  InvalidTokenId: () => string;
  MHMarketExists: () => string;
  MHMarketMismatch: () => string;
  MHMarketNotByFactory: () => string;
  MHMarketNotExists: () => string;
  MHTokenExists: () => string;
  MHTokenLimitExceeded: () => string;
  MHTokenNotExists: () => string;
  MMInsufficientIM: () => string;
  MMIsolatedMarketDenied: () => string;
  MMMarketAlreadyEntered: () => string;
  MMMarketExitDenied: () => string;
  MMMarketLimitExceeded: () => string;
  MMMarketMismatch: () => string;
  MMMarketNotEntered: () => string;
  MMSimulationOnly: () => string;
  MMSubaccountLimitExceeded: () => string;
  MMTokenMismatch: () => string;
  MMTransferDenied: () => string;
  MarketDuplicateOTC: () => string;
  MarketInvalidDeleverage: () => string;
  MarketInvalidFIndexOracle: () => string;
  MarketInvalidLiquidation: () => string;
  MarketLiqNotReduceSize: () => string;
  MarketMatured: () => string;
  MarketMaxOrdersExceeded: () => string;
  MarketOICapExceeded: () => string;
  MarketOrderALOFilled: () => string;
  MarketOrderCancelled: () => string;
  MarketOrderFOKNotFilled: () => string;
  MarketOrderFilled: () => string;
  MarketOrderNotFound: () => string;
  MarketSelfSwap: () => string;
  MarketStopTimeTooFar: () => string;
  MarketZeroSize: () => string;
  MathInvalidExponent: () => string;
  MathOutOfBounds: () => string;
  MulWadFailed: () => string;
  Overflow: () => string;
  SDivWadFailed: () => string;
  SMulWadFailed: () => string;
  TradeALOAMMNotAllowed: () => string;
  TradeOnlyForIsolated: () => string;
  TradeOnlyMainAccount: () => string;
  TradeUndesiredRate: () => string;
  TradeUndesiredSide: () => string;
  Unauthorized: () => string;
};
