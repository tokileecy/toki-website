import * as THREE from 'three'
import PageLayer, { PageLayerParent } from '../PageLayer'
import SkillBox, { SkillBoxRefContent } from './SkillBox'
import LeadRoleBox from './LeadRoleBox'
import RecentlyBox from './RecentlyBox'
import { ReactCSSObjectWrapper } from '../utils'
import TWEEN from '@tweenjs/tween.js'

class HomeLayer extends PageLayer {
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
    this.speed = 8
    this.skillBox = new ReactCSSObjectWrapper<SkillBoxRefContent>(SkillBox)
    this.leadRoleBox = new ReactCSSObjectWrapper(LeadRoleBox)
    this.recentlyBox = new ReactCSSObjectWrapper(RecentlyBox)

    this.originSkillBox = new THREE.Vector3(800, 200, 0)
    this.outOriginSkillBox = new THREE.Vector3(800, 200, 0)
    this.originLeadRolBoxPos = new THREE.Vector3(-1100, 700, 0)
    this.outLeadRolBoxPos = new THREE.Vector3(-3000, 700, 0)
    this.originRecentlyBoxPos = new THREE.Vector3(-1100, -100, 0)
    this.outRecentlyBoxPos = new THREE.Vector3(-3000, -100, 0)
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

  inAnimation = (): void => {
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

  outAnimation = (): void => {
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
}

export default HomeLayer
