import type { User } from '~/src/model/user'

export type Lobby = {
  id: number
  name: string
  ownerId: number
  players: User[]
}