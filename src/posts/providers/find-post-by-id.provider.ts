import {
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';

/**
 * Provider responsible for finding a post by its ID.
 */
@Injectable()
export class FindPostByIdProvider {
  /**
   * Creates an instance of `FindPostByIdProvider` with the injected Post repository.
   *
   * @param {Repository<Post>} postRepository - The repository for interacting with the Post entity in the database.
   */
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  /**
   * Finds a post by its ID from the database.
   *
   * @param {number} id - The ID of the post to find.
   *  @throws {NotFoundException} -If the post is not found
   *  @throws {RequestTimeoutException}    - case of a database access failure
   * @returns {Promise<Post>} - The post found, or throws an error if not found.
   */
  public async findPostById(id: number): Promise<Post> {
    let post: Post | undefined = undefined;

    // Attempt to find the post in the database by its ID.
    try {
      post = await this.postRepository.findOne({ where: { id } });
    } catch (error) {
      // If there's an issue with the database connection, throw a timeout exception.
      throw new RequestTimeoutException(
        'Database is temporarily unavailable. Please try again later.',
      );
    }

    // If no post is found, throw a not found exception.
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found.`);
    }

    // Return the found post.
    return post;
  }
}
