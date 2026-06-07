'use client'

import Link from 'next/link'
import styles from './NavItem.module.css'

interface NavItemProps {
  href: string
  children?: React.ReactNode
  className?: string
  selected?: boolean
  disable?: boolean
  external?: boolean
}

export default function NavItem({
  href,
  children,
  className = '',
  selected = false,
  disable = false,
  external = false,
}: NavItemProps) {
  const cls = [
    styles.link,
    selected ? styles.selected : '',
    disable ? styles.disable : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if (external) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        <span>{children}</span>
      </a>
    )
  }

  return (
    <Link href={href} className={cls}>
      <span>{children}</span>
    </Link>
  )
}
