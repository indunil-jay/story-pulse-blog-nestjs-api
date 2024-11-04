import { Module } from '@nestjs/common';
import { TagsController } from './tags.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './tag.entity';
import { TagsService } from './tags.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [TagsController],
  imports: [TypeOrmModule.forFeature([Tag]), UsersModule],
  providers: [TagsService],
  exports: [TagsService],
})
export class TagsModule {}
