import { Umpire } from '../../models/umpire'
import { CurrentMatch } from '../../models/match'
import { TennisSet } from '../../models/set'
import {
  incrementPointsBy,
  incrementToTieBreaker,
  incrementSetsBy,
} from '../../__test_helpers__/helpers'

const umpire: Umpire = new Umpire()

describe('gameComplete', () => {
  let match: CurrentMatch = [new TennisSet()]
  beforeEach(() => {
    // reset match
    match = [new TennisSet()]
  })

  test('gameComplete for complete regular game', () => {
    incrementPointsBy({ match, playerIndex: 0, n: 4 })
    incrementPointsBy({ match, playerIndex: 1, n: 2 })
    expect(umpire.currentGameComplete(match)).toBeTruthy()
  })

  test('gameComplete for complete advantage game', () => {
    incrementPointsBy({ match, playerIndex: 0, n: 8 })
    incrementPointsBy({ match, playerIndex: 1, n: 10 })
    expect(umpire.currentGameComplete(match)).toBeTruthy()
  })

  test('gameComplete for incomplete regular game', () => {
    incrementPointsBy({ match, playerIndex: 0, n: 3 })
    incrementPointsBy({ match, playerIndex: 1, n: 1 })
    expect(umpire.currentGameComplete(match)).toBeFalsy()
  })

  test('gameComplete for incomplete advantage game', () => {
    incrementPointsBy({ match, playerIndex: 0, n: 6 })
    incrementPointsBy({ match, playerIndex: 1, n: 5 })
    expect(umpire.currentGameComplete(match)).toBeFalsy()
  })

  test('gameComplete for complete tiebreaker game', () => {
    incrementToTieBreaker(match)
    incrementPointsBy({ match, playerIndex: 0, n: 11 })
    incrementPointsBy({ match, playerIndex: 1, n: 9 })
    expect(umpire.currentGameComplete(match)).toBeTruthy()
  })

  test('gameComplete for incomplete tiebreaker game', () => {
    incrementToTieBreaker(match)
    incrementPointsBy({ match, playerIndex: 0, n: 6 })
    incrementPointsBy({ match, playerIndex: 1, n: 4 })
    expect(umpire.currentGameComplete(match)).toBeFalsy()
  })
})

describe('setComplete', () => {
  let match: CurrentMatch = [new TennisSet()]
  beforeEach(() => {
    // reset match
    match = [new TennisSet()]
  })

  test('setComplete for regular set', () => {
    const tSet: TennisSet = match[0]
    for (let i = 0; i < 5; i++) {
      tSet.createGame()
    }
    for (const g of tSet.games) {
      g.wonBy = 0
    }
    expect(umpire.currentSetComplete(match)).toBeTruthy()
  })

  test('setComplete for tiebreaker set', () => {
    const tSet: TennisSet = match[0]
    for (let i = 0; i < 12; i++) {
      tSet.games[i].wonBy = i % 2
      tSet.createGame()
    }
    tSet.games[tSet.games.length - 1].wonBy = 1

    expect(umpire.currentSetComplete(match)).toBeTruthy()
  })
})

describe('matchComplete', () => {
  let match: CurrentMatch = [new TennisSet()]
  beforeEach(() => {
    // reset match
    match = [new TennisSet()]
  })

  test('matchComplete for complete match', () => {
    match[0].wonBy = 0
    expect(umpire.matchComplete(match, 1)).toBeTruthy()
  })

  test('matchComplete for incomplete match', () => {
    expect(umpire.matchComplete(match, 1)).toBeFalsy()
  })
})
