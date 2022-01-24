import { css } from '@emotion/css'
import { cssBaseBox } from '../styles'
import { mq } from '../../../../../baseStyles'

const mobilePadding = 50

const paddingTop = css`
  padding-top: ${mobilePadding}px;
  ${mq.lg} {
    padding-top: 0px;
  }
`

export const leftBlock = css`
  ${cssBaseBox};
  flex-basis: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  ${paddingTop}

  ${mq.sm} {
    flex-basis: 45%;
  }

  ${mq.lg} {
    height: 450px;
    flex-direction: column;
    align-items: center;
  }
`

export const rightBlock = css`
  ${cssBaseBox};
  display: flex;
  flex-basis: 55%;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  ${mq.lg} {
    flex-basis: 50%;
  }
`

export const leadRoleBox = css`
  width: 100%;
  padding: 10px;

  transition: transform 1s;
  transform: translateX(0);
  &.hide {
    transform: translateX(-130vw);
  }

  ${mq.sm} {
    width: 500px;
  }
`

export const recentlyBox = css`
  width: 100%;
  padding: 10px;

  transition: transform 1s;
  transform: translateX(0);
  &.hide {
    transform: translateX(-130vw);
  }

  ${mq.lg} {
    width: 500px;
    padding: 20px;
  }
`

export const skillBox = css`
  padding: 10px;

  transition: transform 1s;
  transform: translateX(0);
  &.hide {
    transform: translateX(130vw);
  }

  ${mq.xs} {
    height: 280px;
  }

  ${mq.sm} {
    height: 300px;
  }

  ${mq.lg} {
    height: 450px;
    width: 500px;
    padding: 20px;
    flex-direction: row;
    justify-content: space-between;
  }
`
