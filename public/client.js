import * as THREE from 'three'
import { OrbitControls } from './jsm/controls/OrbitControls.js'
import Stats from './jsm/libs/stats.module.js'
import { GUI } from './jsm/libs/lil-gui.module.min.js'
import { GLTFLoader } from './jsm/loaders/GLTFLoader.js'



const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
}
const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: canvas
});

const loader = new GLTFLoader()
const camera = new THREE.PerspectiveCamera(90, sizes.width / sizes.height, 0.001, 1000)

const controls = new OrbitControls(camera, renderer.domElement);

const scene = new THREE.Scene()

let model;


loader.load('assets/render/spaceship.glb', function (glb) {
    console.log("glb :-", glb)

    model = glb.scene;


    model.scale.set(0.2, 0.2, 0.2)


    scene.add(model)

}, function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + "%loaded")
}, function (error) {
    console.log("ann error")

})

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2, 2, 5)
scene.add(light)



// const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshBasicMaterial({
//     color: 'green',
// })

// const boxMesh = new THREE.Mesh(geometry, material)

// scene.add(boxMesh)


camera.position.set(0, 1, 3)
scene.add(camera)


renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true
renderer.gameOutput = true


// document.body.appendChild(renderer.domElement); 




function animate() {
    requestAnimationFrame(animate)
    model.rotation.y += 0.02
    renderer.render(scene, camera)
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()

}


window.addEventListener('resize', onWindowResize, false)


animate()