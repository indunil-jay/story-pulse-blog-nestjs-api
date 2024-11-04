import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { User } from 'src/users/user.entity';
import { IActiveUser } from '../interfaces/active-user.interface';
import { v4 as uuidv4 } from 'uuid';
/**
 * The `GenerateTokensProvider` is responsible for generating JWT access and refresh tokens
 * for authenticated users. It uses the configured JWT settings to ensure secure token generation.
 *
 */
@Injectable()
export class GenerateTokensProvider {
  /**
   * Initializes the `GenerateTokensProvider` class and injects the necessary services and configuration.
   *
   * @param {JwtService} jwtService - The `JwtService` from `@nestjs/jwt` is used to sign and verify JWT tokens.
   * @param {ConfigType<typeof jwtConfig>} jwtConfiguration - The JWT configuration options that are defined
   * in the application's configuration.
   *
   */
  constructor(
    private readonly jwtService: JwtService,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  /**
   * Signs a JWT token for a given user ID, attaching any optional payload data.
   *
   * @template T - Type of additional payload data.
   * @param {number} userId - The ID of the user for whom the token is being generated.
   * @param {number} expiresIn - The duration (in seconds) for which the token is valid.
   * @param {T} [payload] - Optional additional payload to include in the token.
   *
   * @returns {Promise<string>} - A signed JWT token as a string.
   *
   */
  public async signToken<T>(
    userId: number,
    expiresIn: number,
    payload?: T,
  ): Promise<string> {
    return await this.jwtService.signAsync(
      {
        sub: userId,
        ...payload,
      },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn: expiresIn,
      },
    );
  }

  /**
   * Generates both access and refresh tokens for the provided user.
   *
   * The access token is used for immediate authentication while the refresh token allows
   * reissuing a new access token without requiring the user to log in again.
   *
   * @param {User} user - The user entity for whom the tokens are being generated.
   *
   * @returns {Promise<{ accessToken: string, refreshToken: string }>}
   * - An object containing the generated access and refresh tokens.
   *
   */
  public async generateTokens(
    user: User,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const [accessToken, refreshToken] = await Promise.all([
      // Generate the access token
      this.signToken<Partial<IActiveUser>>(
        user.id,
        this.jwtConfiguration.accessTokenTTL,
        {
          email: user.email,
        },
      ),
      // Generate the refresh token
      this.signToken(user.id, this.jwtConfiguration.refreshTokenTTL),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  public generateResetToken() {
    return uuidv4();
  }
}
