import { GameState, Player } from './types'
import { createInitialDeck } from './deck'

export const createInitialGameState = (
  playerNames: readonly string[],
  targetScore: number = 50,
  cardsPerPlayer: number = 7,
  shuffleFn: <T>(array: readonly T[]) => readonly T[] = array => [...array].sort(() => Math.random() - 0.5)
): GameState => {
  if (playerNames.length < 2) throw new Error('At least 2 players are required')
  if (playerNames.length > 10) throw new Error('At most 10 players are allowed')

  const deck = shuffleFn(createInitialDeck())
  const players: Player[] = playerNames.map(name => ({
    name,
    hand: [],
    saidUno: false
  }))

  let currentDeck = [...deck]

  // Deal initial cards
  for (let i = 0; i < players.length; i++) {
    for (let j = 0; j < cardsPerPlayer; j++) {
      const [card, ...remainingDeck] = currentDeck
      players[i] = {
        ...players[i],
        hand: [...players[i].hand, card]
      }
      currentDeck = remainingDeck
    }
  }

  // Setup initial discard pile
  let [firstCard, ...drawPile] = currentDeck
  while (firstCard.type === 'WILD' || firstCard.type === 'WILD DRAW') {
    drawPile = [...drawPile, firstCard]
    ;[firstCard, ...drawPile] = drawPile
  }

  return {
    players: players,
    drawPile: drawPile,
    discardPile: [firstCard],
    direction: 'CLOCKWISE',
    currentPlayerIndex: 0,
    scores: new Array(players.length).fill(0),
    targetScore
  }
}