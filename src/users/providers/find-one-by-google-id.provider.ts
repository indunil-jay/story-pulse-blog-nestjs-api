import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';

/**
 * Provider responsible for finding a user by their Google ID.
 */
@Injectable()
export class FindOneByGoogleIdProvider {
  /**
   * Creates an instance of FindOneByGoogleIdProvider.
   *
   * @param {Repository<User>} usersRepository - The repository for managing user entities.
   */
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  /**
   * Finds a user in the database by their Google ID.
   *
   * @param {string} googleId - The Google ID of the user to find.
   * @returns {Promise<User>} The found user entity.
   * @throws {NotFoundException} If no user is found with the provided Google ID.
   */
  public async findOneByGoogleId(googleId: string): Promise<User> {
    return await this.usersRepository.findOneBy({ googleId });
  }
}
