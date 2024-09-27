import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { MetaData } from 'src/meta-data/meta-data.entity';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [TypeOrmModule.forFeature([Post, MetaData])],
})
export class PostsModule {}
