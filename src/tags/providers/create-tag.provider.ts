import { ConflictException, Injectable } from '@nestjs/common';
import { CreateTagDTO } from '../DTOs/create-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from '../tag.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CreateTagProvider {
  constructor(
    @InjectRepository(Tag)
    private readonly tagsRepository: Repository<Tag>,
  ) {}
  public async createTag(createTagDTO: CreateTagDTO) {
    const tag = this.tagsRepository.create(createTagDTO);
    try {
      return await this.tagsRepository.save(tag);
    } catch (error) {
      throw new ConflictException('Tag creation failed.', {
        description: 'Database conflict during tag creation. ',
      });
    }
  }
}
