import { body, mounted } from "~/utils";
import { usePlayer } from "~/utils/usePlayer";
import './Album.css';

export function Album(album: AlbumData, albumIndex: number) {

	const player = usePlayer();

	mounted(() => {
		
		const tracks = document.querySelectorAll(`[data-albumindex="${albumIndex}"] .track`) as NodeListOf<HTMLButtonElement>;
		
		tracks.forEach((track, trackIndex) => {
			track.addEventListener('click', () => {
				console.log('clicked');
				player.selectTrackFromAlbum(trackIndex, albumIndex);
				player.play();
			});
		});

		highlightPlayingTrack(player.trackUrl as string, tracks);

		player.addListener('trackChange', (newTrackUrl: string) => {
			highlightPlayingTrack(newTrackUrl, tracks);
		});
	});

	const highlightPlayingTrack = (playingUrl:string, tracks: NodeListOf<HTMLButtonElement>) => {
		tracks.forEach((track: HTMLButtonElement) => {
			if (track.dataset.trackurl === playingUrl) {
				track.classList.add('playing');
			} else {
				track.classList.remove('playing');
			}
		});
	};

	return body`
		<div class="album" data-albumindex="${albumIndex}">

			<div class="composerprofile">

			<img src="${album.cover}" class="composerphoto" />

				<div class="composerinfos">

					<p class="composerwork">${album.title}</p>

					<p class="composername">${album.artist}</p>

				</div>
				
			</div>

			<div class="composertracks">
				${album.tracks.map((track, index) => (`
					<button class="track" data-trackurl="${track.url}">
						${(index + 1).toString().padStart(2, '0')}. ${track.title}
					</button>
				`)).join('')}			
			</div>
		</div>
	`
}