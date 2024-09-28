import { CreatePostDTO } from './DTOs/create-post.dto';
import { Repository } from 'typeorm';
import { GetPostParamDTO } from './DTOs/get-post-param.dto';
import { Injectable } from '@nestjs/common';
import { Post } from './post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { TagsService } from 'src/tags/tags.service';

/**
 * Service to connect to the users table and perform business operations related to posts.
 */
@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,

    private readonly usersService: UsersService,

    private readonly tagsService: TagsService,
  ) {}

  /** TODO:
   * Fetches a list of posts based on the provided parameters.
   *
   * @param {GetPostParamDTO} getPostParamDTO - Data transfer object for post parameters.
   * @param {number} limit - The number of posts to retrieve per page.
   * @param {number} page - The page number for paginated results.
   *
   */
  public async findPosts(
    getPostParamDTO: GetPostParamDTO,
    limit: number,
    page: number,
  ) {
    return await this.postsRepository.find({
      relations: {
        author: true,
        metaDataOption: true,
      },
    });
  }

  /** TODO:
   * creates a new blog post
   */
  public async createPost(createPostDTO: CreatePostDTO) {
    const currentAuthor = await this.usersService.findOneById(
      createPostDTO.authorId,
    );

    //find tags
    const tags = await this.tagsService.findTags(createPostDTO.tags);

    const post = this.postsRepository.create({
      ...createPostDTO,
      author: currentAuthor,
      tags,
    });
    return await this.postsRepository.save(post);
  }

  /** TODO:
   * delete a blog post by id
   */
  public async deletePost(id: number) {
    return await this.postsRepository.delete({ id });
  }
}
