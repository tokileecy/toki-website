import * as THREE from 'three'
import PageLayer, { PageLayerParent } from '../PageLayer'
import Div1 from './Div1'
import Div2 from './Div2'
import SpriteBox from './SpriteBox'
import TWEEN, { Tween } from '@tweenjs/tween.js'
import { ReactCSSObjectWrapper } from '../utils'
import { makeAutoObservable, observable, autorun, action } from 'mobx'
import heroImgState, { AspectRatioEventDetail } from '../../HeroImgState'

class HomeAnimationState {
  div1Finished: boolean
  div2Finished: boolean
  spriteFinished: boolean

  constructor() {
    this.div1Finished = false
    this.div2Finished = false
    this.spriteFinished = false

    makeAutoObservable(this, {
      div1Finished: observable,
      div2Finished: observable,
      spriteFinished: observable,
      div1Complete: action,
      div2Complete: action,
      spriteComplete: action,
    })
  }

  div1Complete = (): void => {
    this.div1Finished = true
  }

  div2Complete = (): void => {
    this.div2Finished = true
  }

  spriteComplete = (): void => {
    this.spriteFinished = true
  }
}

class HomeLayer extends PageLayer {
  animationState: HomeAnimationState
  onComplete?: () => void
  animations?: Tween<THREE.Vector3>[]
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
    this.speed = 2
    this.div1 = new ReactCSSObjectWrapper(Div1)
    this.div2 = new ReactCSSObjectWrapper(Div2)
    this.spriteBox = new ReactCSSObjectWrapper(SpriteBox)
    this.originDiv1Pos = new THREE.Vector3(-400, 200, 0)
    this.originDiv2Pos = new THREE.Vector3(400, -200, 0)
    this.originSpriteBoxPos = new THREE.Vector3(-400, -150, 0)
    this.outDiv1Pos = new THREE.Vector3(-1100, 50, 0)
    this.outDiv2Pos = new THREE.Vector3(1100, -50, 0)
    this.outSpriteBoxPos = new THREE.Vector3(-1100, -30, 0)

    this.animations = []
    this.onComplete = undefined
    this.animationState = new HomeAnimationState()

    this.resetPosition()

    heroImgState.heroImgEventTarget.addEventListener('resize-hero-img', () => {
      this.resetPosition()
    })

    heroImgState.heroImgEventTarget.addEventListener(
      'aspect-ratio-change',
      (e) => {
        this.resetPosition(e.detail)
      }
    )

    autorun(() => {
      if (
        this.animationState.div1Finished &&
        this.animationState.div2Finished &&
        this.animationState.spriteFinished
      ) {
        this.onComplete?.()
      }
    })
  }

  resetPosition = (detail?: AspectRatioEventDetail): void => {
    if (detail === undefined) {
      return
    }

    if (detail.value > 0) {
      this.div1.object.position.set(0, 200, 0)
    }

    if (detail.value > 1) {
      this.div1.object.position.set(-250, 200, 0)
    }

    if (detail.value > 1.4) {
      this.div1.object.position.set(-400, 200, 0)
    }

    if (detail.value > 1.8) {
      this.div1.object.position.set(-550, 200, 0)
    }
  }

  clearAnimations = (): void => {
    this.animations?.forEach((animation) => {
      TWEEN.remove(animation)
    })
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

  outAnimation = (onComplete?: () => void): void => {
    this.onComplete = onComplete
    this.clearAnimations()
    const div1CurrentPos = this.div1.object.position.clone()
    const div1DestinationPos = this.outDiv1Pos.clone()

    const div1Duration = this.getDuration(div1CurrentPos, div1DestinationPos)

    new TWEEN.Tween(this.div1.object.position)
      .to(div1DestinationPos, div1Duration)
      .easing(TWEEN.Easing.Quadratic.Out)
      .start()
      .onComplete(() => {
        this.animationState.div1Complete()
      })

    const div2CurrentPos = this.div2.object.position.clone()
    const div2DestinationPos = this.outDiv2Pos.clone()

    const div2Duration = this.getDuration(div2CurrentPos, div2DestinationPos)

    new TWEEN.Tween(this.div2.object.position)
      .to(div2DestinationPos, div2Duration)
      .easing(TWEEN.Easing.Quadratic.Out)
      .start()
      .onComplete(() => {
        this.animationState.div2Complete()
      })

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
      .onComplete(() => {
        this.animationState.spriteComplete()
      })
  }

  inAnimation = (onComplete?: () => void): void => {
    this.onComplete = onComplete
    this.clearAnimations()
    const div1CurrentPos = this.div1.object.position.clone()
    const div1DestinationPos = this.originDiv1Pos.clone()
    const div1Duration = this.getDuration(div1CurrentPos, div1DestinationPos)

    new TWEEN.Tween(this.div1.object.position)
      .to(div1DestinationPos, div1Duration)
      .easing(TWEEN.Easing.Quadratic.Out)
      .start()
      .onComplete(() => {
        this.animationState.div1Complete()
      })

    const div2CurrentPos = this.div2.object.position.clone()
    const div2DestinationPos = this.originDiv2Pos.clone()

    const div2Duration = this.getDuration(div2CurrentPos, div2DestinationPos)

    new TWEEN.Tween(this.div2.object.position)
      .to(div2DestinationPos, div2Duration)
      .easing(TWEEN.Easing.Quadratic.Out)
      .start()
      .onComplete(() => {
        this.animationState.div2Complete()
      })

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
      .onComplete(() => {
        this.animationState.spriteComplete()
      })
  }
}

export default HomeLayer
