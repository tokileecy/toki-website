'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useSceneStore } from '@/store/sceneStore'
import NavItem from './NavItem'

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

  // Mobile: always visible. md+: slide in/out via translateY.
  const headerCls = [
    // base (mobile)
    'flex items-end justify-between text-white font-bold',
    'bg-[rgba(10,10,10,0.75)] shadow-[0_0_20px_10px_rgba(200,255,230,0.1)]',
    'rounded w-full text-xl px-6 py-2 pointer-events-auto shrink-0',
    // md+: bracket container, fixed width, centered
    'md:px-4 md:py-0 md:items-center md:text-4xl md:h-[1.2em]',
    'md:w-175 md:min-w-87.5 md:mt-2 md:self-center',
    "md:before:content-['['] md:before:h-full md:after:content-[']'] md:after:h-full",
    // lg+
    'lg:w-125 lg:text-h1',
    // show/hide on md+ (mobile has no transform)
    show
      ? 'md:translate-y-0 md:transition-[transform] md:duration-1000'
      : 'md:-translate-y-25 md:transition-[transform] md:duration-1000',
  ]
    .filter(Boolean)
    .join(' ')

  // Mobile: slide in from right when menu opens. md+: slide up from bottom.
  const footerCls = [
    // base (mobile)
    'absolute z-[5] bottom-0 w-full h-full overflow-hidden pt-10',
    'transition-[transform] duration-1000 pointer-events-none',
    menuOpen ? 'translate-x-0' : 'translate-x-1/2',
    // md+: bottom bar
    'md:pointer-events-auto md:pt-0 md:h-10 md:left-0',
    'md:translate-x-0',
    // lg+/xl+
    'lg:h-12.5 xl:h-15',
    // show/hide on md+
    show
      ? 'md:translate-y-0 md:transition-[transform] md:duration-1000'
      : 'md:translate-y-25 md:transition-[transform] md:duration-1000',
  ]
    .filter(Boolean)
    .join(' ')

  const navItemCls = [
    'my-1 w-25 text-base',
    'sm:w-37.5',
    'md:text-2xl md:w-50',
    'lg:text-heading-sm lg:w-62.5 lg:h-7.5',
    'xl:text-h5 xl:w-75 xl:h-10',
  ].join(' ')

  return (
    <>
      <header className={headerCls}>
        <Link href="/" className="cursor-pointer text-2xl md:hidden" onClick={() => setMenuOpen(false)}>
          Toki
        </Link>
        <h1 className="select-none text-lg md:text-4xl lg:text-h1">{pageTitle}</h1>
        <button
          className="[transform:scaleX(0.9)] font-semibold text-lg text-white cursor-pointer flex items-end justify-center bg-transparent border-0 md:hidden"
          onClick={() => setMenuOpen((p) => !p)}
        >
          Menu
        </button>
      </header>

      <footer className={footerCls}>
        <nav
          className={[
            // mobile: right-anchored column with dark bg via ::after
            'flex flex-col justify-around items-center relative z-[5]',
            'w-[40%] h-30 top-0 left-[60%]',
            "after:content-[''] after:absolute after:inset-0 after:z-[-5] after:bg-[rgba(5,5,5,0.9)]",
            // md+: full-width row, no bg
            'md:w-full md:flex-row md:px-15 md:h-full md:top-auto md:left-auto md:after:content-none',
          ].join(' ')}
        >
          {NAV_LINKS.map(({ href, label }) => (
            <NavItem
              key={href}
              href={href}
              className={navItemCls}
              selected={normalizedPath === href}
            >
              {label}
            </NavItem>
          ))}
          <NavItem href="https://tokileecy.medium.com/" className={navItemCls} external>
            Blog
          </NavItem>
        </nav>
      </footer>
    </>
  )
}
