import React from 'react'
import { Story, Meta } from '@storybook/react'
import { css } from '@emotion/css'
import DialogBox, { DialogBoxProps } from './DialogBox'
import SubSkillBlock from '../../SubSkillBlock'

export default {
  title: 'next-app/ContainersDialogBox',
  component: DialogBox,
  argTypes: {},
} as Meta

const Template: Story<DialogBoxProps> = (args) => {
  return (
    <div
      className={css`
        margin: 20px;
        display: flex;
        background-color: black;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      `}
    >
      <div
        className={css`
          background-color: black;
          margin: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: fit-content;
        `}
      >
        <div className={css``}>
          <DialogBox {...args}>
            <SubSkillBlock
              title={'Framwork'}
              description={
                'feqjfioqewjfoejfoeqwjfoewjofewjqoifewjpofewjqopfjeqwofjopqewjfopqewjfopeqwjfqeiwopfjopiqewfjopewqjfpowqejfoqewjfeqwjfopeqwjopfewjopfewjqopj'
              }
              skills={[
                { name: 'React', value: 0.8 },
                { name: 'Material-UI', value: 0.7 },
                { name: 'Vue', value: 0.3 },
                { name: 'Polymer', value: 0.5 },
              ]}
            />
          </DialogBox>
        </div>
      </div>
    </div>
  )
}

export const NormalDialogBox = Template.bind({})

NormalDialogBox.args = {
  title: 'SKILL',
  animated: false,
}
