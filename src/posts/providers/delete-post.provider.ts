import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IActiveUser } from 'src/auth/interfaces/active-user.interface';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { UserRole } from 'src/users/enums/users.roles.enum';

/**
 * Contains the posts delete business-logic
 */
@Injectable()
export class DeletePostProvider {
  /**
   *
   * @param  {UsersService} usersService - injects the user service for access user related operations
   * @param {Repository<Post>} postsRepository - injects repository for  interact with post table in database.
   */
  constructor(
    private readonly usersService: UsersService,

    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}

  /**
   *
   * @param {number} id - post's id for which  going to delete.
   * @param {IActiveUser} user - user interface for access user's email and sub from request.
   * @returns
   */
  public async deletePost(id: number, user: IActiveUser) {
    //Get post by Id
    const post = await this.postsRepository.findOneBy({ id });

    //Get user by email
    const loggedUser = await this.usersService.findOneByEmail(user.email);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    // Allow admin to delete any post
    if (loggedUser.role !== UserRole.ADMIN) {
      // If the user is not an admin, check if they are the owner
      if (post.author.id !== loggedUser.id) {
        throw new ForbiddenException('You can only delete your own posts');
      }
    }

    return this.postsRepository.delete(id);
  }
}
