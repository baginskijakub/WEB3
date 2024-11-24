import { Card, Color } from '@/types';

export const COLOR_MAP: Record<Color, string> = {
    RED: 'bg-red-600',
    BLUE: 'bg-blue-600',
    GREEN: 'bg-green-600',
    YELLOW: 'bg-yellow-500',
};

export const mapCardToStyle = (card: Card) => {
    return {
        color: COLOR_MAP[card.color as Color] || 'bg-black',
    };
};
