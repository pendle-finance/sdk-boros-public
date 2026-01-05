export type PendleSdkErrorParams = {
  cause?: unknown;
};

/**
 * Pendle SDK Error base class to be extended by all errors.
 *
 * @remarks
 * We use this class for later error handling and wrapping.
 *
 * By wrapping all the errors throw by Ethers.js with this class, we can show
 * user-friendly error messages to users.
 */
export class PendleSdkError extends Error {
  /**
   * @remarks
   * Below ES2022, Error has no `cause`.
   * Adding it here as fallback so it is still accessible.
   */
  override cause?: unknown;

  constructor(message: string, params?: PendleSdkErrorParams) {
    super(message, params);

    const cause = params?.cause;
    if (!this.cause && cause) this.cause = cause;

    // Set the prototype explicitly.
    // See: https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    Object.setPrototypeOf(this, this.constructor.prototype);
  }
}
