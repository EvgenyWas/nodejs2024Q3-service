import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() dto: CreateUserDto) {
    const user = await this.userService.create(dto);

    return new UserEntity(user);
  }

  @Get()
  async findAll() {
    const users = await this.userService.findAll();

    return users.map((user) => new UserEntity(user));
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException();
    }

    return new UserEntity(user);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() { oldPassword, newPassword }: UpdateUserDto,
  ) {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException();
    }

    const isOldPasswordValid = await this.userService.comparePasswords(
      user.password,
      oldPassword,
    );
    if (!isOldPasswordValid) {
      throw new ForbiddenException();
    }

    const updatedUser = await this.userService.updatePassword(id, newPassword);
    if (!updatedUser) {
      throw new NotFoundException();
    }

    return new UserEntity(updatedUser);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    const deleted = await this.userService.delete(id);
    if (!deleted) {
      throw new NotFoundException();
    }

    return;
  }
}
