import { Module } from '@nestjs/common';
import { MetaDataController } from './meta-data.controller';
import { MetaDataService } from './meta-data.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetaData } from './meta-data.entity';

@Module({
  controllers: [MetaDataController],
  providers: [MetaDataService],
  imports: [TypeOrmModule.forFeature([MetaData])],
})
export class MetaDataModule {}
