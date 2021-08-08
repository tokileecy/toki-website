import * as THREE from 'three'
import PageLayer, { PageLayerParent } from '../PageLayer'
import WorkBlockBox from './WorkBlockBox'
import RecentlyBox from './RecentlyBox'
import TWEEN from '@tweenjs/tween.js'
import { ReactCSSObjectWrapper } from '../utils'

class WorkLayer extends PageLayer {
  speed: number
  workFormBox: ReactCSSObjectWrapper<unknown>
  recentlyBox: ReactCSSObjectWrapper<unknown>
  originWorkBoxPos: THREE.Vector3
  outWorkBoxPos: THREE.Vector3
  originRecentlyBoxPos: THREE.Vector3
  outRecentlyBoxPos: THREE.Vector3

  constructor(parent?: PageLayerParent) {
    super(parent)
    this.speed = 8
    this.workFormBox = new ReactCSSObjectWrapper(WorkBlockBox)
    this.recentlyBox = new ReactCSSObjectWrapper(RecentlyBox)
    this.originWorkBoxPos = new THREE.Vector3(800, 0, 0)
    this.outWorkBoxPos = new THREE.Vector3(3000, 0, 0)
    this.originRecentlyBoxPos = new THREE.Vector3(-1100, -100, 0)
    this.outRecentlyBoxPos = new THREE.Vector3(-3000, -100, 0)
  }

  init = (isInitPage?: boolean): void => {
    if (isInitPage) {
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

  outAnimation = (): void => {
    const workBoxCurrentPos = this.workFormBox.object.position.clone()
    const workBoxDestinationPos = this.outWorkBoxPos.clone()

    const workBoxDuration = this.getDuration(
      workBoxCurrentPos,
      workBoxDestinationPos
    )

    new TWEEN.Tween(this.workFormBox.object.position)
      .to(workBoxDestinationPos, workBoxDuration)
      .easing(TWEEN.Easing.Quadratic.Out)
      .start()

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
  }

  inAnimation = (): void => {
    const workBoxCurrentPos = this.workFormBox.object.position.clone()
    const workBoxDestinationPos = this.originWorkBoxPos.clone()
    const workBoxDuration = this.getDuration(
      workBoxCurrentPos,
      workBoxDestinationPos
    )

    new TWEEN.Tween(this.workFormBox.object.position)
      .to(workBoxDestinationPos, workBoxDuration)
      .easing(TWEEN.Easing.Quadratic.Out)
      .start()

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
  }
}

export default WorkLayer
