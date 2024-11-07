import {
  Controller,
  Delete,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';

import { FavsTrackService } from './track.service';

@Controller('favs/track')
export class FavsTrackController {
  constructor(private readonly favsTrackService: FavsTrackService) {}

  @Post(':id')
  @HttpCode(201)
  async create(@Param('id', ParseUUIDPipe) id: string) {
    const created = await this.favsTrackService.create(id);
    if (!created) {
      throw new UnprocessableEntityException();
    }

    return created;
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    const deleted = await this.favsTrackService.delete(id);
    if (!deleted) {
      throw new NotFoundException();
    }

    return deleted;
  }
}
