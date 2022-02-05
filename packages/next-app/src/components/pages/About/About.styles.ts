import { css } from '@emotion/css'
import { mq } from '../../../baseStyles'

const transitionDelay = css`
  transition-delay: 0s;

  &.from-home {
    transition-delay: 1.5s;
  }

  &.hide {
    transition-delay: 0s;
  }
`

export const root = css`
  display: flex;
  flex-direction: column;
  height: 100%;

  ${mq.lg} {
    flex-direction: row;
    align-items: center;
    /* justify-content: center; */
    justify-content: space-between;
  }

  ${mq.xl} {
    width: 100%;
    justify-content: space-around;
  }
`

export const leftBlock = css`
  flex-basis: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding-top: 10px;

  ${mq.md} {
    flex-basis: 45%;
    padding-top: 0px;
  }

  ${mq.lg} {
    height: 450px;
    flex-basis: 45%;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }

  ${mq.xl} {
    max-width: 700px;
  }
`

export const rightBlock = css`
  display: flex;
  flex-basis: 55%;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  ${mq.lg} {
    flex-basis: 45%;
  }

  ${mq.xl} {
    max-width: 700px;
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

  p {
    padding: 0.5em;
  }

  &.hide {
    transform: translateX(-130vw);
  }

  ${mq.xl} {
    margin-bottom: 0;
    /* width: 500px; */
    padding: 20px;
  }
`

export const skillBox = css`
  padding: 5px;
  height: initial;
  transition: transform 1s;
  transform: translateX(0);
  ${transitionDelay};

  &.hide {
    transform: translateX(130vw);
  }

  ${mq.lg} {
    /* width: 500px; */
    height: 450px;
    flex-direction: row;
    justify-content: space-between;
  }
`

export const skillBoxContent = css`
  padding: 10px;

  ${mq.lg} {
    padding: 20px;
  }
`
