export interface IPaginated<T> {
  data: T[];
  meta: {
    itemsPerPage: number;
    totalItems: number;
    currentPage: number;
    totalPages: number;
  };

  links: {
    first: string;
    last: string;
    next: string;
    prev: string;
    current: string;
  };
}
