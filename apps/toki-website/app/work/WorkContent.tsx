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
        className="w-full bg-[rgba(255,255,255,0.1)] sm:h-[400px] lg:max-h-[450px] xl:max-h-[600px]"
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
              className="flex py-[5px]"
              target="_blank"
              rel="noopener noreferrer"
            >
              <figure className="work-figure w-full mt-[10px] first:mt-0 h-[100px] text-[36px] sm:h-[150px] lg:min-h-[200px]">
                <div className="absolute text-base top-[20%] left-[10%] leading-[1em] z-20 text-white transition-[color] duration-500 sm:text-[28px] lg:text-[36px]">
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
