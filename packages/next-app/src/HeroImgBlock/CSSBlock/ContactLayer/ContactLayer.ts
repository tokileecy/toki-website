import * as THREE from 'three'
import PageLayer, { PageLayerParent } from '../PageLayer'
import ContactFormBox from './ContactFormBox'
import TWEEN from '@tweenjs/tween.js'
import { ReactCSSObjectWrapper } from '../utils'

class ContactLayer extends PageLayer {
  speed: number
  contactFormBox: ReactCSSObjectWrapper<unknown>
  originContactFormBoxPos: THREE.Vector3
  outContactFormBoxPos: THREE.Vector3

  constructor(parent?: PageLayerParent) {
    super(parent)
    this.speed = 8
    this.contactFormBox = new ReactCSSObjectWrapper(ContactFormBox)
    this.originContactFormBoxPos = new THREE.Vector3(0, 0, 0)
    this.outContactFormBoxPos = new THREE.Vector3(-3000, 500, 0)
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

  outAnimation = (): void => {
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
  }

  inAnimation = (): void => {
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
  }
}

export default ContactLayer
