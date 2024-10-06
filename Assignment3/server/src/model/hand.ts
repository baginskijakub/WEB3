import * as deck from './deck'
import { type Card, type Color } from './deck'
import { Player } from './player'
import {Shuffler} from "./utils";
import {THand} from "../types";


export class Hand {
  public playerCount: number
  public players: Player[]
  public drawPile: deck.Deck
  public discardPile: deck.Deck
  public direction: 'CLOCKWISE' | 'COUNTERCLOCKWISE' = 'CLOCKWISE'
  public playerInTurn: number
  public lastPlayerToTakeAction: number | undefined
  public requestedColor?: Color
  private topCardApplied: boolean = false
  private readonly callbacks: Array<(e: any) => void> = []

  constructor(
    players: string[],
    public dealer: number,
    public shuffler: Shuffler<deck.Card>,
    public cardsPerPlayer: number,
  ) {
    this.drawPile = deck.createInitialDeck()
    this.drawPile.shuffle(this.shuffler)

    this.discardPile = new deck.Deck([])

    this.players = players.map((player) => new Player(player))
    this.dealer = dealer
    this.shuffler = shuffler
    this.cardsPerPlayer = cardsPerPlayer
    this.playerCount = players.length
    this.playerInTurn = dealer

    this.initialDeal()

    this.beforeFirstTurn()
  }

  player(index: number): string {
    if (index < 0 || index >= this.playerCount) {
      throw new Error('Player index out of bounds')
    }
    return this.players[index].name
  }

  playerHand(index: number): Card[] {
    return this.players[index].hand
  }

  getPlayerInTurn(): number | undefined {
    return this.hasEnded() ? undefined : this.playerInTurn
  }

  private initialDeal() {
    for (let i = 0; i < this.playerCount; i++) {
      for (let j = 0; j < this.cardsPerPlayer; j++) {
        const card = this.drawPile.deal()

        if (!card) {
          throw new Error('No cards in deck')
        }

        this.players[i].hand.push(card)
      }
    }
  }

  private beforeFirstTurn() {
    const firstCard = this.drawPile.deal()

    if (!firstCard) {
      throw new Error('No cards in deck')
    }

    if (firstCard.type === 'WILD' || firstCard.type === 'WILD DRAW') {
      this.drawPile.push(firstCard)
      this.drawPile.shuffle(this.shuffler)

      this.beforeFirstTurn()
    } else {
      this.discardPile.push(firstCard)
      this.topCardApplied = false
      this.beforeNextTurn()
    }
  }

  private beforeNextTurn() {
    if (this.drawPile.size === 0) {
      this.reshuffleFromDiscardPile()
    }

    const topCard = this.discardPile.top()

    if (this.topCardApplied) {
      this.incrementPlayer(1)
      this.players[this.playerInTurn].beforeTurn()
      return
    }

    if (topCard.type === 'REVERSE') {
      if (this.playerCount === 2) {
        this.incrementPlayer(2)
      }
      this.direction = this.direction === 'CLOCKWISE' ? 'COUNTERCLOCKWISE' : 'CLOCKWISE'
    }

    switch (topCard.type) {
      case 'SKIP':
        this.incrementPlayer(2)
        break
      case 'DRAW':
        this.nextPlayerDraw(2)
        this.incrementPlayer(2)
        break
      case 'WILD DRAW':
        this.nextPlayerDraw(4)
        this.incrementPlayer(2)
        break
      case 'REVERSE':
        if (this.playerCount === 2) {
          this.incrementPlayer(2)
        } else {
          this.incrementPlayer(1)
        }
        break
      default:
        this.incrementPlayer(1)
    }

    this.players[this.playerInTurn].beforeTurn()

    this.topCardApplied = true
  }

  incrementPlayer(i: number): void {
    if (this.direction === 'CLOCKWISE') {
      this.playerInTurn = (this.playerInTurn + i) % this.playerCount
    }

    if (this.direction === 'COUNTERCLOCKWISE') {
      this.playerInTurn = (this.playerInTurn - i + this.playerCount) % this.playerCount
    }
  }

  nextPlayerDraw(i: number): void {
    for (let j = 0; j < i; j++) {
      let card = this.drawPile.deal()

      if (!card) {
        this.reshuffleFromDiscardPile()
        card = this.drawPile.deal()
      }

      if (!card) return

      this.direction === 'CLOCKWISE' && this.players[(this.playerInTurn + 1) % this.playerCount].hand.push(card)
      this.direction === 'COUNTERCLOCKWISE' && this.players[(this.playerInTurn - 1) % this.playerCount].hand.push(card)
    }
  }

