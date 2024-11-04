import {
  HttpException,
  HttpStatus,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Tag } from '../tag.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GetTagDTO } from '../DTOs/get-tag.dto';

@Injectable()
export class GetAllTagProvider {
  constructor(
    @InjectRepository(Tag)
    private readonly tagsRepository: Repository<Tag>,
  ) {}

  public async getAllTags(getTagDTO: GetTagDTO) {
    let tags: Tag[] | undefined = undefined;
    //if user provider id

    //if user does not privider id
    try {
      tags = await this.tagsRepository.find({ where: { id: getTagDTO.id } });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later.',
        { description: 'error connecting to the database.' },
      );
    }

    if (!tags) {
      throw new HttpException(
        {
          status: HttpStatus.NO_CONTENT,
          error: 'There are no tags',
        },
        HttpStatus.NO_CONTENT,
      );
    }

    return tags;
  }
}
