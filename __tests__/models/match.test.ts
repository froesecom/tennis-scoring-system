import { Match } from '../../models/match'

let match: Match = new Match('player1', 'player2')

beforeEach(() => {
  match = new Match('player1', 'player2')
})

test('the truth', () => {
  expect(true).toBeTruthy()
})
