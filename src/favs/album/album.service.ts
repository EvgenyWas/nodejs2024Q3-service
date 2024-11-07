import { Injectable } from '@nestjs/common';

import { DbService } from 'src/db/db.service';

@Injectable()
export class FavsAlbumService {
  constructor(private db: DbService) {}

  create(id: string) {
    return this.db.favoriteAlbum.create(id);
  }

  delete(id: string) {
    return this.db.favoriteAlbum.delete(id);
  }
}
