import React, { FC, useMemo } from 'react'
import WorkBlock from '../../../../components/WorkBlock'
import { css } from '@emotion/css'
import { cssBaseBox } from '../../styles'

export type Work = {
  name: string
  title: string
  imgSrc: string
}

export type WorkBlockBoxProps = {
  works?: Work[]
}

const WorkBlockBox: FC<WorkBlockBoxProps> = (
  props: WorkBlockBoxProps
): JSX.Element => {
  const { works = [] } = props
  const workElements = useMemo(() => {
    return works.map((work) => ({
      name: work.name,
      title: work.title,
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
  return (
    <WorkBlock
      works={workElements}
      className={cssBaseBox}
      // classes={{
      //   contactFieldset: css`
      //     padding: 20px 50px;
      //   `,
      // }}
    />
  )
}

export default WorkBlockBox
