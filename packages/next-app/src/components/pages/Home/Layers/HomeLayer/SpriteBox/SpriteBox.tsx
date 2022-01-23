import { useRef, useEffect } from 'react'
import { cx, css } from '@emotion/css'
import Box from '@psycholog-studio/ui/Containers/Box'
import SpriteWebGLBlock from '../../../../../three/Sprite'

export interface SpriteBoxProps {
  className?: string
}

const SpriteBox = (props: SpriteBoxProps): JSX.Element => {
  const { className } = props
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
      spriteWebGLBlockRef.current = new SpriteWebGLBlock(rootElement, {
        // clock: heroImgState.clock,
      })

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
    <Box
      className={cx(
        css`
          background-color: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 250px;
          height: 250px;
        `,
        className
      )}
      ref={containerRef}
    ></Box>
  )
}

export default SpriteBox
