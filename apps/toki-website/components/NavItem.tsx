'use client'

import Link from 'next/link'

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
    'tile-btn',
    'flex flex-col items-center justify-center text-white no-underline font-bold rounded',
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
    <Link
      href={href}
      className={cls}
      data-selected={selected || undefined}
      data-disabled={disable || undefined}
    >
      <span>{children}</span>
    </Link>
  )
}
