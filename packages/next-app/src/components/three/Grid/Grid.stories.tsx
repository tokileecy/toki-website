import React, { useEffect, useRef } from 'react'
import { Story, Meta } from '@storybook/react'
import GridWebGLBlock from './Grid'

export default {
  title: 'three/shader/Grid',
  argTypes: {},
} as Meta

const Template: Story = () => {
  const rootRef = useRef(null)
  const gridWebGLBlockRef = useRef<GridWebGLBlock | null>(null)
  useEffect(() => {
    if (rootRef.current !== null) {
      gridWebGLBlockRef.current = new GridWebGLBlock(rootRef.current)
      gridWebGLBlockRef.current.init()
    }

    return () => {
      if (gridWebGLBlockRef.current !== null) {
        gridWebGLBlockRef.current.clear()
      }
    }
  })
  return (
    <div
      ref={rootRef}
      style={{
        width: '100%',
        minHeight: '300px',
      }}
    ></div>
  )
}

export const NormalCard = Template.bind({})

NormalCard.args = {}
