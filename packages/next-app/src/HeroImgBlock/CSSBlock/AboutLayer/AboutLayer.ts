import * as THREE from 'three'
import PageLayer, { PageLayerParent } from '../PageLayer'
import SkillBox, { SkillBoxRefContent } from './SkillBox'
import LeadRoleBox from './LeadRoleBox'
import RecentlyBox from './RecentlyBox'
import { ReactCSSObjectWrapper } from '../utils'
import TWEEN, { Tween } from '@tweenjs/tween.js'
import { makeAutoObservable, observable, autorun, action } from 'mobx'

class AboutAnimationState {
  leadRolFinished: boolean
  recentlyBoxFinished: boolean
  constructor() {
    this.leadRolFinished = false
    this.recentlyBoxFinished = false

    makeAutoObservable(this, {
      leadRolFinished: observable,
      recentlyBoxFinished: observable,
      leadRolComplete: action,
      recentlyBoxComplete: action,
    })
  }

  leadRolComplete = (): void => {
    this.leadRolFinished = true
  }

  recentlyBoxComplete = (): void => {
    this.recentlyBoxFinished = true
  }
}
class AboutLayer extends PageLayer {
  animationState: AboutAnimationState
  onComplete?: () => void
  animations?: Tween<THREE.Vector3>[]
  speed: number
  skillBox: ReactCSSObjectWrapper<SkillBoxRefContent>
  leadRoleBox: ReactCSSObjectWrapper<unknown>
  recentlyBox: ReactCSSObjectWrapper<unknown>
  originSkillBox: THREE.Vector3
  outOriginSkillBox: THREE.Vector3
  originLeadRolBoxPos: THREE.Vector3
  outLeadRolBoxPos: THREE.Vector3
  originRecentlyBoxPos: THREE.Vector3
  outRecentlyBoxPos: THREE.Vector3

  constructor(parent?: PageLayerParent) {
    super(parent)
    this.speed = 2
    this.skillBox = new ReactCSSObjectWrapper<SkillBoxRefContent>(SkillBox)
    this.leadRoleBox = new ReactCSSObjectWrapper(LeadRoleBox)
    this.recentlyBox = new ReactCSSObjectWrapper(RecentlyBox)

    this.originSkillBox = new THREE.Vector3(400, 50, 0)
    this.originLeadRolBoxPos = new THREE.Vector3(-500, 200, 0)
    this.originRecentlyBoxPos = new THREE.Vector3(-500, -100, 0)
    this.outOriginSkillBox = new THREE.Vector3(1100, 200, 0)
    this.outLeadRolBoxPos = new THREE.Vector3(-1100, 700, 0)
    this.outRecentlyBoxPos = new THREE.Vector3(-1100, -100, 0)

    this.animations = []
    this.onComplete = undefined
    this.animationState = new AboutAnimationState()

    autorun(() => {
      if (
        // this.animationState.skillFinished &&
        this.animationState.leadRolFinished &&
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
      this.skillBox.object.position.set(
        this.originSkillBox.x,
        this.originSkillBox.y,
        this.originSkillBox.z
      )
      this.skillBox.actionRef.current?.animate()
      this.leadRoleBox.object.position.set(
        this.originLeadRolBoxPos.x,
        this.originLeadRolBoxPos.y,
        this.originLeadRolBoxPos.z
      )
      this.recentlyBox.object.position.set(
        this.originRecentlyBoxPos.x,
        this.originRecentlyBoxPos.y,
        this.originRecentlyBoxPos.z
      )
    } else {
      this.skillBox.object.position.set(
        this.outOriginSkillBox.x,
        this.outOriginSkillBox.y,
        this.outOriginSkillBox.z
      )
      this.leadRoleBox.object.position.set(
        this.outLeadRolBoxPos.x,
        this.outLeadRolBoxPos.y,
        this.outLeadRolBoxPos.z
      )
      this.recentlyBox.object.position.set(
        this.outRecentlyBoxPos.x,
        this.outRecentlyBoxPos.y,
        this.outRecentlyBoxPos.z
      )
    }
    this.group.add(this.skillBox.object)
    this.group.add(this.leadRoleBox.object)
    this.group.add(this.recentlyBox.object)
  }

  getDuration = (fromPos: THREE.Vector3, toPos: THREE.Vector3): number => {
    const distance = fromPos.distanceTo(toPos)
    return distance / this.speed
  }

  inAnimation = (onComplete?: () => void): void => {
    this.onComplete = onComplete
    this.clearAnimations()

    this.skillBox.object.position.set(
      this.originSkillBox.x,
      this.originSkillBox.y,
      this.originSkillBox.z
    )
    this.skillBox.actionRef.current?.animate()

    const leadRoleBoxCurrentPos = this.leadRoleBox.object.position.clone()
    const leadRoleBoxDestinationPos = this.originLeadRolBoxPos.clone()

    const leadRoleBoxDuration = this.getDuration(
      leadRoleBoxCurrentPos,
      leadRoleBoxDestinationPos
    )

    new TWEEN.Tween(this.leadRoleBox.object.position)
      .to(leadRoleBoxDestinationPos, leadRoleBoxDuration)
      .easing(TWEEN.Easing.Quadratic.Out)
      .start()
      .onComplete(() => {
        this.animationState.leadRolComplete()
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

  outAnimation = (onComplete?: () => void): void => {
    this.onComplete = onComplete
    this.clearAnimations()

    this.skillBox.object.position.set(
      this.outOriginSkillBox.x,
      this.outOriginSkillBox.y,
      this.outOriginSkillBox.z
    )

    this.skillBox.actionRef.current?.reset()

    const leadRoleBoxCurrentPos = this.leadRoleBox.object.position.clone()
    const leadRoleBoxDestinationPos = this.outLeadRolBoxPos.clone()

    const leadRoleBoxDuration = this.getDuration(
      leadRoleBoxCurrentPos,
      leadRoleBoxDestinationPos
    )

    new TWEEN.Tween(this.leadRoleBox.object.position)
      .to(leadRoleBoxDestinationPos, leadRoleBoxDuration)
      .easing(TWEEN.Easing.Quadratic.Out)
      .start()
      .onComplete(() => {
        this.animationState.leadRolComplete()
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
}

export default AboutLayer
