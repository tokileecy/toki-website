import React, { useRef, useCallback, useMemo } from 'react'
import { cx } from '@emotion/css'
import NavItem from './NavItem'
import usePageInfos from '../../../../hooks/usePageInfos'
import { Page } from '../Home'
import * as styles from './Nav.styles'

export type ScrollState = {
  isEnter: boolean
  size: number
}

export type NavModes = 'default' | 'current' | 'list'

export interface NavProps {
  className?: string
  mode?: NavModes
  page: Page
  onPageChange?: (nextPage: Page) => void
}

const Nav = (props: NavProps): JSX.Element => {
  const { className, mode = 'default', page, onPageChange } = props

  const pageInfos = usePageInfos()

  const navItems = [
    {
      ...pageInfos.home,
      nextLink: false,
    },
    {
      ...pageInfos.about,
      nextLink: false,
    },
    {
      ...pageInfos.work,
      nextLink: false,
    },
    // {
    //   ...pageInfos.contact,
    //   nextLink: false,
    // },
  ]
  const scrollStateRef = useRef<ScrollState>({
    isEnter: false,
    size: 0,
  })

  const currentSelectedItemIndex = useMemo(() => {
    return navItems.findIndex((item) => {
      return item.name === page
    })
  }, [page, navItems])

  const navHandleMouseEnter = useCallback(() => {
    scrollStateRef.current.isEnter = true
  }, [scrollStateRef])

  const navHandleMouseLeave = useCallback(() => {
    scrollStateRef.current.size = 0
    scrollStateRef.current.isEnter = false
  }, [scrollStateRef])

  return (
    <nav
      className={cx(styles.nav, className)}
      onMouseEnter={navHandleMouseEnter}
      onMouseLeave={navHandleMouseLeave}
    >
      <div className={cx(styles.content, `mode-${mode}`)}>
        <div className={cx(styles.current, 'current')}>
          {navItems[currentSelectedItemIndex].text}
        </div>
        <div className={cx(styles.list, 'list')}>
          {navItems.map((item, index) => {
            return (
              <NavItem
                key={item.href}
                href={item.href}
                nextLink={item.nextLink}
                selected={currentSelectedItemIndex === index}
                onClick={(e) => {
                  e.preventDefault()
                  scrollStateRef.current.size = 0
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
      </div>
    </nav>
  )
}

export default Nav
