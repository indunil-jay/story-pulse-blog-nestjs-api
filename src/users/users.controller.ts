import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /** TODO: */
  // @Post('create-many')
  // public createManyUsers(@Body() createManyUsersDTO: CreateManyUsersDTO) {
  //   return this.usersService.createManyUsers(createManyUsersDTO);
  // }
}
