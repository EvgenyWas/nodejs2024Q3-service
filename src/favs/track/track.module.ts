import { Module } from '@nestjs/common';
import { FavsTrackService } from './track.service';
import { FavsTrackController } from './track.controller';

@Module({
  controllers: [FavsTrackController],
  providers: [FavsTrackService],
})
export class FavsTrackModule {}
