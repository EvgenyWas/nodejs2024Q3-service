import { Injectable } from '@nestjs/common';

import { DbService } from 'src/db/db.service';

@Injectable()
export class FavsService {
  constructor(private db: DbService) {}

  async findAll() {
    const [artists, albums, tracks] = await Promise.all([
      this.db.favoriteArtist.findMany(),
      this.db.favoriteAlbum.findMany(),
      this.db.favoriteTrack.findMany(),
    ]);

    return { artists, albums, tracks };
  }
}
