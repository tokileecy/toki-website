import * as THREE from 'three'
import PageLayer, { PageLayerParent } from '../PageLayer'
import SkillBox, { SkillBoxRefContent } from './SkillBox'
import LeadRoleBox from './LeadRoleBox'
import RecentlyBox from './RecentlyBox'
import { ReactCSSObjectWrapper } from '../utils'
import TWEEN, { Tween } from '@tweenjs/tween.js'
import { makeAutoObservable, observable, autorun, action } from 'mobx'
import heroImgState, { AspectRatioEventDetail } from '../../HeroImgState'

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
  state: 'in' | 'out'
  animationState: AboutAnimationState
  onComplete?: () => void
  animations?: Tween<THREE.Vector3>[]
  speed: number
  skillBox: ReactCSSObjectWrapper<SkillBoxRefContent, SkillBoxRefContent>
  leadRoleBox: ReactCSSObjectWrapper<null, null>
  recentlyBox: ReactCSSObjectWrapper<null, null>
  originSkillBox: THREE.Vector3
  outOriginSkillBox: THREE.Vector3
  originLeadRolBoxPos: THREE.Vector3
  outLeadRolBoxPos: THREE.Vector3
  originRecentlyBoxPos: THREE.Vector3
  outRecentlyBoxPos: THREE.Vector3

  constructor(parent?: PageLayerParent) {
    super(parent)
    this.state = 'in'
    this.speed = 2
    this.skillBox = new ReactCSSObjectWrapper<
      SkillBoxRefContent,
      SkillBoxRefContent
    >(SkillBox)
    this.leadRoleBox = new ReactCSSObjectWrapper(LeadRoleBox)
    this.recentlyBox = new ReactCSSObjectWrapper(RecentlyBox)

    this.originSkillBox = new THREE.Vector3()
    this.originLeadRolBoxPos = new THREE.Vector3()
    this.originRecentlyBoxPos = new THREE.Vector3()
    this.outOriginSkillBox = new THREE.Vector3()
    this.outLeadRolBoxPos = new THREE.Vector3()
    this.outRecentlyBoxPos = new THREE.Vector3()

    this.animations = []
    this.onComplete = undefined
    this.animationState = new AboutAnimationState()

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
        // this.animationState.skillFinished &&
        this.animationState.leadRolFinished &&
        this.animationState.recentlyBoxFinished
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
      this.originRecentlyBoxPos.set(0, 200, 0)
      this.originSkillBox.set(0, -150, 0)
      this.outOriginSkillBox = new THREE.Vector3(1100, 200, 0)
      this.outRecentlyBoxPos = new THREE.Vector3(-1100, -150, 0)
    }

    if (detail.value > 1.4) {
      this.originRecentlyBoxPos.set(-300, 0, 0)
      this.originSkillBox.set(300, 0, 0)
      this.outOriginSkillBox = new THREE.Vector3(1000, 0, 0)
      this.outRecentlyBoxPos = new THREE.Vector3(-1000, 0, 0)
    }

    if (detail.value > 1.8) {
      this.originRecentlyBoxPos.set(-400, 0, 0)
      this.originSkillBox.set(400, 0, 0)

      this.outOriginSkillBox = new THREE.Vector3(1100, 0, 0)
      this.outRecentlyBoxPos = new THREE.Vector3(-1100, 0, 0)
    }
  }

  resetPosition = (): void => {
    if (this.state === 'out') {
      this.recentlyBox.object.position.set(
        this.outRecentlyBoxPos.x,
        this.outRecentlyBoxPos.y,
        this.outRecentlyBoxPos.z
      )
      this.skillBox.object.position.set(
        this.outOriginSkillBox.x,
        this.outOriginSkillBox.y,
        this.outOriginSkillBox.z
      )
    } else {
      this.recentlyBox.object.position.set(
        this.originRecentlyBoxPos.x,
        this.originRecentlyBoxPos.y,
        this.originRecentlyBoxPos.z
      )
      this.skillBox.object.position.set(
        this.originSkillBox.x,
        this.originSkillBox.y,
        this.originSkillBox.z
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
    this.resetPosition()
    this.group.add(this.skillBox.object)
    // this.group.add(this.leadRoleBox.object)
    this.group.add(this.recentlyBox.object)
  }

  getDuration = (fromPos: THREE.Vector3, toPos: THREE.Vector3): number => {
    const distance = fromPos.distanceTo(toPos)
    return distance / this.speed
  }

  inAnimation = (onComplete?: () => void): void => {
    this.state = 'in'
    this.onComplete = onComplete
    this.clearAnimations()

    const skillBoxCurrentPos = this.skillBox.object.position.clone()
    const skillBoxDestinationPos = this.originSkillBox.clone()

    const skillBoxDuration = this.getDuration(
      skillBoxCurrentPos,
      skillBoxDestinationPos
    )

    new TWEEN.Tween(this.skillBox.object.position)
      .to(skillBoxDestinationPos, skillBoxDuration)
      .easing(TWEEN.Easing.Quadratic.Out)
      .start()

    // this.skillBox.actionRef.current?.animate()

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
    this.state = 'out'
    this.onComplete = onComplete
    this.clearAnimations()

    const skillBoxCurrentPos = this.skillBox.object.position.clone()
    const skillBoxDestinationPos = this.outOriginSkillBox.clone()

    const skillBoxDuration = this.getDuration(
      skillBoxCurrentPos,
      skillBoxDestinationPos
    )

    new TWEEN.Tween(this.skillBox.object.position)
      .to(skillBoxDestinationPos, skillBoxDuration)
      .easing(TWEEN.Easing.Quadratic.Out)
      .start()

    // this.skillBox.actionRef.current?.reset()

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
