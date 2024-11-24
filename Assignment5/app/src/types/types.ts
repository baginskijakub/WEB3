export interface TGame {
  hands: THand[]
  currentHand: THand
  playerScores: number[]
  players: string[]
  targetScore: number
  cardsPerPlayer: number
  playerCount: number
}

interface THand {
  playerCount: number
  players: Player[]
  drawPile: TDeck
  discardPile: TDeck
  direction: 'CLOCKWISE' | 'COUNTERCLOCKWISE'
  playerInTurn: number
  lastPlayerToTakeAction: number | undefined
  requestedColor?: Color
  topCardApplied: boolean
}

interface TDeck {
  cards: Card[]
}

export interface Card {
  type: Type
  color?: Color
  number?: number
}

export type Type = 'NUMBERED' | 'SKIP' | 'REVERSE' | 'DRAW' | 'WILD' | 'WILD DRAW'
export type Color = 'RED' | 'YELLOW' | 'GREEN' | 'BLUE'

export const colors: Color[] = ['RED', 'YELLOW', 'GREEN', 'BLUE']

export interface Player {
  hand: Card[]
  saidUno: boolean
  name: string
}

export type Lobby = {
  id: number
  name: string
  ownerId: number
  players: User[]
}

export interface User {
  id: number
  email: string
  password: string
  name: string
}
