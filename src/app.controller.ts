import { Controller, Get } from '@nestjs/common';
import { Public } from './shared/decorators/auth/public';

@Controller()
export class AppController {
  @Public()
  @Get()
  async greeting() {
    return 'Hello World!';
  }
}
