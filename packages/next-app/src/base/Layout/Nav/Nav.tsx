import React, { useMemo } from 'react'
import { cx } from '@emotion/css'
import NavItem from './NavItem'
import usePageInfos from '../../../hooks/usePageInfos'
import { Page } from '../Layout'
import * as styles from './Nav.styles'

export type ScrollState = {
  isEnter: boolean
  size: number
}

export type NavClassesKey = 'root' | 'navItem'

export interface NavProps {
  className?: string
  page: Page
  onPageChange?: (nextPage: Page) => void
  classes?: {
    [k in NavClassesKey]?: string
  }
}

const Nav = (props: NavProps): JSX.Element => {
  const { classes = {}, className, page, onPageChange } = props

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
    <nav className={cx(styles.root, classes.root, className)}>
      {navItems.map((item, index) => {
        return (
          <NavItem
            className={classes.navItem}
            key={item.href}
            href={item.href}
            // as={item.name}
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
    </nav>
  )
}

export default Nav
