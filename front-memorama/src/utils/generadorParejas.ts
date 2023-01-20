import * as THREE from "three";
import { Elemento } from "../types/elemento";

import { Nivel, Niveles } from "../types/niveles";

const objetosPosibles = [
    { 'nombre': 'cuadrado', 'forma': new THREE.BoxGeometry(0.7, 0.7, 0.7) },
    { 'nombre': 'circulo', 'forma': new THREE.SphereGeometry(0.4, 20, 20) },
    { 'nombre': 'triangulo', 'forma': new THREE.ConeGeometry(0.5, 0.7, 20) },
    { 'nombre': 'anillo', 'forma': new THREE.TorusGeometry(0.3, 0.1, 5, 20) },
    { 'nombre': 'nudo', 'forma': new THREE.TorusKnotGeometry(0.3, 0.1) },
]
const coloresPosibles = [0x000000, 0xff0000, 0x0000ff, 0x00ff00, 0x00ffff, 0xffff00]

const movimientoPosibles = [
    { 'tipo': 'rotar', 'x': 0.1, 'y': 0, 'z': 0 },
    { 'tipo': 'rotar', 'x': 0, 'y': 0.1, 'z': 0 },
    { 'tipo': 'rotar', 'x': 0, 'y': 0, 'z': 0.1 },
    { 'tipo': 'desplazar', 'x': 0.01, 'y': 0, 'z': 0, 'pos': 0 },
    { 'tipo': 'desplazar', 'x': 0, 'y': 0.01, 'z': 0, 'pos': 0 },
    { 'tipo': 'desplazar', 'x': 0, 'y': 0, 'z': 0.01, 'pos': 0 },
]

const GeneradorObjetos = (nivel: Nivel, fase: number) => {

    let combinaciones = new Array<Elemento>()
    let indicesCombinaciones = new Array<Elemento>()

    const gruposIniciales = nivel.casillaInicio / nivel.numeroMienmbrosGrupo
    console.log("Grupos Iniciales", gruposIniciales)
    const ngrupos = gruposIniciales + fase

    console.log("Numero total de grupos", ngrupos)

    for (let grupo = 0; grupo < ngrupos; ++grupo) {
        console.log("grupo: ", grupo)

        let usado = false
        // Se podria mejorar con un hashmap y seleccionando posibles elementos por descarte de combinaciones
        while (!usado) {
            let nuevoObjeto = objetosPosibles[Math.floor(Math.random() * objetosPosibles.length)]
            let nuevoColor = coloresPosibles[Math.floor(Math.random() * coloresPosibles.length)]
            let nuevoMovimiento = movimientoPosibles[Math.floor(Math.random() * movimientoPosibles.length)]

            const existe = indicesCombinaciones.find(el => el.nombre === nuevoObjeto.nombre && el.color === nuevoColor)
            if (!existe) {
                for (let repeticiones = 0; repeticiones < nivel.numeroMienmbrosGrupo; ++repeticiones) {
                    combinaciones.push({ nombre: nuevoObjeto.nombre, color: nuevoColor, forma: nuevoObjeto.forma, movimiento: nuevoMovimiento })
                }
                indicesCombinaciones.push({ nombre: nuevoObjeto.nombre, color: nuevoColor, forma: nuevoObjeto.forma, movimiento: nuevoMovimiento })
                usado = true
            }

        }

    }

    return { indicesCombinaciones, combinaciones }
}

export function GeneradorGrupos(nivel: Nivel, fase: number) {

    // TODO: Revisar como funciona la generacion de parejas por niveles y fases
    if (nivel === undefined) { console.error("Nivel imposible"); return undefined }

    if (fase < nivel.maximoGrupos) {
        const objetos = GeneradorObjetos(nivel, fase)
        return objetos
    }
    else {
        // estado.setFin(true)
        console.log("se ha ganado")
        const objetos = GeneradorObjetos(nivel, nivel.maximoGrupos)
        return objetos
    }


}