import { CreatePostDTO } from './DTOs/create-post.dto';
import { Repository } from 'typeorm';
import { GetPostParamDTO } from './DTOs/get-post-param.dto';
import { Injectable } from '@nestjs/common';
import { Post } from './post.entity';
import { InjectRepository } from '@nestjs/typeorm';

/**
 * Service to connect to the users table and perform business operations related to posts.
 */
@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}

  /** TODO:
   * Fetches a list of posts based on the provided parameters.
   *
   * @param {GetPostParamDTO} getPostParamDTO - Data transfer object for post parameters.
   * @param {number} limit - The number of posts to retrieve per page.
   * @param {number} page - The page number for paginated results.
   * @returns {Array<CreatePostDTO>|CreatePostDTO} An array of posts or if id provided the one post.
   */
  public findPosts(
    getPostParamDTO: GetPostParamDTO,
    limit: number,
    page: number,
  ): Array<object> {
    const postArray = [
      {
        id: 1,
        title: 'test-post-1',
        content: 'content of post -1',
        coverImageUrl: 'http://some/test.jpg',
      },
      {
        id: 2,
        title: 'test-post-2',
        content: 'content of post -2',
        coverImageUrl: 'http://some/test2.jpg',
      },
    ];

    return postArray;
  }

  public async createPost(createPostDTO: CreatePostDTO) {
    const post = this.postsRepository.create(createPostDTO);
    return await this.postsRepository.save(post);
  }
}
