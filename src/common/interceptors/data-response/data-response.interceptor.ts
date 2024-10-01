import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { map, Observable } from 'rxjs';

/**
 * This Interceptor responsible for wrapping all responses with additional metadata,
 */
@Injectable()
export class DataResponseInterceptor implements NestInterceptor {
  /**
   * Creates an instance of DataResponseInterceptor.
   *
   * @param {ConfigService} configService - The service used to access configuration values.
   */
  constructor(private readonly configService: ConfigService) {}

  /**
   * Intercepts the response from the controller and appends additional metadata
   *
   * @param {ExecutionContext} context - The execution context of the request.
   * @param {CallHandler} next - The next handler in the request pipeline.
   * @returns {Observable<any>} An observable of the modified response.
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => ({
        apiVersion: this.configService.get('appConfig.apiVersion'),
        data: data,
      })),
    );
  }
}
