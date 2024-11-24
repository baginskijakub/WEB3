import React from 'react';
import RequestColor from './RequestColor';
import SayUno from './SayUno';
import Hand from './Hand';
import HandCompletedModal from './HandCompletedModal';
import GameCompletedModal from './GameCompletedModal';

const PlayerInterface: React.FC = () => {
    return (
        <>
            <Hand />
            <SayUno />
            <RequestColor />
            <HandCompletedModal />
            <GameCompletedModal />
        </>
    );
};

export default PlayerInterface;
