import { Auth } from '../decorators/auth.decorator';
import { AuthType } from '../enums/auth-type';
import { GoogleTokenDTO } from './DTOs/google-token.dto';
import { GoogleAuthenticationService } from './google-authentication.service';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

/**
 * This controller manages Google authentication by processing the Google token
 * sent from the client and delegating the authentication logic to the service.
 */
@ApiTags('Authentication')
@Auth(AuthType.None)
@Controller('auth/google-authentication')
export class GoogleAuthenticationController {
  /**
   * @param {GoogleAuthenticationService} googleAuthenticationService - Injecting `GoogleAuthenticationService` for google authentication.
   */
  constructor(
    private readonly googleAuthenticationService: GoogleAuthenticationService,
  ) {}

  /**
   * Handles Google authentication
   *
   * @param {GoogleTokenDTO} googleTokenDTO - The DTO containing the Google token.
   * @returns {Promise<any>} - The result of the authentication process.
   */
  @ApiResponse({
    status: 200,
    description: 'Authentication successful',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized, invalid token',
  })
  @Post()
  public async authenticate(
    @Body() googleTokenDTO: GoogleTokenDTO,
  ): Promise<any> {
    return this.googleAuthenticationService.authentication(googleTokenDTO);
  }
}
