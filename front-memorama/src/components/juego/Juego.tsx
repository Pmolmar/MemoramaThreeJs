import * as THREE from "three";
import { GeneradorGrupos } from '../../utils/generadorParejas';
import React from "react";
import { Nivel, Niveles } from "../../types/niveles";
import { Elemento } from "../../types/elemento";


function Juego(props: { nivel: Nivel, fin: boolean, actualizaFin: any, actualizaPuntos: any }) {
  // Escena
  let fase = 0
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.2, 1000);
  const renderer = new THREE.WebGLRenderer();
  const clock = new THREE.Clock();
  let posibilidades: Array<Elemento>
  let elegido: Elemento | undefined
  let objetoElegido: THREE.Mesh | undefined
  let puntuacion = -1
  let parejas = 0

  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xffffff, 0);

  // Luz
  camera.position.z = 5;

  const colorLuz = 0xffffff;
  const intensity = 1;
  const light = new THREE.PointLight(colorLuz, intensity);
  light.position.set(0, 0, 2);

  // const helper = new THREE.PointLightHelper(light)
  // scene.add(helper)

  // Inicio de los objetos si tiene estado
  const inicio = (fase: number) => {
    if (props.nivel !== undefined) {
      scene.clear();
      scene.add(light)
      const grupos = GeneradorGrupos(props.nivel, fase)
      document.body.appendChild(renderer.domElement);

      if (grupos !== undefined) {
        console.log("Longitud", grupos.combinaciones.length)
        posibilidades = grupos.indicesCombinaciones
        const bloques = grupos.combinaciones.length
        const tamano = Math.ceil(Math.sqrt(bloques))

        let posInicialX = -tamano / 2.5;
        let posInicialY = -tamano / 2.5;

        const gruposDesordenados = grupos.combinaciones.sort((a, b) => 0.5 - Math.random());
        let indice = 0

        gruposDesordenados.forEach(element => {
          let material = new THREE.MeshPhongMaterial({ color: element.color });

          // Objeto
          let objeto = new THREE.Mesh(element.forma, material)
          objeto.position.setX(posInicialX)
          objeto.position.setY(posInicialY)
          objeto.userData = { 'movimiento': element.movimiento }
          objeto.visible = true
          scene.add(objeto)

          // Casilla por defecto
          let casilla = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.9, 0.1), new THREE.MeshPhongMaterial({ color: 0x00ff00 }));
          casilla.name = `${indice}`
          casilla.position.setX(posInicialX)
          casilla.position.setY(posInicialY)
          casilla.userData = { 'nombre': element.nombre, 'color': element.color, 'objeto': objeto }
          casilla.visible = false
          scene.add(casilla)

          // Aumento de posiciones en la "matriz"

          posInicialX += 1
          if (indice % tamano === 1) {
            posInicialY += 1
            posInicialX = -tamano / 2.5
          }

          ++indice
        });
      }
      // Esconde los objetos y muestra las casillas
      setTimeout(() => {
        puntuacion = 0
        scene.children.forEach(element => {
          if (element.name) {
            element.visible = true
            element.userData.objeto.visible = false
          }
        });
      }, props.nivel.tiempo * (fase + 1) * 1000)
    }
  }

  // Evento para escuchar los clicks
  window.addEventListener('click', (event: any) => {
    if (puntuacion < 0) return

    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = (event.clientY / window.innerHeight) * - 2 + 1;

    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObjects(scene.children);

    for (let i = 0; i < intersects.length; i++) {
      if (intersects[i].object.name) {

        intersects[i].object.visible = false
        intersects[i].object.userData.objeto.visible = true

        if (elegido !== undefined && objetoElegido !== undefined) {
          if (elegido.nombre === intersects[i].object.userData.nombre &&
            elegido.color === intersects[i].object.userData.color) {

            console.log("acierto")
            parejas++
            puntuacion++

            if (parejas === props.nivel.numeroMienmbrosGrupo) {
              scene.remove(objetoElegido)
              elegido = undefined
            }

          } else {
            console.log("fallo")
            scene.clear()
            props.actualizaPuntos(puntuacion)
            props.actualizaFin(true)
          }
        }

      }
    }
  });


  // Ejecuta el frame sobre la escena
  let animate = function () {
    if (scene.children.length === 0 && puntuacion < 0) {
      inicio(fase)
    }

    const delta = clock.getElapsedTime()
    requestAnimationFrame(animate);

    if (elegido === undefined && posibilidades !== undefined) {
      let nuevo = posibilidades.shift()
      if (nuevo !== undefined) {
        let material = new THREE.MeshPhongMaterial({ color: nuevo.color });
        let objeto = new THREE.Mesh(nuevo.forma, material)
        objeto.position.setX(0)
        objeto.position.setY(4.4)
        objeto.userData = { 'movimiento': nuevo.movimiento }
        objeto.visible = true
        scene.add(objeto)
        objetoElegido = objeto
        elegido = nuevo
      }
    }

    scene.children.forEach(el => {
      if (el.userData.movimiento && el.visible) {
        const movimiento = el.userData.movimiento
        if (movimiento.tipo === 'rotar') {
          el.rotateX(movimiento.x)
          el.rotateY(movimiento.y)
          el.rotateZ(movimiento.z)
        } else if (movimiento.tipo === 'desplazar') {

          // obj.position.x = ogX + Math.cos(timestamp)*desp
          if (movimiento.x !== 0) {
            el.position.x = el.position.x + (Math.cos(delta * 4) / 3 * movimiento.x)
          } else if (movimiento.y !== 0) {
            el.position.y = el.position.y + (Math.cos(delta * 4) / 3 * movimiento.y)
          } else if (movimiento.z !== 0) {
            el.position.z = el.position.z + (Math.cos(delta * 4) / 3 * movimiento.z)
          }
        }
      }

    })

    if (posibilidades !== undefined && elegido === undefined && posibilidades.length === 0) {
      console.log("Ganaste")
      inicio(++fase)
    }

    renderer.render(scene, camera);
  };

  // Ejecuta todos los cambios sobre la escena
  animate();

  return (
    <div className="canvas">
    </div>
  );

}

export default Juego;
