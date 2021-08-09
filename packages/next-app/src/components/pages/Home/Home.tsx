import { css } from '@emotion/css'
import { useRouter } from 'next/router'
import HeroImg from './HeroImg'
import Nav from './Nav'
import heroImgState, { Page } from '../../../HeroImgBlock/HeroImgState'
import { useEffect } from 'react'

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
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -10;
`

const cssHomeContainer = css`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  pointer-events: none;
`

export interface HomePageProps {
  syncHistory: boolean
  syncTitle: boolean
}

const defaultProps: HomePageProps = {
  syncHistory: true,
  syncTitle: true,
}

function HomePage(props: HomePageProps): JSX.Element {
  const { syncHistory, syncTitle } = props
  const router = useRouter()

  useEffect(() => {
    const initPage = router?.pathname.replace(/\//g, '')
    heroImgState.setPage(initPage)
  }, [])

  return (
    <div className={cssHomePageRoot}>
      <HeroImg className={cssHeroImg} />
      <div className={cssHomeContainer}>
        {/* <main
          className={css`
            flex: 1 0 auto;
          `}
        ></main> */}
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

HomePage.defaultProps = defaultProps

export default HomePage
