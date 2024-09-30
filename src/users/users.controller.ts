import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
// import { CreateUserDTO } from './DTOs/create-user.dto';
import { UsersService } from './users.service';
import { error } from 'console';
import { CreateManyUsersDTO } from './DTOs/create-many-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /** TODO: */
  // @Post()
  // public createUser(@Body() createUserDTO: CreateUserDTO) {
  //   return this.usersService.createUser(createUserDTO);
  // }

  /** TODO: */
  @Post('create-many')
  public createManyUsers(@Body() createManyUsersDTO: CreateManyUsersDTO) {
    return this.usersService.createManyUsers(createManyUsersDTO);
  }
}
