import { registerAs } from '@nestjs/config';

/**
 *  namespace for database env configurations
 */

export default registerAs('database', () => ({
  host: process.env.DATATBASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT) || 5432,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  name: process.env.DATABASE_NAME,
  synchronize: process.env.DATABASE_SYNC === 'true' ? true : false,
  autoLoadEntities:
    process.env.DATABASE_AUTOLOADENTITIES === 'true' ? true : false,
}));
