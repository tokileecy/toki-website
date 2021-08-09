import { css } from '@emotion/css'
import { useRouter } from 'next/router'
import HeroImg from './HeroImg'
import Nav from './Nav'
import heroImgState, { Page } from '../../../HeroImgBlock/HeroImgState'
import { useEffect } from 'react'
import Color from 'color'

const cssHomePageRoot = css`
  position: relative;
  z-index: 20;
  width: 100%;
  height: 100%;

  @supports (height: fill-available) or (height: -webkit-fill-available) or
    (height: -moz-available) {
    height: fill-available;
    min-height: fill-available;
  }
`

const cssHeroImg = css`
  flex: 1 0 auto;
`

const cssHomeContainer = css`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  pointer-events: none;
`
export type HomePageProps = {
  syncHistory: boolean
  syncTitle: boolean
}

const ShadowBox = (): JSX.Element => {
  const hOffset = 0
  const vOffset = 150
  const blurRadius = 100
  const spreadRadius = -100
  const shdowColor = new Color('#000000').alpha(1).toString()
  return (
    <div
      className={css`
        pointer-events: none;
        width: 150%;
        height: 100%;
        position: absolute;
        z-index: 15;
        box-shadow: inset ${hOffset}px -${vOffset}px ${blurRadius}px ${spreadRadius}px
            ${shdowColor},
          inset ${hOffset}px ${vOffset}px ${blurRadius}px ${spreadRadius}px
            ${shdowColor};
      `}
    ></div>
  )
}

const HomePage = (props: HomePageProps): JSX.Element => {
  const { syncHistory = true, syncTitle = true } = props
  const router = useRouter()

  useEffect(() => {
    const initPage = router?.pathname.replace(/\//g, '')
    heroImgState.setPage(initPage)
  }, [])

  return (
    <div className={cssHomePageRoot}>
      <div
        className={css`
          width: 100%;
          height: 100%;
          position: absolute;
          z-index: -10;
          display: flex;
          flex-direction: column;
        `}
      >
        <ShadowBox />
        <HeroImg className={cssHeroImg} />
      </div>
      <div className={cssHomeContainer}>
        <div
          className={css`
            pointer-events: auto;
          `}
        >
          <Nav
            initPage={router?.pathname}
            syncHistory={syncHistory}
            onPageChange={(nextPage: Page) => {
              heroImgState.setPage(nextPage)
            }}
            syncTitle={syncTitle}
          />
        </div>
      </div>
    </div>
  )
}

export default HomePage
