import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class ForgotPasswordDTO {
  @ApiProperty({ description: 'your registed email for resetting password.' })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
