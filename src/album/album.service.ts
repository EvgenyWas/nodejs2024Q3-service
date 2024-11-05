import { Injectable } from '@nestjs/common';

import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { DbService } from 'src/db/db.service';

@Injectable()
export class AlbumService {
  constructor(private db: DbService) {}

  create(dto: CreateAlbumDto) {
    return this.db.album.create(dto);
  }

  findAll() {
    return this.db.album.findMany();
  }

  findOne(id: string) {
    return this.db.album.findUnique(id);
  }

  update(id: string, dto: UpdateAlbumDto) {
    return this.db.album.update({ ...dto, id });
  }

  delete(id: string) {
    return this.db.album.delete(id);
  }
}
