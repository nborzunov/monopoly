import { nanoid } from 'nanoid'

interface GameOptions {
  gameMode: 'CASUAL_GAME' | 'QUICK_GAME' | 'RANKED_GAME'
  playersLimit: 2 | 3 | 4 | 5 | '2x2'
  roomPrivate: boolean
  roomAutoStart: boolean
}

interface GameParams {
  playersLimit: 2 | 3 | 4 | 5 | '2x2'
  roomPrivate?: boolean
  roomAutoStart?: boolean
}

export class GameFactory {
  static create(creator: any, gameMode: string, params: GameParams) {
    switch (gameMode) {
      case 'CASUAL_GAME':
        return new CasualGame(creator, params)
    }
  }
}

export class Game {
  id: string
  players: any[] = []
  isStarted: boolean = false
  options: Partial<GameOptions> = {}

  constructor(creator: any) {
    this.id = nanoid(8)
    this.players.push(creator)
  }
}

export class CasualGame extends Game {
  constructor(private creator: any, private gameOptions: GameParams) {
    super(creator)
    this.options.gameMode = 'CASUAL_GAME'
    this.options.playersLimit = this.gameOptions.playersLimit
    this.options.roomPrivate = this.gameOptions.roomPrivate
    this.options.roomAutoStart = this.gameOptions.roomAutoStart
  }
}

export class RankedGame extends Game {}

export class QuickGame extends Game {}
