import { registerAs } from '@nestjs/config';

/**
 *  namespace for appConfig which are  globaly availbale
 */

export default registerAs('appConfig', () => ({
  environment: process.env.NODE_ENV || 'production',
  apiVersion: process.env.API_VERSION,
  mailHost: process.env.MAIL_HOST,
  smptUsername: process.env.SMTP_USERNAME,
  smptPassword: process.env.SMTP_PASSWORD,
}));
