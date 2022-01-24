import React from 'react'
import { cx } from '@emotion/css'
import * as styles from './ContactLayer.styles'
import ContactForm from '../../../../ContactForm'
import BaseLayer, { BaseLayerProps } from '../BaseLayer'

export type ContactLayerProps = Omit<BaseLayerProps, 'children'>

const WorkLayer = (props: ContactLayerProps): JSX.Element => {
  const { hide } = props

  return (
    <BaseLayer hide={hide}>
      <ContactForm
        className={cx(styles.contactFormBox, { hide })}
        classes={{
          contactFieldset: styles.contactFieldset,
        }}
      />
    </BaseLayer>
  )
}

export default WorkLayer
