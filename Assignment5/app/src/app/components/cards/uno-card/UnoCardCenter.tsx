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
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M81 162C125.735 162 162 125.735 162 81C162 36.2649 125.735 0 81 0C36.2649 0 0 36.2649 0 81C0 125.735 36.2649 162 81 162ZM31.7794 117.786C24.1025 107.53 19.5558 94.796 19.5558 81C19.5558 47.0653 47.0653 19.5558 81 19.5558C94.7961 19.5558 107.53 24.1025 117.786 31.7794L31.7794 117.786ZM45.3701 131.065C55.4196 138.23 67.7176 142.444 81 142.444C114.935 142.444 142.444 114.935 142.444 81C142.444 67.7175 138.23 55.4196 131.065 45.3701L45.3701 131.065Z"
                        fill="white"
                    />
                </svg>
            )}
            {card.type === 'REVERSE' && (
                <svg
                    className="w-26 h-28 drop-shadow-card-icon"
                    viewBox="0 0 137 191"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M117.039 72.2248L136.392 0L64.1671 19.3526L80.861 36.0464L35.7217 81.1856C24.602 92.3053 24.602 110.334 35.7217 121.454L100.995 56.1804L117.039 72.2248Z"
                        fill="white"
                    />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M55.5309 154.902L72.2248 171.596L0 190.949L19.3526 118.724L35.3969 134.768L100.67 69.4949C111.79 80.6146 111.79 98.6432 100.67 109.763L55.5309 154.902Z"
                        fill="white"
                    />
                </svg>
            )}
            {card.type === 'DRAW' && (
                <p
                    className="text-white font-semibold text-7xl italic"
                    style={{textShadow: '0 4px 0 rgba(0, 0, 0, 1)'}}
                >
                    +2
                </p>
            )}
            {card.type === 'WILD DRAW' && (
                <svg
                    className="w-26 h-28 drop-shadow-card-icon"
                    viewBox="0 0 140 140"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M20 70 A50 50 0 0 1 70 20 L70 70 Z"
                        fill="red"
                    />
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M70 20 A50 50 0 0 1 120 70 L70 70 Z"
                        fill="blue"
                    />
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M120 70 A50 50 0 0 1 70 120 L70 70 Z"
                        fill="yellow"
                    />
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M70 120 A50 50 0 0 1 20 70 L70 70 Z"
                        fill="green"
                    />
                </svg>

            )}
            {card.type === 'WILD' && (
                <svg
                    className="w-26 h-28 drop-shadow-card-icon"
                    viewBox="0 0 140 140"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M20 70 A50 50 0 0 1 70 20 L70 70 Z"
                        fill="red"
                    />
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M70 20 A50 50 0 0 1 120 70 L70 70 Z"
                        fill="blue"
                    />
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M120 70 A50 50 0 0 1 70 120 L70 70 Z"
                        fill="yellow"
                    />
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M70 120 A50 50 0 0 1 20 70 L70 70 Z"
                        fill="green"
                    />
                </svg>
            )}
        </div>
    );
};

export default UnoCardCenter;
