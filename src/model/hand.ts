import { type Shuffler } from '../utils/utils'
import * as deck from './deck'
import { Player } from './player'
import { type Card } from './deck'

export class Hand {
  public playerCount: number
  public players: Player[]
  public drawPile: deck.Deck
  public discardPile: deck.Deck
  public direction: 'CLOCKWISE' | 'COUNTERCLOCKWISE' = 'CLOCKWISE'
  public playerInTurn: number

  constructor (players: string[], public dealer: number, public shuffler: Shuffler<deck.Card>, public cardsPerPlayer: number) {
    this.drawPile = deck.createInitialDeck()
    this.drawPile.shuffle(this.shuffler)

    this.discardPile = new deck.Deck([])

    this.players = players.map(player => new Player(player))
    this.dealer = dealer
    this.shuffler = shuffler
    this.cardsPerPlayer = cardsPerPlayer
    this.playerCount = players.length
    this.playerInTurn = 0

    this.initialDeal()

    this.beforeFirstTurn()
  }

  player (index: number): string {
    if (index < 0 || index >= this.playerCount) {
      throw new Error('Player index out of bounds')
    }
    return this.players[index].name
  }

  playerHand (index: number): Card[] {
    return this.players[index].hand
  }

  private initialDeal () {
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

  private beforeFirstTurn () {
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
      this.beforeNextTurn()
    }
  }

  private beforeNextTurn () {
    const topCard = this.discardPile.top()

    if (topCard.type === 'REVERSE') {
      this.direction = this.direction === 'CLOCKWISE' ? 'COUNTERCLOCKWISE' : 'CLOCKWISE'
    }

    switch (topCard.type) {
      case 'SKIP':
        if (this.direction === 'CLOCKWISE') {
          this.playerInTurn = (this.dealer + 2) % this.playerCount
        }

        if (this.direction === 'COUNTERCLOCKWISE') {
          this.playerInTurn = (this.dealer - 2 + this.playerCount) % this.playerCount
        }
        break
      default:
        if (this.direction === 'CLOCKWISE') {
          this.playerInTurn = (this.dealer + 1) % this.playerCount
        }

        if (this.direction === 'COUNTERCLOCKWISE') {
          this.playerInTurn = (this.dealer - 1 + this.playerCount) % this.playerCount
        }
    }
  }
}

export const createHand = (players: string[], dealer: number, shuffler: Shuffler<deck.Card>, cardsPerPlayer: number): Hand => {
  if (players.length < 2) {
    throw new Error('At least 2 players are required')
  }

  if (players.length > 10) {
    throw new Error('At most 10 players are allowed')
  }

  return new Hand(players, dealer, shuffler, cardsPerPlayer)
}
