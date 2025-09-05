/**
 * Global HTTP configuration for the SDK
 */
class HttpConfig {
  private _disableKeepAlive: boolean = false;

  /**
   * Set whether to disable HTTP keep-alive connections globally
   * @param disable - true to disable keep-alive, false to enable (default)
   */
  setDisableKeepAlive(disable: boolean): void {
    this._disableKeepAlive = disable;
  }

  /**
   * Get the current keep-alive configuration
   * @returns true if keep-alive is disabled, false if enabled
   */
  isKeepAliveDisabled(): boolean {
    return this._disableKeepAlive;
  }

  /**
   * Get keep-alive value for use in HTTP client configurations
   * @returns false if keep-alive should be disabled, true if enabled
   */
  getKeepAliveValue(): boolean {
    return !this._disableKeepAlive;
  }
}

// Export singleton instance
export const httpConfig = new HttpConfig();

/**
 * Global function to disable HTTP keep-alive for all SDK connections
 * This affects both RPC connections and backend API calls
 * @param disable - true to disable keep-alive, false to enable (default)
 */
export function setDisableKeepAlive(disable: boolean = true): void {
  httpConfig.setDisableKeepAlive(disable);
}

/**
 * Check if keep-alive is currently disabled
 * @returns true if keep-alive is disabled, false if enabled
 */
export function isKeepAliveDisabled(): boolean {
  return httpConfig.isKeepAliveDisabled();
}