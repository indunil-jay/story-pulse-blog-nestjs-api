import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class GetPostParamDTO {
  @ApiPropertyOptional({
    description:
      'ID of the post to retrieve. If provided, fetches the specific post by its ID.',
    example: 10,
  })
  @IsOptional()
  @IsInt({ message: 'Post ID must be an integer.' })
  @Type(() => Number)
  id?: number;
}
