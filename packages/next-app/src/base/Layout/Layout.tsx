import React, { useState } from 'react'
import BaseLayout, {
  BaseLayoutProps,
} from '@psycholog-studio/ui/Layouts/BaseLayout'
import { threeManager } from '../core'
import { cx } from '@emotion/css'
import Nav from './Nav'
import * as styles from './Layout.styles'
import usePage from '../../hooks/usePage'
import usePageInfos from '../../hooks/usePageInfos'

export type LayoutProps = Omit<
  BaseLayoutProps,
  'threeManagerRef' | 'threeManager' | 'classes'
>

export type Page = 'home' | 'about' | 'work' | 'contact'

const Layout = (inProps: BaseLayoutProps): JSX.Element => {
  const { children, ...props } = inProps
  const { page } = usePage()
  const pageInfo = usePageInfos()

  const [hideFooter, setHideFooter] = useState(true)

  const handleMenuClick = () => {
    setHideFooter((prev) => !prev)
  }

  const hide = page === pageInfo.pageInfoByPage['home'].name
  return (
    <BaseLayout
      {...props}
      threeManager={threeManager}
      classes={{
        root: styles.root,
        webglLayer: cx(styles.webglLayer),
        cssLayer: cx(styles.cssLayer),
        uiLayer: cx(styles.uiLayer),
      }}
    >
      <div
        className={cx(styles.uiLayerWrapper, {
          hide: false,
        })}
      >
        <header
          className={cx(styles.header, {
            hide,
          })}
        >
          <h1>{pageInfo.pageInfoByPage[page]?.text}</h1>
          <div className={styles.menu} onClick={handleMenuClick}>
            Menu
          </div>
        </header>
        <main className={styles.main}>{children}</main>
        <footer
          className={cx(styles.footer, {
            hide: hideFooter,
            hide2: hide,
          })}
        >
          <Nav
            classes={{
              root: styles.nav,
              navItem: styles.navItem,
            }}
            page={page}
          />
        </footer>
      </div>
    </BaseLayout>
  )
}

export default Layout
