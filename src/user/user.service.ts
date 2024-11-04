import { Injectable } from '@nestjs/common';

import { DbService } from 'src/db/db.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private db: DbService) {}

  async create(dto: CreateUserDto) {
    const timestamp = Date.now();
    const user = await this.db.user.create({
      ...dto,
      version: 1,
      createdAt: timestamp,
      updatedAt: timestamp,
    });

    return user;
  }

  findAll() {
    return this.db.user.findMany();
  }

  findOne(id: string) {
    return this.db.user.findUnique(id);
  }

  update(dto: UserEntity) {
    return this.db.user.update({
      ...dto,
      version: dto.version + 1,
      updatedAt: Date.now(),
    });
  }

  delete(id: string) {
    return this.db.user.delete(id);
  }
}
