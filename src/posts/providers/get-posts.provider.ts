import { PaginationProvider } from './../../common/pagination/providers/pagination.provider';
import { Injectable } from '@nestjs/common';
import { GetPostParamDTO } from '../DTOs/get-post-param.dto';
import { GetPostDTO } from '../DTOs/get.posts.dto';
import { Post } from '../post.entity';
import { IPaginated } from 'src/common/pagination/interfaces/paginated.interface';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GetPostsProvider {
  constructor(
    private readonly paginationProvider: PaginationProvider,

    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}
  public async findAllPosts(postQuery: GetPostDTO): Promise<IPaginated<Post>> {
    return await this.paginationProvider.paginateQuery(
      { limit: postQuery.limit, page: postQuery.page },
      this.postsRepository,
    );
  }
}
