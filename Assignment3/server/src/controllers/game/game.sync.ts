import { WebSocket } from 'ws';
import {Lobby} from "../../types";
import {GameHandler} from "./game.handler";

export const gameHandlers: GameHandler[] = []

export const syncGames = (ws: WebSocket, gameId: number) => {
    addPlayerToGameHandler(ws, gameId)
}

export const startGame = (lobby: Lobby) => {
    gameHandlers.push(new GameHandler(lobby))
}

const addPlayerToGameHandler = (ws: WebSocket, gameId: number) => {
    const gameHandler = gameHandlers.find(handler => handler.lobby.id === gameId)

    if(gameHandler) {
        gameHandler.connectClient(ws)
    }
}

