import { Inject, Injectable, RequestTimeoutException } from '@nestjs/common';
import { PaginationQueryDTO } from '../DTOs/pagination.query.dto';
import { ObjectLiteral, Repository, SelectQueryBuilder } from 'typeorm';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import { IPaginated } from '../interfaces/paginated.interface';

/**
 * Provider responsible for handling pagination logic for queries.
 * It generates paginated results, request URLs, and metadata.
 */
@Injectable()
export class PaginationProvider {
  /**
   * Creates an instance of `PaginationProvider` with injected dependencies.
   *
   * @param {Request} request - Express request object, injected to handle URL generation.
   */
  constructor(
    @Inject(REQUEST)
    private readonly request: Request,
  ) {}

  /**
   * Paginates a query based on the provided pagination parameters and either a repository or a query builder.
   *
   * @template T - The entity type being paginated.
   * @param {PaginationQueryDTO} paginationQuery - Contains limit and page number for pagination.
   * @param {Repository<T> | SelectQueryBuilder<T>} repositoryOrQueryBuilder - Either TypeORM repository or query builder.
   * @returns {Promise<IPaginated<T>>} - A promise that resolves to a paginated response with data, metadata, and links.
   * @throws {RequestTimeoutException} - If a database query fails due to a timeout or connection issue.
   */
  public async paginateQuery<T extends ObjectLiteral>(
    paginationQuery: PaginationQueryDTO,
    repositoryOrQueryBuilder: Repository<T> | SelectQueryBuilder<T>,
  ): Promise<IPaginated<T>> {
    let results: T[] | undefined;

    // If it's a QueryBuilder, execute it
    if (repositoryOrQueryBuilder instanceof SelectQueryBuilder) {
      try {
        results = await repositoryOrQueryBuilder
          .skip((paginationQuery.page - 1) * paginationQuery.limit)
          .take(paginationQuery.limit)
          .getMany();
      } catch (error) {
        throw new RequestTimeoutException(
          'Unable to fetch paginated results at this time. Please try again later.',
        );
      }
    } else {
      // Otherwise, it's a Repository
      try {
        results = await repositoryOrQueryBuilder.find({
          skip: (paginationQuery.page - 1) * paginationQuery.limit,
          take: paginationQuery.limit,
        });
      } catch (error) {
        throw new RequestTimeoutException(
          'Unable to fetch paginated results at this time. Please try again later.',
        );
      }
    }

    // Calculate total items and total pages
    let totalItems: number;
    try {
      totalItems =
        repositoryOrQueryBuilder instanceof SelectQueryBuilder
          ? await repositoryOrQueryBuilder.getCount()
          : await repositoryOrQueryBuilder.count();
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to count total items. Please try again later.',
      );
    }

    const totalPages = Math.ceil(totalItems / paginationQuery.limit);

    // Set next and previous page numbers
    const nextPage =
      paginationQuery.page >= totalPages
        ? totalPages
        : paginationQuery.page + 1;
    const prevPage = paginationQuery.page <= 1 ? 1 : paginationQuery.page - 1;

    // Construct request URL for pagination links
    const baseURL =
      this.request.protocol + '://' + this.request.headers.host + '/';
    const newURL = new URL(this.request.url, baseURL);

    // Create paginated response
    const paginatedResponse: IPaginated<T> = {
      data: results,
      meta: {
        itemsPerPage: paginationQuery.limit,
        totalItems: totalItems,
        currentPage: paginationQuery.page,
        totalPages: totalPages,
      },
      links: {
        first: `${newURL.origin}${newURL.pathname}?limit=${paginationQuery.limit}&page=1`,
        last: `${newURL.origin}${newURL.pathname}?limit=${paginationQuery.limit}&page=${totalPages}`,
        current: `${newURL.origin}${newURL.pathname}?limit=${paginationQuery.limit}&page=${paginationQuery.page}`,
        next: `${newURL.origin}${newURL.pathname}?limit=${paginationQuery.limit}&page=${nextPage}`,
        prev: `${newURL.origin}${newURL.pathname}?limit=${paginationQuery.limit}&page=${prevPage}`,
      },
    };

    return paginatedResponse;
  }
}
