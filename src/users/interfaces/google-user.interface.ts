/**
 *  This interface defines the structure for user data obtained from Google authentication.
 */
export interface IGoogleUser {
  /**
   * email of google signed user
   */
  email: string;

  /**
   * firstName of google signed user
   */
  firstName: string;

  /**
   * lastName of google signed user
   */
  lastName: string;

  /**
   * googleId of google signed user
   */
  googleId: string;
}
