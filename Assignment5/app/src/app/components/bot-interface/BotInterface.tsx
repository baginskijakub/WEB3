import React, { useMemo } from 'react';
import {useGame} from "@/store";

interface BotInterfaceProps {
    playerIndex: number;
    position: 'left' | 'top' | 'right';
}

const BotInterface: React.FC<BotInterfaceProps> = ({ playerIndex, position }) => {
    const { game, accuseOfNotSayingUno } = useGame();

    const player = useMemo(() => {
        const players = game?.currentHand?.players;
        if (!players) return { name: '', numberOfCards: 0 };

        const playerData = players[playerIndex];
        if (!playerData) return { name: '', numberOfCards: 0 };

        return {
            name: playerData.name,
            numberOfCards: playerData.hand.length,
            saidUno: playerData.saidUno,
        };
    }, [game, playerIndex]);

    const containerClasses = {
        left: 'flex flex-col justify-center items-center absolute bg-gray-800 text-white left-0 top-1/2 transform -translate-y-1/2 rounded-r',
        top: 'flex justify-center items-center absolute bg-gray-800 text-white top-0 left-1/2 transform -translate-x-1/2 rounded-b',
        right: 'flex flex-col justify-center items-center absolute bg-gray-800 text-white right-0 top-1/2 transform -translate-y-1/2 rounded-l',
    };

    return (
        <div className={containerClasses[position]}>
            <div className="p-3 flex flex-col justify-center items-center">
                {/*<UserIcon size={20} />*/}
                <p className="text-sm">{player.name}</p>
            </div>
            <div className="p-3 flex flex-col justify-center items-center">
                {/* Fix src */}
                <img src="/cards-icon.svg" alt="cards icon" className="w-5 h-5" />
                <p className="text-sm">{player.numberOfCards}</p>
            </div>
            <button
                className="bg-red-700 m-3 w-9 h-9 flex items-center justify-center rounded hover:opacity-70 transition duration-200 ease-in-out"
                onClick={() => accuseOfNotSayingUno(playerIndex)}
            >
                {/*<AlertTriangle size={20} />*/}
            </button>
            {player.saidUno && (
                <div className="w-12 h-9 bg-yellow-600 m-3 rounded flex justify-center items-center text-sm">
                    UNO!
                </div>
            )}
        </div>
    );
};

export default BotInterface;
