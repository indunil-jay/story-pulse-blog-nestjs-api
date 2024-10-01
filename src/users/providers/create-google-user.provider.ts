import { InjectRepository } from '@nestjs/typeorm';
import { ConflictException, Injectable } from '@nestjs/common';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { IGoogleUser } from '../interfaces/google-user.interface';

/**
 * Provider responsible for creating a new user from Google authentication data.
 */
@Injectable()
export class CreateGoogleUserProvider {
  /**
   * Creates an instance of CreateGoogleUserProvider.
   *
   * @param {Repository<User>} usersRepository - The repository for managing user entities.
   */
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  /**
   * Creates a new user in the database based on the provided Google user data.
   *
   * @param {IGoogleUser} googleUser - The Google user data to create a new user.
   * @returns {Promise<User>} The created user entity.
   * @throws {ConflictException} If user creation fails due to conflicts.
   */
  public async createGoogleUser(googleUser: IGoogleUser): Promise<User> {
    try {
      const user = this.usersRepository.create(googleUser);
      return await this.usersRepository.save(user);
    } catch (error) {
      throw new ConflictException(error, {
        description: 'could not create a new user.',
      });
    }
  }
}
