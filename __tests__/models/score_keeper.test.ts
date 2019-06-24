import { ScoreKeeper } from '../../models/score_keeper'
import { CurrentMatch } from '../../models/match'
import { TennisSet } from '../../models/set'
import { currentSet, currentGame } from '../../helpers/match_helpers'

const scoreKeeper: ScoreKeeper = new ScoreKeeper()

test('addPoint', () => {
  const match: CurrentMatch = [new TennisSet()]
  expect(currentGame(match).score).toStrictEqual([0, 0])
  scoreKeeper.addPoint(match, 0)
  expect(currentGame(match).score).toStrictEqual([1, 0])
})

test('markGameComplete', () => {
  const match: CurrentMatch = [new TennisSet()]
  scoreKeeper.markGameComplete(match, 1)
  expect(currentGame(match).wonBy).toBe(1)
})
