import React, { useEffect, useRef } from 'react'
import { Story, Meta } from '@storybook/react'
import SpriteWebGLBlock from './Sprite'
import Box from '../../Containers/Box'

export default {
  title: 'three/shader/Sprite',
  argTypes: {},
} as Meta

const Template: Story = () => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const spriteWebGLBlockRef = useRef<SpriteWebGLBlock | null>(null)

  useEffect(() => {
    setTimeout(() => {
      let rootElement
      if (containerRef.current !== null) {
        rootElement = containerRef.current
      } else {
        rootElement = document.createElement('div')
        console.warn(`graphRoot.current should not be ${containerRef.current}`)
      }
      spriteWebGLBlockRef.current = new SpriteWebGLBlock(rootElement)

      spriteWebGLBlockRef.current.init()
      spriteWebGLBlockRef.current.render()
      spriteWebGLBlockRef.current.animate()
      spriteWebGLBlockRef.current.composerRender()
      spriteWebGLBlockRef.current.composerAnimate()
    }, 1000)

    return () => {
      spriteWebGLBlockRef.current !== null &&
        spriteWebGLBlockRef.current.clear()
    }
  }, [])
  return (
    <div
      style={{
        backgroundColor: 'black',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <Box
        style={{
          backgroundColor: 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '250px',
          height: '250px',
        }}
        ref={containerRef}
      ></Box>
    </div>
  )
}

export const NormalCard = Template.bind({})

NormalCard.args = {}
