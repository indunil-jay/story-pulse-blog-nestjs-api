import { GenerateTokensProvider } from './../providers/generate-tokens.provider';
import { UsersService } from 'src/users/users.service';
import { GoogleTokenDTO } from './DTOs/google-token.dto';
import {
  forwardRef,
  Inject,
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import jwtConfig from '../config/jwt.config';

/**
 * Service for handling Google authentication logic.
 *
 * This service manages the authentication process using Google tokens. It verifies the
 * provided Google token and either retrieves an existing user or creates a new user in
 * the database. It then generates access and refresh tokens for the authenticated user.
 */
@Injectable()
export class GoogleAuthenticationService implements OnModuleInit {
  /** google oAuth client  */
  private oAuthClient: OAuth2Client;

  /**
   * Creates an instance of GoogleAuthenticationService.
   *
   * @param {ConfigType<typeof jwtConfig>} jwtConfiguration - Configuration for JWT, including Google client ID and secret.
   * @param {UsersService} usersService - Service for user management, allowing retrieval and creation of user records.
   * @param {GenerateTokensProvider} generateTokensProvider - Provider for generating access and refresh tokens.
   */
  constructor(
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    private readonly generateTokensProvider: GenerateTokensProvider,
  ) {}

  /**
   * Initializes the Google OAuth client with the client ID and client secret.
   * This method is called when the module is initialized.
   */
  public onModuleInit(): void {
    const clientId = this.jwtConfiguration.googleClientId;
    const clientSecret = this.jwtConfiguration.googleClinetSecret;

    this.oAuthClient = new OAuth2Client(clientId, clientSecret);
  }

  /**
   * Authenticates a user using the provided Google token.
   *
   * @param {GoogleTokenDTO} googleTokenDTO - The DTO containing the Google token to be verified.
   * @returns {Promise<{ accessToken: string; refreshToken: string }>} - Returns the generated access and refresh tokens.
   * @throws {UnauthorizedException} - Throws an exception if the token verification fails or any error occurs during the process.
   */
  public async authentication(
    googleTokenDTO: GoogleTokenDTO,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      //verify the google token sent by user
      const loginTicket = await this.oAuthClient.verifyIdToken({
        idToken: googleTokenDTO.token,
      });

      //extract the payload from google JWT
      const {
        email,
        sub: googleId,
        given_name: firstName,
        family_name: lastName,
      } = loginTicket.getPayload();

      //Find the user in the databse using GoogleID
      const user = await this.usersService.findOneByGoogleId(googleId);

      //if googleID exists g{enerate tokesn
      if (user) {
        return await this.generateTokensProvider.generateTokens(user);
      }

      //if not create new user and then generate the tokens
      const newUser = await this.usersService.createGoogleUser({
        email,
        firstName,
        lastName,
        googleId,
      });
      return await this.generateTokensProvider.generateTokens(newUser);
    } catch (error) {
      // throws unauthorized exeception if any failed.
      throw new UnauthorizedException(error);
    }
  }
}
