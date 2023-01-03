import React from 'react';
import logo from './logo.svg';
import './App.css';

import * as THREE from "three";

function App() {
  let objetos = ['cuadrado', 'circulo', 'cuadrado', 'circulo']
  let mallas = [
    { 'nombre': 'cuadrado', 'forma': new THREE.BoxGeometry(0.7, 0.7, 0.7), 'malla': new THREE.MeshPhongMaterial({ color: 0xff0000 }) },
    { 'nombre': 'circulo', 'forma': new THREE.CircleGeometry(0.4,15), 'malla': new THREE.MeshPhongMaterial({ color: 0xff0000 }) },
  ]
  const pareja = { "primero": "-1", "segundo": "-1" }
  let clicked = '-1'
  const bloques = 4
  const tamano = Math.ceil(Math.sqrt(bloques))

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer();

  console.log("Renderizado")
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  let geometry = new THREE.BoxGeometry(0.9, 0.9, 0.1);
  let material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });

  let posInicialX = -tamano / 2.5;
  let posInicialY = -tamano / 2.5;


  for (let j = 0; j < tamano; ++j) {
    for (let i = 0; i < tamano; ++i) {
      if (i * tamano + j >= bloques) break;
      let cube = new THREE.Mesh(geometry, material);

      let indice = i * tamano + j
      let forma = objetos.splice(Math.floor(Math.random() * objetos.length), 1)[0]
      let caracteristicas = mallas.find(el => {
        if (el.nombre === forma)
          return el
      })
      if (caracteristicas === undefined) { console.error("No encontrado"); continue }//TODO: Tirar error
      const objeto = new THREE.Mesh(caracteristicas.forma, caracteristicas.malla)
      objeto.position.setX(posInicialX)
      objeto.position.setY(posInicialY)

      cube.name = `${indice}`
      cube.userData = { 'forma': forma, 'objeto': objeto }
      cube.position.setX(posInicialX)
      cube.position.setY(posInicialY)

      cube.visible = false
      scene.add(cube)
      scene.add(objeto)
      posInicialX += 1
    }
    posInicialY += 1
    posInicialX = -tamano / 2.5
  }

  camera.position.z = 5;

  const colorLuz = 0xffffff;
  const intensity = 1;
  const light = new THREE.PointLight(colorLuz, intensity);
  light.position.set(0, 0, 2);

  scene.add(light)

  // const helper = new THREE.PointLightHelper(light)
  // scene.add(helper)

  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();

  function render() {
    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObjects(scene.children);

    for (let i = 0; i < intersects.length; i++) {
      if (intersects[i].object.name) {
        clicked = `${intersects[i].object.name}`
        if (pareja.primero === "-1") {
          pareja.primero = intersects[i].object.userData.forma
        } else {
          pareja.segundo = intersects[i].object.userData.forma
        }
        console.log(pareja)
        animate()
        clicked = '-1'
      }
    }
  }

  window.addEventListener('click', (event: any) => {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = (event.clientY / window.innerHeight) * - 2 + 1;

    render()
  });

  let animate = function () {
    requestAnimationFrame(animate);

    scene.children.forEach(el => {
      if (el.name && el.name === clicked) {
        el.visible = false
        el.userData.objeto.visible = true
        // TODO: Mostrar el elemento nuevo asociado
      }
    })

    if (pareja.primero !== "-1" && pareja.segundo !== "-1") {
      if (pareja.primero !== pareja.segundo) {
        alert("Perdiste pendejo")
        console.log("perdiste")
      }
      else {
        console.log("ganaste")
      }
      pareja.primero = pareja.segundo = '-1'
    }

    renderer.render(scene, camera);
  };

  animate();

  // Esconde los objetos y muestra las casillas
  setTimeout(() => {
    scene.children.forEach(element => {
      if (element.name) {
        element.visible = true
        element.userData.objeto.visible = false
      }
    });
  }, 5000)

  return (
    <div className="canvas">
    </div>
  );
}

export default App;
