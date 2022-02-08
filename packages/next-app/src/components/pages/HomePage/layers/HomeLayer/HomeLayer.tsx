import React from 'react'
import { cx } from '@emotion/css'
import * as styles from './HomeLayer.styles'
import usePageInfos from '../../../../../hooks/usePageInfos'
import NavItem from '../../../../Layout/Nav/NavItem'
import { BasePageProps } from '../types'

const HomeLayer = (props: BasePageProps): JSX.Element => {
  const { show = false } = props
  const pageInfos = usePageInfos()

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
