import { Match } from '../../models/match'

let match: Match = new Match('player1', 'player2')

beforeEach(() => {
  match = new Match('player1', 'player2')
})

// integration test for games
test('score return value for not humanReadable', () => {
  match.pointWonBy('player1')
  expect(match.score({ humanReadable: false })).toStrictEqual({
    setsScore: [0, 0],
    gamesScore: [0, 0],
    currentGameScore: [1, 0],
  })
  match.pointWonBy('player1')
  expect(match.score({ humanReadable: false })).toStrictEqual({
    setsScore: [0, 0],
    gamesScore: [0, 0],
    currentGameScore: [2, 0],
  })
  match.pointWonBy('player2')
  expect(match.score({ humanReadable: false })).toStrictEqual({
    setsScore: [0, 0],
    gamesScore: [0, 0],
    currentGameScore: [2, 1],
  })
  match.pointWonBy('player2')
  match.pointWonBy('player2')
  expect(match.score({ humanReadable: false })).toStrictEqual({
    setsScore: [0, 0],
    gamesScore: [0, 0],
    currentGameScore: [2, 3],
  })
  match.pointWonBy('player1')
  match.pointWonBy('player2')
  expect(match.score({ humanReadable: false })).toStrictEqual({
    setsScore: [0, 0],
    gamesScore: [0, 0],
    currentGameScore: [3, 4],
  })
  match.pointWonBy('player1')
  expect(match.score({ humanReadable: true })).toBe('0-0, Deuce')
  match.pointWonBy('player2')
  expect(match.score({ humanReadable: false })).toStrictEqual({
    setsScore: [0, 0],
    gamesScore: [0, 0],
    currentGameScore: [4, 5],
  })
  expect(match.score({ humanReadable: true })).toBe('0-0, Advantage player2')
  match.pointWonBy('player2')
  expect(match.score({ humanReadable: false })).toStrictEqual({
    setsScore: [0, 0],
    gamesScore: [0, 1],
    currentGameScore: [0, 0],
  })
})
