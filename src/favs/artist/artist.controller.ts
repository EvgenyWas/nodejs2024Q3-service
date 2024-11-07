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

import { FavsArtistService } from './artist.service';

@Controller('favs/artist')
export class FavsArtistController {
  constructor(private readonly favsArtistService: FavsArtistService) {}

  @Post(':id')
  @HttpCode(201)
  async create(@Param('id', ParseUUIDPipe) id: string) {
    const created = await this.favsArtistService.create(id);
    if (!created) {
      throw new UnprocessableEntityException();
    }

    return created;
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    const deleted = await this.favsArtistService.delete(id);
    if (!deleted) {
      throw new NotFoundException();
    }

    return deleted;
  }
}
