import { AccessTokenGuard } from 'src/auth/guards/access-token/access-token.guard';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthType } from 'src/auth/enums/auth-type';
import { AUTH_TYPE_KEY } from 'src/auth/constants/auth.constants';

/**
 * A guard that dynamically applies authentication strategies based on the `AuthType` metadata set for the route.
 * It supports multiple authentication types, such as Bearer tokens or no authentication (`AuthType.None`).
 */
@Injectable()
export class AuthenticationGuard implements CanActivate {
  /**
   * The default authentication type is set to `AuthType.Bearer` which uses token-based authentication.
   */
  private static readonly defaultAuthType = AuthType.Bearer;

  /**
   * A map linking authentication types to their corresponding guards.
   * @type {Record<AuthType, CanActivate | CanActivate[]>}
   */
  private readonly authTypeGuardMap: Record<
    AuthType,
    CanActivate | CanActivate[]
  > = {
    [AuthType.Bearer]: this.accessTokenGuard, // Bearer token-based authentication
    [AuthType.None]: { canActivate: () => true }, // No authentication required
  };

  /**
   *  Creates an instance of `AuthenticationGuard`. Injects dependencies such as the `Reflector` to retrieve metadata and the `AccessTokenGuard` for Bearer authentication.
   *
   * @param {Reflector} reflector - Used to read metadata defined by decorators get the meta databy execution context.
   * @param {AccessTokenGuard} accessTokenGuard - The guard used for Bearer token authentication.
   */
  constructor(
    private readonly reflector: Reflector,

    private readonly accessTokenGuard: AccessTokenGuard,
  ) {}

  /**
   *  Determines whether a request is allowed based on the authentication strategies assigned to the route.
   * The method checks for authentication metadata on the handler or class and applies the corresponding guard(s).
   *
   * @param {ExecutionContext} context - The execution context containing information about the current request and route.
   * @returns {Promise<boolean>} Resolves to `true` if any of the guards allow access, otherwise throws an `UnauthorizedException`.
   *
   * @throws {UnauthorizedException} If no guard allows access to the route.

   */

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    // Retrieve the auth types defined on the route (or default to Bearer)
    const authTypes = this.reflector.getAllAndOverride(AUTH_TYPE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]) ?? [AuthenticationGuard.defaultAuthType];

    // Get all relevant guards for the specified auth types
    const guards = authTypes.map((type) => this.authTypeGuardMap[type]).flat();

    // Iterate over the guards and check if any of them allow access
    for (const instance of guards) {
      const canActivate = await Promise.resolve(
        instance.canActivate(context),
      ).catch((err) => {
        error: err;
      });

      // If a guard allows access, return true
      if (canActivate) {
        return true;
      }
    }
    // If no guard allows access, throw an unauthorized exception
    throw new UnauthorizedException();
  }
}
