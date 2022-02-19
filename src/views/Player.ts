import { body, mounted } from '~/utils';
import { Album } from './Album';
import { Player } from '../models/Player';
import './Player.css'; 

export function MediaPlayer(player: Player) {

  mounted(() => {

    const playerToggle = document.getElementById('player-toggle');
    playerToggle?.addEventListener('click', () => {
      player.playing ? player.pause() : player.play();
      
    });

    player.addListener('playStatus', (playing: Boolean) => {
      document
        .getElementById('player-toggle-icon')
        ?.setAttribute(
          'src',
          playing ? '/img/pause.svg': '/img/play.svg'
      );
    });

    const previousButton = document.getElementById('player-previous');
    previousButton?.addEventListener('click', () => {
      player.prevTrack();
      player.play();
    });

    const nextButton = document.getElementById('player-next');
    nextButton?.addEventListener('click', () => {
      player.nextTrack();
      player.play();
    });
  });

  return body`
    <div class="wrapper">
      ${player.playlist.albums.map((album, index) => Album(album, index)).join('')}
      <div class="player">

        <div class="controls">

            <button class="previous" id="player-previous">

              <img src="/img/prev.svg" />

            </button>

            <button class="playpause" id="player-toggle">

              <img src="/img/play.svg" id="player-toggle-icon"/>

            </button>

            <button class="next" id="player-next">

              <img src="/img/next.svg" />

            </button>
            
        </div>
    </div>
  `
}
