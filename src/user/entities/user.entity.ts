import { Exclude } from 'class-transformer';

import { EntityUser, User } from 'src/shared/interfaces/user.interface';

export class UserEntity implements EntityUser {
  id: string;
  login: string;
  version: number;
  createdAt: number;
  updatedAt: number;

  @Exclude()
  password: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, {
      ...partial,
      createdAt: partial.createdAt?.getTime() || partial.createdAt,
      updatedAt: partial.updatedAt?.getTime() || partial.updatedAt,
    });
  }
}
