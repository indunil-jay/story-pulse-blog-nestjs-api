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
 * Service responsible for handling the business logic of updating posts.
 */
@Injectable()
export class UpdatePostProvider {
  /**
   * Constructor to inject necessary dependencies for post update logic.
   *
   * @param {Repository<Post>} postsRepository - TypeORM repository for managing `Post` entity database operations.
   * @param {TagsService} tagsService - Service to handle tag-related operations like fetching and validating tags.
   */
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    private readonly tagsService: TagsService,
  ) {}

  /**
   * Updates a post based on the provided data and the authenticated user's identity.
   *
   * @param {PatchPostDTO} patchPostDTO - Data Transfer Object containing the updated post fields (title, content, etc.).
   * @param {IActiveUser} user - Authenticated user's details, with `sub` representing the user ID.
   *
   * @throws {RequestTimeoutException} If there's a connection issue with the database during fetching or saving operations.
   * @throws {ForbiddenException} If the authenticated user is not the author of the post.
   * @throws {BadRequestException} If the post does not exist or if there is an issue with the provided tags.
   *
   * @returns {Promise<Post>} The updated post entity after successful update and save.
   */
  public async updatePost(
    patchPostDTO: PatchPostDTO,
    user: IActiveUser,
  ): Promise<Post> {
    let post: Post | undefined = undefined;

    // Fetch the post by ID from the database
    try {
      post = await this.postsRepository.findOneBy({ id: patchPostDTO.id });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment. Please try again later.',
        {
          description:
            'Error connecting to the database while fetching the post.',
        },
      );
    }

    // Check if the post exists
    if (!post) {
      throw new BadRequestException('No post found with the provided ID.');
    }

    // Ensure the user is the author of the post
    if (user.sub !== post.author.id) {
      throw new ForbiddenException('You can only update your own posts.');
    }

    // Update post fields, using existing values if new ones are not provided
    post.title = patchPostDTO.title ?? post.title;
    post.content = patchPostDTO.content ?? post.content;
    post.status = patchPostDTO.status ?? post.status;
    post.slug = patchPostDTO.slug ?? post.slug;
    post.publishedOn = patchPostDTO.publishedOn ?? post.publishedOn;
    post.coverImageUrl = patchPostDTO.coverImageUrl ?? post.coverImageUrl;

    // Fetch and validate tags, if provided
    let tags: Tag[] | undefined = undefined;
    if (patchPostDTO.tags) {
      try {
        tags = await this.tagsService.findTags(patchPostDTO.tags);
        post.tags = tags;
      } catch (error) {
        throw new RequestTimeoutException(
          'Unable to process your request at the moment. Please try again later.',
          {
            description:
              'Error connecting to the database while fetching tags.',
          },
        );
      }

      // Ensure the correct number of tags are found
      if (tags.length !== patchPostDTO.tags.length) {
        throw new BadRequestException(
          'Invalid tag IDs provided. Please check and try again.',
        );
      }
    }

    // Save the updated post in the database
    try {
      post = await this.postsRepository.save(post);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment. Please try again later.',
        { description: 'Error saving the updated post to the database.' },
      );
    }

    return post;
  }
}
