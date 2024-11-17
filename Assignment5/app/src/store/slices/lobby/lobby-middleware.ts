import { Middleware } from '@reduxjs/toolkit';
import { updateLobbies } from './lobby-slice';

let ws: WebSocket | null = null;

export const lobbyMiddleware: Middleware = (store) => (next) => (action: any) => {
    if (action.type === 'lobby/initWebSocket' && typeof window !== 'undefined' && !ws) {
        ws = new WebSocket('ws://localhost:5001/lobby');

        ws.onmessage = (event) => {
            const { type, payload } = JSON.parse(event.data);

            if (type === 'LOBBY_CHANGE') {
                store.dispatch(updateLobbies(payload));
            }

            if (type === 'LOBBY_STARTED') {
                // Assuming you're using react-router or similar
                window.location.href = `/game/${payload.lobbyId}`;
            }
        };
    }

    if (action.type === 'lobby/startLobby') {
        ws?.send(JSON.stringify({ type: 'LOBBY_START', payload: { lobbyId: action.payload } }));
    }

    return next(action);
};