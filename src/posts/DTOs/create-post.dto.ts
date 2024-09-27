import {
  IsArray,
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { PostStatus } from '../enums/postStatus.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePostDTO {
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

  @ApiProperty({
    description: 'The main content body of the blog post.',
    example: 'This is a sample blog post content.',
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiPropertyOptional({
    description: 'The URL of the featured image for the blog post.',
    example: 'http://example.com/sample-image.jpg',
  })
  @IsUrl({}, { message: 'coverImageUrl must be a valid URL.' })
  @IsOptional()
  @MaxLength(1024, {
    message: 'The URL of the featured image must not exceed 192 characters.',
  })
  coverImageUrl?: string;

  // @ApiPropertyOptional({
  //   description:
  //     'The date and time when the blog post was created, in ISO 8601 format.',
  //   example: '2024-09-27T07:46:32+0000',
  // })
  // @IsISO8601({}, { message: 'createdAt must be a valid ISO 8601 date string.' })
  // @IsOptional()
  // createdAt?: Date;

  // @ApiPropertyOptional({
  //   description:
  //     'The date and time when the blog post was last updated, in ISO 8601 format.',
  //   example: '2024-09-29T07:46:32+0000',
  // })
  // @IsISO8601({}, { message: 'updatedAt must be a valid ISO 8601 date string.' })
  // @IsOptional()
  // updatedAt?: Date;

  @ApiPropertyOptional({
    description:
      'A list of tags associated with the blog post. Each tag must be at least 3 characters long.',
    example: ['science', 'coding'],
  })
  @IsOptional()
  @IsArray({ message: 'tags must be an array of strings.' })
  @IsString({ each: true, message: 'Each tag must be a string.' })
  @MinLength(3, {
    each: true,
    message: 'Each tag must be at least 3 characters long.',
  })
  tags?: string[];

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
}
