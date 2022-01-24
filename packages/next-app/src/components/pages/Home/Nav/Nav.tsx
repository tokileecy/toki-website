import React, { useMemo } from 'react'
import { cx } from '@emotion/css'
import NavItem from './NavItem'
import usePageInfos from '../../../../hooks/usePageInfos'
import { Page } from '../Home'
import * as styles from './Nav.styles'

export type ScrollState = {
  isEnter: boolean
  size: number
}

export interface NavProps {
  className?: string
  page: Page
  onPageChange?: (nextPage: Page) => void
}

const Nav = (props: NavProps): JSX.Element => {
  const { className, page, onPageChange } = props

  const pageInfos = usePageInfos()

  const navItems = pageInfos.pages.map((page) => {
    return {
      ...pageInfos.pageInfoByPage[page],
    }
  })

  const currentSelectedItemIndex = useMemo(() => {
    return navItems.findIndex((item) => {
      return item.name === page
    })
  }, [page, navItems])

  return (
    <nav className={cx(styles.nav, className)}>
      <div className={styles.list}>
        {navItems.map((item, index) => {
          return (
            <NavItem
              key={item.href}
              href={item.href}
              selected={currentSelectedItemIndex === index}
              onClick={() => {
                item.pushState?.()
                if (item.name !== null && item.name !== undefined) {
                  onPageChange?.(item.name)
                }
              }}
            >
              {item.text}
            </NavItem>
          )
        })}
      </div>
    </nav>
  )
}

export default Nav
