import { PatchPostDTO } from './DTOs/patch-post.dto';
import { CreatePostDTO } from './DTOs/create-post.dto';
import { Repository } from 'typeorm';
import { GetPostParamDTO } from './DTOs/get-post-param.dto';
import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { Post } from './post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { TagsService } from 'src/tags/tags.service';
import { Tag } from 'src/tags/tag.entity';
import { GetPostDTO } from './DTOs/get.posts.dto';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { IPaginated } from 'src/common/pagination/interfaces/paginated.interface';

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

    private readonly paginationProvider: PaginationProvider,
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

  /** TODO:
   * update a blog post
   */

  public async updatePost(patchPostDTO: PatchPostDTO) {
    let post: Post | undefined = undefined;
    //Find the post
    try {
      post = await this.postsRepository.findOneBy({ id: patchPostDTO.id });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later.',
        { description: 'error connecting to the database.' },
      );
    }

    if (!post) {
      throw new BadRequestException('There is a no post with that ID.');
    }

    //Update post
    post.title = patchPostDTO.title ?? post.title;
    post.content = patchPostDTO.content ?? post.content;
    post.status = patchPostDTO.status ?? post.status;
    post.slug = patchPostDTO.slug ?? post.slug;
    post.publishedOn = patchPostDTO.publishedOn ?? post.publishedOn;
    post.coverImageUrl = patchPostDTO.coverImageUrl ?? post.coverImageUrl;

    let tags: Tag[] | [] = [];
    try {
      if (patchPostDTO.tags) {
        tags = await this.tagsService.findTags(patchPostDTO.tags);
        post.tags = tags;
      }
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later.',
        { description: 'error connecting to the database.' },
      );
    }

    if (!tags || tags.length !== patchPostDTO.tags.length) {
      throw new BadRequestException(
        'Please check yoyr tags IDs and ensure they are correct.',
      );
    }

    try {
      post = await this.postsRepository.save(post);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later.',
        { description: 'error connecting to the database.' },
      );
    }

    return post;
  }
}
