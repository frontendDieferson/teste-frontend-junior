import { Album } from './Album';

export class Playlist implements PlaylistType {

  albums: AlbumType[] = [];

  addAlbum = (data: AlbumData) => {

    const album = new Album(data);
    this.albums.push(album);
  }

  isFirstAlbum = (index: number): boolean => {
    return index === 0;
  }

  isLastAlbum = (index: number): boolean => {
    return this.albums.length - 1 === index;
  }
}
