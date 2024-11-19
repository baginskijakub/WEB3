import React from 'react';
import {usePlayer} from "@/store";

const SayUno: React.FC = () => {
    const { sayUno } = usePlayer();

    return (
        <button
            onClick={sayUno}
            className="absolute bottom-3 right-3 px-3 py-2 bg-blue-600 text-white rounded-md"
        >
            Say UNO
        </button>
    );
};

export default SayUno;
