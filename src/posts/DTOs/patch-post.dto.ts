import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePostDTO } from './create-post.dto';
import { IsInt, IsNotEmpty } from 'class-validator';

/**
 * DTO for updating a post.
 * This class allows for partial updates of a post by extending the CreatePostDTO.
 */
export class PatchPostDTO extends PartialType(CreatePostDTO) {
  /**
   * The ID of the post that needs to be updated.
   * This field is required to identify which post to update.
   */
  @ApiProperty({
    description: 'The Id of the post that needs to be updated.',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  id: number;
}
