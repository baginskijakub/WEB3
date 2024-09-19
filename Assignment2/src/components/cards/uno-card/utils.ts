import type { Card } from '~/src/model/deck'

export const COLOR_MAP = {
  YELLOW: 'bg-yellow-500',
  RED: 'bg-red-600',
  GREEN: 'bg-green-600',
  BLUE: 'bg-blue-600',
}
export const mapCardToStyle = (card: Card) => {
  switch (card.type) {
    case 'WILD':
    case 'WILD DRAW':
      return {
        color: 'bg-black',
      }
    default:
      return {
        color: card.color ? COLOR_MAP[card.color] : 'bg-black',
      }
  }
}
