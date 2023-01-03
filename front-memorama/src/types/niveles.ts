export type Nivel = {
    casillaInicio: number,
    maximoGrupos: number,
    numeroMienmbrosGrupo: number,
}

const nivelFacil: Nivel = {
    maximoGrupos: 16,
    casillaInicio: 4,
    numeroMienmbrosGrupo: 1
}

const nivelMedio: Nivel = {
    maximoGrupos: 20,
    casillaInicio: 8,
    numeroMienmbrosGrupo: 2
}

const nivelDificil: Nivel = {
    maximoGrupos: 30,
    casillaInicio: 12,
    numeroMienmbrosGrupo: 3
}

export const Niveles = new Map<number, Nivel>([
    [0, nivelFacil], [1, nivelMedio], [2, nivelDificil]
])