import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY } from '../constants/auth.constants';
import { UserRole } from 'src/users/enums/users.roles.enum';

/**
 * Decorator to specify required roles for accessing a specific endpoint.
 * This can be used to protect routes by ensuring that only users with
 * the specified roles can access the functionality provided by that endpoint.
 *
 * @param roles - One or more roles that are required to access the endpoint.
 * @returns A metadata key-value pair with the specified roles.
 */
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
