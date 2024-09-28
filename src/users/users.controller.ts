import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from './DTOs/create-user.dto';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  /** TODO: */
  @Post()
  public async createUser(@Body() createUserDTO: CreateUserDTO) {
    const user = this.usersRepository.create(createUserDTO);
    return await this.usersRepository.save(user);
  }
}
