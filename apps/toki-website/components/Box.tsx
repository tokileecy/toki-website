import type { CSSProperties, ReactNode } from 'react'

interface BoxProps {
  children?: ReactNode
  className?: string
  style?: CSSProperties
}

export default function Box({ children, className = '', style }: BoxProps) {
  return (
    <div
      className={`border border-[rgba(255,255,255,0.8)] bg-[rgba(102,219,255,0.3)] ${className}`}
      style={style}
    >
      {children}
    </div>
  )
}
