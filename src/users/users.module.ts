import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';
// import { UsersCreateManyProvider } from './providers/users.create-many.provider';
import { AuthModule } from 'src/auth/auth.module';
import { SignupProvider } from './providers/signup.provider';
import { FindOneUserByEmailProvider } from './providers/find-one-user-by-email.provider';
import { FindOneByGoogleIdProvider } from './providers/find-one-by-google-id.provider';
import { CreateGoogleUserProvider } from './providers/create-google-user.provider';

/**
 * The `UsersModule` is responsible for encapsulating the user-related
 * functionalities of the application. It provides a cohesive structure
 * for managing users, including user creation, authentication, and
 * retrieval.
 */
@Module({
  controllers: [UsersController],
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule)],
  providers: [
    UsersService,
    SignupProvider,
    FindOneUserByEmailProvider,
    FindOneByGoogleIdProvider,
    CreateGoogleUserProvider,
  ],
  exports: [UsersService],
})
export class UsersModule {}
