import * as THREE from 'three'
import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import BaseWebGLBlock from '../BaseWebGLBlock'

import gridPointVertexShader from './shaders/gridPoint/vert.glsl'
import gridPointFragmentShader from './shaders/gridPoint/frag.glsl'

import gridVertShader from './shaders/grid/vert.glsl'
import gridFragShader from './shaders/grid/frag.glsl'

import Color from 'color'
import discImg from './sprites/disc.png'

export const toGrid = (geometry: THREE.PlaneGeometry): THREE.PlaneGeometry => {
  const segmentsX = geometry.parameters.widthSegments || 1
  const segmentsY = geometry.parameters.heightSegments || 1
  const indices = []
  for (let i = 0; i < segmentsY + 1; i++) {
    let index11 = 0
    let index12 = 0
    for (let j = 0; j < segmentsX; j++) {
      index11 = (segmentsX + 1) * i + j
      index12 = index11 + 1
      const index21 = index11
      const index22 = index11 + (segmentsX + 1)
      indices.push(index11, index12)
      if (index22 < (segmentsX + 1) * (segmentsY + 1) - 1) {
        indices.push(index21, index22)
      }
    }
    if (index12 + segmentsX + 1 <= (segmentsX + 1) * (segmentsY + 1) - 1) {
      indices.push(index12, index12 + segmentsX + 1)
    }
  }
  geometry.setIndex(indices)
  return geometry
}

export const createGrid = (
  spriteUrl: string,
  onTextureLoaded?: () => void
): THREE.Group => {
  const gridGroup = new THREE.Group()

  const planeSize = 5000
  const planeSegment = 100

  const gridGeom = toGrid(
    new THREE.PlaneGeometry(planeSize, planeSize, planeSegment, planeSegment)
  )

  const girdMaterial = new THREE.ShaderMaterial({
    transparent: true,
    uniforms: {
      alpha: {
        value: 0.3,
      },
    },
    vertexShader: gridVertShader,
    fragmentShader: gridFragShader,
  })
  const grid = new THREE.LineSegments(gridGeom, girdMaterial)
  grid.scale.set(1, 1, 1)
  grid.position.set(0, 0, 0)
  grid.renderOrder = -1
  gridGroup.add(grid)

  const grid1Geo = toGrid(
    new THREE.PlaneGeometry(planeSize, planeSize, planeSegment, planeSegment)
  )
  const grid1 = new THREE.LineSegments(
    grid1Geo,
    new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        alpha: {
          value: 0.17,
        },
      },
      vertexShader: gridVertShader,
      fragmentShader: gridFragShader,
    })
  )
  grid1.scale.set(1, 1, 1)
  const center = planeSize / planeSegment / 2
  grid1.position.set(center, center, 0)
  grid1.renderOrder = -1
  gridGroup.add(grid1)

  new THREE.TextureLoader().load(spriteUrl, (texture) => {
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    const radius = 100

    let gridPointGeometry: THREE.BufferGeometry = new THREE.PlaneGeometry(
      planeSize,
      planeSize,
      planeSegment,
      planeSegment
    )

    gridPointGeometry.deleteAttribute('normal')
    gridPointGeometry.deleteAttribute('uv')

    gridPointGeometry = BufferGeometryUtils.mergeVertices(gridPointGeometry)

    const positionAttribute = gridPointGeometry.getAttribute('position')

    const color = new THREE.Color()
    const vertex = new THREE.Vector3()

    const colors: number[] = []
    const sizes = []

    const length1 = gridPointGeometry.getAttribute('position').count

    for (let i = 0, l = positionAttribute.count; i < l; i++) {
      vertex.fromBufferAttribute(positionAttribute, i)

      if (i < length1) {
        color.setHSL(0.01 + 0.1 * (i / length1), 0.99, 0.5)
      } else {
        color.setHSL(0.6, 0.75, 0.25 + vertex.y / (2 * radius))
      }

      color.toArray(colors, i * 3)

      sizes[i] = i < length1 ? 10 : 40
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', positionAttribute)
    geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1))

    const material = new THREE.ShaderMaterial({
      uniforms: {
        alpha: {
          value: 0.4,
        },
        uSize: {
          value: 1,
        },
        color: { value: new THREE.Color(new Color('#02f1fa').toString()) },
        pointTexture: { value: texture },
      },
      vertexShader: gridPointVertexShader,
      fragmentShader: gridPointFragmentShader,
      transparent: true,
    })

    const points = new THREE.Points(geometry, material)
    gridGroup.add(points)
    points.scale.set(1, 1, 1)
    points.position.set(center, center, 0)
    gridGroup.add(points)
    onTextureLoaded?.()
  })

  return gridGroup
}

export type GridWebGLBlockOptions = {
  clock?: THREE.Clock
}

class GridWebGLBlock extends BaseWebGLBlock {
  iState: number

  constructor(rootElement: HTMLElement, options?: GridWebGLBlockOptions) {
    super(options?.clock ?? new THREE.Clock(), rootElement)
    this.iState = 0

    const gridGroup = createGrid(discImg, () => {
      this.render()
    })

    this.scene.add(gridGroup)
    this.camera.position.set(0, 0, 500)
  }

  init = (): void => {
    super.init()
    this.rootElement.appendChild(this.renderer.domElement)

    this.resize()
    this.render()
  }

  clear = (): void => {
    this.rootElement.removeChild(this.renderer.domElement)
  }
}

export default GridWebGLBlock
