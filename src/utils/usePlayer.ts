import { Player } from "~/models/Player";

const player = new Player();

export function usePlayer() {
	return player;
}