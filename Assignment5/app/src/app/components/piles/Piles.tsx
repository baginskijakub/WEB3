import React from 'react';
import DrawPile from './DrawPile';
import DiscardPile from './DiscardPile';

const Piles: React.FC = () => {
    return (
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-12 pb-28">
            <DrawPile />
            <DiscardPile />
        </div>
    );
};

export default Piles;
