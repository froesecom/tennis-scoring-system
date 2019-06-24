export class Player {
  readonly index: number
  readonly name: string

  constructor({ name, index }: { name: string; index: number }) {
    // validate input
    this.name = name
    this.index = index // the order the players were initialised matters in this sytem, so store it in case we need it
  }
}
