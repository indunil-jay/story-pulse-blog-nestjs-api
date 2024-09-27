import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class GetPostParamDTO {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  id?: number;
}
