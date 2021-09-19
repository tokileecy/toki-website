import * as THREE from 'three'
import PageLayer, { PageLayerParent } from '../PageLayer'
import WorkBlockBox, { WorkBlockBoxProps } from './WorkBlockBox'
import DescriptionBox, { DescriptionProps } from './DescriptionBox'
import TWEEN, { Tween } from '@tweenjs/tween.js'
import { ReactCSSObjectWrapper } from '../utils'
import { makeAutoObservable, observable, autorun, action } from 'mobx'
import heroImgState, { AspectRatioEventDetail } from '../../HeroImgState'

class ContactAnimationState {
  workFormBoxFinished: boolean
  descriptionBoxFinished: boolean
  selectIndex: number

  constructor() {
    this.workFormBoxFinished = false
    this.descriptionBoxFinished = false
    this.selectIndex = 0

    makeAutoObservable(this, {
      selectIndex: observable,
      workFormBoxFinished: observable,
      descriptionBoxFinished: observable,
      workFormBoxComplete: action,
      descriptionBoxComplete: action,
    })
  }

  setSelectIndex = (value: number): void => {
    this.selectIndex = value
  }

  workFormBoxComplete = (): void => {
    this.workFormBoxFinished = true
  }

  descriptionBoxComplete = (): void => {
    this.descriptionBoxFinished = true
  }
}

const works = [
  {
    name: 'blog',
    title: 'Blog',
    imgSrc: '/blog.png',
  },
  {
    name: 'tokisite',
    title: 'TokiSite',
    imgSrc: '/tokisite.png',
  },
]

class WorkLayer extends PageLayer {
  state: 'in' | 'out'
  workLayerState: ContactAnimationState
  onComplete?: () => void
  animations?: Tween<THREE.Vector3>[]
  speed: number
  workFormBox: ReactCSSObjectWrapper<WorkBlockBoxProps, null>
  descriptionBox: ReactCSSObjectWrapper<DescriptionProps, null>
  originWorkBoxPos: THREE.Vector3
  outWorkBoxPos: THREE.Vector3
  originDescriptionBoxPos: THREE.Vector3
  outDescriptionBoxPos: THREE.Vector3

  constructor(parent?: PageLayerParent) {
    super(parent)
    this.state = 'in'
    this.speed = 2
    this.workFormBox = new ReactCSSObjectWrapper<WorkBlockBoxProps, null>(
      WorkBlockBox,
      {
        works,
      }
    )
    this.descriptionBox = new ReactCSSObjectWrapper<DescriptionProps, null>(
      DescriptionBox
    )
    this.originWorkBoxPos = new THREE.Vector3(-400, 0, 0)
    this.originDescriptionBoxPos = new THREE.Vector3(400, -0, 0)
    this.outWorkBoxPos = new THREE.Vector3(1000, 0, 0)
    this.outDescriptionBoxPos = new THREE.Vector3(-1000, -0, 0)

    this.animations = []
    this.onComplete = undefined
    this.workLayerState = new ContactAnimationState()

    this.resetOriginPosition()

    heroImgState.heroImgEventTarget.addEventListener('resize-hero-img', () => {
      this.resetOriginPosition()
    })

    heroImgState.heroImgEventTarget.addEventListener(
      'aspect-ratio-change',
      (e) => {
        this.resetOriginPosition(e.detail)
        this.resetPosition()
      }
    )

    autorun(() => {
      if (
        this.workLayerState.workFormBoxFinished &&
        this.workLayerState.descriptionBoxFinished
      ) {
        this.onComplete?.()
      }
    })
  }

  resetOriginPosition = (detail?: AspectRatioEventDetail): void => {
    if (detail === undefined) {
      return
    }

    if (detail.value > 0) {
      this.originDescriptionBoxPos.set(0, 200, 0)
      this.originWorkBoxPos.set(0, -70, 0)
      this.outWorkBoxPos = new THREE.Vector3(1100, 200, 0)
      this.outDescriptionBoxPos = new THREE.Vector3(-1100, -70, 0)
    }

    if (detail.value > 1.4) {
      this.originDescriptionBoxPos.set(-300, 0, 0)
      this.originWorkBoxPos.set(300, 0, 0)
      this.outWorkBoxPos = new THREE.Vector3(1000, 0, 0)
      this.outDescriptionBoxPos = new THREE.Vector3(-1000, 0, 0)
    }

    if (detail.value > 1.8) {
      this.originDescriptionBoxPos = new THREE.Vector3(-400, 0, 0)
      this.originWorkBoxPos = new THREE.Vector3(400, -0, 0)
      this.outWorkBoxPos = new THREE.Vector3(1100, 0, 0)
      this.outDescriptionBoxPos = new THREE.Vector3(-1100, -0, 0)
    }
  }

