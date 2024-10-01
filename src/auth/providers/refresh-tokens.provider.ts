import { UsersService } from 'src/users/users.service';
import { GenerateTokensProvider } from './generate-tokens.provider';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenDTO } from './../DTOs/auth.refresh-token.dto';
import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { IActiveUser } from '../interfaces/active-user.interface';

/**
 * The `RefreshTokensProvider` class provides functionality for refreshing JWT tokens.
 * It verifies the provided refresh token and generates new access and refresh tokens
 * for authenticated users.
 */
@Injectable()
export class RefreshTokensProvider {
  /**
   *
   * Initializes the `RefreshTokensProvider` class and injects the necessary services and configurations.
   *
   * @param {JwtService} jwtService - The `JwtService` instance used for verifying JWT tokens.
   * @param {ConfigType<typeof jwtConfig>} jwtConfiguration - Configuration options for JWT, such as
   * secret key, audience, and issuer. These settings are used during token verification.
   * @param {GenerateTokensProvider} generateTokensProvider - A provider that handles the generation of
   * access and refresh tokens for users.
   * @param {UsersService} usersService - A service that provides access to user-related operations,
   * allowing for the retrieval of user information based on the user ID extracted from the refresh token.
   *
   */
  constructor(
    private readonly jwtService: JwtService,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

    private readonly generateTokensProvider: GenerateTokensProvider,

    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  /**
   * Refreshes the JWT tokens for a user by verifying the provided refresh token,
   * fetching the user from the database, and generating new access and refresh tokens.
   *
   * @param {RefreshTokenDTO} refreshTokenDTO - The data transfer object containing the refresh token to be verified.
   * @returns {Promise<{ accessToken: string; refreshToken: string }>} - A promise that resolves
   * to an object containing the newly generated access and refresh tokens.
   * @throws {UnauthorizedException} - Throws an exception if the refresh token is invalid or expired.
   */
  public async refreshTokens(refreshTokenDTO: RefreshTokenDTO): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    try {
      // Verify the refresh token (valid and not expired)
      const { sub } = await this.jwtService.verifyAsync<
        Pick<IActiveUser, 'sub'>
      >(refreshTokenDTO.refreshToken, {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
      });

      // Fetch the user from the database
      const user = await this.usersService.findOneById(sub);

      // Generate new token set
      return await this.generateTokensProvider.generateTokens(user);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
