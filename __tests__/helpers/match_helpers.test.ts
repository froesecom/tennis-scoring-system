import {
  currentSet,
  currentGame,
  groupByWonBy,
} from '../../helpers/match_helpers'
import { CurrentMatch } from '../../models/match'
import { TennisSet } from '../../models/set'
import { Game } from '../../models/game'

test('currentSet return value', () => {
  const currentMatch: CurrentMatch = [new TennisSet()]
  const result: any = currentSet(currentMatch)
  expect(result instanceof TennisSet).toBeTruthy()
})

test('currentGame return value', () => {
  const currentMatch: CurrentMatch = [new TennisSet()]
  const result: any = currentGame(currentMatch)
  expect(result instanceof Game).toBeTruthy()
})

test('groupByWonBy return value for TennisSet[]', () => {
  const sets: TennisSet[] = []
  const tSet1 = new TennisSet()
  tSet1.wonBy = 1
  sets.push(tSet1)
  const tSet2 = new TennisSet()
  tSet2.wonBy = 1
  sets.push(tSet2)
  const tSet3 = new TennisSet()
  tSet3.wonBy = 0
  sets.push(tSet3)

  const result = groupByWonBy(sets)
  expect(result).toStrictEqual({ 1: [tSet1, tSet2], 0: [tSet3] })
})

test('groupByWonBy return value for Game[]', () => {
  const games: Game[] = []
  const game1 = new Game()
  game1.wonBy = 1
  games.push(game1)
  const game2 = new Game()
  game2.wonBy = 1
  games.push(game2)
  const game3 = new Game()
  game3.wonBy = 0
  games.push(game3)
  const game4 = new Game()
  game4.wonBy = 0
  games.push(game4)

  const result = groupByWonBy(games)
  expect(result).toStrictEqual({ 1: [game1, game2], 0: [game3, game4] })
})
