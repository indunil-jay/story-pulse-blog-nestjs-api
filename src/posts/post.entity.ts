import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PostStatus } from './enums/postStatus.enum';
import { MetaData } from 'src/meta-data/meta-data.entity';
import { User } from 'src/users/user.entity';
import { Tag } from 'src/tags/tag.entity';

/**
 * Represents a blog post in the application.
 */
@Entity()
export class Post {
  /**
   * Unique identifier for each post.
   * @type {number}
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Title of the post.
   * @type {string}
   */
  @Column({
    type: 'varchar',
    length: 96,
    nullable: false,
  })
  title: string;

  /**
   * URL-friendly version of the title, must be unique.
   * @type {string}
   */
  @Column({
    type: 'varchar',
    length: 192,
    unique: true,
    nullable: false,
  })
  slug: string;

  /**
   * Current status of the post (draft, published, etc.).
   * @type {PostStatus}
   * @default {PostStatus.DRAFT}
   */
  @Column({
    type: 'enum',
    enum: PostStatus,
    default: PostStatus.DRAFT,
    nullable: false,
  })
  status: PostStatus;

  /**
   * Main content body of the post.
   * @type {string}
   */
  @Column({
    type: 'text',
    nullable: false,
  })
  content: string;

  /**
   * URL of the featured image for the post.
   * @type {string}
   * @nullable
   */
  @Column({
    type: 'varchar',
    length: 1024,
    nullable: true,
  })
  coverImageUrl?: string;

  /**
   * Timestamp for when the post was created.
   * @type {Date}
   */
  @CreateDateColumn()
  createdAt: Date;

  /**
   * Timestamp for when the post was last updated.
   * @type {Date}
   */
  @UpdateDateColumn()
  updatedAt: Date;

  /**
   * Date when the post was published.
   * @type {Date}
   * @nullable
   */
  @Column({
    type: 'timestamp',
    nullable: true,
  })
  publishedOn?: Date;

  /**
   * Optional metadata associated with the post.
   * @type {MetaData}
   * @relation OneToOne
   */
  @OneToOne(() => MetaData, (metaData) => metaData.post, {
    cascade: true, // Enables cascading operations for related metadata.
    eager: true, // Automatically load the metadata when a post is loaded.
  })
  metaDataOption: MetaData;

  /**
   * User who authored the post.
   * @type {User}
   * @relation ManyToOne
   */
  @ManyToOne(() => User, (user) => user.posts, { eager: true })
  author: User;

  /**
   * List of tags associated with the post.
   * @type {Tag[]}
   * @relation ManyToMany
   */
  @ManyToMany(() => Tag, (tag) => tag.posts, { eager: true })
  @JoinTable() // Creates a join table for the many-to-many relationship.
  tags?: Tag[];
}
