import React from 'react'
import ThreeCSSObject from '@psycholog-studio/ui/ThreeGraphic/ThreeCSSLayer/ThreeCSSObject'
import { cx } from '@emotion/css'
import * as styles from './ContactLayer.styles'
import ContactForm from '../../../../ContactForm'
import useLayerCSSObjectRef from '../useLayerCSSObjectRef'

export interface HomeLayerProps {
  hide?: boolean
}

const WorkLayer = (props: HomeLayerProps): JSX.Element => {
  const { hide = true } = props
  const [, aboutLayerRefCallback] = useLayerCSSObjectRef()

  return (
    <ThreeCSSObject ref={aboutLayerRefCallback} className={styles.root}>
      <div className={cx(styles.content, { hide })}>
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
