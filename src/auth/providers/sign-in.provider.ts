import { HashingProvider } from 'src/auth/providers/hashing.provider';
import {
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDTO } from '../DTOs/auth.sign-in.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import jwtConfig from '../config/jwt.config';

/**
 *  SigninProvider user to handle the  user sign in business-logic.
 */
@Injectable()
export class SignInProvider {
  /**
   * Creates an instace of SignInProvider.
   *
   * @param {UsersService} usersService - Service to manage user operations.
   * @param {HashingProvider} hashingProvider - Provider for password hashing and comparison.
   * @param {JwtService} jwtService - Serivce to handle JSON web token.
   * @param {ConfigType<typeof jwtConfig>} jwtConfiguration -  Configuration for JWT related env
   */
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    private readonly hashingProvider: HashingProvider,

    private readonly jwtService: JwtService,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  /**
   * Sign in a user
   *
   * @param {SignInDTO} signInDTO - Data transfer object containing sign-in credentials.
   * @returns {Promise<any>} - A promise that resolves to an object containing the access token.
   * @throws {RequestTimeoutException} - Throws if there is an issue comparing passwords.
   * @throws {UnauthorizedException} - Throws if the password is incorrect.
   */
  public async signin(signInDTO: SignInDTO): Promise<any> {
    // Retrieve user by email from the user service
    let user = await this.usersService.findOneByEmail(signInDTO.email);

    let isEqual: boolean = false;

    try {
      // Compare the provided password with the stored hashed password
      isEqual = await this.hashingProvider.comparePassword(
        signInDTO.password,
        user.password,
      );
    } catch (error) {
      // Handle any errors that occur during password comparison
      throw new RequestTimeoutException(error, {
        description: 'Could not compare passwords',
      });
    }
    // If passwords do not match, throw an unauthorized exception
    if (!isEqual) {
      throw new UnauthorizedException('Incorrect Password.');
    }

    // Generate a JSON Web Token for the authenticated user
    const accessToken = await this.jwtService.signAsync(
      {
        sub: user.id,
        email: user.email,
      },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn: this.jwtConfiguration.accessTokenTTL,
      },
    );

    return {
      accessToken,
    };
  }
}
