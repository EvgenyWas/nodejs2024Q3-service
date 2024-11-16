import { Injectable } from '@nestjs/common';

import { DbService } from 'src/db/db.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private db: DbService) {}

  create(data: CreateUserDto) {
    return this.db.user.create({ data });
  }

  findAll() {
    return this.db.user.findMany();
  }

  findOne(id: string) {
    return this.db.user.findUnique({ where: { id } });
  }

  async updatePassword(id: string, password: string) {
    try {
      const user = await this.db.user.update({
        where: { id },
        data: { password, version: { increment: 1 } },
      });

      return user;
    } catch (error) {
      return null;
    }
  }

  async delete(id: string) {
    try {
      await this.db.user.delete({ where: { id } });

      return true;
    } catch (error) {
      return false;
    }
  }
}
