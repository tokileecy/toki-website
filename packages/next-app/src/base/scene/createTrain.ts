import * as THREE from 'three'
import { trainShaderMaterail } from './materials'

const createTrain = () => {
  const cubeGeo = new THREE.BoxGeometry(50, 50, 400, 1, 1, 10)

  const cube = new THREE.LineSegments(cubeGeo, trainShaderMaterail)
  return cube
}

export default createTrain
