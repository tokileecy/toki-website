import React from 'react'
import { Story, Meta } from '@storybook/react'

import { css } from '@emotion/css'
import SubSkillBlock, { SubSkillBlockProps } from './SubSkillBlock'
import SubSkillBlock1, { SubSkillBlock1Props } from './SubSkillBlock1'
import TagSubSkillBlock, { TagSubSkillBlockProps } from './TagSubSkillBlock'

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
        background-color: rgba(0, 0, 0, 0.95);
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
  skills: [
    { name: 'React', value: 0.8 },
    { name: 'Material-UI', value: 0.7 },
    { name: 'Vue', value: 0.3 },
    { name: 'Polymer', value: 0.5 },
  ],
}

const SubSkillBlock1Template: Story<SubSkillBlock1Props> = (args) => {
  return (
    <div
      className={css`
        margin: 20px;
        display: flex;
        background-color: rgba(0, 0, 0, 0.95);
        flex-direction: column;
        align-items: center;
        justify-content: center;
      `}
    >
      <SubSkillBlock1 {...args}></SubSkillBlock1>
    </div>
  )
}

export const NormalSubSkillBlock1 = SubSkillBlock1Template.bind({})

NormalSubSkillBlock1.args = {
  title: 'Framwork',
  description:
    'feqjfioqewjfoejfoeqwjfoewjofewjqoifewjpofewjqopfjeqwofjopqewjfopqewjfopeqwjfqeiwopfjopiqewfjopewqjfpowqejfoqewjfeqwjfopeqwjopfewjopfewjqopj',
  skills: [
    { name: 'React', value: 0.8 },
    { name: 'Material-UI', value: 0.7 },
    { name: 'Vue', value: 0.3 },
    { name: 'Polymer', value: 0.5 },
  ],
}

const TagSubSkillBlockTemplate: Story<TagSubSkillBlockProps> = (args) => {
  return (
    <div
      className={css`
        margin: 20px;
        display: flex;
        background-color: rgba(0, 0, 0, 0.95);
        flex-direction: column;
        align-items: center;
        justify-content: center;
      `}
    >
      <TagSubSkillBlock {...args}></TagSubSkillBlock>
    </div>
  )
}

export const NormalTagSubSkillBlock = TagSubSkillBlockTemplate.bind({})

NormalTagSubSkillBlock.args = {
  title: 'Framwork',
  description:
    'feqjfioqewjfoejfoeqwjfoewjofewjqoifewjpofewjqopfjeqwofjopqewjfopqewjfopeqwjfqeiwopfjopiqewfjopewqjfpowqejfoqewjfeqwjfopeqwjopfewjopfewjqopj',
  skills: ['React', 'Material-UI', 'Vue', 'Polymer'],
}
