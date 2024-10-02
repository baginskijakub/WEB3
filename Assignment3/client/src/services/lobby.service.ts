import { API_URL } from '~/src/services/utils'
import type { Lobby } from '~/src/model/lobby'


const createLobby = async (name: string, userId: number): Promise<Lobby[]> => {
  const response = await fetch(`${API_URL}/lobby/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, userId }),
  })

  if (!response.ok) {
    throw new Error('Failed to create lobby')
  }

  return response.json()
}

const joinLobby = async (userId: number, lobbyId: number): Promise<Lobby[]> => {
  const response = await fetch(`${API_URL}/lobby/join`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, lobbyId }),
  })

  if (!response.ok) {
    throw new Error('Failed to join lobby')
  }

  return response.json()
}

const getAllLobbies = async (): Promise<Lobby[]> => {
  const response = await fetch(`${API_URL}/lobby`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })

  if (!response.ok) {
    throw new Error('Failed to get lobbies')
  }

  return response.json()
}
export const LobbyService = {
  createLobby,
  joinLobby,
  getAllLobbies
}