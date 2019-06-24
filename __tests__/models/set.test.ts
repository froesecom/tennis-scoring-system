import { TennisSet } from '../../models/set'

test('default wonBy value', () => {
  const tennisSet = new TennisSet()
  expect(tennisSet.wonBy).toBeNull()
})

test('wonBy value assignment', () => {
  const tennisSet = new TennisSet()
  const playerIndex = 1
  tennisSet.wonBy = playerIndex
  expect(tennisSet.wonBy).toBe(playerIndex)
})

test('default games value', () => {
  const tennisSet = new TennisSet()
  expect(tennisSet.games.length).toBe(1)
})

test('a new game can be created', () => {
  const tennisSet = new TennisSet()
  tennisSet.createGame()
  expect(tennisSet.games.length).toBe(2)
})

test('13th game is a tiebreaker', () => {
  const tennisSet = new TennisSet()
  for (let i = 0; i < 12; i++) {
    tennisSet.createGame()
  }
  expect(tennisSet.games.length).toBe(13)
  expect(tennisSet.games[12].tiebreaker).toBeTruthy()
})
