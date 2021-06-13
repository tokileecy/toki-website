import { Story, Meta } from '@storybook/react'
import { css } from '@emotion/css'
import NavItem, { NavItemProps } from './NavItem'

export default {
  title: 'next-app/Nav/NavItem',
  component: NavItem,
  argTypes: {},
} as Meta

const Template: Story<NavItemProps> = (args) => (
  <div
    className={css`
      background-color: black;
    `}
  >
    <NavItem {...args} />
  </div>
)

export const NormalNavItem = Template.bind({})

NormalNavItem.args = { selected: false, children: 'Nav Item' }
