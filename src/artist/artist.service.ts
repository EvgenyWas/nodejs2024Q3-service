import { Injectable } from '@nestjs/common';

import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { DbService } from 'src/db/db.service';

@Injectable()
export class ArtistService {
  constructor(private db: DbService) {}

  create(dto: CreateArtistDto) {
    return this.db.artist.create(dto);
  }

  findAll() {
    return this.db.artist.findMany();
  }

  findOne(id: string) {
    return this.db.artist.findUnique(id);
  }

  update(id: string, dto: UpdateArtistDto) {
    return this.db.artist.update({ ...dto, id });
  }

  delete(id: string) {
    return this.db.artist.delete(id);
  }
}
