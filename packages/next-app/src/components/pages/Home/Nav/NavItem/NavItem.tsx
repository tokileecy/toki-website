import React from 'react'
import Link, { LinkProps } from 'next/link'
import { cx } from '@emotion/css'
import * as styles from './NavItem.styles'

export interface NavItemProps extends Omit<LinkProps, 'href'> {
  className?: string
  href?: string
  children?: React.ReactNode
  selected?: boolean
  nextLink?: boolean
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
}

export function NavItem(props: NavItemProps): JSX.Element {
  const {
    className,
    children,
    selected = false,
    onClick,
    href = '/',
    ...linkProps
  } = props

  return (
    <Link href={href} {...linkProps}>
      <a
        className={cx(styles.link, { selected }, className)}
        onClick={(e) => {
          e.preventDefault()
          return onClick?.(e)
        }}
        href={href}
        {...linkProps}
      >
        <span>{children}</span>
      </a>
    </Link>
  )
}

export default NavItem
