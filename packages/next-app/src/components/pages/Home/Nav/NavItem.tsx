import React from 'react'
import Link, { LinkProps } from 'next/link'
import { cx, css } from '@emotion/css'

// const cssBaseSelectBar = css``

const cssLink = css`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  color: white;
  text-decoration: none;

  &::after {
    content: '';
    width: 100%;
    background-color: #39ebeb;
    height: 5px;
    transition: transform 0.5s;
  }

  &::after {
    transform: scaleX(0);
  }

  &.selected {
    &::after {
      transform: scaleX(1);
    }
  }
`

export interface NavItemProps extends Omit<LinkProps, 'href'> {
  href: string
  children?: React.ReactNode
  selected?: boolean
  nextLink?: boolean
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
}

const defaultProps: NavItemProps = {
  selected: false,
  nextLink: false,
  href: '/',
}

export function NavItem(props: NavItemProps): JSX.Element {
  const { children, selected, nextLink, onClick, href, ...linkProps } = props

  const link = (
    <a
      className={cx(cssLink, {
        selected,
      })}
      onClick={(e) => {
        return onClick?.(e)
      }}
      href={href}
      {...linkProps}
    >
      {children}
    </a>
  )

  return nextLink ? (
    <Link href={href} {...linkProps}>
      {link}
    </Link>
  ) : (
    <>{link}</>
  )
}

NavItem.defaultProps = defaultProps

export default NavItem
