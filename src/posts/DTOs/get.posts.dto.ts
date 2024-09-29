// additional paramaeters that exists in query

import { IntersectionType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsOptional } from 'class-validator';
import { PaginationQueryDTO } from 'src/common/pagination/DTOs/pagination.query.dto';

class GetPostBaseDTO {
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  startDate?: Date;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  endDate?: Date;
}

export class GetPostDTO extends IntersectionType(
  GetPostBaseDTO,
  PaginationQueryDTO,
) {}
