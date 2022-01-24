import * as THREE from 'three'

const geometry = new THREE.BoxGeometry(800, 800, 1000, 60, 60, 40)
const wireframe = new THREE.WireframeGeometry(geometry)
const material = new THREE.LineBasicMaterial({
  color: 0xffffff,
  linewidth: 1,
  linecap: 'round',
  linejoin: 'round',
})

const line = new THREE.LineSegments(wireframe, material)
line.material.depthTest = false
line.material.opacity = 0.01
line.material.transparent = true

export default line
