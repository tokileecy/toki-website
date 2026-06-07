'use client'

import { useEffect, useState } from 'react'
import siteContent from '@/content/siteContent'

export default function WorkContent() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    setShow(true)
  }, [])

  const { works } = siteContent

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <div
        className="w-full bg-[rgba(255,255,255,0.1)] sm:h-100 lg:max-h-112.5 xl:max-h-150"
        style={{
          transform: show ? 'translateX(0)' : 'translateX(130vw)',
          transition: show ? 'transform 1s' : 'none',
        }}
      >
        <div className="p-4 overflow-y-auto h-full">
          {works.map((work) => (
            <a
              key={work.id}
              href={work.url}
              className="flex py-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <figure className="work-figure w-full mt-2.5 first:mt-0 h-25 text-4xl sm:h-37.5 lg:min-h-50">
                <div className="absolute text-base top-[20%] left-[10%] leading-[1em] z-20 text-white transition-[color] duration-500 sm:text-heading-sm lg:text-4xl">
                  {work.name}
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={work.banner.url}
                  alt={work.banner.alternativeText ?? work.name}
                  className="w-full h-full object-cover"
                />
              </figure>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
