import { css } from '@emotion/css'
import Color from 'color'
import { mq, colors } from '@/styles/baseStyles'

export const content = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  color: white;
`

export const greeting = css`
  transform: translateX(-130vw);
  transition: none;

  &.show {
    transition: transform 1s;
    transform: translateX(0);
  }

  &.hide {
    transition: transform 1s;
    transform: translateX(-130vw);
  }
`

export const h2 = css`
  font-size: 44px;
  text-shadow: 0 0 1em ${Color(colors.primaryTint).alpha(0.55).toString()};
  color: ${Color(colors.black100).toString()};
  font-weight: 800;
  line-height: 1.2em;

  ${mq.md} {
    font-size: 64px;
  }

  ${mq.lg} {
    font-size: 96px;
  }

  ${mq.xxl} {
    font-size: 128px;
  }
`

export const h3 = css`
  font-size: 20px;
  text-shadow: 0 0 1em ${Color(colors.primaryTint).alpha(0.55).toString()};
  color: ${Color(colors.black100).toString()};
  font-weight: 800;
  line-height: 1.2em;

  ${mq.md} {
    font-size: 28px;
  }

  ${mq.lg} {
    font-size: 38px;
  }

  ${mq.xxl} {
    font-size: 48px;
  }
`

export const buttonWrap = css`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 96px;
  transform: translateX(130vw);
  transition: none;

  &.show {
    transition: transform 1s;
    transform: translateX(0);
  }

  &.hide {
    transition: transform 1s;
    transform: translateX(130vw);
  }
`

export const button = css`
  width: 300px;
  height: 80px;
  font-size: 44px;
  font-weight: 800;
  border-radius: 4px;

  color: ${Color(colors.black100).toString()};

  ${mq.md} {
    width: 400px;
    height: 80px;
    font-size: 48px;
  }

  ${mq.lg} {
    font-size: 48px;
  }

  ${mq.xxl} {
    width: 460px;
    height: 100px;
    font-size: 64px;
  }
`
