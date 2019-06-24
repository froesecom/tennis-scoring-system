import { CurrentMatch } from './match'
import { currentSet, currentGame } from '../helpers/match_helpers'

export class ScoreKeeper {
  addPoint(match: CurrentMatch, playerIndex: number): void {
    // validate
    currentGame(match).incrementScore(playerIndex)
  }

  markGameComplete(match: CurrentMatch, winningPlayerIndex: number): void {
    currentGame(match).wonBy = winningPlayerIndex
  }

  markSetComplete(match: CurrentMatch, winningPlayerIndex: number): void {
    currentSet(match).wonBy = winningPlayerIndex
  }
}
