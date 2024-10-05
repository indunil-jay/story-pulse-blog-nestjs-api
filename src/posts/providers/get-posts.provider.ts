import { PaginationProvider } from './../../common/pagination/providers/pagination.provider';
import { Injectable } from '@nestjs/common';
import { GetPostDTO } from '../DTOs/get.posts.dto';
import { Post } from '../post.entity';
import { IPaginated } from 'src/common/pagination/interfaces/paginated.interface';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

/**
 * Provider responsible for fetching and paginating posts.
 */
@Injectable()
export class GetPostsProvider {
  /**
   * Creates an instance of `GetPostsProvider` with injected dependencies.
   *
   * @param {PaginationProvider} paginationProvider - Service for handling pagination logic.
   * @param {Repository<Post>} postsRepository - Repository to interact with the Post entity in the database.
   */
  constructor(
    private readonly paginationProvider: PaginationProvider,

    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}

  /**
   * Fetches all posts with pagination applied.
   * It delegates pagination logic to the `PaginationProvider` and queries the posts repository.
   *
   * @param {GetPostDTO} postQuery - Data transfer object containing query parameters for pagination (limit and page).
   * @returns {Promise<IPaginated<Post>>} - Paginated result of the posts.
   */
  public async findAllPosts(postQuery: GetPostDTO): Promise<IPaginated<Post>> {
    // Use the PaginationProvider to handle the pagination logic, passing the query parameters and repository.
    return await this.paginationProvider.paginateQuery(
      { limit: postQuery.limit, page: postQuery.page },
      this.postsRepository,
    );
  }
}
