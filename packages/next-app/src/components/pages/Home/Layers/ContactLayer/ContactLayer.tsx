import React, { useRef, useCallback } from 'react'
import ThreeCSSObject from '@psycholog-studio/ui/ThreeGraphic/ThreeCSSLayer/ThreeCSSObject'
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer'
import { cx } from '@emotion/css'
import * as styles from './ContactLayer.styles'
import ContactForm from '../../../../ContactForm'

export interface HomeLayerProps {
  hide?: boolean
}

const WorkLayer = (props: HomeLayerProps): JSX.Element => {
  const { hide = true } = props
  const aboutLayerRef = useRef<CSS3DObject | null>(null)
  const aboutLayerRefCallback = useCallback((obj) => {
    if (obj) {
      aboutLayerRef.current = obj
      obj.position.z = 40
    }
  }, [])

  return (
    <ThreeCSSObject
      ref={aboutLayerRefCallback}
      className={cx(styles.root, { hide })}
    >
      <div className={styles.content}>
        <ContactForm
          className={cx(styles.contactFormBox, { hide })}
          classes={{
            contactFieldset: styles.contactFieldset,
          }}
        />
      </div>
    </ThreeCSSObject>
  )
}

export default WorkLayer
