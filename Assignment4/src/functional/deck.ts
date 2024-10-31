import { Card, Color, Type } from './types'

export const createCard = (type: Type, color?: Color, number?: number): Card => ({
  type,
  color,
  number
})

export const createInitialDeck = (): readonly Card[] => {
  const colors: readonly Color[] = ['RED', 'YELLOW', 'GREEN', 'BLUE']
  const cards: Card[] = []

  for (const color of colors) {
    cards.push(createCard('NUMBERED', color, 0))
    for (let number = 1; number < 10; number++) {
      cards.push(createCard('NUMBERED', color, number))
      cards.push(createCard('NUMBERED', color, number))
    }
    cards.push(createCard('SKIP', color))
    cards.push(createCard('SKIP', color))
    cards.push(createCard('REVERSE', color))
    cards.push(createCard('REVERSE', color))
    cards.push(createCard('DRAW', color))
    cards.push(createCard('DRAW', color))
  }

  for (let i = 0; i < 4; i++) {
    cards.push(createCard('WILD'))
    cards.push(createCard('WILD DRAW'))
  }

  return cards
}