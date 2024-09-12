import { type Card } from './deck'

export class Player {
  public hand: Card[]

  constructor (public name: string) {
    this.name = name
    this.hand = []
  }
}
