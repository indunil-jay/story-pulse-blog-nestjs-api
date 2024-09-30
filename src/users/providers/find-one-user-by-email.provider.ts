import {
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FindOneUserByEmailProvider {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

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
