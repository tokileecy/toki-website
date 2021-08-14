import { useEffect, useRef } from 'react'
import { cx, css } from '@emotion/css'
import HeroImgBlock from '../../../../HeroImgBlock'

export interface HeroImgProps {
  className: string
}

const defaultProps: HeroImgProps = {
  className: '',
}

const cssHeroImg = css`
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
    <div ref={heroImgElementRef} className={cx(cssHeroImg, className)}></div>
  )
}

HeroImg.defaultProps = defaultProps

export default HeroImg
