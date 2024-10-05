import { Post } from 'src/posts/post.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * The `MetaData` entity represents the metadata associated with a post.
 */
@Entity()
export class MetaData {
  /**
   * Unique identifier for the metadata entry.
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * The value of the metadata, stored as JSON.
   * It is a required field and cannot be null.
   */
  @Column({
    type: 'json',
    nullable: false,
  })
  metaValue: string;

  /**
   * Timestamp indicating when the metadata entry was created.
   */
  @CreateDateColumn()
  createdAt: Date;

  /**
   * Timestamp indicating the last time the metadata entry was updated.
   */
  @UpdateDateColumn()
  updatedAt: Date;

  /**
   * One-to-one relationship with the `Post` entity.
   * This establishes a connection between the metadata and a specific post.
   * If the associated post is deleted, this metadata entry will also be deleted.
   */
  @OneToOne(() => Post, (post) => post.metaDataOption, { onDelete: 'CASCADE' })
  @JoinColumn()
  post: Post;
}
