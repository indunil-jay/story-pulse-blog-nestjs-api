import { SignUpDTO } from './DTOs/auth.sign-up.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/users/user.entity';

/**
 * @class AuthController responsible for handling authentication-related api routes.
 */

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  /**
   * @constructor Creates an instance of AuthController.
   *
   * @param {AuthService} authService - The service responsible for authentication operations.
   */

  constructor(private readonly authService: AuthService) {}

  /**
   * Handles user sign-up requests.
   *
   * @param {SignUpDTO} signUpDTO - the DTO for containing user shape for registration
   * @returns {Promise<User> } - the results of the sign-up process
   */
  @ApiOperation({
    summary: 'Register a new user.',
  })
  @ApiBody({
    description: 'user registraion data.',
    type: SignUpDTO,
  })
  @ApiResponse({
    status: 201,
    description: 'User successfully registered.',
  })
  @ApiResponse({
    status: 400,
    description:
      'Bad Request. The input data does not meet validation requirements (e.g., missing required fields or invalid data format).',
  })
  @ApiResponse({
    status: 500,
    description:
      'Internal Server Error. An unexpected error occurred on the server while processing the request.',
  })
  @Post('sign-up')
  public signup(@Body() signUpDTO: SignUpDTO): Promise<User> {
    return this.authService.signup(signUpDTO);
  }
}
