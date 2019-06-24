import { Game } from './game'

// Set is an existing object in JavaScript
export class TennisSet {
  static MAXIMUM_N_REGULAR_GAMES: number = 12
  private _wonBy: number | null = null
  readonly games: Game[] = [new Game()]

  createGame(): void {}

  get wonBy(): number | null {
    return this._wonBy
  }

  set wonBy(name: number | null) {
    // validate
    this._wonBy = name
  }

  private nextGameTiebreaker() {}
}
