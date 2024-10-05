import { Module } from '@nestjs/common';
import { PaginationProvider } from './providers/pagination.provider';

/**
 * The `PaginationModule` is a  module that provides pagination functionality.
 * It encapsulates the logic related to pagination, making it reusable across different
 * parts of the application. This module exports the `PaginationProvider`, which can
 * be injected into other modules or services that require pagination capabilities.
 */
@Module({
  providers: [PaginationProvider],
  exports: [PaginationProvider],
})
export class PaginationModule {}
