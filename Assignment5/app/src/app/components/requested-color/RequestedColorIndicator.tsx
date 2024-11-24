import React from 'react';
import {useGame} from "@/store";
import {COLOR_MAP} from "@/app/components/cards/uno-card/utils";

const RequestedColorIndicator: React.FC = () => {
    const { game } = useGame();

    const requestedColor = game?.currentHand?.requestedColor;

    if (!requestedColor) return null;

    return (
        <div
            className="absolute top-[15%] left-1/2 transform -translate-x-1/2 flex justify-center items-center gap-2"
        >
            <p>Requested color:</p>
            <div className={`w-6 h-6 rounded ${COLOR_MAP[requestedColor]}`} />
        </div>
    );
};

export default RequestedColorIndicator;
