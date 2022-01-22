import { useEffect, useRef } from 'react'
import { cx, css } from '@emotion/css'
import HeroImgBlock from '../../../../HeroImgBlock'
import ThreeWebglLayer from '@psycholog-studio/ui/ThreeGraphic/ThreeWebglLayer'
import ThreeGraphic from '@psycholog-studio/ui/ThreeGraphic'

export interface HeroImgProps {
  className: string
}

const defaultProps: HeroImgProps = {
  className: '',
}

const cssHeroImg = css`
  position: absolute;
  width: 100%;
  height: 100%;

  canvas {
    position: absolute;
    z-index: 3;
    width: 100%;
    height: 100%;
  }
`

function HeroImg(props: HeroImgProps): JSX.Element {
  const { className } = props
  const heroImgElementRef = useRef(null)
  const heroImgBlockRef = useRef<HeroImgBlock | null>(null)

  useEffect(() => {
    let heroImgBlock: HeroImgBlock | null = null
    const timeoutId: null | ReturnType<typeof setTimeout> = null
    const loadHeroImgBlock = async () => {
      const HeroImgBlock = (await import('../../../../HeroImgBlock')).default
      heroImgBlock = new HeroImgBlock(heroImgElementRef)
      heroImgBlockRef.current = heroImgBlock
      heroImgBlock.init()
    }

    loadHeroImgBlock()

    return () => {
      heroImgBlock !== null && heroImgBlock.clear()
      timeoutId !== null && clearTimeout(timeoutId)
    }
  }, [])
  return (
    <div
      className={css`
        position: absolute;
        z-index: 3;
        width: 100%;
        height: 100%;
      `}
    >
      <ThreeGraphic>
        <ThreeWebglLayer />
      </ThreeGraphic>
      <div ref={heroImgElementRef} className={cx(cssHeroImg, className)}></div>
    </div>
  )
}

HeroImg.defaultProps = defaultProps

export default HeroImg
