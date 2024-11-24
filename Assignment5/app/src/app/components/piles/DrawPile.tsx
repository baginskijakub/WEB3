import React from 'react';
import {usePlayer} from "@/store";
import UnoCardReverse from "@/app/components/cards/uno-card/UnoCardReverse";

const DrawPile: React.FC = () => {
    const { drawCard } = usePlayer();

    return <UnoCardReverse onClick={drawCard} />;
};

export default DrawPile;
