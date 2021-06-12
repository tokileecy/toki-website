import { useRef, useState, useCallback } from 'react'
import Link from 'next/link'
import { cx, css } from '@emotion/css'

export function NavItem(props: { item: string }): JSX.Element {
  const { item } = props
  const svgRef = useRef<HTMLElement>(null)

  return (
    <div
      className={css`
        display: flex;
        flex-direction: column;
        flex: 1 0 auto;
        height: 100%;
        align-items: center;
      `}
    >
      <Link href={'/'}>
        <a
          className={css`
            flex-grow: 1;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            color: white;
          `}
        >
          {item}
        </a>
      </Link>
      <span
        ref={svgRef}
        className={css`
          color: red;
          height: 24px;
        `}
      ></span>
    </div>
  )
}

const intervalSize = 1000

const navItems = ['Home', 'About', 'Blog', 'Contact']

export type ScrollState = {
  isEnter: boolean
  size: number
}

function Nav(): JSX.Element {
  const scrollStateRef = useRef<ScrollState>({
    isEnter: false,
    size: 0,
  })
  const [current, setCurrent] = useState(0)

  const validateCurrentChange = (prev: number, next: number): number => {
    return next < navItems.length && next >= 0 ? next : prev
  }

  const handleWheel = useCallback(
    (e) => {
      scrollStateRef.current.size += e.deltaY
      const divide = Math.trunc(scrollStateRef.current.size / intervalSize)
      const sign = divide > 0 ? 1 : -1
      if (Math.abs(divide) > 1) {
        setCurrent((prev) => validateCurrentChange(prev, prev + sign))
        scrollStateRef.current.size = 0
      }
    },
    [setCurrent]
  )

  return (
    <nav
      className={css`
        border-top: 1px solid white;
        height: 70px;
        position: relative;
        overflow: hidden;
      `}
      onWheel={handleWheel}
      onMouseEnter={() => {
        scrollStateRef.current.isEnter = true
      }}
      onMouseLeave={() => {
        scrollStateRef.current.size = 0
        scrollStateRef.current.isEnter = false
      }}
    >
      <div
        className={css`
          display: flex;
          position: relative;
          height: 100%;

          .current {
            opacity: 1;
          }

          .list {
            opacity: 0;
          }

          &:hover {
            .current {
              opacity: 0;
            }
            .list {
              opacity: 1;
            }
          }
        `}
      >
        <div
          className={cx(
            'current',
            css`
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
          )}
        >
          {navItems[current]}
        </div>
        <div
          className={cx(
            'list',
            css`
              position: absolute;
              width: 100%;
              height: 100%;
              display: flex;
            `
          )}
        >
          {navItems.map((item) => {
            return <NavItem key={item} item={item} />
          })}
        </div>
      </div>
    </nav>
  )
}

export default Nav
