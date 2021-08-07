import { css } from '@emotion/css'
import MessageBox from '../../../../components/MessageBox'

export default function RecentlyBox(): JSX.Element {
  return (
    <MessageBox
      className={css`
        width: 300px;
        min-height: 100px;
        padding: 20px;
      `}
    >
      {
        '主要使用 React Emotion 作為前端開發的工具，並正在學習 design system、 Mono-ropo、Lerna 等前端建構知識與工具。'
      }
    </MessageBox>
  )
}
