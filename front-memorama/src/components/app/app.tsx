import React from 'react';

import Juego from '../juego/Juego';
import Interfaz from '../interfaz/Interfaz';
import Puntuacion from '../puntuacion/Puntuacion';

export const App = () => {
    const [fin, setFin] = React.useState(false);
    const [nivel, setNivel] = React.useState(-1);
    const [puntos, setPuntos] = React.useState(-1);

    return (
        <>
            <Interfaz setNivel={setNivel} />
            {fin ?
                <Puntuacion puntuacion={puntos} />
                :
                nivel !== -1 && <Juego nivel={nivel} fin={fin} actualizaFin={setFin} actualizaPuntos={setPuntos} />
            }
        </>
    )
}