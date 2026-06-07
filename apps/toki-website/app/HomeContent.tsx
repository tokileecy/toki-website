'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function HomeContent() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    setShow(true)
  }, [])

  return (
    <div className="w-full flex flex-col grow text-white h-full justify-center">
      <div
        style={{
          transform: show ? 'translateX(0)' : 'translateX(-130vw)',
          transition: show ? 'transform 1s' : 'none',
        }}
      >
        <h2
          className="text-display-sm font-extrabold leading-[1.2em] text-[#f7f7f7] [text-shadow:0_0_1em_rgba(194,250,241,0.55)] md:text-display-md lg:text-8xl xxl:text-9xl"
        >
          {`HI! I'm TokiLee!`}
        </h2>
        <h3
          className="text-xl font-extrabold leading-[1.2em] text-[#f7f7f7] [text-shadow:0_0_1em_rgba(194,250,241,0.55)] md:text-heading-sm lg:text-heading-md xxl:text-5xl"
        >
          {`Frontend Web Developer`}
        </h3>
      </div>

      <div
        className="w-full flex items-center justify-end mt-24"
        style={{
          transform: show ? 'translateX(0)' : 'translateX(130vw)',
          transition: show ? 'transform 1s' : 'none',
        }}
      >
        <Link
          href="/about"
          className="tile-btn flex items-center justify-center w-75 h-20 text-display-sm font-extrabold rounded text-[#f7f7f7] no-underline md:w-100 md:text-5xl xxl:w-115 xxl:h-25 xxl:text-display-md"
        >
          <span>About Me!</span>
        </Link>
      </div>
    </div>
  )
}
