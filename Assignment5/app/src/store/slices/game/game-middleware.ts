import { Middleware } from '@reduxjs/toolkit';
import { setGameState, setDisplayHandCompleteModal, setDisplayGameOverModal } from './game-slice';

let ws: WebSocket | null = null;

export const gameMiddleware: Middleware = (store) => (next) => (action: any) => {
    if (action.type === 'game/initWebSocket') {
        const id = action.payload;
            ws = new WebSocket(`ws://localhost:5001/game/${id}`);

            ws.onmessage = (event) => {
                const { type, payload } = JSON.parse(event.data);

                if (type === 'GAME_CHANGE') {
                    store.dispatch(setGameState(payload));
                }

                if (type === 'HAND_COMPLETE') {
                    store.dispatch(setDisplayHandCompleteModal(true));
                }

                if (type === 'GAME_OVER') {
                    store.dispatch(setDisplayGameOverModal(true));
                }
            };
    }
    return next(action);
};