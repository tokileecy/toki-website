import { useRef, useEffect } from 'react'
import { css } from '@emotion/css'
import HeroImgBlock from '../../../HeroImgBlock'
import Nav from './Nav'

const cssHomePageRoot = css`
  width: 100%;
  height: 100%;
`

const cssHeroImg = css`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -10;
`

const cssHomeContainer = css`
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
`

function HomePage(): JSX.Element {
  const heroImgRef = useRef(null)
  const heroImgBlockRef = useRef<HeroImgBlock | null>(null)
  useEffect(() => {
    const heroImgBlock = new HeroImgBlock(heroImgRef)
    heroImgBlockRef.current = heroImgBlock
    heroImgBlock.init()

    return () => {
      heroImgBlock.clear()
    }
  }, [])

  return (
    <div className={cssHomePageRoot}>
      <div ref={heroImgRef} className={cssHeroImg}></div>
      <div className={cssHomeContainer}>
        <main
          className={css`
            flex: 1 0 auto;
          `}
        ></main>
        <Nav />
      </div>
    </div>
  )
}

export default HomePage
