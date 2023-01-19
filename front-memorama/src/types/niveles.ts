export type Nivel = {
    casillaInicio: number,
    maximoGrupos: number,
    numeroMienmbrosGrupo: number,
    tiempo: number
}

const nivelFacil: Nivel = {
    maximoGrupos: 16,
    casillaInicio: 4,
    numeroMienmbrosGrupo: 1,
    tiempo: 2
}

const nivelMedio: Nivel = {
    maximoGrupos: 10,
    casillaInicio: 8,
    numeroMienmbrosGrupo: 2,
    tiempo: 1.5
}

const nivelDificil: Nivel = {
    maximoGrupos: 10,
    casillaInicio: 12,
    numeroMienmbrosGrupo: 3,
    tiempo: 1
}

export const Niveles = [
    nivelFacil, nivelMedio, nivelDificil
]