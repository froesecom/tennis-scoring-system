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

  score(options: { humanReadable: boolean } = { humanReadable: true }) {
    return this.scoreReporter.score(this.currentMatch, this.players, options)
  }

  pointWonBy(playerName: string): void {
    this.handleCompleteMatch()
    const playerIndex = this.indexOfPlayer(playerName)
    this.scoreKeeper.addPoint(this.currentMatch, playerIndex)

    if (this.checkGameComplete()) {
      this.scoreKeeper.markGameComplete(this.currentMatch, playerIndex)
      this.handleGameComplete(playerIndex)
    }
  }

  private handleGameComplete(playerIndex: number): void {
    if (this.checkSetComplete()) {
      this.scoreKeeper.markSetComplete(this.currentMatch, playerIndex)
      this.handleSetComplete(playerIndex)
    } else {
      currentSet(this.currentMatch).createGame()
    }
  }

  private handleSetComplete(playerIndex: number): void {
    if (this.checkMatchComplete()) {
      this.wonBy = playerIndex
    } else {
      this.createNewSet()
    }
  }

  private checkGameComplete(): boolean {
    return this.umpire.currentGameComplete(this.currentMatch)
  }

  private checkSetComplete(): boolean {
    return this.umpire.currentSetComplete(this.currentMatch)
  }

  private checkMatchComplete(): boolean {
    return this.umpire.matchComplete(this.currentMatch, this.requiredSets)
  }

  private createNewSet() {
    this.currentMatch.push(new TennisSet())
  }

  private handleCompleteMatch(): void {
    if (this.wonBy) {
      throw new Error('This match is already complete')
    }
  }

  private indexOfPlayer(playerName: string): number {
    // throw error if can't find
    return this.players.findIndex(p => {
      return p.name === playerName
    })
  }
}
