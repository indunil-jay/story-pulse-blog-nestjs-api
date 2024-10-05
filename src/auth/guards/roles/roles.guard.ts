import { UsersService } from 'src/users/users.service';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/auth/decorators/role.decorator';
import { IActiveUser } from 'src/auth/interfaces/active-user.interface';

/**
 * A guard for checking the user roles while involing certain action on routes.
 */
@Injectable()
export class RolesGuard implements CanActivate {
  /** Create  instance with injected serivecs
   * @param {Reflector} reflector - Used to read metadata defined by decorators get the meta databy execution context.
   * @param {UsersService} usersService - inject user related services
   */
  constructor(
    private readonly reflector: Reflector,

    private readonly usersService: UsersService,
  ) {}

  /**
   * Determines that a request containg the required user roles for perform the action.
   *
   * @param {ExecutionContext} context - The execution context containing information about the current request and route.
   * @returns {Promise<boolean>} - returns weather true if requirement ment, if not false.
   */
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    //get user  roles when  at the execution.
    const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // if there is not expicitively defined role for route
    if (!requiredRoles) {
      return true;
    }

    // get signed user
    const { user }: { user: IActiveUser } = context.switchToHttp().getRequest();

    //fetch user using signed user email
    const currentUser = await this.usersService.findOneByEmail(user.email);

    //returns true if requiredRoles includes checking role
    return requiredRoles.includes(currentUser.role);
  }
}
