import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { loginUser, registerUser, logout, setUser } from './user-slice';
import type { User } from '@/types';

export const useUser = () => {
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.user.user);
    const loading = useSelector((state: RootState) => state.user.loading);
    const error = useSelector((state: RootState) => state.user.error);

    const login = useCallback(
        async (email: string, password: string) => {
            try {
                await dispatch(loginUser({ email, password })).unwrap();
            } catch (error) {
                console.error('Login failed:', error);
                throw error;
            }
        },
        [dispatch]
    );

    const register = useCallback(
        async (email: string, name: string, password: string) => {
            try {
                await dispatch(registerUser({ email, name, password })).unwrap();
            } catch (error) {
                console.error('Registration failed:', error);
                throw error;
            }
        },
        [dispatch]
    );

    const logoutUser = useCallback(() => {
        dispatch(logout());
    }, [dispatch]);

    const updateUser = useCallback(
        (user: User | null) => {
            dispatch(setUser(user));
        },
        [dispatch]
    );

    return {
        user,
        loading,
        error,
        login,
        register,
        logout: logoutUser,
        setUser: updateUser,
    };
};