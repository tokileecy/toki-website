import * as THREE from 'three'

export const createGrid3D = (
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
  const deltaX = widthSegments === 0 ? width : width / widthSegments
  const deltaY = heightSegments === 0 ? height : height / heightSegments
  const deltaZ = depthSegments === 0 ? depth : depth / depthSegments

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

const appendGrid2D = (
  positions: number[],
  indices: number[],
  edge = 1,
  ratio = 0.5,
  z = 0
) => {
  const d0 = (edge * (1 - ratio)) / 2
  const delta = edge * ratio

  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
      const index =
        positions.push(d0 + i * delta - edge / 2, j * edge - edge / 2, z) / 3 -
        1
      if (j === 1) {
        indices.push(index - 1, index)
      }
    }
  }

  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
      const index =
        positions.push(j * edge - edge / 2, d0 + i * delta - edge / 2, z) / 3 -
        1
      if (j === 1) {
        indices.push(index - 1, index)
      }
    }
  }
}

export const createGrid2D2 = (edge = 1, ratio = 0.5) => {
  const positions: number[] = []
  const indices: number[] = []
  appendGrid2D(positions, indices, edge, ratio, 0)

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute(
    'position',
    new THREE.BufferAttribute(new Float32Array(positions), 3)
  )
  geometry.setIndex(indices)

  return geometry
}

export const createGrid3D2 = (
  edge = 1,
  ratio = 0.5,
  depth = 1,
  depthSegments = 0
) => {
  const positions: number[] = []
  const indices: number[] = []

  if (depthSegments === 0) {
    appendGrid2D(positions, indices, edge, ratio, 0)
  } else {
    const deltaZ = depth / depthSegments
    for (let i = 0; i < depthSegments + 1; i++) {
      appendGrid2D(positions, indices, edge, ratio, i * deltaZ)
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
