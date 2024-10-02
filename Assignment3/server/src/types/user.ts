export type User = {
  id: number
  email: string
  password: string
  name: string
}

export type Lobby = {
  id: number
  name: string
  ownerId: number
  players: User[]
}