import { GetPostsProvider } from './providers/get-posts.provider';
import { UpdatePostProvider } from './providers/update-post.provider';
import { DeletePostProvider } from './providers/delete-post.provider';
import { CreatePostProvider } from './providers/create-post.provider';
import { PatchPostDTO } from './DTOs/patch-post.dto';
import { GetPostParamDTO } from './DTOs/get-post-param.dto';
import { Injectable } from '@nestjs/common';
import { Post } from './post.entity';
import { GetPostDTO } from './DTOs/get.posts.dto';
import { IActiveUser } from 'src/auth/interfaces/active-user.interface';
import { CreatePostDTO } from './DTOs/create-post.dto';

/**
 * Service to connect to the users table and perform business operations related to posts.
 */
@Injectable()
export class PostsService {
  constructor(
    private readonly createPostProvider: CreatePostProvider,

    private readonly deletePostProvider: DeletePostProvider,

    private readonly updatePostProvider: UpdatePostProvider,

    private readonly getPostsProvider: GetPostsProvider,
  ) {}

  /**
   * Fetches all post in database.
   *
   */
  public async findAllPosts(postQuery: GetPostDTO) {
    return await this.getPostsProvider.findAllPosts(postQuery);
  }

  /**
   * Fetches all post in database.
   *
   */

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
