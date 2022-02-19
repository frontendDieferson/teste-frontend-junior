import { Playlist } from './Playlist';

export class Player implements PlayerType {

  playing: boolean;
  playlist: PlaylistType;

  private _albumIndex = 0;
  private _trackIndex = 0;
  private audioSource: HTMLAudioElement | undefined;
  private listeners: {
    [key: string]: Function[];
  } = {};
  
  constructor() {
    this.playlist = new Playlist();
  }

  get trackUrl(): string | null {
    return this.album.getUrlFromIndex(this.trackIndex);
  }

  get album(): AlbumType {
    return this.playlist.albums[this.albumIndex];
  }

  get trackIndex(): number {
    return this._trackIndex;
  }

  get albumIndex(): number {
    return this._albumIndex;
  }

  set trackIndex(newValue: number) {
    
    if (newValue < 0) return;
    
    this._trackIndex= newValue > this.playlist.albums[this.albumIndex].tracks.length - 1 ? 0 : newValue;
  }

  set albumIndex (newValue: number) {

    if (newValue < 0) return;
    this._albumIndex = newValue > this.playlist.albums.length - 1 ? 0 : newValue;
  }

  play = (): void => {
    this.playing = true;
    if (!this.audioSource) this.audioSource = new Audio(this.album.getUrlFromIndex(this.trackIndex) || '');
    this.audioSource.play();
    this.notifyListeners('playStatus', true);
  }

  pause = (): void => {
    this.playing = false;
    if (this.audioSource) this.audioSource.pause();
    this.notifyListeners('playStatus', false);
  }

  nextTrack = (): void => {

    if (this.album.isLastTrack(this.trackIndex)) {

      if (this.playlist.isLastAlbum(this.albumIndex)) {
        this.albumIndex = 0;
      } else {
        this.albumIndex++;
      }
      this.trackIndex = 0;

    } else {
      this.trackIndex++;
    }

    this.updateAudioSource();
  }

  prevTrack = (): void => {

    if (this.album.isFirstTrack(this.trackIndex)) {
      
      if (this.playlist.isFirstAlbum(this.albumIndex)) {
        this.albumIndex = this.playlist.albums.length - 1;
      } else {
        this.albumIndex--;
      }
      this.trackIndex = this.album.tracks.length - 1;

    } else {
      this.trackIndex--;
    }

    this.updateAudioSource();
  }

  addListener(event: string, callback: Function) {

    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(callback);
  }

  selectTrackFromAlbum = (trackIndex: number, albumIndex: number) => {
    this.albumIndex = albumIndex;
    this.trackIndex = trackIndex;

    this.updateAudioSource();
  };

  private updateAudioSource() {

    this.audioSource?.pause();
    this.audioSource = new Audio(this.album.getUrlFromIndex(this.trackIndex) || '');
    this.notifyListeners('trackChange', this.album.getUrlFromIndex(this.trackIndex)); 
  }

  private notifyListeners(event: string, ...args: any) {

    if (!this.listeners[event]) return;
    this.listeners[event].forEach((callback) => {
      callback(...args);
    });
  }
}
