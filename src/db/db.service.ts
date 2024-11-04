import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { Album, NewAlbum } from 'src/shared/interfaces/album.interface';
import { Artist, NewArtist } from 'src/shared/interfaces/artist.interface';
import { Favorites } from 'src/shared/interfaces/favs.interface';
import { NewTrack, Track } from 'src/shared/interfaces/track.interface';
import {
  NewUser,
  UpdatedUser,
  User,
} from 'src/shared/interfaces/user.interface';

@Injectable()
export class DbService {
  private users = new Map<string, User>();
  private artists = new Map<string, Artist>();
  private albums = new Map<string, Album>();
  private tracks = new Map<string, Track>();
  private favs: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  get user() {
    return {
      findMany: this.findUsers,
      findUnique: this.findUser,
      create: this.createUser,
      update: this.updateUser,
      delete: this.deleteUser,
    };
  }

  get artist() {
    return {
      findMany: this.findArtists,
      findUnique: this.findArtist,
      create: this.createArtist,
      update: this.updateArtist,
      delete: this.deleteArtist,
    };
  }

  get track() {
    return {
      findMany: this.findTracks,
      findUnique: this.findTrack,
      create: this.createTrack,
      update: this.updateTrack,
      delete: this.deleteTrack,
    };
  }

  get album() {
    return {
      findMany: this.findAlbums,
      findUnique: this.findAlbum,
      create: this.createAlbum,
      update: this.updateAlbum,
      delete: this.deleteAlbum,
    };
  }

  get favoriteArtist() {
    return {
      findMany: this.findFavoriteArtists,
      create: this.saveFavoriteArtist,
      delete: this.deleteFavoriteArtist,
    };
  }

  get favoriteAlbum() {
    return {
      findMany: this.findFavoriteAlbums,
      create: this.saveFavoriteAlbum,
      delete: this.deleteFavoriteAlbum,
    };
  }

  get favoriteTrack() {
    return {
      findMany: this.findFavoriteTracks,
      create: this.saveFavoriteTrack,
      delete: this.deleteFavoriteTrack,
    };
  }

  private findUser = async (id: string): Promise<User | undefined> =>
    this.users.get(id);

  private findUsers = async (): Promise<Array<User>> =>
    Array.from(this.users.values());

  private createUser = async ({
    login,
    password,
    version,
    createdAt,
    updatedAt,
  }: NewUser): Promise<User> => {
    const id = uuid();
    const user: User = { id, login, password, version, createdAt, updatedAt };
    this.users.set(id, user);

    return user;
  };

  private updateUser = async ({
    id,
    login,
    password,
    updatedAt,
    version,
  }: UpdatedUser): Promise<User | undefined> => {
    const user = this.users.get(id);
    if (!user) {
      return;
    }

    const updatedUser: User = { ...user, login, password, version, updatedAt };
    this.users.set(id, updatedUser);

    return updatedUser;
  };

  private deleteUser = async (id: string): Promise<User | undefined> => {
    const user = this.users.get(id);
    if (!user) {
      return;
    }

    this.users.delete(id);

    return user;
  };

  private findArtist = async (id: string): Promise<Artist | undefined> =>
    this.artists.get(id);

  private findArtists = async (): Promise<Array<Artist>> =>
    Array.from(this.artists.values());

  private createArtist = async ({
    name,
    grammy,
  }: NewArtist): Promise<Artist> => {
    const id = uuid();
    const artist: Artist = { id, name, grammy };
    this.artists.set(id, artist);

    return artist;
  };

  private updateArtist = async ({
    id,
    name,
    grammy,
  }: Artist): Promise<Artist | undefined> => {
    const artist = this.artists.get(id);
    if (!artist) {
      return;
    }

    const updatedArtist: Artist = { ...artist, name, grammy };
    this.artists.set(id, updatedArtist);

    return updatedArtist;
  };

  private deleteArtist = async (id: string): Promise<Artist | undefined> => {
    const artist = this.artists.get(id);
    if (!artist) {
      return;
    }

    this.artists.delete(id);
    this.albums = new Map(
      [...this.albums.entries()].map(([key, album]) => [
        key,
        { ...album, artistId: album.artistId === id ? null : album.artistId },
      ]),
    );
    this.tracks = new Map(
      [...this.tracks.entries()].map(([key, track]) => [
        key,
        { ...track, artistId: track.artistId === id ? null : track.artistId },
      ]),
    );
    this.favs.artists = this.favs.artists.filter((artistId) => artistId !== id);

    return artist;
  };

