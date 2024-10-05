/**
 * @description This file contains constant values used throughout the authentication module.
 */

/**
 * @constant {string} REQUEST_USER_KEY
 * @description The key used in the payload for signing requests.
 * This key identifies the user in the Express request object.
 * It is important for middleware and request handling to retrieve the authenticated user.
 */

export const REQUEST_USER_KEY = 'user';

/**
 * @constant {string} AUTH_TYPE_KEY
 * @description The key used for the set-metadata decorator's key.
 * This key is used to define the type of authentication required for a specific route or resource.
 * It helps in enforcing security and managing access control based on authentication type.
 */
export const AUTH_TYPE_KEY = 'authType';

/**
 * @constant {string} ROLES_KEY
 * @description The key used for the set-metadata decorator's key.
 * This key is used to define the type of authentication required for a specific route or resource.
 * It helps in enforcing role based access model.
 */
export const ROLES_KEY = 'roles';
