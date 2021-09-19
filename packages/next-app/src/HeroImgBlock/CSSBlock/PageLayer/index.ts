import * as THREE from 'three'

export type PageLayerParent = THREE.Object3D | THREE.Group

class PageLayer {
  parent?: THREE.Object3D
  group: THREE.Group
  init?: (isInitPage?: boolean) => void
  outAnimation?: (onComplete?: () => void) => void
  inAnimation?: (onComplete?: () => void) => void

  constructor(parent?: PageLayerParent) {
    this.parent = parent
    this.group = new THREE.Group()
    this.parent?.add(this.group)
  }
}

export default PageLayer
