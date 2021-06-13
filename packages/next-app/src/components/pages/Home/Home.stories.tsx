import { Story, Meta } from '@storybook/react'
import Home from './Home'

export default {
  title: 'next-app/Pages/Home',
  component: Home,
  argTypes: {},
} as Meta

const Template: Story = (args) => {
  return (
    <>
      <style>
        {`
          html {
            height: 100vh;
            width: 100vw;
          }

          body, #root {
            height: 100%;
            width: 100%;
            padding: 0 !important;
            margin: 0 !important;
          }
        `}
      </style>
      <Home {...args} />
    </>
  )
}

export const NormalHome = Template.bind({})

NormalHome.args = {}
