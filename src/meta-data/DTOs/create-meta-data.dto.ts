import { IsJSON, IsNotEmpty } from 'class-validator';

/**
 * Data Transfer Object (DTO) for creating metadata.
 * This class defines the structure of the data required
 * when creating a new metadata entry, along with validation rules.
 */
export class CreateMetaDataDTO {
  /**
   * The value of the metadata.
   * It must be a valid JSON string and cannot be empty.
   */
  @IsNotEmpty({
    message: 'Meta value must not be empty.',
  })
  @IsJSON({
    message: 'Meta value must be a valid JSON string.',
  })
  metaValue: string;
}
