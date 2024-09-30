import { Injectable } from '@nestjs/common';

/**
 *  @abstract class for hashing provider this class define a contract for password hashing and comparison.
 */

@Injectable()
export abstract class HashingProvider {
  /**
   * Hashes a plain-text password.
   *
   * @param {string} password - The plain-text password to be hashed.
   * @returns {Promise<string>} - A promise that resolves to the hashed password.
   */
  abstract hashPassword(password: string): Promise<string>;

  /**
   * Compares a plain-text password with a hashed password in DB.
   *
   * @param {string} userPassword - The plain-text password entered by the user.
   * @param {string} dbPassword - The hashed password stored in the database.
   * @returns {Promise<boolean>} - A promise that resolves to true if the passwords match,
   *                               or false if they do not.
   */
  abstract comparePassword(
    userPassword: string,
    dbPassword: string,
  ): Promise<boolean>;
}
