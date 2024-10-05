import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';

/**
 *  DTO for includde neccessary pagination details, this will attach to the @Query
 */
export class PaginationQueryDTO {
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  limit?: number = 10;

  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  page?: number = 1;
}
