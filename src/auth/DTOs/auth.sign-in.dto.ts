import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

/**
 *
 * The `SignInDTO` class represents the data transfer object (DTO)
 * for the user sign-in process.
 *
 */
export class SignInDTO {
  /**
   * user's email  type is string
   */
  @ApiProperty({
    description: 'The email address of the user.',
    example: 'user@example.com',
  })
  @IsEmail({}, { message: 'The email must be a valid email address.' })
  @IsNotEmpty({ message: 'Email must not be empty.' })
  email: string;

  /**
   * user's password  type is string
   */
  @ApiProperty({
    description: 'The password of the user.',
    example: 'securePassword123',
  })
  @IsString({ message: 'Password must be a string.' })
  @IsNotEmpty({ message: 'Password must not be empty.' })
  password: string;
}
