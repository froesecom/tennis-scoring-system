import { CurrentMatch } from '../../models/match'
import { TennisSet } from '../../models/set'
import { ScoreReporter } from '../../models/score_reporter'
import { Player } from '../../models/player'
import { incrementPointsBy } from '../../__test_helpers__/helpers'

const reporter = new ScoreReporter()
const players = [
  new Player({ name: 'player1', index: 0 }),
  new Player({ name: 'player2', index: 1 }),
]

describe('humanReadable', () => {
  let match: CurrentMatch = []
  beforeEach(() => {
    match = [new TennisSet()]
  })
  test('score return value new match', () => {
    expect(reporter.score(match, players)).toBe('0-0, 0-0')
  })
})

describe('not humanReadable', () => {
  test('score return value new match', () => {
    const match: CurrentMatch = [new TennisSet()]
    expect(
      reporter.score(match, players, { humanReadable: false })
    ).toStrictEqual({
      setsScore: [0, 0],
      gamesScore: [0, 0],
      currentGameScore: [0, 0],
    })
  })

  test('score return value match in progress first set', () => {
    const match: CurrentMatch = [new TennisSet()]
    incrementPointsBy({ match, playerIndex: 0, n: 3 })
    incrementPointsBy({ match, playerIndex: 1, n: 2 })
    expect(
      reporter.score(match, players, { humanReadable: false })
    ).toStrictEqual({
      setsScore: [0, 0],
      gamesScore: [0, 0],
      currentGameScore: [3, 2],
    })
  })

  test('score return value match in progress second set', () => {
    const tSet: TennisSet = new TennisSet()
    tSet.wonBy = 1
    const match: CurrentMatch = [tSet, new TennisSet()]
    incrementPointsBy({ match, playerIndex: 0, n: 2 })
    incrementPointsBy({ match, playerIndex: 1, n: 1 })
    expect(
      reporter.score(match, players, { humanReadable: false })
    ).toStrictEqual({
      setsScore: [0, 1],
      gamesScore: [0, 0],
      currentGameScore: [2, 1],
    })
  })
})
