import React from 'react';
import {useGame} from "@/store";
import UnoCard from "@/app/components/cards/uno-card/UnoCard";

const DiscardPile: React.FC = () => {
    const { game } = useGame();

    const cards = game?.currentHand?.discardPile.cards;
    const card = cards ? cards[cards.length - 1] : null;

    if (!card) return null;

    return (
        <div className="relative w-56 h-80">
            <UnoCard card={card} />
        </div>
    );
};

export default DiscardPile;
