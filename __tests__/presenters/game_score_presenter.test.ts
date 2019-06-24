import { Game } from '../../models/game'
import { Player } from '../../models/player'
import { GameScorePresenter } from '../../presenters/game_score_presenter'

const players: Player[] = [
  new Player({ name: 'p1', index: 0 }),
  new Player({ name: 'p2', index: 1 }),
]
const presenter: GameScorePresenter = new GameScorePresenter()
// add integration tests
let game: Game = new Game()
beforeEach(() => {
  game = new Game()
})

test('present new game', () => {
  expect(presenter.present(game, players)).toBe('0-0')
})

test('present regular game', () => {
  game.incrementScore(0)
  expect(presenter.present(game, players)).toBe('15-0')
  game.incrementScore(0)
  expect(presenter.present(game, players)).toBe('30-0')
  game.incrementScore(0)
  expect(presenter.present(game, players)).toBe('40-0')
})

test('present tiebreaker game', () => {
  const tGame: Game = new Game({ tiebreaker: true })
  tGame.incrementScore(0)
  tGame.incrementScore(1)
  tGame.incrementScore(0)
  tGame.incrementScore(1)
  tGame.incrementScore(0)

  expect(presenter.present(tGame, players)).toBe('3-2')
})

test('present deuce game', () => {
  game.incrementScore(0)
  game.incrementScore(1)
  game.incrementScore(0)
  game.incrementScore(1)
  game.incrementScore(0)
  game.incrementScore(1)
  game.incrementScore(0)
  game.incrementScore(1)
  expect(presenter.present(game, players)).toBe('Deuce')
  game.incrementScore(0)
  expect(presenter.present(game, players)).toBe('Advantage p1')
})
