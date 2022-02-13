import type { GAME_MODES } from "./enums"

export interface Player {
	id: string
	given_name: string
	picture: string | null
}
export interface Game {
	id: string
	options: {
		gameMode: keyof typeof GAME_MODES
		playersLimit: number
	}
	players: Player[]
}
