import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetaDataController } from './meta-data.controller';
import { MetaDataService } from './meta-data.service';
import { MetaData } from './meta-data.entity';

/**
 * The `MetaDataModule` is responsible for managing metadata
 * associated with posts in the application. It defines the
 * structure and services required to handle metadata operations.
 */
@Module({
  controllers: [MetaDataController],

  providers: [MetaDataService],

  imports: [TypeOrmModule.forFeature([MetaData])],
})
export class MetaDataModule {}
