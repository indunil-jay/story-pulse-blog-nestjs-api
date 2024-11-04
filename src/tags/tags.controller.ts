import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateTagDTO } from './DTOs/create-tag.dto';
import { TagsService } from './tags.service';
import { Roles } from 'src/auth/decorators/role.decorator';
import { UserRole } from 'src/users/enums/users.roles.enum';

@ApiTags('Tags')
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  public createTag(@Body() createTagDTO: CreateTagDTO) {
    return this.tagsService.createTag(createTagDTO);
  }

  @Roles(UserRole.ADMIN)
  @Delete('/:id')
  public deleteTag(@Param('id', ParseIntPipe) id: number) {
    return this.tagsService.deleteTag(id);
  }
}
