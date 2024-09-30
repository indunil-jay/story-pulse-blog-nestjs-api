import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { UsersCreateManyProvider } from './providers/users.create-many.provider';
import { AuthModule } from 'src/auth/auth.module';
import { SignupProvider } from './providers/signup.provider';

@Module({
  controllers: [UsersController],
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule)],
  providers: [UsersService, UsersCreateManyProvider, SignupProvider],
  exports: [UsersService],
})
export class UsersModule {}
