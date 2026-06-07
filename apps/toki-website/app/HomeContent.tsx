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
          className="text-[44px] font-extrabold leading-[1.2em] text-[#f7f7f7] [text-shadow:0_0_1em_rgba(194,250,241,0.55)] md:text-[64px] lg:text-[96px] xxl:text-[128px]"
        >
          {`HI! I'm TokiLee!`}
        </h2>
        <h3
          className="text-[20px] font-extrabold leading-[1.2em] text-[#f7f7f7] [text-shadow:0_0_1em_rgba(194,250,241,0.55)] md:text-[28px] lg:text-[38px] xxl:text-[48px]"
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
          className="tile-btn flex items-center justify-center w-[300px] h-[80px] text-[44px] font-extrabold rounded-[4px] text-[#f7f7f7] no-underline md:w-[400px] md:text-[48px] xxl:w-[460px] xxl:h-[100px] xxl:text-[64px]"
        >
          <span>About Me!</span>
        </Link>
      </div>
    </div>
  )
}
