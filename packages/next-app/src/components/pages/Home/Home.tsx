import React from 'react'
import { cx } from '@emotion/css'
import { Page } from '../../../base/Layout'
import * as styles from './Home.styles'
import usePage from '../../../hooks/usePage'
import usePageInfos from '../../../hooks/usePageInfos'
import NavItem from '../../../base/Layout/Nav/NavItem'
import { BasePageProps } from '../types'

const Home = (props: BasePageProps): JSX.Element => {
  const { hide = false } = props
  const { setPage } = usePage()
  const pageInfos = usePageInfos()

  const handlePageChange = (nextPage: Page) => {
    setPage?.(nextPage)
  }
  return (
    <div className={styles.content}>
      <div
        className={cx(styles.greeting, {
          hide,
        })}
      >
        <h2 className={styles.h2}>{`HI! I'm TokiLee!`}</h2>
        <h3 className={styles.h3}>{`Frontend Web Developer`}</h3>
      </div>
      <div
        className={cx(styles.buttonWrap, {
          hide,
        })}
      >
        <NavItem
          className={styles.button}
          key={pageInfos.pageInfoByPage['about'].href}
          href={pageInfos.pageInfoByPage['about'].href}
          onClick={() => {
            pageInfos.pageInfoByPage['about'].pushState?.()
            if (
              pageInfos.pageInfoByPage['about'].name !== null &&
              pageInfos.pageInfoByPage['about'].name !== undefined
            ) {
              handlePageChange(pageInfos.pageInfoByPage['about'].name)
            }
          }}
        >
          About Me!
        </NavItem>
      </div>
    </div>
  )
}

export default Home
