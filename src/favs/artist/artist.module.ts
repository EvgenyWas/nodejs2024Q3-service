import { Module } from '@nestjs/common';
import { FavsArtistService } from './artist.service';
import { FavsArtistController } from './artist.controller';

@Module({
  controllers: [FavsArtistController],
  providers: [FavsArtistService],
})
export class FavsArtistModule {}
