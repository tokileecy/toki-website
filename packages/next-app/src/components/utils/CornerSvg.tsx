import React from 'react'
import { cx, css } from '@emotion/css'

export type CornerProps = React.SVGProps<SVGSVGElement> & {
  cornerSize?: number
}
const CornerSvg = ({
  cornerSize = 16,
  className,
  ...props
}: CornerProps): JSX.Element => {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      className={cx(
        css`
          fill: white;
          width: ${cornerSize * 2}px;
          height: ${cornerSize * 2}px;
        `,
        className
      )}
    >
      <path d="M22.4706 20C21.1061 20 20 21.1061 20 22.4706V48H27.4118V37.2941C27.4118 31.8362 31.8362 27.4118 37.2941 27.4118H48V20H22.4706Z" />
    </svg>
  )
}

export default CornerSvg
