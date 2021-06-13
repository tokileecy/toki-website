import { Story, Meta } from '@storybook/react'
import { css } from '@emotion/css'
import HeroImg, { HeroImgProps } from './HeroImg'

export default {
  title: 'next-app/Pages/HeroImg',
  component: HeroImg,
  argTypes: {},
} as Meta

const Template: Story<HeroImgProps> = (args) => {
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
      <HeroImg
        {...args}
        className={css`
          width: 100%;
          height: 100%;
        `}
      />
    </>
  )
}

export const NormalHeroImg = Template.bind({})

NormalHeroImg.args = {}
