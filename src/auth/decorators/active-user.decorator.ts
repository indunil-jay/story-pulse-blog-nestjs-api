import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IActiveUser } from '../interfaces/active-user.interface';
import { REQUEST_USER_KEY } from '../constants/auth.constants';

/**
 *  param decorators to extract the current sign-in user from express request.
 *  It allows for easy access to the active user's details across different controllers.
 *
 * If a `field` is provided, it will extract only that specific field (e.g., `email`, `id`) from the user object.
 * Otherwise, it returns the full user object.
 
 * @param {keyof IActiveUser | undefined} field - Optional field to extract from the active user object.
 * @param {ExecutionContext} ctx - The execution context from which the request is extracted.
 * @returns {IActiveUser | any} - The full active user object or a specific field if requested.
 */

export const ActiveUser = createParamDecorator(
  (field: keyof IActiveUser | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user: IActiveUser = request[REQUEST_USER_KEY];

    return field ? user?.[field] : user;
  },
);
