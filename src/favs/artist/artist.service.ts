import { Injectable } from '@nestjs/common';

import { DbService } from 'src/db/db.service';

@Injectable()
export class FavsArtistService {
  constructor(private db: DbService) {}

  create(id: string) {
    return this.db.favoriteArtist.create(id);
  }

  delete(id: string) {
    return this.db.favoriteArtist.delete(id);
  }
}
