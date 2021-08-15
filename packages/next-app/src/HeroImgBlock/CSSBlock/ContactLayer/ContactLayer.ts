import * as THREE from 'three'
import PageLayer, { PageLayerParent } from '../PageLayer'
import ContactFormBox from './ContactFormBox'
import TWEEN, { Tween } from '@tweenjs/tween.js'
import { ReactCSSObjectWrapper } from '../utils'
import { makeAutoObservable, observable, autorun, action } from 'mobx'

class ContactAnimationState {
  contactFormFinished: boolean

  constructor() {
    this.contactFormFinished = false

    makeAutoObservable(this, {
      contactFormFinished: observable,
      contactFormComplete: action,
    })
  }

  contactFormComplete = (): void => {
    this.contactFormFinished = true
  }
}
class ContactLayer extends PageLayer {
  animationState: ContactAnimationState
  onComplete?: () => void
  animations?: Tween<THREE.Vector3>[]
  speed: number
  contactFormBox: ReactCSSObjectWrapper<unknown>
  originContactFormBoxPos: THREE.Vector3
  outContactFormBoxPos: THREE.Vector3

  constructor(parent?: PageLayerParent) {
    super(parent)
    this.speed = 2
    this.contactFormBox = new ReactCSSObjectWrapper(ContactFormBox)
    this.originContactFormBoxPos = new THREE.Vector3(0, 0, 0)
    this.outContactFormBoxPos = new THREE.Vector3(0, 1000, 0)

    this.animations = []
    this.onComplete = undefined
    this.animationState = new ContactAnimationState()

    autorun(() => {
      if (this.animationState.contactFormFinished) {
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
      this.contactFormBox.object.position.set(
        this.originContactFormBoxPos.x,
        this.originContactFormBoxPos.y,
        this.originContactFormBoxPos.z
      )
    } else {
      this.contactFormBox.object.position.set(
        this.outContactFormBoxPos.x,
        this.outContactFormBoxPos.y,
        this.outContactFormBoxPos.z
      )
    }
    this.group.add(this.contactFormBox.object)
  }

  getDuration = (fromPos: THREE.Vector3, toPos: THREE.Vector3): number => {
    const distance = fromPos.distanceTo(toPos)
    return distance / this.speed
  }

  outAnimation = (onComplete?: () => void): void => {
    this.onComplete = onComplete
    this.clearAnimations()
    const contactFormBoxCurrentPos = this.contactFormBox.object.position.clone()
    const contactFormBoxDestinationPos = this.outContactFormBoxPos.clone()

    const contactFormBoxDuration = this.getDuration(
      contactFormBoxCurrentPos,
      contactFormBoxDestinationPos
    )

    new TWEEN.Tween(this.contactFormBox.object.position)
      .to(contactFormBoxDestinationPos, contactFormBoxDuration)
      .easing(TWEEN.Easing.Quadratic.Out)
      .start()
      .onComplete(() => {
        this.animationState.contactFormComplete()
      })
  }

  inAnimation = (onComplete?: () => void): void => {
    this.onComplete = onComplete
    this.clearAnimations()

    const contactFormBoxCurrentPos = this.contactFormBox.object.position.clone()
    const contactFormBoxDestinationPos = this.originContactFormBoxPos.clone()
    const contactFormBoxDuration = this.getDuration(
      contactFormBoxCurrentPos,
      contactFormBoxDestinationPos
    )

    new TWEEN.Tween(this.contactFormBox.object.position)
      .to(contactFormBoxDestinationPos, contactFormBoxDuration)
      .easing(TWEEN.Easing.Quadratic.Out)
      .start()
      .onComplete(() => {
        this.animationState.contactFormComplete()
      })
  }
}

export default ContactLayer
