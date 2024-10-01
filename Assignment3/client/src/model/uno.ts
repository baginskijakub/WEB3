import { createHand, type Hand } from './hand'
import { type Card } from './deck'
import type {Shuffler} from "./utils";
import {standardShuffler} from "./utils";

export interface Props {
  playerCount: number
  targetScore: number
  players: string[]
  cardsPerPlayer: number
  shuffler: Shuffler<Card>
  randomizer: () => number
}

export class Game {
  hands: Hand[] = []
  playerScores: number[] = []
  players: string[] = []
  targetScore: number = 50
  cardsPerPlayer: number = 2
  shuffler: Shuffler<Card> = standardShuffler
  randomizer: () => number = () => 3
  playerCount: number = 2
  handEndCallbacks: ((e: { winner: number }) => void)[] = []

  initGame ( props: Partial<Props>): void {
    const {
      playerCount = this.playerCount,
      targetScore= this.targetScore,
      players= ['A', 'B'],
      cardsPerPlayer = this.cardsPerPlayer,
      shuffler = this.shuffler,
      randomizer = this.randomizer
    } = props

    if (playerCount < 2) {
      throw new Error('At least 2 players are required')
    }

    if (targetScore <= 0) {
      throw new Error('Target score must be more than 0')
    }

    this.playerCount = playerCount
    this.targetScore = targetScore
    this.players = players
    this.cardsPerPlayer = cardsPerPlayer
    this.shuffler = shuffler
    this.randomizer = randomizer

    this.playerScores = Array(playerCount).fill(0)

    this.createHand()
  }

  player (index: number): string {
    if (index < 0 || index >= this.playerCount) {
      throw new Error('Player index out of bounds')
    }

    return this.players[index]
  }

  score (index: number): number {
    return this.playerScores[index] ?? 0
  }

  winner (): number | undefined {
    const winner = this.playerScores.findIndex(score => score >= this.targetScore)

    return winner === -1 ? undefined : winner
  }

  currentHand (): Hand | undefined {
    if (this.winner() !== undefined) return undefined

    return this.hands[this.hands.length - 1]
  }

  onHandEnd (cb: (e: { winner: number }) => void): void {
    this.handEndCallbacks.push(cb)
    this.hands.forEach(hand => hand.onEnd(cb))
  }

  createHand (): void {
    if (this.winner() !== undefined) return

    const hand = createHand(
      this.players,
      this.randomizer(),
      this.shuffler,
      this.cardsPerPlayer
    )

    hand.onEnd((e: { winner: number }) => {
      const score = hand.score()

      if (!score) {
        return
      }

      this.playerScores[e.winner] += score

      this.createHand()
    })

    this.handEndCallbacks.forEach(cb => hand.onEnd(cb))

    this.hands.push(hand)
  }
}

export const createGame = (props: Partial<Props>): Game => {
  const {
    targetScore = 50,
    players = ['A', 'B'],
    cardsPerPlayer = 2,
    shuffler = standardShuffler,
    randomizer = () => 3
  } = props

  const game = new Game()
  game.initGame({playerCount: players.length, targetScore, players, cardsPerPlayer, shuffler, randomizer})
  return game
}
