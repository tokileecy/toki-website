import React from 'react'
import { Story, Meta } from '@storybook/react'

import { css } from '@emotion/css'
import SubSkillBlock, { SubSkillBlockProps } from './SubSkillBlock'

export default {
  title: 'next-app/SubSkillBlock',
  component: SubSkillBlock,
  argTypes: {},
} as Meta

const Template: Story<SubSkillBlockProps> = (args) => {
  return (
    <div
      className={css`
        margin: 20px;
        display: flex;
        background-color: rgba(0, 255, 255, 0.95);
        flex-direction: column;
        align-items: center;
        justify-content: center;
      `}
    >
      <SubSkillBlock {...args}></SubSkillBlock>
    </div>
  )
}

export const NormalSubSkillBlock = Template.bind({})

NormalSubSkillBlock.args = {
  title: 'Framwork',
  description:
    'feqjfioqewjfoejfoeqwjfoewjofewjqoifewjpofewjqopfjeqwofjopqewjfopqewjfopeqwjfqeiwopfjopiqewfjopewqjfpowqejfoqewjfeqwjfopeqwjopfewjopfewjqopj',
  skills: ['React', 'Material-UI', 'Vue', 'Polymer'],
}
