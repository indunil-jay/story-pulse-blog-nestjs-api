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
   */
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  /**
   * Registers a new user by delegating to UsersService.
   *
   * @param {SignUpDTO} signUpDTO - The data transfer object containing user registration details.
   * @returns {Promise<User>} The result of the user registration.
   */
  public signup(signUpDTO: SignUpDTO): Promise<User> {
    return this.usersService.signup(signUpDTO);
  }
}
