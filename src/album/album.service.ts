import { Injectable } from '@nestjs/common';

import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { DbService } from 'src/db/db.service';

@Injectable()
export class AlbumService {
  constructor(private db: DbService) {}

  create(data: CreateAlbumDto) {
    return this.db.album.create({ data });
  }

  findAll() {
    return this.db.album.findMany();
  }

  findOne(id: string) {
    return this.db.album.findUnique({ where: { id } });
  }

  async update(id: string, data: UpdateAlbumDto) {
    try {
      const artist = await this.db.album.update({ where: { id }, data });

      return artist;
    } catch (error) {
      return null;
    }
  }

  async delete(id: string) {
    try {
      await this.db.album.delete({ where: { id } });

      return true;
    } catch (error) {
      return false;
    }
  }
}
