import { Injectable } from '@nestjs/common';

import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { DbService } from 'src/db/db.service';

@Injectable()
export class TrackService {
  constructor(private db: DbService) {}

  create(dto: CreateTrackDto) {
    return this.db.track.create(dto);
  }

  findAll() {
    return this.db.track.findMany();
  }

  findOne(id: string) {
    return this.db.track.findUnique(id);
  }

  update(id: string, dto: UpdateTrackDto) {
    return this.db.track.update({ ...dto, id });
  }

  delete(id: string) {
    return this.db.track.delete(id);
  }
}
