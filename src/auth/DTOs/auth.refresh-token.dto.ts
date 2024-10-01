import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

/**
 *
 * The `RefreshTokenDTO` class represents the data transfer object (DTO)
 * required to refresh an access token using a refresh token. It validates
 * the incoming request body to ensure a valid refresh token is provided.
 *
 */
export class RefreshTokenDTO {
  @ApiProperty({
    description:
      'The refresh token provided by the client to request a new access token.',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  @IsString({
    message: 'Refresh token must be a string.',
  })
  @IsNotEmpty({
    message: 'Refresh token must not be empty.',
  })
  refreshToken: string;
}
