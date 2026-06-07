import type { CSSProperties, ReactNode } from 'react'

interface ScrollableBoxProps {
  children?: ReactNode
  className?: string
  style?: CSSProperties
}

export default function ScrollableBox({ children, className = '', style }: ScrollableBoxProps) {
  return (
    <div
      className={`overflow-y-auto overflow-x-hidden ${className}`}
      style={style}
    >
      {children}
    </div>
  )
}
