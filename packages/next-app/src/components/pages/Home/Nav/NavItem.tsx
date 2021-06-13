import React from 'react'
import Link from 'next/link'
import { cx, css } from '@emotion/css'

const cssBaseSelectBar = css`
  content: '';
  width: 100%;
  background-color: #39ebeb;
  height: 5px;
  transition: transform 0.5s;
`
const cssLink = css`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: white;
  text-decoration: none;

  &::after {
    ${cssBaseSelectBar}
    transform: scaleX(0);
  }

  &.selected {
    &::after {
      ${cssBaseSelectBar}
      transform: scaleX(1);
    }
  }
`

export interface NavItemProps {
  children?: React.ReactNode
  selected?: boolean
}

const defaultProps: NavItemProps = {
  selected: false,
}

export function NavItem(props: NavItemProps): JSX.Element {
  const { children, selected } = props

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
          className={cx(cssLink, {
            selected,
          })}
        >
          {children}
        </a>
      </Link>
    </div>
  )
}

NavItem.defaultProps = defaultProps

export default NavItem
