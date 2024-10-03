import { useAsyncData } from '#app'
import { LobbyService } from '~/src/services/lobby.service'
import { useUserStore } from '~/src/store/user.store'

// Declare WebSocket variable outside the store to avoid re-initialization
let ws: WebSocket | null = null

export const useLobbyStore = defineStore('lobby', () => {
  const userStore = useUserStore()
  const { data } = useAsyncData(async () => await LobbyService.getAllLobbies())

  // Make sure WebSocket is initialized only on the client side
  if (process.client && !ws) {
    ws = new WebSocket('ws://localhost:5001/lobby')

    ws.onmessage = (event) => {
      const { type, payload } = JSON.parse(event.data)

      if (type === 'LOBBY_CHANGE') {
        data.value = payload
      }

      if (type === 'LOBBY_STARTED') {
        navigateTo(`/game/${payload.lobbyId}`)
      }
    }
  }

  const joinLobby = async (lobbyId: string) => {
    if (userStore.user) {
      await LobbyService.joinLobby(userStore.user.id, lobbyId)
    }
  }

  const createLobby = async (lobbyName: string) => {
    if (userStore.user) {
      await LobbyService.createLobby(lobbyName, userStore.user.id)
    }
  }

  const startLobby = async (lobbyId: string) => {
    if (ws) {
      ws.send(JSON.stringify({ type: 'LOBBY_START', payload: { lobbyId } }))
    }
  }

  return {
    lobbies: data,
    joinLobby,
    createLobby,
    startLobby,
  }
})
