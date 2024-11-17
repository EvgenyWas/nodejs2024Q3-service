import { Injectable } from '@nestjs/common';

import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { DbService } from 'src/db/db.service';

@Injectable()
export class ArtistService {
  constructor(private db: DbService) {}

  create(data: CreateArtistDto) {
    return this.db.artist.create({ data });
  }

  findAll() {
    return this.db.artist.findMany();
  }

  findOne(id: string) {
    return this.db.artist.findUnique({ where: { id } });
  }

  async update(id: string, data: UpdateArtistDto) {
    try {
      const artist = await this.db.artist.update({ where: { id }, data });

      return artist;
    } catch (error) {
      return null;
    }
  }

  async delete(id: string) {
    try {
      await this.db.artist.delete({ where: { id } });

      return true;
    } catch (error) {
      return false;
    }
  }
}
