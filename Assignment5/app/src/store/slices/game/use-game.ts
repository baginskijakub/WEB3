import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store'; // You'll need to set up your store
import { setDisplayHandCompleteModal, setDisplayGameOverModal } from './game-slice';
import {Color} from "@/types";

export let ws: WebSocket | null = null;

export const useGame = () => {
    const dispatch = useDispatch();
    const gameState = useSelector((state: RootState) => state.game.gameState);
    const displayHandCompleteModal = useSelector((state: RootState) => state.game.displayHandCompleteModal);
    const displayGameOverModal = useSelector((state: RootState) => state.game.displayGameOverModal);
    const user = useSelector((state: RootState) => state.user.user); // Assuming you have a user slice

    const initWs = useCallback((id: number) => {
        dispatch({ type: 'game/initWebSocket', payload: id });
    }, [dispatch]);

    const playCard = useCallback((cardIndex: number, requestColor?: Color) => {
        ws?.send(JSON.stringify({ type: 'PLAY_CARD', payload: { cardIndex, requestColor } }));
    }, []);

    const drawCard = useCallback(() => {
        ws?.send(JSON.stringify({ type: 'DRAW_CARD' }));
    }, []);

    const sayUno = useCallback(() => {
        const playerIndex = gameState?.players.findIndex((p) => p === user?.name);
        ws?.send(JSON.stringify({ type: 'SAY_UNO', payload: { playerIndex } }));
    }, [gameState?.players, user?.name]);

    const accuseOfNotSayingUno = useCallback((accused: number) => {
        const accuser = gameState?.players.findIndex((p) => p === user?.name);
        ws?.send(JSON.stringify({ type: 'ACCUSE_OF_NOT_SAYING_UNO', payload: { accuser, accused } }));
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