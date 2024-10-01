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

@Injectable()
export class CreatePostProvider {
  constructor(
    private readonly usersService: UsersService,

    private readonly tagsService: TagsService,

    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}

  public async createPost(createPostDTO: CreatePostDTO, user: IActiveUser) {
    let author: User | undefined = undefined;
    try {
      author = await this.usersService.findOneById(user.sub);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later.',
        { description: 'error connecting to the database.' },
      );
    }

    if (!author) {
      throw new UnauthorizedException('the user does not exists.');
    }

    //find tags
    let tags: Tag[] | [] = [];

    try {
      tags = await this.tagsService.findTags(createPostDTO.tags);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later.',
        { description: 'error connecting to the database.' },
      );
    }

    if (tags.length !== createPostDTO.tags.length || !tags) {
      throw new ConflictException('Please check the request tag IDs.');
    }
    const post = this.postsRepository.create({
      ...createPostDTO,
      author,
      tags,
    });

    try {
      return await this.postsRepository.save(post);
    } catch (error) {
      throw new ConflictException(error, {
        description: 'Ensure post slug is unique and not duplicate.',
      });
    }
  }
}