  private findTrack = async (id: string): Promise<Track | undefined> =>
    this.tracks.get(id);

  private findTracks = async (): Promise<Array<Track>> =>
    Array.from(this.tracks.values());

  private createTrack = async ({
    name,
    artistId,
    albumId,
    duration,
  }: NewTrack): Promise<Track> => {
    const id = uuid();
    const track: Track = { id, name, artistId, albumId, duration };
    this.tracks.set(id, track);

    return track;
  };

  private updateTrack = async ({
    id,
    name,
    artistId,
    albumId,
    duration,
  }: Track): Promise<Track | undefined> => {
    const track = this.tracks.get(id);
    if (!track) {
      return;
    }

    const updatedTrack: Track = { ...track, name, artistId, albumId, duration };
    this.tracks.set(id, updatedTrack);

    return updatedTrack;
  };

  private deleteTrack = async (id: string): Promise<Track | undefined> => {
    const track = this.tracks.get(id);
    if (!track) {
      return;
    }

    this.tracks.delete(id);
    this.deleteFavoriteTrack(id);

    return track;
  };

  private findAlbum = async (id: string): Promise<Album | undefined> =>
    this.albums.get(id);

  private findAlbums = async (): Promise<Array<Album>> =>
    Array.from(this.albums.values());

  private createAlbum = async ({
    name,
    year,
    artistId,
  }: NewAlbum): Promise<Album> => {
    const id = uuid();
    const album: Album = { id, name, year, artistId };
    this.albums.set(id, album);

    return album;
  };

  private updateAlbum = async ({
    id,
    name,
    year,
    artistId,
  }: Album): Promise<Album | undefined> => {
    const album = this.albums.get(id);
    if (!album) {
      return;
    }

    const updatedAlbum: Album = { ...album, name, year, artistId };
    this.albums.set(id, updatedAlbum);

    return updatedAlbum;
  };

  private deleteAlbum = async (id: string): Promise<Album | undefined> => {
    const album = this.albums.get(id);
    if (!album) {
      return;
    }

    this.albums.delete(id);
    this.tracks = new Map(
      [...this.tracks.entries()].map(([key, track]) => [
        key,
        { ...track, albumId: track.albumId === id ? null : track.albumId },
      ]),
    );
    this.favs.albums = this.favs.albums.filter((albumId) => albumId !== id);

    return album;
  };

  private getArtist = (id: string): Artist => this.artists.get(id) as Artist;

  private findFavoriteArtists = async (): Promise<Array<Artist>> =>
    this.favs.artists.map(this.getArtist);

  private saveFavoriteArtist = async (id: string): Promise<Artist> => {
    this.favs.artists.push(id);

    return this.getArtist(id);
  };

  private deleteFavoriteArtist = async (
    id: string,
  ): Promise<Artist | undefined> => {
    const artist = this.favs.artists.find((artistId) => artistId === id);
    if (!artist) {
      return;
    }

    this.favs.artists = this.favs.artists.filter((artistId) => artistId !== id);

    return this.getArtist(id);
  };

  private getAlbum = (id: string): Album => this.albums.get(id) as Album;

  private findFavoriteAlbums = async (): Promise<Array<Album>> =>
    this.favs.albums.map(this.getAlbum);

  private saveFavoriteAlbum = async (id: string): Promise<Album> => {
    this.favs.albums.push(id);

    return this.getAlbum(id);
  };

  private deleteFavoriteAlbum = async (
    id: string,
  ): Promise<Album | undefined> => {
    const album = this.favs.albums.find((albumId) => albumId === id);
    if (!album) {
      return;
    }

    this.favs.albums = this.favs.albums.filter((albumId) => albumId !== id);

    return this.getAlbum(id);
  };

  private getTrack = (id: string): Track => this.tracks.get(id) as Track;

  private findFavoriteTracks = async (): Promise<Array<Track>> =>
    this.favs.tracks.map(this.getTrack);

  private saveFavoriteTrack = async (id: string): Promise<Track> => {
    this.favs.tracks.push(id);

    return this.getTrack(id);
  };

  private deleteFavoriteTrack = async (
    id: string,
  ): Promise<Track | undefined> => {
    const track = this.favs.tracks.find((trackId) => trackId === id);
    if (!track) {
      return;
    }

    this.favs.tracks = this.favs.tracks.filter((trackId) => trackId !== id);

    return this.getTrack(id);
  };
}
