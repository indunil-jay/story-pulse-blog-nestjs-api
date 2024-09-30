import { Injectable } from '@nestjs/common';
import { HashingProvider } from './hashing.provider';
import * as bcryptjs from 'bcryptjs';

/**
 * BcryptProvider is an implementation of the HashingProvider abstract class
 */

@Injectable()
export class BcryptProvider implements HashingProvider {
  /**
   * Hashes a plain-text password using bcrypt.
   *
   * @param {string} password - The plain-text password to be hashed.
   * @returns {Promise<string>} - A promise that resolves to the hashed password.
   */
  public async hashPassword(password: string): Promise<string> {
    return await bcryptjs.hash(password, 10);
  }

  /**
   * Compares a plain-text password with a hashed password using bcrypt.
   *
   * @param {string} userPassword - The plain-text password entered by the user.
   * @param {string} dbPassword - The hashed password stored in the database.
   * @returns {Promise<boolean>} - A promise that resolves to true if the passwords match,
   *                               or false if they do not.
   */
  public async comparePassword(
    userPassword: string,
    dbPassword: string,
  ): Promise<boolean> {
    return await bcryptjs.compare(userPassword, dbPassword);
  }
}
