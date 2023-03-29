import React, { useContext } from 'react'
import { cx } from '@/styles/cssInstance'
import usePageInfos from '@/hooks/usePageInfos'
import NavItem from '@/components/Layout/Nav/NavItem'
import AppContext from '@/contexts/AppContext'
import { BasePageProps } from '../types'
import * as styles from './HomeLayer.styles'

const HomeLayer = (props: BasePageProps): JSX.Element => {
  const { show = false } = props
  const pageInfos = usePageInfos()
  const { isAnimating } = useContext(AppContext)

  return (
    <div className={styles.content}>
      <div
        className={cx(styles.greeting, {
          show,
          hide: show === false,
        })}
      >
        <h2 className={styles.h2}>{`HI! I'm TokiLee!`}</h2>
        <h3 className={styles.h3}>{`Frontend Web Developer`}</h3>
      </div>
      <div
        className={cx(styles.buttonWrap, {
          show,
          hide: show === false,
        })}
      >
        <NavItem
          className={styles.button}
          key={pageInfos.pageInfoByPage['about'].href}
          href={pageInfos.pageInfoByPage['about'].href}
          disable={isAnimating}
          onClick={() => {
            pageInfos.pageInfoByPage['about'].pushState?.()
            if (
              pageInfos.pageInfoByPage['about'].name !== null &&
              pageInfos.pageInfoByPage['about'].name !== undefined
            ) {
              pageInfos.pageInfoByPage['about'].pushState?.()
            }
          }}
        >
          About Me!
        </NavItem>
      </div>
    </div>
  )
}

export default HomeLayer
