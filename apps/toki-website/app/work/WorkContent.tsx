'use client'

import { useEffect, useState } from 'react'
import siteContent from '@/content/siteContent'
import styles from './work.module.css'

export default function WorkContent() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    setShow(true)
  }, [])

  const { works } = siteContent

  return (
    <div className={styles.root}>
      <div
        className={styles.workBlockBox}
        style={{
          transform: show ? 'translateX(0)' : 'translateX(130vw)',
          transition: show ? 'transform 1s' : 'none',
        }}
      >
        <div className={styles.inner}>
          {works.map((work) => (
            <a
              key={work.id}
              href={work.url}
              className={styles.workLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <figure className={styles.figure}>
                <div className={styles.figureTitle}>{work.name}</div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={work.banner.url}
                  alt={work.banner.alternativeText ?? work.name}
                  className={styles.bannerImg}
                />
              </figure>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
