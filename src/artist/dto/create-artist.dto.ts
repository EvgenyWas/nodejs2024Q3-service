import { IsBoolean, IsString } from 'class-validator';

import { NewArtist } from 'src/shared/interfaces/artist.interface';

export class CreateArtistDto implements NewArtist {
  @IsString()
  name: string;

  @IsBoolean()
  grammy: boolean;
}
