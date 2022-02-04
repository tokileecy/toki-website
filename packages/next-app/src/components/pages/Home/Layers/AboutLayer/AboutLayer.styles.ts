import { css } from '@emotion/css'
import { cssBaseBox } from '../styles'
import { mq } from '../../../../../baseStyles'

const transitionDelay = css`
  transition-delay: 0s;

  &.from-home {
    transition-delay: 1.5s;
  }

  &.hide {
    transition-delay: 0s;
  }
`

export const leftBlock = css`
  ${cssBaseBox};
  flex-basis: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 10px;

  ${mq.md} {
    flex-basis: 45%;
    padding-top: 0px;
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
  margin-bottom: 20px;
  transition: transform 1s;
  transform: translateX(0);
  ${transitionDelay};

  &.hide {
    transform: translateX(-130vw);
  }

  ${mq.md} {
    font-size: 30px;
    width: 500px;
    height: 60px;
  }
`

export const recentlyBox = css`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  transition: transform 1s;
  transform: translateX(0);
  ${transitionDelay};

  &.hide {
    transform: translateX(-130vw);
  }

  ${mq.lg} {
    margin-bottom: 0;
    width: 500px;
    padding: 20px;
  }
`

export const skillBox = css`
  padding: 10px;
  height: initial;
  transition: transform 1s;
  transform: translateX(0);
  ${transitionDelay};

  &.hide {
    transform: translateX(130vw);
  }

  ${mq.lg} {
    width: 500px;
    height: 450px;
    padding: 20px;
    flex-direction: row;
    justify-content: space-between;
  }
`
