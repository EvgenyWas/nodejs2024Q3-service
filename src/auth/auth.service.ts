import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
import { SignupDto } from './dto/signup.dto';
import { UserService } from 'src/user/user.service';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signup(dto: SignupDto) {
    try {
      const user = await this.userService.create(dto);
      const [accessToken, refreshToken] = await this.grantTokensPair(
        new UserEntity(user),
      );

      return { id: user.id, accessToken, refreshToken };
    } catch (error) {
      throw new ForbiddenException();
    }
  }

  async login({ login, password }: LoginDto) {
    const user = await this.userService.findOneByLoginAndPassword(
      login,
      password,
    );
    if (!user) {
      throw new ForbiddenException();
    }

    const [accessToken, refreshToken] = await this.grantTokensPair(
      new UserEntity(user),
    );

    return { accessToken, refreshToken };
  }

  async refresh(dto: RefreshDto) {
    try {
      const { login, userId } = await this.jwtService.verifyAsync(
        dto.refreshToken,
        {
          secret: this.configService.get('JWT_SECRET_REFRESH_KEY'),
        },
      );
      const [accessToken, refreshToken] = await this.grantTokensPair({
        login,
        id: userId,
      });

      return { accessToken, refreshToken };
    } catch (error) {
      throw new ForbiddenException();
    }
  }

  private grantTokensPair({ login, id }: Pick<UserEntity, 'login' | 'id'>) {
    const payload = { login, userId: id };

    return Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_SECRET_REFRESH_KEY'),
        expiresIn: this.configService.get('TOKEN_REFRESH_EXPIRE_TIME'),
      }),
    ]);
  }
}
