import { useRef, useState, useCallback } from 'react'
import { cx, css } from '@emotion/css'
import NavItem from './NavItem'

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
  border-top: 1px solid white;
  height: 70px;
  position: relative;
  overflow: hidden;
`

const hide = css`
  opacity: 0;
`

const show = css`
  opacity: 1;
`

const cssContent = css`
  display: flex;
  position: relative;
  height: 100%;

  &.mode-default {
    .current {
      ${show}
    }

    .list {
      ${hide}
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

const navItems = ['Home', 'About', 'Blog', 'Contact']

const validateCurrentChange = (prev: number, next: number): number => {
  return next < navItems.length && next >= 0 ? next : prev
}

export type ScrollState = {
  isEnter: boolean
  size: number
}

export type NavModes = 'default' | 'current' | 'list'

export interface NavProps {
  mode: NavModes
}

const defaultProps: NavProps = {
  mode: 'default',
}

function Nav(props: NavProps): JSX.Element {
  const { mode } = props
  const [currentSelectedItemIndex, setCurrentSelectedItemIndex] = useState(0)
  const scrollStateRef = useRef<ScrollState>({
    isEnter: false,
    size: 0,
  })

  const handleWheel = useCallback(
    (e) => {
      scrollStateRef.current.size += e.deltaY
      const divide = Math.trunc(scrollStateRef.current.size / intervalSize)
      const sign = divide > 0 ? 1 : -1
      if (Math.abs(divide) > 1) {
        setCurrentSelectedItemIndex((prev) =>
          validateCurrentChange(prev, prev + sign)
        )
        scrollStateRef.current.size = 0
      }
    },
    [setCurrentSelectedItemIndex]
  )

  return (
    <nav
      className={cssNav}
      onWheel={handleWheel}
      onMouseEnter={() => {
        scrollStateRef.current.isEnter = true
      }}
      onMouseLeave={() => {
        scrollStateRef.current.size = 0
        scrollStateRef.current.isEnter = false
      }}
    >
      <div className={cx(cssContent, `mode-${mode}`)}>
        <div className={cx(cssCurrent, 'current')}>
          {navItems[currentSelectedItemIndex]}
        </div>
        <div className={cx(cssList, 'list')}>
          {navItems.map((item, index) => {
            return (
              <NavItem key={item} selected={currentSelectedItemIndex === index}>
                {item}
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
