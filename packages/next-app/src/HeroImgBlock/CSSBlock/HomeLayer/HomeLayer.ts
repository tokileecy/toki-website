import React from 'react'
import ReactDom from 'react-dom'
import * as THREE from 'three'
import { CSS3DSprite } from 'three/examples/jsm/renderers/CSS3DRenderer.js'
import PageLayer, { PageLayerParent } from '../PageLayer'
import Div1 from './Div1'
import Div2 from './Div2'
import TWEEN from '@tweenjs/tween.js'
import { ratio } from '../utils'

class HomeLayer extends PageLayer {
  speed: number
  div1Obj: CSS3DSprite
  div2Obj: CSS3DSprite
  originDiv1Pos: THREE.Vector3
  originDiv2Pos: THREE.Vector3

  constructor(parent?: PageLayerParent) {
    super(parent)
    this.speed = 8
    this.div1Obj = new CSS3DSprite(document.createElement('div'))
    this.div2Obj = new CSS3DSprite(document.createElement('div'))
    this.originDiv1Pos = new THREE.Vector3(-1000, 500, 0)
    this.originDiv2Pos = new THREE.Vector3(1000, -500, 0)
  }

  init = (): void => {
    const div1Container = document.createElement('div')
    ReactDom.render(React.createElement(Div1), div1Container)
    this.div1Obj = new CSS3DSprite(div1Container)
    this.div1Obj.position.set(
      this.originDiv1Pos.x,
      this.originDiv1Pos.y,
      this.originDiv1Pos.z
    )
    this.div1Obj.scale.set(ratio, ratio, ratio)
    this.group.add(this.div1Obj)

    const div2Container = document.createElement('div')
    ReactDom.render(React.createElement(Div2), div2Container)

    this.div2Obj = new CSS3DSprite(div2Container)
    this.div2Obj.position.set(
      this.originDiv2Pos.x,
      this.originDiv2Pos.y,
      this.originDiv2Pos.z
    )
    this.div2Obj.scale.set(ratio, ratio, ratio)
    this.group.add(this.div2Obj)
  }

  getDuration = (fromPos: THREE.Vector3, toPos: THREE.Vector3): number => {
    const distance = fromPos.distanceTo(toPos)
    return distance / this.speed
  }

  outAnimation = (): void => {
    const div1CurrentPos = this.div1Obj.position.clone()
    const div1DestinationPos = div1CurrentPos.clone()
    div1DestinationPos.x = -3000
    const div1Duration = this.getDuration(div1CurrentPos, div1DestinationPos)

    new TWEEN.Tween(this.div1Obj.position)
      .to(div1DestinationPos, div1Duration)
      .easing(TWEEN.Easing.Quadratic.Out)
      .start()

    const div2CurrentPos = this.div2Obj.position.clone()
    const div2DestinationPos = div2CurrentPos.clone()
    div2DestinationPos.x = 3000
    const div2Duration = this.getDuration(div2CurrentPos, div2DestinationPos)

    new TWEEN.Tween(this.div2Obj.position)
      .to(div2DestinationPos, div2Duration)
      .easing(TWEEN.Easing.Quadratic.Out)
      .start()
  }

  inAnimation = (): void => {
    const div1CurrentPos = this.div1Obj.position.clone()
    const div1DestinationPos = this.originDiv1Pos.clone()
    const div1Duration = this.getDuration(div1CurrentPos, div1DestinationPos)

    new TWEEN.Tween(this.div1Obj.position)
      .to(div1DestinationPos, div1Duration)
      .easing(TWEEN.Easing.Quadratic.Out)
      .start()

    const div2CurrentPos = this.div2Obj.position.clone()
    const div2DestinationPos = this.originDiv2Pos.clone()

    const div2Duration = this.getDuration(div2CurrentPos, div2DestinationPos)

    new TWEEN.Tween(this.div2Obj.position)
      .to(div2DestinationPos, div2Duration)
      .easing(TWEEN.Easing.Quadratic.Out)
      .start()
  }
}

export default HomeLayer
