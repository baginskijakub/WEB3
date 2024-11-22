import React from 'react';
import {useGame} from "@/store";

const HandCompletedModal: React.FC = () => {
    const { displayHandCompleteModal, closeModal, game } = useGame();

    if (!displayHandCompleteModal || !game) {
        return null;
    }

    const players = game.players.map((playerName, i) => ({
        name: playerName,
        score: game.playerScores[i],
    }));

    return (
        <>
            <span className="absolute w-full h-full bg-slate-100 opacity-70 z-50" />
            <div
                className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 p-4 bg-slate-100 flex flex-col justify-center items-center gap-2 z-50 rounded-md drop-shadow-2xl text-gray-700"
            >
                <h1 className="text-2xl text-gray-700">Game completed!</h1>
                {players.map((p) => (
                    <p key={p.name}>
                        {p.name}: {p.score}
                    </p>
                ))}
                <button
                    className="bg-blue-600 px-3 py-2 text-white rounded"
                    onClick={closeModal}
                >
                    <a href="/lobbies" className="bg-blue-600 px-3 py-2 text-white rounded">
                        {'New game'}
                    </a>
                </button>
            </div>
        </>
    );
};

export default HandCompletedModal;
