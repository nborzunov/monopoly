import type { GameParams } from "src/types/game"
import { CasualGame, QuickGame, RankedGame } from "./game"

export class GameFactory {
	// TODO: fix any type to creator interface
	static create(creator: any, gameMode: string, params: GameParams) {
		switch (gameMode) {
			case "CASUAL_GAME":
				return new CasualGame(creator, params)
			case "RANKED_GAME":
				return new RankedGame(creator, params)
			case "QUICK_GAME":
				return new QuickGame(creator, params)
		}
	}
}
