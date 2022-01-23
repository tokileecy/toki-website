import React from 'react'
import { Story, Meta } from '@storybook/react'

import { css } from '@emotion/css'
import WorkBlock, { WorkBlockProps } from './WorkBlock'
import Content from './Content'

export default {
  title: 'next-app/WorkBlock',
  component: WorkBlock,
  argTypes: {},
} as Meta

const Template: Story<WorkBlockProps> = (args) => {
  return (
    <div
      className={css`
        padding: 30px;
        min-height: 150px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #101010;
      `}
    >
      <WorkBlock {...args} />
    </div>
  )
}

export const NormalWorkBlock = Template.bind({})

NormalWorkBlock.args = {
  works: [
    {
      name: 'blog',
      title: 'Blog',
      imgElement: <Content />,
    },
    {
      name: 'blog1',
      title: 'Blog',
      imgElement: <Content />,
    },
    {
      name: 'blog2',
      title: 'Blog',
      imgElement: <Content />,
    },
    {
      name: 'blog3',
      title: 'Blog',
      imgElement: <Content />,
    },
  ],
}
