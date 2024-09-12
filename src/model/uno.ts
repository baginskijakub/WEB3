export interface Props {

}

export class Game {
  constructor (props: Props) {

  }
}

export const createGame = (props: Partial<Props>): Game => {
  return new Game(props)
}
