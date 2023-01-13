import React from 'react';

import Juego from '../juego/Juego';
import Interfaz from '../interfaz/Interfaz';

export const App = () => {
    const [fin, setFin] = React.useState(false);
    const [fase, setFase] = React.useState(0);
    const [nivel, setNivel] = React.useState(-1);

    return (
        <>
            <Interfaz setNivel={setNivel}/>
            {nivel !== -1 && <Juego nivel={nivel} fase={fase} />}
        </>
    )
}