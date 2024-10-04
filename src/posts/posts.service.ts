import { UpdatePostProvider } from './providers/update-post.provider';
import { DeletePostProvider } from './providers/delete-post.provider';
import { CreatePostProvider } from './providers/create-post.provider';
import { PatchPostDTO } from './DTOs/patch-post.dto';
import { CreatePostDTO } from './DTOs/create-post.dto';
import { Repository } from 'typeorm';
import { GetPostParamDTO } from './DTOs/get-post-param.dto';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { Post } from './post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TagsService } from 'src/tags/tags.service';
import { Tag } from 'src/tags/tag.entity';
import { GetPostDTO } from './DTOs/get.posts.dto';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { IPaginated } from 'src/common/pagination/interfaces/paginated.interface';
import { IActiveUser } from 'src/auth/interfaces/active-user.interface';

/**
 * Service to connect to the users table and perform business operations related to posts.
 */
@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,

    private readonly tagsService: TagsService,

    private readonly paginationProvider: PaginationProvider,

    private readonly createPostProvider: CreatePostProvider,

    private readonly deletePostProvider: DeletePostProvider,

    private readonly updatePostProvider: UpdatePostProvider,
  ) {}

  /** TODO:
   * Fetches a list of posts based on the provided parameters.
   *
   */
  public async findPosts(
    getPostParamDTO: GetPostParamDTO,
    postQuery: GetPostDTO,
  ): Promise<IPaginated<Post>> {
    return await this.paginationProvider.paginateQuery(
      { limit: postQuery.limit, page: postQuery.page },
      this.postsRepository,
    );
  }

  /**
   * creates a new blog post method delegated to the `createPostProvider`.
   */
  public async createPost(
    createPostDTO: CreatePostDTO,
    user: IActiveUser,
  ): Promise<Post> {
    return await this.createPostProvider.createPost(createPostDTO, user);
  }

  /**
   * Delete a post based on a id and user roles method delegated to `the deletePostProvider`.
   * USER.ADMIN can delete any post
   * USER.USER can delete own post
   */
  public async deletePost(id: number, user: IActiveUser) {
    return await this.deletePostProvider.deletePost(id, user);
  }

  /**
   * update a blog post method delegated to `the updatedPostProvider`
   * post's author can update thier own
   */

  public async updatePost(
    patchPostDTO: PatchPostDTO,
    user: IActiveUser,
  ): Promise<Post> {
    return await this.updatePostProvider.updatePost(patchPostDTO, user);
  }
}
