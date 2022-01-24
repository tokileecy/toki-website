import { css } from '@emotion/css'

export const webglLayer = css`
  top: 12%;
  border: solid 2px rgba(255, 255, 255, 0.8);
  border-left: 0;
  border-right: 0;
  height: 76%;
`

export const uiLayer = css`
  padding: 6% 0;
`

export const navContainer = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  pointer-events: none;
`

export const pageLabel = css`
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 42px;
  font-weight: bold;
  background-color: rgba(10, 10, 10, 0.9);
  box-shadow: 0 0 20px 10px rgba(200, 255, 230, 0.07);
  border-radius: 3px;
  width: 500px;
  height: 60px;
`
