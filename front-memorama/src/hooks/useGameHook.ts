import React from 'react';

export function useGameState() {
    // Declare a new state variable, which we'll call "count"
    const [fin, setFin] = React.useState(false);
    const [fase, setFase] = React.useState(0)

    return {
        fin,
        setFin,
        fase,
        setFase
    }
}
