import {
  IsEmail,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Match } from '../decorators/password-match.decorator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDTO {
  @ApiProperty({
    description: 'A user’s first name.',
    example: 'mike',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'FirstName must be at least 3 characters long.' })
  @MaxLength(20, { message: 'FirstName must not be exceed 20 characters.' })
  firstName: string;

  @ApiPropertyOptional({
    description: 'A user’s last name.',
    example: 'Doe',
  })
  @IsString()
  @IsOptional()
  @MinLength(3, { message: 'lastName must be at least 3 characters long.' })
  @MaxLength(20, { message: 'lastName must not be exceed 20 characters.' })
  lastName?: string;

  @ApiProperty({
    description: 'A user’s email address.',
    example: 'mike.doe@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(64, {
    message: 'Email cannot exceed $constraint1 characters.',
  })
  email: string;

  @ApiProperty({
    description:
      'The user’s password. Must be 8-20 characters long, include at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.',
    example: 'SecureP@ssword123',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8, {
    message: 'Password must be at least $constraint1 characters long.',
  })
  @MaxLength(20, {
    message: 'Password cannot exceed $constraint1 characters.',
  })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
    message:
      'Password must include at least 1 letter, 1 number, and 1 special character.',
  })
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  password: string;

  @ApiProperty({
    description: 'Confirmation of the password. Must match the password field.',
    example: 'SecureP@ssword123',
  })
  @IsString()
  @IsNotEmpty()
  @Match(CreateUserDTO, (v) => v.password, {
    message: 'Passwords do not match.',
  })
  confirmPassword: string;

  @ApiPropertyOptional({
    description: 'The user’s date of birth in ISO 8601 format.',
    example: '1990-01-01',
  })
  @IsISO8601()
  @IsOptional()
  dataOfBirth?: Date;

  @ApiPropertyOptional({
    description: 'A brief bio about the user.',
    example:
      'Passionate software developer with experience in web development.',
  })
  @IsString()
  @IsOptional()
  @MaxLength(256)
  @MinLength(32)
  bio?: string;

  @ApiPropertyOptional({
    description: 'URL of the user’s profile image.',
    example: 'https://example.com/profile-image.jpg',
  })
  @IsString()
  @IsOptional()
  @MaxLength(1024)
  profileImage?: string;
}
