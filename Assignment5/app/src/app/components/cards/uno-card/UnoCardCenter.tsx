import React from 'react';
import { Card } from '@/types';

interface UnoCardCenterProps {
    card: Card;
}

const UnoCardCenter: React.FC<UnoCardCenterProps> = ({ card }) => {
    return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {card.type === 'NUMBERED' && (
                <p
                    className="text-white font-semibold text-8xl italic"
                    style={{ textShadow: '0 5px 0 rgba(0, 0, 0, 1)' }}
                >
                    {card.number}
                </p>
            )}
            {card.type === 'SKIP' && (
                <svg
                    className="w-24 h-24 drop-shadow-card-icon"
                    viewBox="0 0 162 162"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* TODO: */}
                    {/* Include SVG path data for SKIP icon */}
                </svg>
            )}
            {card.type === 'REVERSE' && (
                <svg
                    className="w-26 h-28 drop-shadow-card-icon"
                    viewBox="0 0 137 191"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* Include SVG path data for REVERSE icon */}
                </svg>
            )}
            {card.type === 'DRAW' && (
                <p
                    className="text-white font-semibold text-7xl italic"
                    style={{ textShadow: '0 4px 0 rgba(0, 0, 0, 1)' }}
                >
                    +2
                </p>
            )}
            {card.type === 'WILD DRAW' && (
                <p
                    className="text-white font-semibold text-7xl italic"
                    style={{ textShadow: '0 4px 0 rgba(0, 0, 0, 1)' }}
                >
                    +4
                </p>
            )}
            {card.type === 'WILD' && (
                <svg
                    className="w-10 h-12"
                    style={{ transform: 'scale(5.5) translateX(-1rem)' }}
                    viewBox="0 0 204 232"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* Include SVG path data for WILD icon */}
                </svg>
            )}
        </div>
    );
};

export default UnoCardCenter;
