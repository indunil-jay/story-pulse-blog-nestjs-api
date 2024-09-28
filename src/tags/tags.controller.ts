import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateTagDTO } from './DTOs/create-tag.dto';
import { TagsService } from './tags.service';

@ApiTags('Tags')
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  public createTag(@Body() createTagDTO: CreateTagDTO) {
    return this.tagsService.createTag(createTagDTO);
  }
}
