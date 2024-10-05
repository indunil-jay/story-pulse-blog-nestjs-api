/**
 * The `IPaginated<T>` interface defines the structure for a paginated response
 * containing a collection of items of type `T`. It includes metadata about the
 * pagination state and links for navigation between pages.
 *
 * @template T - The type of items contained in the paginated response.
 */
export interface IPaginated<T> {
  /**
   * An array of items of type `T` representing the current page of results.
   */
  data: T[];

  /**
   * Metadata about the pagination state.
   */
  meta: {
    /**
     * The number of items per page.
     */
    itemsPerPage: number;

    /**
     * The total number of items across all pages.
     */
    totalItems: number;

    /**
     * The current page number.
     */
    currentPage: number;

    /**
     * The total number of pages available based on the total items and items per page.
     */
    totalPages: number;
  };

  /**
   * Links for navigating through the paginated results.
   */
  links: {
    /**
     * The URL for the first page of results.
     */
    first: string;

    /**
     * The URL for the last page of results.
     */
    last: string;

    /**
     * The URL for the next page of results.
     */
    next: string;

    /**
     * The URL for the previous page of results.
     */
    prev: string;

    /**
     * The URL for the current page of results.
     */
    current: string;
  };
}
