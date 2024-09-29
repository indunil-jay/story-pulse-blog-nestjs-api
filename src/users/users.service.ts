import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from './DTOs/create-user.dto';
import { UsersCreateManyProvider } from './providers/users.create-many.provider';
import { CreateManyUsersDTO } from './DTOs/create-many-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    private readonly usersCreateManyProvider: UsersCreateManyProvider,
  ) {}

  /**TODO: */
  public async createUser(createUserDTO: CreateUserDTO) {
    let existingUser: User | undefined = undefined;

    try {
      existingUser = await this.usersRepository.findOne({
        where: { email: createUserDTO.email },
      });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later.',
        { description: 'error connecting to the database.' },
      );
    }

    if (existingUser) {
      throw new BadRequestException(
        'The email already exists, please check your email.',
      );
    }

    let user = this.usersRepository.create(createUserDTO);

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

  /**TODO: */

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
