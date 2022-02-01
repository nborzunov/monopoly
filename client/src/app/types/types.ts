import { GAME_MODES } from './enums'

export interface Player {
  id: string
  name: string
  image: string | null
}
export interface Game {
  options: {
    gameMode: keyof typeof GAME_MODES
    playersLimit: number
  }
  players: Player[]
}
