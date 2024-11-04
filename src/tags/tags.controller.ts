import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateTagDTO } from './DTOs/create-tag.dto';
import { TagsService } from './tags.service';
import { Roles } from 'src/auth/decorators/role.decorator';
import { UserRole } from 'src/users/enums/users.roles.enum';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type';
import { GetTagDTO } from './DTOs/get-tag.dto';
import { UpdateTagDTO } from './DTOs/update-tag.dto';

@ApiTags('Tags')
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  public async createTag(@Body() createTagDTO: CreateTagDTO) {
    return this.tagsService.createTag(createTagDTO);
  }

  @Roles(UserRole.ADMIN)
  @Delete('/:id')
  public async deleteTag(@Param('id', ParseIntPipe) id: number) {
    return this.tagsService.deleteTag(id);
  }

  @Get('/:id?')
  @Auth(AuthType.None)
  public async getAllTags(@Param() getTagDTO: GetTagDTO) {
    return this.tagsService.getAllTags(getTagDTO);
  }

  @Patch()
  @Auth(AuthType.None)
  public async updateTag(@Body() updateTagDTO: UpdateTagDTO) {
    return this.tagsService.updateTag(updateTagDTO);
  }
}
