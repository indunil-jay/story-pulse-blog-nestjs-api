import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class GetTagDTO {
  @ApiPropertyOptional({
    description: 'Id of the tag',
    example: 1,
  })
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  id?: number;
}
