import { Module } from '@nestjs/common';
import { TagsController } from './tags.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './tag.entity';
import { TagsService } from './tags.service';
import { UsersModule } from 'src/users/users.module';
import { GetAllTagProvider } from './providers/get-all-tag.provider';
import { CreateTagProvider } from './providers/create-tag.provider';
import { DeleteTagProvider } from './providers/delete-tag.provider';

@Module({
  controllers: [TagsController],
  imports: [TypeOrmModule.forFeature([Tag]), UsersModule],
  providers: [TagsService, GetAllTagProvider, CreateTagProvider, DeleteTagProvider],
  exports: [TagsService],
})
export class TagsModule {}
