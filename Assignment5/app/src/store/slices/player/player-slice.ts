import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Color, Card } from '@/types';

interface PlayerState {
    displayRequestColorModal: boolean;
    cardIndexToPlay: number | null;
}

const initialState: PlayerState = {
    displayRequestColorModal: false,
    cardIndexToPlay: null,
};

const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        setDisplayRequestColorModal: (state, action: PayloadAction<boolean>) => {
            state.displayRequestColorModal = action.payload;
        },
        setCardIndexToPlay: (state, action: PayloadAction<number | null>) => {
            state.cardIndexToPlay = action.payload;
        },
    },
});

export const { setDisplayRequestColorModal, setCardIndexToPlay } = playerSlice.actions;
export const playerReducer = playerSlice.reducer;