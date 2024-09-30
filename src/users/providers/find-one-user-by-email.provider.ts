import {
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';

/**
 *  FindOneUserByEmailProvider for handle the finding a user by email.
 */
@Injectable()
export class FindOneUserByEmailProvider {
  /**
   * Creates an instance of FindOneUserByEmailProvider.
   *
   * @param {Repository<User>} usersRepository - The repository for interacting with the User entity in the database.
   */
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  /**
   * Finds a user by their email address.
   *
   * @param {string} email - The email address of the user to be found.
   * @returns {Promise<User>} - The user entity if found.
   *
   * @throws {RequestTimeoutException} If there is an issue connecting to the database.
   * @throws {UnauthorizedException} If the user with the specified email does not exist.
   */
  public async findOneByEmail(email: string): Promise<User> {
    let user: User | undefined = undefined;

    try {
      user = await this.usersRepository.findOneBy({ email });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later.',
        { description: 'error connecting to the database.' },
      );
    }

    if (!user) {
      throw new UnauthorizedException('User does not exists.');
    }

    return user;
  }
}
