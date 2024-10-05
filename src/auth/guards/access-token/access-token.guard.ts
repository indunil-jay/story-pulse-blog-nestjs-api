import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import jwtConfig from 'src/auth/config/jwt.config';
import { REQUEST_USER_KEY } from 'src/auth/constants/auth.constants';

/**
 *  A guard that checks if the incoming request has a valid JWT token in its headers. If valid, it attaches the user payload to the request object.
 */
@Injectable()
export class AccessTokenGuard implements CanActivate {
  /**
   *
   * Creates an instance of `AccessTokenGuard`.
   * @param {JwtService} jwtService - The service used to verify and decode JWT tokens.
   * @param {ConfigType<typeof jwtConfig>} jwtConfiguration - The configuration for the JWT service.
   */
  constructor(
    private readonly jwtService: JwtService,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  /**
   * Method to determine whether the route is accessible by verifying the JWT token.
   * If the token is valid, it attaches the user payload to the request.
   *
   * @param {ExecutionContext} context - The execution context from which the request object is extracted.
   * @returns {Promise<boolean>} A promise that resolves to `true` if the token is valid, or throws an `UnauthorizedException`.
   *
   * @throws {UnauthorizedException} If the token is missing, expired, or invalid.
   *
   */
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    //1. Extract the request from the execution context
    const request = context.switchToHttp().getRequest();
    //2. Extract the token from the  header
    const token = this.extractRequestFromHeader(request);
    //3. validate the token

    if (!token) {
      throw new UnauthorizedException('token is missing.');
    }
    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        this.jwtConfiguration,
      );
      // Attach user payload to request
      request[REQUEST_USER_KEY] = payload;
    } catch (error) {
      throw new UnauthorizedException('token is expired or invalid.');
    }

    return true;
  }

  /**
   * Extracts the JWT token from the Authorization header of the request.
   *
   * @param {Request} request - The incoming request object.
   * @returns {string | undefined} The JWT token if it exists, otherwise `undefined`.
   */
  private extractRequestFromHeader(request: Request): string | undefined {
    const [_, token] = request.headers.authorization?.split(' ') ?? [];
    return token;
  }
}
