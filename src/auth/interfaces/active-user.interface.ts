/**
 * user interface for currently logged-in user
 */
export interface IActiveUser {
  /**
   *  sub represents the user id.
   */
  sub: number;

  /**
   *  email represent the logged user email.
   */
  email: string;
}
