import { Story, Meta } from '@storybook/react'
import { css } from '@emotion/css'
import Nav, { NavProps } from './Nav'

export default {
  title: 'next-app/Nav/Nav',
  component: Nav,
  argTypes: {
    mode: {
      control: { type: 'radio' },
      options: ['default', 'current', 'list'],
    },
  },
} as Meta

const Template: Story<NavProps> = (args) => (
  <div
    className={css`
      background-color: black;
    `}
  >
    <Nav {...args} />
  </div>
)

export const NormalNav = Template.bind({})

NormalNav.args = { mode: 'default' }
