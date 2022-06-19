import React, { FC, useMemo } from 'react'
import WorkBlock from '../WorkBlock'
import { css } from '@emotion/css'

export type Work = {
  name: string
  title: string
  imgSrc: string
  url?: string
}

export type WorkBlockBoxProps = {
  works?: Work[]
  className?: string
}

const WorkBlockBox: FC<WorkBlockBoxProps> = (
  props: WorkBlockBoxProps
): JSX.Element => {
  const { className, works = [] } = props
  const workElements = useMemo(() => {
    return works.map((work) => ({
      name: work.name,
      title: work.title,
      url: work.url,
      imgElement: (
        <img
          className={css`
            height: 100%;
            width: 100%;
            background-position: center center;
            background-size: cover;
            background-image: url(${work.imgSrc});
          `}
        />
      ),
    }))
  }, [works])
  return <WorkBlock works={workElements} className={className} />
}

export default WorkBlockBox
