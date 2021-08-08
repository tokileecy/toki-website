import React from 'react'
import { Story, Meta } from '@storybook/react'
import EventEmitter from 'events'
import { css } from '@emotion/css'
import MessageBox, { MessageBoxProps, MessageBoxRef } from './MessageBox'
import EVENTS from './events'

const messageBoxRef: MessageBoxRef = React.createRef()
const emitter = new EventEmitter()

const eventHandler = (event: string) => {
  switch (event) {
    case EVENTS.COLLAPSE:
      return () => {
        messageBoxRef.current?.collapse()
      }
    case EVENTS.EXPAND:
      return () => {
        messageBoxRef.current?.expand()
      }
    default:
      return () => {
        console.warn(`${event} is not proper event`)
      }
  }
}

Object.values(EVENTS).forEach((event) => emitter.on(event, eventHandler(event)))

export default {
  title: 'next-app/Containers/MessageBox',
  component: MessageBox,
  argTypes: {},
} as Meta

const Template: Story<MessageBoxProps> = (args) => {
  return (
    <div
      className={css`
        margin: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      `}
    >
      <div
        className={css`
          display: flex;
          button {
            margin: 5px;
          }
        `}
      >
        {Object.keys(EVENTS).map((event: string) => {
          return (
            <button
              key={event}
              onClick={() => {
                emitter.emit(EVENTS[event])
              }}
            >
              {EVENTS[event]}
            </button>
          )
        })}
      </div>
      <div
        className={css`
          background-color: black;
          margin: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: fit-content;
        `}
      >
        <div
          className={css`
            padding: 20px;
          `}
        >
          <MessageBox
            ref={messageBoxRef}
            {...args}
            className={css`
              padding: 50px;
            `}
          >
            messageBox
          </MessageBox>
        </div>
      </div>
    </div>
  )
}

export const NormalMessageBox = Template.bind({})

NormalMessageBox.args = {}
