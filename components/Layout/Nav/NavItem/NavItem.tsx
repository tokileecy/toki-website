import React from 'react'
import Link, { LinkProps } from 'next/link'
import { cx } from '@/styles/cssInstance'
import * as styles from './NavItem.styles'

export interface NavItemProps extends Omit<LinkProps, 'href'> {
  className?: string
  href?: string
  children?: React.ReactNode
  disable?: boolean
  selected?: boolean
  nextLink?: boolean
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
}

const NavItem = (props: NavItemProps): JSX.Element => {
  const {
    className,
    children,
    disable = false,
    selected = false,
    onClick,
    href = '/',
    ...linkProps
  } = props

  return (
    <Link
      href={href}
      {...linkProps}
      className={cx(styles.link, { selected, disable }, className)}
      onClick={(e) => {
        // e.preventDefault()
        return onClick?.(e)
      }}
      {...linkProps}
    >
      <span>{children}</span>
    </Link>
  )
}

export default NavItem
