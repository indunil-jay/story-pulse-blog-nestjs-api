import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateTagDTO {
  @ApiProperty({
    description:
      'The name of the tag. It should be between 3 and 96 characters long.',
    example: 'Machine Learning',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'Tag must be at least 3 characters long.' })
  @MaxLength(96, { message: 'Tag must not exceed 96 characters.' })
  name: string;

  @ApiProperty({
    description:
      'A URL-friendly version of the tag slug, typically all lowercase with words separated by hyphens.',
    example: 'machine-learning',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      'Slug must be lowercase and can only contain letters, numbers, and hyphens. No leading or trailing hyphen.',
  })
  @MaxLength(192, { message: 'Tag slug must not exceed 192 characters.' })
  slug: string;

  @ApiPropertyOptional({
    description: 'The breif description about the tag.',
    example: 'Machine Learning tag is related to artifical inteligence.',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'The URL of the featured image for the specific tag.',
    example: 'http://example.com/sample-image-tag.jpg',
  })
  @IsUrl({}, { message: 'featuredImageUrl must be a valid URL.' })
  @IsOptional()
  @MaxLength(1024, {
    message: 'The URL of the featured image must not exceed 192 characters.',
  })
  featuredImageUrl?: string;
}
