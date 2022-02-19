import { html } from '~/utils';
import { Header } from './Header';
import { MediaPlayer } from './Player';
import './App.css';
import albums from '../mocks/albums.json';
import { Album } from '~/models/Album';
import { usePlayer } from '~/utils/usePlayer';

export function App() {

  const player = usePlayer();

  albums.forEach((albumData) => {
    player.playlist.addAlbum(new Album(albumData));
  });


  return html` 
    <div class="App">
      ${Header()} 
      ${MediaPlayer(player)}
    </div> `;
}