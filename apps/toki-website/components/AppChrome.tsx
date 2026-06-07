'use client'

import Link from 'next/link'
import { useSceneStore } from '@/store/sceneStore'

// Minimal site chrome: hidden in immersive (home) state, shown in content state.
// Actual layout/styling deferred to page-content change.
export default function AppChrome() {
  const mode = useSceneStore((s) => s.mode)
  const visible = mode === 'content'

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transition: 'opacity 0.5s',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 20,
      }}
    >
      <nav>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/work">Work</Link>
      </nav>
    </div>
  )
}
