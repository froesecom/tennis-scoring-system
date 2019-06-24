import { CurrentMatch } from '../models/match'
import { TennisSet } from '../models/set'
import { currentGame, currentSet } from '../helpers/match_helpers'

export function incrementPointsBy({
  match,
  playerIndex,
  n,
}: {
  match: CurrentMatch
  playerIndex: number
  n: number
}): void {
  const game = currentGame(match)
  for (let i = 0; i < n; i++) {
    game.incrementScore(playerIndex)
  }
}

export function incrementGamesBy({
  match,
  n,
}: {
  match: CurrentMatch
  n: number
}): void {
  const tennisSet = currentSet(match)
  for (let i = 0; i < n; i++) {
    tennisSet.createGame()
  }
}

export function incrementSetsBy(
  match: CurrentMatch,
  n: number,
  playerIndex: number
): void {
  for (let i = 0; i < n; i++) {
    const tSet = new TennisSet()
    tSet.wonBy = playerIndex
    match.push(tSet)
  }
}

export function incrementToTieBreaker(match: CurrentMatch): void {
  incrementGamesBy({ match, n: 12 })
}
