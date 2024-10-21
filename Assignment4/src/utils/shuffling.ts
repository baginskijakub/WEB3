import { type Card } from '../model/deck'
import { type Hand } from '../model/hand'
import { type Shuffler, standardShuffler } from './utils'
import { type CardPredicate, type CardSpec, is, not } from './predicates'
import { type HandProps, createHand } from './test_adapter'

export function constrainedShuffler (...constraints: Array<[number, CardPredicate]>): Shuffler<Card> {
  return (cards: Card[]) => {
    constraints.sort(([a, _], [b, __]) => a - b)
    standardShuffler(cards)
    const foundCards: Card[] = []
    for (let i = 0; i < constraints.length; i++) {
      const [_, predicate] = constraints[i]
      const foundIndex = cards.findIndex(predicate)
      if (foundIndex === -1) throw new Error('Unsatisfiable predicate')
      foundCards.push(cards[foundIndex])
      cards.splice(foundIndex, 1)
    }
    for (let i = 0; i < constraints.length; i++) {
      const [index] = constraints[i]
      cards.splice(index, 0, foundCards[i])
    }
  }
}

export function memoizingShuffler (shuffler: Shuffler<Card>): { readonly shuffler: Shuffler<Card>, readonly memo: Readonly<Card[]> } {
  let memo: Card[] = []
  function shuffle (cards: Card[]): void {
    shuffler(cards)
    memo = [...cards]
  }
  return { shuffler: shuffle, get memo () { return memo } }
}

export function successiveShufflers (...shufflers: Array<Shuffler<Card>>): Shuffler<Card> {
  let index = 0
  let shuffler = shufflers[index]
  return (cards: Card[]) => {
    shuffler(cards)
    if (index < shufflers.length - 1) index++
    shuffler = shufflers[index]
  }
}

export function shorteningShuffler (size: number, shuffler: Shuffler<Card>): Shuffler<Card> {
  function shorteningShuffler (cards: Card[]) {
    shuffler(cards)
    cards.splice(size)
  }
  return shorteningShuffler
}

export function createHandWithShuffledCards (props: Partial<HandProps>): [Hand, Readonly<Card[]>] {
  const shuffler = props.shuffler ?? standardShuffler
  const memoShuffler = memoizingShuffler(shuffler)
  const hand = createHand({
    players: props.players ?? ['a', 'b', 'c', 'd'],
    dealer: props.dealer ?? 1,
    shuffler: memoShuffler.shuffler
  })
  return [hand, memoShuffler.memo]
}

export interface ShuffleBuilder {
  discard: () => ShuffleBuilder
  drawPile: () => ShuffleBuilder
  hand: (player: number) => ShuffleBuilder
  top: () => ShuffleBuilder
  repeat: (n: number) => ShuffleBuilder
  is: (...spec: CardSpec[]) => ShuffleBuilder
  isnt: (...spec: CardSpec[]) => ShuffleBuilder
  build: () => Shuffler<Card>
}

export function shuffleBuilder (
  { players, cardsPerPlayer: cardsInHand }: { players: number, cardsPerPlayer: number } = { players: 4, cardsPerPlayer: 7 }
): ShuffleBuilder {
  const constraints = new Map<number, CardPredicate>()
  const topOfDiscardPile = players * cardsInHand
  let currentIndex = 0
  let repetition = 1

  function constrain (preds: CardPredicate[]): ShuffleBuilder {
    for (let i = 0; i < repetition; i++) {
      for (const pred of preds) {
        constraints.set(currentIndex++, pred)
      }
    }
    repetition = 1
    return builder
  }

  const builder = {
    discard () {
      currentIndex = topOfDiscardPile
      repetition = 1
      return builder
    },
    drawPile () {
      currentIndex = topOfDiscardPile + 1
      repetition = 1
      return builder
    },
    hand (player: number) {
      currentIndex = player * cardsInHand
      repetition = 1
      return builder
    },
    top () {
      currentIndex = 0
      repetition = 1
      return builder
    },
    repeat (n: number) {
      repetition = n
      return builder
    },
    is (...specs: CardSpec[]) {
      return constrain(specs.map(is))
    },
    isnt (...specs: CardSpec[]) {
      return constrain(specs.map(spec => not(is(spec))))
    },
    build: () => constrainedShuffler(...constraints.entries())
  }

  return builder
}
