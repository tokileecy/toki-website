import { useRef, useEffect } from 'react'
import Link from 'next/link'
import { css } from '@emotion/css'
import HeroImgBlock from '../../HeroImgBlock'

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

  main {
    flex: 1 0 auto;
  }

  nav {
    /* background-color: rgba(255, 255, 255, 0.5); */
    border-top: 1px solid white;
    display: flex;
    height: 100px;
  }
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
        <main>
          <div></div>
        </main>
        <nav>
          {['Home', 'About', 'Blog', 'Contact'].map((item) => {
            return (
              <Link key={item} href={'/'}>
                <a
                  className={css`
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    flex: 1 0 auto;
                    color: white;
                  `}
                >
                  {item}
                </a>
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}

export default HomePage
