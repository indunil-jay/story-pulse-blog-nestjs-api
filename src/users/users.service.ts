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
import { UsersCreateManyProvider } from './providers/users.create-many.provider';
import { CreateManyUsersDTO } from './DTOs/create-many-user.dto';

/**
 *
 */
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    private readonly usersCreateManyProvider: UsersCreateManyProvider,

    private readonly signupProvider: SignupProvider,
  ) {}

  /**
   * Registers a new user by delegating to the SignupProvider.
   *
   * @param {SignUpDTO} signUpDTO - The data transfer object containing user registration details.
   * @returns {Promise<any>} The result of the user registration process.
   *
   */

  public signup(signUpDTO: SignUpDTO): Promise<User> {
    return this.signupProvider.signup(signUpDTO);
  }

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

  // create many users
  public async createManyUsers(createManyUsersDTO: CreateManyUsersDTO) {
    return this.usersCreateManyProvider.createManyUsers(createManyUsersDTO);
  }
}
