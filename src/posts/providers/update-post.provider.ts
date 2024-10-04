import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { TagsService } from 'src/tags/tags.service';
import { PatchPostDTO } from '../DTOs/patch-post.dto';
import { Tag } from 'src/tags/tag.entity';
import { IActiveUser } from 'src/auth/interfaces/active-user.interface';

/**
 *  Provider for handle post update business-logic
 */

@Injectable()
export class UpdatePostProvider {
  /**
   * Creates an instance of `UpdatePostProvider`  with injected service dependecies.
   *
   * @param {Repository<Post>} postsRepository - Repository for  communiate with post table in database.
   * @param {TagsService} tagsService - inject tag service for interact with tag releted services.
   */
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    private readonly tagsService: TagsService,
  ) {}

  /**
   *
   * @param  {PatchPostDTO} patchPostDTO - data transfer object for update the post
   * @returns {Promise<Post>} - returns  the updated post
   */
  public async updatePost(
    patchPostDTO: PatchPostDTO,
    user: IActiveUser,
  ): Promise<Post> {
    console.log('PROVIDER', patchPostDTO);
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

    //check signed user and post.author.id equals
    if (user.sub !== post.author.id) {
      throw new ForbiddenException('You can only updates your own posts');
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

    let tags: Tag[] | undefined = undefined;
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

    if (tags !== undefined && tags.length !== patchPostDTO.tags.length) {
      throw new BadRequestException(
        'Please check your tags IDs and ensure they are correct.',
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
