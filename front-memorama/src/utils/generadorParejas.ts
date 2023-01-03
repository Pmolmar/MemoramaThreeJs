import * as THREE from "three";

import { Nivel, Niveles } from "../types/niveles";

const objetosPosibles = [
    { 'nombre': 'cuadrado', 'forma': new THREE.BoxGeometry(0.7, 0.7, 0.7) },
    { 'nombre': 'circulo', 'forma': new THREE.CircleGeometry(0.4) },
    { 'nombre': 'triangulo', 'forma': new THREE.ConeGeometry(0.7, 0.7) },
    { 'nombre': 'anillo', 'forma': new THREE.RingGeometry(0.7, 0.7) },
]
const coloresPosibles = ['#', '#', '#', '#', '#']

const generadorObjetos = (nivel: Nivel, fase: number) => {

    let combinaciones = new Array<{ objeto: String, color: String, forma: THREE.ShapeGeometry }>()

    for (let grupo = 0; grupo < nivel.numeroMienmbrosGrupo; ++grupo) {
        for (let miembro = 0; miembro < nivel.numeroMienmbrosGrupo; ++miembro) {
            let usado = false
            while (!usado) {
                let nuevoObjeto = objetosPosibles[Math.floor(Math.random() * objetosPosibles.length)]
                let nuevoColor = coloresPosibles[Math.floor(Math.random() * coloresPosibles.length)]

                const existe = combinaciones.find(el => el.objeto === nuevoObjeto.nombre && el.color === nuevoColor)
                if (existe) continue
                else {
                    combinaciones.push({ objeto: nuevoObjeto.nombre, color: nuevoColor, forma: nuevoObjeto.forma })
                    usado = true
                }

            }
        }
    }

    return combinaciones
}

export function generadorParejas(nivel: number, fase: number) {

    const nivelActual = Niveles.get(nivel);

    // TODO: Revisar como funciona la generacion de parejas por niveles y fases
    if (nivelActual === undefined) { console.error("Nivel imposible"); return undefined }
    const parejasActuales = nivelActual.casillaInicio + (nivelActual.numeroMienmbrosGrupo + 1) * fase

    nivelActual?.maximoGrupos

    const objetos = generadorObjetos(nivelActual, fase)

    return objetos
}