import type {Card} from "~/src/model/deck";

export type Randomizer = (bound: number) => number

// Uniformly selected pseudo-random number
export const standardRandomizer: Randomizer = n => Math.floor(Math.random() * n)

// A function that shuffles the given array
export type Shuffler<T> = (cards: T[]) => void

// Perfect shuffle using the Fisher-Yates method
export function standardShuffler<T> (cards: T[]): void {
  for (let i = 0; i < cards.length - 1; i++) {
    const j = Math.floor(Math.random() * (cards.length - i) + i)
    const temp = cards[j]
    cards[j] = cards[i]
    cards[i] = temp
  }
}

export const mapCardsToScore = (cards: Card[]): number => {
  return cards.reduce((acc, card) => {
    if (card.type === 'NUMBERED') {
      return acc + (card.number ?? 0)
    }

    if (card.type === 'WILD' || card.type === 'WILD DRAW') {
      return acc + 50
    }

    return acc + 20
  }, 0)
}
