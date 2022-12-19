import React from 'react';
import logo from './logo.svg';
import './App.css';

import * as THREE from "three";

function App() {
  const bloques = 9
  const tamano = Math.ceil(Math.sqrt(bloques))

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer();

    console.log("Renderizado")
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    let geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    let material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });

    let posInicialX = -tamano / 2.5;
    let posInicialY = -tamano / 2.5;


    for (let j = 0; j < tamano; ++j) {
      for (let i = 0; i < tamano; ++i) {
        if (i * tamano + j >= bloques) break;
        let cube = new THREE.Mesh(geometry, material);
        cube.name = `${i * tamano + j}`
        cube.position.setX(posInicialX)
        cube.position.setY(posInicialY)
        scene.add(cube);
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

    function onClickObject(event: any) {
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (event.clientY / window.innerHeight) *  - 2 + 1;

      render()
    }

    function render() {
      // update the picking ray with the camera and pointer position
      raycaster.setFromCamera(pointer, camera);
      // calculate objects intersecting the picking ray
      const intersects = raycaster.intersectObjects(scene.children);

      for ( let i = 0; i < intersects.length; i ++ ) {

        console.log(intersects[ i ].object.name);
    
      }

      renderer.render( scene, camera );
    }

    window.addEventListener('click', onClickObject);
    window.requestAnimationFrame(render);

    let animate = function () {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();
  
  return (
    <div className="canvas">
      Hola
    </div>
  );
}

export default App;
