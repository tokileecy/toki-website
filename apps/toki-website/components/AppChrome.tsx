'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useSceneStore } from '@/store/sceneStore'
import NavItem from './NavItem'
import styles from './AppChrome.module.css'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/work', label: 'Work' },
]

const PAGE_TITLES: Record<string, string> = {
  '/about': 'About',
  '/work': 'Work',
}

export default function AppChrome() {
  const mode = useSceneStore((s) => s.mode)
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  const show = mode === 'content'
  const normalizedPath = pathname.replace(/\/$/, '') || '/'
  const pageTitle = PAGE_TITLES[normalizedPath] ?? ''

  const headerCls = [
    styles.header,
    show ? styles.show : styles.hide,
  ].join(' ')

  const footerCls = [
    styles.footer,
    menuOpen ? styles.menuOpen : '',
    show ? styles.show : styles.hide,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <>
      <header className={headerCls}>
        <Link href="/" className={styles.siteTitle} onClick={() => setMenuOpen(false)}>
          Toki
        </Link>
        <h1>{pageTitle}</h1>
        <button className={styles.menuBtn} onClick={() => setMenuOpen((p) => !p)}>
          Menu
        </button>
      </header>

      <footer className={footerCls}>
        <nav className={styles.nav}>
          {NAV_LINKS.map(({ href, label }) => (
            <NavItem
              key={href}
              href={href}
              className={styles.navItem}
              selected={normalizedPath === href}
            >
              {label}
            </NavItem>
          ))}
          <NavItem href="https://tokileecy.medium.com/" className={styles.navItem} external>
            Blog
          </NavItem>
        </nav>
      </footer>
    </>
  )
}
