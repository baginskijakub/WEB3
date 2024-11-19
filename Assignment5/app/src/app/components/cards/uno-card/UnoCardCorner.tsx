import React from 'react';
import { Card } from '@/types';

interface UnoCardCornerProps {
    card: Card;
}

const UnoCardCorner: React.FC<UnoCardCornerProps> = ({ card }) => {
    return (
        <>
            {card.type === 'NUMBERED' ? (
                <p
                    className="text-white font-semibold p-3 text-4xl italic"
                    style={{ textShadow: '0 3px 0 rgba(0, 0, 0, 1)' }}
                >
                    {card.number}
                </p>
            ) : (
                <div className="p-3 w-14 drop-shadow-card-icon">
                    {card.type === 'SKIP' && (
                        <svg viewBox="0 0 162 162" fill="none" xmlns="http://www.w3.org/2000/svg">
                            SKIP
                        </svg>
                    )}
                    {card.type === 'REVERSE' && (
                        <svg viewBox="0 0 137 191" fill="none" xmlns="http://www.w3.org/2000/svg">
                            REVERSE
                        </svg>
                    )}
                    {card.type === 'DRAW' && (
                        <p
                            className="text-white font-semibold text-3xl italic"
                            style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 1)' }}
                        >
                            +2
                        </p>
                    )}
                    {card.type === 'WILD' && (
                        <svg
                            className="w-10 h-12"
                            viewBox="0 0 204 232"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            WILD
                        </svg>
                    )}
                    {card.type === 'WILD DRAW' && (
                        <p
                            className="text-white font-semibold text-3xl italic"
                            style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 1)' }}
                        >
                            +4
                        </p>
                    )}
                </div>
            )}
        </>
    );
};

export default UnoCardCorner;
