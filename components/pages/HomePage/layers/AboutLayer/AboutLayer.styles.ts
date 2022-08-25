import { css } from '@/styles/cssInstance'
import { mq } from '@/styles/baseStyles'

export const root = css`
  display: flex;
  flex-direction: column;
  height: 100%;

  ${mq.lg} {
    flex-direction: row;
    align-items: center;
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
  transition: none;
  transform: translateX(-130vw);

  &.show {
    transition: transform 1s;
    transform: translateX(0);
  }

  &.hide {
    transition: transform 1s;
    transform: translateX(-130vw);
  }

  ${mq.md} {
    font-size: 30px;
    height: 60px;
  }
`

export const recentlyBox = css`
  width: 100%;
  padding: 16px;
  margin-bottom: 20px;
  transition: none;
  transform: translateX(-130vw);

  p {
    padding: 0.5em 0;
  }

  &.show {
    transition: transform 1s;
    transform: translateX(0);
  }

  &.hide {
    transition: transform 1s;
    transform: translateX(-130vw);
  }

  ${mq.sm} {
    padding: 24px;
  }

  ${mq.xl} {
    margin-bottom: 0;
  }
`

export const skillBox = css`
  height: initial;
  transition: none;
  transform: translateX(130vw);

  &.show {
    transition: transform 1s;
    transform: translateX(0);
  }

  &.hide {
    transition: transform 1s;
    transform: translateX(130vw);
  }

  ${mq.lg} {
    height: 450px;
    flex-direction: row;
    justify-content: space-between;
  }
`

export const skillBoxContent = css`
  padding: 10px;

  ${mq.lg} {
    padding: 24px;
  }
`
