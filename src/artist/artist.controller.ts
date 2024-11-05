import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';

import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  @HttpCode(201)
  create(@Body() dto: CreateArtistDto) {
    return this.artistService.create(dto);
  }

  @Get()
  findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const artist = await this.artistService.findOne(id);
    if (!artist) {
      throw new NotFoundException();
    }

    return artist;
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateArtistDto,
  ) {
    const updated = await this.artistService.update(id, dto);
    if (!updated) {
      throw new NotFoundException();
    }

    return updated;
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    const deleted = await this.artistService.delete(id);
    if (!deleted) {
      throw new NotFoundException();
    }

    return;
  }
}
