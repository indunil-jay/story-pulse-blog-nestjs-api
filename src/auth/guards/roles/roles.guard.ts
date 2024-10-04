import { UsersService } from 'src/users/users.service';
import { FindOneUserByEmailProvider } from './../../../users/providers/find-one-user-by-email.provider';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/auth/decorators/role.decorator';
import { UserRole } from 'src/users/enums/users.roles.enum';
import { IActiveUser } from 'src/auth/interfaces/active-user.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  private static readonly defaultUser = UserRole.ADMIN;

  constructor(
    private readonly reflector: Reflector,

    private readonly usersService: UsersService,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]) ?? [RolesGuard.defaultUser];

    const { user }: { user: IActiveUser } = context.switchToHttp().getRequest();

    const currentUser = await this.usersService.findOneByEmail(user.email);

    return requiredRoles.includes(currentUser.role);
  }
}
