import React, { forwardRef, ForwardedRef } from 'react'
import { cx, css } from '@emotion/css'
import Color from 'color'
import Box from '../Containers/Box'
type BaseInputCategory = React.InputHTMLAttributes<HTMLInputElement> &
  React.TextareaHTMLAttributes<HTMLTextAreaElement>

export type InputProps = {
  component?: 'input' | 'textarea'
} & BaseInputCategory

export type InputRef = ForwardedRef<HTMLInputElement & HTMLTextAreaElement>

const scrollBarColor = new Color('#ffffff').alpha(0.7).toString()
const width = 30
const textareaHorizonPadding = 0.4
const textareaVerticlePadding = 1
const scrollBarPadding = 0.3
const textareaHeight = 2.4 + textareaVerticlePadding * 2

const Input = forwardRef((inProps: InputProps, ref: InputRef): JSX.Element => {
  const { component = 'input', className, ...props } = inProps

  return (
    <Box
      className={css`
        width: ${width}ch;
      `}
    >
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
    </Box>
  )
})

Input.displayName = 'Input'

export default Input
