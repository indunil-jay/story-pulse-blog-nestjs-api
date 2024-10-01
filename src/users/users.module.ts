import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';
// import { UsersCreateManyProvider } from './providers/users.create-many.provider';
import { AuthModule } from 'src/auth/auth.module';
import { SignupProvider } from './providers/signup.provider';
import { FindOneUserByEmailProvider } from './providers/find-one-user-by-email.provider';

@Module({
  controllers: [UsersController],
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule)],
  providers: [
    UsersService,
    SignupProvider,
    FindOneUserByEmailProvider,
    // UsersCreateManyProvider,
  ],
  exports: [UsersService],
})
export class UsersModule {}
