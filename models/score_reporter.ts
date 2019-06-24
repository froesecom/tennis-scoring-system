import { CurrentMatch } from './match'
import { Game } from './game'
import { Player } from './player'
import { GameScorePresenter } from '../presenters/game_score_presenter'
import {
  currentGame,
  GroupedByWonBy,
  groupByWonBy,
  currentSet,
} from '../helpers/match_helpers'

interface ScoreReport {
  setsScore: [number, number]
  gamesScore: [number, number]
  currentGameScore: [number, number]
}

export class ScoreReporter {
  readonly gameScorePresenter: GameScorePresenter = new GameScorePresenter()

  score(
    match: CurrentMatch,
    players: Player[],
    { humanReadable }: { humanReadable: boolean } = { humanReadable: true }
  ): ScoreReport | string {
    if (humanReadable) {
      return this.humanScore(match, players)
    } else {
      return this.scoreData(match)
    }
  }

  private humanScore(match: CurrentMatch, players: Player[]): string {
    return `${this.humanGamesScore(match)}, ${this.humanCurrentGameScore(
      match,
      players
    )}`
  }

  private humanGamesScore(match: CurrentMatch): string {
    return `${this.scoreData(match).gamesScore.join('-')}`
  }

  private humanCurrentGameScore(
    match: CurrentMatch,
    players: Player[]
  ): string {
    return `${this.gameScorePresenter.present(currentGame(match), players)}`
  }

  private scoreData(match: CurrentMatch): ScoreReport {
    const game: Game = currentGame(match)
    const tSets: GroupedByWonBy = groupByWonBy(match)
    const games: GroupedByWonBy = groupByWonBy(currentSet(match).games)
    return {
      setsScore: this.reportSetScore(tSets),
      gamesScore: this.reportGamesScore(games),
      currentGameScore: game.score,
    }
  }

  private reportGamesScore(games: GroupedByWonBy): [number, number] {
    return [
      games[Player.PLAYER_1_INDEX].length,
      games[Player.PLAYER_2_INDEX].length,
    ]
  }

  private reportSetScore(tSets: GroupedByWonBy): [number, number] {
    return [
      tSets[Player.PLAYER_1_INDEX].length,
      tSets[Player.PLAYER_2_INDEX].length,
    ]
  }
}
