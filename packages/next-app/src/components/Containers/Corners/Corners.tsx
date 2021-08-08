import React from 'react'
import { css } from '@emotion/css'
import CornerSvg from '../../utils/CornerSvg'

const cornerSize = 10

const Corners = (): JSX.Element => {
  return (
    <div
      className={css`
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
      `}
    >
      <CornerSvg
        cornerSize={cornerSize}
        className={css`
          position: absolute;
          top: -${cornerSize}px;
          left: -${cornerSize}px;
        `}
      />
      <CornerSvg
        cornerSize={cornerSize}
        className={css`
          position: absolute;
          bottom: -${cornerSize}px;
          left: -${cornerSize}px;
          transform: rotateX(180deg);
        `}
      />
      <CornerSvg
        cornerSize={cornerSize}
        className={css`
          position: absolute;
          bottom: -${cornerSize}px;
          right: -${cornerSize}px;
          transform: rotateX(180deg) rotateY(180deg);
        `}
      />
      <CornerSvg
        cornerSize={cornerSize}
        className={css`
          position: absolute;
          top: -${cornerSize}px;
          right: -${cornerSize}px;
          transform: rotateY(180deg);
        `}
      />
    </div>
  )
}

export default Corners
