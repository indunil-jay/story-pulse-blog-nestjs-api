import { ApiPropertyOptional, IntersectionType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsInt, IsOptional } from 'class-validator';
import { PaginationQueryDTO } from 'src/common/pagination/DTOs/pagination.query.dto';

/**
 * Base DTO for getting posts with additional query parameters.
 * This class defines optional filters for retrieving specific posts.
 */
class GetPostBaseDTO {
  /**
   * Optional start date for filtering posts.
   * Posts created after this date will be returned.
   */
  @ApiPropertyOptional({
    description:
      'ISO format string for query post needs be get withing the start date',
  })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  startDate?: Date;

  /**
   * Optional end date for filtering posts.
   * Posts created before this date will be returned.
   */
  @ApiPropertyOptional({
    description:
      'ISO format string for query post needs be get withing the end date',
  })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  endDate?: Date;

  /**
   * Optional post ID for filtering a specific post.
   * If provided, only the post with this ID will be retrieved.
   */
  @ApiPropertyOptional({ description: 'Id of the post.', example: 1 })
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  postId?: number;

  /**
   * Optional user ID for filtering posts by a specific user.
   * If provided, only posts created by the user with this ID will be retrieved.
   */
  @ApiPropertyOptional({
    description: 'Id of the user Id',
    example: 1,
  })
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  userId?: number;
}

/**
 * DTO for getting posts that combines base query parameters with pagination.
 * This class allows for filtering posts based on various criteria and includes pagination support.
 */
export class GetPostDTO extends IntersectionType(
  GetPostBaseDTO,
  PaginationQueryDTO,
) {}
