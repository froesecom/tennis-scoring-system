import { Game } from '../models/game'
import { Player } from '../models/player'
import { GAME_RULES } from '../constants/rules'

const REGULAR_MAP = {
  0: '0',
  1: '15',
  2: '30',
  3: '40',
}

export class GameScorePresenter {
  present(game: Game, players: Player[]): string {
    if (game.tiebreaker) {
      return this.presentTiebreaker(game)
    } else {
      return this.presentRegular(game, players)
    }
  }

  private deuceGame(game: Game): boolean {
    const minPoints: number = GAME_RULES.regular.minimumPointsToWin
    const seperation: number = GAME_RULES.regular.pointsSeperationForWin
    const s1: number = game.score[0]
    const s2: number = game.score[1]

    // this function is too mysterious and needs a refactor
    return (
      (s1 === 3 && s2 === 3) ||
      (Math.abs(s1 - s2) <= seperation && (s1 >= minPoints || s2 >= minPoints))
    )
  }

  private presentDeuceGame(game: Game, players: Player[]): string {
    //refactor
    const s1: number = game.score[0]
    const s2: number = game.score[1]
    const adv: string = 'Advantage '
    if (s1 === s2) {
      return 'Deuce'
    } else if (s1 > s2) {
      return `${adv}${players[0].name}`
    } else {
      return `${adv}${players[1].name}`
    }
  }

  private presentRegular(game: Game, players: Player[]): string {
    if (this.deuceGame(game)) {
      return this.presentDeuceGame(game, players)
    } else {
      return `${REGULAR_MAP[game.score[0]]}-${REGULAR_MAP[game.score[1]]}`
    }
  }

  private presentTiebreaker(game: Game): string {
    return `${game.score[0]}-${game.score[1]}`
  }
}
