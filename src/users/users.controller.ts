import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { Body, Controller, Post } from '@nestjs/common';
// import { CreateManyUsersDTO } from './DTOs/create-many-user.dto';

/**
 * The `UsersController` is responsible for handling user-related requests
 * within the application.
 */
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Endpoint to create multiple users.
   * This method is currently commented out and can be used to
   * handle requests to create multiple users at once.
   *
   * @param createManyUsersDTO - Data transfer object containing
   * the necessary information to create multiple users.
   * @returns A response indicating the result of the operation.
   */
  // @Post('create-many')
  // public createManyUsers(@Body() createManyUsersDTO: CreateManyUsersDTO) {
  //   return this.usersService.createManyUsers(createManyUsersDTO);
  // }
}
