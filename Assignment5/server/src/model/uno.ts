import { createHand, type Hand } from './hand'
import { type Card } from './deck'
import type {Shuffler} from "./utils";
import {standardShuffler} from "./utils";
import {TGame} from "../types";

export interface Props {
  id: number
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
      randomizer = this.randomizer,
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

  toState (): TGame {
    return {
      hands: this.hands.map(hand => hand.toState()),
      playerScores: this.playerScores,
      players: this.players,
      targetScore: this.targetScore,
      cardsPerPlayer: this.cardsPerPlayer,
      playerCount: this.playerCount,
      currentHand: this.currentHand()?.toState()
    }
  }

  fromState (state: any) {
    this.hands = state.hands.map((handState: any) => {
      const hand = createHand([], 0, this.shuffler, 0)
      hand.fromState(handState)
      return hand
    })

    this.playerScores = state.playerScores
    this.players = state.players
    this.targetScore = state.targetScore
    this.cardsPerPlayer = state.cardsPerPlayer
    this.playerCount = state.playerCount
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

const xd = {"type":"GAME_CHANGE","payload":{"hands":[{"players":[{"name":"Tomek","hand":[],"saidUno":false},{"name":"beti","hand":[{"type":"DRAW","color":"RED"},{"type":"NUMBERED","color":"RED","number":9},{"type":"REVERSE","color":"RED"},{"type":"SKIP","color":"BLUE"},{"type":"NUMBERED","color":"YELLOW","number":2},{"type":"NUMBERED","color":"YELLOW","number":8}],"saidUno":false}],"drawPile":{"cards":[{"type":"NUMBERED","color":"BLUE","number":5},{"type":"NUMBERED","color":"BLUE","number":2},{"type":"SKIP","color":"YELLOW"},{"type":"NUMBERED","color":"RED","number":1},{"type":"NUMBERED","color":"BLUE","number":6},{"type":"NUMBERED","color":"YELLOW","number":3},{"type":"NUMBERED","color":"GREEN","number":7},{"type":"NUMBERED","color":"YELLOW","number":2},{"type":"NUMBERED","color":"BLUE","number":2},{"type":"NUMBERED","color":"GREEN","number":8},{"type":"NUMBERED","color":"BLUE","number":3},{"type":"NUMBERED","color":"GREEN","number":4},{"type":"NUMBERED","color":"GREEN","number":1},{"type":"NUMBERED","color":"BLUE","number":3},{"type":"NUMBERED","color":"GREEN","number":2},{"type":"WILD"},{"type":"NUMBERED","color":"GREEN","number":2},{"type":"NUMBERED","color":"RED","number":7},{"type":"NUMBERED","color":"YELLOW","number":6},{"type":"NUMBERED","color":"YELLOW","number":1},{"type":"NUMBERED","color":"RED","number":7},{"type":"WILD"},{"type":"NUMBERED","color":"RED","number":1},{"type":"NUMBERED","color":"RED","number":5},{"type":"NUMBERED","color":"BLUE","number":8},{"type":"DRAW","color":"RED"},{"type":"NUMBERED","color":"YELLOW","number":3},{"type":"NUMBERED","color":"GREEN","number":1},{"type":"NUMBERED","color":"BLUE","number":9},{"type":"NUMBERED","color":"RED","number":8},{"type":"NUMBERED","color":"YELLOW","number":4},{"type":"NUMBERED","color":"BLUE","number":8},{"type":"SKIP","color":"BLUE"},{"type":"DRAW","color":"YELLOW"},{"type":"NUMBERED","color":"GREEN","number":5},{"type":"NUMBERED","color":"BLUE","number":7},{"type":"NUMBERED","color":"RED","number":6},{"type":"NUMBERED","color":"BLUE","number":0},{"type":"NUMBERED","color":"GREEN","number":9},{"type":"NUMBERED","color":"GREEN","number":5},{"type":"NUMBERED","color":"BLUE","number":4},{"type":"NUMBERED","color":"BLUE","number":1},{"type":"NUMBERED","color":"RED","number":9},{"type":"NUMBERED","color":"GREEN","number":7},{"type":"NUMBERED","color":"GREEN","number":9},{"type":"NUMBERED","color":"YELLOW","number":7},{"type":"NUMBERED","color":"GREEN","number":8},{"type":"NUMBERED","color":"RED","number":4},{"type":"REVERSE","color":"GREEN"},{"type":"REVERSE","color":"RED"},{"type":"NUMBERED","color":"BLUE","number":4},{"type":"NUMBERED","color":"RED","number":0},{"type":"NUMBERED","color":"RED","number":4},{"type":"NUMBERED","color":"RED","number":2},{"type":"NUMBERED","color":"YELLOW","number":4},{"type":"NUMBERED","color":"RED","number":6},{"type":"NUMBERED","color":"GREEN","number":6},{"type":"REVERSE","color":"YELLOW"},{"type":"DRAW","color":"GREEN"},{"type":"NUMBERED","color":"YELLOW","number":5},{"type":"DRAW","color":"BLUE"},{"type":"REVERSE","color":"BLUE"},{"type":"NUMBERED","color":"BLUE","number":9},{"type":"SKIP","color":"GREEN"},{"type":"WILD DRAW"},{"type":"NUMBERED","color":"GREEN","number":3},{"type":"NUMBERED","color":"RED","number":3},{"type":"NUMBERED","color":"YELLOW","number":7},{"type":"SKIP","color":"RED"},{"type":"NUMBERED","color":"YELLOW","number":6},{"type":"NUMBERED","color":"YELLOW","number":9},{"type":"NUMBERED","color":"YELLOW","number":1},{"type":"NUMBERED","color":"GREEN","number":6},{"type":"SKIP","color":"YELLOW"},{"type":"WILD"},{"type":"REVERSE","color":"GREEN"},{"type":"NUMBERED","color":"BLUE","number":1},{"type":"REVERSE","color":"YELLOW"},{"type":"NUMBERED","color":"YELLOW","number":9},{"type":"NUMBERED","color":"RED","number":2},{"type":"NUMBERED","color":"GREEN","number":3},{"type":"DRAW","color":"BLUE"},{"type":"NUMBERED","color":"RED","number":3},{"type":"WILD"},{"type":"NUMBERED","color":"BLUE","number":5},{"type":"DRAW","color":"YELLOW"},{"type":"NUMBERED","color":"YELLOW","number":5},{"type":"REVERSE","color":"BLUE"},{"type":"NUMBERED","color":"RED","number":8},{"type":"WILD DRAW"},{"type":"SKIP","color":"RED"},{"type":"SKIP","color":"GREEN"},{"type":"NUMBERED","color":"YELLOW","number":0},{"type":"WILD DRAW"},{"type":"NUMBERED","color":"BLUE","number":7},{"type":"NUMBERED","color":"YELLOW","number":8},{"type":"DRAW","color":"GREEN"},{"type":"NUMBERED","color":"GREEN","number":4},{"type":"NUMBERED","color":"BLUE","number":6}]},"discardPile":{"cards":[{"type":"NUMBERED","color":"GREEN","number":0},{"type":"WILD DRAW"},{"type":"NUMBERED","color":"RED","number":5}]},"direction":"CLOCKWISE","playerInTurn":1,"lastPlayerToTakeAction":0,"topCardApplied":true,"playerCount":2}],"playerScores":[79,0],"players":["Tomek","beti"],"targetScore":50,"cardsPerPlayer":2,"playerCount":2}}