import React from 'react'
import { Story, Meta } from '@storybook/react'
import { css } from '@emotion/css'
import Cancel, { CancelProps } from './Cancel'

export default {
  title: 'next-app/Cancel',
  component: Cancel,
  argTypes: {},
} as Meta

const Template: Story<CancelProps> = (args) => {
  return (
    <div
      className={css`
        width: 24px;
        height: 24px;
      `}
    >
      <Cancel {...args} />
    </div>
  )
}

export const NormalCancel = Template.bind({})

NormalCancel.args = {
  title: 'SKILL',
  animated: false,
}
