import { PostsService } from './posts.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreatePostDTO } from './DTOs/create-post.dto';
import { GetPostParamDTO } from './DTOs/get-post-param.dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PatchPostDTO } from './DTOs/patch-post.dto';
import { GetPostDTO } from './DTOs/get.posts.dto';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { IActiveUser } from 'src/auth/interfaces/active-user.interface';
import { Roles } from 'src/auth/decorators/role.decorator';
import { UserRole } from 'src/users/enums/users.roles.enum';

/**
 * Responsible for handling  post related routes.
 */

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  /**
   *
   * @param {PostsService} postsService - inject post service for handling post related operations.
   */
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
    @Query() postQuery: GetPostDTO,
  ) {
    return this.postsService.findPosts(getPostParamDTO, postQuery);
  }

  /**
   *  Routes for handle create  a post
   * @param {CreatePostDTO} createPostDTO - DTO for post
   * @param {IActiveUser} user - get current signed user from request.
   * @returns  - created post
   */
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
  public async createPosts(
    @Body() createPostDTO: CreatePostDTO,
    @ActiveUser() user: IActiveUser,
  ) {
    return this.postsService.createPost(createPostDTO, user);
  }

  /**
   *  Routes for handle delete  by id
   * @param {number} id - id for delete post
   * @param {IActiveUser} user - get current signed user from request.
   * @returns  - deleted results resonse
   */

  @ApiOperation({
    summary: 'Delete a existing post.',
    description:
      'Allows authenicated user to delete a post (admin can delete any post,and user can delete own posts)',
  })
  @ApiResponse({
    status: 200,
    description: 'Post deleted successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. post does not found or something went wrong.',
  })
  @ApiResponse({
    status: 401,
    description:
      'Unauthorized. The user is not authenticated and cannot delete a blog post.',
  })
  @ApiResponse({
    status: 500,
    description:
      'Internal Server Error. An unexpected error occurred on the server while processing the request.',
  })
  @Roles(UserRole.ADMIN, UserRole.USER)
  @Delete('/:id')
  public deletePosts(
    @Param('id', ParseIntPipe) id: number,
    @ActiveUser() user: IActiveUser,
  ) {
    return this.postsService.deletePost(id, user);
  }

  /**
   *  Routes for handle post updates by id
   * @param patchPostDTO - DTO for updates post
   * @param user - get current signed user from request.
   * @returns  - updated post
   */

  @ApiOperation({
    summary: 'Update a existing post.',
    description: 'Allows update the existing post for authenicated user.',
  })
  @ApiResponse({
    status: 200,
    description:
      'Post updated successfully. The response includes the updated post data.',
  })
  @ApiResponse({
    status: 400,
    description:
      'Bad Request. The input data does not meet validation requirements (e.g., missing required fields or invalid data format).',
  })
  @ApiResponse({
    status: 401,
    description:
      'Unauthorized. The user is not authenticated and cannot updated a blog post.',
  })
  @ApiResponse({
    status: 500,
    description:
      'Internal Server Error. An unexpected error occurred on the server while processing the request.',
  })
  @Patch()
  public async updatePost(
    @Body() patchPostDTO: PatchPostDTO,
    @ActiveUser() user: IActiveUser,
  ) {
    return this.postsService.updatePost(patchPostDTO, user);
  }
}
