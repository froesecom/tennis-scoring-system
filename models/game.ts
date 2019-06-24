export type GameScore = [number, number]

export class Game {
  private _wonBy: number | null = null
  readonly score: GameScore = [0, 0]
  readonly tiebreaker: boolean = false

  constructor({ tiebreaker }: { tiebreaker?: boolean } = {}) {
    if (tiebreaker) {
      this.tiebreaker = tiebreaker
    }
  }

  incrementScore(playerIndex: number): void {
    // validate
    this.score[playerIndex] = this.score[playerIndex] + 1
  }

  get wonBy(): number | null {
    return this._wonBy
  }

  set wonBy(name: number | null) {
    // validate
    this._wonBy = name
  }
}
