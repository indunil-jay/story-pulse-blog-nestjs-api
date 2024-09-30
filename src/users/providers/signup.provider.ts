import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { SignUpDTO } from 'src/auth/DTOs/auth.sign-up.dto';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HashingProvider } from 'src/auth/providers/hashing.provider';

@Injectable()
export class SignupProvider {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    @Inject(forwardRef(() => HashingProvider))
    private readonly hashingProvider: HashingProvider,
  ) {}

  /**TODO: */
  public async signup(signUpDTO: SignUpDTO) {
    console.log(signUpDTO);
    let existingUser: User | undefined = undefined;

    try {
      existingUser = await this.usersRepository.findOne({
        where: { email: signUpDTO.email },
      });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later.',
        { description: 'error connecting to the database.' },
      );
    }

    if (existingUser) {
      throw new BadRequestException(
        'The email already exists, please check your email.',
      );
    }

    let user = this.usersRepository.create({
      ...signUpDTO,
      password: await this.hashingProvider.hashPassword(signUpDTO.password),
    });

    try {
      user = await this.usersRepository.save(user);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later.',
        { description: 'error connecting to the database.' },
      );
    }
    return user;
  }
}
