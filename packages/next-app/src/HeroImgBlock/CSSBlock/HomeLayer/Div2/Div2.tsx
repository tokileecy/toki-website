import { css } from '@emotion/css'
import MessageBox from '../../../../components/Containers/MessageBox'

export function Div2(): JSX.Element {
  return (
    <MessageBox
      className={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 250px;
        height: 150px;
      `}
    >
      <span>{'Wellcome to Toki`s Website!'}</span>
      <div
        className={css`
          padding-top: 10px;
        `}
      >
        {'（頁面開發中...）'}
      </div>
    </MessageBox>
  )
}

export default Div2
