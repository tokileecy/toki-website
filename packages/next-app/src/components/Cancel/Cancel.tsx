import React from 'react'
import { css } from '@emotion/css'

export type CancelProps = {}

const Cancel = (props: CancelProps): JSX.Element => {
  return (
    <svg
      viewBox="0 0 27 27"
      version="1.1"
      className={css`
        rect {
          fill: none;
          stroke: #23d7ff;
        }

        path {
          fill: #23d7ff;
        }
      `}
    >
      <rect x="1.303" y="1.201" width="24" height="24" />
      <path d="M19.972,5.573l-14.296,14.297l0.958,0.958l14.296,-14.296l-0.958,-0.959Z" />
      <path d="M5.676,6.532l14.296,14.296l0.958,-0.958l-14.296,-14.297l-0.958,0.959Z" />
    </svg>
  )
}

export default Cancel
