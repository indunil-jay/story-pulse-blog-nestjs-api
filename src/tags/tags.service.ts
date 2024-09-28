import { In, Repository } from 'typeorm';
import { CreateTagDTO } from './DTOs/create-tag.dto';
import { Injectable } from '@nestjs/common';
import { Tag } from './tag.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
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
}
