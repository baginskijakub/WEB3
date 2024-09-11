import { type Shuffler } from '../utils/utils'

export type Type = 'NUMBERED' | 'SKIP' | 'REVERSE' | 'DRAW' | 'WILD' | 'WILD DRAW'
export type Color = 'RED' | 'YELLOW' | 'GREEN' | 'BLUE'

export const colors: Color[] = ['RED', 'YELLOW', 'GREEN', 'BLUE']

export interface Card {
  type: Type
  color?: Color
  number?: number
}

export class Deck {
  constructor (public cards: Card[]) {
  }

  deal (): Card | undefined {
    const first = this.cards.reverse().pop()

    this.cards.reverse()

    return first
  }

  filter (pred: (c: Card) => boolean): Deck {
    return new Deck(this.cards.filter(pred))
  }

  get size (): number {
    return this.cards.length
  }

  shuffle (shuffler: Shuffler<Card>): void {
    shuffler(this.cards)
  }
}

export const createInitialDeck = (): Deck => {
  const cards: Card[] = []
  for (const color of colors) {
    cards.push({ type: 'NUMBERED', color, number: 0 })
    for (let number = 1; number < 10; number++) {
      cards.push({ type: 'NUMBERED', color, number })
      cards.push({ type: 'NUMBERED', color, number })
    }
    cards.push({ type: 'SKIP', color })
    cards.push({ type: 'SKIP', color })
    cards.push({ type: 'REVERSE', color })
    cards.push({ type: 'REVERSE', color })
    cards.push({ type: 'DRAW', color })
    cards.push({ type: 'DRAW', color })
  }
  for (const _ of Array(4)) {
    cards.push({ type: 'WILD' })
    cards.push({ type: 'WILD DRAW' })
  }
  return new Deck(cards)
}
