import { IsNumber, IsString } from 'class-validator';

import { NewTrack } from 'src/shared/interfaces/track.interface';
import { IsNullable } from 'src/shared/validators';

export class CreateTrackDto implements NewTrack {
  @IsString()
  name: string;

  @IsNullable()
  @IsString()
  artistId: string | null;

  @IsNullable()
  @IsString()
  albumId: string | null;

  @IsNumber()
  duration: number;
}