  resetPosition = (): void => {
    if (this.state === 'out') {
      this.workFormBox.object.position.set(
        this.outWorkBoxPos.x,
        this.outWorkBoxPos.y,
        this.outWorkBoxPos.z
      )
      this.descriptionBox.object.position.set(
        this.outDescriptionBoxPos.x,
        this.outDescriptionBoxPos.y,
        this.outDescriptionBoxPos.z
      )
    } else {
      this.workFormBox.object.position.set(
        this.originWorkBoxPos.x,
        this.originWorkBoxPos.y,
        this.originWorkBoxPos.z
      )
      this.descriptionBox.object.position.set(
        this.originDescriptionBoxPos.x,
        this.originDescriptionBoxPos.y,
        this.originDescriptionBoxPos.z
      )
    }
  }

  clearAnimations = (): void => {
    this.animations?.forEach((animation) => {
      TWEEN.remove(animation)
    })
  }

  init = (isInitPage?: boolean): void => {
    if (isInitPage) {
      this.state = 'in'
    } else {
      this.state = 'out'
    }
    this.group.add(this.workFormBox.object)
    this.group.add(this.descriptionBox.object)
  }

  getDuration = (fromPos: THREE.Vector3, toPos: THREE.Vector3): number => {
    const distance = fromPos.distanceTo(toPos)
    return distance / this.speed
  }

  outAnimation = (onComplete?: () => void): void => {
    this.state = 'out'
    this.onComplete = onComplete
    this.clearAnimations()

    const workBoxCurrentPos = this.workFormBox.object.position.clone()
    const workBoxDestinationPos = this.outWorkBoxPos.clone()

    const workBoxDuration = this.getDuration(
      workBoxCurrentPos,
      workBoxDestinationPos
    )

    this.workFormBox.object.rotateX(Math.PI / 4)
    new TWEEN.Tween(this.workFormBox.object.position)
      .to(workBoxDestinationPos, workBoxDuration)
      .easing(TWEEN.Easing.Quadratic.Out)
      .start()
      .onComplete(() => {
        this.workLayerState.workFormBoxComplete()
      })

    const descriptionBoxCurrentPos = this.descriptionBox.object.position.clone()
    const descriptionBoxDestinationPos = this.outDescriptionBoxPos.clone()

    const descriptionBoxDuration = this.getDuration(
      descriptionBoxCurrentPos,
      descriptionBoxDestinationPos
    )

    new TWEEN.Tween(this.descriptionBox.object.position)
      .to(descriptionBoxDestinationPos, descriptionBoxDuration)
      .easing(TWEEN.Easing.Quadratic.Out)
      .start()
      .onComplete(() => {
        this.workLayerState.descriptionBoxComplete()
      })
  }

  inAnimation = (onComplete?: () => void): void => {
    this.state = 'in'
    this.onComplete = onComplete
    this.clearAnimations()

    const workBoxCurrentPos = this.workFormBox.object.position.clone()
    const workBoxDestinationPos = this.originWorkBoxPos.clone()
    const workBoxDuration = this.getDuration(
      workBoxCurrentPos,
      workBoxDestinationPos
    )

    this.workFormBox.object.rotateX(Math.PI / 4)
    new TWEEN.Tween(this.workFormBox.object.position)
      .to(workBoxDestinationPos, workBoxDuration)
      .easing(TWEEN.Easing.Quadratic.Out)
      .start()
      .onComplete(() => {
        this.workLayerState.workFormBoxComplete()
      })

    const descriptionBoxCurrentPos = this.descriptionBox.object.position.clone()
    const descriptionBoxDestinationPos = this.originDescriptionBoxPos.clone()

    const descriptionBoxDuration = this.getDuration(
      descriptionBoxCurrentPos,
      descriptionBoxDestinationPos
    )

    new TWEEN.Tween(this.descriptionBox.object.position)
      .to(descriptionBoxDestinationPos, descriptionBoxDuration)
      .easing(TWEEN.Easing.Quadratic.Out)
      .start()
      .onComplete(() => {
        this.workLayerState.descriptionBoxComplete()
      })
  }
}

export default WorkLayer
