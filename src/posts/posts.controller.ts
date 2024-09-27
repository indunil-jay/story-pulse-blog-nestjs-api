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
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiQuery({
    name: 'limit',
    type: 'number',
    required: false,
    description:
      'The maximum number of entries to return per query. Default is 10.',
    example: 10,
  })
  @ApiQuery({
    name: 'page',
    type: 'number',
    required: false,
    description:
      'The page number to fetch. Pagination starts at page 1. Default is 1.',
    example: 1,
  })
  @ApiOperation({
    summary: 'Fetches a list of posts or a single post by ID.',
    description:
      'Retrieves a list of posts based on pagination (limit and page) or a single post by its ID if provided.',
  })
  @ApiResponse({
    status: 200,
    description: 'Posts fetched successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Post not found (for single post requests).',
  })
  @Get('/:id?')
  public getPosts(
    @Param() getPostParamDTO: GetPostParamDTO,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return this.postsService.findPosts(getPostParamDTO, limit, page);
  }

  @ApiOperation({
    summary: 'Create a new blog post.',
    description:
      'Allows users to create a new blog post by providing the required information, including title, slug, status, and optional tags or categories.',
  })
  @ApiResponse({
    status: 201,
    description:
      'Post created successfully. The response includes the created post data.',
  })
  @ApiResponse({
    status: 400,
    description:
      'Bad Request. The input data does not meet validation requirements (e.g., missing required fields or invalid data format).',
  })
  @ApiResponse({
    status: 401,
    description:
      'Unauthorized. The user is not authenticated and cannot create a blog post.',
  })
  @ApiResponse({
    status: 500,
    description:
      'Internal Server Error. An unexpected error occurred on the server while processing the request.',
  })
  @Post()
  public createPosts(@Body() createPostDTO: CreatePostDTO) {
    console.log(createPostDTO);
    return 'This is the create posts endpoint (Not implemented yet).';
  }
}
