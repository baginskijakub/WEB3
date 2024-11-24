import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { login, register } from '@/server-actions';
import type { User } from '@/types';

interface UserState {
    user: User | null;
    loading: boolean;
    error: string | null;
}

const getUserFromCookie = (): User | null => {
    if (typeof document === 'undefined') return null;

    const userCookie = document.cookie
        .split(';')
        .find((cookie) => cookie.trim().startsWith('user='));

    if (userCookie) {
        try {
            return JSON.parse(userCookie.split('=')[1]);
        } catch {
            return null;
        }
    }
    return null;
};

const setUserCookie = (user: User | null) => {
    if (typeof document === 'undefined') return;

    if (user) {
        document.cookie = `user=${JSON.stringify(user)}; path=/`;
    } else {
        document.cookie = 'user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }
};

const initialState: UserState = {
    user: getUserFromCookie(),
    loading: false,
    error: null,
};

// Async thunks for API calls
export const loginUser = createAsyncThunk(
    'user/login',
    async ({ email, password }: { email: string; password: string }) => {
        const response = await login(email, password);
        setUserCookie(response);
        return response;
    }
);

export const registerUser = createAsyncThunk(
    'user/register',
    async ({ email, name, password }: { email: string; name: string; password: string }) => {
        const response = await register(email, name, password);
        setUserCookie(response);
        return response;
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User | null>) => {
            state.user = action.payload;
            setUserCookie(action.payload);
        },
        logout: (state) => {
            state.user = null;
            setUserCookie(null);
        },
    },
    extraReducers: (builder) => {
        builder
            // Login cases
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Login failed';
            })
            // Register cases
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Registration failed';
            });
    },
});

export const { setUser, logout } = userSlice.actions;
export const userReducer = userSlice.reducer;
