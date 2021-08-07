import React, { useEffect, useState } from 'react'
import { Story, Meta } from '@storybook/react'
import { css } from '@emotion/css'
import Input, { InputProps } from './Input'

export default {
  title: 'next-app/Input',
  component: Input,
  argTypes: {},
} as Meta

const Template: Story<InputProps> = (args) => {
  const [value, setValue] = useState(args.value)
  useEffect(() => {
    setValue(args.value)
  }, [args.value])

  return (
    <div
      className={css`
        height: 150px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #101010;
      `}
    >
      <Input
        {...args}
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
        }}
      />
    </div>
  )
}

export const NormalInput = Template.bind({})

NormalInput.args = {
  component: 'input',
  value: 'input value',
}

export const TextareaInput = Template.bind({})

TextareaInput.args = {
  component: 'textarea',
  value:
    'huihiuhuihjuipt34jfpqjewofjewoifpjewqpofjeowpqfjoewpqjfoepwqjfopeqwjfopewjqfpoewjqpfoiejwqofewjqopfewpoqfjewpqofjeowqifjoepwqjfewqfopewqjfpoeqwjf',
}
