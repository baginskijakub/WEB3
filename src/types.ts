type CardColor = 'red' | 'blue' | 'green' | 'yellow' | 'neutral'

type CardValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 'skip' | 'reverse' | 'draw2' | 'draw4' | 'wild'

interface Card {
  color: CardColor
  value: CardValue
}

interface Deck {
  cards: Card[]
}

interface Player {
  points: number
  name: string
  hand: Deck
}

interface Hand {
  drawPile: Deck
  discardPile: Deck
  players: Player[]
}

interface Game {
  hands: Hand[]
  currentPlayer: number
  direction: 'clockwise' | 'counter-clockwise'
}
