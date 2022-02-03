import ThreeManager from '@psycholog-studio/ui/ThreeGraphic/core/ThreeManager'
import LayerController from '@psycholog-studio/ui/ThreeGraphic/core/ThreeManager/LayerController'
import TWEEN from '@tweenjs/tween.js'
import scene from './scene'
import scene1 from './scene/scene1'

export const layerController = new LayerController({
  isAutoSize: true,
})

layerController.renderer.domElement.addEventListener('wheel', (e) => {
  e.preventDefault()
})

const context = layerController.renderer.getContext()
if (context !== null && context !== undefined) {
  context.getExtension('OES_standard_derivatives')
}
layerController.renderer.extensions.get('EXT_color_buffer_float')
layerController.renderer.setClearColor(0xffffff, 0)

export const threeManager = new ThreeManager({ layerController })

const FOV = 45
const NEAR = 10
const FAR = 2000

threeManager.layerController.camera.position.z = 1000
threeManager.layerController.camera.fov = FOV
threeManager.layerController.camera.near = NEAR
threeManager.layerController.camera.far = FAR

threeManager.layerController.setScene(scene1)

threeManager.layerController.addEventListener('frame-changed', (e) => {
  if (e.detail?.time) {
    TWEEN.update(e.detail.time)
  }
})
