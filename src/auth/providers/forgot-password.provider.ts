import { UsersService } from 'src/users/users.service';
import { ForgotPasswordDTO } from './../DTOs/auth.forgot-password.dto';
import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { User } from 'src/users/user.entity';

@Injectable()
export class ForgotPasswordProvider {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}
  public async forgotPassword(forgotPasswordDTO: ForgotPasswordDTO) {
    let existingUser: User | undefined = undefined;

    try {
      existingUser = await this.usersService.findOneByEmail(
        forgotPasswordDTO.email,
      );
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later.',
        { description: 'error connecting to the database.' },
      );
    }

    if (!existingUser) {
      throw new BadRequestException('There is no user with that email.');
    }

    //send to email
  }
}
