import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils.js'

import borderNoiseVertexShader from './shaders/postProcess/borderNoise/vert.glsl'
import borderNoiseFragShader from './shaders/postProcess/borderNoise/frag.glsl'
import borderNoiseFragFinalShader from './shaders/postProcess/borderNoise/fragFinal.glsl'

import gridPointVertexShader from './shaders/gridPoint/vert.glsl'
import gridPointFragmentShader from './shaders/gridPoint/frag.glsl'

import gridVertShader from './shaders/grid/vert.glsl'
import gridFragShader from './shaders/grid/frag.glsl'
import Color from 'color'

const toGrid = (geometry: THREE.PlaneGeometry): THREE.PlaneGeometry => {
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

const createGrid = (onTextureLoaded?: () => void) => {
  const gridGroup = new THREE.Group()

  const planeSize = 1000
  const planeSegment = 70

  const gridGeom = toGrid(
    new THREE.PlaneGeometry(planeSize, planeSize, planeSegment, planeSegment)
  )

  const grid = new THREE.LineSegments(
    gridGeom,
    new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        alpha: {
          value: 0.3,
        },
      },
      vertexShader: gridVertShader,
      fragmentShader: gridFragShader,
    })
  )
  grid.scale.set(1, 1, 1)
  grid.position.set(0, 0, -300)
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
  grid1.position.set(50, 50, -300)
  grid1.renderOrder = -1
  gridGroup.add(grid1)

  const texture = new THREE.TextureLoader().load('/sprites/disc.png', () => {
    onTextureLoaded?.()
  })
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
  geometry.setAttribute('ca', new THREE.Float32BufferAttribute(colors, 3))

  const material = new THREE.ShaderMaterial({
    uniforms: {
      alpha: {
        value: 0.4,
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
  points.position.set(50, 50, -300)
  gridGroup.add(points)
  return gridGroup
}

class WebGLBlock {
  clock: THREE.Clock
  scene: THREE.Scene
  rootElement: HTMLElement
  rootElementRect: DOMRect
  renderer: THREE.WebGLRenderer
  camera: THREE.PerspectiveCamera
  composer: EffectComposer | null
  pass: ShaderPass | null
  passFinal: ShaderPass | null
  cameraWrap: null
  _devicePixelRatio: number
  requestAnimationFrameId: number | null
  composeRequestAnimationFrameId: number | null
  iState: number

  constructor(clock: THREE.Clock, rootElement: HTMLElement) {
    this.rootElement = rootElement
    this.rootElementRect = this.rootElement.getBoundingClientRect()
    this._devicePixelRatio = window.devicePixelRatio || 1
    this.clock = clock
    this.iState = 0

    this.camera = new THREE.PerspectiveCamera(0, 0, 0, 0)
    this.camera.position.set(0, 0, 10)
    this.camera.lookAt(new THREE.Vector3(0, 0, 0))

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
    })

    this.renderer.domElement.addEventListener('wheel', (e) => {
      e.preventDefault()
    })

    this.renderer.context.getExtension('OES_standard_derivatives')
    this.renderer.setClearColor(0xffffff, 0)

    this.scene = new THREE.Scene()

    const gridGroup = createGrid(() => {
      this.render()
    })
    this.scene.add(gridGroup)

    this.requestAnimationFrameId = null
    this.composeRequestAnimationFrameId = null

    this.composer = null
    this.pass = null
    this.passFinal = null
    this.cameraWrap = null
  }

  init(): void {
    const ambient = new THREE.AmbientLight(0x80ffff)
    this.scene.add(ambient)

    const directional = new THREE.DirectionalLight(0xffff00)
    directional.position.set(-1, 0.5, 0)
    this.scene.add(directional)

    this._initPostProcessing()
    this.resize()
  }

  stopAnimate(): void {
    this.requestAnimationFrameId !== null &&
      cancelAnimationFrame(this.requestAnimationFrameId)
  }

  resize(): void {
    this._devicePixelRatio = window.devicePixelRatio || 1
    this.rootElementRect = this.rootElement.getBoundingClientRect()
    const renderWidth = this.rootElementRect.width
    const renderHeight = this.rootElementRect.height

    const FOV = 45
    const NEAR = 0.1
    const FAR = 1000
    const ASPECT = renderWidth / renderHeight

    this.camera.fov = FOV
    this.camera.aspect = ASPECT
    this.camera.near = NEAR
    this.camera.far = FAR
    this.camera.updateProjectionMatrix()

    this.renderer.setSize(renderWidth, renderHeight)
    this.renderer.setPixelRatio(this._devicePixelRatio)
    this._initPostProcessing()
    this.pass?.uniforms.iResolution.value.set(renderWidth, renderHeight)

    this.render()
  }

  render(): void {
    // this.controls?.update()
    this.renderer.render(this.scene, this.camera)
  }

  animate(): void {
    this.render()
    this.requestAnimationFrameId = requestAnimationFrame(() => {
      this.animate()
    })
  }

  composerRender = (): void => {
    const elapsed = this.clock.getElapsedTime()
    // if (this.iState > 1) {
    //   this.iState = 0
    // } else {
    //   this.iState += 0.08
    // }

    this.passFinal && (this.passFinal.uniforms.iTime.value = elapsed)
    this.passFinal && (this.passFinal.uniforms.iState.value = this.iState)
    this.composer?.render()
  }

  composerAnimate = (): void => {
    this.composerRender()
    this.requestAnimationFrameId = requestAnimationFrame(() => {
      this.composerAnimate()
    })
  }

  _initPostProcessing(): void {
    const width = this.rootElementRect.width
    const height = this.rootElementRect.height

    const resolution = new THREE.Vector2(width, height)

    const drawShader = {
      uniforms: {
        tDiffuse: { type: 't', value: null },
        // tShadow: { type: 't', value: null },
        iResolution: { type: 'v2', value: resolution },
      },
      vertexShader: borderNoiseVertexShader,
      fragmentShader: borderNoiseFragShader,
    }

    const finalShader = {
      uniforms: {
        tDiffuse: { type: 't', value: null },
        iTime: { type: 'f', value: 0.0 },
        iState: { type: 'f', value: 0.0 },
        tNoise: { type: 't', value: new THREE.TextureLoader() },
      },
      vertexShader: borderNoiseVertexShader,
      fragmentShader: borderNoiseFragFinalShader,
    }

    this.composer = new EffectComposer(this.renderer)
    this.composer.addPass(new RenderPass(this.scene, this.camera))

    this.pass = new ShaderPass(drawShader)
    this.pass.renderToScreen = true
    this.composer.addPass(this.pass)

    this.passFinal = new ShaderPass(finalShader)
    this.passFinal.renderToScreen = true
    this.composer.addPass(this.passFinal)
  }
}

export default WebGLBlock
