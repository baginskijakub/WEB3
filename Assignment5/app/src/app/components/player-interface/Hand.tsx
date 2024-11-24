import React from 'react';
import {usePlayer} from "@/store";
import UnoCard from "@/app/components/cards/uno-card/UnoCard";

const Hand: React.FC = () => {
    const { playerCards, isPlayerInTurn, playCard } = usePlayer();

    if (!playerCards || playerCards.length === 0) return null;

    return (
        <div
            className={`absolute -bottom-40 left-1/2 transform -translate-x-1/2 flex -space-x-32 ${
                !isPlayerInTurn ? 'opacity-70' : ''
            }`}
        >
            {playerCards.map((card, i) => (
                <UnoCard
                    key={i}
                    card={card}
                    className={`cursor-pointer transform shadow-lg transition-all duration-200 ease-in-out ${
                        isPlayerInTurn ? 'hover:-translate-y-12' : ''
                    }`}
                    onClick={() => {
                        console.log(`Card clicked: index=${i}, card=`, card);
                        playCard(i);
                    }}
                />
            ))}
        </div>
    );
};

export default Hand;
