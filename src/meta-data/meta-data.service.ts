import { Repository } from 'typeorm';
import { CreateMetaDataDTO } from './DTOs/create-meta-data.dto';
import { Injectable } from '@nestjs/common';
import { MetaData } from './meta-data.entity';
import { InjectRepository } from '@nestjs/typeorm';

/**
 * MetaDataService reponsible for handling meta-data related service.
 */
@Injectable()
export class MetaDataService {
  constructor(
    @InjectRepository(MetaData)
    private readonly metaDataRepository: Repository<MetaData>,
  ) {}

  /**
   * TODO:
   * @param createMetaDataDTO
   * @returns
   */
  public async createMetaData(createMetaDataDTO: CreateMetaDataDTO) {
    let metaData = this.metaDataRepository.create(createMetaDataDTO);
    return await this.metaDataRepository.save(metaData);
  }
}
