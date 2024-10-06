import { defineStore } from 'pinia'

import { useUserStore } from '~/src/store/user.store'
import type { Color, TGame } from '~/src/types/types'

let ws: WebSocket | null = null

export const useGameStore = defineStore('game', () => {
  const userStore = useUserStore()
  const gameState = ref<TGame | null>(null)
  const gameId = ref<number | null>(null)
  const displayHandCompleteModal = ref(false)
  const displayGameOverModal = ref(false)

  const initWs = (id: number) => {
    gameId.value = id

    if (import.meta.client && !ws) {
      ws = new WebSocket(`ws://localhost:5001/game/${id}`)

      ws.onmessage = (event) => {
        const { type, payload } = JSON.parse(event.data)

        if (type === 'GAME_CHANGE') {
          gameState.value = payload
        }

        if (type === 'HAND_COMPLETE') {
          displayHandCompleteModal.value = true
        }

        if (type === 'GAME_OVER') {
          displayGameOverModal.value = true
        }
      }
    }
  }

  const playCard = (cardIndex: number, requestColor?: Color) => {
    ws?.send(JSON.stringify({ type: 'PLAY_CARD', payload: { cardIndex, requestColor } }))
  }

  const drawCard = () => {
    ws?.send(JSON.stringify({ type: 'DRAW_CARD' }))
  }

  const sayUno = () => {
    const playerIndex = gameState.value?.players.findIndex((p) => p === userStore.user?.name)

    ws?.send(JSON.stringify({ type: 'SAY_UNO', payload: { playerIndex } }))
  }

  const accuseOfNotSayingUno = (accused: number) => {
    const accuser = gameState.value?.players.findIndex((p) => p === userStore.user?.name)

    ws?.send(JSON.stringify({ type: 'ACCUSE_OF_NOT_SAYING_UNO', payload: { accuser, accused } }))
  }

  const closeModal = () => {
    displayHandCompleteModal.value = false
    displayGameOverModal.value = false
  }

  return {
    game: gameState,
    initWs,
    playCard,
    drawCard,
    sayUno,
    accuseOfNotSayingUno,
    displayHandCompleteModal,
    displayGameOverModal,
    closeModal,
  }
})
