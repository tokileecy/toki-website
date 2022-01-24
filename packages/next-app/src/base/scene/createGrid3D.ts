import * as THREE from 'three'

const createGrid3D = (
  width = 1,
  height = 1,
  depth = 1,
  widthSegments = 1,
  heightSegments = 1,
  depthSegments = 1,
  options?: {
    hideX?: boolean
    hideY?: boolean
    hideZ?: boolean
  }
) => {
  const { hideX = false, hideY = false, hideZ = false } = { ...options }
  const deltaX = width / widthSegments
  const deltaY = height / heightSegments
  const deltaZ = depth / depthSegments

  const positions = []
  const indices = []
  const maxVertextX = widthSegments + 1
  const maxVertextY = heightSegments + 1
  const maxVertextZ = depthSegments + 1
  for (let i = 0; i < maxVertextX; i++) {
    for (let j = 0; j < maxVertextY; j++) {
      for (let k = 0; k < maxVertextZ; k++) {
        const index = k + j * maxVertextZ + i * maxVertextY * maxVertextZ
        positions.push(
          i * deltaX - width / 2,
          j * deltaY - height / 2,
          k * deltaZ - depth / 2
        )

        if (!hideZ && k !== 0) {
          indices.push(index - 1, index)
        }

        if (!hideY && j !== 0) {
          indices.push(index - j * maxVertextZ, index)
        }

        if (!hideX && i !== 0) {
          indices.push(index - i * maxVertextY * maxVertextZ, index)
        }
      }
    }
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute(
    'position',
    new THREE.BufferAttribute(new Float32Array(positions), 3)
  )
  geometry.setIndex(indices)

  return geometry
}

export default createGrid3D
