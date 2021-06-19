import { css } from '@emotion/css'
import MessageBox from '../../../components/MessageBox'

export function Div2(): JSX.Element {
  return (
    <MessageBox
      className={css`
        display: flex;
        align-items: center;
        justify-content: center;
        width: 750px;
        height: 500px;
      `}
    >
      {'Wellcome to...'}
      <br />
      {'Toki`s Website!'}
    </MessageBox>
  )
}

export default Div2
