import { Controller } from '@nestjs/common';
import { MetaDataService } from './meta-data.service';

/**
 * The `MetaDataController` is responsible for handling meta-data-related requests
 * within the application.
 */
@Controller('meta-data')
export class MetaDataController {
  // constructor(private readonly metaDataService: MetaDataService) {}
  // @Post()
  // public createPostMetaData(@Body() createMetaDataDTO: CreateMetaDataDTO) {
  //   return this.metaDataService.createMetaData(createMetaDataDTO);
  // }
}
