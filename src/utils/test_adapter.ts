import { Randomizer, type Shuffler, standardShuffler } from './utils'
import * as deck from '../../src/model/deck'
import * as hand from '../../src/model/hand'
// import * as uno from '../../src/model/uno'

export function createInitialDeck (): deck.Deck {
  return deck.createInitialDeck()
}

// export interface HandProps {
//   players: string[]
//   dealer: number
//   shuffler?: Shuffler<deck.Card>
//   cardsPerPlayer?: number
// }
//
// export function createHand ({
//   players,
//   dealer,
//   shuffler = standardShuffler,
//   cardsPerPlayer = 7
// }: HandProps): hand.Hand {
//   return hand.createHand(players, dealer, shuffler, cardsPerPlayer)
// }
//
// export function createGame (props: Partial<uno.Props>): uno.Game {
//   return uno.createGame(props)
// }
