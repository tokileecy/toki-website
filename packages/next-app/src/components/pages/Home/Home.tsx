import React, { useState } from 'react'
import { css, cx } from '@emotion/css'
import Nav from './Nav'
import Layout from '../../../base/Layout'
import * as styles from './Home.styles'
import usePage from '../../../hooks/usePage'
import usePageInfos from '../../../hooks/usePageInfos'
import Layers from './Layers'
import Box from '../../Box'
import { colors } from '../../../baseStyles'
import Color from 'color'
import NavItem from './Nav/NavItem'

export type Page = 'home' | 'about' | 'work' | 'contact'

const HomePage = (): JSX.Element => {
  const { page, setPage } = usePage()
  const pageInfo = usePageInfos()

  const [hideFooter, setHideFooter] = useState(true)
  const handlePageChange = (nextPage: Page) => {
    setPage?.(nextPage)
  }

  const handleMenuClick = () => {
    setHideFooter((prev) => !prev)
  }

  return (
    <Layout
      classes={{
        root: styles.root,
        webglLayer: cx(styles.webglLayer, {
          hide: false,
        }),
        cssLayer: cx(styles.cssLayer, {
          hide: false,
        }),
        uiLayer: cx(styles.uiLayer, {
          hide: false,
        }),
      }}
      cssLayerContent={
        <>
          <Layers page={page} />
        </>
      }
    >
      {/* <div className={styles.originUILayer}>Test</div> */}
      <div
        className={cx(styles.uiLayerWrapper, {
          hide: false,
        })}
      >
        <header
          className={cx(
            styles.header,
            css`
              transition: transform 1s;
              transform: translateY(0);
              &.hide {
                transform: translateY(-100px);
              }
            `,
            {
              hide: page === pageInfo.pageInfoByPage['home'].name,
            }
          )}
        >
          <h1>{pageInfo.pageInfoByPage[page]?.text}</h1>
          <div className={styles.menu} onClick={handleMenuClick}>
            Menu
          </div>
        </header>
        <main className={styles.main}>
          <div
            className={cx(
              css`
                padding-left: 180px;
                padding-right: 180px;
                margin-top: 240px;

                transition: transform 1s;
                transform: translateX(0);
                &.hide {
                  transform: translateX(-130vw);
                }
              `,
              {
                hide: page !== pageInfo.pageInfoByPage['home'].name,
              }
            )}
          >
            <h2
              className={css`
                font-size: 128px;
                text-shadow: 0 0 1em
                  ${Color(colors.primaryTint).alpha(0.55).toString()};
                color: ${Color(colors.black100).toString()};
                font-weight: bold;
                line-height: 1.2em;
              `}
            >
              HI! I'm TokiLee!
            </h2>
            <h3
              className={css`
                font-size: 48px;
                text-shadow: 0 0 1em
                  ${Color(colors.primaryTint).alpha(0.55).toString()};
                color: ${Color(colors.black100).toString()};
                font-weight: bold;
                line-height: 1.2em;
              `}
            >
              Frontend Web Developer
            </h3>
          </div>
          <div
            className={cx(
              css`
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: flex-end;
              margin-top: 96px;
              padding-right: 180px;
              transition: transform 1s;
                transform: translateX(0);
                &.hide {
                  transform: translateX(130vw);
                
            `,
              {
                hide: page !== pageInfo.pageInfoByPage['home'].name,
              }
            )}
          >
            <NavItem
              className={css`
                width: 460px;
                height: 100px;
                font-size: 64px;
                font-weight: bold;
                border-radius: 4px;

                color: ${Color(colors.black100).toString()};
              `}
              key={pageInfo.pageInfoByPage['about'].href}
              href={pageInfo.pageInfoByPage['about'].href}
              onClick={() => {
                pageInfo.pageInfoByPage['about'].pushState?.()
                if (
                  pageInfo.pageInfoByPage['about'].name !== null &&
                  pageInfo.pageInfoByPage['about'].name !== undefined
                ) {
                  handlePageChange(pageInfo.pageInfoByPage['about'].name)
                }
              }}
            >
              About Me!
            </NavItem>
          </div>
        </main>
        <footer
          className={cx(
            styles.footer,
            css`
              transition: transform 1s;
              transform: translateY(0);
              &.hide2 {
                transform: translateY(100px);
              }
            `,
            {
              hide: hideFooter,
              hide2: page === pageInfo.pageInfoByPage['home'].name,
            }
          )}
        >
          <Nav
            classes={{
              root: styles.nav,
              navItem: styles.navItem,
            }}
            page={page}
            onPageChange={handlePageChange}
          />
        </footer>
      </div>
    </Layout>
  )
}

export default HomePage
