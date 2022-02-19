export class Album implements AlbumType {

    artist: string;
    cover: string;
    title: string;
    tracks: TrackData[];

    constructor(attributes: AlbumData){

        this.artist = attributes.artist;
        this.cover = attributes.cover;
        this.title = attributes.title;
        this.tracks = attributes.tracks || [];
    }

    getUrlFromIndex = (index: number): string | null => {
        return this.tracks[index]?.url || null ;
    }

    isFirstTrack = (index: number): boolean => {
        return index === 0;
    }

    isLastTrack = (index: number): boolean => {
        return this.tracks.length - 1 === index;
    }
}
