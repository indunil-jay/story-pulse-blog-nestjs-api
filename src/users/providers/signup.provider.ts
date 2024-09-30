import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { SignUpDTO } from 'src/auth/DTOs/auth.sign-up.dto';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HashingProvider } from 'src/auth/providers/hashing.provider';

/**
 *  @class SignupProvider for handle the signup logic.
 */

@Injectable()
export class SignupProvider {
  /**
   * @constructor Creates an instance of SignupProvider.
   *
   * @param {Repository<User>} usersRepository - Repository to interact with the User entity in the database.
   * @param {HashingProvider} hashingProvider - Service for hashing passwords.
   */
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    @Inject(forwardRef(() => HashingProvider))
    private readonly hashingProvider: HashingProvider,
  ) {}

  /**
   * Registers a new user by
   *
   * @param {SignUpDTO} signUpDTO - Data Transfer Object containing user registration information.
   * @returns {Promise<User>} - The newly created user.
   *
   * @throws {BadRequestException} If the email already exists in the database.
   * @throws {RequestTimeoutException} If there is an error connecting to the database.
   */
  public async signup(signUpDTO: SignUpDTO): Promise<User> {
    let existingUser: User | undefined = undefined;
    // Check if a user with the provided email already exists
    try {
      existingUser = await this.usersRepository.findOne({
        where: { email: signUpDTO.email },
      });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later.',
        { description: 'error connecting to the database.' },
      );
    }

    // If user already exists, throw a BadRequestException
    if (existingUser) {
      throw new BadRequestException(
        'The email already exists, please check your email.',
      );
    }

    // Hash the user's password and create a new user entity
    let user = this.usersRepository.create({
      ...signUpDTO,
      password: await this.hashingProvider.hashPassword(signUpDTO.password),
    });

    // Save the new user to the database
    try {
      user = await this.usersRepository.save(user);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later.',
        { description: 'error connecting to the database.' },
      );
    }
    return user;
  }
}
