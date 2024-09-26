import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePostDTO } from './DTOs/create-post.dto';
import { GetPostParamDTO } from './DTOs/get-post-param.dto';

@Controller('posts')
export class PostsController {
  @Get('/:id?')
  public getPosts(@Param() getPostParamDTO: GetPostParamDTO) {
    return 'this is get all posts end point (Not implemented)';
  }

  @Post()
  public createPosts(@Body() createPostDTO: CreatePostDTO) {
    console.log(createPostDTO);
    return 'this is create posts end point (Not implemented yet)';
  }
}
