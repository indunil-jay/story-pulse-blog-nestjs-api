import { Transform } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class GetPostParamDTO {
  @IsOptional()
  @IsInt()
  @Transform(() => Number)
  id?: number;
}
