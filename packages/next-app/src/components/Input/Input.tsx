import React, { forwardRef, ForwardedRef } from 'react'
import { cx, css } from '@emotion/css'
import Color from 'color'

export type CornerProps = React.SVGProps<SVGSVGElement> & {
  cornerSize?: number
}
const CornerSvg = ({ cornerSize = 16, className, ...props }: CornerProps) => {
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

type BaseInputCategory = React.InputHTMLAttributes<HTMLInputElement> &
  React.TextareaHTMLAttributes<HTMLTextAreaElement>

export type InputProps = {
  component?: 'input' | 'textarea'
} & BaseInputCategory

export type InputRef = ForwardedRef<HTMLInputElement & HTMLTextAreaElement>

const cornerSize = 10
const bgColor = new Color('#22b6db')
const scrollBarColor = new Color('#ffffff').alpha(0.7).toString()
const width = 30
const textareaHorizonPadding = 0.4
const textareaVerticlePadding = 1
const scrollBarPadding = 0.3
const textareaHeight = 2.4 + textareaVerticlePadding * 2

const Input = forwardRef((inProps: InputProps, ref: InputRef): JSX.Element => {
  const { component = 'input', className, ...props } = inProps

  return (
    <div
      className={css`
        position: relative;
        width: ${width}ch;
        border: 1px solid ${bgColor.lighten(0.5).alpha(0.8).toString()};
        background-color: ${bgColor.alpha(0.4).toString()};
      `}
    >
      <div
        className={css`
          position: absolute;
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
      {component === 'input' && (
        <input
          ref={ref}
          {...props}
          className={cx(
            css`
              height: calc(2em + 10px);
              padding: 10px;
              box-sizing: border-box;
              width: 100%;
              border: none;
              outline: none;
              background-color: transparent;
              color: transparent;
              text-shadow: 0 0 0 #fff;
            `,
            className
          )}
        />
      )}
      {component === 'textarea' && (
        <div
          className={css`
            padding: ${textareaVerticlePadding}ch ${textareaHorizonPadding}ch;
          `}
        >
          <textarea
            ref={ref}
            {...props}
            className={cx(
              css`
                height: ${textareaHeight}ch;
                padding: 0 ${scrollBarPadding}ch 0
                  ${textareaHorizonPadding + scrollBarPadding}ch;
                box-sizing: border-box;
                width: 100%;
                border: none;
                outline: none;
                background-color: transparent;
                color: transparent;
                text-shadow: 0 0 0 #fff;
                resize: none;

                &::-webkit-scrollbar {
                  width: 3px;
                }

                &::-webkit-scrollbar-track {
                  background-color: transparent;
                }

                &::-webkit-scrollbar-thumb {
                  background-color: ${scrollBarColor};
                }

                @-moz-document url-prefix() {
                  padding: 0 0 0 ${textareaHorizonPadding + scrollBarPadding}ch;
                  scrollbar-color: ${scrollBarColor} transparent;
                  scrollbar-width: thin;
                }
              `,
              className
            )}
          />
        </div>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input
