import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MetaData } from './meta-data.entity';
import { CreateMetaDataDTO } from './DTOs/create-meta-data.dto';

/**
 * The `MetaDataService` is responsible for handling
 * meta-data related services
 */
@Injectable()
export class MetaDataService {
  /**
   * cretae instance with injected services
   *
   * @param {Repository<MetaData>} metaDataRepository - repository for interact with meta-data table.
   */
  constructor(
    @InjectRepository(MetaData)
    private readonly metaDataRepository: Repository<MetaData>,
  ) {}

  /**
   * Creates a new metadata entry in the database.
   *
   * @param {CreateMetaDataDTO} createMetaDataDTO - The data transfer object containing
   * the metadata value to be created. It must be a valid JSON string.
   * @returns {Promise<MetaData>} A promise that resolves to the created `MetaData` entity.
   */
  public async createMetaData(
    createMetaDataDTO: CreateMetaDataDTO,
  ): Promise<MetaData> {
    // Create a new instance of MetaData based on the provided DTO
    const metaData = this.metaDataRepository.create(createMetaDataDTO);

    // Save the newly created MetaData instance to the database
    return await this.metaDataRepository.save(metaData);
  }
}
