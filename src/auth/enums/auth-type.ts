/**
 * The `AuthType` enum defines the types of authentication mechanisms
 * that can be used in the application.
 *
 */
export enum AuthType {
  /**
   * Bearer authentication token, usually in the format `Bearer <token>`.
   * This is the default authentication type in most cases.
   */
  Bearer,

  /**
   * No authentication required. This is used for public endpoints that
   * do not need any authentication checks.
   */
  None,
}
