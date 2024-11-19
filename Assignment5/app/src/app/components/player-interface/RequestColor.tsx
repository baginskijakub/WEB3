import React from 'react';
import { Color } from '@/types';
import {usePlayer} from "@/store";
import {COLOR_MAP} from "@/app/components/cards/uno-card/utils";

const RequestColor: React.FC = () => {
    const { displayRequestColorModal, playWildCard } = usePlayer();

    if (!displayRequestColorModal) {
        return null;
    }

    const colors: Color[] = ['RED', 'BLUE', 'GREEN', 'YELLOW'];

    return (
        <>
            <span className="absolute w-full h-full bg-slate-100 opacity-70 z-50" />
            <div
                className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-20 bg-slate-100 flex justify-center items-center gap-2 z-50 rounded-md drop-shadow-2xl"
            >
                Requested color:
                <div className="flex gap-2">
                    {colors.map((color) => (
                        <button
                            key={color}
                            className={`w-5 h-5 rounded ${COLOR_MAP[color]}`}
                            onClick={() => playWildCard(color)}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default RequestColor;
