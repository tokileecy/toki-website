import React, { createRef } from 'react'
import ReactDom from 'react-dom'
import * as THREE from 'three'
import { CSS3DSprite } from 'three/examples/jsm/renderers/CSS3DRenderer.js'
import PageLayer, { PageLayerParent } from '../PageLayer'
import SkillBox, { SkillBoxRefContent } from './SkillBox'
import { ratio } from '../utils'

class HomeLayer extends PageLayer {
  speed: number
  skillBoxObj: CSS3DSprite
  originSkillBox: THREE.Vector3
  skillBoxRef: React.RefObject<SkillBoxRefContent>

  constructor(parent?: PageLayerParent) {
    super(parent)
    this.speed = 8
    this.skillBoxObj = new CSS3DSprite(document.createElement('div'))
    this.skillBoxRef = createRef()

    this.originSkillBox = new THREE.Vector3(800, 200, 0)
  }

  init = (): void => {
    const skillBoxContainer = document.createElement('div')
    ReactDom.render(
      React.createElement(SkillBox, {
        ref: this.skillBoxRef,
      }),
      skillBoxContainer
    )

    this.skillBoxObj = new CSS3DSprite(skillBoxContainer)
    this.skillBoxObj.position.set(
      this.originSkillBox.x,
      this.originSkillBox.y,
      this.originSkillBox.z
    )
    this.skillBoxObj.scale.set(ratio, ratio, ratio)

    this.group.add(this.skillBoxObj)
  }

  getDuration = (fromPos: THREE.Vector3, toPos: THREE.Vector3): number => {
    const distance = fromPos.distanceTo(toPos)
    return distance / this.speed
  }

  inAnimation = (): void => {
    this.skillBoxRef.current?.animate()
  }

  // outAnimation = (): void => {
  //   this.skillBoxRef.current?
  // }
}

export default HomeLayer
