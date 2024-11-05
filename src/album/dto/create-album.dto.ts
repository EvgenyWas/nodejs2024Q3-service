import { IsNumber, IsString, IsUUID, Max } from 'class-validator';

import { NewAlbum } from 'src/shared/interfaces/album.interface';
import { IsNullable } from 'src/shared/validators';

export class CreateAlbumDto implements NewAlbum {
  @IsString()
  name: string;

  @IsNumber()
  @Max(2024)
  year: number;

  @IsString()
  @IsUUID()
  @IsNullable()
  artistId: string;
}
