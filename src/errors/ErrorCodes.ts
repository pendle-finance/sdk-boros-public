/**
 * Standardized backend API error codes for Pendle Boros.
 */
export const ErrorCodes = {
  // Validation Errors (400)
  REQUEST_VALIDATION_ERROR: 'REQUEST_VALIDATION_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  INVALID_INPUT: 'INVALID_INPUT',
  INVALID_TIMESTAMP: 'INVALID_TIMESTAMP',
  INVALID_AGENT: 'INVALID_AGENT',
  INVALID_SIGNATURE: 'INVALID_SIGNATURE',
  INVALID_ADDRESS: 'INVALID_ADDRESS',
  INVALID_CHAIN_ID: 'INVALID_CHAIN_ID',
  INVALID_ORDER_REQUEST: 'INVALID_ORDER_REQUEST',
  INVALID_INTERVAL: 'INVALID_INTERVAL',

  // Resource Not Found (404)
  MARKET_NOT_FOUND: 'MARKET_NOT_FOUND',
  ASSET_NOT_FOUND: 'ASSET_NOT_FOUND',
  ORDER_NOT_FOUND: 'ORDER_NOT_FOUND',
  POSITION_NOT_FOUND: 'POSITION_NOT_FOUND',
  USER_NOT_FOUND: 'USER_NOT_FOUND',
  UNDERLYING_APR_NOT_FOUND: 'UNDERLYING_APR_NOT_FOUND',
  ORDER_BOOKS_NOT_FOUND: 'ORDER_BOOKS_NOT_FOUND',
  AMM_NOT_FOUND: 'AMM_NOT_FOUND',
  REFERRAL_CODE_NOT_FOUND: 'REFERRAL_CODE_NOT_FOUND',
  LEADERBOARD_NOT_FOUND: 'LEADERBOARD_NOT_FOUND',
  MERKLE_NOT_FOUND: 'MERKLE_NOT_FOUND',
  MOON_PHASE_NOT_FOUND: 'MOON_PHASE_NOT_FOUND',
  DEPOSIT_BOX_INTENT_NOT_FOUND: 'DEPOSIT_BOX_INTENT_NOT_FOUND',

  // Business Logic Errors (400/422)
  INSUFFICIENT_BALANCE: 'INSUFFICIENT_BALANCE',
  INSUFFICIENT_MARGIN: 'INSUFFICIENT_MARGIN',
  MARKET_EXPIRED: 'MARKET_EXPIRED',
  MARKET_PAUSED: 'MARKET_PAUSED',
  SLIPPAGE_EXCEEDED: 'SLIPPAGE_EXCEEDED',
  ORDER_ALREADY_FILLED: 'ORDER_ALREADY_FILLED',
  ORDER_CANCELLED: 'ORDER_CANCELLED',
  POSITION_CLOSED: 'POSITION_CLOSED',
  LEVERAGE_EXCEEDS_MAX: 'LEVERAGE_EXCEEDS_MAX',
  INITIAL_MARGIN_EXCEEDS_BALANCE: 'INITIAL_MARGIN_EXCEEDS_BALANCE',
  VALUE_TOO_SMALL: 'VALUE_TOO_SMALL',
  BULK_ORDERS_EMPTY: 'BULK_ORDERS_EMPTY',
  TIME_RANGE_TOO_LONG: 'TIME_RANGE_TOO_LONG',

  // Deposit Box Errors (400)
  MINIMUM_DEPOSIT_NOT_MET: 'MINIMUM_DEPOSIT_NOT_MET',
  DEPOSIT_LESS_THAN_TREASURY: 'DEPOSIT_LESS_THAN_TREASURY',
  TOKEN_NOT_SUPPORTED: 'TOKEN_NOT_SUPPORTED',
  DEPOSIT_BOX_ID_IN_USE: 'DEPOSIT_BOX_ID_IN_USE',
  DEPOSIT_BOX_INTENT_EXISTS: 'DEPOSIT_BOX_INTENT_EXISTS',
  DEPOSIT_BOX_INTENT_INVALID_STATUS: 'DEPOSIT_BOX_INTENT_INVALID_STATUS',
  ESTIMATED_DURATION_TOO_LONG: 'ESTIMATED_DURATION_TOO_LONG',
  MISSING_EXT_ROUTER: 'MISSING_EXT_ROUTER',
  MISSING_EXT_CALLDATA: 'MISSING_EXT_CALLDATA',

  // Referral Errors (400)
  USER_NOT_WHITELISTED: 'USER_NOT_WHITELISTED',
  REFERRAL_CODE_EXISTS: 'REFERRAL_CODE_EXISTS',
  USER_ALREADY_HAS_REFERRAL_CODE: 'USER_ALREADY_HAS_REFERRAL_CODE',
  USER_ALREADY_JOINED_REFERRAL: 'USER_ALREADY_JOINED_REFERRAL',
  CANNOT_JOIN_OWN_REFERRAL: 'CANNOT_JOIN_OWN_REFERRAL',
  ELIGIBILITY_REQUIREMENT_NOT_MET: 'ELIGIBILITY_REQUIREMENT_NOT_MET',

  // Authorization Errors (401/403)
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  AGENT_EXPIRED: 'AGENT_EXPIRED',
  INVALID_API_KEY: 'INVALID_API_KEY',

  // OTC Errors (400/403)
  USER_NOT_VIP: 'USER_NOT_VIP',
  OTC_SHEET_WRITE_FAILED: 'OTC_SHEET_WRITE_FAILED',

  // Server Errors (500)
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  DATABASE_ERROR: 'DATABASE_ERROR',
  EXTERNAL_SERVICE_ERROR: 'EXTERNAL_SERVICE_ERROR',
  BLOCKCHAIN_RPC_ERROR: 'BLOCKCHAIN_RPC_ERROR',
  HISTORICAL_PRICE_FETCH_FAILED: 'HISTORICAL_PRICE_FETCH_FAILED',
  DATA_INCONSISTENCY: 'DATA_INCONSISTENCY',

  // Generic Error
  HTTP_EXCEPTION: 'HTTP_EXCEPTION',

  // Contract Errors (from smart contracts)
  // AMM Errors
  AMMCutOffReached: 'AMMCutOffReached',
  AMMInsufficientCashIn: 'AMMInsufficientCashIn',
  AMMInsufficientCashOut: 'AMMInsufficientCashOut',
  AMMInsufficientLiquidity: 'AMMInsufficientLiquidity',
  AMMInsufficientLpOut: 'AMMInsufficientLpOut',
  AMMInsufficientSizeOut: 'AMMInsufficientSizeOut',
  AMMInvalidParams: 'AMMInvalidParams',
  AMMInvalidRateRange: 'AMMInvalidRateRange',
  AMMNegativeCash: 'AMMNegativeCash',
  AMMNotFound: 'AMMNotFound',
  AMMSignMismatch: 'AMMSignMismatch',
  AMMTotalSupplyCapExceeded: 'AMMTotalSupplyCapExceeded',
  AMMWithdrawOnly: 'AMMWithdrawOnly',

  // Auth Errors
  AuthAgentExpired: 'AuthAgentExpired',
  AuthExpiryInPast: 'AuthExpiryInPast',
  AuthInvalidConnectionId: 'AuthInvalidConnectionId',
  AuthInvalidMessage: 'AuthInvalidMessage',
  AuthInvalidNonce: 'AuthInvalidNonce',
  AuthSelectorNotAllowed: 'AuthSelectorNotAllowed',

  // Token Errors
  BOROS20NotEnoughBalance: 'BOROS20NotEnoughBalance',

  // CLO Errors
  CLOInvalidThreshold: 'CLOInvalidThreshold',
  CLOMarketInvalidStatus: 'CLOMarketInvalidStatus',
  CLOThresholdNotMet: 'CLOThresholdNotMet',

  // Deleverager Errors
  DeleveragerAMMNotAllowed: 'DeleveragerAMMNotAllowed',
  DeleveragerDuplicateMarketId: 'DeleveragerDuplicateMarketId',
  DeleveragerHealthNonRisky: 'DeleveragerHealthNonRisky',
  DeleveragerIncomplete: 'DeleveragerIncomplete',
  DeleveragerLoserHealthier: 'DeleveragerLoserHealthier',
  DeleveragerLoserInBadDebt: 'DeleveragerLoserInBadDebt',
  DeleveragerWinnerInBadDebt: 'DeleveragerWinnerInBadDebt',

  // Math Errors
  DivFailed: 'DivFailed',
  DivWadFailed: 'DivWadFailed',
  MulWadFailed: 'MulWadFailed',
  SDivWadFailed: 'SDivWadFailed',
  SMulWadFailed: 'SMulWadFailed',
  MathInvalidExponent: 'MathInvalidExponent',
  MathOutOfBounds: 'MathOutOfBounds',
  Overflow: 'Overflow',

  // ERC20 Errors
  ERC20InsufficientAllowance: 'ERC20InsufficientAllowance',
  ERC20InsufficientBalance: 'ERC20InsufficientBalance',
  ERC20InvalidApprover: 'ERC20InvalidApprover',
  ERC20InvalidReceiver: 'ERC20InvalidReceiver',
  ERC20InvalidSender: 'ERC20InvalidSender',
  ERC20InvalidSpender: 'ERC20InvalidSpender',

  // FIndex Errors
  FIndexInvalidTime: 'FIndexInvalidTime',
  FIndexNotDueForUpdate: 'FIndexNotDueForUpdate',
  FIndexUpdatedAtMaturity: 'FIndexUpdatedAtMaturity',

  // General Errors
  FailedCall: 'FailedCall',
  InsufficientProfit: 'InsufficientProfit',
  InvalidAMMAcc: 'InvalidAMMAcc',
  InvalidAMMId: 'InvalidAMMId',
  InvalidFeeRates: 'InvalidFeeRates',
  InvalidLength: 'InvalidLength',
  InvalidMaturity: 'InvalidMaturity',
  InvalidNumTicks: 'InvalidNumTicks',
  InvalidObservationWindow: 'InvalidObservationWindow',
  InvalidTokenId: 'InvalidTokenId',
  LiquidationAMMNotAllowed: 'LiquidationAMMNotAllowed',
  ProfitMismatch: 'ProfitMismatch',
  SimulationOnly: 'SimulationOnly',
  Unauthorized: 'Unauthorized',

  // MarketHub (MH) Errors
  MHInvalidLiquidator: 'MHInvalidLiquidator',
  MHMarketExists: 'MHMarketExists',
  MHMarketNotByFactory: 'MHMarketNotByFactory',
  MHMarketNotExists: 'MHMarketNotExists',
  MHTokenExists: 'MHTokenExists',
  MHTokenLimitExceeded: 'MHTokenLimitExceeded',
  MHTokenNotExists: 'MHTokenNotExists',
  MHWithdrawNotReady: 'MHWithdrawNotReady',

  // MarginManager (MM) Errors
  MMHealthCritical: 'MMHealthCritical',
  MMHealthNonRisky: 'MMHealthNonRisky',
  MMInsufficientIM: 'MMInsufficientIM',
  MMInsufficientMinCash: 'MMInsufficientMinCash',
  MMInvalidCritHR: 'MMInvalidCritHR',
  MMIsolatedMarketDenied: 'MMIsolatedMarketDenied',
  MMMarketAlreadyEntered: 'MMMarketAlreadyEntered',
  MMMarketExitDenied: 'MMMarketExitDenied',
  MMMarketLimitExceeded: 'MMMarketLimitExceeded',
  MMMarketMismatch: 'MMMarketMismatch',
  MMMarketNotEntered: 'MMMarketNotEntered',
  MMSimulationOnly: 'MMSimulationOnly',
  MMTokenMismatch: 'MMTokenMismatch',
  MMTransferDenied: 'MMTransferDenied',

  // Market Errors
  MarketCLO: 'MarketCLO',
  MarketDuplicateOTC: 'MarketDuplicateOTC',
  MarketInvalidDeleverage: 'MarketInvalidDeleverage',
  MarketInvalidFIndexOracle: 'MarketInvalidFIndexOracle',
  MarketInvalidLiquidation: 'MarketInvalidLiquidation',
  MarketLastTradedRateTooFar: 'MarketLastTradedRateTooFar',
  MarketLiqNotReduceSize: 'MarketLiqNotReduceSize',
  MarketMatured: 'MarketMatured',
  MarketMaxOrdersExceeded: 'MarketMaxOrdersExceeded',
  MarketOICapExceeded: 'MarketOICapExceeded',
  MarketOrderALOFilled: 'MarketOrderALOFilled',
  MarketOrderCancelled: 'MarketOrderCancelled',
  MarketOrderFOKNotFilled: 'MarketOrderFOKNotFilled',
  MarketOrderFilled: 'MarketOrderFilled',
  MarketOrderNotFound: 'MarketOrderNotFound',
  MarketOrderRateOutOfBound: 'MarketOrderRateOutOfBound',
  MarketPaused: 'MarketPaused',
  MarketSelfSwap: 'MarketSelfSwap',
  MarketZeroSize: 'MarketZeroSize',

  // OrderCanceller Errors
  OrderCancellerDuplicateMarketId: 'OrderCancellerDuplicateMarketId',
  OrderCancellerDuplicateOrderId: 'OrderCancellerDuplicateOrderId',
  OrderCancellerInvalidOrder: 'OrderCancellerInvalidOrder',
  OrderCancellerNotRisky: 'OrderCancellerNotRisky',

  // Pauser Errors
  PauserNotRisky: 'PauserNotRisky',
  PauserTokenMismatch: 'PauserTokenMismatch',

  // Trade Errors
  TradeALOAMMNotAllowed: 'TradeALOAMMNotAllowed',
  TradeAMMAlreadySet: 'TradeAMMAlreadySet',
  TradeMarketIdMismatch: 'TradeMarketIdMismatch',
  TradeOnlyAMMAccount: 'TradeOnlyAMMAccount',
  TradeOnlyForIsolated: 'TradeOnlyForIsolated',
  TradeOnlyMainAccount: 'TradeOnlyMainAccount',
  TradeUndesiredRate: 'TradeUndesiredRate',
  TradeUndesiredSide: 'TradeUndesiredSide',

  // WithdrawalPolice Errors
  WithdrawalPoliceAlreadyRestricted: 'WithdrawalPoliceAlreadyRestricted',
  WithdrawalPoliceInvalidCooldown: 'WithdrawalPoliceInvalidCooldown',
  WithdrawalPoliceInvalidThreshold: 'WithdrawalPoliceInvalidThreshold',
  WithdrawalPoliceUnsatCondition: 'WithdrawalPoliceUnsatCondition',

  // Zone Errors
  ZoneGlobalCooldownAlreadyIncreased: 'ZoneGlobalCooldownAlreadyIncreased',
  ZoneInvalidGlobalCooldown: 'ZoneInvalidGlobalCooldown',
  ZoneInvalidLiqSettings: 'ZoneInvalidLiqSettings',
  ZoneInvalidRateDeviationConfig: 'ZoneInvalidRateDeviationConfig',
  ZoneMarketInvalidStatus: 'ZoneMarketInvalidStatus',
} as const;

export type ErrorCode = (typeof ErrorCodes)[keyof typeof ErrorCodes];
