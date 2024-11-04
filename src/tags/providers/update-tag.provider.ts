import { FindAllTagsProvider } from './find-all-tags.provider';
import { GetAllTagProvider } from './get-all-tag.provider';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from '../tag.entity';
import { UpdateTagDTO } from '../DTOs/update-tag.dto';

@Injectable()
export class UpdateTagProvider {
  constructor(
    @InjectRepository(Tag)
    private readonly tagsRepository: Repository<Tag>,

    private readonly findAllTagsProvider: FindAllTagsProvider,
  ) {}
  public async updateTag(updateTagDTO: UpdateTagDTO) {
    let exsistingTag: Tag | undefined = undefined;
    try {
      exsistingTag = (
        await this.findAllTagsProvider.findTags([updateTagDTO.id])
      )[0];
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later.',
        { description: 'error connecting to the database.' },
      );
    }

    //if not throw bad request
    if (!exsistingTag) {
      throw new BadRequestException(
        'Could not found any tag with that ID. please check your requested ID.',
      );
    }
    exsistingTag.name = updateTagDTO.name ?? exsistingTag.name;
    exsistingTag.slug = updateTagDTO.slug ?? exsistingTag.slug;
    exsistingTag.featuredImageUrl =
      updateTagDTO.featuredImageUrl ?? exsistingTag.featuredImageUrl;
    exsistingTag.description =
      updateTagDTO.description ?? exsistingTag.description;

    //if so, update the request properties
    try {
      exsistingTag = await this.tagsRepository.save(exsistingTag);
    } catch (error) {
      throw new ConflictException(
        'Unable to save your updates. please try again',
        { description: 'error connecting to the database.' },
      );
    }
    return exsistingTag;
  }
}
