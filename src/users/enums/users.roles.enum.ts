/**
 * Enum representing the different user roles within the application.
 * Each role defines the level of access and permissions a user has
 * in the system.
 */
export enum UserRole {
  /**
   * A regular user with basic access rights. Users can perform standard
   * actions within the application but may have restrictions on certain features.
   */
  USER = 'user',

  /**
   * An administrator with elevated privileges. Admins have full access
   * to all features and can manage users, settings, and content within
   * the application.
   */
  ADMIN = 'admin',

  /**
   * A moderator with special permissions to oversee user-generated content.
   * .
   */
  MODERATOR = 'moderator',
}
