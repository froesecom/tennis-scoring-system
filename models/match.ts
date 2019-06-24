import { TennisSet } from './set'
import { ScoreReporter } from './score_reporter'
import { Umpire } from './umpire'
import { ScoreKeeper } from './score_keeper'
import { Player } from './player'
import { currentSet } from '../helpers/match_helpers'
export type CurrentMatch = TennisSet[]

export class Match {
  private currentMatch: CurrentMatch
  private players: [Player, Player]
  private scoreReporter: ScoreReporter = new ScoreReporter()
  private scoreKeeper: ScoreKeeper = new ScoreKeeper()
  private umpire: Umpire = new Umpire()
  private requiredSets: number
  private wonBy: number | null = null

  constructor(
    player1: string,
    player2: string,
    { requiredSets }: { requiredSets: number } = { requiredSets: 1 }
  ) {
    // validate inputs
    // the order which the players were passed in matters because (as per the spec of the test) the
    // way the scores are reported make no sense unless you know the input order
    // so store players in an array to maintain the order
    this.players = [
      new Player({ name: player1, index: 0 }),
      new Player({ name: player2, index: 1 }),
    ]
    this.requiredSets = requiredSets
    this.currentMatch = [new TennisSet()]
  }
}
