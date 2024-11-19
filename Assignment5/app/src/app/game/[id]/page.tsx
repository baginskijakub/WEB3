'use client'

import React, {useEffect} from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useGame, useUser } from '@/store';
import PlayerInterface from '@/app/components/player-interface/PlayerInterface';
import Bots from '@/app/components/bot-interface/Bots';
import RequestedColorIndicator from '@/app/components/requested-color/RequestedColorIndicator';
import Piles from '@/app/components/piles/Piles';

const GamePage: React.FC = () => {
    const { user } = useUser();
    const { initWs, game } = useGame();
    const router = useRouter();
    const params = useParams();
    const { id } = params;

    useEffect(() => {
        if (!user) {
            router.push('/login');
        } else {
            console.log('GamePage id:', id);
            let gameId: number | null = null;
            if (typeof id === 'string') {
                gameId = parseInt(id);
            } else if (Array.isArray(id) && typeof id[0] === 'string') {
                gameId = parseInt(id[0]);
            }

            if (gameId !== null && !isNaN(gameId)) {
                console.log('Initializing WebSocket with gameId:', gameId);
                initWs(gameId);
            } else {
                console.error('Invalid game ID:', id);
            }
        }
    }, [user, initWs, id, router]);

    if (!user) {
        return null;
    }

    console.log(game)

    return (
        <div>
            {!game ? (
                <h1>Waiting for other players</h1>
            ) : (
                <div>
                    <PlayerInterface />
                    <Bots />
                    <RequestedColorIndicator />
                    <Piles />
                </div>
            )}
        </div>
    );
};

export default GamePage;
