import { nanoid } from "nanoid"
import type { GameOptions, GameParams } from "src/types/game"

export class Game {
	id: string
	// TODO: fix any type to player interface
	players: any[] = []
	isStarted = false
	options: Partial<GameOptions> = {}

	// TODO: fix any type to creator interface
	constructor(creator: any) {
		this.id = nanoid(8)
		this.players.push(creator)
	}

	public startGame(): void {
		// Initialize board
	}
}

export class CasualGame extends Game {
	// TODO: fix any type to creator interface
	constructor(creator: any, gameOptions: GameParams) {
		super(creator)
		this.options.gameMode = "CASUAL_GAME"
		this.options.playersLimit = gameOptions.playersLimit
		this.options.roomPrivate = gameOptions.roomPrivate
		this.options.roomAutoStart = gameOptions.roomAutoStart
	}
}

export class RankedGame extends Game {
	// TODO: fix any type to creator interface
	constructor(creator: any, gameOptions: GameParams) {
		super(creator)
		this.options.gameMode = "RANKED_GAME"
		this.options.playersLimit = gameOptions.playersLimit
		this.options.roomPrivate = gameOptions.roomPrivate
		this.options.roomAutoStart = gameOptions.roomAutoStart
	}
}

export class QuickGame extends Game {
	// TODO: fix any type to creator interface
	constructor(creator: any, gameOptions: GameParams) {
		super(creator)
		this.options.gameMode = "QUICK_GAME"
		this.options.playersLimit = gameOptions.playersLimit
		this.options.roomPrivate = gameOptions.roomPrivate
		this.options.roomAutoStart = gameOptions.roomAutoStart
	}
}
