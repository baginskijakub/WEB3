import React from 'react';
import Link from 'next/link';
import {useGame} from "@/store";

const GameCompletedModal: React.FC = () => {
    const { displayGameOverModal, game } = useGame();

    if (!displayGameOverModal || !game) {
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
                className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 p-4 bg-slate-100 flex flex-col justify-center items-center gap-2 z-50 rounded-md drop-shadow-2xl"
            >
                <h1 className="text-2xl">Game completed!</h1>
                {players.map((p) => (
                    <p key={p.name}>
                        {p.name}: {p.score}
                    </p>
                ))}
                <Link href="/lobbies">
                    <a className="bg-blue-600 px-3 py-2 text-white rounded">New game</a>
                </Link>
            </div>
        </>
    );
};

export default GameCompletedModal;
