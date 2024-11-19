'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from "@/store";

export default function Page() {
    const { login, loading, error } = useUser();
    const router = useRouter();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    // **Handle Submit Function**
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(email, password);
            router.push('/lobbies');
        } catch (err) {
            console.error('Failed to login:', err);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            id="email"
                            type="email"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            id="password"
                            type="password"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {/* **Error Message** */}
                    {error && (
                        <p className="mb-4 text-sm text-red-600">
                            {error}
                        </p>
                    )}

                    {/* **Submit Button with Loading State** */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none ${
                            loading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                {/* **Link to Register Page** */}
                <a href="/register" className="block text-center mt-4 text-sm text-indigo-600 hover:text-indigo-500">
                    {'Don\'t have an account? Register'}
                </a>
            </div>
        </div>
    );
}
