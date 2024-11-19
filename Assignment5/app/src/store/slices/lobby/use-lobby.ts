'use client'

import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import {
    fetchLobbies,
    joinLobby,
    createLobby
} from './lobby-slice';
import {useRouter} from "next/router";

export const useLobby = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useRouter()
    const user = useSelector((state: RootState) => state.user.user);
    const lobbies = useSelector((state: RootState) => state.lobby.lobbies);
    const loading = useSelector((state: RootState) => state.lobby.loading);
    const error = useSelector((state: RootState) => state.lobby.error);

    // Initialize WebSocket connection
    useEffect(() => {
        dispatch({ type: 'lobby/initWebSocket' });
    }, [dispatch]);

    // Initial lobbies fetch
    useEffect(() => {
        dispatch(fetchLobbies());
    }, [dispatch]);

    const handleJoinLobby = useCallback(
        async (lobbyId: number) => {
            if (user) {
                try {
                    await dispatch(joinLobby({ userId: user.id, lobbyId })).unwrap();
                } catch (error) {
                    console.error('Failed to join lobby:', error);
                }
            }
        },
        [dispatch, user]
    );

    const handleCreateLobby = useCallback(
        async (lobbyName: string) => {
            if (user) {
                try {
                    await dispatch(createLobby({ lobbyName, userId: user.id })).unwrap();
                } catch (error) {
                    console.error('Failed to create lobby:', error);
                }
            }
        },
        [dispatch, user]
    );

    const handleStartLobby = useCallback(
        (lobbyId: string) => {
            dispatch({ type: 'lobby/startLobby', payload: lobbyId });
        },
        [dispatch]
    );

    return {
        lobbies,
        loading,
        error,
        joinLobby: handleJoinLobby,
        createLobby: handleCreateLobby,
        startLobby: handleStartLobby,
    };
};