import * as THREE from 'three'
import PageLayer, { PageLayerParent } from '../PageLayer'
import WorkBlockBox from './WorkBlockBox'
import RecentlyBox from './RecentlyBox'
import TWEEN, { Tween } from '@tweenjs/tween.js'
import { ReactCSSObjectWrapper } from '../utils'
import { makeAutoObservable, observable, autorun, action } from 'mobx'

class ContactAnimationState {
  workFormBoxFinished: boolean
  recentlyBoxFinished: boolean

  constructor() {
    this.workFormBoxFinished = false
    this.recentlyBoxFinished = false

    makeAutoObservable(this, {
      workFormBoxFinished: observable,
      recentlyBoxFinished: observable,
      workFormBoxComplete: action,
      recentlyBoxComplete: action,
    })
  }

  workFormBoxComplete = (): void => {
    this.workFormBoxFinished = true
  }

  recentlyBoxComplete = (): void => {
    this.recentlyBoxFinished = true
  }
}

class WorkLayer extends PageLayer {
  animationState: ContactAnimationState
  onComplete?: () => void
  animations?: Tween<THREE.Vector3>[]
  speed: number
  workFormBox: ReactCSSObjectWrapper<unknown>
  recentlyBox: ReactCSSObjectWrapper<unknown>
  originWorkBoxPos: THREE.Vector3
  outWorkBoxPos: THREE.Vector3
  originRecentlyBoxPos: THREE.Vector3
  outRecentlyBoxPos: THREE.Vector3

  constructor(parent?: PageLayerParent) {
    super(parent)
    this.speed = 2
    this.workFormBox = new ReactCSSObjectWrapper(WorkBlockBox)
    this.recentlyBox = new ReactCSSObjectWrapper(RecentlyBox)
    this.originWorkBoxPos = new THREE.Vector3(400, 0, 0)
    this.originRecentlyBoxPos = new THREE.Vector3(-400, -50, 0)
    this.outWorkBoxPos = new THREE.Vector3(1000, 0, 0)
    this.outRecentlyBoxPos = new THREE.Vector3(-1000, -50, 0)

    this.animations = []
    this.onComplete = undefined
    this.animationState = new ContactAnimationState()

    autorun(() => {
      if (
        this.animationState.workFormBoxFinished &&
        this.animationState.recentlyBoxFinished
      ) {
        this.onComplete?.()
      }
    })
  }

  clearAnimations = (): void => {
    this.animations?.forEach((animation) => {
      TWEEN.remove(animation)
    })
  }

  init = (isInitPage?: boolean): void => {
    if (isInitPage) {
      this.workFormBox.object.rotateX(Math.PI / 4)
      this.workFormBox.object.position.set(
        this.originWorkBoxPos.x,
        this.originWorkBoxPos.y,
        this.originWorkBoxPos.z
      )
      this.recentlyBox.object.position.set(
        this.originRecentlyBoxPos.x,
        this.originRecentlyBoxPos.y,
        this.originRecentlyBoxPos.z
      )
    } else {
      this.workFormBox.object.rotateX(Math.PI / 4)
      this.workFormBox.object.position.set(
        this.outWorkBoxPos.x,
        this.outWorkBoxPos.y,
        this.outWorkBoxPos.z
      )
      this.recentlyBox.object.position.set(
        this.outRecentlyBoxPos.x,
        this.outRecentlyBoxPos.y,
        this.outRecentlyBoxPos.z
      )
    }
    this.group.add(this.workFormBox.object)
    this.group.add(this.recentlyBox.object)
  }

  getDuration = (fromPos: THREE.Vector3, toPos: THREE.Vector3): number => {
    const distance = fromPos.distanceTo(toPos)
    return distance / this.speed
  }

  outAnimation = (onComplete?: () => void): void => {
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
        this.animationState.workFormBoxComplete()
      })

    const recentlyBoxCurrentPos = this.recentlyBox.object.position.clone()
    const recentlyBoxDestinationPos = this.outRecentlyBoxPos.clone()

    const recentlyBoxDuration = this.getDuration(
      recentlyBoxCurrentPos,
      recentlyBoxDestinationPos
    )

    new TWEEN.Tween(this.recentlyBox.object.position)
      .to(recentlyBoxDestinationPos, recentlyBoxDuration)
      .easing(TWEEN.Easing.Quadratic.Out)
      .start()
      .onComplete(() => {
        this.animationState.recentlyBoxComplete()
      })
  }

  inAnimation = (onComplete?: () => void): void => {
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
        this.animationState.workFormBoxComplete()
      })

    const recentlyBoxCurrentPos = this.recentlyBox.object.position.clone()
    const recentlyBoxDestinationPos = this.originRecentlyBoxPos.clone()

    const recentlyBoxDuration = this.getDuration(
      recentlyBoxCurrentPos,
      recentlyBoxDestinationPos
    )

    new TWEEN.Tween(this.recentlyBox.object.position)
      .to(recentlyBoxDestinationPos, recentlyBoxDuration)
      .easing(TWEEN.Easing.Quadratic.Out)
      .start()
      .onComplete(() => {
        this.animationState.recentlyBoxComplete()
      })
  }
}

export default WorkLayer
