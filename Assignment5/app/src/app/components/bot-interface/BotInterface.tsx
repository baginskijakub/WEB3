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
                <p className="text-sm">{player.name}</p>
            </div>
            <div className="p-3 flex flex-col justify-center items-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M8.79997 9.19997L7.64997 13.35L11.2 15.8L12.35 11.65L8.79997 9.19997ZM20 5.17497L20.825 5.57497C21.3416 5.79164 21.6916 6.16247 21.875 6.68747C22.0583 7.21247 22.0333 7.7333 21.8 8.24997L20 12.15L20 5.17497ZM16 2.99997C16.55 2.99997 17.0208 3.19997 17.4125 3.59997C17.8041 3.99997 18 4.47497 18 5.02497L18 11L15.325 3.64997C15.275 3.5333 15.2333 3.4208 15.2 3.31247C15.1666 3.20414 15.1083 3.09997 15.025 2.99997L16 2.99997ZM10.85 3.12497C11.3666 2.94164 11.8833 2.96664 12.4 3.19997C12.9166 3.4333 13.2666 3.8083 13.45 4.32497L17.875 16.55C18.0583 17.0666 18.0333 17.5791 17.8 18.0875C17.5666 18.5958 17.1916 18.9416 16.675 19.125L9.14997 21.875C8.6333 22.0583 8.1208 22.0333 7.61247 21.8C7.10414 21.5666 6.7583 21.1916 6.57497 20.675L2.12497 8.44997C1.94164 7.93331 1.96664 7.42081 2.19997 6.91247C2.4333 6.40414 2.8083 6.05831 3.32497 5.87497L10.85 3.12497ZM11.55 4.99997L3.99997 7.74997L8.47497 20L16 17.25L11.55 4.99997Z"
                        fill="white"/>
                </svg>
                <p className="text-sm">{player.numberOfCards}</p>
            </div>
            <button
                className="bg-red-700 m-3 w-9 h-9 flex items-center justify-center rounded hover:opacity-70 transition duration-200 ease-in-out"
                onClick={() => accuseOfNotSayingUno(playerIndex)}
            >
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
