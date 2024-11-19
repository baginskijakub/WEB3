import type { User } from '../types'

export type Lobby = {
  id: number
  name: string
  ownerId: number
  players: User[]
}