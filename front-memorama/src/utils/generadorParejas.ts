import * as THREE from "three";

import { Nivel, Niveles } from "../types/niveles";
import { useGameState } from "../hooks/useGameHook";

const objetosPosibles = [
    { 'nombre': 'cuadrado', 'forma': new THREE.BoxGeometry(0.7, 0.7, 0.7) },
    { 'nombre': 'circulo', 'forma': new THREE.CircleGeometry(0.4, 20) },
    { 'nombre': 'triangulo', 'forma': new THREE.ConeGeometry(0.5, 0.7, 20) },
    { 'nombre': 'anillo', 'forma': new THREE.TorusGeometry(0.3, 0.1, 5, 20) },
    { 'nombre': 'nudo', 'forma': new THREE.TorusKnotGeometry(0.3, 0.1) },
]
const coloresPosibles = [0xff00ff, 0xff0000, 0x0000ff, 0x00ff00, 0x0f0f0f]

const GeneradorObjetos = (nivel: Nivel) => {

    const estado = useGameState()
    let combinaciones = new Array<{ nombre: String, color: THREE.ColorRepresentation, forma: THREE.ShapeGeometry }>()

    const gruposIniciales = nivel.casillaInicio / nivel.numeroMienmbrosGrupo
    console.log("Grupos Iniciales", gruposIniciales)
    const ngrupos = gruposIniciales + estado.fase

    console.log("Numero total de grupos", ngrupos)

    for (let grupo = 0; grupo < ngrupos; ++grupo) {
        console.log("grupo: ", grupo)

        let usado = false
        while (!usado) {
            let nuevoObjeto = objetosPosibles[Math.floor(Math.random() * objetosPosibles.length)]
            let nuevoColor = coloresPosibles[Math.floor(Math.random() * coloresPosibles.length)]

            const existe = combinaciones.find(el => el.nombre === nuevoObjeto.nombre && el.color === nuevoColor)
            if (!existe) {
                for (let repeticiones = 0; repeticiones < nivel.numeroMienmbrosGrupo; ++repeticiones) {
                    combinaciones.push({ nombre: nuevoObjeto.nombre, color: nuevoColor, forma: nuevoObjeto.forma })
                }
                usado = true
            }

        }

    }

    return combinaciones
}

export function GeneradorGrupos(nivel: number) {

    const nivelActual = Niveles.get(nivel);
    const estado = useGameState()

    // TODO: Revisar como funciona la generacion de parejas por niveles y fases
    if (nivelActual === undefined) { console.error("Nivel imposible"); return undefined }
    const gruposActuales = nivelActual.casillaInicio / nivelActual.numeroMienmbrosGrupo + nivelActual.numeroMienmbrosGrupo * estado.fase

    if (gruposActuales < nivelActual.maximoGrupos) {
        const objetos = GeneradorObjetos(nivelActual)
        return objetos
    }
    else {
        // estado.setFin(true)
        console.log("se ha ganado")
        return undefined
    }


}