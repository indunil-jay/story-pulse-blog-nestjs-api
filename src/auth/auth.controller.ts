import { SignUpDTO } from './DTOs/auth.sign-up.dto';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/users/user.entity';
import { SignInDTO } from './DTOs/auth.sign-in.dto';

/**
 *  AuthController responsible for handling authentication-related api routes.
 */

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  /**
   *  Creates an instance of AuthController.
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
  public async signup(@Body() signUpDTO: SignUpDTO): Promise<User> {
    return this.authService.signup(signUpDTO);
  }

  /**
   * Handles user sign-in requests.
   *
   * @param {SignInDTO} signInDTO - the DTO for containing user shape for registration
   * @returns {Promise<Boolean> } - the results of the sign-up process
   */

  @ApiOperation({
    summary: 'sign a registed user.',
  })
  @ApiBody({
    description: 'sign a user data.',
    type: SignInDTO,
  })
  @ApiResponse({
    status: 200,
    description: 'User sig-in successfully.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Incorrect credentials',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid input',
  })
  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  public async signin(@Body() signInDTO: SignInDTO): Promise<boolean> {
    return this.authService.signin(signInDTO);
  }
}
