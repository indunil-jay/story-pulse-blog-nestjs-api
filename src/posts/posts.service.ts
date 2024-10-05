import { FindPostByIdProvider } from './providers/find-post-by-id.provider';
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
import { IPaginated } from 'src/common/pagination/interfaces/paginated.interface';

/**
 * Service responsible for orchestrating all business operations related to posts.
 * It delegates the actual business logic to respective providers.
 */
@Injectable()
export class PostsService {
  /**
   * Constructs an instance of PostsService with dependencies injected.
   *
   * @param {CreatePostProvider} createPostProvider - Provider responsible for creating new posts.
   * @param {DeletePostProvider} deletePostProvider - Provider responsible for deleting posts.
   * @param {UpdatePostProvider} updatePostProvider - Provider responsible for updating existing posts.
   * @param {GetPostsProvider} getPostsProvider - Provider responsible for fetching multiple posts.
   * @param {FindPostByIdProvider} findPostByIdProvider - Provider responsible for finding a specific post by ID.
   */
  constructor(
    private readonly createPostProvider: CreatePostProvider,

    private readonly deletePostProvider: DeletePostProvider,

    private readonly updatePostProvider: UpdatePostProvider,

    private readonly getPostsProvider: GetPostsProvider,

    private readonly findPostByIdProvider: FindPostByIdProvider,
  ) {}

  /**
   * Fetches all posts from the database based on the provided query.
   * This method delegates its functionality to the `GetPostsProvider`.
   *
   * @param {GetPostDTO} postQuery - Query parameters used to filter the posts.
   * @returns {Promise<Post[]>} - A list of posts matching the query.
   */
  public async findAllPosts(postQuery: GetPostDTO): Promise<IPaginated<Post>> {
    return await this.getPostsProvider.findAllPosts(postQuery);
  }

  /**
   * Retrieves a single post by its ID.
   * This method delegates its functionality to the `FindPostByIdProvider`.
   *
   * @param {number} id - The ID of the post to retrieve.
   * @returns {Promise<Post>} - The post found, or an error if it doesn't exist.
   */
  public async findPostById(id: number): Promise<Post> {
    return await this.findPostByIdProvider.findPostById(id);
  }

  /**
   * Creates a new post in the database.
   * This method delegates the creation logic to the `CreatePostProvider`.
   *
   * @param {CreatePostDTO} createPostDTO - Data Transfer Object containing post details.
   * @param {IActiveUser} user - The user creating the post.
   * @returns {Promise<Post>} - The newly created post.
   */
  public async createPost(
    createPostDTO: CreatePostDTO,
    user: IActiveUser,
  ): Promise<Post> {
    return await this.createPostProvider.createPost(createPostDTO, user);
  }

  /**
   * Deletes a post from the database based on its ID and user role.
   * - Admin users can delete any post.
   * - Regular users can only delete their own posts.
   * This method delegates the deletion logic to the `DeletePostProvider`.
   *
   * @param {number} id - The ID of the post to delete.
   * @param {IActiveUser} user - The active user attempting to delete the post.
   * @returns  - Indicates successful deletion, or throws an error.
   */
  public async deletePost(id: number, user: IActiveUser) {
    return await this.deletePostProvider.deletePost(id, user);
  }

  /**
   * Updates an existing post in the database.
   * Only the author of the post is allowed to update it.
   * This method delegates the update logic to the `UpdatePostProvider`.
   *
   * @param {PatchPostDTO} patchPostDTO - Data Transfer Object containing the updated post details.
   * @param {IActiveUser} user - The active user attempting to update the post.
   * @returns {Promise<Post>} - The updated post.
   */
  public async updatePost(
    patchPostDTO: PatchPostDTO,
    user: IActiveUser,
  ): Promise<Post> {
    return await this.updatePostProvider.updatePost(patchPostDTO, user);
  }
}
