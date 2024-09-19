import { defineStore } from 'pinia'
import { ref } from 'vue'
import { createGame, type Game, type Props } from '~/src/model'
import type { Color } from '../model/deck'

export const useGameStore = defineStore('game', () => {
  const gameState = ref<Game | null>(null)

  const initGame = (props: Partial<Props>) => {
    gameState.value = createGame(props)
    nextTurn()
  }

  const game = (): Game => {
    if (!gameState.value) {
      navigateTo('new-game')
      throw new Error('Game not initialized')
    }

    return gameState.value as Game
  }

  const playCard = (cardIndex: number, requestColor?: Color) => {
    game().currentHand()?.play(cardIndex, requestColor)
    nextTurn()
  }

  const drawCard = () => {
    game().currentHand()?.draw()
    nextTurn()
  }

  const nextTurn = () => {
    const playerInTurn = game().currentHand()?.playerInTurn

    playerInTurn && console.log(game().players[playerInTurn])

    if (playerInTurn) {
      botTurn()
    }
  }

  const botTurn = () => {
    imitateThinking(() => {
      const playerInTurn = game().currentHand()?.playerInTurn

      if (playerInTurn) {
        const cards = game().currentHand()?.players[playerInTurn].hand

        if (!cards) return

        for (let i = 0; i < cards.length; i++) {
          if (game().currentHand()?.canPlay(i)) {
            if (['WILD', 'WILD DRAW'].includes(cards[i].type)) {
              playCard(i, 'RED')
              return nextTurn()
            }

            game().currentHand()?.play(i)
            return nextTurn()
          }
        }

        game().currentHand()?.draw()
        nextTurn()
      }
    })
  }

  return {
    game,
    initGame,
    playCard,
    drawCard,
  }
})

const imitateThinking = (cb: () => void) => {
  const timeout = Math.random() * 1000
  return setTimeout(() => cb(), timeout)
}
