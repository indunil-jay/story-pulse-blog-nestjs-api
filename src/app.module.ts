import { Module, Post } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagsModule } from './tags/tags.module';
import { MetaDataModule } from './meta-data/meta-data.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    PostsModule,
    TypeOrmModule.forRootAsync({
      imports: [],
      inject: [],
      useFactory: () => ({
        type: 'postgres',
        synchronize: true, //TODO: use only dev
        // entities: [Post],
        autoLoadEntities: true,
        port: 5432,
        username: 'postgres',
        password: 'root1122',
        host: 'localhost',
        database: 'story-pulse',
      }),
    }),
    TagsModule,
    MetaDataModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
