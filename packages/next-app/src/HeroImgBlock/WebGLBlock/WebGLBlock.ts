import * as THREE from 'three'
import heroImgState from '../HeroImgState'
import gridVertShader from './shaders/grid/vert.glsl'
import gridFragShader from './shaders/grid/frag.glsl'
import Color from 'color'
import TWEEN from '@tweenjs/tween.js'
import { Vector3 } from 'three'

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js'
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass.js'

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

class WebGLBlock {
  cube: THREE.LineSegments
  rootElement: HTMLElement
  rootElementRect: DOMRect
  renderer: THREE.WebGLRenderer
  cameraWrap: null
  _devicePixelRatio: number
  requestAnimationFrameId: number | null
  iState: number
  renderPass: RenderPass
  composer: EffectComposer
  fxaaPass: ShaderPass
  smaaPass: SMAAPass

  constructor(rootElement: HTMLElement) {
    this.rootElement = rootElement
    this.rootElementRect = this.rootElement.getBoundingClientRect()
    this._devicePixelRatio = window.devicePixelRatio || 1
    this.iState = 0

    heroImgState.scene.fog = new THREE.Fog(0x000000, 50, 1000)

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

    {
      const gridGeo = createGrid3D(1000, 1000, 4000, 10, 10, 10, {
        hideZ: true,
      })
      const gridGeo1 = createGrid3D(1100, 1100, 4400, 1, 1, 1, {})

      const uniforms = THREE.UniformsUtils.merge([
        THREE.UniformsLib.fog,
        {
          alpha: {
            value: 1,
          },
          color: {
            value: new THREE.Color(
              new Color('#02f1fa').darken(0.5).rgb().toString()
            ),
          },
        },
      ])

      const girdMaterial = new THREE.ShaderMaterial({
        uniforms,
        vertexShader: gridVertShader,
        fragmentShader: gridFragShader,
        transparent: true,
        fog: true,
        linewidth: 1,
      })

      const originRotation = new Vector3(0.3, 0.7, 0)
      const targetRotation = new Vector3(0.4, 0.8, 0)
      const grid = new THREE.LineSegments(gridGeo, girdMaterial)
      const grid1 = new THREE.LineSegments(gridGeo1, girdMaterial)
      // grid.renderOrder = 2
      // grid.position.set(0, 0, 700)
      grid.scale.set(0.05, 0.05, 0.05)
      // grid.rotation.set(0.3, 0.7, 0)
      // grid.rotation.set(originRotation.x, originRotation.y, originRotation.z)

      // // grid1.position.set(0, 0, 700)
      grid1.scale.set(0.05, 0.05, 0.05)
      // grid1.rotation.set(originRotation.x, originRotation.y, originRotation.z)

      const group = new THREE.Group()
      group.add(grid)
      group.add(grid1)
      group.position.set(0, 0, 700)
      group.rotation.set(originRotation.x, originRotation.y, originRotation.z)
      // group.scale.set(0.05, 0.05, 0.05)
      // .x = 0.3
      // grid.rotation.y = 0.7

      const duration = 2500
      const easing = TWEEN.Easing.Quadratic.InOut
      const startAnimate = new TWEEN.Tween(group.rotation)
        .to(targetRotation, duration)
        .easing(easing)
        .start()

      const reverseAnimation = new TWEEN.Tween(group.rotation)
        .to(originRotation, duration)
        .easing(easing)

      startAnimate.chain(reverseAnimation)
      reverseAnimation.chain(startAnimate)
      startAnimate.start()
      // .repeat(Infinity)

      heroImgState.scene.add(group)
      // heroImgState.scene.add(grid)
    }

    const cubeGeo = createGrid3D(1200, 1200, 900, 3, 3, 3)
    const materail = new THREE.ShaderMaterial({
      uniforms: THREE.UniformsUtils.merge([
        THREE.UniformsLib.fog,
        {
          lineWidth: { value: 1 },
          alpha: {
            value: 1,
          },
          color: { value: new THREE.Color(new Color('#02f1fa').toString()) },
        },
      ]),
      vertexShader: gridVertShader,
      fragmentShader: gridFragShader,
      transparent: true,
      fog: true,
      linewidth: 1,
    })

    const cube = new THREE.LineSegments(cubeGeo, materail)

    cube.position.set(0, 0, 400)
    // cube.scale.set(0.05, 0.05, 0.05)
    // cube.rotation.x = 0.3
    // cube.rotation.y = 0.7

    heroImgState.scene.add(cube)
    {
      const cubeGeo = createGrid3D(1200, 1200, 400, 10, 10, 10)
      const materail = new THREE.ShaderMaterial({
        uniforms: THREE.UniformsUtils.merge([
          THREE.UniformsLib.fog,
          {
            lineWidth: { value: 1 },
            alpha: {
              value: 0.1,
            },
            color: { value: new THREE.Color(new Color('#02f1fa').toString()) },
          },
        ]),
        vertexShader: gridVertShader,
        fragmentShader: gridFragShader,
        transparent: true,
        fog: true,
        linewidth: 1,
      })

      const cube = new THREE.LineSegments(cubeGeo, materail)

      cube.position.set(0, 0, 200)
      // cube.scale.set(0.05, 0.05, 0.05)
      // cube.rotation.x = 0.3
      // cube.rotation.y = 0.7

      heroImgState.scene.add(cube)
    }

    {
      // const cubeGeo = createGrid3D(100, 100, 400, 10, 10, 10)
      const cubeGeo = new THREE.BoxGeometry(50, 50, 400, 1, 1, 10)
      const materail = new THREE.ShaderMaterial({
        uniforms: THREE.UniformsUtils.merge([
          THREE.UniformsLib.fog,
          {
            lineWidth: { value: 1 },
            alpha: {
              value: 1,
            },
            color: { value: new THREE.Color(new Color('#02f1fa').toString()) },
          },
        ]),
        vertexShader: gridVertShader,
        fragmentShader: gridFragShader,
        transparent: true,
        fog: true,
        linewidth: 1,
      })

      this.cube = new THREE.LineSegments(cubeGeo, materail)

      this.cube.position.set(150, 0, 1500)
      // cube.scale.set(0.05, 0.05, 0.05)
      // cube.rotation.x = 0.3
      // cube.rotation.y = 0.7

      heroImgState.scene.add(this.cube)

      new TWEEN.Tween(this.cube.position)
        .to(new THREE.Vector3(150, 0, -800), 5000)
        .easing(TWEEN.Easing.Linear.None)
        .start()
        .repeat(Infinity)
    }

    {
      // const cubeGeo = createGrid3D(100, 100, 400, 10, 10, 10)
      const cubeGeo = new THREE.BoxGeometry(50, 50, 400, 1, 1, 10)
      const materail = new THREE.ShaderMaterial({
        uniforms: THREE.UniformsUtils.merge([
          THREE.UniformsLib.fog,
          {
            lineWidth: { value: 1 },
            alpha: {
              value: 1,
            },
            color: { value: new THREE.Color(new Color('#02f1fa').toString()) },
          },
        ]),
        vertexShader: gridVertShader,
        fragmentShader: gridFragShader,
        transparent: true,
        fog: true,
        linewidth: 1,
      })

      const cube = new THREE.LineSegments(cubeGeo, materail)

      cube.position.set(-1000, 100, 500)
      // cube.scale.set(0.05, 0.05, 0.05)
      // cube.rotation.x = 0.3
      cube.rotation.y = Math.PI / 2

      heroImgState.scene.add(cube)

      setTimeout(() => {
        new TWEEN.Tween(cube.position)
          .to(new THREE.Vector3(1000, 100, 500), 5000)
          .easing(TWEEN.Easing.Linear.None)
          .start()
          .repeat(Infinity)
      }, 2500)
    }

    {
      // const cubeGeo = createGrid3D(100, 100, 400, 10, 10, 10)
      const cubeGeo = new THREE.BoxGeometry(50, 50, 400, 1, 1, 10)
      const materail = new THREE.ShaderMaterial({
        uniforms: THREE.UniformsUtils.merge([
          THREE.UniformsLib.fog,
          {
            lineWidth: { value: 1 },
            alpha: {
              value: 1,
            },
            color: { value: new THREE.Color(new Color('#02f1fa').toString()) },
          },
        ]),
        vertexShader: gridVertShader,
        fragmentShader: gridFragShader,
        transparent: true,
        fog: true,
        linewidth: 1,
      })

      const cube = new THREE.LineSegments(cubeGeo, materail)

      cube.position.set(-1000, -200, 500)
      // cube.scale.set(0.05, 0.05, 0.05)
      // cube.rotation.x = 0.3
      cube.rotation.y = Math.PI / 2

      heroImgState.scene.add(cube)

      setTimeout(() => {
        new TWEEN.Tween(cube.position)
          .to(new THREE.Vector3(1000, -200, 500), 5000)
          .easing(TWEEN.Easing.Linear.None)
          .start()
          .repeat(Infinity)
      }, 3000)
    }

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
    })

    this.renderer.domElement.addEventListener('wheel', (e) => {
      e.preventDefault()
    })

    const context = this.renderer.getContext()
    if (context !== null && context !== undefined) {
      context.getExtension('OES_standard_derivatives')
    }
    this.renderer.extensions.get('EXT_color_buffer_float')
    this.renderer.setClearColor(0xffffff, 0)

    this.requestAnimationFrameId = null

    this.cameraWrap = null

    this.renderPass = new RenderPass(heroImgState.scene, heroImgState.camera)

    // composer.addPass( pass );

    this.fxaaPass = new ShaderPass(FXAAShader)

    const renderWidth = this.rootElementRect.width
    const renderHeight = this.rootElementRect.height

    this.smaaPass = new SMAAPass(
      renderWidth * this._devicePixelRatio,
      renderHeight * this._devicePixelRatio
    )

    this.fxaaPass.material.uniforms['resolution'].value.x =
      1 / (renderWidth * this._devicePixelRatio)
    this.fxaaPass.material.uniforms['resolution'].value.y =
      1 / (renderHeight * this._devicePixelRatio)

    this.composer = new EffectComposer(this.renderer)
    this.composer.addPass(this.renderPass)
    // this.composer.addPass(this.fxaaPass)
    this.composer.addPass(this.smaaPass)
  }

  init = (): void => {
    const ambient = new THREE.AmbientLight(0x80ffff)
    heroImgState.scene.add(ambient)

    const directional = new THREE.DirectionalLight(0xffff00)
    directional.position.set(-1, 0.5, 0)
    heroImgState.scene.add(directional)

    this.resize()
  }

  resize = (): void => {
    this._devicePixelRatio = window.devicePixelRatio || 1
    this.rootElementRect = this.rootElement.getBoundingClientRect()
    const renderWidth = this.rootElementRect.width
    const renderHeight = this.rootElementRect.height

    const FOV = 45
    const NEAR = 10
    const FAR = 2000

    heroImgState.camera.fov = FOV
    heroImgState.camera.aspect = renderWidth / renderHeight
    heroImgState.camera.near = NEAR
    heroImgState.camera.far = FAR
    heroImgState.camera.updateProjectionMatrix()

    heroImgState.heroImgEventTarget.aspectRatioChange(
      heroImgState.camera.aspect
    )

    this.renderer.setSize(renderWidth, renderHeight)
    this.renderer.setPixelRatio(this._devicePixelRatio)

    this.composer.setSize(renderWidth, renderHeight)

    this.fxaaPass.material.uniforms['resolution'].value.x =
      1 / (renderWidth * this._devicePixelRatio)
    this.fxaaPass.material.uniforms['resolution'].value.y =
      1 / (renderHeight * this._devicePixelRatio)

    this.render()
  }

  render = (): void => {
    // this.renderer.render(heroImgState.scene, heroImgState.camera)
    this.composer.render()
  }

  animate = (): void => {
    this.render()
    this.requestAnimationFrameId = requestAnimationFrame(() => {
      this.animate()
    })
  }

  stopAnimate(): void {
    this.requestAnimationFrameId !== null &&
      cancelAnimationFrame(this.requestAnimationFrameId)
  }
}

export default WebGLBlock
