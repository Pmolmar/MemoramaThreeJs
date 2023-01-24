import React from 'react';

import Juego from '../juego/Juego';
import Interfaz from '../interfaz/Interfaz';
import Puntuacion from '../puntuacion/Puntuacion';
import { Niveles } from '../../types/niveles';

export const App = () => {
    const [fin, setFin] = React.useState(false);
    const [nivel, setNivel] = React.useState(-1);
    const [puntos, setPuntos] = React.useState(0);

    const sumaPuntos = (puntuacion: number) => {
        setPuntos(puntos + puntuacion)
    }

    return (
        <>
            <Interfaz setNivel={setNivel} />
            {fin ?
                <Puntuacion puntuacion={puntos} nivel={nivel} />
                :
                nivel !== -1 && <Juego nivel={Niveles[nivel]} fin={fin} actualizaFin={setFin} actualizaPuntos={sumaPuntos} />
            }
        </>
    )
}