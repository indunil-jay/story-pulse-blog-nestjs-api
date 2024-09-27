import { Body, Controller, Post } from '@nestjs/common';
import { CreateMetaDataDTO } from './DTOs/create-meta-data.dto';
import { MetaDataService } from './meta-data.service';

@Controller('meta-data')
export class MetaDataController {
  constructor(private readonly metaDataService: MetaDataService) {}

  // @Post()
  // public createPostMetaData(@Body() createMetaDataDTO: CreateMetaDataDTO) {
  //   return this.metaDataService.createMetaData(createMetaDataDTO);
  // }
}
