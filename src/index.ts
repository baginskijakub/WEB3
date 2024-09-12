import { createHandWithShuffledCards, shuffleBuilder } from './utils/shuffling'

console.log('WEB3')

const normalShuffle = shuffleBuilder().discard().isnt({ type: ['DRAW', 'REVERSE', 'SKIP', 'WILD', 'WILD DRAW'] }).build()

const [hand, cards] = createHandWithShuffledCards({ shuffler: normalShuffle })

console.log(hand.playerInTurn)
