import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

/**
 * This DTO is used to validate the Google token received from the client.
 */

export class GoogleTokenDTO {
  /**
   * token which is provided by google service
   */
  @ApiProperty({
    description: 'The Google authentication token',
    example: 'your-google-authentication-token',
  })
  @IsNotEmpty()
  @IsString()
  token: string;
}
