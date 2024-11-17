import { Injectable } from '@nestjs/common';

import { DbService } from 'src/db/db.service';

@Injectable()
export class FavsAlbumService {
  constructor(private db: DbService) {}

  async create(albumId: string) {
    try {
      const favoriteAlbum = await this.db.favoriteAlbum.create({
        data: { albumId },
        select: { album: true },
      });

      return favoriteAlbum;
    } catch (error) {
      return null;
    }
  }

  async delete(albumId: string) {
    try {
      await this.db.favoriteAlbum.delete({ where: { albumId } });

      return true;
    } catch (error) {
      return false;
    }
  }
}
