import { css } from '@/styles/cssInstance'
import { fontSizes, mq } from '@/styles/baseStyles'
import Color from 'color'

const bgColor = new Color(0x00ffff)

const paddingRight = 10

export const root = css`
  width: 100%;
  font-weight: 500;
`

export const title = css`
  padding: ${paddingRight}px;
  color: white;
  width: 100%;
  min-height: 20px;
  font-size: 20px;
  font-weight: bold;

  ${mq.md} {
    font-size: ${fontSizes.h6}px;
  }
`

export const content = css`
  padding: ${paddingRight}px;
  color: white;
  padding-right: 0;
  min-height: 100px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
`

export const header = css`
  background-color: ${bgColor.rgb().toString()};
  width: calc(100% - ${paddingRight * 2}px);
  height: 2px;
  margin: auto;
`

export const description = css`
  flex-grow: 1;
  overflow: hidden;
  padding-right: 10px;
`

export const skills = css`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-around;
  margin-top: 12px;
  width: 100%;
`

export const skill = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-right: 5px;
  width: 100%;
`

export const skillChart = css`
  width: 100%;
  height: 20px;
  margin: 0 8px;
  background-color: ${bgColor.toString()};
`

export const skillName = css`
  font-size: ${fontSizes.body - 2}px;
  color: white;
  white-space: nowrap;
`
