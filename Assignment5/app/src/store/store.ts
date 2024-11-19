'use client'

import { configureStore } from '@reduxjs/toolkit';
import {gameReducer, gameMiddleware, userReducer, lobbyMiddleware, lobbyReducer} from './slices';
import {playerReducer} from "@/store/slices/player";

export const store = configureStore({
    reducer: {
        game: gameReducer,
        user: userReducer,
        lobby: lobbyReducer,
        player: playerReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(gameMiddleware)
            .concat(lobbyMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;