import { Module } from '@nestjs/common';

import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { FavsAlbumModule } from './album/album.module';
import { FavsArtistModule } from './artist/artist.module';
import { FavsTrackModule } from './track/track.module';

@Module({
  controllers: [FavsController],
  providers: [FavsService],
  imports: [FavsAlbumModule, FavsArtistModule, FavsTrackModule],
})
export class FavsModule {}
