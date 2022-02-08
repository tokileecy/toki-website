import React, { ReactNode, PropsWithChildren } from 'react'
import { cx, css } from '@emotion/css'
import ScrollableBox from '@psycholog-studio/ui/Containers/ScrollableBox'
import Color from 'color'
import { mq } from '../../../../styles/baseStyles'

export type ImgBlockProps = PropsWithChildren<{
  title?: string
}>

const ImgContainer = (inProps: ImgBlockProps) => {
  const { children, title } = inProps
  return (
    <figure
      className={css`
        position: relative;
        user-select: none;
        overflow: hidden;
        margin: 0;
        background-color: black;
        height: 100px;
        width: 100%;
        margin-top: 10px;
        color: white;
        font-weight: bold;
        font-size: 36px;
        cursor: pointer;

        &:first-child {
          margin-top: 0;
        }

        &::before {
          content: '';
          background: rgb(0, 0, 0);
          position: absolute;
          z-index: 10;
          left: 0px;
          top: 0px;
          z-index: 4;
          width: 100%;
          height: 100%;
          opacity: 0.45;
          transition: opacity 0.3s;
        }

        > .title {
          position: absolute;

          top: 20%;
          left: 10%;
          line-height: 1em;
          z-index: 20;
          color: #ffffff;
          transition: color 0.5s;
        }

        > img {
          width: 100%;
        }

        &:hover {
          &::before {
            opacity: 0.2;
          }
        }

        ${mq.sm} {
          height: 150px;
        }

        ${mq.lg} {
          min-height: 200px;
        }
      `}
    >
      <div className="title">{title}</div>
      {children}
    </figure>
  )
}

export type Work = {
  name: string
  imgElement: ReactNode
  title?: string
  url?: string
}

export type WorkBlockProps = {
  works: Work[]
  className?: string
}

const WorkBlock = (inProps: WorkBlockProps): JSX.Element => {
  const { works, className } = inProps
  return (
    <ScrollableBox
      className={cx(
        css`
          width: 500px;
          padding: 5px;
          background-color: ${new Color('#ffffff').alpha(0.1).toString()};

          ${mq.sm} {
            height: 400px;
          }
        `,
        className
      )}
    >
      <div
        className={css`
          padding: 10px 0;
        `}
      >
        {works.map(({ name, title, url, imgElement }) => {
          return (
            <a
              className={css`
                display: flex;
                padding: 5px 0;
              `}
              key={name}
              href={url}
              onClick={(e) => {
                e.preventDefault()
                window.open(url)
              }}
            >
              <ImgContainer title={title}>{imgElement}</ImgContainer>
            </a>
          )
        })}
      </div>
    </ScrollableBox>
  )
}

export default WorkBlock
