'use client'

import React, { useEffect } from 'react';
import {useLobby, useUser} from '@/store';
import { useRouter } from 'next/navigation';
import Lobby from "@/app/components/Lobby";
import CreateLobbyModal from "@/app/components/CreateLobbyModal";

const LobbiesPage: React.FC = () => {
    const { user } = useUser();
    const {
        lobbies,
        loading,
        error,
        joinLobby,
        startLobby,
        createLobby,
    } = useLobby();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push('/login');
        }
    }, [user, router]);

    return (
        <div className="min-h-screen flex flex-col items-center gap-4 justify-center bg-gray-100">
            {/* Render each lobby */}
            {loading ? (
                <p>Loading lobbies...</p>
            ) : error ? (
                <p className="text-red-600">{error}</p>
            ) : (
                lobbies.map((lobby) => (
                    <Lobby
                        key={lobby.id}
                        lobby={lobby}
                        onJoinLobby={() => joinLobby(lobby.id)}
                        onStartGame={() => startLobby(lobby.id)}
                    />
                ))
            )}

            {/* Create Lobby Modal */}
            <CreateLobbyModal onCreateLobby={createLobby} />
        </div>
    );
};

export default LobbiesPage;

