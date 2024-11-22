'use client'

import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { setDisplayHandCompleteModal, setDisplayGameOverModal } from './game-slice';
import { Color } from "@/types";
import { getWebSocket } from './game-middleware';

export const useGame = () => {
    const dispatch = useDispatch();
    const gameState = useSelector((state: RootState) => state.game.gameState);
    const displayHandCompleteModal = useSelector((state: RootState) => state.game.displayHandCompleteModal);
    const displayGameOverModal = useSelector((state: RootState) => state.game.displayGameOverModal);
    const user = useSelector((state: RootState) => state.user.user);

    const initWs = useCallback((id: number) => {
        console.log('Initializing WebSocket with ID:', id);
        dispatch({ type: 'game/initWebSocket', payload: id });
    }, [dispatch]);

    const playCard = useCallback((cardIndex: number, requestColor?: Color) => {
        const ws = getWebSocket();
        if (ws) {
            console.log('Playing card:', { cardIndex, requestColor });
            ws.send(JSON.stringify({ type: 'PLAY_CARD', payload: { cardIndex, requestColor } }));
        } else {
            console.error('WebSocket not initialized');
        }
    }, []);

    const drawCard = useCallback(() => {
        const ws = getWebSocket();
        if (ws) {
            console.log('Drawing card');
            ws.send(JSON.stringify({ type: 'DRAW_CARD' }));
        } else {
            console.error('WebSocket not initialized');
        }
    }, []);

    const sayUno = useCallback(() => {
        const ws = getWebSocket();
        const playerIndex = gameState?.players.findIndex((p) => p === user?.name);
        if (ws) {
            console.log('Saying UNO for player:', playerIndex);
            ws.send(JSON.stringify({ type: 'SAY_UNO', payload: { playerIndex } }));
        } else {
            console.error('WebSocket not initialized');
        }
    }, [gameState?.players, user?.name]);

    const accuseOfNotSayingUno = useCallback((accused: number) => {
        const ws = getWebSocket();
        const accuser = gameState?.players.findIndex((p) => p === user?.name);
        if (ws) {
            console.log('Accusing player of not saying UNO:', { accuser, accused });
            ws.send(JSON.stringify({ type: 'ACCUSE_OF_NOT_SAYING_UNO', payload: { accuser, accused } }));
        } else {
            console.error('WebSocket not initialized');
        }
    }, [gameState?.players, user?.name]);

    const closeModal = useCallback(() => {
        dispatch(setDisplayHandCompleteModal(false));
        dispatch(setDisplayGameOverModal(false));
    }, [dispatch]);

    return {
        game: gameState,
        initWs,
        playCard,
        drawCard,
        sayUno,
        accuseOfNotSayingUno,
        displayHandCompleteModal,
        displayGameOverModal,
        closeModal,
    };
};