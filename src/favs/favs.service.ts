import { Injectable } from '@nestjs/common';

import { DbService } from 'src/db/db.service';

@Injectable()
export class FavsService {
  constructor(private db: DbService) {}

  async findAll() {
    const [artists, albums, tracks] = await Promise.all([
      this.db.favoriteArtist.findMany({ select: { artist: true } }),
      this.db.favoriteAlbum.findMany({ select: { album: true } }),
      this.db.favoriteTrack.findMany({ select: { track: true } }),
    ]);

    return {
      artists: artists.map(({ artist }) => artist),
      albums: albums.map(({ album }) => album),
      tracks: tracks.map(({ track }) => track),
    };
  }
}
