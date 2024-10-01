import { SetMetadata } from '@nestjs/common';
import { AUTH_TYPE_KEY } from '../constants/auth.constants';
import { AuthType } from '../enums/auth-type';

/**
 * A decorator used to define the authentication types required for a route or controller.
 * It stores metadata using the key defined in `AUTH_TYPE_KEY` and applies the specified authentication types.
 *
 * @param {...AuthType[]} authTypes - A list of `AuthType` values that indicate the required authentication methods.
 */
export const Auth = (...authTypes: AuthType[]) =>
  SetMetadata(AUTH_TYPE_KEY, authTypes);
