import { FindOneUserByEmailProvider } from './providers/find-one-user-by-email.provider';
import { SignupProvider } from './providers/signup.provider';
import { SignUpDTO } from './../auth/DTOs/auth.sign-up.dto';
import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

/**
 *  @class UsersService responsible for handling user related business-logic.
 */
@Injectable()
export class UsersService {
  /**
   *  @constructor Creates an instace of UsersService.
   *
   * @param {Repository<User>} usersRepository - The repository for intract with user entity in database.
   * @param {SignupProvider} signupProvider - The provider responsible for handling the user signup logic.
   * @param {FindOneUserByEmailProvider} findOneUserByEmailProvider - he provider responsible for finding a user by email.
   *
   */

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    private readonly signupProvider: SignupProvider,

    private readonly findOneUserByEmailProvider: FindOneUserByEmailProvider,
  ) {}

  /**
   * Registers a new user by delegating to the SignupProvider.
   *
   * @param {SignUpDTO} signUpDTO - The data transfer object containing user registration details.
   * @returns {Promise<User>} The result of the user registration process.
   *
   */

  public signup(signUpDTO: SignUpDTO): Promise<User> {
    return this.signupProvider.signup(signUpDTO);
  }

  /**
   * Finds a user by email, delegating the the FindOneUserByEmailProvider.
   * @param {string} email - the email which use to search user.
   * @returns {Promise<User>} The result of the search.

   */

  public findOneByEmail(email: string): Promise<User> {
    return this.findOneUserByEmailProvider.findOneByEmail(email);
  }

  /** TODO: */
  public async findOneById(id: number) {
    let user: User | undefined = undefined;
    try {
      user = await this.usersRepository.findOneBy({ id });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later.',
        { description: 'error connecting to the database.' },
      );
    }

    if (!user) {
      throw new BadRequestException('The user Id does not exists.');
    }
    return user;
  }

  // create many users TODO:
  // public async createManyUsers(createManyUsersDTO: CreateManyUsersDTO) {
  //   return this.usersCreateManyProvider.createManyUsers(createManyUsersDTO);
  // }
}
