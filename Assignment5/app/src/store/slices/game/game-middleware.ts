import { Middleware } from '@reduxjs/toolkit';
import {Subject, fromEvent, race, timer, Observable} from 'rxjs';
import { map, filter, take, takeUntil } from 'rxjs/operators';
import { setGameState, setDisplayHandCompleteModal, setDisplayGameOverModal } from './game-slice';

let ws: WebSocket | null = null;
let isConnecting = false;
const closeSubject = new Subject<void>();

export const getWebSocket = () => ws;

const setupWebSocketConnection = (id: number): Promise<WebSocket> => {
    return new Promise((resolve, reject) => {
        if (isConnecting) {
            reject(new Error('Connection already in progress'));
            return;
        }

        isConnecting = true;

        // Clean up existing connection if any
        if (ws) {
            ws.close();
            ws = null;
        }

        closeSubject.next();

        const newWs = new WebSocket(`ws://localhost:5001/game/${id}`);

        // Set up connection timeout
        const connectionTimeout = timer(5000).pipe(take(1));

        // Wait for either successful connection or timeout
        race(
            fromEvent(newWs, 'open'),
            connectionTimeout,
            fromEvent(newWs, 'error')
        ).pipe(take(1)).subscribe({
            next: (event) => {
                if (event instanceof Event && event.type === 'open') {
                    console.log('WebSocket connection successfully established');
                    isConnecting = false;
                    ws = newWs;
                    resolve(newWs);
                } else {
                    console.error('Connection timeout or error');
                    newWs.close();
                    isConnecting = false;
                    reject(new Error('Connection failed'));
                }
            },
            error: (error) => {
                console.error('Connection error:', error);
                newWs.close();
                isConnecting = false;
                reject(error);
            }
        });
    });
};

export const gameMiddleware: Middleware = (store) => (next) => (action: any) => {
    if (action.type === 'game/initWebSocket') {
        const id = action.payload;

        setupWebSocketConnection(id)
            .then((socket) => {
                fromEvent(socket, 'message')
                    .pipe(
                        takeUntil(closeSubject>),
                        map((event: MessageEvent) => {
                            try {
                                return JSON.parse(event.data);
                            } catch (e) {
                                console.error('Failed to parse message:', e);
                                return null;
                            }
                        }),
                        filter(message => message && message.type)
                    )
                    .subscribe({
                        next: ({ type, payload }) => {
                            switch (type) {
                                case 'GAME_CHANGE':
                                    store.dispatch(setGameState(payload));
                                    break;
                                case 'HAND_COMPLETE':
                                    store.dispatch(setDisplayHandCompleteModal(true));
                                    break;
                                case 'GAME_OVER':
                                    store.dispatch(setDisplayGameOverModal(true));
                                    break;
                            }
                        },
                        error: (error) => console.error('Message processing error:', error)
                    });

                fromEvent(socket, 'close')
                    .pipe(takeUntil(closeSubject))
                    .subscribe(() => {
                        console.log('WebSocket connection closed');
                        ws = null;
                    });

                fromEvent(socket, 'error')
                    .pipe(takeUntil(closeSubject))
                    .subscribe((error) => {
                        console.error('WebSocket error:', error);
                    });
            })
            .catch((error) => {
                console.error('Failed to establish WebSocket connection:', error);
            });
    }

    return next(action);
};