/**
 * Enum for defining the status of a blog post.
 * This enum includes various states a post can be in during its lifecycle.
 */
export enum PostStatus {
  /**
   * The post is in draft mode and not yet published.
   */
  DRAFT = 'draft',

  /**
   * The post is scheduled for future publication.
   */
  SCHEDULED = 'scheduled',

  /**
   * The post has been reviewed and is awaiting approval.
   */
  REVIEWED = 'reviewed',

  /**
   * The post has been published and is visible to the public.
   */
  PUBLISHED = 'published',

  /**
   * The post is pending some action, such as review or approval.
   */
  PENDING = 'pending',
}
