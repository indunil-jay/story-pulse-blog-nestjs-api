import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { Body, Controller, Post } from '@nestjs/common';
// import { CreateManyUsersDTO } from './DTOs/create-many-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Post('create-many')
  // public createManyUsers(@Body() createManyUsersDTO: CreateManyUsersDTO) {
  //   return this.usersService.createManyUsers(createManyUsersDTO);
  // }
}
