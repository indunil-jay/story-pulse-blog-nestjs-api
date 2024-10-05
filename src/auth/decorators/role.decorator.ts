import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/users/enums/users.roles.enum';
import { ROLES_KEY } from '../constants/auth.constants';

export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
