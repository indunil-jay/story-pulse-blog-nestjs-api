import { UsersService } from 'src/users/users.service';
import {
  ConflictException,
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreatePostDTO } from '../DTOs/create-post.dto';
import { TagsService } from 'src/tags/tags.service';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IActiveUser } from 'src/auth/interfaces/active-user.interface';
import { User } from 'src/users/user.entity';
import { Tag } from 'src/tags/tag.entity';

/**
 * Service responsible for handling the business logic of post creation.
 */
@Injectable()
export class CreatePostProvider {
  /**
   * Constructor that injects required service dependencies.
   *
   * @param {UsersService} usersService - Service to handle user-related operations.
   * @param {TagsService} tagsService - Service to handle tag-related operations.
   * @param {Repository<Post>} postsRepository - TypeORM repository for managing `Post` entity database operations.
   */
  constructor(
    private readonly usersService: UsersService,
    private readonly tagsService: TagsService,

    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}

  /**
   * method responsible for creating a new post.
   *
   * @param {CreatePostDTO} createPostDTO - DTO containing the necessary information to create a post.
   * @param {IActiveUser} user - Authenticated user's details passed as `IActiveUser`, containing the `sub` field (user ID).
   *
   * @throws {RequestTimeoutException} When a service dependency (e.g., user or tags lookup) fails due to connectivity issues.
   * @throws {UnauthorizedException} When the user ID is invalid, or the user is not found in the system.
   * @throws {ConflictException} When the provided tag IDs are invalid or when the post slug is not unique.
   *
   * @returns {Promise<Post>} The newly created `Post` entity saved in the database.
   */
  public async createPost(
    createPostDTO: CreatePostDTO,
    user: IActiveUser,
  ): Promise<Post> {
    let author: User | undefined = undefined;

    // Fetch the author (user) associated with the current request
    try {
      author = await this.usersService.findOneById(user.sub);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment. Please try again later.',
        { description: 'Error connecting to the user service or database.' },
      );
    }

    // Ensure that the user exists and is authorized to create the post
    if (!author) {
      throw new UnauthorizedException('The user does not exist.');
    }

    // Fetch and validate tags associated with the post creation request
    let tags: Tag[] = [];
    try {
      tags = await this.tagsService.findTags(createPostDTO.tags);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment. Please try again later.',
        { description: 'Error connecting to the tags service or database.' },
      );
    }

    // Ensure that all requested tags are valid and exist in the database
    if (!tags || tags.length !== createPostDTO.tags.length) {
      throw new ConflictException(
        'Invalid tag IDs. Please check the provided tags and try again.',
      );
    }

    // Construct the new post entity with the validated author and tags
    const post = this.postsRepository.create({
      ...createPostDTO,
      author,
      tags,
    });

    // Attempt to save the new post to the database and handle potential conflicts
    try {
      return await this.postsRepository.save(post);
    } catch (error) {
      throw new ConflictException(
        'Post creation failed. Ensure the post slug is unique and not duplicated.',
        {
          description:
            'Database conflict during post creation. Likely a duplicate slug or other unique field.',
        },
      );
    }
  }
}
