import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { PostStatus } from './enums/postStatus.enum';

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

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  createdAt?: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  updatedAt?: Date;

  //   @Column()
  //   tags?: string[];

  //   @Column()
  //   categories?: string[];
}
