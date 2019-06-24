export type GameScore = [number, number]

export class Game {
  private _wonBy: number | null = null
  readonly score: GameScore = [0, 0]
  readonly tiebreaker: boolean = false

  constructor({ tiebreaker }: { tiebreaker?: boolean } = {}) {}

  incrementScore(playerIndex: number): void {}

  get wonBy() {
    return null
  }

  set wonBy(name: number | null) {}
}
