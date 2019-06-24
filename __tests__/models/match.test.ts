import { Match } from '../../models/match'

let match: Match = new Match('player1', 'player2')

beforeEach(() => {
  match = new Match('player1', 'player2')
})

test('score return value for new match, not humanReadable', () => {
  expect(match.score({ humanReadable: false })).toStrictEqual({
    setsScore: [0, 0],
    gamesScore: [0, 0],
    currentGameScore: [0, 0],
  })
})
