'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from './page.module.css'

export default function HomeContent() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    setShow(true)
  }, [])

  return (
    <div className={styles.content}>
      <div
        className={styles.greeting}
        style={{
          transform: show ? 'translateX(0)' : 'translateX(-130vw)',
          transition: show ? 'transform 1s' : 'none',
        }}
      >
        <h2 className={styles.h2}>{`HI! I'm TokiLee!`}</h2>
        <h3 className={styles.h3}>{`Frontend Web Developer`}</h3>
      </div>

      <div
        className={styles.buttonWrap}
        style={{
          transform: show ? 'translateX(0)' : 'translateX(130vw)',
          transition: show ? 'transform 1s' : 'none',
        }}
      >
        <Link href="/about" className={styles.button}>
          <span>About Me!</span>
        </Link>
      </div>
    </div>
  )
}
