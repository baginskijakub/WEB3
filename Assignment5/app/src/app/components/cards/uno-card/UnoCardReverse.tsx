import React from 'react';

interface UnoCardReverseProps {
    onClick?: () => void;
}

const UnoCardReverse: React.FC<UnoCardReverseProps> = ({ onClick }) => {
    return (
        <div
            className="w-56 h-80 border-[12px] shadow-lg border-white rounded-lg relative bg-black cursor-pointer"
            onClick={onClick}
        >
      <span
          className="h-40 w-60 border-8 border-white bg-red-700 rounded-[50%] -rotate-45 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
      >
        <span
            className="text-6xl font-black text-yellow-400"
            style={{ textShadow: '0 5px 0 rgba(0, 0, 0, 1)' }}
        >
          UNO
        </span>
      </span>
        </div>
    );
};

export default UnoCardReverse;
