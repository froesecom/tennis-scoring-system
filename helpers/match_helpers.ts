import { CurrentMatch } from '../models/match'
import { TennisSet } from '../models/set'
import { Game } from '../models/game'
import { Player } from '../models/player'

export function currentSet(match: CurrentMatch): TennisSet {
  // validate case where this returns undefined potentially
  return match[match.length - 1]
}

export function currentGame(match: CurrentMatch): Game {
  // validate case where this returns undefined potentially
  const tennisSet: TennisSet = currentSet(match)
  const games: Game[] = tennisSet.games
  return games[games.length - 1]
}

export interface GroupedByWonBy {
  [index: number]: (Game | TennisSet)[]
}
export function groupByWonBy(collection: Game[] | TennisSet[]): GroupedByWonBy {
  //refactor
  const p1Index: number = Player.PLAYER_1_INDEX
  const p2Index: number = Player.PLAYER_2_INDEX
  const groupedCollection: GroupedByWonBy = {}
  groupedCollection[p1Index] = []
  groupedCollection[p2Index] = []

  for (const c of collection) {
    if (c.wonBy === null) {
      continue
    }
    groupedCollection[c.wonBy].push(c)
  }

  return groupedCollection
}
