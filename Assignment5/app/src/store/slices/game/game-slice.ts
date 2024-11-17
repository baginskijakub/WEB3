import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import type { Color, TGame } from '@/types';

interface GameState {
    gameState: TGame | null;
    gameId: number | null;
    displayHandCompleteModal: boolean;
    displayGameOverModal: boolean;
}

const initialState: GameState = {
    gameState: null,
    gameId: null,
    displayHandCompleteModal: false,
    displayGameOverModal: false,
};

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setGameState: (state, action: PayloadAction<TGame>) => {
            state.gameState = action.payload;
        },
        setGameId: (state, action: PayloadAction<number>) => {
            state.gameId = action.payload;
        },
        setDisplayHandCompleteModal: (state, action: PayloadAction<boolean>) => {
            state.displayHandCompleteModal = action.payload;
        },
        setDisplayGameOverModal: (state, action: PayloadAction<boolean>) => {
            state.displayGameOverModal = action.payload;
        },
    },
});

export const {
    setGameState,
    setGameId,
    setDisplayHandCompleteModal,
    setDisplayGameOverModal,
} = gameSlice.actions;

export const gameReducer = gameSlice.reducer;
