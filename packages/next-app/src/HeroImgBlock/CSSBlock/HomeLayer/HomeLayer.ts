import * as THREE from 'three'
import PageLayer, { PageLayerParent } from '../PageLayer'
import Div1 from './Div1'
import Div2 from './Div2'
import SpriteBox from './SpriteBox'
import TWEEN from '@tweenjs/tween.js'
import { ReactCSSObjectWrapper } from '../utils'

class HomeLayer extends PageLayer {
  speed: number
  div1: ReactCSSObjectWrapper<unknown>
  div2: ReactCSSObjectWrapper<unknown>
  spriteBox: ReactCSSObjectWrapper<unknown>
  originDiv1Pos: THREE.Vector3
  originDiv2Pos: THREE.Vector3
  outDiv1Pos: THREE.Vector3
  outDiv2Pos: THREE.Vector3
  originSpriteBoxPos: THREE.Vector3
  outSpriteBoxPos: THREE.Vector3

  constructor(parent?: PageLayerParent) {
    super(parent)
    this.speed = 8
    this.div1 = new ReactCSSObjectWrapper(Div1)
    this.div2 = new ReactCSSObjectWrapper(Div2)
    this.spriteBox = new ReactCSSObjectWrapper(SpriteBox)
    this.originDiv1Pos = new THREE.Vector3(-1000, 500, 0)
    this.outDiv1Pos = new THREE.Vector3(-3000, 500, 0)
    this.originDiv2Pos = new THREE.Vector3(1000, -500, 0)
    this.outDiv2Pos = new THREE.Vector3(3000, -500, 0)
    this.originSpriteBoxPos = new THREE.Vector3(1000, -500, 0)
    this.outSpriteBoxPos = new THREE.Vector3(3000, -500, 0)
  }

  init = (isInitPage?: boolean): void => {
    if (isInitPage) {
      this.div1.object.position.set(
        this.originDiv1Pos.x,
        this.originDiv1Pos.y,
        this.originDiv1Pos.z
      )

      this.div2.object.position.set(
        this.originDiv2Pos.x,
        this.originDiv2Pos.y,
        this.originDiv2Pos.z
      )

      this.spriteBox.object.position.set(
        this.originSpriteBoxPos.x,
        this.originSpriteBoxPos.y,
        this.originSpriteBoxPos.z
      )
    } else {
      this.div1.object.position.set(
        this.outDiv1Pos.x,
        this.outDiv1Pos.y,
        this.outDiv1Pos.z
      )

      this.div2.object.position.set(
        this.outDiv2Pos.x,
        this.outDiv2Pos.y,
        this.outDiv2Pos.z
      )

      this.spriteBox.object.position.set(
        this.outSpriteBoxPos.x,
        this.outSpriteBoxPos.y,
        this.outSpriteBoxPos.z
      )
    }
    this.group.add(this.div1.object)
    this.group.add(this.div2.object)
    this.group.add(this.spriteBox.object)
  }

  getDuration = (fromPos: THREE.Vector3, toPos: THREE.Vector3): number => {
    const distance = fromPos.distanceTo(toPos)
    return distance / this.speed
  }

  outAnimation = (): void => {
    const div1CurrentPos = this.div1.object.position.clone()
    const div1DestinationPos = this.outDiv1Pos.clone()

    const div1Duration = this.getDuration(div1CurrentPos, div1DestinationPos)

    new TWEEN.Tween(this.div1.object.position)
      .to(div1DestinationPos, div1Duration)
      .easing(TWEEN.Easing.Quadratic.Out)
      .start()

    const div2CurrentPos = this.div2.object.position.clone()
    const div2DestinationPos = this.outDiv2Pos.clone()

    const div2Duration = this.getDuration(div2CurrentPos, div2DestinationPos)

    new TWEEN.Tween(this.div2.object.position)
      .to(div2DestinationPos, div2Duration)
      .easing(TWEEN.Easing.Quadratic.Out)
      .start()

    const spriteBoxCurrentPos = this.spriteBox.object.position.clone()
    const spriteBoxDestinationPos = this.outSpriteBoxPos.clone()

    const spriteBoxDuration = this.getDuration(
      spriteBoxCurrentPos,
      spriteBoxDestinationPos
    )

    new TWEEN.Tween(this.spriteBox.object.position)
      .to(spriteBoxDestinationPos, spriteBoxDuration)
      .easing(TWEEN.Easing.Quadratic.Out)
      .start()
  }

  inAnimation = (): void => {
    const div1CurrentPos = this.div1.object.position.clone()
    const div1DestinationPos = this.originDiv1Pos.clone()
    const div1Duration = this.getDuration(div1CurrentPos, div1DestinationPos)

    new TWEEN.Tween(this.div1.object.position)
      .to(div1DestinationPos, div1Duration)
      .easing(TWEEN.Easing.Quadratic.Out)
      .start()

    const div2CurrentPos = this.div2.object.position.clone()
    const div2DestinationPos = this.originDiv2Pos.clone()

    const div2Duration = this.getDuration(div2CurrentPos, div2DestinationPos)

    new TWEEN.Tween(this.div2.object.position)
      .to(div2DestinationPos, div2Duration)
      .easing(TWEEN.Easing.Quadratic.Out)
      .start()

    const spriteBoxCurrentPos = this.spriteBox.object.position.clone()
    const spriteBoxDestinationPos = this.originSpriteBoxPos.clone()

    const spriteBoxDuration = this.getDuration(
      spriteBoxCurrentPos,
      spriteBoxDestinationPos
    )

    new TWEEN.Tween(this.spriteBox.object.position)
      .to(spriteBoxDestinationPos, spriteBoxDuration)
      .easing(TWEEN.Easing.Quadratic.Out)
      .start()
  }
}

export default HomeLayer
