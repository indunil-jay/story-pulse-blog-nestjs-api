import { IsJSON, IsNotEmpty } from 'class-validator';

export class CreateMetaDataDTO {
  @IsNotEmpty()
  @IsJSON()
  metaValue: string;
}
