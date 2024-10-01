import { defineStore } from 'pinia'
import { createGame, type Game, type Props } from '~/src/model'
import type { Color } from '../model/deck'

export const useGameStore = defineStore('game', () => {
  const gameState = reactive<Game>(createGame({}))

  const initGame = (props: Partial<Props>) => {
    gameState.initGame(props)
    nextTurn()
  }

  const game = (): Game => {
    if (!gameState) {
      navigateTo('new-game')
      throw new Error('Game not initialized')
    }

    return <Game>gameState
  }

  const playCard = (cardIndex: number, requestColor?: Color) => {
    game().currentHand()?.play(cardIndex, requestColor)
    nextTurn()
  }

  const drawCard = () => {
    game().currentHand()?.draw()
    nextTurn()
  }

  const sayUno = (playerIndex: number) => {
    game().currentHand()?.sayUno(playerIndex)
  }

  const accuseOfNotSayingUno = (accuser: number, accused: number) => {
    game().currentHand()?.catchUnoFailure({accuser, accused})
  }

  const nextTurn = () => {
    const playerInTurn = game().currentHand()?.playerInTurn

    if (playerInTurn) {
      botTurn()
    }
  }

  const botTurn = () => {
    imitateThinking(() => {
      const playerInTurn = game().currentHand()?.playerInTurn

      if (playerInTurn) {
        randomAccuse()

        const cards = game().currentHand()?.players[playerInTurn].hand

        if (!cards) return

        for (let i = 0; i < cards.length; i++) {
          if (game().currentHand()?.canPlay(i)) {
            if (['WILD', 'WILD DRAW'].includes(cards[i].type)) {
              playCard(i, randomColor())

              if(cards.length === 1) {
                Math.random() > 0.5 && sayUno(playerInTurn)
              }

              return nextTurn()
            }

            game().currentHand()?.play(i)

            if(cards.length === 1) {
              Math.random() > 0.5 && sayUno(playerInTurn)
            }

            return nextTurn()
          }
        }

        game().currentHand()?.draw()
        nextTurn()
      }
    })
  }

  const randomAccuse = () => {
    const players = game().players

    for (let i = 0; i < players.length; i++) {
      const accuser = game().currentHand()?.playerInTurn
      const accused = i

      if (game().currentHand()?.players[accused].hand.length === 1) {
        Math.random() > 0.7 && accuser && accuseOfNotSayingUno(accuser, accused)
      }

    }
  }

  return {
    game,
    initGame,
    playCard,
    drawCard,
    sayUno,
    accuseOfNotSayingUno,
    nextTurn,
    botTurn
  }
})

const imitateThinking = (cb: () => void) => {
  const timeout = Math.random() * 1000 + 500
  return setTimeout(() => cb(), timeout)
}

const randomColor = () => {
  const colors: Color[] = ['RED', 'BLUE', 'GREEN', 'YELLOW']
  return colors[Math.floor(Math.random() * colors.length)]
}