  canPlay(cardIndex: number): boolean {
    if (this.hasEnded()) {
      return false
    }

    const card = this.players[this.playerInTurn].hand[cardIndex]

    if (!card) {
      return false
    }

    if (card.type === 'WILD') {
      return true
    }

    const topCard = this.discardPile.top()

    if (card.type === 'WILD DRAW') {
      if (topCard.color && this.players[this.playerInTurn].hand.some((c) => c.color === topCard.color)) {
        return false
      }

      return !(this.requestedColor && this.players[this.playerInTurn].hand.some((c) => c.color === this.requestedColor))
    }

    if (this.requestedColor) {
      return card.color === this.requestedColor
    }

    if (card.type === 'NUMBERED') {
      return card.number === topCard.number || card.color === topCard.color
    }

    return card.type === topCard.type || card.color === topCard.color
  }

  canPlayAny(): boolean {
    return this.players[this.playerInTurn].hand.some((_, index) => this.canPlay(index))
  }

  play(cardIndex: number, requestColor?: Color): Card {
    if (!this.canPlay(cardIndex)) {
      throw new Error('Cannot play card')
    }

    const card = this.players[this.playerInTurn].playCard(cardIndex)

    if (!card) {
      throw new Error('Card index out of bounds')
    }

    if (card.type === 'WILD' || card.type === 'WILD DRAW') {
      if (!requestColor) {
        throw new Error('Request color is required when playing wild card')
      }

      this.requestedColor = requestColor
    } else if (requestColor) {
      throw new Error('Request color is only allowed when playing wild card')
    } else {
      this.requestedColor = undefined
    }

    this.discardPile.push(card)
    this.topCardApplied = false
    this.lastPlayerToTakeAction = this.playerInTurn
    this.beforeNextTurn()

    if (this.hasEnded()) {
      this.callbacks.forEach((cb) => {
        cb({ winner: this.winner() })
      })
    }

    return card
  }

  draw(): void {
    if (this.hasEnded()) {
      throw new Error('Game has ended')
    }

    const card = this.drawPile.deal()

    if (!card) {
      throw new Error('No cards in deck')
    }

    this.players[this.playerInTurn].hand.push(card)

    this.lastPlayerToTakeAction = this.playerInTurn

    if (!this.canPlayAny()) {
      this.beforeNextTurn()
    }
  }

  reshuffleFromDiscardPile(): void {
    const topCard = this.discardPile.top()

    this.drawPile.cards = this.discardPile.cards.slice(0, -1)
    this.drawPile.shuffle(this.shuffler)

    if (topCard) this.discardPile.cards = [topCard]
  }

  catchUnoFailure(props: { accuser: number; accused: number }): boolean {
    const { accused } = props

    if (accused < 0 || accused >= this.playerCount) {
      throw new Error('Player index out of bounds')
    }


    if (this.lastPlayerToTakeAction !== accused) {
      return false
    }

    if (this.players[accused].hand.length === 1 && !this.players[accused].saidUno) {
      for (let i = 0; i < 4; i++) {
        let card = this.drawPile.deal()

        if (!card) {
          this.reshuffleFromDiscardPile()
          card = this.drawPile.deal()
        }

        if (!card) return false

        this.players[accused].hand.push(card)
      }

      return true
    }

    return false
  }

  sayUno(playerIndex: number) {
    if (this.hasEnded()) {
      throw new Error('Game has ended')
    }

    this.players[playerIndex].sayUno()
  }

  hasEnded(): boolean {
    return this.players.some((player) => player.hand.length === 0)
  }

  onEnd(cb: (e: any) => void) {
    this.callbacks.push(cb)
  }

  winner(): number | undefined {
    const winner = this.players.findIndex((player) => player.hand.length === 0)

    return winner === -1 ? undefined : winner
  }

  score(): number | undefined {
    if (!this.hasEnded()) {
      return undefined
    }

    return this.players.reduce((acc, player) => acc + player.handScore(), 0)
  }

  toState(): THand {
    return {
      players: this.players.map((player) => player.toState()),
      drawPile: this.drawPile.toState(),
      discardPile: this.discardPile.toState(),
      direction: this.direction,
      playerInTurn: this.playerInTurn,
      lastPlayerToTakeAction: this.lastPlayerToTakeAction,
      requestedColor: this.requestedColor,
      topCardApplied: this.topCardApplied,
      playerCount: this.playerCount,
    }
  }

  fromState(state: any) {
    this.players = state.players.map((playerState: any) => {
      const player = new Player('')
      player.fromState(playerState)
      return player
    })

    this.drawPile = new deck.Deck([])
    this.drawPile.fromState(state.drawPile)

    this.discardPile = new deck.Deck([])
    this.discardPile.fromState(state.discardPile)

    this.direction = state.direction
    this.playerInTurn = state.playerInTurn
    this.lastPlayerToTakeAction = state.lastPlayerToTakeAction
    this.requestedColor = state.requestedColor
    this.topCardApplied = state.topCardApplied
  }
}

export const createHand = (
  players: string[],
  dealer: number,
  shuffler: Shuffler<deck.Card>,
  cardsPerPlayer: number,
): Hand => {
  if (players.length < 2) {
    throw new Error('At least 2 players are required')
  }

  if (players.length > 10) {
    throw new Error('At most 10 players are allowed')
  }

  return new Hand(players, dealer, shuffler, cardsPerPlayer)
}
