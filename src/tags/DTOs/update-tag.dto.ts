import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTagDTO } from './create-tag.dto';
import { IsInt, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateTagDTO extends PartialType(CreateTagDTO) {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  id: number;
}
