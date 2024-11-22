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
        }
    }, [user,  router]);

    useEffect(() => {
        initWs(parseInt(id as string))
    }, []);

    if (!user) {
        return null;
    }


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
