export class Game {
  players: string[]
  isStarted: boolean
  constructor(
    private playersLimit: number,
    private ownerId: string,
    private isPublic: boolean
  ) {
    this.players.push(this.ownerId)
    this.isStarted = false
  }

  addPlayer(playerId: string) {
    if (!this.isStarted && this.players.length + 1 <= this.playersLimit) {
      this.players.push(playerId)
    }
  }

  startGame() {
    this.isStarted = true
  }
}
