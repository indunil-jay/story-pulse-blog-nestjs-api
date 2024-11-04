import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { Body, Controller, Post } from '@nestjs/common';

/**
 * The `UsersController` is responsible for handling user-related requests
 * within the application.
 */
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
}
