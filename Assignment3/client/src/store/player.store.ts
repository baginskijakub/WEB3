import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useGameStore } from './game.store'
import { useUserStore } from '~/src/store/user.store'
import type { Color } from '../types/types'

export const usePlayerStore = defineStore('player', () => {
  const userStore = useUserStore()
  const gameStore = useGameStore()
  const displayRequestColorModal = ref(false)
  const cardIndexToPlay = ref<number | null>(null)

  const playerCards = computed(() => {
    const currentHand = gameStore.game?.currentHand

    if (!currentHand) {
      return
    }

    return currentHand.players.find((p) => p.name === userStore.user?.name)?.hand ?? []
  })

  const isPlayerInTurn = computed(() => {
    const playerInTurn = gameStore.game?.currentHand?.playerInTurn

    if (playerInTurn === undefined) {
      return false
    }

    const players = gameStore.game?.players

    return players[playerInTurn] === userStore.user?.name
  })

  const drawCard = () => {
    if (isPlayerInTurn.value) {
      gameStore.drawCard()
    }
  }

  const playCard = (cardIndex: number) => {
    const currentHand = gameStore.game?.currentHand

    if (!currentHand || !isPlayerInTurn.value || !playerCards.value) {
      return
    }

    const card = playerCards.value[cardIndex]

    if (card.type === 'WILD' || card.type === 'WILD DRAW') {
      displayRequestColorModal.value = true
      cardIndexToPlay.value = cardIndex
      return
    }

    gameStore.playCard(cardIndex)
  }

  const playWildCard = (color: Color) => {
    const currentHand = gameStore.game?.currentHand

    if (!currentHand || !isPlayerInTurn.value || !playerCards.value || cardIndexToPlay.value === null) {
      return
    }

    const cardIndex = cardIndexToPlay.value

    displayRequestColorModal.value = false
    cardIndexToPlay.value = null

    gameStore.playCard(cardIndex, color)
  }

  const sayUno = () => gameStore.sayUno(0)

  return {
    playerCards,
    playCard,
    drawCard,
    isPlayerInTurn,
    playWildCard,
    displayRequestColorModal,
    sayUno,
  }
})
