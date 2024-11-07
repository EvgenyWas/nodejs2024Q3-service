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

import { FavsAlbumService } from './album.service';

@Controller('favs/album')
export class FavsAlbumController {
  constructor(private readonly favsAlbumService: FavsAlbumService) {}

  @Post(':id')
  @HttpCode(201)
  async create(@Param('id', ParseUUIDPipe) id: string) {
    const created = await this.favsAlbumService.create(id);
    if (!created) {
      throw new UnprocessableEntityException();
    }

    return created;
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    const deleted = await this.favsAlbumService.delete(id);
    if (!deleted) {
      throw new NotFoundException();
    }

    return deleted;
  }
}
