import React from 'react';
import BotInterface from './BotInterface';
import { POSITIONS_ARRAY } from './utils';
import {useGame, useUser} from "@/store";

const Bots: React.FC = () => {
    const { game } = useGame();
    const { user } = useUser();

    if (!game || !user) return null;

    const otherPlayers = game.players
        .map((playerName, index) => ({ name: playerName, index }))
        .filter((player) => player.name !== user.name);

    const numBots = otherPlayers.length;

    if (numBots === 0) {
        return null;
    }

    if (!POSITIONS_ARRAY[numBots]) {
        console.warn(`No position configuration for ${numBots} bots.`);
        return null;
    }

    return (
        <>
            {otherPlayers.map((player, idx) => (
                <BotInterface
                    key={`${player.index}-bot`}
                    playerIndex={player.index}
                    position={POSITIONS_ARRAY[numBots][idx]}
                />
            ))}
        </>
    );
};

export default Bots;
