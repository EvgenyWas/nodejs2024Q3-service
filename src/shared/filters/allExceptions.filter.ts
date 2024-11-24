import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

import { AppLogger } from 'src/logger/logger.service';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter<unknown> {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly logger: AppLogger,
  ) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const { url, method, body, query } = ctx.getRequest();
    const isHttpException = exception instanceof HttpException;
    const status = isHttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;
    const resBody = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: url,
      ...(isHttpException ? { message: exception.message } : {}),
    };
    const message = `${method} ${url} ${status} ${JSON.stringify(
      query,
    )} ${JSON.stringify(body)}`;

    this.logger.debug(message);
    this.httpAdapterHost.httpAdapter.reply(ctx.getResponse(), resBody, status);
  }
}
