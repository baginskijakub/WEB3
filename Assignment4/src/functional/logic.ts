import { Card, Color, GameState } from './types'

export const canPlayCard = (
  card: Card,
  topCard: Card,
  requestedColor?: Color,
  playerHand: readonly Card[] = []
): boolean => {
  if (card.type === 'WILD') return true

  if (card.type === 'WILD DRAW') {
    if (topCard.color && playerHand.some(c => c.color === topCard.color)) return false
    return !(requestedColor && playerHand.some(c => c.color === requestedColor))
  }

  if (requestedColor) return card.color === requestedColor

  if (card.type === 'NUMBERED') {
    return card.number === topCard.number || card.color === topCard.color
  }

  return card.type === topCard.type || card.color === topCard.color
}

export const playCard = (
  gameState: GameState,
  cardIndex: number,
  requestColor?: Color
): GameState => {
  const currentPlayer = gameState.players[gameState.currentPlayerIndex]
  const card = currentPlayer.hand[cardIndex]

  if (!canPlayCard(card, gameState.discardPile[gameState.discardPile.length - 1], gameState.requestedColor, currentPlayer.hand)) {
    throw new Error('Cannot play this card')
  }

  if ((card.type === 'WILD' || card.type === 'WILD DRAW') && !requestColor) {
    throw new Error('Must specify color for wild card')
  }

  // Remove card from player's hand
  const updatedPlayer = {
    ...currentPlayer,
    hand: [...currentPlayer.hand.slice(0, cardIndex), ...currentPlayer.hand.slice(cardIndex + 1)]
  }

  // Update game state
  const nextState: GameState = {
    ...gameState,
    players: [
      ...gameState.players.slice(0, gameState.currentPlayerIndex),
      updatedPlayer,
      ...gameState.players.slice(gameState.currentPlayerIndex + 1)
    ],
    discardPile: [...gameState.discardPile, card],
    requestedColor: card.type === 'WILD' || card.type === 'WILD DRAW' ? requestColor : undefined,
    lastPlayerToTakeAction: gameState.currentPlayerIndex
  }

  // Handle special cards
  return handleSpecialCard(nextState, card)
}

const handleSpecialCard = (gameState: GameState, card: Card): GameState => {
  let nextState = { ...gameState }

  switch (card.type) {
    case 'REVERSE':
      nextState = {
        ...nextState,
        direction: nextState.direction === 'CLOCKWISE' ? 'COUNTERCLOCKWISE' : 'CLOCKWISE'
      }
      if (nextState.players.length === 2) {
        nextState = updateCurrentPlayer(nextState, 2)
      } else {
        nextState = updateCurrentPlayer(nextState, 1)
      }
      break

    case 'SKIP':
      nextState = updateCurrentPlayer(nextState, 2)
      break

    case 'DRAW':
      nextState = drawCards(nextState, 2)
      nextState = updateCurrentPlayer(nextState, 2)
      break

    case 'WILD DRAW':
      nextState = drawCards(nextState, 4)
      nextState = updateCurrentPlayer(nextState, 2)
      break

    default:
      nextState = updateCurrentPlayer(nextState, 1)
  }

  return nextState
}

const updateCurrentPlayer = (gameState: GameState, increment: number): GameState => {
  const playerCount = gameState.players.length
  let nextIndex = gameState.currentPlayerIndex

  if (gameState.direction === 'CLOCKWISE') {
    nextIndex = (nextIndex + increment) % playerCount
  } else {
    nextIndex = (nextIndex - increment + playerCount) % playerCount
  }

  return {
    ...gameState,
    currentPlayerIndex: nextIndex
  }
}

const reshuffleDiscardPile = (gameState: GameState): GameState => {
  // Create a reversed copy of all cards except the top card
  const reversedCards = [...gameState.discardPile].slice(0, -1).reverse()
  const topCard = gameState.discardPile[gameState.discardPile.length - 1]

  return {
    ...gameState,
    drawPile: reversedCards,
    discardPile: [topCard]
  }
}

const drawCards = (gameState: GameState, count: number): GameState => {
  let nextState = { ...gameState }
  let currentDrawPile = [...gameState.drawPile]

  for (let i = 0; i < count; i++) {
    if (currentDrawPile.length === 0) {
      // Reshuffle discard pile into draw pile
      nextState = reshuffleDiscardPile(nextState)
      currentDrawPile = [...nextState.drawPile]
    }

    const [drawnCard, ...remainingDeck] = currentDrawPile
    const nextPlayerIndex = nextState.direction === 'CLOCKWISE'
      ? (nextState.currentPlayerIndex + 1) % nextState.players.length
      : (nextState.currentPlayerIndex - 1 + nextState.players.length) % nextState.players.length

    const updatedPlayer = {
      ...nextState.players[nextPlayerIndex],
      hand: [...nextState.players[nextPlayerIndex].hand, drawnCard]
    }

    nextState = {
      ...nextState,
      players: [
        ...nextState.players.slice(0, nextPlayerIndex),
        updatedPlayer,
        ...nextState.players.slice(nextPlayerIndex + 1)
      ],
      drawPile: remainingDeck
    }
  }

  return nextState
}

export const sayUno = (gameState: GameState, playerIndex: number): GameState => {
  return {
    ...gameState,
    players: [
      ...gameState.players.slice(0, playerIndex),
      { ...gameState.players[playerIndex], saidUno: true },
      ...gameState.players.slice(playerIndex + 1)
    ]
  }
}

export const catchUnoFailure = (gameState: GameState, accuser: number, accused: number): GameState => {
  if (gameState.lastPlayerToTakeAction !== accused) return gameState

  const accusedPlayer = gameState.players[accused]
  if (accusedPlayer.hand.length === 1 && !accusedPlayer.saidUno) {
    return drawCards(gameState, 4)
  }

  return gameState
}

export const isGameOver = (gameState: GameState): boolean =>
  gameState.players.some(player => player.hand.length === 0) ||
  gameState.scores.some(score => score >= gameState.targetScore)

export const calculateScore = (cards: readonly Card[]): number =>
  cards.reduce((total, card) => {
    switch (card.type) {
      case 'WILD':
      case 'WILD DRAW':
        return total + 50
      case 'SKIP':
      case 'REVERSE':
      case 'DRAW':
        return total + 20
      default:
        return total + (card.number ?? 0)
    }
  }, 0)
