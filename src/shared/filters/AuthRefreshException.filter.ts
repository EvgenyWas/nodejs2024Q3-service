import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(BadRequestException)
export class AuthRefreshExceptionFilter implements ExceptionFilter {
  catch(_: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(401).json(new UnauthorizedException());
  }
}
