import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PostStatus } from './enums/postStatus.enum';
import { CreatePostDTO } from './DTOs/create-post.dto';
import { MetaData } from 'src/meta-data/meta-data.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: false,
  })
  title: string;

  @Column({
    type: 'varchar',
    length: 192,
    unique: true,
    nullable: false,
  })
  slug: string;

  @Column({
    type: 'enum',
    enum: PostStatus,
    default: PostStatus.DRAFT,
    nullable: false,
  })
  status: PostStatus;

  @Column({
    type: 'text',
    nullable: false,
  })
  content: string;

  @Column({
    type: 'varchar',
    length: 1024,
    nullable: true,
  })
  coverImageUrl?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  publishedOn?: Date;

  @OneToOne(() => MetaData, { cascade: true, eager: true })
  @JoinColumn()
  metaDataOption: MetaData;

  //   @Column()
  //   tags?: string[];

  //   @Column()
  //   categories?: string[];
}
