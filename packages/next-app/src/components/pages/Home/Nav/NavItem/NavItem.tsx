import React from 'react'
import Link, { LinkProps } from 'next/link'
import { cx } from '@emotion/css'
import * as styles from './NavItem.styles'

export interface NavItemProps extends Omit<LinkProps, 'href'> {
  href?: string
  children?: React.ReactNode
  selected?: boolean
  nextLink?: boolean
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
}

export function NavItem(props: NavItemProps): JSX.Element {
  const {
    children,
    selected = false,
    onClick,
    href = '/',
    ...linkProps
  } = props

  return (
    <Link href={href} {...linkProps}>
      <a
        className={styles.link}
        onClick={(e) => {
          e.preventDefault()
          return onClick?.(e)
        }}
        href={href}
        {...linkProps}
      >
        <div className={cx(styles.text, { selected })}>
          <span>{children}</span>
        </div>
      </a>
    </Link>
  )
}

export default NavItem
