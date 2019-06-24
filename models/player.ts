export class Player {
  static PLAYER_1_INDEX: number = 0
  static PLAYER_2_INDEX: number = 1

  readonly index: number
  readonly name: string

  constructor({ name, index }: { name: string; index: number }) {
    // validate input
    this.name = name
    this.index = index // the order the players were initialised matters in this sytem, so store it in case we need it
  }
}
