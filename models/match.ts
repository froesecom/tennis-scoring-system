import { TennisSet } from './set'
import { Player } from './player'
export type CurrentMatch = TennisSet[]

export class Match {
  private currentMatch: CurrentMatch
  private players: [Player, Player]

  constructor(player1: string, player2: string) {
    // validate inputs
    // the order which the players were passed in matters because (as per the spec of the test) the
    // way the scores are reported make no sense unless you know the input order
    // so store players in an array to maintain the order
    this.players = [
      new Player({ name: player1, index: 0 }),
      new Player({ name: player2, index: 1 }),
    ]
    this.currentMatch = [new TennisSet()]
  }
}
