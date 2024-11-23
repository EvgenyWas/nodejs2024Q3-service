import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

import { DbService } from 'src/db/db.service';
import { User } from 'src/shared/interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private db: DbService, private configService: ConfigService) {}

  async create(data: CreateUserDto) {
    const hash = await this.hashPassword(data.password);

    return this.db.user.create({ data: { ...data, password: hash } });
  }

  findAll() {
    return this.db.user.findMany();
  }

  findOne(id: string) {
    return this.db.user.findUnique({ where: { id } });
  }

  async findOneByLoginAndPassword(
    login: string,
    password: string,
  ): Promise<User | null> {
    const user = await this.db.user.findUnique({ where: { login } });
    if (!user) {
      return null;
    }

    const isValidPassword = await this.comparePasswords(
      user.password,
      password,
    );

    return isValidPassword ? user : null;
  }

  async updatePassword(id: string, password: string) {
    try {
      const hash = await this.hashPassword(password);
      const user = await this.db.user.update({
        where: { id },
        data: { password: hash, version: { increment: 1 } },
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

  comparePasswords(hash: string, password: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  private hashPassword(value: string): Promise<string> {
    return bcrypt.hash(
      value,
      parseInt(this.configService.get('CRYPT_SALT', '10')),
    );
  }
}
