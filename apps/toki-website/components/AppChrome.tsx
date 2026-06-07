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
    'rounded-[3px] w-full text-[20px] px-6 py-2 pointer-events-auto shrink-0',
    // md+: bracket container, fixed width, centered
    'md:px-4 md:py-0 md:items-center md:text-[36px] md:h-[1.2em]',
    'md:w-[700px] md:min-w-[350px] md:mt-2 md:self-center',
    "md:before:content-['['] md:before:h-full md:after:content-[']'] md:after:h-full",
    // lg+
    'lg:w-[500px] lg:text-[56px]',
    // show/hide on md+ (mobile has no transform)
    show
      ? 'md:translate-y-0 md:transition-[transform] md:duration-1000'
      : 'md:-translate-y-[100px] md:transition-[transform] md:duration-1000',
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
    'lg:h-[50px] xl:h-[60px]',
    // show/hide on md+
    show
      ? 'md:translate-y-0 md:transition-[transform] md:duration-1000'
      : 'md:translate-y-[100px] md:transition-[transform] md:duration-1000',
  ]
    .filter(Boolean)
    .join(' ')

  const navItemCls = [
    'my-[5px] w-[100px] text-base',
    'sm:w-[150px]',
    'md:text-2xl md:w-[200px]',
    'lg:text-[28px] lg:w-[250px] lg:h-[30px]',
    'xl:text-[32px] xl:w-[300px] xl:h-10',
  ].join(' ')

  return (
    <>
      <header className={headerCls}>
        <Link href="/" className="cursor-pointer text-2xl md:hidden" onClick={() => setMenuOpen(false)}>
          Toki
        </Link>
        <h1 className="select-none text-[18px] md:text-[36px] lg:text-[56px]">{pageTitle}</h1>
        <button
          className="[transform:scaleX(0.9)] font-semibold text-[18px] text-white cursor-pointer flex items-end justify-center bg-transparent border-0 md:hidden"
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
            'w-[40%] h-[120px] top-0 left-[60%]',
            "after:content-[''] after:absolute after:inset-0 after:z-[-5] after:bg-[rgba(5,5,5,0.9)]",
            // md+: full-width row, no bg
            'md:w-full md:flex-row md:px-[60px] md:h-full md:top-auto md:left-auto md:after:content-none',
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
