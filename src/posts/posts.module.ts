import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { MetaData } from 'src/meta-data/meta-data.entity';
import { UsersModule } from 'src/users/users.module';
import { TagsModule } from 'src/tags/tags.module';
import { PaginationModule } from 'src/common/pagination/pagination.module';
import { CreatePostProvider } from './providers/create-post.provider';
import { DeletePostProvider } from './providers/delete-post.provider';
import { UpdatePostProvider } from './providers/update-post.provider';
import { GetPostsProvider } from './providers/get-posts.provider';

@Module({
  controllers: [PostsController],
  providers: [
    PostsService,
    CreatePostProvider,
    DeletePostProvider,
    UpdatePostProvider,
    GetPostsProvider,
  ],
  imports: [
    TypeOrmModule.forFeature([Post, MetaData]),
    UsersModule,
    TagsModule,
    PaginationModule,
    UsersModule,
  ],
})
export class PostsModule {}
