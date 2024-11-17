import { Injectable } from '@nestjs/common';

import { DbService } from 'src/db/db.service';

@Injectable()
export class FavsArtistService {
  constructor(private db: DbService) {}

  async create(artistId: string) {
    try {
      const favoriteArtist = await this.db.favoriteArtist.create({
        data: { artistId },
        select: { artist: true },
      });

      return favoriteArtist;
    } catch (error) {
      return null;
    }
  }

  async delete(artistId: string) {
    try {
      await this.db.favoriteArtist.delete({ where: { artistId } });

      return true;
    } catch (error) {
      return false;
    }
  }
}
