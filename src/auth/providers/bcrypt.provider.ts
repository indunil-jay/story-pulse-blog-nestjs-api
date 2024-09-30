import { Injectable } from '@nestjs/common';
import { HashingProvider } from './hashing.provider';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class BcryptProvider implements HashingProvider {
  public async hashPassword(password: string): Promise<string> {
    return await bcryptjs.hash(password, 10);
  }

  public async comparePassword(
    userPassword: string,
    dbPassword: string,
  ): Promise<boolean> {
    return await bcryptjs.compare(userPassword, dbPassword);
  }
}
