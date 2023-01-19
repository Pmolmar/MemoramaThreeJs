export type Elemento = {
    nombre: String,
    color: THREE.ColorRepresentation,
    forma: THREE.ShapeGeometry,
    movimiento: { 'tipo': string, 'x': number, 'y': number, 'z': number }
}