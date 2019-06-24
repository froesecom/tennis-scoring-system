import { CurrentMatch } from '../models/match'
import { GameScore, Game } from '../models/game'
import {
  GroupedByWonBy,
  currentGame,
  groupByWonBy,
  currentSet,
} from '../helpers/match_helpers'
import { GAME_RULES, SET_RULES } from '../constants/rules'

export class Umpire {
  // has no state
  // knows when games/sets/matches are complete
  // ie, knows the rules of tennis

  currentGameComplete(match: CurrentMatch): boolean {
    const game: Game = currentGame(match)
    if (game.tiebreaker) {
      return this.tiebreakerGameComplete(game)
    } else {
      return this.regularGameComplete(game)
    }
  }

  currentSetComplete(match: CurrentMatch): boolean {
    return this.tiebreakerSetComplete(match) || this.regularSetComplete(match)
  }

  matchComplete(match: CurrentMatch, setsToPlay: number): boolean {
    // this is not a fully featured because the exercise
    // said to only worry about one set
    // can extend this function to work like real tennis
    // ie best of 3 or 5 sets
    return match.length >= setsToPlay && currentSet(match).wonBy !== null
  }

  private regularSetComplete(match: CurrentMatch): boolean {
    const groupedGames = groupByWonBy(currentSet(match).games)
    const result =
      this.regularSetCompleteNGames(groupedGames) &&
      this.minimumSetSeperationAcheived(groupedGames)
    return result
  }

  private regularSetCompleteNGames(groupedSets: GroupedByWonBy): boolean {
    let won: boolean = false
    for (const playerIndex in groupedSets) {
      if (
        groupedSets[playerIndex] &&
        groupedSets[playerIndex].length === SET_RULES.regular.minimumGamesToWin
      ) {
        won = true
        break
      }
    }
    return won
  }

  private minimumSetSeperationAcheived(groupedSets: GroupedByWonBy): boolean {
    // this function needs a refactor, magic numbers!
    return (
      Math.abs(groupedSets[0].length - groupedSets[1].length) >=
      SET_RULES.regular.gamesSeperationForWin
    )
  }

  private minimumPointsAcheived(game: Game, n: number): boolean {
    const score = game.score
    return score[0] >= n || score[1] >= n
  }

  private minimumSeperationAchieved(game: Game, n: number): boolean {
    const score: GameScore = game.score
    return Math.abs(score[0] - score[1]) >= n
  }

  private regularGameComplete(game: Game): boolean {
    return (
      this.minimumPointsAcheived(game, GAME_RULES.regular.minimumPointsToWin) &&
      this.minimumSeperationAchieved(
        game,
        GAME_RULES.regular.pointsSeperationForWin
      )
    )
  }

  private tiebreakerGameComplete(game: Game): boolean {
    return (
      this.minimumPointsAcheived(
        game,
        GAME_RULES.tiebreaker.minimumPointsToWin
      ) &&
      this.minimumSeperationAchieved(
        game,
        GAME_RULES.tiebreaker.pointsSeperationForWin
      )
    )
  }

  private tiebreakerSetComplete(match: CurrentMatch): boolean {
    return currentSet(match).games.length >= SET_RULES.regular.maxGamesAllowed
  }
}
