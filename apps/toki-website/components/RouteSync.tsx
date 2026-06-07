'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useSceneStore } from '@/store/sceneStore'

// Reads the current App Router pathname and keeps the scene store in sync.
// Runs before the first R3F frame (useEffect fires before rAF), so no flash on deep links.
export default function RouteSync() {
  const pathname = usePathname()
  const setMode = useSceneStore((s) => s.setMode)

  useEffect(() => {
    const normalized = pathname.replace(/\/$/, '') || '/'
    setMode(normalized === '/' ? 'immersive' : 'content')
  }, [pathname, setMode])

  return null
}
