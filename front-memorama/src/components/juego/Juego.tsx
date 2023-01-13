import * as THREE from "three";
import { GeneradorGrupos } from '../../utils/generadorParejas';
import { useEffect } from "react";


function Juego( props: {nivel: number, fase: number} ) {
  // Escena
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer();

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
  let clicked = '-1'
  useEffect(() => {
    console.log("holiwi", props.nivel)
    if (props.nivel !== -1) {
      scene.clear();
      scene.add(light)
      const grupos = GeneradorGrupos(props.nivel, props.fase)
      document.body.appendChild(renderer.domElement);

      if (grupos !== undefined) {
        console.log("Longitud", grupos.length)
        const bloques = grupos.length
        const tamano = Math.ceil(Math.sqrt(bloques))

        let posInicialX = -tamano / 2.5;
        let posInicialY = -tamano / 2.5;

        const gruposDesordenados = grupos.sort((a, b) => 0.5 - Math.random());
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
    }
  }, [props.nivel, props.fase])

  // Evento para escuchar los clicks
  window.addEventListener('click', (event: any) => {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = (event.clientY / window.innerHeight) * - 2 + 1;

    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObjects(scene.children);

    for (let i = 0; i < intersects.length; i++) {
      if (intersects[i].object.name) {
        clicked = `${intersects[i].object.name}`
        console.log(clicked)
        intersects[i].object.visible = false
        intersects[i].object.userData.objeto.visible = true

        // TODO: Logica para verificar que se ha acertado e incrementar nivel
        clicked = '-1'
      }
    }
    // Una vez ha encontrado el objeto clickeado lo renderiza para que se le apliquen los visibles
    // animate()
  });


  // Ejecuta el frame sobre la escena
  let animate = function () {
    requestAnimationFrame(animate);

    scene.children.forEach(el => {
      if (el.userData.movimiento && el.visible) {
        const movimiento = el.userData.movimiento
        if (movimiento.tipo === 'rotar') {
          el.rotateX(movimiento.x)
          el.rotateY(movimiento.y)
          el.rotateZ(movimiento.z)
        } else if (movimiento.tipo === 'desplazar') {
          if (movimiento.x !== 0) {
            if (movimiento.pos === 0) {
              movimiento.pos = el.position.x
            } else {
              el.position.x += movimiento.x
              // el.position = [0,2,3]
              if (el.position.x >= (movimiento.pos + 0.1)) movimiento.x = - movimiento.x
              if (el.position.x <= (movimiento.pos - 0.1)) movimiento.x = - movimiento.x
            }
          } else if (movimiento.y !== 0) {
            if (movimiento.pos === 0) {
              movimiento.pos = el.position.y
            } else {
              el.position.y += movimiento.y
              if (el.position.y >= (movimiento.pos + 0.1)) movimiento.y = - movimiento.y
              if (el.position.y <= (movimiento.pos - 0.1)) movimiento.y = - movimiento.y
            }
          } else if (movimiento.z !== 0) {
            if (movimiento.pos === 0) {
              movimiento.pos = el.position.z
            } else {
              el.position.z += movimiento.z
              if (el.position.z >= (movimiento.pos + 0.1)) movimiento.z = - movimiento.z
              if (el.position.z <= (movimiento.pos - 0.1)) movimiento.z = - movimiento.z
            }
          }
        }
      }

      if (el.name && el.name === clicked) {
        el.visible = false
        el.userData.objeto.visible = true
        // TODO: Mostrar el elemento nuevo asociado
      }
    })

    // if (pareja.primero !== "-1" && pareja.segundo !== "-1") {
    //   if (pareja.primero !== pareja.segundo) {
    //     alert("Perdiste pendejo")
    //     console.log("perdiste")
    //   }
    //   else {
    //     console.log("ganaste")
    //   }
    //   pareja.primero = pareja.segundo = '-1'
    // }

    renderer.render(scene, camera);
  };


  // Esconde los objetos y muestra las casillas
  setTimeout(() => {
    scene.children.forEach(element => {
      if (element.name) {
        element.visible = true
        element.userData.objeto.visible = false
      }
    });
  }, 2000)

  // Ejecuta todos los cambios sobre la escena
  animate();

  return (
    <div className="canvas">
    </div>
  );
}

export default Juego;
