import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { GetPostDTO } from '../DTOs/get.posts.dto';
import { IPaginated } from 'src/common/pagination/interfaces/paginated.interface';

/**
 *  provider for containing business logic for getting posts.
 */
@Injectable()
export class GetPostsProvider {
  /**
   * Creates an instance with injected service
   *
   * @param {PaginationProvider} paginationProvider - inject pagination service
   * @param {Repository<Post>} postsRepository -  inject post repository which use to talk post table in database.
   */
  constructor(
    private readonly paginationProvider: PaginationProvider,
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}

  /**
   * Handles fetching of posts based on query parameters.
   * @param {GetPostDTO} postQuery - DTO containing limit, page, postId, and userId
   * @returns {Promise<IPaginated<Post>>} - Paginated or specific post(s)
   */
  public async findPosts(postQuery: GetPostDTO): Promise<IPaginated<Post>> {
    const { postId, userId, limit, page } = postQuery;

    // Scenario 1: If postId and userId are both provided, fetch a specific post for that user
    if (postId && userId) {
      const post = await this.postsRepository.findOne({
        where: { id: postId, author: { id: userId } },
      });
      if (!post) {
        throw new NotFoundException('Post not found for the given user');
      }
      return {
        data: [post],
        meta: { itemsPerPage: 1, totalItems: 1, currentPage: 1, totalPages: 1 },
        links: null, // Not paginated in this case
      };
    }

    // Scenario 2: If postId is provided, fetch post by ID
    if (postId) {
      const post = await this.postsRepository.findOne({
        where: { id: postId },
      });
      if (!post) {
        throw new NotFoundException('Post not found');
      }
      return {
        data: [post],
        meta: { itemsPerPage: 1, totalItems: 1, currentPage: 1, totalPages: 1 },
        links: null, // Not paginated in this case
      };
    }

    // Scenario 3: Fetch posts based on userId or all posts if neither is provided
    const queryBuilder = this.postsRepository.createQueryBuilder('post');
    if (userId) {
      queryBuilder.where('post.author = :userId', { userId });
    }
    // Apply pagination to the query
    return await this.paginationProvider.paginateQuery(
      { limit, page },
      queryBuilder,
    );
  }
}
