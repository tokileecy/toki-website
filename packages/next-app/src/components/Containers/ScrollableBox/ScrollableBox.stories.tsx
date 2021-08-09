import React from 'react'
import { Story, Meta } from '@storybook/react'
import { css } from '@emotion/css'
import ScrollableBox, { ScrollableBoxProps } from './ScrollableBox'

export default {
  title: 'next-app/Containers/ScrollableBox',
  component: ScrollableBox,
  argTypes: {},
} as Meta

const Template: Story<ScrollableBoxProps> = (args) => {
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
      <ScrollableBox
        {...args}
        style={{
          padding: '10px',
          width: '300px',
          height: '100px',
          overflow: 'hidden',
        }}
      />
    </div>
  )
}

export const NormalCard = Template.bind({})

NormalCard.args = {
  children:
    'fqewkfopewqjfoewqjfopeqwjfopiewqjiopfwjiopfewqiopfjeiqwopjfqwejfwqepfjpoewjfopejofpewjqpofjewpiofjopiewqjfpoweqjfpoewjfopiewqjfopqewjfpoqewjpofewpoqfjewpoqjfpioeqwjfpoieqwjfpoeqwjfpoqwejpofiqwejpoifweqpiofjqwopiefjopiqewfjipoeqwjfopeqwjipfipj',
}
