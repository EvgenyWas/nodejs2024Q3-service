import { Injectable } from '@nestjs/common';

import { DbService } from 'src/db/db.service';

@Injectable()
export class FavsTrackService {
  constructor(private db: DbService) {}

  create(id: string) {
    return this.db.favoriteTrack.create(id);
  }

  delete(id: string) {
    return this.db.favoriteTrack.delete(id);
  }
}
