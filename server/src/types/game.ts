export interface GameOptions {
	gameMode: "CASUAL_GAME" | "QUICK_GAME" | "RANKED_GAME"
	playersLimit: 2 | 3 | 4 | 5 | "2x2"
	roomPrivate: boolean
	roomAutoStart: boolean
}

export interface GameParams {
	playersLimit: 2 | 3 | 4 | 5 | "2x2"
	roomPrivate?: boolean
	roomAutoStart?: boolean
}
