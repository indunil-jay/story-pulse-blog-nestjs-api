import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagsModule } from './tags/tags.module';
import { MetaDataModule } from './meta-data/meta-data.module';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PaginationModule } from './common/pagination/pagination.module';
import { AuthModule } from './auth/auth.module';

import databaseConfig from './config/database.config';
import appConfig from './config/app.config';
import envValidation from './config/env.validation';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AccessTokenGuard } from './auth/guards/access-token/access-token.guard';
import jwtConfig from './auth/config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticationGuard } from './auth/guards/authentication/authentication.guard';
import { DataResponseInterceptor } from './common/interceptors/data-response/data-response.interceptor';
import { MailModule } from './mail/mail.module';
import { RolesGuard } from './auth/guards/roles/roles.guard';

/** Determine the environment (development, production, etc.) */
const ENV = process.env.NODE_ENV;

/**
 * The `AppModule` is the root module of the application. It serves as the
 * central hub that imports all other modules, controllers, and providers,
 * orchestrating the application's core functionality.
 */
@Module({
  imports: [
    // Global configuration module that loads environment variables
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
      load: [appConfig, databaseConfig],
      validationSchema: envValidation,
    }),

    // Feature modules for different parts of the application
    PostsModule,
    TagsModule,
    MetaDataModule,
    UsersModule,
    PaginationModule,
    AuthModule,

    // TypeORM configuration for connecting to the PostgreSQL database
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        synchronize: configService.get<boolean>('database.synchronize'),
        autoLoadEntities: configService.get<boolean>(
          'database.autoLoadEntities',
        ),
        host: configService.get<string>('database.host'),
        port: +configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.name'),
      }),
    }),

    // JWT configuration for authentication
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),

    // Mail module for sending emails
    MailModule,
  ],
  controllers: [AppController], // Registers the AppController to handle application-wide requests
  providers: [
    AppService, // Main service for application logic
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard, // Global guard for authentication
    },
    AccessTokenGuard, // Guard for validating access tokens

    {
      provide: APP_GUARD,
      useClass: RolesGuard, // Global guard for role-based access control
    },

    {
      provide: APP_INTERCEPTOR,
      useClass: DataResponseInterceptor, // Interceptor for formatting responses
    },
  ],
})
export class AppModule {}
