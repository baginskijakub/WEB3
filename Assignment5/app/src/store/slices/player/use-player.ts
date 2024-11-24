'use client'

import { useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { setDisplayRequestColorModal, setCardIndexToPlay } from './player-slice';
import { useGame } from '../game';
import type { Card, Color } from '@/types';

export const usePlayer = () => {
    const dispatch = useDispatch<AppDispatch>();

    const { game, playCard: gamePlayCard, drawCard: gameDrawCard, sayUno: gameSayUno } = useGame();

    const user = useSelector((state: RootState) => state.user.user);

    const displayRequestColorModal = useSelector((state: RootState) => state.player.displayRequestColorModal);
    const cardIndexToPlay = useSelector((state: RootState) => state.player.cardIndexToPlay);

    const playerCards = useMemo(() => {
        const currentHand = game?.currentHand;
        if (!currentHand) return undefined;

        return currentHand.players.find((p) => p.name === user?.name)?.hand ?? [];
    }, [game?.currentHand, user?.name]);

    const isPlayerInTurn = useMemo(() => {
        const playerInTurn = game?.currentHand?.playerInTurn;

        if (playerInTurn === undefined) {
            return false;
        }

        const players = game?.players;
        return players?.[playerInTurn] === user?.name;
    }, [game?.currentHand?.playerInTurn, game?.players, user?.name]);

    const drawCard = useCallback(() => {
        if (isPlayerInTurn) {
            gameDrawCard();
        }
    }, [isPlayerInTurn, gameDrawCard]);

    const playCard = useCallback(
        (cardIndex: number) => {
            console.log(`playCard called with index: ${cardIndex}`);

            const currentHand = game?.currentHand;

            if (!currentHand || !isPlayerInTurn || !playerCards) {
                console.warn('Cannot play card: Invalid game state or not player turn');
                return;
            }

            const card = playerCards[cardIndex];
            console.log('Card to play:', card);

        if (card.type === 'WILD' || card.type === 'WILD DRAW') {
            dispatch(setDisplayRequestColorModal(true));
            dispatch(setCardIndexToPlay(cardIndex));
            return;
        }

        gamePlayCard(cardIndex);
    }, [game?.currentHand, isPlayerInTurn, playerCards, dispatch, gamePlayCard]);

    const playWildCard = useCallback((color: Color) => {
        const currentHand = game?.currentHand;

        if (!currentHand || !isPlayerInTurn || !playerCards || cardIndexToPlay === null) {
            return;
        }

        const cardIndex = cardIndexToPlay;

        dispatch(setDisplayRequestColorModal(false));
        dispatch(setCardIndexToPlay(null));

        gamePlayCard(cardIndex, color);
    }, [game?.currentHand, isPlayerInTurn, playerCards, cardIndexToPlay, dispatch, gamePlayCard]);

    const sayUno = useCallback(() => {
        gameSayUno();
    }, [gameSayUno]);

    return {
        playerCards,
        playCard,
        drawCard,
        isPlayerInTurn,
        playWildCard,
        displayRequestColorModal,
        sayUno,
    };
};
