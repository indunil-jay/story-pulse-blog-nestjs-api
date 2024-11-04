import { CreateTagProvider } from './providers/create-tag.provider';
import { DeleteTagProvider } from './providers/delete-tag.provider';
import { GetAllTagProvider } from './providers/get-all-tag.provider';
import { In, Repository } from 'typeorm';
import { CreateTagDTO } from './DTOs/create-tag.dto';
import { Injectable } from '@nestjs/common';
import { GetTagDTO } from './DTOs/get-tag.dto';
import { Tag } from './tag.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TagsService {
  constructor(
    private readonly getAllTagProvider: GetAllTagProvider,

    private readonly deleteTagProvider: DeleteTagProvider,

    private readonly createTagProvider: CreateTagProvider,

    @InjectRepository(Tag)
    private readonly tagsRepository: Repository<Tag>,
  ) {}

  public async createTag(createTagDTO: CreateTagDTO) {
    return await this.createTagProvider.createTag(createTagDTO);
  }

  public async findTags(tags: number[]) {
    return await this.tagsRepository.find({
      where: {
        id: In(tags),
      },
    });
  }

  public async deleteTag(id: number) {
    return await this.deleteTagProvider.deleteTag(id);
  }

  public async getAllTags(getTagDTO: GetTagDTO) {
    return await this.getAllTagProvider.getAllTags(getTagDTO);
  }
}
