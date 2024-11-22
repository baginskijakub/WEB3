import React from 'react';
import UnoCardCorner from './UnoCardCorner';
import UnoCardCenter from './UnoCardCenter';
import { Card } from '@/types';
import { mapCardToStyle } from './utils';

interface UnoCardProps {
    card: Card;
    className?: string;
    onClick?: () => void;
}

const UnoCard: React.FC<UnoCardProps> = ({ card, className, onClick }) => {
    const styles = mapCardToStyle(card);

    return (
        <div
            className={`w-56 h-80 border-[12px] shadow-lg border-white rounded-lg relative ${styles.color} ${className}`}
            onClick={onClick}
        >
            <UnoCardCorner card={card} />
            {card.type !== 'WILD' && (
                <span
                    className="h-40 w-60 border-8 border-white rounded-[50%] -rotate-45 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                />
            )}
            <UnoCardCenter card={card} />
            <div className="absolute bottom-0 right-0 rotate-180">
                <UnoCardCorner card={card} />
            </div>
        </div>
    );
};

export default UnoCard;
