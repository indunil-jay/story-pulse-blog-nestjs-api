import { PostsService } from './posts.service';
import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { CreatePostDTO } from './DTOs/create-post.dto';
import { GetPostParamDTO } from './DTOs/get-post-param.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('/:id?')
  public getPosts(
    @Param() getPostParamDTO: GetPostParamDTO,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return this.postsService.findPosts(getPostParamDTO, limit, page);
  }

  @Post()
  public createPosts(@Body() createPostDTO: CreatePostDTO) {
    console.log(createPostDTO);
    return 'this is create posts end point (Not implemented yet)';
  }
}
