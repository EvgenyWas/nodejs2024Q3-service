import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

import { AppLogger } from 'src/logger/logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: AppLogger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const ctx = context.switchToHttp();
    const { url, body, query, method } = ctx.getRequest();
    const { statusCode } = ctx.getResponse();
    const message = `${method} ${url} ${statusCode} ${JSON.stringify(
      query,
    )} ${JSON.stringify(body)}`;

    return next
      .handle()
      .pipe(tap(() => this.logger.log(message, context.getClass().name)));
  }
}
