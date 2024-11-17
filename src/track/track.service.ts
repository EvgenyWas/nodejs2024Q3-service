import { Injectable } from '@nestjs/common';

import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { DbService } from 'src/db/db.service';

@Injectable()
export class TrackService {
  constructor(private db: DbService) {}

  create(data: CreateTrackDto) {
    return this.db.track.create({ data });
  }

  findAll() {
    return this.db.track.findMany();
  }

  findOne(id: string) {
    return this.db.track.findUnique({ where: { id } });
  }

  async update(id: string, data: UpdateTrackDto) {
    try {
      const track = await this.db.track.update({ where: { id }, data });

      return track;
    } catch (error) {
      return null;
    }
  }

  async delete(id: string) {
    try {
      await this.db.track.delete({ where: { id } });

      return true;
    } catch (error) {
      return false;
    }
  }
}
