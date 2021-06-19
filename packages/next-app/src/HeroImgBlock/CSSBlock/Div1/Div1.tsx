import { css } from '@emotion/css'
import MessageBox from '../../../components/MessageBox'

export default function Div1(): JSX.Element {
  return (
    <MessageBox
      className={css`
        width: 750px;
        height: 500px;
      `}
    >
      {" HI !  I'm tokileecy"}
    </MessageBox>
  )
}
