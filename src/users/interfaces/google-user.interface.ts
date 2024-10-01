/**
 *  This interface defines the structure for user data obtained from Google authentication.
 */

export interface IGoogleUser {
  email: string;
  firstName: string;
  lastName: string;
  googleId: string;
}
