import { Module } from '@nestjs/common';
import { FavsAlbumService } from './album.service';
import { FavsAlbumController } from './album.controller';

@Module({
  controllers: [FavsAlbumController],
  providers: [FavsAlbumService],
})
export class FavsAlbumModule {}
