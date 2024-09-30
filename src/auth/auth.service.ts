import { SignInProvider } from './providers/sign-in.provider';
import { SignInDTO } from './DTOs/auth.sign-in.dto';
import { SignUpDTO } from './DTOs/auth.sign-up.dto';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { User } from 'src/users/user.entity';

import { UsersService } from 'src/users/users.service';
/**
 * @class AuthService responsible for handling authentication business-logic.
 */
@Injectable()
export class AuthService {
  /**
   * @constructor Creates an instance of AuthService.
   *
   * @param {UsersService} usersService - The service responsible for user operations, injected using forwardRef to handle circular dependencies.
   * @param {SignInProvider} signInProvider - The provider responsiable for sign-in process.

   */
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    private readonly signInProvider: SignInProvider,
  ) {}

  /**
   * Registers a new user by delegating to UsersService.
   *
   * @param {SignUpDTO} signUpDTO - The data transfer object containing user registration details.
   * @returns {Promise<User>} The result of the user registration.
   */
  public async signup(signUpDTO: SignUpDTO): Promise<User> {
    return await this.usersService.signup(signUpDTO);
  }

  /**
   * Sign a user by delegating to SignInProvider.
   *
   * @param {SignInDTO} signInDTO - The data transfer object containing user sign in details.
   * @returns {Promise<boolean>} The result of the sign in.
   */
  public async signin(signInDTO: SignInDTO): Promise<any> {
    return await this.signInProvider.signin(signInDTO);
  }
}
