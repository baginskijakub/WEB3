import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {getAllLobbies, joinLobby as apiJoinLobby, createLobby as apiCreateLobby} from "@/server-actions/lobby";
import {Lobby} from "@/types";


interface LobbyState {
    lobbies: Lobby[];
    loading: boolean;
    error: string | null;
}

const initialState: LobbyState = {
    lobbies: [],
    loading: false,
    error: null,
};

// Async thunks
export const fetchLobbies = createAsyncThunk(
    'lobby/fetchAll',
    async () => {
        return await getAllLobbies();
    }
);

export const joinLobby = createAsyncThunk(
    'lobby/join',
    async ({ userId, lobbyId }: { userId: number; lobbyId: number }) => {
        await apiJoinLobby(userId, lobbyId);
    }
);

export const createLobby = createAsyncThunk(
    'lobby/create',
    async ({ lobbyName, userId }: { lobbyName: string; userId: number }) => {
        await apiCreateLobby(lobbyName, userId);
    }
);

const lobbySlice = createSlice({
    name: 'lobby',
    initialState,
    reducers: {
        updateLobbies: (state, action) => {
            state.lobbies = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch lobbies cases
            .addCase(fetchLobbies.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchLobbies.fulfilled, (state, action) => {
                state.loading = false;
                state.lobbies = action.payload;
            })
            .addCase(fetchLobbies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch lobbies';
            });
    },
});

export const { updateLobbies } = lobbySlice.actions;
export const lobbyReducer = lobbySlice.reducer;
