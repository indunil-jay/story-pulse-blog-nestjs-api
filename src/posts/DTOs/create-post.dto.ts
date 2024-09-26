import {
  IsNotEmpty,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreatePostDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(12)
  @MaxLength(96)
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsUrl()
  @IsNotEmpty()
  coverImageUrl: string;
}
