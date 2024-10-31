export type Type = 'NUMBERED' | 'SKIP' | 'REVERSE' | 'DRAW' | 'WILD' | 'WILD DRAW'
export type Color = 'RED' | 'YELLOW' | 'GREEN' | 'BLUE'
export type Direction = 'CLOCKWISE' | 'COUNTERCLOCKWISE'

export interface Card {
  readonly type: Type
  readonly color?: Color
  readonly number?: number
}

export interface Player {
  readonly name: string
  readonly hand: readonly Card[]
  readonly saidUno: boolean
}

export interface GameState {
  readonly players: readonly Player[]
  readonly drawPile: readonly Card[]
  readonly discardPile: readonly Card[]
  readonly direction: Direction
  readonly currentPlayerIndex: number
  readonly lastPlayerToTakeAction?: number
  readonly requestedColor?: Color
  readonly scores: readonly number[]
  readonly targetScore: number
}