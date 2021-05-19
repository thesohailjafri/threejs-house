import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui'
import { Mesh } from 'three'
/* GUI */

// const gui = new dat.GUI()


/* Canvas */

const canvas = document.querySelector('.webgl')


/* Scene */

const scene = new THREE.Scene()


/* Sizes */

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

/* Texture */

const textureLoader = new THREE.TextureLoader()

const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAoTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')

const bricksColorTexture = textureLoader.load('/textures/bricks/color.jpg')
const bricksAoTexture = textureLoader.load('/textures/bricks/ambientOcclusion.jpg')
const bricksRoughnessTexture = textureLoader.load('/textures/bricks/roughness.jpg')
const bricksNormalTexture = textureLoader.load('/textures/bricks/normal.jpg')

const grassColorTexture = textureLoader.load('/textures/grass/color.jpg')
const grassAoTexture = textureLoader.load('/textures/grass/ambientOcclusion.jpg')
const grassRoughnessTexture = textureLoader.load('/textures/grass/roughness.jpg')
const grassNormalTexture = textureLoader.load('/textures/grass/normal.jpg')



grassColorTexture.repeat.set(10, 10)
grassAoTexture.repeat.set(10, 10)
grassRoughnessTexture.repeat.set(10, 10)
grassNormalTexture.repeat.set(10, 10)

grassColorTexture.wrapS = THREE.RepeatWrapping
grassAoTexture.wrapS = THREE.RepeatWrapping
grassRoughnessTexture.wrapS = THREE.RepeatWrapping
grassNormalTexture.wrapS = THREE.RepeatWrapping

grassColorTexture.wrapT = THREE.RepeatWrapping
grassAoTexture.wrapT = THREE.RepeatWrapping
grassRoughnessTexture.wrapT = THREE.RepeatWrapping
grassNormalTexture.wrapT = THREE.RepeatWrapping

const bushColorTexture = textureLoader.load('/textures/grass/color.jpg')
const bushAoTexture = textureLoader.load('/textures/grass/ambientOcclusion.jpg')
const bushRoughnessTexture = textureLoader.load('/textures/grass/roughness.jpg')
const bushNormalTexture = textureLoader.load('/textures/grass/normal.jpg')


/* Camera */

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 6
scene.add(camera)


/* Lights */

const generalLight = new THREE.AmbientLight('#ffffff', 0.3)
scene.add(generalLight)

const moonLight = new THREE.DirectionalLight('#ffffff', 0.5)
moonLight.position.set(4, 5, - 2)
scene.add(moonLight)

const bulpLight = new THREE.PointLight('#ff7d46', 1, 7)
bulpLight.position.set(0, 2.25, 2.4)
scene.add(bulpLight)

/* House */

const house = new THREE.Group()
scene.add(house)

//wall
const wall = new THREE.Mesh(
    new THREE.BoxBufferGeometry(4, 2.5, 4),
    new THREE.MeshStandardMaterial({
        map: bricksColorTexture,
        aoMap: bricksAoTexture,
        normalMap: bricksNormalTexture,
        roughnessMap: bricksRoughnessTexture,
    }
    ))
wall.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(wall.geometry.attributes.uv.array, 2))
wall.position.y = 2.5 * 0.5
house.add(wall)

//roof
const roof = new THREE.Mesh(
    new THREE.ConeBufferGeometry(3.4, 1, 4),
    new THREE.MeshStandardMaterial({ color: '#b35f45' }))
roof.position.y = 2.5 + 0.5
roof.rotation.y = Math.PI * 0.25
house.add(roof)

//door
const door = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(2, 2, 100, 100),
    new THREE.MeshStandardMaterial({
        map: doorColorTexture,
        transparent: true,
        alphaMap: doorAlphaTexture,
        aoMap: doorAoTexture,
        displacementMap: doorHeightTexture,
        displacementScale: 0.15,
        normalMap: doorNormalTexture,
        metalnessMap: doorMetalnessTexture,
        roughnessMap: doorRoughnessTexture,

    }))
door.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2))
door.position.y = (2 * 0.5) - 0.075
door.position.z = (4 * 0.5) + 0.001
house.add(door)

//bulp
const bulp = new THREE.Mesh(
    new THREE.SphereBufferGeometry(.12, 8, 8),
    new THREE.MeshStandardMaterial({
        color: '#f8ffb6',
        // wireframe: true,
        roughness: 0,
        transparent: true,
        opacity: 0.75
    })
)
bulp.position.z = (4 * 0.5) + 0.15
bulp.position.y = 2.47
house.add(bulp)

/* Bush */

//bushGroup1
const bushGeometry = new THREE.SphereBufferGeometry(.5, 12, 12)
const bushMaterial = new THREE.MeshStandardMaterial({
    color: '#89c854',
    map: bushColorTexture,
    aoMap: bushAoTexture,
    normalMap: bushNormalTexture,
    roughnessMap: bushRoughnessTexture,
})
bushGeometry.setAttribute('uv2', new THREE.Float32BufferAttribute(bushGeometry.attributes.uv.array, 2))

const bush1 = new Mesh(bushGeometry, bushMaterial)
bush1.position.set(1.1, 0.2, 2.5)
const bush2 = new Mesh(bushGeometry, bushMaterial)
bush2.position.set(1.6, 0.1, 2.3)
bush2.scale.set(.65, .55, .65)
const bush3 = new Mesh(bushGeometry, bushMaterial)
bush3.position.set(1.2, 0.1, 3)
bush3.scale.set(.65, .45, .65)

