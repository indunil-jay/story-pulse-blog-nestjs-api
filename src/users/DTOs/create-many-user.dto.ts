import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
// import { CreateUserDTO } from './create-user.dto';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { SignUpDTO } from 'src/auth/DTOs/auth.sign-up.dto';

export class CreateManyUsersDTO {
  @ApiProperty({
    type: 'array',
    required: true,
    items: {
      type: 'User',
    },
  })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({
    each: true,
  })
  @Type(() => SignUpDTO)
  users: SignUpDTO[];
}
