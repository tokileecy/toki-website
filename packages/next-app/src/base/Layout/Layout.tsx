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
> & {
  isStartup?: boolean
}

export type Page = 'home' | 'about' | 'work'

const Layout = (inProps: LayoutProps): JSX.Element => {
  const { isStartup = false, children, ...props } = inProps
  const { page } = usePage()
  const pageInfo = usePageInfos()

  const [showFooter, setShowFooter] = useState(false)

  const handleMenuClick = () => {
    setShowFooter((prev) => !prev)
  }

  const show = isStartup
    ? page !== pageInfo.pageInfoByPage['home'].name
    : undefined

  return (
    <BaseLayout
      {...props}
      threeManager={threeManager}
      classes={{
        root: styles.root,
        webglLayer: cx(styles.webglLayer),
        uiLayer: cx(styles.uiLayer),
      }}
    >
      <div className={styles.uiLayerWrapper}>
        <header
          className={cx(styles.header, {
            show,
            hide: show === false,
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
            show: showFooter,
            show2: show,
            hide2: show === false,
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