//bushGroup2
const bush4 = new Mesh(bushGeometry, bushMaterial)
bush4.position.set(-1.2, 0.2, 2.3)
bush4.scale.set(1.2, .8, 1)
const bush5 = new Mesh(bushGeometry, bushMaterial)
bush5.position.set(-1, 0.1, 2.8)
bush5.scale.set(.65, .55, .45)
const bush6 = new Mesh(bushGeometry, bushMaterial)
bush6.position.set(-1.6, 0.1, 2.6)
bush6.scale.set(.75, .55, .55)
scene.add(bush1, bush2, bush3, bush4, bush5, bush6)

/* Tombstones */
const stoneMaterial = new THREE.MeshStandardMaterial({ color: "#807567" })
const stoneGeometry = new THREE.BoxBufferGeometry(.5, .7, .1)
const count = 50
for (let i = 0; i < count; i++) {
    const stone = new THREE.Mesh(stoneGeometry, stoneMaterial)

    const angle = Math.random() * Math.PI * 2 // Random angle
    const radius = 3.4 + Math.random() * 6.4  // Random radius
    const x = Math.cos(angle) * radius        // Get the x position using cosinus
    const z = Math.sin(angle) * radius        // Get the z position using sinus

    stone.position.set(x, 0.3, z)

    stone.rotation.z = (Math.random() - 0.5) * 0.25

    stone.castShadow = true

    scene.add(stone)
}

/* Ghosts */

const ghost1grp = new THREE.Group()
const ghost2grp = new THREE.Group()
const ghost3grp = new THREE.Group()

const ghostGeometry = new THREE.SphereBufferGeometry(.1, 8, 8)
const ghostMaterial = new THREE.MeshStandardMaterial({
    // color: '#000000',
    // roughness: 0,
    transparent: true,
    opacity: 0.25
})

const ghost1Glow = new THREE.PointLight('#ff00ff', 3, 3)
const ghost2Glow = new THREE.PointLight('#0000ff', 3, 3)
const ghost3Glow = new THREE.PointLight('#ff0000', 3, 3)

const ghost1Body = new THREE.Mesh(ghostGeometry, ghostMaterial)
const ghost2Body = new THREE.Mesh(ghostGeometry, ghostMaterial)
const ghost3Body = new THREE.Mesh(ghostGeometry, ghostMaterial)



scene.add(ghost1grp, ghost2grp, ghost3grp)
ghost1grp.add(ghost1Glow, ghost1Body)
ghost2grp.add(ghost2Glow, ghost2Body)
ghost3grp.add(ghost3Glow, ghost3Body)

/* Floor */

const floor = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(20, 20),
    new THREE.MeshStandardMaterial({
        color: '#a9c388',
        map: grassColorTexture,
        aoMap: grassAoTexture,
        normalMap: grassNormalTexture,
        roughnessMap: grassRoughnessTexture,
    })
)
floor.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2))
floor.rotation.x = - Math.PI * 0.5
floor.position.y = 0

scene.add(floor)



/* Controls */

const control = new OrbitControls(camera, canvas)
control.enableDamping = true


/* Renderer */

const renderer = new THREE.WebGLRenderer({
    canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor('#262837')
renderer.shadowMap.type = THREE.PCFSoftShadowMap

/*Fog*/
const fog = new THREE.Fog('#262837', 1, 15)
scene.fog = fog

/* Shadows */
renderer.shadowMap.enabled = true
floor.receiveShadow = true

moonLight.castShadow = true
moonLight.shadow.mapSize.width = 256
moonLight.shadow.mapSize.height = 256
moonLight.shadow.camera.far = 7

ghost1Glow.castShadow = true
ghost1Glow.shadow.mapSize.width = 256
ghost1Glow.shadow.mapSize.height = 256
ghost1Glow.shadow.camera.far = 7

ghost2Glow.castShadow = true
ghost2Glow.shadow.mapSize.width = 256
ghost2Glow.shadow.mapSize.height = 256
ghost2Glow.shadow.camera.far = 7

ghost3Glow.castShadow = true
ghost3Glow.shadow.mapSize.width = 256
ghost3Glow.shadow.mapSize.height = 256
ghost3Glow.shadow.camera.far = 7

wall.castShadow = true
roof.castShadow = true

bush1.castShadow = true
bush2.castShadow = true
bush3.castShadow = true

bush4.castShadow = true
bush5.castShadow = true
bush6.castShadow = true

bulpLight.castShadow = true
bulpLight.shadow.mapSize.width = 256
bulpLight.shadow.mapSize.height = 256
bulpLight.shadow.camera.far = 7


/* Resize */

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


/* Animation */

const clock = new THREE.Clock()
const loop = () => {
    const elapsedTime = clock.getElapsedTime()

    //ghost1
    ghost1grp.position.x = Math.cos(elapsedTime * 0.8) * 4
    ghost1grp.position.y = Math.abs(Math.sin(elapsedTime * 4) * 1)
    ghost1grp.position.z = Math.sin(elapsedTime * 0.8) * 4

    //ghost2
    ghost2grp.position.x = Math.cos(-elapsedTime * 0.6) * 5
    ghost2grp.position.z = Math.sin(-elapsedTime * 0.6) * 4
    ghost2grp.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5)

    //ghost3
    ghost3grp.position.x = Math.cos(-elapsedTime * 0.4) * 6
    ghost3grp.position.z = Math.sin(-elapsedTime * 0.4) * 6
    ghost3grp.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5)

    renderer.render(scene, camera)
    /* new frame */
    window.requestAnimationFrame(loop)
}
loop()


