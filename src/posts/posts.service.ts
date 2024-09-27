import { GetPostParamDTO } from './DTOs/get-post-param.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PostsService {
  public findPosts(
    getPostParamDTO: GetPostParamDTO,
    limit: number,
    page: number,
  ) {
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
}
