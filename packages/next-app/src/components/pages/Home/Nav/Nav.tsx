import React, { useRef, useState, useCallback, useMemo } from 'react'
import { cx, css } from '@emotion/css'
import NavItem from './NavItem'
import usePageInfos from '../../../../hooks/usePageInfos'
import { Page } from '../../../../HeroImgBlock//HeroImgState'

const cssCurrent = css`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: white;
  z-index: 10;
  font-size: 36px;
`

const cssList = css`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
`

const cssNav = css`
  height: 70px;
  position: relative;
  overflow: hidden;
`

const hide = css`
  opacity: 0;
  pointer-events: none;
`

const show = css`
  opacity: 1;
`

const cssContent = css`
  display: flex;
  position: relative;
  height: 100%;

  &.mode-default {
    &:not(:hover) {
      .current {
        ${show}
      }

      .list {
        ${hide}
      }
    }
    &:hover {
      .current {
        ${hide}
      }
      .list {
        ${show}
      }
    }
  }

  &.mode-current {
    .current {
      ${show}
    }

    .list {
      ${hide}
    }
  }

  &.mode-list {
    .current {
      ${hide}
    }

    .list {
      ${show}
    }
  }
`

const intervalSize = 500

const validateCurrentChange = (
  prev: number,
  next: number,
  totalSize: number
): number => {
  return next < totalSize && next >= 0 ? next : prev
}

export type ScrollState = {
  isEnter: boolean
  size: number
}

export type NavModes = 'default' | 'current' | 'list'

export interface NavProps {
  mode: NavModes
  initPage?: string
  onPageChange?: (nextPage: Page) => void
}

const defaultProps: NavProps = {
  mode: 'default',
}

const Nav = (props: NavProps): JSX.Element => {
  const { mode, initPage, onPageChange } = props

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

  const [currentPage, setCurrentPage] = useState(initPage ?? navItems[0].href)

  const currentSelectedItemIndex = useMemo(() => {
    return navItems.findIndex((item) => item.href === currentPage)
  }, [currentPage])

  const setCurrentSelectedItemIndex = useCallback(
    (next) => {
      setCurrentPage(navItems[next].href)
    },
    [setCurrentPage]
  )

  const handleWheel = useCallback(
    (e) => {
      scrollStateRef.current.size += e.deltaY
      const divide = Math.trunc(scrollStateRef.current.size / intervalSize)
      const sign = divide > 0 ? 1 : -1
      if (Math.abs(divide) > 1) {
        setCurrentSelectedItemIndex(
          validateCurrentChange(
            currentSelectedItemIndex,
            currentSelectedItemIndex + sign,
            navItems.length
          )
        )
        scrollStateRef.current.size = 0
      }
    },
    [currentSelectedItemIndex, setCurrentSelectedItemIndex]
  )

  const navHandleMouseEnter = useCallback(() => {
    scrollStateRef.current.isEnter = true
  }, [scrollStateRef])

  const navHandleMouseLeave = useCallback(() => {
    scrollStateRef.current.size = 0
    scrollStateRef.current.isEnter = false
  }, [scrollStateRef])

  return (
    <nav
      className={cssNav}
      onWheel={handleWheel}
      onMouseEnter={navHandleMouseEnter}
      onMouseLeave={navHandleMouseLeave}
    >
      <div className={cx(cssContent, `mode-${mode}`)}>
        <div className={cx(cssCurrent, 'current')}>
          {navItems[currentSelectedItemIndex].text}
        </div>
        <div className={cx(cssList, 'list')}>
          {navItems.map((item, index) => {
            return (
              <NavItem
                key={item.href}
                href={item.href}
                nextLink={item.nextLink}
                selected={currentSelectedItemIndex === index}
                onClick={(e) => {
                  e.preventDefault()
                  setCurrentSelectedItemIndex(index)
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

Nav.defaultProps = defaultProps

export default Nav
