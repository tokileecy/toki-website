import { css } from '@emotion/css'
import HeroImg from './HeroImg'
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
  return (
    <div className={cssHomePageRoot}>
      <HeroImg className={cssHeroImg} />
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
