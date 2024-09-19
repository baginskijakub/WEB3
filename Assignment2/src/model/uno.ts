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

  constructor (public playerCount: number, public targetScore: number, public players: string[], public cardsPerPlayer: number, public shuffler: Shuffler<Card>, public randomizer: () => number) {
    if (playerCount < 2) {
      throw new Error('At least 2 players are required')
    }

    if (targetScore <= 0) {
      throw new Error('Target score must be more than 0')
    }

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

    this.hands.push(hand)
  }
}

export const createGame = (props: Partial<Props>): Game => {
  const {
    targetScore = 500,
    players = ['A', 'B'],
    cardsPerPlayer = 7,
    shuffler = standardShuffler,
    randomizer = () => 3
  } = props

  return new Game(players.length, targetScore, players, cardsPerPlayer, shuffler, randomizer)
}
