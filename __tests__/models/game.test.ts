import { Game, GameScore } from '../../models/game'

test('default wonBy value', () => {
  const game = new Game()
  expect(game.wonBy).toBeNull()
})

test('wonBy value assignment', () => {
  const game = new Game()
  const playerIndex = 0
  game.wonBy = playerIndex
  expect(game.wonBy).toBe(playerIndex)
})

test('score has default value', () => {
  const game = new Game()
  const expected: GameScore = [0, 0]
  expect(game.score).toStrictEqual(expected)
})

test('score can be incremented by one', () => {
  const game = new Game()

  game.incrementScore(0)
  const expected1 = [1, 0]
  expect(game.score).toStrictEqual(expected1)
})

test('default tiebreaker value', () => {
  const game = new Game()
  expect(game.tiebreaker).toBe(false)
})

test('initialiser takes tiebreaker', () => {
  const game = new Game({ tiebreaker: true })
  expect(game.tiebreaker).toBe(true)
})
