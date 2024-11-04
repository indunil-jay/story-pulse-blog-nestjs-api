import { GetAllTagProvider } from './providers/get-all-tag.provider';
import { In, Repository } from 'typeorm';
import { CreateTagDTO } from './DTOs/create-tag.dto';
import { Injectable } from '@nestjs/common';
import { Tag } from './tag.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GetTagDTO } from './DTOs/get-tag.dto';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,

    private readonly getAllTagProvider: GetAllTagProvider,
  ) {}

  public async createTag(createTagDTO: CreateTagDTO) {
    const tag = this.tagRepository.create(createTagDTO);
    return await this.tagRepository.save(tag);
  }

  public async findTags(tags: number[]) {
    return await this.tagRepository.find({
      where: {
        id: In(tags),
      },
    });
  }

  public async deleteTag(id: number) {
    return await this.tagRepository.delete(id);
  }

  public async getAllTags(getTagDTO: GetTagDTO) {
    return await this.getAllTagProvider.getAllTags(getTagDTO);
  }
}
