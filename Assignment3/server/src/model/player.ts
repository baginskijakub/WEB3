import { type Card } from './deck'
import {mapCardsToScore} from './utils';


export class Player {
  public hand: Card[]
  saidUno: boolean = false

  constructor (public name: string) {
    this.name = name
    this.hand = []
  }

  public playCard (index: number): Card {
    if (index < 0 || index >= this.hand.length) {
      throw new Error('Card index out of bounds')
    }

    return this.hand.splice(index, 1)[0]
  }

  public beforeTurn () {
    this.saidUno = false
  }

  public sayUno () {
    this.saidUno = true
  }

  handScore (): number {
    return mapCardsToScore(this.hand)
  }

  toState () {
    return {
      name: this.name,
      hand: this.hand,
      saidUno: this.saidUno
    }
  }

  fromState (state: any) {
    this.name = state.name
    this.hand = state.hand
    this.saidUno = state
  }
}
