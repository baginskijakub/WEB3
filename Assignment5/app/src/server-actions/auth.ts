'use server'

import { API_URL } from './utils'
import type { User } from '@/types'

export const login = async (email: string, password: string): Promise<User> => {
    const response = await fetch(`${API_URL}/user/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    })
    if (!response.ok) {
        throw new Error('Login failed')
    }
    return response.json()
}

export const register = async (email: string, name: string, password: string): Promise<User> => {
    const response = await fetch(`${API_URL}/user/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
    })
    if (!response.ok) {
        throw new Error('Registration failed')
    }
    return response.json()
}
