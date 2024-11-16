import { Injectable } from '@nestjs/common';

import { DbService } from 'src/db/db.service';

@Injectable()
export class FavsTrackService {
  constructor(private db: DbService) {}

  async create(trackId: string) {
    try {
      const favoriteTrack = await this.db.favoriteTrack.create({
        data: { trackId },
        select: { track: true },
      });

      return favoriteTrack;
    } catch (error) {
      return null;
    }
  }

  async delete(trackId: string) {
    try {
      await this.db.favoriteTrack.delete({ where: { trackId } });

      return true;
    } catch (error) {
      return false;
    }
  }
}
