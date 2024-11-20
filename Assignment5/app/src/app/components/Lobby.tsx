import React, { useMemo } from 'react';
import { Lobby as LobbyType } from '@/types';
import { useUser } from '@/store';

interface LobbyProps {
    lobby: LobbyType;
    onJoinLobby: () => void;
    onStartGame: () => void;
}

const Lobby: React.FC<LobbyProps> = ({ lobby, onJoinLobby, onStartGame }) => {
    const { user } = useUser();

    const hasJoined = useMemo(() => {
        return lobby.players.some((player) => player.id === user?.id);
    }, [lobby.players, user]);

    return (
        <div className="w-80 p-4 flex flex-col gap-2 bg-white rounded-lg shadow-md">
            <div className="flex justify-between">
                <h5 className="font-semibold text-gray-700">{lobby.name}</h5>
                <p className="text-sm text-gray-500">{lobby.players.length}/4</p>
            </div>

            <div>
                {lobby.players.map((player) => (
                    <div key={player.id} className="text-sm p-2 bg-slate-200 rounded-md flex justify-between items-center mb-1 text-gray-700">
                        <span>{player.name}</span>
                    </div>
                ))}
            </div>

            {!hasJoined ? (
                <button
                    onClick={onJoinLobby}
                    className="px-2 py-1 bg-blue-200 text-blue-700 rounded-md w-full hover:bg-blue-300"
                >
                    Join
                </button>
            ) : (
                lobby.players.length > 1 && (
                    <button
                        onClick={onStartGame}
                        className="px-2 py-1 bg-green-200 text-green-700 rounded-md w-full hover:bg-green-300"
                    >
                        Start Game
                    </button>
                )
            )}
        </div>
    );
};

export default Lobby;
