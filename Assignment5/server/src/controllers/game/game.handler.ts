import {createGame, Game} from "../../model";
import {Lobby} from "../../types";
import {WebSocket} from "ws";

export class GameHandler {
    public game: Game
    public lobby: Lobby
    private connectedClients: WebSocket[] = []

    constructor(lobby: Lobby) {
        this.lobby = lobby
    }

    public connectClient(ws: WebSocket) {
        this.connectedClients.push(ws)

        if (this.connectedClients.length === this.lobby.players.length) {
            this.startGame()
        }

        ws.on('message', (message) => {
            const parsedMessage = JSON.parse(message.toString())

            try {
                switch (parsedMessage.type) {
                    case 'PLAY_CARD':
                        const {cardIndex, requestColor} = parsedMessage.payload
                        this.game.currentHand().play(cardIndex, requestColor)
                        break
                    case 'DRAW_CARD':
                        this.game.currentHand().draw()
                        break
                    case 'SAY_UNO':
                        const {playerIndex} = parsedMessage.payload
                        this.game.currentHand().sayUno(playerIndex)
                        break
                    case 'ACCUSE_OF_NOT_SAYING_UNO':
                        const {accuser, accused} = parsedMessage.payload
                        this.game.currentHand().catchUnoFailure({accuser, accused})
                        break
                }
            } catch (e) {
                console.error(e)
            }


            this.broadcastGameChange()

        })
    }

    public startGame() {
        this.game = createGame({
            players: this.lobby.players.map((player) => player.name),
            playerCount: this.lobby.players.length


        })

        this.game.onHandEnd(() => {
            if(this.game.winner() === undefined) {
                this.broadcastHandEnd()
            } else {
                this.broadcastGameOver()
            }
        })

        this.broadcastGameChange()
    }

    public broadcastGameChange() {
        const message = JSON.stringify({
            type: 'GAME_CHANGE',
            payload: this.game.toState()
        })

        this.connectedClients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message)
            }
        })
    }

    public broadcastHandEnd() {
        const message = JSON.stringify({
            type: 'HAND_COMPLETE',
        })

        this.connectedClients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message)
            }
        })
    }

    public broadcastGameOver() {
        const message = JSON.stringify({
            type: 'GAME_OVER',
        })

        this.connectedClients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message)
            }
        })
    }
}
