import { registerAs } from '@nestjs/config';

/**
 *  namespace for appConfig
 */

export default registerAs('appConfig', () => ({
  environment: process.env.NODE_ENV || 'production',
  apiVersion: process.env.API_VERSION,
}));
