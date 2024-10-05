import {
  IsArray,
  IsEnum,
  IsInt,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { PostStatus } from '../enums/postStatus.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateMetaDataDTO } from 'src/meta-data/DTOs/create-meta-data.dto';
import { Type } from 'class-transformer';

/**
 * Data Transfer Object (DTO) for creating a blog post.
 * This DTO validates the incoming data to ensure it meets
 * the required specifications before being processed.
 */
export class CreatePostDTO {
  /**
   * The title of the blog post.
   * Must be between 12 and 96 characters long.
   */
  @ApiProperty({
    description:
      'The title of the blog post. It should be between 12 and 96 characters long.',
    example: 'A Comprehensive Technology test',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(12, { message: 'Title must be at least 12 characters long.' })
  @MaxLength(96, { message: 'Title must not exceed 96 characters.' })
  title: string;

  /**
   * A URL-friendly version of the title, typically all lowercase.
   * It can only contain letters, numbers, and hyphens.
   */
  @ApiProperty({
    description:
      'A URL-friendly version of the title, typically all lowercase with words separated by hyphens.',
    example: 'a-comprehensive-technology-test',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      'Slug must be lowercase and can only contain letters, numbers, and hyphens. No leading or trailing hyphen.',
  })
  @MaxLength(192)
  slug: string;

  /**
   * The status of the blog post.
   * Can be one of the following: "pending", "published", "draft", "scheduled", or "reviewed".
   */
  @ApiProperty({
    enum: PostStatus,
    description:
      'The status of the blog post, which can be "pending", "published", "draft", "scheduled", or "reviewed".',
    example: 'pending',
  })
  @IsEnum(PostStatus, {
    message: 'Status must be one of the predefined enum values.',
  })
  @IsNotEmpty()
  status: PostStatus;

  /**
   * The main content body of the blog post.
   * This property must not be empty.
   */
  @ApiProperty({
    description: 'The main content body of the blog post.',
    example: 'This is a sample blog post content.',
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  /**
   * The URL of the featured image for the blog post.
   * It must be a valid URL and can be omitted.
   */
  @ApiPropertyOptional({
    description: 'The URL of the featured image for the blog post.',
    example: 'http://example.com/sample-image.jpg',
  })
  @IsUrl({}, { message: 'coverImageUrl must be a valid URL.' })
  @IsOptional()
  @MaxLength(1024, {
    message: 'The URL of the featured image must not exceed 1024 characters.',
  })
  coverImageUrl?: string;

  /**
   * The ISO format string for the post published time.
   * This property is optional.
   */
  @ApiPropertyOptional({
    description: 'ISO format string for post published time',
  })
  @IsOptional()
  @IsISO8601()
  publishedOn?: Date;

  /**
   * A list of tag IDs associated with the blog post.
   * This property is optional and each tag must be an integer.
   */
  @ApiPropertyOptional({
    description: 'A list of tags IDs associated with the blog post.',
    example: [1, 2],
  })
  @IsOptional()
  @IsArray({ message: 'tags must be an array of integers.' })
  @IsInt({ each: true, message: 'Each tag must be an integer.' })
  tags?: number[];

  /**
   * A list of categories the blog post belongs to.
   * Each category must be at least 3 characters long.
   */
  @ApiPropertyOptional({
    description:
      'A list of categories the blog post belongs to. Each category must be at least 3 characters long.',
    example: ['Programming', 'Technology'],
  })
  @IsOptional()
  @IsArray({ message: 'categories must be an array of strings.' })
  @IsString({ each: true, message: 'Each category must be a string.' })
  @MinLength(3, {
    each: true,
    message: 'Each category must be at least 3 characters long.',
  })
  categories?: string[];

  /**
   * A list of meta data values associated with the blog post.
   * This property is optional and can contain JSON formatted strings.
   */
  @ApiPropertyOptional({
    required: false,
    description: 'A list of meta data values that a post has.',
    items: {
      type: 'object',
      properties: {
        metaValue: {
          type: 'json',
          description: 'The metaValue is a JSON string',
          example: '{"backLinks1":"https://backlink.org/link-1"}',
        },
      },
    },
  })
  @IsOptional()
  @Type(() => CreateMetaDataDTO)
  @ValidateNested({ each: true })
  metaDataOption?: CreateMetaDataDTO | null;
}
