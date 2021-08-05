import * as THREE from 'three'
import PageLayer, { PageLayerParent } from '../PageLayer'
import SkillBox, { SkillBoxRefContent } from './SkillBox'
import LeadRoleBox from './LeadRoleBox'
import { ReactCSSObjectWrapper } from '../utils'
import TWEEN from '@tweenjs/tween.js'

class HomeLayer extends PageLayer {
  speed: number
  skillBox: ReactCSSObjectWrapper<SkillBoxRefContent>
  leadRoleBox: ReactCSSObjectWrapper<unknown>
  originSkillBox: THREE.Vector3
  outOriginSkillBox: THREE.Vector3
  originLeadRolBoxPos: THREE.Vector3
  outLeadRolBoxPos: THREE.Vector3

  constructor(parent?: PageLayerParent) {
    super(parent)
    this.speed = 8
    this.skillBox = new ReactCSSObjectWrapper<SkillBoxRefContent>(SkillBox)
    this.leadRoleBox = new ReactCSSObjectWrapper(LeadRoleBox)

    this.originSkillBox = new THREE.Vector3(800, 200, 0)
    this.outOriginSkillBox = new THREE.Vector3(800, 200, 0)
    this.originLeadRolBoxPos = new THREE.Vector3(-1100, 700, 0)
    this.outLeadRolBoxPos = new THREE.Vector3(-3000, 200, 0)
  }

  init = (isInitPage?: boolean): void => {
    if (isInitPage) {
      this.skillBox.object.position.set(
        this.originSkillBox.x,
        this.originSkillBox.y,
        this.originSkillBox.z
      )
      this.leadRoleBox.object.position.set(
        this.originLeadRolBoxPos.x,
        this.originLeadRolBoxPos.y,
        this.originLeadRolBoxPos.z
      )
      this.skillBox.actionRef.current?.animate()
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
    }
    this.group.add(this.skillBox.object)
    this.group.add(this.leadRoleBox.object)
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
  }
}

export default HomeLayer
