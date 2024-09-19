import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useGameStore } from './game.store'
import type { Color } from '~/src/model/deck'

export const usePlayerStore = defineStore('player', () => {
  const gameStore = useGameStore()
  const displayRequestColorModal = ref(false)
  const cardIndexToPlay = ref<number | null>(null)

  const playerCards = computed(() => {
    const currentHand = gameStore.game().currentHand()

    if (!currentHand) {
      return
    }

    // Assuming 'You' is the player's name
    return currentHand.players.find((p) => p.name === 'You')?.hand ?? []
  })

  const isPlayerInTurn = computed(() => {
    const playerInTurn = gameStore.game().currentHand()?.playerInTurn
    return playerInTurn === 0
  })

  const drawCard = () => {
    gameStore.drawCard()
  }

  const playCard = (cardIndex: number) => {
    const playerInTurn = gameStore.game().currentHand()?.playerInTurn

    const currentHand = gameStore.game().currentHand()

    // Assuming 'You' is the player's name
    if (!currentHand || playerInTurn !== 0 || !playerCards.value) {
      return
    }

    const card = playerCards.value[cardIndex]

    if (card.type === 'WILD' || card.type === 'WILD DRAW') {
      if(!currentHand.canPlay(cardIndex)) return

      displayRequestColorModal.value = true
      cardIndexToPlay.value = cardIndex
      return
    }

    gameStore.playCard(cardIndex)
  }

  const playWildCard = (color: Color) => {
    const playerInTurn = gameStore.game().currentHand()?.playerInTurn

    const currentHand = gameStore.game().currentHand()

    // Assuming 'You' is the player's name
    if (!currentHand || playerInTurn !== 0 || !playerCards.value || cardIndexToPlay.value === null) {
      return
    }

    currentHand.play(cardIndexToPlay.value!, color)
    displayRequestColorModal.value = false
    cardIndexToPlay.value = null
  }

  return {
    playerCards,
    playCard,
    drawCard,
    isPlayerInTurn,
    playWildCard,
    displayRequestColorModal,
  }
})
