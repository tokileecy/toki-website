import CircleWebGLBlock from './CircleWebGLBlock'
import { useRef, useEffect } from 'react'
import heroImgState from '../../../HeroImgState'
import { css } from '@emotion/css'

const SpriteBox = (): JSX.Element => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const circleWebGLBlockRef = useRef<CircleWebGLBlock | null>(null)

  useEffect(() => {
    setTimeout(() => {
      let rootElement
      if (containerRef.current !== null) {
        rootElement = containerRef.current
      } else {
        rootElement = document.createElement('div')
        console.warn(`graphRoot.current should not be ${containerRef.current}`)
      }
      circleWebGLBlockRef.current = new CircleWebGLBlock(
        heroImgState.clock,
        rootElement
      )

      circleWebGLBlockRef.current.init()
      circleWebGLBlockRef.current.render()
      circleWebGLBlockRef.current.animate()
      circleWebGLBlockRef.current.composerRender()
      circleWebGLBlockRef.current.composerAnimate()
    }, 1000)

    return () => {
      circleWebGLBlockRef.current !== null &&
        circleWebGLBlockRef.current.clear()
    }
  }, [])
  return (
    <div
      className={css`
        display: flex;
        align-items: center;
        justify-content: center;
        width: 250px;
        height: 150px;
      `}
      ref={containerRef}
    ></div>
  )
}

export default SpriteBox